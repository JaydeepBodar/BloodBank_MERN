import moment from 'moment'
import React from 'react'

const Indivisualinventory = ({ inventory, sr }) => {
	const { inventoryType, bloodgroup, Quantity, Organization, Donor,createdAt } = inventory
	return (
		<tr>
			<td>{sr}</td>
			<td>{Donor?.name}</td>
			<td>{bloodgroup}</td>
			<td>{Quantity}ML</td>
			<td>{Donor?.email}</td>
			<td>{Organization?.email}</td>
			<td>{inventoryType}</td>
			<td>{moment(createdAt).format("Do MMM YY")}</td>
		</tr>
	)
}

export default Indivisualinventory
