import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "../../Style/header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.site_header}>
        <Container>
          <div>
            <Link to='/'><h3>Blood Bank Managment System</h3></Link>
          </div>
        </Container>
      </header>
      <Outlet />
    </React.Fragment>
  );
};

export default Header;
