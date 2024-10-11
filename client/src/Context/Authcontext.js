import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export const Usercontext = createContext();
const Userprovider = ({children}) => {
  const location = useLocation();
  const [user, setuser] = useState([]);
  const token=JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user")));
  }, [location]);
  let data;
  switch (user?.role) {
    case "Donor":
      data = user?.name;
      break;
    case "Hospital":
      data = user?.hospitalName;
      break;
    case "Organization":
      data = user?.organizationName;
      break;
    case "Admin":
      data = user?.name;  
      break;
  }
  const newdata = data
    ?.split(" ")
    .map((word) => word[0])
    .join("");
  return <Usercontext.Provider value={{newdata,data,user,token}}>{children}</Usercontext.Provider>;
};
export default Userprovider;

export const  GlobalContext = () => {
  return useContext(Usercontext);
};
