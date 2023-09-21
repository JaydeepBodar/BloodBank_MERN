import React from "react";  
import Sidebar from "../Component/Sidebar";
import { Row, Col } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
const Layout = ({ children }) => {
  const location=useLocation()
  return (
    <React.Fragment>
      <Row className="g-0 position-relative">
        <Col lg={3} className="bg-secondary text-light">
          <Sidebar />
        </Col>
        <Col lg={9} className={`${location.pathname === "/home/anyalitic" ? "h-auto" : "vh-100"} p-3`}>{children}</Col>
      </Row>
      <Outlet/>
    </React.Fragment>
  );
};

export default Layout;
