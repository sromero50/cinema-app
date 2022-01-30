import React, { useState, useEffect } from "react";
import LoadingButton from "../component/loadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import InputForm from "../component/inputForm";
import { useDispatch, useSelector } from "react-redux";
import { purchaseTicket } from "../redux/actions";
const Checkout = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const schedules = useSelector(state => state.schedules);
	const login = useSelector(state => state.login);
	const cinemas = useSelector(state => state.cinemas);
	const movies = useSelector(state => state.movies);
	const purchaseConfirmed = useSelector(state => state.purchaseConfirmed);

	const [total, setTotal] = useState(location.state.total);

	const [priceTicket, setPriceTicket] = useState(location.state.ticket);
	const [snackPrice, setSnackPrice] = useState(location.state.snacks);

	const [status, setStatus] = useState();
	const [loading, setLoading] = useState(false);

	const [id_movie, setId_movie] = useState();
	const [id_schedule, setId_schedule] = useState();
	const [id_user, setId_user] = useState();

	const user = JSON.parse(localStorage.getItem("id"));

	const [show, setShow] = useState(false);

	useEffect(() => {
		schedules.map(id => {
			if (
				id.hour == location.state.hour &&
				id.date === location.state.date &&
				parseInt(location.state.cinema) === id.id_cinema
			) {
				setId_movie(id.id_movie);
				setId_schedule(id.id);
				setId_user(user.user_id);
			}
		});
	});

	const payment = () => {
		const mp = new MercadoPago(process.env.frontMercado, {
			locale: "en-US"
		});
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
				onSubmit: async event => {
					event.preventDefault();
					setLoading(true);
					try {
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

						var myHeaders = new Headers();
						myHeaders.append("Content-Type", "application/json");

						var raw = JSON.stringify({
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
						});
						var requestOptions = {
							method: "POST",
							headers: myHeaders,
							body: raw
						};
						const response = await fetch(process.env.BACKEND_URL + "/api/process_payment", requestOptions);
						const responseBody = await response.json();
						console.log(responseBody);
						if (responseBody.status_detail == "accredited") {
							setLoading(false);
						}
						setStatus(responseBody.status_detail);
					} catch (error) {
						setLoading(false);
						console.log(error);
					}
				}
			}
		});
	};

	useEffect(() => {
		payment();
	}, []);

	useEffect(
		() => {
			if (status === "accredited") {
				dispatch(
					purchaseTicket(
						id_movie,
						id_schedule,
						location.state.type,
						location.state.hour,
						location.state.date,
						location.state.cinema,
						id_user,
						location.state.seats,
						location.state.snackList
					)
				);
			} else if (status !== "accredited" && status !== undefined) {
				alert(status);
			}
		},
		[status]
	);
	const confirm = () => {
		navigate("/confirmation", {
			state: {
				snacks: location.state.snackList,
				cinema: location.state.cinema,
				date: location.state.date,
				hour: location.state.hour,
				movie: location.state.movie,
				seats: location.state.seats,
				type: location.state.type
			}
		});
	};

	return (
		<>
			{login && (
				<div className="container  border rounded border-dark bg-dark movie my-2 p-3">
					<form id="form-checkout">
						<div className="text-light row">
							<div className="col-md mt-2 mx-1 row">
								<div className="card p-3 bg-dark text-light movie">
									<div className="bg-warning rounded border border-dark movie mb-2">
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
								<div className="row border border-dark rounded movie my-2 mx-1 p-4 ">
									<div className="col-md-7">
										<h3 className="my-2 border rounded border-warning p-2 movie">
											Movie: {location.state.movie}
										</h3>
										<h3 className="my-2 border rounded border-warning p-2 movie">
											Time: {location.state.hour}{" "}
										</h3>
										<h3 className="my-2 border rounded border-warning p-2 movie">
											Date: {location.state.date}
										</h3>
										<h3 className="my-2 border rounded border-warning p-2 movie">
											Cinema:{" "}
											{cinemas.map(cinema => {
												return (
													<React.Fragment key={cinema.id}>
														{location.state.cinema == cinema.id ? cinema.location : null}
													</React.Fragment>
												);
											})}
										</h3>
										<h3 className="my-2 border rounded border-warning p-2 movie">
											Tickets: ${priceTicket}{" "}
										</h3>
										{snackPrice == 0 ? null : (
											<h3 className="my-2 border rounded border-warning p-2 movie">
												Snacks: ${snackPrice}{" "}
											</h3>
										)}

										<h3 className="my-2 border rounded border-warning p-2 movie">
											Total: ${total}{" "}
										</h3>
									</div>
									<div className="col-md-5 m-auto">
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
								<LoadingButton
									disabled={loading}
									action={payment}
									loading={loading}
									text={"Confirm"}
									style={"btn hoverButton movie col-md-12 btn-warning w-100 mt-3 fw-bold"}
								/>
							</div>
						</div>
					</form>
					<button className="col-md-6 btn btn-danger fw-bold mt-3 p-2" onClick={() => setShow(!show)}>
						Click for credit cards to test
					</button>
					{show && (
						<div className="p-3 my-3 border border-danger movie rounded col-md-6 text-light">
							<div
								className="
								row">
								<div className="col-md border rounded border-secondary p-2">
									<h5>Card Number: 5031 7557 3453 0604</h5>
									<h5>Security code: 123</h5>
									<h5>Expiration date: 11/25</h5>
								</div>
							</div>
							<div
								className="
								row">
								<div className="col-md border rounded border-secondary p-2">
									<h5>Card Number: 4509 9535 6623 3704</h5>
									<h5>Security code: 123</h5>
									<h5>Expiration date: 11/25</h5>
								</div>
							</div>
							<div
								className="
								row">
								<div className="col-md border rounded border-secondary p-2">
									<h5>Card Number: 3711 803032 57522</h5>
									<h5>Security code: 1234 </h5>
									<h5>Expiration date: 11/25</h5>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
			{purchaseConfirmed && confirm()}
		</>
	);
};

export default Checkout;
