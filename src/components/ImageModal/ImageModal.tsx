import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { Image, ImageUrls } from "../../App";
import React from 'react';

Modal.setAppElement("#root");
interface ImageModalProps {
  isOpen: boolean;
  image: Image | null;
  imageUrl :ImageUrls;
   alt :string;
  onClose: () => void;
}
const ImageModal:React.FC<ImageModalProps>  = ({ isOpen, onClose, imageUrl, alt }) => {
  return (
    <Modal isOpen={isOpen} 
          onRequestClose={onClose} 
          className={s.modal} >
      <img
        className={s.img}
        src={imageUrl.regular}
        alt={alt}
        style={{ maxWidth: "70vw", maxHeight: "70vh" }}
      />
    </Modal>
  );
};

export default ImageModal;
