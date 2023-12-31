import React from "react";
import InputType from "../InputType";
import { Link } from "react-router-dom";
import styles from "../../Style/Donor.module.css";
import moment from "moment";
import Custompagination from "../Cutompagination";
const Donororganizationdata = ({
  donororganization,
  loading,
  search,
  limit,
  handleChange,
  handlePage,
  page,
}) => {
  return (
    <React.Fragment>
      {!loading && (
        <div className={styles.search_data}>
          <InputType
            value={search}
            name="donororg"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Donor name or Email"
          />
        </div>
      )}
      {!loading &&
        donororganization?.getDonorOrganization?.length === 0 && (
          <div className={styles.user_record}>
            <h3>No Recoard Found Of Organization</h3>
          </div>
        )}
      {!loading && donororganization?.getDonorOrganization?.length > 0 && (
        <React.Fragment>
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
                {donororganization?.getDonorOrganization?.map((val, index) => {
                  const {
                    organizationName,
                    email,
                    website,
                    address,
                    createdAt,
                  } = val;
                  return (
                    <tr key={index}>
                      <td>{index + 1 + (page - 1) * limit}</td>
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
          {donororganization?.totalitem >= donororganization?.itemperpage && (
            <Custompagination
              itemperpage={donororganization?.itemperpage}
              page={page}
              handlePage={handlePage}
              totalitem={donororganization?.totalitem}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Donororganizationdata;
