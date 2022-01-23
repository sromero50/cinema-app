import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
export const SelectedMovie = props => {
	const [showtime, setShowtime] = useState(false);
	const { store, actions } = useContext(Context);
	const [date, setDate] = useState("");
	const params = useParams();

	const dates = [...new Set(store.schedules.map(schedule => schedule.date))];

	return (
		<div className="container bg-dark my-2 border rounded border-dark selectedMovie">
			<div>
				{store.movies.map(movie => {
					return (
						<div key={movie.id} className="row">
							{movie.name == params.title ? (
								<>
									<div className="col-md d-flex justify-content-center mt-5">
										<img
											src={movie.poster}
											className="img-fluid poster border rounded border-dark "
											alt="..."
										/>
									</div>
									<div className="col-sm">
										<div className="mt-4 text-light">
											<h2 className="text-center">{movie.name}</h2>
											<h4>Synopsis: {movie.synopsis}</h4>
											<h3>Genre: {movie.genre}</h3>
											<h3>Release Date: {movie.release_date}</h3>
											<h6>Duration: {movie.duration} mins</h6>
											<h6>Director: {movie.director}</h6>
										</div>
									</div>
								</>
							) : null}
						</div>
					);
				})}
				<div className="row text-light p-2 border border-dark user-select-none">
					<div className="row text-center mt-4 ">
						<div className="col-sm">
							<div>
								{/* separar en componente */}
								{store.dates.map(date => {
									return (
										<button
											key={date}
											className="border rounded border-warning btn btn-warning mx-2 py-2 col-md-2"
											onClick={e => {
												setShowtime(!showtime);
												setDate(e.target.value);
												console.log(e.target.value);
											}}
											value={date}>
											{date}
										</button>
									);
								})}
							</div>
							{store.schedules.map(schedule => {
								return <>{showtime && schedule.date == date ? <> {schedule.hour} </> : null}</>;
							})}

							{/* {store.schedules.map(schedule => {
								return (
									<>
										{showtime && (
											<>
												{
													(schedule.date = date ? (
														<div className="text-centerp-3">
															<h5 className="bg-dark text-light text-start ms-3 mt-3">
																2D
															</h5>
															<ul className="text-center list-group list-group-horizontal-sm">
																<li className="list-group-item text-light bg-dark border border-dark">
																	<input
																		className="inputReserva"
																		id={schedule.hour}
																		type="checkbox"
																		name={schedule.hour}
																		value={schedule.hour}
																		// onClick={e =>
																		// 	setForm(e.target.value)
																		// }
																	/>
																	<label
																		className="labelReserva bg-dark list-group-item text-light border rounded border-secondary mx-2"
																		htmlFor={schedule.hour}>
																		{schedule.hour}
																	</label>
																</li>
															</ul>
														</div>
													) : null)
												}
											</>
										)}
									</>
								);
							})} */}

							<button className="my-2 btn btn-warning btn-block w-50">
								<a href="/selectseat" style={{ textDecoration: "none", color: "black" }}>
									Buy
								</a>
							</button>
						</div>

						{/* <div className="col-sm">
							<div
								className="border rounded border-warning mx-2 py-2"
								onClick={() => setShowtime(!showtime)}>
								fecha
							</div>
							{showtime && (
								<div className="text-centerp-3">
									<h5 className="bg-dark text-light text-start ms-3 mt-3">2D</h5>
									<ul className="text-center list-group list-group-horizontal-sm">
										<li className="list-group-item text-light bg-dark border border-dark">
											<input
												className="inputReserva"
												id="horario"
												type="checkbox"
												name="horario"
												value="horario"
												// onClick={e =>
												// 	setForm(e.target.value)
												// }
											/>
											<label
												className="labelReserva bg-dark list-group-item text-light border rounded border-secondary mx-2"
												htmlFor="horario">
												Horario
											</label>
										</li>
										<li className="bg-dark list-group-item text-light border rounded border-secondary mx-2">
											Horario
										</li>
										<li className="bg-dark list-group-item text-light border rounded border-secondary mx-2">
											Horario
										</li>
										<li className="bg-dark list-group-item text-light border rounded border-secondary mx-2">
											Horario
										</li>
										<li className="bg-dark list-group-item text-light border rounded border-secondary mx-2">
											Horario
										</li>
										<li className="bg-dark list-group-item text-light border rounded border-secondary mx-2">
											Horario
										</li>
									</ul>
									<h5 className="bg-dark text-light text-start ms-3 mt-3">3D</h5>
									<ul className="text-center list-group list-group-horizontal-sm">
										<li className="bg-dark list-group-item text-light border rounded border-secondary mx-2 my-2">
											Horario
										</li>
									</ul>
								</div>
							)}
							<button className="my-2 btn btn-warning btn-block w-50">
								<a href="/selectseat" style={{ textDecoration: "none", color: "black" }}>
									Buy
								</a>
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

SelectedMovie.propTypes = {
	match: PropTypes.object
};
