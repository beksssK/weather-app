import React, { useCallback } from "react";
import "./index.scss";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/registerUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const registerInitialValues = {
    username: "",
    password: "",
    email: "",
  };
  const navigate = useNavigate();
  const submitForm = useCallback(
    (values, { setSubmitting, setFieldError }) => {
      const errors = registerUser(values, () => navigate("/login"));
      if (Object.keys(errors).length) {
        Object.keys(errors).forEach((field) =>
          setFieldError(field, errors[field])
        );
      }
      setSubmitting(false);
    },
    [navigate]
  );

  return (
    <div className="container">
      <div className="authorization-form">
        <Formik
          onSubmit={submitForm}
          initialValues={registerInitialValues}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("No username provided"),
            email: Yup.string().email("Enter valid email").required("Required"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
          })}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <div className="authorization-form__element">
                <label className="authorization-form__label" htmlFor="username">
                  Username:{" "}
                </label>
                <Field
                  className="authorization-form__input"
                  type="text"
                  name="username"
                />
                <ErrorMessage name="username" component="div" />
              </div>
              <div className="authorization-form__element">
                <label className="authorization-form__label" htmlFor="email">
                  Email:{" "}
                </label>
                <Field
                  className="authorization-form__input"
                  type="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="authorization-form__element">
                <label className="authorization-form__label" htmlFor="password">
                  Password:{" "}
                </label>
                <Field
                  className="authorization-form__input"
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button button--primary"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
