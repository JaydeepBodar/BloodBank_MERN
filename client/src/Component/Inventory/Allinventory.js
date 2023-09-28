import React from "react";
import InputType from "../InputType";
import moment from "moment";
import Pagination from "react-js-pagination";
import styles from "../../Style/Donor.module.css";
const Allinventory = ({ loading,inventory,handleChange,handlePage,search,page,limit }) => {
  return (
    <React.Fragment>
      {loading && inventory?.allInventory?.length === 0 && (
        <div className={styles.user_record}>
          <h3>No Recoard Found Of Inventory Record</h3>
        </div>
      )}
      {!loading && (
        <div className={styles.search_data}>
          <InputType
            value={search}
            name="search"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Inventory Type or Blood group"
          />
        </div>
      )}
      {!loading &&
        search?.length > 0 &&
        inventory?.allInventory?.length === 0 && (
          <div className={styles.user_record}>
            <h3>No Recoard Found Of Your search</h3>
          </div>
        )}
      {!loading && inventory?.allInventory?.length > 0 && (
        <React.Fragment>
          <div className={styles.donor_data}>
            <table>
              <tr>
                <th>sr</th>
                <th>Inventory Type</th>
                <th>Quantity(ML)</th>
                <th>Blood Group</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
              {inventory?.allInventory?.map((value, index) => {
                const {
                  inventoryType,
                  bloodgroup,
                  Quantity,
                  Donor,
                  createdAt,
                  Hospital,
                } = value;
                return (
                  <tr key={index}>
                    <td>{index + 1 + (page - 1) * limit}</td>
                    <td>{inventoryType}</td>
                    <td>{Quantity} ML</td>
                    <td>{bloodgroup}</td>
                    <td>{Donor?.email ? Donor?.email : Hospital?.email}</td>
                    <td>{moment(createdAt).format("Do MMM YY")}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </React.Fragment>
      )}
      <div className="pagination_data">
        <Pagination
          activePage={page}
          itemsCountPerPage={inventory?.itemperpage}
          totalItemsCount={inventory?.totalitem}
          onChange={(e)=>handlePage(e)}
          innerClass="d-flex justify-content-center"
          activeClass="bg-primary text-light"
          itemClass="px-2 py-1 border"
          firstPageText={"First"}
          lastPageText={"Last"}
          nextPageText={"Next"}
          prevPageText={"Prev"}
        />
      </div>
    </React.Fragment>
  );
};

export default Allinventory;
