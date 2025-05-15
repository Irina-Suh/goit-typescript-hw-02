import './App.css'
import { useState , useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchHits } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import toast from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';




const App = () => {
const [hits,setHits] = useState ([]);
const [query, setQuery] = useState(''); 
let [isLoading, setIsLoading] = useState(false);
const [page, setPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [isError, setIsError] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalImage, setModalImage] = useState(null);


const openModal = (imageUrl) => {
  setModalImage(imageUrl);
  setIsModalOpen(true);
};

const closeModal = () => {
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
     
      setHits((prev) => [...prev, ...data.hits]);
      setTotalPages(Math.ceil(data.total / data.perPage)); 
      }
            catch (error){
           
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

const handleChange = (newQuery) => {
 

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
<ImageModal isOpen={isModalOpen} onClose={closeModal} imageUrl={modalImage}/>
{isError && <ErrorMessage/>}
{isLoading && <Loader/>}
{(page +1 )< totalPages && !isLoading && <LoadMoreBtn onClick={() => setPage(page + 1)}/>}
    </>
  );
};

export default App
