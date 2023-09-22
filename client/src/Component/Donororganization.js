import React from "react";
import useFetch from "../Customhooks/useFetch";
import Layout from "../utils/Layout";
import styles from "../Style/Donor.module.css";
import { api } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { GlobalContext } from "../Context/Authcontext";
const Donororganization = () => {
  const donororganization = useFetch(`${api}inventory/donororganization`);
  const hospitalorganization = useFetch(`${api}inventory/hospitalorganization`);
  const { user } = GlobalContext();
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
                  {!donororganization?.loading &&
                    donororganization?.data?.getDonorOrganization?.length ===
                      0 && (
                      <div className={styles.user_record}>
                        <h3>No Recoard Found Of Organization</h3>
                      </div>
                    )}
                  {!donororganization?.loading &&
                    donororganization?.data?.getDonorOrganization?.length >
                      0 && (
                      <div className={styles.donor_data}>
                        <table>
                          <thead>
                            <tr>
                              <th>sr</th>
                              <th>Organization name</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Website</th>
                              <th>Founded on</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donororganization?.data?.getDonorOrganization?.map(
                              (val, index) => {
                                const {
                                  organizationName,
                                  email,
                                  website,
                                  address,
                                  createdAt,
                                } = val;
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{organizationName}</td>
                                    <td>{email}</td>
                                    <td>{address}</td>
                                    <td>
                                      <Link to={website}>{website}</Link>
                                    </td>
                                    <td>
                                      {moment(createdAt).format("Do MMM YY")}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                </Layout>
              </LoadingOverlay>
            );
          case "Hospital":
            return (
              <LoadingOverlay
                active={hospitalorganization?.loading}
                spinner
                text="Loading"
              >
                <Layout>
                  {!hospitalorganization?.loading &&
                    hospitalorganization?.data?.getHospitalorganization?.length ===
                      0 && (
                      <div className={styles.user_record}>
                        <h3>No Recoard Found Of Organization</h3>
                      </div>
                    )}
                  {!hospitalorganization?.loading &&
                    hospitalorganization?.data?.getHospitalorganization?.length >
                      0 && (
                      <div className={styles.donor_data}>
                        <table>
                          <thead>
                            <tr>
                              <th>sr</th>
                              <th>Organization name</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th>Website</th>
                              <th>Founded on</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hospitalorganization?.data?.getHospitalorganization?.map(
                              (val, index) => {
                                const {
                                  organizationName,
                                  email,
                                  website,
                                  address,
                                  createdAt,
                                } = val;
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{organizationName}</td>
                                    <td>{email}</td>
                                    <td>{address}</td>
                                    <td>
                                      <Link to={website}>{website}</Link>
                                    </td>
                                    <td>
                                      {moment(createdAt).format("Do MMM YY")}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                </Layout>
              </LoadingOverlay>
            );
        }
      })()}
    </React.Fragment>
  );
};

export default Donororganization;
