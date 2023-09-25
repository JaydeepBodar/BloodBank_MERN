import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "../../Style/header.module.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/Authcontext";
import Modaldata from "../Modaldata";
const Header = () => {
  const navigat = useNavigate();
  const { newdata, user } = GlobalContext();
  console.log("newdata", newdata);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigat("/home/login");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <header className={styles.site_header}>
        <Container>
          <div className={styles.main_header}>
            <div>
              <Link to="/home/dashboard">
                <img
                  src="/images/responsive.png"
                  style={{ width: "54px", height: "50px" }}
                />
              </Link>
            </div>
            <div className={styles.user_form}>
              <div>
                <h4 className={styles.user_data} onClick={handleShow}>
                  {user ? newdata : <span>NA</span>}
                </h4>
                {user && <Modaldata handleClose={handleClose} show={show}/>}
                {user && <h6 className={styles.user_role}>{user?.role}</h6>}
              </div>
              {user && (
                <div>
                  <Button variant="light" onClick={logout}>
                    Log out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>
      <Outlet />
    </React.Fragment>
  );
};

export default Header;
