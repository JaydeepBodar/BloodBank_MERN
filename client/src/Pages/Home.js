import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "../Style/banner.module.css";
const Home = () => {
  return (
    <section>
      <div className={styles.banner_wrapper}>
        <div>
          <img className={styles.banner_img} src="/images/Banner.jpg" />
        </div>
        <div className={styles.banner_content}>
          <div className={styles.banner_data}>
            <h1>You need to Access this App to First You Need to Log in...</h1>
            <Link to="/home/login">
              <Button className={styles.btn}>login</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
