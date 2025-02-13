import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openModal, openEditModal } from "../../redux/contacts/slice";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // dispatch(openModal(contact.id));
    dispatch(openModal(contact._id));
  };

  const handleEdit = () => {
    dispatch(openEditModal(contact));
  };

  return (
    <div className={css.contactCard}>
      <div className={css.contactInfo}>
        <p className={css.text}>
          <AiOutlineUser />
          {contact.name}
        </p>
        <p className={css.text}>
          <AiOutlinePhone />
          {contact.number}
        </p>
      </div>
      <div className={css.btnWrapper}>
        <button className={css.btn} onClick={handleEdit}>
          Edit <MdOutlineEdit size={16} />
        </button>
        <button className={css.btn} onClick={handleDelete}>
          Delete <MdDeleteOutline size={16} />
        </button>
      </div>
    </div>
  );
}
