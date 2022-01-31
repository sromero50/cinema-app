import React, { useState, useEffect } from "react";
import Loading from "./loading";
import { useSelector, useDispatch } from "react-redux";
import { deletePurchase } from "../redux/actions";
const PurchaseOrders = () => {
	const userID = useSelector(state => state.userID);
	const users = useSelector(state => state.users);
	const loadProfile = useSelector(state => state.loadProfile);
	const tickets = useSelector(state => state.tickets);
	const movies = useSelector(state => state.movies);
	const cinemas = useSelector(state => state.cinemas);
	const snacks = useSelector(state => state.snacks);
	const deleteTicket = useSelector(state => state.deleteTicket);
	const dispatch = useDispatch();

	const id = parseInt(userID);

	const [has, setHas] = useState();

	useEffect(
		() => {
			users.map(item => {
				if (id === item.id) {
					if (item.ticket !== "") {
						setHas(true);
					} else {
						setHas(false);
					}
				}
			});
		},
		[loadProfile]
	);

	return (
		<div className="col-md m-auto border rounded border-dark movie my-1">
			<div className="text-light">
				<Loading active={loadProfile}>
					{has && (
						<>
							{tickets.map(item => {
								return (
									<React.Fragment key={item.id}>
										{id === item.id_user ? (
											<div className="row movie p-3 border rounded border-dark">
												<div className="col-md">
													<div className="col-md border profileTicket border-warning rounded movie p-1 ps-2">
														{movies.map(movie => {
															return (
																<React.Fragment key={movie.id}>
																	{movie.id === item.id_movie ? (
																		<h3 className="my-1">Movie: {movie.name}</h3>
																	) : null}
																</React.Fragment>
															);
														})}
													</div>
													<div className="col-md border profileTicket border-warning rounded movie p-1 ps-2">
														{cinemas.map(cinema => {
															return (
																<React.Fragment key={cinema.id}>
																	{cinema.id === parseInt(item.cinema) ? (
																		<h3>Cinema: {cinema.location}</h3>
																	) : null}
																</React.Fragment>
															);
														})}
													</div>
													<div className="col-md border profileTicket border-warning rounded movie p-1 ps-2">
														<h3 className="my-1">Date: {item.date}</h3>
													</div>
													<div className="col-md border profileTicket border-warning rounded movie p-1 ps-2">
														<h3 className="my-1">Hour: {item.hour}</h3>
													</div>
													<div className="col-md border profileTicket border-warning rounded movie p-1 ps-2">
														<h3 className="my-1">Code: {item.code}</h3>
													</div>
													<div className="col-md border profileTicket border-warning rounded movie p-1 ps-2">
														<h3 className="my-1">Seat: {item.seat}</h3>
													</div>{" "}
												</div>

												<div className="col-md   ">
													<div className="border movie profileTicket rounded border-warning  p-1 ps-2">
														<h3>Snacks:</h3>
														{item.snacks !== "" ? (
															<>
																{snacks.map(snack => {
																	return (
																		<React.Fragment key={snack.id}>
																			{" "}
																			{snack.id_ticket === item.id ? (
																				<>
																					<h3>
																						{snack.quantity} {snack.snack}
																					</h3>
																				</>
																			) : null}
																		</React.Fragment>
																	);
																})}
															</>
														) : (
															<h3>You have not purchased snacks</h3>
														)}
													</div>

													<button
														onClick={() => dispatch(deletePurchase(item.id))}
														className="btn my-2 btn-danger fw-bold col-md-12 movie">
														Delete purchase <i className="fas fa-trash" />
													</button>
												</div>
											</div>
										) : null}
									</React.Fragment>
								);
							})}
						</>
					)}
					{!has && (
						<div className="m-auto text-center my-2 col-md">
							<h1>You do not have purchase orders yet</h1>
						</div>
					)}
				</Loading>
			</div>
			{deleteTicket && <>{window.location.reload()}</>}
		</div>
	);
};

export default PurchaseOrders;
