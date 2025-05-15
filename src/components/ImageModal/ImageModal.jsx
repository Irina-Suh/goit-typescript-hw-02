import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, imageUrl, alt }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={s.modal}>
      <img
        className={s.img}
        src={imageUrl}
        alt={alt}
        style={{ maxWidth: "70vw", maxHeight: "70vh" }}
      />
    </Modal>
  );
};

export default ImageModal;
