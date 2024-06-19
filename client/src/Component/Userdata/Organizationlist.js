import React from "react";
import InputType from "../InputType";
import Donordata from "../Donordata";
import Custompagination from "../Cutompagination";
import { useLocation } from "react-router-dom";
import styles from "../../Style/Donor.module.css";
const Organizationlist = ({
  organization,
  loading,
  limit,
  page,
  search,
  handlePage,
  handleChange,
}) => {
	const location=useLocation()
  return (
    <React.Fragment>
      {!loading && (
        <div className={styles.search_data}>
          <InputType
            value={search}
            name="organizationdata"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Organization name or Email"
          />
        </div>
      )}
      {!loading &&
        organization?.Organization?.length === 0 && (
          <div className={styles.user_record}>
            <h3>No Recoard Found Of Hospital</h3>
          </div>
        )}
      <div className={styles.donor_data}>
        {!loading && organization?.Organization?.length > 0 && (
          <React.Fragment>
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
                  organization?.Organization?.map((organization, index) => {
                    return (
                      <Donordata
                        donor={organization}
                        key={index}
                        sr={index + 1}
                        limit={limit}
                        page={page}
                      />
                    );
                  })}
              </tbody>
            </table>
            {organization?.totalitem >= organization?.itemperpage && (
              <Custompagination
                itemperpage={organization?.itemperpage}
                page={page}
                handlePage={handlePage}
                totalitem={organization?.totalitem}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Organizationlist;
