import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/Authcontext";

const useFetch = (url) => {
  const { token } = GlobalContext();
  const [data, setdata] = useState([]);
  const location=useLocation()
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => setdata(res?.data))
      .catch((e) => seterror(e?.response?.data?.message))
      .finally(() => setloading(false));
  }, [loading,location]);
  return { data, loading, error};
};

export default useFetch;
