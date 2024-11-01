import { useSelector, useDispatch } from "react-redux";
import { closeEditModal } from "../../redux/contacts/slice";
import Modal from "react-modal";
import ContactForm from "../ContactForm/ContactForm";
import css from "./EditContactModal.module.css";

export default function EditContactModal() {
  const dispatch = useDispatch();
  const isEditModalOpen = useSelector(
    (state) => state.contacts.isEditModalOpen
  );
  const contactToEdit = useSelector((state) => state.contacts.contactToEdit);

  const closeModal = () => {
    dispatch(closeEditModal());
  };

  return (
    <Modal
      className={css.modal}
      isOpen={isEditModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <h2 className={css.modalTitle}>Edit Contact</h2>
      {contactToEdit && (
        <ContactForm
          initialValues={contactToEdit}
          isEditMode={true}
          contactId={contactToEdit.id}
        />
      )}
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}
