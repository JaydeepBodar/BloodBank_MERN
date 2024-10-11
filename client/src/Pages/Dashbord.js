import React from "react";
import { GlobalContext } from "../Context/Authcontext";
import Layout from "../utils/Layout";
import Authorization from "../utils/Authorization";
const Dashbord = () => {
  const { data } = GlobalContext();
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-capitalize text-center" style={{fontWeight:"700"}}>Welcome to Our Dashboard {data} ! </h2>
      </div>
    </Layout>
  );
};

export default Authorization(Dashbord);
