import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../Context/Authcontext";
import useFetch from "../Customhooks/useFetch";
import styles from "../Style/Modaldata.module.css";
import { api } from "../utils/api";
import InputType from "./InputType";
import { bloodgroupdata } from "../utils/bloodgroup";
const InventoryModal = ({ show, handleClose }) => {
  const organization = useFetch(`${api}auth/organization`);
  const hospital = useFetch(`${api}auth/hospital`);
  const navigate = useNavigate();
  const { token, user } = GlobalContext();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const [useriventory, setuseriventory] = useState({
    inventoryType: "",
    Organization: "",
    email: "",
    Quantity: "",
    bloodgroup: "",
    Hospital: "",
  });
  const { inventoryType, Organization, email, Quantity, bloodgroup, Hospital } =
    useriventory;
  // console.log("Organization", Organization)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuseriventory({ ...useriventory, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    switch (user?.role) {
      case "Donor":
        data = {
          inventoryType,
          Organization,
          email,
          Quantity,
          bloodgroup,
          Donor: user?._id,
        };
      case "Organization":
        data = {
          inventoryType,
          Hospital,
          email,
          Quantity,
          bloodgroup,
          Organization: user?._id,
        };
    }
    axios
      .post(
        `${api}inventory/createInventory`, data,
        config
      )
      .then((res) => {
        if (res.status === 201) {
          navigate("/home/donororganization");
          setuseriventory({
            inventoryType: "",
            Organization: "",
            email: "",
            Quantity: "",
            bloodgroup: "",
          });
        }else if(res.status === 200){
          navigate("/home/hospitalinventory");
          setuseriventory({
            inventoryType: "",
            Hospital:"",
            email: "",
            Quantity: "",
            bloodgroup: "",
          });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 403) {
          toast.error(e?.response?.data?.message);
        } else if (e?.response?.status === 400) {
          toast.error(e?.response?.data?.message);
        } else if (e?.response?.status === 405) {
          toast.error(e?.response?.data?.message);
        } else if (e?.response?.status === 408) {
          toast.error(e?.response?.data?.message);
        } else if (e?.response?.status === 409) {
          toast.error(e?.response?.data?.message);
        }
      });
  };
  // console.log("firstiventory", {inventoryType, Organization, email, Quantity, bloodgroup, Donor: user?._id})
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add {user?.role === "Donor" ? <span>Donor</span> : <span>Hospital</span>} Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modal_body}>
          <form onSubmit={handleSubmit} className={styles.form_data}>
            <div className={styles.dropdown_add}>
              <select
                value={inventoryType}
                name="inventoryType"
                onChange={handleChange}
              >
                <option hidden>Select Inventory Type</option>
                <option value="in" name="inventoryType">
                  In
                </option>
                <option value="out" name="inventoryType">
                  Out
                </option>
              </select>
              {(() => {
                switch (user?.role) {
                  case "Donor":
                    return (
                      <select
                        value={Organization}
                        name="Organization"
                        onChange={handleChange}
                      >
                        <option hidden>Select Organization </option>
                        {organization?.data?.Organization?.map((val) => {
                          return (
                            <option
                              name="Organization"
                              value={val?._id}
                              key={val?._id}
                            >
                              {val?.organizationName}
                            </option>
                          );
                        })}
                      </select>
                    );
                  case "Organization":
                    return (
                      <select
                        value={Hospital}
                        name="Hospital"
                        onChange={handleChange}
                      >
                        <option hidden>Select Hospital </option>
                        {hospital?.data?.hospital?.map((val) => {
                          return (
                            <option
                              name="Hospital"
                              value={val?._id}
                              key={val?._id}
                            >
                              {val?.hospitalName}
                            </option>
                          );
                        })}
                      </select>
                    );
                  default:
                    return null;
                }
              })()}
              <select
                value={bloodgroup}
                onChange={handleChange}
                name="bloodgroup"
              >
                <option hidden>Select Bloodgroup...</option>
                {bloodgroupdata?.map((val, index) => {
                  return (
                    <option name="bloodgroup" value={val?.value} key={index}>
                      {val?.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.form_group}>
              <InputType
                label={user?.role === "Donor" ? <span>Donor Email</span> : <span>Hospital email</span>}
                value={email}
                onChange={handleChange}
                name="email"
                type="email"
              />
            </div>
            <div className={styles.form_group}>
              <InputType
                label="Quantity(ML)"
                value={Quantity}
                onChange={handleChange}
                name="Quantity"
                type="text"
              />
            </div>
            <Button type="submit" style={{ marginTop: "10px" }}>
              submit
            </Button>
          </form>
          {/* <h3 className="text-capitlize">{newdata}</h3>
        <h4>Name: {data}</h4>
        <h4>Email: {user?.email}</h4>
        <h4>Role: {user?.role}</h4>
        <h6>Created on:- {moment(user?.createdAt).format('Do MMM YYYY')}</h6> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InventoryModal;
