import React from "react";
import InputType from "../InputType";
import moment from "moment";
import styles from "../../Style/Donor.module.css";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cutompagination from "../Cutompagination";
const Donorinventory = ({
  loading,
  donorinventory,
  handleChange,
  handlePage,
  search,
  page,
  limit,
}) => {
  console.log("donorinventorydonorinventorydonorinventory", donorinventory);
  return (
    <React.Fragment>
      {!loading && (
        <div className={styles.search_data}>
          <InputType  
            value={search}
            name="donorinventorydata"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Blood group"
          />
        </div>
      )}
      {!loading && donorinventory?.getDonorInventory?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of Donor Inventory Record</h3>
        </div>
      )}
      {!loading && donorinventory?.getDonorInventory?.length > 0 && (
        <React.Fragment>
          <div className={styles.donor_data}>
            <table>
              <tr>
                <th>sr</th>
                <th>Name</th>
                <th>Inventory Type</th>
                <th>Quantity(ML)</th>
                <th>Blood Group</th>
                <th>Email</th>
                <th>Date</th>
                <th>view</th>
              </tr>
              {donorinventory?.getDonorInventory?.map((value, index) => {
                console.log("gtrhtymttggegegwgwggr", value);
                const {
                  inventoryType,
                  bloodgroup,
                  Quantity,
                  Donor,
                  createdAt,
                } = value;
                return (
                  <tr key={index}>
                    <td>{index + 1 + (page - 1) * limit}</td>
                    <td>{Donor?.name}</td>
                    <td>{inventoryType}</td>
                    <td>{Quantity} ML</td>
                    <td>{bloodgroup}</td>
                    <td>{Donor?.email}</td>
                    <td>{moment(createdAt).format("Do MMM YY")}</td>
                    <td>
                      <Link to={`/home/donor/${Donor?._id}`}>
                        <AiFillEye />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {donorinventory?.totalitem >= donorinventory?.itemperpage && (
            <Cutompagination
              totalitem={donorinventory?.totalitem}
              itemperpage={donorinventory?.itemperpage}
              page={page}
              handlePage={handlePage}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Donorinventory;
