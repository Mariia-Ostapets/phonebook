import Modal from "react-modal";
import css from "./ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <h2 className={css.modalTitle}>Confirm Deletion</h2>
      <p className={css.modalDescription}>
        Are you sure you want to delete this contact?
      </p>
      <div className={css.modalBtnWrapper}>
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
