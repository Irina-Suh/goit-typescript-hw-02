import React from 'react'
import ImageCard from '../ImageCard/ImageCard'
import s from './ImageGallery.module.css'



const ImageGallery = ({hits,onImageClick }) => {
	
  return (
	
    <ul className={s.list}>
		
	  {  hits.map(item => 
	       <li key={item.id}>
		  <ImageCard src={item.urls.small} alt={item.alt_description || 'Image'}  onClick={() => onImageClick(item.urls.full)}/>
		 </li>
		
	   ) 
	}
	
</ul>

  )
}

export default ImageGallery