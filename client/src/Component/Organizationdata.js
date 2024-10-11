import React, { useState, useEffect } from "react";
import Layout from "../utils/Layout";
import { api } from "../utils/api";
import LoadingOverlay from "react-loading-overlay";
import { GlobalContext } from "../Context/Authcontext";
import axios from "axios";
import Donororganizationdata from "./Organizationdata/Donororganizationdata";
import Hospitalorganization from "./Organizationdata/Hospitalorganization";
import useFetch from "../Customhooks/useFetch";
import Authorization from "../utils/Authorization";
const Organizationdata = () => {
  const { user } = GlobalContext();
  const [search, setsearch] = useState({
    hospitalorg: "",
    donororg: "",
  });
  const { hospitalorg, donororg } = search;
  const Dsearch = {
    "search": `${donororg}`,
  };
  const Hsearch = {
    "search": `${hospitalorg}`,
  };
  const donororganization = useFetch(
    `${api}inventory/donororganization`,
    donororg?.length > 0 ? Dsearch : ""
  );
  const hospitalorganization = useFetch(
    `${api}inventory/hospitalorganization`,
    hospitalorg?.length > 0 ? Hsearch : ""
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setsearch({ ...search, [name]: value });
  };
  return (
    <React.Fragment>
      {(() => {
        switch (user?.role) {
          case "Donor":
            return (
              <LoadingOverlay
                active={donororganization?.loading}
                spinner
                text="Loading"
              >
                <Layout>
                  <Donororganizationdata
                    loading={donororganization?.loading}
                    donororganization={donororganization?.data}
                    handleChange={handleChange}
                    handlePage={donororganization?.handlePage}
                    search={donororg}
                    page={donororganization?.page}
                    limit={donororganization?.limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "Hospital":
            return (
              <LoadingOverlay active={hospitalorganization?.loading} spinner text="Loading">
                <Layout>
                  <Hospitalorganization
                    loading={hospitalorganization?.loading}
                    hospitalorganization={hospitalorganization?.data}
                    handleChange={handleChange}
                    handlePage={hospitalorganization?.handlePage}
                    search={hospitalorg}
                    page={hospitalorganization?.page}
                    limit={hospitalorganization?.limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
        }
      })()}
    </React.Fragment>
  );
};

export default Authorization(Organizationdata);
