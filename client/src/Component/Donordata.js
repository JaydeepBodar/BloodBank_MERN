import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {AiFillEye} from 'react-icons/ai'
const Donordata = ({donor,sr}) => {
	const{name,email,address,createdAt,_id}=donor
  return (
		<React.Fragment>
			<tr style={{textAlign:"center"}}>
				<td>{sr}</td>
				<td>{name}</td>
				<td>{email}</td>
				<td>{address}</td>
				<td>{moment(createdAt).format("Do MMM YY")}</td>
				<td><Link to={`/home/donor/${_id}`}><AiFillEye/></Link></td>
			</tr>
		</React.Fragment>
  )
}

export default Donordata
