import React from "react";
import useFetch from "../Customhooks/useFetch";
import Layout from "../utils/Layout";
import styles from "../Style/Donor.module.css";
import { api } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
const Donororganization = () => {
  const { data, loading } = useFetch(`${api}inventory/donororganization`);
  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {!loading && data?.getDonorOrganization?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of Organization</h3>
        </div>
      )}
      {!loading && data?.getDonorOrganization?.length > 0 && (
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
              {data?.getDonorOrganization?.map((val, index) => {
                const { organizationName, email, website, address, createdAt } =
                  val;
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{organizationName}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                    <td>
                      <Link to={website}>{website}</Link>
                    </td>
                    <td>{moment(createdAt).format("Do MMM YY")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Donororganization;
