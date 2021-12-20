import React, { useState } from "react";
import InfoBuy from "../component/infoBuy";
import { useLocation } from "react-router-dom";
const Checkout = () => {
	const location = useLocation();
	const [total, setTotal] = useState(location.state.total);

	return (
		<div className="container  border rounded border-dark bg-dark movie my-2 p-3">
			<div className="text-light text-center row m-auto p-2 ms-3">
				<div className="col-sm-6 row mb-4">pepe</div>
				<div className="col-sm-5 text-light text-start p-4 my-4 m-auto card bg-dark">
					<InfoBuy total={total} />
				</div>
			</div>
		</div>
	);
};

export default Checkout;
