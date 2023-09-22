import React from "react";  
import Sidebar from "../Component/Sidebar";
import { Row, Col } from "react-bootstrap";
import styles from '../Style/Layout.module.css'
import { Outlet, useLocation } from "react-router-dom";
const Layout = ({ children }) => {
  const location=useLocation()
  return (
    <React.Fragment>
      <Row className="g-0 position-relative justify-content-end">
        <Col lg={3} className={styles.sidebardata}>
          <Sidebar />
        </Col>
        <Col lg={9} className={`${location.pathname === "/home/anyalitic" ? "h-auto" : "vh-100"} ${location?.pathname === "/home/dashboard" ? "p-0" :  "p-4" } position-relative`}>{children}</Col>
      </Row>
      <Outlet/>
    </React.Fragment>
  );
};

export default Layout;
