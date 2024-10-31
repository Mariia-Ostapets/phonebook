import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const initialValues = { name: "", number: "" };

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Phone number must be in the format +XX (XXX) XXX-XX-XX"
    )
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
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
          placeholder="+XX (XXX) XXX-XX-XX"
        ></Field>
        <ErrorMessage className={css.error} name="number" component="div" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
