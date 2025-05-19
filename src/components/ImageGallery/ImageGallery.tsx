import React from 'react'
import ImageCard from '../ImageCard/ImageCard'
import s from './ImageGallery.module.css'
import { Image, ImageUrls } from '../../App';

export interface ImageGalleryProps {
	hits: Image[];
	onImageClick: (image: Image) => void;
  }


const ImageGallery: React.FC<ImageGalleryProps>  = ({hits,onImageClick }) => {
	
  return (
	
    <ul className={s.list}>
		
	  {  hits.map(item => 
	       <li key={item.id}>
		  {/* <ImageCard src={item.urls.small} alt={item.alt_description || 'Image'}  onClick={() => onImageClick(item.urls.full)}/> */}
		  <ImageCard image={item}
		 			 src={item.urls} 
		  			alt={item || 'Image'}  
		 			 onClick={() => onImageClick(item)}/>
		 </li>
		
	   ) 
	}
	
</ul>

  )
}

export default ImageGallery