import React, { useCallback } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/loginUser";
import { useDispatch } from "react-redux";
import { authorize } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const loginInitialValue = {
    username: "",
    password: "",
    generalError: "",
  };
  const navigate = useNavigate();
  const submitForm = useCallback(
    (values, { setSubmitting, setFieldError }) => {
      const response = loginUser(values);
      setSubmitting(false);
      if (response.errorMessage) {
        setFieldError("generalError", response.errorMessage);
        return;
      }
      dispatch(authorize(response.user));
      navigate("/");
    },
    [navigate, dispatch]
  );
  return (
    <div className="container">
      <div className="authorization-form">
        <Formik
          onSubmit={submitForm}
          initialValues={loginInitialValue}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("No username provided"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum."),
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
              <div className="authorization-form__general-error">
                <ErrorMessage name="generalError" component="div" />
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
        <div style={{ marginTop: 30 }}>
          If you have signed up yet, proceed to
          <Link to="/register"> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
