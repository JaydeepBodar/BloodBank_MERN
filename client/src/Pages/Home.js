import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "../Style/banner.module.css";
const Home = () => {
  // useEffect(() => {
  //     axios.get(`${api}auth/user`).then((res)=>
  //     console.log("res",res)).catch((e)=>console.log("eee",e))
  // }, [ ]);
  return (
    <section>
      <div className={styles.banner_wrapper}>
        <div>
          <img className={styles.banner_img} src="/images/Banner.jpg" />
        </div>
        <div className={styles.banner_content}>
          <div className={styles.banner_data}>
            <img loading="lazy" src="/NicePng_red-cross-png_360800.png" style={{width:"100px",height:"93px",marginBottom:"30px"}} />
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
