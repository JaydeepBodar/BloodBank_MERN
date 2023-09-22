import React, { useState } from "react";
import InputType from "../Component/InputType";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "../Style/form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import Tostify from "../Component/Tostify";
import { api } from "../utils/api";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
const Login = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(AiFillEyeInvisible);
  const [loading, setloading] = useState(false);
  const [Input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { email, password, role } = Input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(AiFillEye);
      setType("text");
    } else {
      setIcon(AiFillEyeInvisible);
      setType("password");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !role) {
      toast.error("All field Required");
    } else {
      setloading(true);
      axios
        .post(
          `${api}auth/login`,
          { ...Input }
          // { headers: { "Content-type": "application/json" } }
        )
        .then((res) => {
          if (res.status === 200) {
            // console.log("res.data.user", res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            toast.warn(res.data.message);
            navigate("/home/dashboard");
          }
        })
        .catch((e) => {
          if (e?.response?.status === 403) {
            toast.error(e?.response?.data?.message);
          } else if (e?.response?.status === 401) {
            toast.error(e?.response?.data?.message);
          } else if (e?.response?.status === 405) {
            toast.error(e?.response?.data?.message);
          }
        })
        .finally(() => setloading(false));
    }
  };
  return (
    <LoadingOverlay spinner text="Loading" active={loading}>
      <section className="login_section">
        <Tostify />
        <Row className="m-0">
          <Col lg={8} className={`${styles.form_img} p-0`}>
            <img loading="lazy" src="/images/banner1.jpg" />
            <img
              src="/NicePng_red-cross-png_360800.png"
              style={{ width: "100px", height: "93px" }}
              className={styles.logo_img}
            />
          </Col>
          <Col lg={4} md={12} className="p-0">
            <div className={styles.form_wrapper}>
              <div className={styles.mobile_responsive}>
                <h2 style={{ textAlign: "center" }}>Log in</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.radio_group}>
                    <div className={styles.group_form}>
                      <InputType
                        value="Donor"
                        name="role"
                        onChange={handleChange}
                        type="radio"
                        label="Donor"
                        checked={role === "Donor"}
                      />
                    </div>
                    <div className={styles.group_form}>
                      <InputType
                        value="Hospital"
                        name="role"
                        onChange={handleChange}
                        type="radio"
                        label="Hospital"
                        checked={role === "Hospital"}
                      />
                    </div>
                    <div className={styles.group_form}>
                      <InputType
                        value="Organization"
                        onChange={handleChange}
                        type="radio"
                        name="role"
                        label="Organization"
                        checked={role === "Organization"}
                      />
                    </div>
                    <div className={styles.group_form}>
                      <InputType
                        value="Admin"
                        onChange={handleChange}
                        type="radio"
                        name="role"
                        label="Admin"
                        checked={role === "Admin"}
                      />
                    </div>
                  </div>
                  <div className={styles.form_group}>
                    <InputType
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      name="email"
                      placeholder="Enter Your Email..."
                    />
                  </div>
                  <div className={styles.form_group}>
                    <InputType
                      value={password}
                      label="Password"
                      type={type}
                      onChange={handleChange}
                      name="password"
                      placeholder="Enter Your Password..."
                    />
                    <span onClick={handleToggle}>{icon}</span>
                  </div>
                  <h6 className="mt-2">
                    New user ! <Link to="/home/register">Create one</Link>
                  </h6>
                  <Button
                    type="submit"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    Log in
                  </Button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </LoadingOverlay>
  );
};

export default Login;
