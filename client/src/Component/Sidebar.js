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
                    to="/home/donordatainventory"
                    className={`${
                      location.pathname === "/home/donordatainventory" &&
                      styles.active_class
                    }`}
                  >
                    Inventory
                  </Link>
                </li>
              );

            case "Organization":
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
        {(() => {
          switch (user?.role) {
            case "Admin":
              return (
                <li>
                  <Link
                    to="/home/donorlist"
                    className={`${
                      location.pathname === "/home/donorlist" &&
                      styles.active_class
                    }`}
                  >
                    Donorlist
                  </Link>
                </li>
              );
            case "Organization":
              return (
                <li>
                  <Link
                    to="/home/donorinventory"
                    className={`${
                      location.pathname === "/home/donorinventory" &&
                      styles.active_class
                    }`}
                  >
                    Donorlist
                  </Link>
                </li>
              );
            default:
              return null;
          }
        })()}
        {(() => {
          switch (user?.role) {
            case "Admin":
              return (
                <li>
                  <Link
                    to="/home/Hospitallist"
                    className={`${
                      location.pathname === "/home/Hospitallist" &&
                      styles.active_class
                    }`}
                  >
                    Hospital
                  </Link>
                </li>
              );
            case "Organization":
              return (
                <li>
                  <Link
                    to="/home/hospitalinventory"
                    className={`${
                      location.pathname === "/home/hospitalinventory" &&
                      styles.active_class
                    }`}
                  >
                    Hospital
                  </Link>
                </li>
              );
          }
        })()}
        {user?.role === "Donor" && (
          <li>
            <Link
              to="/home/consumer"
              className={`${
                location.pathname === "/home/consumer" &&
                styles.active_class
              }`}
            >
              Consumer
            </Link>
          </li>
        )}
        {user?.role === "Admin" &&
        <li>
            <Link
              to="/home/organizationlist"
              className={`${
                location.pathname === "/home/organizationlist" &&
                styles.active_class
              }`}
            >
              Organization
            </Link>
          </li>
        }
      </ul>
    </React.Fragment>
  );
};

export default Sidebar;
