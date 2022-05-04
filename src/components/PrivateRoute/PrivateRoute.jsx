import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeAuth } from "../../services/initializeAuth";
import { authorize } from "../../store/userSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userAuth = initializeAuth();
    if (userAuth) {
      dispatch(authorize(userAuth));
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return <>{children}</>;
};

export default PrivateRoute;
