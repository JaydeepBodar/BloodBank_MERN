import axios from "axios";
import React,{useState,useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import { GlobalContext } from "../Context/Authcontext";
import Layout from "../utils/Layout";
import { api } from "../utils/api";
import moment from "moment";
import { Button } from "react-bootstrap";
import styles from '../Style/Donor.module.css'
const Singleuser = () => {
  const { id } = useParams();
  const { token } = GlobalContext();
  const [loading, setloading] = useState(true);
  const [donor, setdonor] = useState([]);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    axios
      .get(`${api}auth/donor/${id}`, config)
      .then((res) => setdonor(res.data.singledonor))
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false));
  }, [loading]);
  console.log("donor",donor)
  const{name,email,address,createdAt}=donor
  return <Layout>
    {loading && <p>loading</p>}
    {!loading && <div className={styles.user}>
        <h4>Name : {name}</h4>
        <h4>Email : {email}</h4>
        <h4>Address : {address}</h4>
        <h4>Joined us : {moment(createdAt).format("Do MMM YY")}</h4>
        <Button variant="primary"><Link to='/home/donorlist' style={{color:"#f2f2f2"}}>Back</Link></Button>
    </div>}
  </Layout>;
};

export default Singleuser;
