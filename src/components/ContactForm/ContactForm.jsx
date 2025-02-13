import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../../redux/contacts/operations";
import { closeEditModal } from "../../redux/contacts/slice";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      // /^\+\d{2} \d{3}\ \d{3} \d{2} \d{2}$/,
      /^\+(\d{12})$/,
      "Phone number should be in format +XXXXXXXXXXXX"
    )
    .required("Required"),
});

export default function ContactForm({
  initialValues = { name: "", number: "" },
  isEditMode = false,
  // contactId,
}) {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeEditModal());
  };

  const handleSubmit = (values, actions) => {
    if (isEditMode) {
      // dispatch(updateContact({ contactId, ...values }));
      dispatch(updateContact({ contactId: values._id, ...values }));
      closeModal();
    } else {
      dispatch(
        addContact({
          name: values.name,
          number: values.number,
        })
      );
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <Field className={css.field} type="text" name="name" id="name"></Field>
        <ErrorMessage className={css.error} name="name" component="div" />
        <label className={css.label} htmlFor="number">
          Number
        </label>
        <Field
          className={css.field}
          type="text"
          name="number"
          id="number"
          placeholder="+XXXXXXXXXXXX"
        ></Field>
        <ErrorMessage className={css.error} name="number" component="div" />
        <button type="submit">
          {isEditMode ? "Edit contact" : "Add contact"}
        </button>
      </Form>
    </Formik>
  );
}
