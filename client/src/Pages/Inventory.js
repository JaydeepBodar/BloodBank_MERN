import React,{useState} from "react";
import Layout from "../utils/Layout";
import { GrAdd } from "react-icons/gr";
import styles from "../Style/Donor.module.css";
import useFetch from "../Customhooks/useFetch";
import { api } from "../utils/api";
import moment from "moment";
import { AiFillEye } from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
import InventoryModal from "../Component/InventoryModal";
import Tostify from "../Component/Tostify";
const Inventory = () => {
  const inventory = useFetch(`${api}inventory/getInventory`);
  const donorinventory = useFetch(`${api}inventory/donorinventory`);
  const hospitalinventory = useFetch(`${api}inventory/hospitalInventory`);
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Layout>
      <div>
        {location?.pathname === "/home/inventory" && (
          <div className={styles.add_inventory}>
            <Tostify/>
            <h3 onClick={handleShow}>
              <span>
                <GrAdd />
              </span>
              Add Inventory
            </h3>
            <InventoryModal show={show} handleClose={handleClose} />
          </div>
        )}
        {(() => {
          switch (location?.pathname) {
            case "/home/inventory":
              return (
                <React.Fragment>
                  {inventory?.loading && <p>Loading...</p>}
                  {!inventory?.loading &&
                    inventory?.data?.allInventory?.length === 0 && (
                      <div className={styles.user_record}>
                        <h3>No Recoard Found Of Inventory Record</h3>
                      </div>
                    )}
                  {!inventory?.loading &&
                    inventory?.data?.allInventory?.length > 0 && (
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
                          {inventory?.data?.allInventory?.map(
                            (value, index) => {
                              const {
                                inventoryType,
                                bloodgroup,
                                Quantity,
                                Donor,
                                createdAt,
                                Hospital,
                              } = value;
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{inventoryType}</td>
                                  <td>{Quantity} ML</td>
                                  <td>{bloodgroup}</td>
                                  <td>
                                    {Donor?.email
                                      ? Donor?.email
                                      : Hospital?.email}
                                  </td>
                                  <td>
                                    {moment(createdAt).format("Do MMM YY")}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </table>
                      </div>
                    )}
                </React.Fragment>
              );
            case "/home/donorinventory":
              return (
                <React.Fragment>
                  {donorinventory?.loading && <p>Loading...</p>}
                  {!donorinventory?.loading &&
                    donorinventory?.data?.getDonorInventory?.length === 0 && (
                      <div className={styles.user_record}>
                        <h3>No Recoard Found Of Donor Inventory Record</h3>
                      </div>
                    )}
                  {!donorinventory?.loading &&
                    donorinventory?.data?.getDonorInventory?.length > 0 && (
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
                          {donorinventory?.data?.getDonorInventory?.map(
                            (value, index) => {
                              const {
                                inventoryType,
                                bloodgroup,
                                Quantity,
                                Donor,
                                createdAt,
                              } = value;
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{Donor?.name}</td>
                                  <td>{inventoryType}</td>
                                  <td>{Quantity} ML</td>
                                  <td>{bloodgroup}</td>
                                  <td>{Donor?.email}</td>
                                  <td>
                                    {moment(createdAt).format("Do MMM YY")}
                                  </td>
                                  <td>
                                    <Link to={`/home/donor/${Donor?._id}`}>
                                      <AiFillEye />
                                    </Link>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </table>
                      </div>
                    )}
                </React.Fragment>
              );
            case "/home/hospitalinventory":
              return (
                <React.Fragment>
                  {hospitalinventory?.loading && <p>Loading...</p>}
                  {!hospitalinventory?.loading &&
                    hospitalinventory?.data?.gethospitalInventory?.length === 0 && (
                      <div className={styles.user_record}>
                        <h3>No Recoard Found Of Hospital Inventory</h3>
                      </div>
                    )}
                  {!hospitalinventory?.loading &&
                    hospitalinventory?.data?.gethospitalInventory?.length > 0 && <div className={styles.donor_data}>
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
                      {hospitalinventory?.data?.gethospitalInventory?.map(
                        (value, index) => {
                          const {
                            inventoryType,
                            bloodgroup,
                            Quantity,
                            Hospital,
                            createdAt,
                          } = value;
                          return (
                            <tr>
                              <td>{index + 1}</td>
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
                        }
                      )}
                    </table>
                  </div>}
                </React.Fragment>
              );
            default:
              return null;
          }
        })()}
      </div>
    </Layout>
  );
};

export default Inventory;
