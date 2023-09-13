import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from '../Style/Modaldata.module.css'
import { GlobalContext } from "../Context/Authcontext";
import moment from 'moment'
const Modaldata = ({ show, handleClose }) => {
  const {data,newdata,user}=GlobalContext()
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modal_body}>
          <h3 className="text-capitlize">{newdata}</h3>
          <h4>Name: {data}</h4>
          <h4>Email: {user?.email}</h4>
          <h4>Role: {user?.role}</h4>
          <h6>Created on:- {moment(user?.createdAt).format('Do MMM YYYY')}</h6>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modaldata;
