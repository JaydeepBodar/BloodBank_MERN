import React, { useState } from "react";
import useFetch from "../Customhooks/useFetch";
import Layout from "../utils/Layout";
import style from "../Style/Donor.module.css";
import Indivisualinventory from "../Component/Indivisualinventory";
import { api } from "../utils/api";
import { GrAdd } from "react-icons/gr";
import InventoryModal from "../Component/InventoryModal";
import Tostify from "../Component/Tostify";
const Donorinventory = () => {
  const { data, loading } = useFetch(`${api}inventory/indivisualdonor`);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Layout>
      {loading && <p>Loading</p>}
      {!loading && (
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
      {!loading && data?.donorInventory?.length === 0 && (
        <div className={style.user_record}>
          <h3>No Recoard Found Of Inventory Record</h3>
        </div>
      )}
      {!loading && data?.donorInventory?.length > 0 && (
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
            {data?.donorInventory?.map((value, index) => {
              return (
                <Indivisualinventory
                  inventory={value}
                  key={index}
                  sr={index + 1}
                />
              );
            })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Donorinventory;
