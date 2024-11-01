import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredContacts,
  openModal,
  closeModal,
} from "../../redux/contacts/slice";
import { deleteContact } from "../../redux/contacts/operations";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import EditContactForm from "../EditContactModal/EditContactModal";

export default function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.contacts.isModalOpen);
  const contactIdToDelete = useSelector(
    (state) => state.contacts.contactIdToDelete
  );

  const handleDeleteClick = (contactId) => {
    if (!isModalOpen) {
      dispatch(openModal(contactId));
    }
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contactIdToDelete));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <ul className={css.contactList}>
        {visibleContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} onDeleteClick={handleDeleteClick} />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          onConfirm={confirmDelete}
        />
      )}
      <Toaster />
      <EditContactForm />
    </>
  );
}
