import React, { useState, useEffect } from "react";
import Layout from "../../utils/Layout";
import axios from "axios";
import { api } from "../../utils/api";
import { GlobalContext } from "../../Context/Authcontext";
import styles from '../../Style/Donor.module.css'
import Donordata from "../../Component/Donordata";
const Donorlist = () => {
  const { token } = GlobalContext();
  // console.log("token",token)
  const [loading, setloading] = useState(true);
  const [Donor, setDonor] = useState([]);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    axios
      .get(`${api}auth/donor`, config)
      .then((res) => setDonor(res.data.donor))
      .catch((e) => console.log("eeee", e))
      .finally(() => setloading(false));
  }, [loading]);
  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className={styles.donor_data}>
          <table>
            <tr style={{textAlign:"center"}}>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Joined us</th>
              <th>view</th>
            </tr>
            {Donor?.map((donor, index) => {
              return <Donordata donor={donor} key={index} sr={index + 1} />;
            })}
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Donorlist;
