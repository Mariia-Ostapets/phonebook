import Modal from "react-modal";

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this contact?</p>
      <button onClick={onRequestClose}>Cancel</button>
      <button onClick={onConfirm}>Delete</button>
    </Modal>
  );
};

export default ConfirmModal;
