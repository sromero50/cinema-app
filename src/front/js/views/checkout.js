import React, { useState, useContext, useEffect } from "react";
import InfoBuy from "../component/infoBuy";
import { useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import InputForm from "../component/inputForm";
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

	const payment = () => {
		const mp = new MercadoPago("TEST-e284583c-2ce3-46bf-b432-2da8a2ccdd91");
		const cardForm = mp.cardForm({
			amount: total.toString(),
			autoMount: true,
			form: {
				id: "form-checkout",
				cardholderName: {
					id: "form-checkout__cardholderName",
					placeholder: "Card holder"
				},
				cardholderEmail: {
					id: "form-checkout__cardholderEmail",
					placeholder: "E-mail"
				},
				cardNumber: {
					id: "form-checkout__cardNumber",
					placeholder: "Card number"
				},
				cardExpirationDate: {
					id: "form-checkout__cardExpirationDate",
					placeholder: "Expiration date (MM/YYYY)"
				},
				securityCode: {
					id: "form-checkout__securityCode",
					placeholder: "Security code"
				},
				installments: {
					id: "form-checkout__installments",
					placeholder: "Installments"
				},
				identificationType: {
					id: "form-checkout__identificationType",
					placeholder: "Type of document"
				},
				identificationNumber: {
					id: "form-checkout__identificationNumber",
					placeholder: "Number of Document"
				},
				issuer: {
					id: "form-checkout__issuer",
					placeholder: "Bank"
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

					fetch("http://192.168.1.76:3001/api/process_payment", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							token,
							issuer_id,
							payment_method_id,
							transaction_amount: Number(amount),
							installments: Number(installments),
							description: "Cinema " + location.state.movie,
							payer: {
								email,
								identification: {
									type: identificationType,
									number: identificationNumber
								}
							}
						})
					})
						.then(response => response.json())
						.then(result => console.log(result.status_detail))
						.catch(error => console.log("error", error));
				}
			}
		});
	};
	useEffect(() => {
		payment();
	}, []);

	return (
		<div className="container  border rounded border-dark bg-dark movie my-2 p-3">
			<form id="form-checkout">
				<div className="text-light row">
					<div className="col-md mt-2 mx-1 row">
						<div className="card p-3 bg-dark text-light movie">
							<div className="bg-warning rounded border border-warning mb-2">
								<h1 className="text-dark my-2 text-center display-5">Confirm purchase</h1>
							</div>

							<InputForm
								label={"Card holder"}
								icon={"fas fa-user"}
								type={"text"}
								name={"cardholderName"}
								id={"form-checkout__cardholderName"}
							/>
							<InputForm
								label={"Email"}
								icon={"fa fa-envelope fa-sm"}
								type={"email"}
								name={"cardholderEmail"}
								id={"form-checkout__cardholderEmail"}
							/>
							<div className="row text-start">
								<div className="col-md-12">
									<InputForm
										label={"Card number"}
										icon={"fas fa-credit-card"}
										type={"text"}
										name={"cardNumber"}
										id={"form-checkout__cardNumber"}
									/>
								</div>
								<div className="col-md">
									<InputForm
										label={"Expiration date"}
										icon={"fas fa-calendar-alt"}
										type={"text"}
										name={"cardExpirationDate"}
										id={"form-checkout__cardExpirationDate"}
									/>
								</div>
								<div className="col-md">
									<InputForm
										label={"CSC"}
										icon={"fas fa-lock"}
										type={"text"}
										name={"securityCode"}
										id={"form-checkout__securityCode"}
									/>
								</div>
							</div>
							<div className="row text-start">
								<div className="col-md">
									<label className="form-label text-start mt-4">
										<h4>ID Type</h4>
									</label>
									<select
										className="form-select"
										name="identificationType"
										id="form-checkout__identificationType"
									/>
								</div>
								<div className="col-md">
									<InputForm
										label={"Identification number"}
										type={"text"}
										icon={"fas fa-id-card"}
										name={"identificationNumber"}
										id={"form-checkout__identificationNumber"}
									/>
								</div>
							</div>
							<div className="row text-start">
								<div className="col-md mb-3">
									<select name="issuer" className="form-select" id="form-checkout__issuer" />
								</div>
								<div className="col-md mb-3">
									<select
										className="form-select"
										name="installments"
										id="form-checkout__installments"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md text-light mt-2 mx-1 bg-dark">
						<div className="border border-dark text-dark bg-warning rounded movie p-3">
							<h2 className="my-2">Movie: {location.state.movie}</h2>
							<h2 className="my-2">Time: {location.state.hour} </h2>
							<h2 className="my-2">Date: {location.state.date}</h2>
							<h2 className="my-2">
								Cinema:{" "}
								{store.cinemas.map(cinema => {
									return (
										<React.Fragment key={cinema.id}>
											{location.state.cinema == cinema.id ? cinema.location : null}
										</React.Fragment>
									);
								})}
							</h2>
							<h2 className="my-2">Tickets: ${priceTicket} </h2>
							<h2 className="my-2">Snacks: ${snackPrice} </h2>
							<h2 className="my-2">Total: ${total} </h2>
						</div>
						<button
							onClick={payment}
							id="form-checkout__submit"
							className="btn btn-block btn-warning w-100 mt-3 fw-bold"
							type="submit">
							Confirm
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Checkout;
