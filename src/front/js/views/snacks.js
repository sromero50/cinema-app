import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Drinks from "../component/drinks";
import Popcorns from "../component/popcorns";
import InfoBuy from "../component/infoBuy";
import { useSelector } from "react-redux";
const Snacks = () => {
	const location = useLocation();
	const [tickets, setTickets] = useState(location.state.total);
	const login = useSelector(state => state.login);

	return (
		<>
			{login && (
				<div className="container bg-dark border border-dark rounded movie my-4 p-3">
					<div className="text-light text-center row m-auto p-2">
						<div className="col-md-6 mx-1 my-4 p-2 border rounded border-dark movie row mb-4">
							<Popcorns />
							<Drinks />
						</div>
						<div className="col-md mx-1 text-light text-start p-2 my-2 m-auto bg-dark">
							<InfoBuy
								tickets={tickets}
								movie={location.state.movie}
								date={location.state.date}
								hour={location.state.hour}
								cinema={location.state.cinema}
								seats={location.state.seats}
								type={location.state.type}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Snacks;
