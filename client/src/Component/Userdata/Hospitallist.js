import React from "react";
import InputType from "../InputType";
import Donordata from "../Donordata";
import Custompagination from "../Cutompagination";
import styles from "../../Style/Donor.module.css";
import { useLocation } from "react-router-dom";
const Hospitallist = ({
  loading,
  hospital,
  search,
  page,
  limit,
  handleChange,
  handlePage,
}) => {
  const location = useLocation();
  return (
    <React.Fragment>
      {!loading && (
        <div className={styles.search_data}>
          <InputType
            value={search}
            name="search"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Donor name or Email"
          />
        </div>
      )}
      {!loading && search?.length > 0 && hospital?.hospital?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of Your search</h3>
        </div>
      )}
      {!loading && search?.length === 0 && hospital?.hospital?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of Hospital</h3>
        </div>
      )}
      <div
        className={
          hospital?.hospital?.length !== 0
            ? styles.donor_data
            : styles.no_record
        }
      >
        {!loading && hospital?.hospital?.length > 0 && (
          <React.Fragment>
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
                  hospital?.hospital?.map((hospital, index) => {
                    return (
                      <Donordata
                        donor={hospital}
                        key={index}
                        sr={index + 1}
                        limit={limit}
                        page={page}
                      />
                    );
                  })}
              </tbody>
            </table>
            {hospital?.totalitem >= hospital?.itemperpage && (
              <Custompagination
                itemperpage={hospital?.itemperpage}
                totalitem={hospital?.totalitem}
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

export default Hospitallist;
