import './App.css'
import React from 'react';
import { useState , useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchHits } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import toast from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

export interface ImageUrls {
  regular: string | undefined;
  small: string;
}

interface User {
  username: string;
}

export interface Image {
  id: string;
  urls: ImageUrls;
  description: string;
  likes: number;
  user: User;
  alt :string;
  
}


const App = () => {
const [hits,setHits] = useState<Image[]> ([]);
const [query, setQuery] = useState<string>(''); 
let [isLoading, setIsLoading] = useState<boolean>(false);
const [page, setPage] = useState<number>(0);
const [totalPages, setTotalPages] = useState<number>(0);
const [isError, setIsError] = useState<boolean>(false);
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [modalImage, setModalImage] = useState<Image | null>(null);


const openModal = (imageUrl:Image) :void=> {
  setModalImage(imageUrl);
  setIsModalOpen(true);
};

const closeModal = () :void=> {
  setIsModalOpen(false);
  setModalImage(null);
};

useEffect(() =>{
  const abortController = new AbortController();
    if (!query) return; 
   
 const getData = async () =>{

    try{
      setIsLoading(true);
      const data = await fetchHits(query, page+1, abortController.signal);
     
      setHits((prev: Image[]) => [...prev, ...data.hits]);
      setTotalPages(Math.ceil(data.total / data.perPage)); 
      }
            catch (error: any){
           
            if (error.code !== 'ERR_CANCELED') {
              setIsError(true);
              toast.error('Server is not responsive...');
            
            }
         } finally {
          setIsLoading(false);
        }
 };
 getData();
 return () => abortController.abort();

},[query,page]) 

const handleChange = (newQuery: string) => {
 

    setQuery(newQuery);
    setHits([]);
    setPage(0);
    setTotalPages(0);
    setIsError(false);
  };

 return (
 <>
  <SearchBar onSubmit={handleChange}/>

 <ImageGallery hits={hits} onImageClick={openModal} />
{/* <ImageModal isOpen={isModalOpen} onClose={closeModal} imageUrl={modalImage?.urls}/> */}
{isModalOpen && modalImage && (
  <ImageModal 
    isOpen={isModalOpen} 
    onClose={closeModal} 
    imageUrl={modalImage.urls} 
    alt={modalImage.alt}
    image={modalImage}
  />
)}
{isError && <ErrorMessage/>}
{isLoading && <Loader/>}
{(page +1 )< totalPages && !isLoading && <LoadMoreBtn onClick={() => setPage(page + 1)}/>}
</>
 );
};

export default App
