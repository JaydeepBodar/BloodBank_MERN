import React, { useState, useEffect } from "react";
import Layout from "../utils/Layout";
import { api } from "../utils/api";
import LoadingOverlay from "react-loading-overlay";
import { GlobalContext } from "../Context/Authcontext";
import axios from "axios";
import Donororganizationdata from "./Organizationdata/Donororganizationdata";
import Hospitalorganization from "./Organizationdata/Hospitalorganization";
const Organizationdata = () => {
  const { user, token } = GlobalContext();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const [donororganization, setdonororganization] = useState([]);
  const [hospitalorganization, sethospitalorganization] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);
  const [loading1, setloading1] = useState(true);
  const [search, setsearch] = useState("");
  const limit = 10;
  useEffect(() => {
    const apiurl = search
      ? `${api}inventory/donororganization?organization=${search}&page=${page}`
      : `${api}inventory/donororganization?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => setdonororganization(res.data))
      .catch((e) => console.log("eeeee", e))
      .finally(() => setloading(false));
  }, [search, loading, page]);
  useEffect(() => {
    const apiurl = search
      ? `${api}inventory/hospitalorganization?organization=${search}&page=${page}`
      : `${api}inventory/hospitalorganization?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => sethospitalorganization(res.data))
      .catch((e) => console.log("eeeee", e))
      .finally(() => setloading1(false));
  }, [search, loading1, page]);
  const handleChange = (event) => {
    setsearch(event.target.value);
  };
  const handlePage = (current) => {
    setloading(loading);
    setloading1(true);
    setpage(current);
  };
  // const hospitalorganization = useFetch(`${api}inventory/hospitalorganization`);
  return (
    <React.Fragment>
      {(() => {
        switch (user?.role) {
          case "Donor":
            return (
              <LoadingOverlay active={loading} spinner text="Loading">
                <Layout>
                  <Donororganizationdata
                    loading={loading}
                    donororganization={donororganization}
                    handleChange={handleChange}
                    handlePage={handlePage}
                    search={search}
                    page={page}
                    limit={limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "Hospital":
            return (
              <LoadingOverlay active={loading1} spinner text="Loading">
                <Layout>
                  <Hospitalorganization
                    loading={loading}
                    hospitalorganization={hospitalorganization}
                    handleChange={handleChange}
                    handlePage={handlePage}
                    search={search}
                    page={page}
                    limit={limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
        }
      })()}
    </React.Fragment>
  );
};

export default Organizationdata;
