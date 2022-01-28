import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
const Confirmation = () => {
	const location = useLocation();
	const { store, actions } = useContext(Context);
	return (
		<div className="my-5 p-3 movie bg-dark border rounded border-dark m-auto text-center col-md-6">
			<h1 className="text-light">Thank you for your purchase</h1>
			<div>
				<i className="text-warning fas fa-check-square" />
			</div>
			<div className="movie border rounded border-dark my-3 p-3 text-light text-start">
				<h3 className="border rounded border-warning p-2">Movie: {location.state.movie}</h3>
				<h3 className="border rounded border-warning p-2">Date: {location.state.date}</h3>
				<h3 className="border rounded border-warning p-2">Hour: {location.state.hour}</h3>
				<h3 className="border rounded border-warning p-2">
					Cinema:{" "}
					{store.cinemas.map(cinema => {
						return <>{cinema.id === parseInt(location.state.cinema) ? cinema.location : null}</>;
					})}
				</h3>
				<h3 className="border rounded border-warning p-2">Format: {location.state.type}</h3>
				<h3 className="border rounded border-warning p-2">
					Seats: {location.state.seats.map(item => item + " ")}
				</h3>
				<h3 className="border rounded border-warning p-2">
					Snacks:{" "}
					{location.state.snacks.map((item, index) => {
						return (
							<div key={index}>
								{item.quantity} {item.snack}
							</div>
						);
					})}
				</h3>
			</div>
			<div>
				<button
					style={{ fontSize: "20px" }}
					onClick={() => window.print()}
					className="my-4 movie hoverButton btn btn-warning col-md-4 fw-bold">
					Print
				</button>
			</div>

			<button style={{ fontSize: "20px" }} className="my-2 hoverButton movie btn btn-warning col-md-4 fw-bold">
				<a href="/" style={{ textDecoration: "none", color: "black" }}>
					Go to home
				</a>
			</button>
		</div>
	);
};

export default Confirmation;
