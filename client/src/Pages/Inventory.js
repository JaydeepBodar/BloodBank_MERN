import React, { useState, useEffect } from "react";
import Layout from "../utils/Layout";
import { GrAdd } from "react-icons/gr";
import styles from "../Style/Donor.module.css";
import { api } from "../utils/api";
import { useLocation } from "react-router-dom";
import InventoryModal from "../Component/InventoryModal";
import Tostify from "../Component/Tostify";
import LoadingOverlay from "react-loading-overlay";
import { GlobalContext } from "../Context/Authcontext";
import Allinventory from "../Component/OrganizationInventory/Allinventory";
import Donorinventory from "../Component/OrganizationInventory/Donorinventory";
import Hospitalinventory from "../Component/OrganizationInventory/Hospitalinventory";
import useFetch from "../Customhooks/useFetch";
const Inventory = () => {
  const { token } = GlobalContext();
  const location = useLocation();
  // const [hospitalinventory, sethospitalinventory] = useState([]);
  const [search, setsearch] = useState({
    inventorydata: "",
    donorinventorydata: "",
    hospitalinventorydata: "",
  });
  const { inventorydata, donorinventorydata, hospitalinventorydata } = search;
  const [show, setShow] = useState(false);
  const ivdata = {
    "inventoryType": `${inventorydata}`,
    "bloodgroup": `${inventorydata}`,
  };
  const donordata = {
    "bloodgroup": `${donorinventorydata}`,
  };
  const hospitaldata={
    "bloodgroup": `${hospitalinventorydata}`,
  }
  const inventory = useFetch(
    `${api}inventory/getInventory`,
    inventorydata?.length > 0 ? ivdata : ""
  );
  console.log("objectinventoryinventoryinventory",inventory)
  const donorinventory = useFetch(
    `${api}inventory/donorinventory`,
    donorinventorydata?.length > 0 ? donordata : ""
  );
  const hospitalinventory = useFetch(
    `${api}inventory/hospitalinventory`,
    hospitalinventorydata?.length > 0 ? hospitaldata : ""
  );
  // const config = {
  //   headers: {
  //     Authorization: token,
  //   },
  // };
  // useEffect(() => {
  //   const apiurl = search
  //     ? `${api}inventory/donorinventory?bloodgroup=${search}&page=${page}`
  //     : `${api}inventory/donorinventory?page=${page}`;
  //   axios
  //     .get(apiurl, config)
  //     .then((res) => setdonorinventory(res.data))
  //     .catch((e) => console.log("eeee", e))
  //     .finally(() => setloading1(false));
  // }, [loading1, search, location, page]);
  const handleChange = (event) => {
    // inventory?.setloading(true)
    const { name, value } = event.target;
    setsearch({ ...search, [name]: value });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // case 1- All inventory
  // case 2- Dnorinventory
  // case 4 - hospital inventory
  return (
    <div>
      {(() => {
        switch (location?.pathname) {
          case "/home/inventory":
            return (
              <LoadingOverlay
                spinner
                text="Loading"
                active={inventory?.loading}
              >
                <Layout>
                  <Tostify />
                  <div className={styles.add_inventory}>
                    <h3 onClick={handleShow}>
                      <span>
                        <GrAdd />
                      </span>
                      Add Inventory
                    </h3>
                    <InventoryModal show={show} handleClose={handleClose} />
                  </div>
                  <Allinventory
                    loading={inventory?.loading}
                    inventory={inventory?.data}
                    handleChange={handleChange} 
                    handlePage={inventory?.handlePage}
                    search={inventorydata}
                    page={inventory?.page}
                    limit={inventory?.limit}
                  />
                </Layout>
              </LoadingOverlay>
            );

          case "/home/donorinventory":
            return (
              <LoadingOverlay
                spinner
                text="Loading"
                active={donorinventory?.loading}
              >
                <Tostify />
                <Layout>
                  <Donorinventory
                    loading={donorinventory?.loading}
                    donorinventory={donorinventory?.data}
                    handleChange={handleChange}
                    handlePage={donorinventory?.handlePage}
                    search={donorinventorydata}
                    page={donorinventory?.page}
                    limit={donorinventory?.limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/hospitalinventory":
            return (
              <LoadingOverlay active={hospitalinventory?.loading} spinner text="Loading">
                <Layout>
                  <Hospitalinventory
                    loading={hospitalinventory?.loading}
                    hospitalinventory={hospitalinventory?.data}
                    handleChange={handleChange}
                    handlePage={hospitalinventory?.handlePage}
                    search={hospitalinventorydata}
                    page={hospitalinventory?.page}
                    limit={hospitalinventory?.limit}
                  />
                </Layout>
              </LoadingOverlay>
            );

          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Inventory;
