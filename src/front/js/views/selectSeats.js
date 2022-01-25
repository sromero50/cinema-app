import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import GoLogin from "../component/goLogin";

const SelectSeats = props => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();
	const location = useLocation();

	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(20);
	const [idMovie, setIdMovie] = useState("");

	const [seats, setSeats] = useState([]);

	let array = [];
	let prueba = store.schedules.map(item => {
		if (item.hour == location.state.hour && item.id_movie == idMovie && item.id_cinema == location.state.cinema) {
			let remove = item.ticket.replace('"', "");
			remove = remove.replace(new RegExp("'", "g"), "");
			remove = remove.split(",");
			array = remove;
		}
	});

	useEffect(() => {
		store.movies.map(movie => {
			if (movie.name === location.state.movie) {
				return setIdMovie(movie.id);
			}
		});
	});

	const test = [
		{ seat: "1A", available: true },
		{ seat: "2A", available: true },
		{ seat: "3A", available: true },
		{ seat: "4A", available: true },
		{ seat: "5A", available: true },
		{ seat: "6A", available: true },
		{ seat: "7A", available: true },
		{ seat: "8A", available: true },
		{ seat: "1B", available: true },
		{ seat: "2B", available: true },
		{ seat: "3B", available: true },
		{ seat: "4B", available: true },
		{ seat: "5B", available: true },
		{ seat: "6B", available: true },
		{ seat: "7B", available: true },
		{ seat: "8B", available: true },
		{ seat: "1C", available: true },
		{ seat: "2C", available: true },
		{ seat: "3C", available: true },
		{ seat: "4C", available: true },
		{ seat: "5C", available: true },
		{ seat: "6C", available: true },
		{ seat: "7C", available: true },
		{ seat: "8C", available: true },
		{ seat: "1D", available: true },
		{ seat: "2D", available: true },
		{ seat: "3D", available: true },
		{ seat: "4D", available: true },
		{ seat: "5D", available: true },
		{ seat: "6D", available: true },
		{ seat: "7D", available: true },
		{ seat: "8D", available: true },
		{ seat: "1E", available: true },
		{ seat: "2E", available: true },
		{ seat: "3E", available: true },
		{ seat: "4E", available: true },
		{ seat: "5E", available: true },
		{ seat: "6E", available: true },
		{ seat: "7E", available: true },
		{ seat: "8E", available: true }
	];

	array.forEach(occupied => {
		test.forEach(a => {
			if (occupied == a.seat) {
				a.available = false;
			}
		});
	});

	const result = test
		.map((x, i) => {
			return i % 8 === 0 ? test.slice(i, i + 8) : null;
		})
		.filter(x => x != null);

	useEffect(
		() => {
			if (quantity == 8) {
				setQuantity(8);
				setAvailable(true);
				alert("You can only buy 8 tickets per buy");
				setAvailable(false);
			} else if (quantity < 0) {
				setQuantity(0);
			}
			setPrice(20 * quantity);
		},
		[quantity]
	);

	const handleQuantity = e => {
		if (e.target.checked == true) {
			setQuantity(quantity + 1);
			setSeats([...seats, e.target.value]);
			console.log(seats);
		} else if (e.target.checked == false) {
			setQuantity(quantity - 1);
			const newList = seats.filter(item => item !== e.target.value);
			setSeats(newList);
			console.log(seats);
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
		localStorage.setItem("total", price);
	}

	const sendData = () => {
		navigate("/snacks", {
			state: {
				total: price,
				cinema: location.state.cinema,
				date: location.state.date,
				hour: location.state.hour,
				movie: location.state.movie,
				total: price,
				seats: seats
			}
		});
	};

	return (
		<>
			{store.login ? (
				<div className="container  border rounded border-dark bg-dark movie my-2 p-3">
					<div className="bg-dark border rounded border-dark row">
						<div className="col-md-5 text-light">
							<div className=" border border-dark rounded movie my-2 mx-1 p-4" style={{ height: "95%" }}>
								<i className="fas fa-ticket-alt fa-4x my-2 text-warning" />
								<h2 className="my-2">Ticket price: $20</h2>
								<div className="row">
									<h2 className="col-md my-1">Seats: {seats.map(item => item + " ")} </h2>
								</div>
							</div>
						</div>
						<div className="col-md-7 text-light">
							<div className="border border-dark rounded movie my-2 mx-1 p-4 row">
								<div className="col-md-7">
									<h2>Movie: {location.state.movie} </h2>
									<h2>Time: {location.state.hour} </h2>
									<h2>Date: {location.state.date}</h2>
									<h2>
										Cinema:{" "}
										{store.cinemas.map(cinema => {
											return (
												<React.Fragment key={cinema.id}>
													{location.state.cinema == cinema.id ? cinema.location : null}
												</React.Fragment>
											);
										})}
									</h2>
									<h2>Total: ${price} </h2>
								</div>
								<div className="col-md-4 m-auto">
									{store.movies.map(poster => {
										return (
											<React.Fragment key={poster.id}>
												{location.state.movie == poster.name ? (
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
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="bg-dark text-light text-center movie border rounded border-dark mt-1 mb-2 p-4 d-flex justify-content-center user-select-none">
							<div className="container">
								<div className="row mt-2 mb-4 divScreen d-flex justify-content-center">
									<div className="col-sm-6 screen">A</div>
								</div>
								<div className="row d-flex justify-content-center">
									<div>
										{result.map((result, index) => {
											return (
												<section key={index}>
													{result.map(item => (
														<span key={item.seat}>
															<input
																className={
																	item.available
																		? "inputSeat col-sm-1"
																		: "inputSeat col-sm-1"
																}
																id={item.seat}
																type="checkbox"
																name={item.seat}
																disabled={item.available == true ? false : true}
																value={item.seat}
																onChange={handleQuantity}
															/>
															<label
																className={
																	item.available == true
																		? "labelSeat col"
																		: "labelSeatDisable col"
																}
																htmlFor={item.seat}>
																{item.seat}
															</label>
														</span>
													))}
												</section>
											);
										})}
									</div>
								</div>
								<div className="row d-flex justify-content-center mt-5 p-2 border-top border-secondary">
									<div className="col-sm-2">Your selection</div>
									<div className="col-sm-1 seatSelected" />
									<div className="col-sm-2">Available</div>
									<div className="col-sm-1 seat" />
									<div className="col-sm-2">Not Available</div>
									<div className="col-sm-1 seatNotAvailable" />
								</div>
								<button onClick={sendData} className="btn btn-block btn-warning mt-3" type="submit">
									<a style={{ textDecoration: "none", color: "black" }} href="/snacks">
										Confirm
									</a>
								</button>
							</div>
						</div>
					</form>
				</div>
			) : (
				<GoLogin />
			)}
		</>
	);
};

export default SelectSeats;

SelectSeats.propTypes = {
	movie: PropTypes.string,
	time: PropTypes.string
};
