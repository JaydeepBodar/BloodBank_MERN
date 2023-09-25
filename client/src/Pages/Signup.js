import React, { useState } from "react";
import InputType from "../Component/InputType";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "../Style/form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import Tostify from "../Component/Tostify";
const Signup = () => {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const [icon, setIcon] = useState(AiFillEyeInvisible);
  const [Input, setInput] = useState({
    name: "",
    organizationName: "",
    hospitalName: "",
    website: "",
    address: "",
    email: "",
    password: "",
    role: "",
  });
  const {
    name,
    email,
    password,
    role,
    organizationName,
    hospitalName,
    website,
    address,
  } = Input;
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
    if(!role){
      toast.error("User Role is Required")
    }
    let data;
    switch (role) {
      case "Donor":
        data = { name, email, password, role, address };
        if(!name || !email || !password || !address){
          toast.error("All Field are Required")
        }
        break;
      case "Organization":
        data = { email, password, role, address, website, organizationName };
        if(!email || !password || !address || !website || !organizationName){
          toast.error("All Field are Required")
        }
        break;
      case "Admin":
        data = { name, email, password, role, address };
        if(!name || !email || !password || !address);{
          toast.error("All Field are Required")
        }
        break;
      case "Hospital":
        data = { hospitalName, website, email, password, role, address };
        if(!hospitalName || !website || !email || !password || !address){
          toast.error("All Field are Required")
        }
        break;
      default:
        return;
    }
    console.log("daaaaaaaaaaaaaaaaa", data);
    axios
      .post(`${api}auth/register`, data)
      .then((res) => {
          console.log("res", res);
          localStorage.setItem("user",JSON.stringify(res.data.user))
          localStorage.setItem("token", JSON.stringify(res.data.token))
          toast.success(res.data.message)
          navigate("/home/dashboard")
      })
      .catch((e) => toast.warn(e.response.data.message));
  };
  return (
    <section className="signup_section">
      <Tostify />
      <Row className="m-0">
        <Col lg={8} className={`${styles.form_signup_img} p-0`}>
          <img loading="lazy" src="/images/banner1.jpg" />
          <img
            loading="lazy"
            src="/NicePng_red-cross-png_360800.png"
            style={{ width: "100px", height: "93px" }}
            className={styles.logo_img}
          />
        </Col>
        <Col lg={4} md={12} className="p-0">
          <div className={styles.form_signup_wrapper}>
            <div className={styles.mobile_responsive}>
              <h2 style={{ textAlign: "center" }}>Sign up</h2>
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
                {role === "Admin" && (
                  <div className={styles.form_group}>
                    <InputType
                      label="Name"
                      type="text"
                      value={name}
                      onChange={handleChange}
                      name="name"
                      placeholder="Enter Your Name..."
                    />
                  </div>
                )}
                {role === "Donor" && (
                  <div className={styles.form_group}>
                    <InputType
                      label="Name"
                      type="text"
                      value={name}
                      onChange={handleChange}
                      name="name"
                      placeholder="Enter Your Name..."
                    />
                  </div>
                )}
                {role === "Organization" && (
                  <React.Fragment>
                    <div className={styles.form_group}>
                      <InputType
                        label="Organization name"
                        type="text"
                        value={organizationName}
                        onChange={handleChange}
                        name="organizationName"
                        placeholder="Enter Your Organization..."
                      />
                    </div>
                    <div className={styles.form_group}>
                      <InputType
                        label="Website"
                        type="url"
                        value={website}
                        onChange={handleChange}
                        name="website"
                        placeholder="Enter Your Website..."
                      />
                    </div>
                  </React.Fragment>
                )}
                {role === "Hospital" && (
                  <React.Fragment>
                    <div className={styles.form_group}>
                      <InputType
                        label="Hospital Name"
                        type="text"
                        value={hospitalName}
                        onChange={handleChange}
                        name="hospitalName"
                        placeholder="Enter Your Hospital name..."
                      />
                    </div>
                    <div className={styles.form_group}>
                      <InputType
                        label="Website"
                        type="url"
                        value={website}
                        onChange={handleChange}
                        name="website"
                        placeholder="Enter Your Website..."
                      />
                    </div>
                  </React.Fragment>
                )}
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
                  <label>Address</label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={handleChange}
                    name="address"
                    placeholder="Enter Your Address..."
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
                  Alreday user ! <Link to="/home/login">Log in</Link>
                </h6>
                <Button
                  type="submit"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Sign up
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Signup;
