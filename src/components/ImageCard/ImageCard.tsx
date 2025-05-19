import React from 'react'
import { Image, ImageUrls } from '../../App';

interface ImageCardProps {
  image: Image;
  src:ImageUrls;
  alt:Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({src,alt,onClick}) => {
  return (
    <div>
			 <img width ='200px' height = '200px' src={src.small} alt={alt.alt} onClick ={onClick}/>
		   </div>

  )
}

export default ImageCard