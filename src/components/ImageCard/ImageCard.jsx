import React from 'react'

const ImageCard = ({src,alt,onClick}) => {
  return (
    <div>
			 <img width ='200px' height = '200px' src={src} alt={alt} onClick ={onClick}/>
		   </div>

  )
}

export default ImageCard