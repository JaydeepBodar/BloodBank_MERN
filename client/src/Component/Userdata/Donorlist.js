import React from "react";
import InputType from "../InputType";
import Donordata from "../Donordata";
import Custompagination from "../Cutompagination";
import styles from "../../Style/Donor.module.css";
import { useLocation } from "react-router-dom";
const Donorlist = ({
  donor,
  loading,
  search,
  limit,
  handleChange,
  page,
  handlePage,
}) => {
  const location = useLocation();
  return (
    <React.Fragment>
      {!loading && (
        <div className={styles.search_data}>
          <InputType
            value={search}
            name="donordata"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Donor name or Email"
          />
        </div>
      )}
      {!loading && donor?.donor?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of User</h3>
        </div>
      )}
      <div className={styles.donor_data}>
        {!loading && donor?.donor?.length > 0 && (
          <React.Fragment>
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>No</th>
                  <th>Name</th>
                  <th>Blood group</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Joined us</th>
                  <th>view</th>
                </tr>
              </thead>
              <tbody>
                {location.pathname === "/home/donorlist" &&
                  donor?.donor?.map((donor, index) => {
                    return (
                      <Donordata
                        donor={donor}
                        key={index}
                        sr={index + 1}
                        limit={limit}
                        page={page}
                      />
                    );
                  })}
              </tbody>
            </table>
            {donor?.totalitem >= donor?.itemperpage && (
              <Custompagination
                itemperpage={donor?.itemperpage}
                totalitem={donor?.totalitem}
                page={page}
                handlePage={handlePage}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Donorlist;
