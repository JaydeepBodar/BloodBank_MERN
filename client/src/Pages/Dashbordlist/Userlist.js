import React, { useState } from "react";
import Layout from "../../utils/Layout";
import { api } from "../../utils/api";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Donorlist from "../../Component/Userdata/Donorlist";
import Hospitallist from "../../Component/Userdata/Hospitallist";
import Organizationlist from "../../Component/Userdata/Organizationlist";
import useFetch from "../../Customhooks/useFetch";
const Userlist = () => {
  const [search, setsearch] = useState({
    donordata: "",
    organizationdata: "",
    hospitaldata: "",
  });
  const { donordata, organizationdata, hospitaldata } = search;
  const location = useLocation();
  // for donor list
  const Dsearchdata = {
    "search": `${donordata}`,
  };
  const Hsearchdata = {
    "search": `${hospitaldata}`,
  };
  const Osearchdata = {
    "search": `${organizationdata}`,
  };
  const donor = useFetch(
    `${api}auth/donor`,
    donordata?.length > 0 ? Dsearchdata : ""
  );
  const hospital = useFetch(
    `${api}auth/hospital`,
    hospitaldata?.length > 0 ? Hsearchdata : ""
  );
  const organization = useFetch(
    `${api}auth/organization`,
    organizationdata?.length > 0 ? Osearchdata : ""
  );
  console.log("firstdonor", hospital);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setsearch({ ...search, [name]: value });
  };
  return (
    <React.Fragment>
      {(() => {
        switch (location?.pathname) {
          case "/home/donorlist":
            return (
              <LoadingOverlay active={donor?.loading} spinner text="Loading">
                <Layout>
                  <Donorlist
                    donor={donor?.data}
                    page={donor?.page}
                    limit={donor?.limit}
                    handlePage={donor?.handlePage}
                    handleChange={handleChange}
                    search={donordata}
                    loading={donor?.loading}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/organizationlist":
            return (
              <LoadingOverlay
                active={organization?.loading}
                spinner
                text="Loading"
              >
                <Layout>
                  <Organizationlist
                    organization={organization?.data}
                    page={organization?.page}
                    limit={organization?.limit}
                    handlePage={organization?.handlePage}
                    handleChange={handleChange}
                    search={organizationdata}
                    loading={organization?.loading}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/Hospitallist":
            return (
              <LoadingOverlay active={hospital?.loading} spinner text="Loading">
                <Layout>
                  <Hospitallist
                    hospital={hospital?.data}
                    page={hospital?.page}
                    limit={hospital?.limit}
                    handlePage={hospital?.handlePage}
                    handleChange={handleChange}
                    search={hospitaldata}
                    loading={hospital?.loading}
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
