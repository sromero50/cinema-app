import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSnackToList, sumPrice, substractPrice, deleteSnack } from "../redux/actions";
import { useNavigate } from "react-router-dom";
const InfoBuy = props => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const total = useSelector(state => state.total);
	const snackList = useSelector(state => state.snackList);
	const movies = useSelector(state => state.movies);
	const cinemas = useSelector(state => state.cinemas);

	const { tickets, movie, hour, date, cinema, price, seats, type } = props;

	const [totalPrice, setTotalPrice] = useState();
	const [priceTicket, setPriceTicket] = useState(tickets);
	const [snackPrice, setSnackPrice] = useState(total);

	useEffect(
		() => {
			setSnackPrice(total);
		},
		[total]
	);

	useEffect(
		() => {
			setTotalPrice(priceTicket + snackPrice);
		},
		[snackPrice]
	);

	const sendData = () => {
		navigate("/checkout", {
			state: {
				total: totalPrice,
				ticket: priceTicket,
				snacks: snackPrice,
				cinema: cinema,
				date: date,
				hour: hour,
				movie: movie,
				seats: seats,
				snackList: snackList,
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
						{cinemas.map(item => {
							return (
								<React.Fragment key={item.id}>
									{cinema == item.id ? item.location : null}
								</React.Fragment>
							);
						})}
					</h3>
					{snackList.map((product, index) => {
						return (
							<h3 key={index} className="border rounded border-warning p-2 movie">
								{product.snack}: {product.quantity}{" "}
								<button
									style={{ color: "white", background: "none", border: "none" }}
									onClick={() => {
										dispatch(addSnackToList(product.snack, product.quantity, product.price));
										dispatch(sumPrice());
									}}
									className="fas fa-plus"
								/>{" "}
								<button
									style={{ color: "white", background: "none", border: "none" }}
									onClick={() => {
										{
											dispatch(deleteSnack(product.snack));
											dispatch(substractPrice());
										}
									}}
									className="fas fa-minus"
								/>
							</h3>
						);
					})}
					<h3 className="border rounded border-warning p-2 movie">Tickets: ${priceTicket} </h3>
					<h2 className="border rounded border-warning p-2 movie">Total: ${totalPrice} </h2>
				</div>
				<div className="col-md-5 m-auto">
					{movies.map(poster => {
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
