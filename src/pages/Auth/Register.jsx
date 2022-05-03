import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useDispatch } from "react-redux";
import { register } from "../../store/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleUserDataChange = useCallback((e) => {
    setUserData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }, []);
  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(userData));
    },
    [dispatch, userData]
  );

  return (
    <div className="container">
      <div className="authorization-form">
        <form action="#" onSubmit={submitForm}>
          <div className="authorization-form__element">
            <label className="authorization-form__label" htmlFor="username">
              Username:{" "}
            </label>
            <input
              id="username"
              className="authorization-form__input"
              type="text"
              name="username"
              onChange={handleUserDataChange}
              value={userData.username}
            />
          </div>
          <div className="authorization-form__element">
            <label className="authorization-form__label" htmlFor="email">
              Username:{" "}
            </label>
            <input
              id="email"
              className="authorization-form__input"
              type="text"
              name="email"
              onChange={handleUserDataChange}
              value={userData.email}
            />
          </div>
          <div className="authorization-form__element">
            <label className="authorization-form__label" htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              className="authorization-form__input"
              type="password"
              name="password"
              onChange={handleUserDataChange}
              value={userData.password}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
