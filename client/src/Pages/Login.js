import React, { useState } from "react";
import InputType from "../Component/InputType";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "../Style/form.module.css";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Login = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(AiFillEyeInvisible);
  const [Input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
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
  return (
    <section className="login_section">
      <Row className="m-0">
        <Col lg={8} className={`${styles.form_img} p-0`}>
          <img src="/images/banner1.jpg" />
        </Col>
        <Col lg={4} md={12} className="p-0">
          <div className={styles.form_wrapper}>
            <div className={styles.mobile_responsive}>
              <h2 style={{ textAlign: "center" }}>Log in</h2>
              <form>
                <div className={styles.radio_group}>
                  <div className={styles.group_form}>
                    <InputType
                      value="donor"
                      name="role"
                      onChange={handleChange}
                      type="radio"
                      label="Donor"
                      checked={role === "donor"}
                    />
                  </div>
                  <div className={styles.group_form}>
                    <InputType
                      value="hospital"
                      name="role"
                      onChange={handleChange}
                      type="radio"
                      label="Hospital"
                      checked={role === "hospital"}
                    />
                  </div>
                  <div className={styles.group_form}>
                    <InputType
                      value="organization"
                      onChange={handleChange}
                      type="radio"
                      name="role"
                      label="Organization"
                      checked={role === "organization"}
                    />
                  </div>
                  <div className={styles.group_form}>
                    <InputType
                      value="admin"
                      onChange={handleChange}
                      type="radio"
                      name="role"
                      label="Admin"
                      checked={role === "admin"}
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

export default Login;
