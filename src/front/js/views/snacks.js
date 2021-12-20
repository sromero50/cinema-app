import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Drinks from "../component/drinks";
import Popcorns from "../component/popcorns";
import InfoBuy from "../component/infoBuy";
const Snacks = () => {
	const location = useLocation();
	const [tickets, setTickets] = useState(location.state.total);

	return (
		<div className="container-fluid w-75 bg-dark border border-dark rounded movie mt-4">
			<div className="text-light text-center row m-auto p-2 ms-3">
				<div className="col-sm-6 row mb-4">
					<Popcorns />
					<Drinks />
				</div>
				<div className="col-sm-5 text-light text-start p-4 my-4 m-auto card bg-dark">
					<InfoBuy tickets={tickets} />
				</div>
			</div>
		</div>
	);
};

export default Snacks;
