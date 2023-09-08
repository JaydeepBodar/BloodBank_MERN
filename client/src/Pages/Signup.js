import React, { useState } from "react";
import InputType from "../Component/InputType";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "../Style/form.module.css";
import { Link, useLocation } from "react-router-dom";
const Signup = () => {
  const location = useLocation();
  const [Input, setInput] = useState({
    name: "",
    organizationName: "",
    hospitalName: "",
    website: "",
    address: "",
    email: "",
    password: "",
    role: "Donor",
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
  return (
    <section className="signup_section">
      <Row className="m-0">
        <Col lg={8} className={`${styles.form_signup_img} p-0`}>
          <img  src="/images/banner1.jpg" />
        </Col>
        <Col lg={4} md={12} className="p-0">
          <div className={styles.form_signup_wrapper}>
            <div className={styles.mobile_responsive}>
              <h2 style={{ textAlign: "center" }}>Sign up</h2>
              <form>
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
                        type="email"
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
                    placeholder="Enter Your Email..."
                  />
                </div>
                <div className={styles.form_group}>
                  <InputType
                    value={password}
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter Your Password..."
                  />
                </div>
                <h6 className="mt-2">
                  Alreday user ! <Link to="/home/login">Log in</Link>
                </h6>
                <Button style={{ width: "100%", marginTop: "10px" }}>
                  Log in
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
