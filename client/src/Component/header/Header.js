import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "../../Style/header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const navigat = useNavigate();
  const [user, setuser] = useState([]);
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user")));
  }, [location]);
  let data;
  switch (user?.role) {
    case "Donor":
      data = user?.name;
      break;
    case "Hospital":
      data = user?.hospitalName;
      break;
    case "Organization":
      data = user?.organizationName;
      break;
    case "Admin":
      data = user?.name;
      break;
  }
  const newdata = data
    ?.split(" ")
    .map((word) => word[0])
    .join("");
  console.log("newdata", newdata);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    navigat("/home/login");
  };
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
                <h4 className={styles.user_data}>{user ? newdata : <span>NA</span>}</h4>
                {user && <h6 className={styles.user_role}>{user?.role}</h6>}
              </div>
              {user && (
                <div>
                  <Button variant="light" onClick={logout}>Log out</Button>
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
