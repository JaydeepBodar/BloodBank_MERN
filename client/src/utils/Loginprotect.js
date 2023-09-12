import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loginprotect = ({ children }) => {
  const [login, setlogin] = useState(false);
  const navigate = useNavigate();
  const checkloginuser = () => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setlogin(true);
      navigate("/home/dashboard");
    } else {
      setlogin(false);
    }
  };
  useEffect(() => {
    checkloginuser();
  }, [login]);
  return <React.Fragment>{!login ? children : null}</React.Fragment>;
};

export default Loginprotect;
