import React, { useState, useEffect } from "react";
import Layout from "../../utils/Layout";
import { api } from "../../utils/api";
import styles from "../../Style/Donor.module.css";
import Donordata from "../../Component/Donordata";
import useFetch from "../../Customhooks/useFetch";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

const Userlist = () => {
  const donor = useFetch(`${api}auth/donor`);
  const organization = useFetch(`${api}auth/organization`);
  const hospital = useFetch(`${api}auth/hospital`);
  // console.log("hospital", hospital);
  console.log(
    "donor",
    donor?.data?.donor?.length !== 0 ||
      organization?.data?.Organization?.length !== 0 ||
      hospital?.data?.hospital?.length !== 0
  );
  const location = useLocation();
  return (
    <React.Fragment>
      {/* {donor?.data?.donor?.length === 0 ||
        organization?.data?.Organization?.length === 0 ||
        (hospital?.data?.hospital?.length === 0 && <p>Record Not Found</p>)} */}
      {/* {donor?.loading ||
        organization?.loading ||
        (hospital?.loading && <p>Loading...</p>)}
      {!donor?.loading && !organization?.loading && !hospital?.loading && ( */}
      {(() => {
        switch (location?.pathname) {
          case "/home/donorlist":
            return (
              <LoadingOverlay active={donor.loading} spinner text="Loading">
                <Layout>
                  <div className={styles.donor_data}>
                    {!donor.loading && donor?.data?.donor?.length > 0 && (
                      <table>
                        <thead>
                          <tr style={{ textAlign: "center" }}>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Blood group</th>
                            <th>Joined us</th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>
                          {location.pathname === "/home/donorlist" &&
                            donor?.data?.donor?.map((donor, index) => {
                              return (
                                <Donordata
                                  donor={donor}
                                  key={index}
                                  sr={index + 1}
                                />
                              );
                            })}
                        </tbody>
                      </table>
                    )}
                    {!donor.loading && donor?.data?.donor?.length === 0 && (
                      <div className={styles.user_record}>
                        <h3>No Recoard Found Of User</h3>
                      </div>
                    )}
                  </div>
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
                  <div className={styles.donor_data}>
                    {!organization?.loading &&
                      organization?.data?.Organization?.length > 0 && (
                        <table>
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>No</th>
                              <th>Organization Name</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Joined us</th>
                              <th>view</th>
                            </tr>
                          </thead>
                          <tbody>
                            {location.pathname === "/home/organizationlist" &&
                              organization?.data?.Organization?.map(
                                (organization, index) => {
                                  return (
                                    <Donordata
                                      donor={organization}
                                      key={index}
                                      sr={index + 1}
                                    />
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      )}
                    {!organization?.loading &&
                      organization?.data?.Organization?.length === 0 && (
                        <div className={styles.user_record}>
                          <h3>No Recoard Found Of Organization</h3>
                        </div>
                      )}
                  </div>
                </Layout>
              </LoadingOverlay>
            );
          case "/home/Hospitallist":
            return (
              <LoadingOverlay active={hospital?.loading} spinner text="Loading">
                <Layout>
                  <div
                    className={
                      hospital?.data?.hospital?.length !== 0
                        ? styles.donor_data
                        : styles.no_record
                    }
                  >
                    {!hospital.loading &&
                      hospital?.data?.hospital?.length > 0 && (
                        <table>
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>No</th>
                              <th>Hospital Name</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Joined us</th>
                              <th>view</th>
                            </tr>
                          </thead>
                          <tbody>
                            {location.pathname === "/home/Hospitallist" &&
                              hospital?.data?.hospital?.map(
                                (hospital, index) => {
                                  return (
                                    <Donordata
                                      donor={hospital}
                                      key={index}
                                      sr={index + 1}
                                    />
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      )}
                    {!hospital.loading &&
                      hospital?.data?.hospital?.length === 0 && (
                        <div className={styles.user_record}>
                          <h3>No Recoard Found Of Hospital</h3>
                        </div>
                      )}
                  </div>
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
