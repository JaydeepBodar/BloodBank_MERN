import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/Authcontext";

const useFetch = (url, queryparameter) => {
  // console.log("firstqueryparameter", queryparameter);
  const { token } = GlobalContext();
  const [data, setdata] = useState([]);
  const location = useLocation();
  const navigate=useNavigate()
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [error, seterror] = useState("");
  const handlePage = (current) => {
    setloading(true);
    setpage(current);
  };
  let limit = 10;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const query = Object.entries(queryparameter)
    ?.map(([key,value]) => `${key}=${value}`)
    .join("&");
    // console.log("firstquery",typeof query)
    let querydata;
    if(query?.length === 0 ){
      querydata = `${url}?page=${page}`
    }else{
      querydata =`${url}?page=${page}&${query}`
    }
    // console.log("firstquerydata",querydata)
    // console.log("firstloading",loading)
  useEffect(() => {
    axios
      .get(querydata, config)
      .then((res) => setdata(res?.data))
      .catch((e) => {
        if(e?.response?.status === 401){
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/home/login")
        }else{
          seterror(e?.response?.data?.message)
        }
      })
      .finally(() => setloading(false));
  }, [loading, location, query, page]);
  return {
    data,
    loading,
    error,
    handlePage,
    page,
    limit,
    setloading
  };
};

export default useFetch;
