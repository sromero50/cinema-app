import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
export const SelectedMovie = props => {
	const { store, actions } = useContext(Context);

	const [showtime, setShowtime] = useState(false);
	const [cinema, setCinema] = useState("");
	const [date, setDate] = useState("");
	const [hour, setHour] = useState("");
	const [idMovie, setIdMovie] = useState("");
	const [type, setType] = useState("");
	const params = useParams();
	const navigate = useNavigate();

	const dataTicket = (cinema, date, hour) => {
		navigate("/selectseat", { state: { cinema: cinema, date: date, hour: hour, movie: params.title, type: type } });
	};
	console.log(type);
	useEffect(() => {
		store.movies.map(movie => {
			if (movie.name === params.title) {
				return setIdMovie(movie.id);
			}
		});
	});

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
										<div className="mt-4 text-light movie">
											<h2 className="text-center movie bg-warning my-1 border rounded border-dark text-dark p-2 fw-bold">
												{movie.name}
											</h2>
											<div className="p-2 border rounded border-dark my-3">
												<h3 className="my-2">Synopsis: {movie.synopsis}</h3>
												<h3 className="my-5">Genre: {movie.genre}</h3>
												<h3 className="my-5">Release Date: {movie.release_date}</h3>
												<h6 className="my-5">Duration: {movie.duration} mins</h6>
												<h6 className="my-5">Director: {movie.director}</h6>
											</div>
										</div>
									</div>
								</>
							) : null}
						</div>
					);
				})}
				<div className="row text-light p-2 border border-dark user-select-none mt-3">
					<div>
						<select
							style={{ fontSize: "25px" }}
							className="text-center form-select my-1 col-md fw-bold bg-warning text-dark border border-dark movie"
							onChange={e => setCinema(e.target.value)}
							aria-label="Default select example">
							<option defaultValue>Cinema</option>
							{store.cinemas.map(cinema => {
								return (
									<option
										style={{ fontSize: "25px" }}
										className="fw-bold"
										key={cinema.id}
										value={cinema.id}>
										{cinema.location}
									</option>
								);
							})}
						</select>
						<select
							style={{ fontSize: "25px" }}
							className="text-center form-select my-2 col-md fw-bold bg-warning text-dark border border-dark movie"
							onChange={e => setType(e.target.value)}
							aria-label="Default select example">
							<option defaultValue>Format</option>
							{store.format.map(format => {
								return (
									<option
										style={{ fontSize: "25px" }}
										className="fw-bold"
										key={format}
										value={format}>
										{format}
									</option>
								);
							})}
						</select>
					</div>
					<div className="row text-center mt-4 ">
						<div className="col-sm">
							<div>
								{store.dates.map(date => {
									return (
										<button
											style={{ fontSize: "20px" }}
											key={date}
											className="border movie rounded border-warning btn btn-warning mx-2 my-2 col-md-2 fw-bold"
											onClick={e => {
												setShowtime(true);
												if (showtime == true) {
													setShowtime(false);
													setShowtime(true);
												}
												setDate(e.target.value);
											}}
											value={date}>
											{date}
										</button>
									);
								})}
							</div>
							<div className="m-auto text-center">
								<ul className="text-center list-group list-group-horizontal-sm my-2">
									{store.schedules.map(schedule => {
										return (
											<>
												{cinema == schedule.id_cinema ? (
													<>
														{showtime && schedule.date == date ? (
															<>
																{schedule.id_movie == idMovie ? (
																	<>
																		{schedule.type == type ? (
																			<li className="list-group-item text-light bg-dark border border-dark col-md">
																				<input
																					className="inputHour"
																					id={schedule.hour}
																					type="checkbox"
																					name={schedule.hour}
																					value={schedule.hour}
																					onClick={e =>
																						setHour(e.target.value)
																					}
																				/>
																				<label
																					className="labelHour fw-bold m-auto bg-dark list-group-item text-light border rounded border-dark movie mx-1 col-md"
																					htmlFor={schedule.hour}>
																					{schedule.hour}
																				</label>
																			</li>
																		) : null}
																	</>
																) : null}
															</>
														) : null}
													</>
												) : null}
											</>
										);
									})}
								</ul>
							</div>
							<button
								style={{ fontSize: "20px" }}
								onClick={() => dataTicket(cinema, date, hour)}
								className="my-2 movie btn btn-warning col-md-4 fw-bold">
								<a style={{ textDecoration: "none", color: "black" }}>Select</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SelectedMovie.propTypes = {
	match: PropTypes.object
};
