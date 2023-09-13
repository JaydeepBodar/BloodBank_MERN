import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/Authcontext";
import styles from "../Style/sidebar.module.css";
const Sidebar = () => {
  const location = useLocation();
  const { user } = GlobalContext();
  return (
    <React.Fragment>
      <ul className={styles.sidebar_wrapper}>
        {(() => {
          switch (user?.role) {
            case "Donor":
              return (
                <li>
                  <Link
                    to="/home/inventory"
                    className={`${
                      location.pathname === "/home/inventory" &&
                      styles.active_class
                    }`}
                  >
                    Inventory
                  </Link>
                </li>
              );

            case "Admin":
              return (
                <li>
                  <Link
                    to="/home/inventory"
                    className={`${
                      location.pathname === "/home/inventory" &&
                      styles.active_class
                    }`}
                  >
                    Inventory
                  </Link>
                </li>
              );

            default:
              return null;
          }
        })()}
        <li>
          <Link
            to="/home/donorlist"
            className={`${
              location.pathname === "/home/donorlist" && styles.active_class
            }`}
          >
            Donorlist
          </Link>
        </li>
        <li>
          <Link
            to="/home/Hospitallist"
            className={`${
              location.pathname === "/home/Hospitallist" && styles.active_class
            }`}
          >
            Hospitallist
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Sidebar;
