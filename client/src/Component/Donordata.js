import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useLocation } from "react-router-dom";
const Donordata = ({ donor, sr }) => {
  const location = useLocation();
//   console.log("location",location)
  const {
    name,
    email,
    address,
    createdAt,
    _id,
    organizationName,
    hospitalName,
  } = donor;
//   console.log("hospitalName", hospitalName);
  return (
    <React.Fragment>
      <tr style={{ textAlign: "center" }}>
        <td>{sr}</td>
        {(() => {
          switch (location.pathname) {
            case "/home/donorlist":
              return <td>{name}</td>;
            case "/home/Hospitallist":
              return <td>{hospitalName}</td>;
            case "/home/organizationlist":
              return <td>{organizationName}</td>;
            default:
              return null;
          }
        })()}
        <td>{email}</td>
        <td>{address}</td>
        <td>{moment(createdAt).format("Do MMM YY")}</td>
        <td>
          <Link to={`/home/donor/${_id}`}>
            <AiFillEye />
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Donordata;
