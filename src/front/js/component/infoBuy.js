import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
const InfoBuy = props => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	const { tickets, movie, hour, date, cinema, price, seats, type } = props;

	const [total, setTotal] = useState();
	const [priceTicket, setPriceTicket] = useState(tickets);
	const [snackPrice, setSnackPrice] = useState(store.total);

	useEffect(
		() => {
			setSnackPrice(store.total);
		},
		[store.total]
	);

	useEffect(
		() => {
			setTotal(priceTicket + snackPrice);
		},
		[snackPrice]
	);

	const sendData = () => {
		navigate("/checkout", {
			state: {
				total: total,
				ticket: priceTicket,
				snacks: snackPrice,
				cinema: cinema,
				date: date,
				hour: hour,
				movie: movie,
				seats: seats,
				snackList: store.snackList,
				type: type
			}
		});
	};

	return (
		<>
			<div className="border border-dark rounded movie my-2 mx-1 p-4 row">
				<div className="col-md-7">
					<h3 className="border rounded border-warning p-2 movie">Movie: {movie}</h3>
					<h3 className="border rounded border-warning p-2 movie">Time: {hour}</h3>
					<h3 className="border rounded border-warning p-2 movie">Date: {date}</h3>
					<h3 className="border rounded border-warning p-2 movie">
						Cinema:{" "}
						{store.cinemas.map(item => {
							return (
								<React.Fragment key={item.id}>
									{cinema == item.id ? item.location : null}
								</React.Fragment>
							);
						})}
					</h3>
					{store.snackList.map(product => {
						return (
							<h3 key={product.id} className="border rounded border-warning p-2 movie">
								{product.snack}: {product.quantity}{" "}
								<button
									style={{ color: "white", background: "none", border: "none" }}
									onClick={() => actions.addSnack(product.snack)}
									className="fas fa-plus"
								/>{" "}
								<button
									style={{ color: "white", background: "none", border: "none" }}
									onClick={() => {
										actions.deleteSnack(product.snack);
									}}
									className="fas fa-minus"
								/>
							</h3>
						);
					})}
					<h3 className="border rounded border-warning p-2 movie">Tickets: ${priceTicket} </h3>
					<h2 className="border rounded border-warning p-2 movie">Total: ${total} </h2>
				</div>
				<div className="col-md-5 m-auto">
					{store.movies.map(poster => {
						return (
							<React.Fragment key={poster.id}>
								{movie == poster.name ? (
									<img
										className="img-fluid posterMini border rounded border-dark"
										src={poster.poster}
									/>
								) : null}
							</React.Fragment>
						);
					})}
				</div>
			</div>
			<button
				onClick={sendData}
				className="btn movie hoverButton btn-warning col-sm-12 border w-100 rounded border-warning mt-3 fw-bold"
				type="submit">
				Confirm
			</button>
		</>
	);
};

export default InfoBuy;
