import React from "react";
import Layout from "../../utils/Layout";
import { api } from "../../utils/api";
import useFetch from "../../Customhooks/useFetch";
import LoadingOverlay from "react-loading-overlay";
import { Row, Col } from "react-bootstrap";
import Chartdata from "./Chart";
import style from "../../Style/Anaylitic.module.css";
import Authorization from "../../utils/Authorization";
const Anaylitic = () => {
  const { data, loading } = useFetch(`${api}inventory/anaylitic`, "");
  return (
    <LoadingOverlay
      active={loading}
      className={loading && "vh-100  "}
      spinner
      text="Loading"
    >
      <Layout>
        {!loading && data?.bloodData?.length === 0 && (
          <div className={style.user_record}>
            <h3>No Recoard Found Of Hospital</h3>
          </div>
        )}
        {!loading && data?.bloodData?.length > 0 && (
          <React.Fragment>
            {" "}
            <div className={style.chart_wrapper_responsive}>
              <Chartdata totalblood={data?.bloodData} />
            </div>
            <div className={style.Anylatic_wrapper}>
              <Row>
                {data?.bloodData?.map((val, index) => {
                  const { totalblood, totalIn, totalOut, blood } = val;
                  return (
                    <Col
                      lg={3}
                      md={4}
                      sm={6}
                      key={index}
                      className={style.boxes_blood}
                    >
                      <div className={style.Anaylitic_block}>
                        <h4>{blood}</h4>
                        <h6>
                          Total in :- {!totalIn ? <span>0</span> : totalIn}
                          ML
                        </h6>
                        <h6>
                          Total out :- {!totalOut ? <span>0</span> : totalOut}
                          ML
                        </h6>
                        <h6>
                          Total Blood :-{" "}
                          {!totalblood ? <span>0</span> : totalblood}ML
                        </h6>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </React.Fragment>
        )}
      </Layout>
    </LoadingOverlay>
  );
};

export default Authorization(Anaylitic);
