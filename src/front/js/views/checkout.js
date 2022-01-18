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
		actions.loginUser(form.email, form.surname, form.name);
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	const cardForm = mp.cardForm({
		amount: "100.5",
		autoMount: true,
		form: {
			id: "form-checkout",
			cardholderName: {
				id: "form-checkout__cardholderName",
				placeholder: "Titular de la tarjeta"
			},
			cardholderEmail: {
				id: "form-checkout__cardholderEmail",
				placeholder: "E-mail"
			},
			cardNumber: {
				id: "form-checkout__cardNumber",
				placeholder: "Número de la tarjeta"
			},
			cardExpirationDate: {
				id: "form-checkout__cardExpirationDate",
				placeholder: "Data de vencimiento (MM/YYYY)"
			},
			securityCode: {
				id: "form-checkout__securityCode",
				placeholder: "Código de seguridad"
			},
			installments: {
				id: "form-checkout__installments",
				placeholder: "Cuotas"
			},
			identificationType: {
				id: "form-checkout__identificationType",
				placeholder: "Tipo de documento"
			},
			identificationNumber: {
				id: "form-checkout__identificationNumber",
				placeholder: "Número de documento"
			},
			issuer: {
				id: "form-checkout__issuer",
				placeholder: "Banco emisor"
			}
		},
		callbacks: {
			onFormMounted: error => {
				if (error) return console.warn("Form Mounted handling error: ", error);
				console.log("Form mounted");
			},
			onSubmit: event => {
				event.preventDefault();

				const {
					paymentMethodId: payment_method_id,
					issuerId: issuer_id,
					cardholderEmail: email,
					amount,
					token,
					installments,
					identificationNumber,
					identificationType
				} = cardForm.getCardFormData();

				fetch("/process_payment", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						token,
						issuer_id,
						payment_method_id,
						transaction_amount: Number(total),
						installments: Number(installments),
						description: "Descripción del producto",
						payer: {
							email,
							identification: {
								type: identificationType,
								number: identificationNumber
							}
						}
					})
				});
			},
			onFetching: resource => {
				console.log("Fetching resource: ", resource);

				// Animate progress bar
				const progressBar = document.querySelector(".progress-bar");
				progressBar.removeAttribute("value");

				return () => {
					progressBar.setAttribute("value", "0");
				};
			}
		}
	});

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
						<form id="form-checkout">
							<input
								type="text"
								name="cardNumber"
								id="form-checkout__cardNumber"
								placeholder="Card Number"
							/>
							<input
								type="text"
								name="cardExpirationDate"
								id="form-checkout__cardExpirationDate"
								placeholder="Expiration date"
							/>
							<input
								type="text"
								name="cardholderName"
								id="form-checkout__cardholderName"
								placeholder="Card Holder Name"
							/>
							<input
								type="email"
								name="cardholderEmail"
								id="form-checkout__cardholderEmail"
								placeholder="Card Holder Email"
							/>
							<input
								type="text"
								name="securityCode"
								id="form-checkout__securityCode"
								placeholder="Security code"
							/>
							<select name="issuer" id="form-checkout__issuer">
								<option value="CapitanOne">Capital One</option>
								<option value="BBVA">BBVA</option>
								<option value="bankOfAmerica">Bank of America</option>
								<option value="Chase">Chase</option>
							</select>
							<select name="identificationType" id="form-checkout__identificationType">
								<option value="DNI">DNI</option>
							</select>
							<input
								type="text"
								name="identificationNumber"
								id="form-checkout__identificationNumber"
								placeholder="Identification Number"
							/>
							<select name="installments" id="form-checkout__installments">
								<option value="one">One payment</option>
							</select>
							<button type="submit" id="form-checkout__submit">
								Confirm
							</button>
							<progress value="0" className="progress-bar">
								Loading...
							</progress>
						</form>
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
