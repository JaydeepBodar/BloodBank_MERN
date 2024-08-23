import React, { useState } from "react";
import useFetch from "../Customhooks/useFetch";
import Layout from "../utils/Layout";
import style from "../Style/Donor.module.css";
import { api } from "../utils/api";
import { GrAdd } from "react-icons/gr";
import InventoryModal from "../Component/InventoryModal";
import Tostify from "../Component/Tostify";
import LoadingOverlay from "react-loading-overlay";
import { GlobalContext } from "../Context/Authcontext";
import Custompagination from "../Component/Cutompagination";
import moment from "moment";
const Donorinventory = () => {
  const donorinventory = useFetch(`${api}inventory/indivisualdonor`, "");
  const hospitalinventory = useFetch(
    `${api}inventory/indivisualhospitalinventory`,
    ""
  );
  const { user } = GlobalContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      {(() => {
        switch (user?.role) {
          case "Donor":
            return (
              <LoadingOverlay
                spinner
                active={donorinventory?.loading}
                text="Loading"
              >
                <Layout>
                  {!donorinventory?.loading && (
                    <div className={style.add_inventory}>
                      <h3 onClick={handleShow}>
                        <Tostify />
                        <span>
                          <GrAdd />
                        </span>
                        Add Inventory
                      </h3>
                      <InventoryModal show={show} handleClose={handleClose} />
                    </div>
                  )}
                  {!donorinventory?.loading &&
                    donorinventory?.data?.donorInventory?.length === 0 && (
                      <div className={style.user_record}>
                        <h3>No Recoard Found Of Inventory Record</h3>
                      </div>
                    )}
                  {!donorinventory?.loading &&
                    donorinventory?.data?.donorInventory?.length > 0 && (
                      <React.Fragment>
                        <div className={style.donor_data}>
                          <table>
                            <thead>
                              {" "}
                              <tr>
                                <th>sr</th> 
                                <th>Name</th>
                                <th>Bloodgroup</th>
                                <th>Quantity(ML)</th>
                                <th>Email</th>
                                <th>Organization email</th>
                                <th>inventoryType</th>
                                <th>Donate date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {donorinventory?.data?.donorInventory?.map(
                                (value, index) => {
                                   {
                                    /* console.log("value", value); */
                                  }
                                  const {
                                    inventoryType,
                                    bloodgroup,
                                    Quantity,
                                    Organization,
                                    Donor,
                                    createdAt,
                                  } = value;
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{Donor?.name}</td>
                                      <td>{bloodgroup}</td>
                                      <td>{Quantity}ML</td>
                                      <td>{Donor?.email}</td>
                                      <td>{Organization?.email}</td>
                                      <td>{inventoryType}</td>
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
                        {donorinventory?.data?.totalitem >=
                          donorinventory?.data?.itemperpage && (
                          <Custompagination
                            page={donorinventory?.page}
                            itemperpage={donorinventory?.data?.itemperpage}
                            totalitem={donorinventory?.data?.totalitem}
                            handlePage={donorinventory?.handlePage}
                          />
                        )}
                      </React.Fragment>
                    )}
                </Layout>
              </LoadingOverlay>
            );
          case "Hospital":
            return (
              <LoadingOverlay
                active={hospitalinventory?.loading}
                spinner
                text="Loading"
              >
                <Layout>
                  {!hospitalinventory?.loading &&
                    hospitalinventory?.data?.hospitalinventory?.length ===
                      0 && (
                      <div className={style.user_record}>
                        <h3>No Recoard Found Of Inventory Record</h3>
                      </div>
                    )}
                  {!hospitalinventory?.loading &&
                    hospitalinventory?.data?.hospitalinventory?.length > 0 && (
                      <React.Fragment>
                      <div className={style.donor_data}>
                        <table>
                          <thead>
                            {" "}
                            <tr>
                              <th>sr</th>
                              <th>Name</th>
                              <th>Bloodgroup</th>
                              <th>Quantity(ML)</th>
                              <th>Email</th>
                              <th>Organization email</th>
                              <th>inventoryType</th>
                              <th>Incoming date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hospitalinventory?.data?.hospitalinventory?.map(
                              (value, index) => {
                                console.log("value", value);
                                const {
                                  inventoryType,
                                  bloodgroup,
                                  Quantity,
                                  Organization,
                                  Hospital,
                                  createdAt,
                                } = value;
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{Hospital?.hospitalName}</td>
                                    <td>{bloodgroup}</td>
                                    <td>{Quantity}ML</td>
                                    <td>{Hospital?.email}</td>
                                    <td>{Organization?.email}</td>
                                    <td>{inventoryType}</td>
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
                      {hospitalinventory?.data?.totalitem >=
                        hospitalinventory?.data?.itemperpage && (
                          <Custompagination
                            page={hospitalinventory?.page}
                            itemperpage={hospitalinventory?.data?.itemperpage}
                            totalitem={hospitalinventory?.data?.totalitem}
                            handlePage={hospitalinventory?.handlePage}
                          />
                        )}
                      </React.Fragment>
                    )}
                </Layout>
              </LoadingOverlay>
            );
          default:
            return null;
        }
      })()}
    </React.Fragment>
  );
};

export default Donorinventory;
