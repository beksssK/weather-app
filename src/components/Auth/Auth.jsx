import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { authorized } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/login");
    }
  }, [authorized, navigate]);
  return <>{children}</>;
};

export default Auth;
