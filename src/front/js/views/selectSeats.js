import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import GoLogin from "../component/goLogin";
import allSeats from "../component/seats";
import Swal from "sweetalert2";
import Loading from "../component/loading";
const SelectSeats = props => {
	const schedules = useSelector(state => state.schedules);
	const movies = useSelector(state => state.movies);
	const login = useSelector(state => state.login);
	const cinemas = useSelector(state => state.cinemas);
	const loadSchedule = useSelector(state => state.loadSchedule);

	const navigate = useNavigate();
	const location = useLocation();

	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [idMovie, setIdMovie] = useState("");

	const [seats, setSeats] = useState([]);

	// Filter seats to get availables

	let seatsFiltered = [];

	let filterSeats = schedules.map(item => {
		if (
			item.hour == location.state.hour &&
			item.id_movie == idMovie &&
			item.id_cinema == location.state.cinema &&
			location.state.type == item.type && item.date === location.state.date
		) {
			console.log(item);
			let remove = item.seats.replace(new RegExp("'", "g"), "");
			let filter = remove.split(",");

			for (let i of filter) i && seatsFiltered.push(i);
		}
	});

	useEffect(() => {
		movies.map(movie => {
			if (movie.name === location.state.movie) {
				return setIdMovie(movie.id);
			}
		});
	});

	seatsFiltered.forEach(occupied => {
		allSeats.forEach(a => {
			if (occupied == a.seat) {
				a.available = false;
			}
		});
	});

	// Seats already filtered get ordered to display in 8 per row
	const result = allSeats
		.map((x, i) => {
			return i % 8 === 0 ? allSeats.slice(i, i + 8) : null;
		})
		.filter(x => x != null);

	// Set price depending format and multiply per quantity
	useEffect(
		() => {
			if (quantity < 0) {
				setQuantity(0);
			}
			if (quantity > 8) {
				setQuantity(8);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "You can only buy 8 seats"
				});
			} else {
				setPrice((location.state.type == "2D" ? 20 : 30) * seats.length);
			}
		},
		[quantity]
	);

	const handleQuantity = e => {
		if (quantity >= 0) {
			if (e.target.checked == true) {
				setQuantity(quantity + 1);
				setSeats([...seats, e.target.value]);
			} else if (e.target.checked == false) {
				setQuantity(quantity - 1);
				const newList = seats.filter(item => item !== e.target.value);
				setSeats(newList);
			}
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		localStorage.setItem("total", price);
	}

	// Send information to next page
	const sendData = () => {
		if (seats.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "You need to select a seat"
			});
		} else if (seats.length <= 8) {
			navigate("/snacks", {
				state: {
					total: price,
					cinema: location.state.cinema,
					date: location.state.date,
					hour: location.state.hour,
					movie: location.state.movie,
					total: price,
					seats: seats,
					type: location.state.type
				}
			});
		} else if (seats.length > 8) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "You can only buy 8 seats"
			});
		}
	};

	return (
		<>
			{login ? (
				<div className="container  border rounded border-dark bg-dark movie my-4 p-3">
					<div className="bg-dark border rounded border-dark row">
						<div className="col-md-5 text-light">
							<div className=" border border-dark rounded movie my-2 mx-1 p-4" style={{ height: "95%" }}>
								<div className="text-center bg-warning  text-dark movie border border-dark rounded">
									<div className="d-inline">
										<i className="fas fa-ticket-alt fa-4x " />
									</div>

									<h1 className="p-3 d-inline">Ticket</h1>
								</div>
								<h2 className="my-2 border border-warning rounded bg-dark p-3 movie">
									Format: {location.state.type}
								</h2>
								<h2 className="my-2 border border-warning rounded bg-dark p-3 movie">
									Ticket price: {location.state.type == "2D" ? "$20" : "$30"}
								</h2>
								<div className="my-2 border border-warning rounded bg-dark p-3 movie">
									<h2 className="col-md my-1">Seats: {seats.map(item => item + " ")} </h2>
								</div>
							</div>
						</div>
						<div className="col-md-7 text-light">
							<div className="border border-dark rounded movie my-2 mx-1 p-4 row">
								<div className="col-md-7">
									<h2 className=" border rounded border-warning p-2 movie">
										Movie: {location.state.movie}{" "}
									</h2>
									<h2 className=" border rounded border-warning p-2 movie">
										Time: {location.state.hour}{" "}
									</h2>
									<h2 className=" border rounded border-warning p-2 movie">
										Date: {location.state.date}
									</h2>
									<h2 className=" border rounded border-warning p-2 movie">
										Cinema:{" "}
										{cinemas.map(cinema => {
											return (
												<React.Fragment key={cinema.id}>
													{location.state.cinema == cinema.id ? cinema.location : null}
												</React.Fragment>
											);
										})}
									</h2>
									<h2 className=" border rounded border-warning p-2 movie">Total: ${price} </h2>
								</div>
								<div className="col-md-4 m-auto">
									{movies.map(poster => {
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
							<Loading active={loadSchedule}>
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
									<button
										style={{ fontSize: "20px" }}
										onClick={sendData}
										className="btn btn-block btn-warning mt-3 col-md-6 fw-bold hoverButton"
										type="submit">
										Confirm
									</button>
								</div>
							</Loading>
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
