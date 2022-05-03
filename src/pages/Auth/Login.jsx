import React, { useCallback, useState } from "react";
import "./index.scss";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleUserDataChange = useCallback((e) => {
    setUserData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }, []);
  const submitForm = useCallback((e) => {
    e.preventDefault();
    console.log(userData);
  }, []);
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
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
