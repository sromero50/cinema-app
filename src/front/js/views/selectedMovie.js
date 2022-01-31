import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Loading from "../component/loading";
export const SelectedMovie = props => {
	const movies = useSelector(state => state.movies);
	const schedules = useSelector(state => state.schedules);
	const loadSchedule = useSelector(state => state.loadSchedule);
	const cinemas = useSelector(state => state.cinemas);
	const format = useSelector(state => state.format);

	const [showtime, setShowtime] = useState(false);
	const [cinema, setCinema] = useState("");
	const [date, setDate] = useState("");
	const [hour, setHour] = useState("");
	const [idMovie, setIdMovie] = useState("");
	const [type, setType] = useState("");
	const params = useParams();
	const navigate = useNavigate();

	const dataTicket = (cinema, date, hour) => {
		if (cinema === "" || date === "" || (hour === "") & (type === "")) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "You need to complete the selection"
			});
		} else {
			navigate("/selectseat", {
				state: { cinema: cinema, date: date, hour: hour, movie: params.title, type: type }
			});
		}
	};

	useEffect(() => {
		movies.map(movie => {
			if (movie.name === params.title) {
				return setIdMovie(movie.id);
			}
		});
	});

	//  Filter Hour
	const filterHour = schedules.filter(schedule => {
		if (
			cinema == schedule.id_cinema &&
			schedule.id_movie == idMovie &&
			schedule.date == date &&
			schedule.type == type
		) {
			return { hour: schedule };
		}
	});

	// Filter Date
	const filterDate = schedules.filter(schedule => {
		if (cinema == schedule.id_cinema && schedule.id_movie == idMovie && schedule.type == type) {
			return schedule;
		}
	});

	let dates = [...new Set(filterDate.map(schedule => schedule.date))];
	dates = dates.sort((a, b) => parseFloat(a) - parseFloat(b));

	return (
		<div className="container bg-dark my-4 p-3 border rounded border-dark selectedMovie">
			<div>
				{movies.map(movie => {
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
										<div className="mt-4 text-light movie border rounded border-dark">
											<h2 className="text-center movie bg-warning mt-1 border rounded border-dark text-dark p-2 fw-bold">
												{movie.name}
											</h2>
											<div className="p-2 border rounded border-dark my-1">
												<h3 className="my-2 border rounded border-warning p-3 movie">
													Synopsis: {movie.synopsis}
												</h3>
												<h3 className="my-2 border rounded border-warning p-3 movie">
													Genre: {movie.genre}
												</h3>
												<h3 className="my-2 border rounded border-warning p-3 movie">
													Release Date: {movie.release_date}
												</h3>
												<p className="my-1 border rounded border-warning px-3 movie">
													Duration: {movie.duration} mins
												</p>
												<p className="my-1 border rounded border-warning px-3 movie">
													Director: {movie.director}
												</p>
											</div>
										</div>
									</div>
								</>
							) : null}
						</div>
					);
				})}
				<Loading active={loadSchedule}>
					<div className="row text-light p-2 border border-dark user-select-none mt-3">
						<div>
							<select
								style={{ fontSize: "25px" }}
								className="text-center hoverButton form-select my-1 col-md fw-bold bg-warning text-dark border border-dark movie"
								onChange={e => setCinema(e.target.value)}
								aria-label="Default select example">
								<option defaultValue>Cinema</option>
								{cinemas.map(cinema => {
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
								className="text-center hoverButton form-select my-2 col-md fw-bold bg-warning text-dark border border-dark movie"
								onChange={e => setType(e.target.value)}
								aria-label="Default select example">
								<option defaultValue>Format</option>
								{format.map(format => {
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
									{dates.map(item => {
										return (
											<button
												key={item}
												className={
													item == date
														? "border movie hoverButton rounded border-warning btn btn-warning mx-2 my-2 col-md-2 fw-bold"
														: "border hoverButton movie rounded border-dark btn btn-dark mx-2 my-2 col-md-2 fw-bold"
												}
												onClick={e => {
													setShowtime(true);
													if (showtime == true) {
														setShowtime(false);
														setShowtime(true);
													}
													setDate(e.target.value);
												}}
												value={item}>
												{item}
											</button>
										);
									})}
								</div>
								<div className="m-auto text-center">
									<ul className="text-center list-group list-group-horizontal-sm my-2">
										{filterHour.map(item => {
											return (
												<li
													key={item.id}
													className="list-group-item text-light bg-dark border border-dark col-md">
													<input
														className="inputHour"
														id={item.hour}
														type="checkbox"
														name={item.hour}
														value={item.hour}
														onChange={e => setHour(e.target.value)}
														checked={hour == item.hour ? true : false}
													/>
													<label
														className="labelHour fw-bold m-auto bg-dark list-group-item text-light border rounded border-dark movie mx-1 col-md"
														htmlFor={item.hour}>
														{item.hour}
													</label>
												</li>
											);
										})}
									</ul>
								</div>
								<button
									style={{ fontSize: "20px" }}
									onClick={() => dataTicket(cinema, date, hour)}
									className="my-2 hoverButton movie btn btn-warning col-md-4 fw-bold">
									<a style={{ textDecoration: "none", color: "black" }}>Select</a>
								</button>
							</div>
						</div>
					</div>
				</Loading>
			</div>
		</div>
	);
};

SelectedMovie.propTypes = {
	match: PropTypes.object
};
