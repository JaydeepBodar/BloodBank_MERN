import React, { useEffect } from "react";

const Authorization = (Childcomponent) => {
  // const navigate=useNavigate()

  return (props) => {
    const getitem = localStorage.getItem("token");
    if (!getitem) {
      window.location.replace("/home/login");
      return null;
    }
    return <Childcomponent {...props} />;
  };
};

export default Authorization;
