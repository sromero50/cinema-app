import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
const InfoBuy = props => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	const { tickets, movie, hour, date, cinema } = props;

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
				movie: movie
			}
		});
	};

	return (
		<>
			<div className="border border-dark rounded movie p-3">
				<h2>Movie: {movie}</h2>
				<h2>Time: {hour}</h2>
				<h2>Date: {date}</h2>
				<h2>
					Cinema:{" "}
					{store.cinemas.map(item => {
						return (
							<React.Fragment key={item.id}>{cinema == item.id ? item.location : null}</React.Fragment>
						);
					})}
				</h2>
				{store.snackList.map(product => {
					return (
						<h2 key={product.id}>
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
						</h2>
					);
				})}
				<h2>Tickets: ${priceTicket} </h2>
				<h2>Total: ${total} </h2>
			</div>
			<button onClick={sendData} className="btn btn-block btn-warning w-100 mt-3 fw-bold" type="submit">
				Confirm
			</button>
		</>
	);
};

export default InfoBuy;
