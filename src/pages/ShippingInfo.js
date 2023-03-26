import "./ShippingInfo.css"

const ShippingInfo = () => {
    return (
        <div class="shippingInfo">
		<div class="tracking-status">
			<div class="status-circle"></div>
			<div class="status-label">Shipping Info</div>
			<div class="status-date">March 25, 2023</div>
		</div>
		<table class="tracking-details">
			<thead>
				<tr>
					<th>Date</th>
					<th>Status</th>
					<th>Location</th>
                    <th>Role</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>March 24, 2023</td>
					<td>Order Received</td>
					<td>Los Angeles, CA</td>
                    <td>Manufacturer</td>
				</tr>
				<tr>
					<td>March 25, 2023</td>
					<td>Shipped</td>
					<td>Los Angeles, CA</td>
                    <td>Manufacturer</td>
				</tr>
				<tr>
					<td>March 27, 2023</td>
					<td>Out for Delivery</td>
					<td>New York, NY</td>
                    <td>Manufacturer</td>
				</tr>
				<tr>
					<td>March 28, 2023</td>
					<td>Delivered</td>
					<td>New York, NY</td>
                    <td>Distributer</td>
				</tr>
			</tbody>
		</table>
	</div>
    );
}

export default ShippingInfo;