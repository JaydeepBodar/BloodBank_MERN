import React, { useState, useEffect } from "react";
import Layout from "../../utils/Layout";
import { api } from "../../utils/api";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { GlobalContext } from "../../Context/Authcontext";
import Donorlist from "../../Component/Userdata/Donorlist";
import Hospitallist from "../../Component/Userdata/Hospitallist";
import Organizationlist from "../../Component/Userdata/Organizationlist";
const Userlist = () => {
  const { token } = GlobalContext();
  const [donor, setdonor] = useState([]);
  const [hospital, sethospital] = useState([]);
  const [organization, setorganization] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(true);
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [page, setpage] = useState(1);
  const location = useLocation();
  const limit = 10;
  const config = { headers: { Authorization: token } };
  // for donor list
  useEffect(() => {
    const apiurl = search
      ? `${api}auth/donor?search=${search}&page=${page}`
      : `${api}auth/donor?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => setdonor(res.data))
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false));
  }, [loading, search, page, location]);

  // for hospital list
  useEffect(() => {
    const apiurl = search
      ? `${api}auth/hospital?search=${search}&page=${page}`
      : `${api}auth/hospital?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => sethospital(res.data))
      .catch((e) => console.log("e", e))
      .finally(() => setloading1(false));
  }, [loading1, search, page, location]);
  // for organization list
  useEffect(() => {
    const apiurl = search
      ? `${api}auth/organization?search=${search}&page=${page}`
      : `${api}auth/organization?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => setorganization(res.data))
      .catch((e) => console.log("e", e))
      .finally(() => setloading2(false));
  }, [loading2, search, page, location]);

  // for search and pagination
  const handleChange = (event) => {
    setsearch(event.target.value);
  };
  const handlePage = (current) => {
    setloading(true);
    setloading1(true);
    setloading2(true);
    setpage(current);
  };
  return (
    <React.Fragment>
      {(() => {
        switch (location?.pathname) {
          case "/home/donorlist":
            return (
              <LoadingOverlay active={loading} spinner text="Loading">
                <Layout>
                  <Donorlist
                    donor={donor}
                    page={page}
                    limit={limit}
                    handlePage={handlePage}
                    handleChange={handleChange}
                    search={search}
                    loading={loading}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/organizationlist":
            return (
              <LoadingOverlay active={loading2} spinner text="Loading">
                <Layout>
                  <Organizationlist
                    organization={organization}
                    page={page}
                    limit={limit}
                    handlePage={handlePage}
                    handleChange={handleChange}
                    search={search}
                    loading={loading2}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/Hospitallist":
            return (
              <LoadingOverlay active={loading1} spinner text="Loading">
                <Layout>
                  <Hospitallist
                    hospital={hospital}
                    page={page}
                    limit={limit}
                    handlePage={handlePage}
                    handleChange={handleChange}
                    search={search}
                    loading={loading1}
                  />
                </Layout>
              </LoadingOverlay>
            );
          default:
            return null;
        }
      })()}
    </React.Fragment>
  );
};

export default Userlist;
