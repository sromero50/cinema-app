import React, { useState, useContext } from "react";
import InfoBuy from "../component/infoBuy";
import { useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
const Checkout = () => {
	const location = useLocation();
	const [total, setTotal] = useState(location.state.total);
	const { store, actions } = useContext(Context);
	const [priceTicket, setPriceTicket] = useState(location.state.ticket);
	const [snackPrice, setSnackPrice] = useState(location.state.snacks);

	const [form, setForm] = useState({
		email: "",
		name: "",
		surname: ""
	});

	const handleSubmit = event => {
		event.preventDefault();
		actions.loginUser(form.email, form.password);
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<div className="container  border rounded border-dark bg-dark movie my-2 p-3">
			<div className="text-light text-center row m-auto p-2 ms-3">
				<div className="col-md-6 row mb-4">
					<div className="card p-3 bg-dark text-light movie">
						<h1 className="text-light text-center display-5">Confirm buy</h1>
						<div className="row text-start">
							<div className="col-md">
								<label className="form-label">
									<h4>Name</h4>
								</label>
								<div className="form-input mb-3">
									<input type="text" className="form-control" placeholder="Name" />
								</div>
							</div>
							<div className="col-md">
								<label className="form-label">
									<h4>Surname</h4>
								</label>
								<div className="form-input mb-3">
									<input type="text" className="form-control" placeholder="Surname" />
								</div>
							</div>
						</div>
						<label className="form-label text-start mt-4">
							<h4>Email</h4>
						</label>
						<div className="form-input input-group mb-3">
							<span className="input-group-text">
								<i className="fa fa-envelope fa-sm" />
							</span>
							<input type="text" className="form-control" placeholder="Email address" />
						</div>
					</div>
				</div>
				<div className="col-md-5 text-light text-start p-3 m-auto bg-dark">
					<div className="border border-dark rounded movie p-3">
						<h2>Movie: </h2>
						<h2>Time: </h2>
						<h2>Cinema: </h2>
						{store.snackList.map(product => {
							return (
								<h2 key={product.id}>
									{product.snack}: {product.quantity}{" "}
								</h2>
							);
						})}
						<h2>Tickets: ${priceTicket} </h2>
						<h2>Snacks: ${snackPrice} </h2>
						<h2>Total: ${total} </h2>
					</div>
					<button className="btn btn-block btn-warning w-100 mt-3 fw-bold" type="submit">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
