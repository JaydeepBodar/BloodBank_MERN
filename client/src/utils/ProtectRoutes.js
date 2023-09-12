import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [login, setlogin] = useState(false);
  const checkUser = () => {
    const getToken = localStorage.getItem("token");
    if (!getToken || getToken === "undefined") {
      navigate("/home/login");
      setlogin(false);
    } else {
      setlogin(true);
    }
  };
  useEffect(() => {
    checkUser();
  }, [login]);
  return <React.Fragment>{ login ? children : null}</React.Fragment>
};

export default ProtectRoutes;
