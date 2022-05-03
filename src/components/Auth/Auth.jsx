import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { authorized } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
  }, [authorized, navigate]);
  console.log(authorized);
  return <>{children}</>;
};

export default Auth;
