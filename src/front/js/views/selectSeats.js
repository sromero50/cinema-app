import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const SelectSeats = props => {
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(20);
	const [available, setAvailable] = useState(false);
	const [seats, setSeats] = useState("");

	const rowA = [
		{ seat: "1A", available: false },
		{ seat: "2A", available: true },
		{ seat: "3A", available: true },
		{ seat: "4A", available: true },
		{ seat: "5A", available: true },
		{ seat: "6A", available: true },
		{ seat: "7A", available: true },
		{ seat: "8A", available: false }
	];
	const rowB = ["1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B"];
	const rowC = ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C"];
	const rowD = ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D"];
	const rowE = ["1E", "2E", "3E", "4E", "5E", "6E", "7E", "8E"];

	const pepe = [{ "1A": true }, { "2E": true }];

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
			setSeats(e.target.value);
		} else if (e.target.checked == false) {
			setQuantity(quantity - 1);
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
		navigate("/snacks", { state: { total: price } });
	};

	return (
		<div className="container  border rounded border-dark bg-dark movie my-2 p-3">
			<div className="bg-dark border rounded border-dark row">
				<div className="col-xl-6 text-light">
					<div className=" border border-dark rounded movie mt-2 p-4">
						<i className="fas fa-ticket-alt fa-4x my-2" />
						<h2 className="my-2">Ticket price: $20</h2>
						<div className="row">
							<h2 className="col-md my-1">Quantity: {quantity} </h2>
						</div>
					</div>
				</div>
				<div className="col-xl-6 text-light">
					<div className="border border-dark rounded movie my-2 p-4">
						<h2>Movie: {props.movie} </h2>
						<h2>Time: {props.time} </h2>
						<h2>Cinema: </h2>
						<h2>Total: ${price} </h2>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="bg-dark text-light text-center movie border rounded border-dark mt-1 mb-2 p-4 d-flex justify-content-center user-select-none">
					<div className="container">
						<div className="row mt-2 mb-4 prueba d-flex justify-content-center">
							<div className="col-sm-6 screen">A</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-sm-2 ">A</div>
							{rowA.map(seat => {
								return (
									<>
										{seat.available == true ? (
											<input
												className="inputAsiento col-sm-1 fw-bold"
												id={seat.seat}
												type="checkbox"
												name={seat.seat}
												value={seat.seat}
												disabled={available == false ? false : true}
												onChange={handleQuantity}
											/>
										) : (
											<input
												className="inputSeatDisable col-sm-1 fw-bold"
												id={seat.seat}
												type="checkbox"
												name={seat.seat}
												value={seat.seat}
												disabled={true}
												onChange={handleQuantity}
											/>
										)}
									</>
								);
							})}
							<div className="col-sm-2">A</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-sm-2">B</div>
							{rowB.map(seat => {
								return (
									<>
										<input
											className="inputAsiento col-sm-1 fw-bold"
											id={seat}
											type="checkbox"
											name={seat}
											value={seat}
											disabled={available == false ? false : true}
											onChange={handleQuantity}
										/>
									</>
								);
							})}
							<div className="col-sm-2">B</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-sm-2">C</div>
							{rowC.map(seat => {
								return (
									<>
										<input
											className="inputAsiento col-sm-1 fw-bold"
											id={seat}
											type="checkbox"
											name={seat}
											value={seat}
											disabled={available == false ? false : true}
											onChange={handleQuantity}
										/>
									</>
								);
							})}
							<div className="col-sm-2">C</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-sm-2">D</div>
							{rowD.map(seat => {
								return (
									<>
										<input
											className="inputAsiento col-sm-1 fw-bold"
											id={seat}
											type="checkbox"
											name={seat}
											value={seat}
											disabled={available == false ? false : true}
											onChange={handleQuantity}
										/>
									</>
								);
							})}
							<div className="col-sm-2">D</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-sm-2">E</div>
							{rowE.map(seat => {
								return (
									<>
										<input
											className="inputAsiento col-sm-1 fw-bold"
											id={seat}
											type="checkbox"
											name={seat}
											value={seat}
											disabled={available == false ? false : true}
											onChange={handleQuantity}
										/>
									</>
								);
							})}
							<div className="col-sm-2">E</div>
						</div>
						<div className="row d-flex justify-content-center text-light">
							<div className="col-sm-2" />
							<div className="col-sm-1 number">1</div>
							<div className="col-sm-1 number">2</div>
							<div className="col-sm-1 number">3</div>
							<div className="col-sm-1 number">4</div>
							<div className="col-sm-1 number">5</div>
							<div className="col-sm-1 number">6</div>
							<div className="col-sm-1 number">7</div>
							<div className="col-sm-1 number">8</div>
							<div className="col-sm-2" />
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
	);
};

export default SelectSeats;

SelectSeats.propTypes = {
	movie: PropTypes.string,
	time: PropTypes.string
};
