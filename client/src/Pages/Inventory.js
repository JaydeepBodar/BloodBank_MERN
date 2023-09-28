import React, { useState, useEffect } from "react";
import Layout from "../utils/Layout";
import { GrAdd } from "react-icons/gr";
import styles from "../Style/Donor.module.css";
import { api } from "../utils/api";
import { useLocation } from "react-router-dom";
import InventoryModal from "../Component/InventoryModal";
import Tostify from "../Component/Tostify";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { GlobalContext } from "../Context/Authcontext";
import Allinventory from "../Component/Inventory/Allinventory";
import Donorinventory from "../Component/Inventory/Donorinventory";
import Hospitalinventory from "../Component/Inventory/Hospitalinventory";
const Inventory = () => {
  const { token } = GlobalContext();
  const location = useLocation();
  // console.log("search", search?.length);
  const [inventory, setinventory] = useState([]);
  const [donorinventory, setdonorinventory] = useState([]);
  const [hospitalinventory, sethospitalinventory] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const limit = 10;
  const [show, setShow] = useState(false);
  // console.log("inventory?.totalitem", inventory?.totalitem);
  // const querydata=new URLSearchParams(location.search)
  // console.log("sgdgdgsgfdbddbd",querydata.get("page"))
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    const apiurl = search
      ? `${api}inventory/getInventory?inventoryType=${search}&bloodgroup=${search}&page=${page}`
      : `${api}inventory/getInventory?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => setinventory(res.data))
      .catch((e) => console.log("eeee", e))
      .finally(() => setloading(false));
  }, [loading, search, location, page]);
  useEffect(() => {
    const apiurl = search
      ? `${api}inventory/donorinventory?bloodgroup=${search}&page=${page}`
      : `${api}inventory/donorinventory?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => setdonorinventory(res.data))
      .catch((e) => console.log("eeee", e))
      .finally(() => setloading(false));
  }, [loading, search, location, page]);
  useEffect(() => {
    const apiurl = search
      ? `${api}inventory/hospitalInventory?bloodgroup=${search}&page=${page}`
      : `${api}inventory/hospitalInventory?page=${page}`;
    axios
      .get(apiurl, config)
      .then((res) => sethospitalinventory(res.data))
      .catch((e) => console.log("eeee", e))
      .finally(() => setloading(false));
  }, [loading, search, location, page]);
  // const hospitalinventory = useFetch(`${api}inventory/hospitalInventory`);
  // console.log("firstlocation", location);
  const handlePage = (current) => {
    setpage(current);
  };
  const handleChange = (event) => {
    setsearch(event.target.value);
  };
  // console.log("inventory?.itemperpage", inventory?.itemperpage);
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
              <LoadingOverlay spinner text="Loading" active={loading}>
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
                    loading={loading}
                    inventory={inventory}
                    handleChange={handleChange}
                    handlePage={handlePage}
                    search={search}
                    page={page}
                    limit={limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/donorinventory":
            return (
              <LoadingOverlay spinner text="Loading" active={loading}>
                <Tostify />
                <Layout>
                  <Donorinventory
                    loading={loading}
                    donorinventory={donorinventory}
                    handleChange={handleChange}
                    handlePage={handlePage}
                    search={search}
                    page={page}
                    limit={limit}
                  />
                </Layout>
              </LoadingOverlay>
            );
          case "/home/hospitalinventory":
            return (
              <LoadingOverlay active={loading} spinner text="Loading">
                <Layout>
                  <Hospitalinventory
                    loading={loading}
                    hospitalinventory={hospitalinventory}
                    handleChange={handleChange}
                    handlePage={handlePage}
                    search={search}
                    page={page}
                    limit={limit}
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
