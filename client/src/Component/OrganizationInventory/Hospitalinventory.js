import React from "react";
import InputType from "../InputType";
import moment from "moment";
import Custompagination from "../Cutompagination";
import styles from "../../Style/Donor.module.css";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const Hospitalinventory = ({
  loading,
  hospitalinventory,
  handleChange,
  handlePage,
  search,
  page,
  limit,
}) => {
  return (
    <React.Fragment>
      {!loading && (
        <div className={styles.search_data}>
          <InputType
            value={search}
            name="hospitalinventorydata"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Blood group"
          />
        </div>
      )}
      {!loading && hospitalinventory?.gethospitalInventory?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of Hospital Inventory</h3>
        </div>
      )}
      {!loading && hospitalinventory?.gethospitalInventory?.length > 0 && (
        <React.Fragment>
          <div className={styles.donor_data}>
            <table>
              <tr>
                <th>sr</th>
                <th>Hospital name</th>
                <th>Inventory Type</th>
                <th>Quantity(ML)</th>
                <th>Blood Group</th>
                <th>Email</th>
                <th>Date</th>
                <th>view</th>
              </tr>
              {hospitalinventory?.gethospitalInventory?.map((value, index) => {
                const {
                  inventoryType,
                  bloodgroup,
                  Quantity,
                  Hospital,
                  createdAt,
                } = value;
                return (
                  <tr>
                    <td>{index + 1 + (page - 1) * limit}</td>
                    <td>{Hospital?.hospitalName}</td>
                    <td>{inventoryType}</td>
                    <td>{Quantity} ML</td>
                    <td>{bloodgroup}</td>
                    <td>{Hospital?.email}</td>
                    <td>{moment(createdAt).format("Do MMM YY")}</td>
                    <td>
                      <Link to={`/home/donor/${Hospital?._id}`}>
                        <AiFillEye />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {hospitalinventory?.totalitem >= hospitalinventory?.itemperpage && (
            <Custompagination
              totalitem={hospitalinventory?.totalitem}
              itemperpage={hospitalinventory?.itemperpage}
              page={page}
              handlePage={handlePage}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Hospitalinventory;
