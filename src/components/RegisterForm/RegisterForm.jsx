import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

const initialValues = { name: "", email: "", password: "" };

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "The password must consist of at least 8 characters!")
    .required("Required"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (values, actions) => {
    dispatch(clearError());
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        actions.resetForm();
      })
      .catch(() => {
        console.log("Email is already in use");
      });

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
          Username
        </label>
        <Field className={css.field} type="text" name="name" id="name" />
        <ErrorMessage
          className={css.error}
          name="name"
          component="div"
        ></ErrorMessage>
        <label className={css.label} htmlFor="email">
          Email
        </label>
        <Field className={css.field} type="email" name="email" id="email" />
        <ErrorMessage
          className={css.error}
          name="email"
          component="div"
        ></ErrorMessage>
        {error && <div className={css.error}>{error}</div>}
        <label className={css.label} htmlFor="password">
          Password
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          id="password"
        />
        <ErrorMessage
          className={css.error}
          name="password"
          component="div"
        ></ErrorMessage>
        <button className={css.button} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
