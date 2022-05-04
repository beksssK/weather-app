import React, { useCallback } from "react";
import "./index.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../../services/logoutUser";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logoutTheUser = useCallback(() => {
    logoutUser();
    navigate.push("/login");
  }, [navigate]);
  return (
    <header className="header">
      <div className="container">
        <nav className="header__content">
          <div className="logo">
            <h2>
              <Link className="header__logo" to="/">
                Weather Info
              </Link>
            </h2>
          </div>
          <nav className="main-nav">
            <ul className="main-nav__items">
              {user ? (
                <>
                  <li className="main-nav__item">
                    <NavLink
                      className="main-nav__link"
                      to="#"
                      onClick={logoutTheUser}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="main-nav__item">
                    <NavLink className="main-nav__link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="main-nav__item">
                    <NavLink className="main-nav__link" to="/register">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Header;
