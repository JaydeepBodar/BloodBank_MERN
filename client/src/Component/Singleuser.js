import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/Authcontext";
import Layout from "../utils/Layout";
import { api } from "../utils/api";
import moment from "moment";
import { Button } from "react-bootstrap";
import styles from "../Style/Donor.module.css";
import useFetch from "../Customhooks/useFetch";
const Singleuser = () => {
  const { id } = useParams();
  const { token, user } = GlobalContext();
  const location = useLocation();
  const config = {
    headers: {
      Authorization: token,
    },
  };
  // console.log("id", typeof id);
  const navigate = useNavigate();
  const { loading, data } = useFetch(`${api}auth/donor/${id}`);
  const deleteRecord = () => {
    let text =
      "if you really want to remove Record ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      axios
        .delete(`${api}auth/user/${id}`, config)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          return e;
        });
      switch (data?.singledonor?.role) {
        case "Donor":
          navigate("/home/donorlist");
        case "Hospital":
          navigate("/home/Hospitallist");
        case "Organization":
          navigate("/home/organizationlist");
        default:
          return;
      }
    }
  };
  // console.log("data",data)
  // const { token } = GlobalContext();
  // const [loading, setloading] = useState(true);
  // const [donor, setdonor] = useState([]);
  // const config = {
  //   headers: {
  //     Authorization: token,
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .get(`${api}auth/donor/${id}`, config)
  //     .then((res) => setdonor(res.data.singledonor))
  //     .catch((e) => console.log("e", e))
  //     .finally(() => setloading(false));
  // }, [loading]);
  // console.log("donor",donor)
  // const { name, email, address, createdAt } = data?.singledonor;
  return (
    <Layout>
      {loading && <p>loading</p>}
      {!loading && (
        <div className={styles.user}>
          {(() => {
            switch (data?.singledonor?.role) {
              case "Donor":
                return <h4>Name : {data?.singledonor?.name}</h4>;
              case "Hospital":
                return (
                  <React.Fragment>
                    <h4>Hospital Name : {data?.singledonor?.hospitalName}</h4>
                    <h4>
                      Website :{" "}
                      <Link to="https://www.google.co.in/">
                        {data?.singledonor?.website}
                      </Link>
                    </h4>
                  </React.Fragment>
                );
              case "Organization":
                return (
                  <React.Fragment>
                    <h4>
                      Organization Name : {data?.singledonor?.organizationName}
                    </h4>
                    <h4>
                      Website :{" "}
                      <Link to="https://www.google.co.in/">
                        {data?.singledonor?.website}
                      </Link>
                    </h4>
                  </React.Fragment>
                );
              default:
                return null;
            }
          })()}
          <h4>Email : {data?.singledonor?.email}</h4>
          <h4>Address : {data?.singledonor?.address}</h4>
          <h4>
            Joined us :{" "}
            {moment(data?.singledonor?.createdAt).format("Do MMM YY")}
          </h4>

          {user?.role === "Admin" &&
            (() => {
              switch (data?.singledonor?.role) {
                case "Donor":
                  return (
                    <Link to="/home/donorlist" style={{ color: "#f2f2f2" }}>
                      <Button variant="primary">Back</Button>
                    </Link>
                  );
                case "Hospital":
                  return (
                    <Link to="/home/Hospitallist" style={{ color: "#f2f2f2" }}>
                      <Button variant="primary">Back</Button>
                    </Link>
                  );
                case "Organization":
                  return (
                    <Link
                      to="/home/organizationlist"
                      style={{ color: "#f2f2f2" }}
                    >
                      <Button variant="primary">Back</Button>
                    </Link>
                  );
                default:
                  return null;
              }
            })()}
          {user?.role === "Organization" && (
            <Link to="/home/inventory" style={{ color: "#f2f2f2" }}>
              <Button variant="primary">Back</Button>
            </Link>
          )}
          {user?.role === "Admin" && (
            <Button variant="danger" className="mx-2" onClick={deleteRecord}>
              Delete
            </Button>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Singleuser;
