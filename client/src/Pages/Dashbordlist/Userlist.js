import React, { useState, useEffect } from "react";
import Layout from "../../utils/Layout";
import { api } from "../../utils/api";
import styles from "../../Style/Donor.module.css";
import Donordata from "../../Component/Donordata";
import useFetch from "../../Customhooks/useFetch";
import { useLocation } from "react-router-dom";
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
    <Layout>
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
              <div className={styles.donor_data}>
                <table>
                  {donor?.data?.donor?.length !== 0 && (
                    <tr style={{ textAlign: "center" }}>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Joined us</th>
                      <th>view</th>
                    </tr>
                  )}
                  {location.pathname === "/home/donorlist" &&
                    donor?.data?.donor?.map((donor, index) => {
                      return (
                        <Donordata donor={donor} key={index} sr={index + 1} />
                      );
                    })}
                </table>
                {donor?.data?.donor?.length === 0 && (
                  <div className={styles.user_record}>
                    <h3>No Recoard Found Of User</h3>
                  </div>
                )}
              </div>
            );
          case "/home/organizationlist":
            return (
              <div className={styles.donor_data}>
                <table>
                  {organization?.data?.Organization?.length !== 0 && (
                    <tr style={{ textAlign: "center" }}>
                      <th>No</th>
                      <th>Organization Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Joined us</th>
                      <th>view</th>
                    </tr>
                  )}
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
                </table>
                {organization?.data?.Organization?.length === 0 && (
                  <div className={styles.user_record}>
                    <h3>No Recoard Found Of Organization</h3>
                  </div>
                )}
              </div>
            );
          case "/home/Hospitallist":
            return (
              <div className={hospital?.data?.hospital?.length !== 0 ? styles.donor_data : styles.no_record}>
                <table>
                  {hospital?.data?.hospital?.length !== 0 && (
                    <tr style={{ textAlign: "center" }}>
                      <th>No</th>
                      <th>Hospital Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Joined us</th>
                      <th>view</th>
                    </tr>
                  )}
                  {location.pathname === "/home/Hospitallist" &&
                    hospital?.data?.hospital?.map((hospital, index) => {
                      return (
                        <Donordata
                          donor={hospital}
                          key={index}
                          sr={index + 1}
                        />
                      );
                    })}
                </table>
                {hospital?.data?.hospital?.length === 0 && (
                  <div className={styles.user_record}>
                    <h3>No Recoard Found Of Hospital</h3>
                  </div>
                )}
              </div>
            );
          default:
            return null;
        }
      })()}
    </Layout>
  );
};

export default Userlist;
