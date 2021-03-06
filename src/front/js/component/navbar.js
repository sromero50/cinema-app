import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./searchBarj";
import { logout } from "../redux/actions";

export const Navbar = () => {
	let movies = useSelector(state => state.movies);
	const login = useSelector(state => state.login);
	const info = useSelector(state => state.info);
	const released = movies.filter(item => {
		if (item.released === true) {
			return { name: item.name };
		}
	});

	const dispatch = useDispatch();

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
			<div className="container">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarTogglerDemo03"
					aria-controls="navbarTogglerDemo03"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<a className="navbar-brand" href="/">
					Cinema
					<i className="fas fa-film mx-2 fa-md text-warning" />
				</a>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
					<ul className="navbar-nav m-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link" aria-current="page" href="/">
								Movies
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/cinemas">
								Our Cinemas
							</a>
						</li>
					</ul>
					<ul className="navbar-nav m-start mb-2 mb-lg-0">
						<SearchBar placeholder="Search" data={released} />
						<li className="nav-item">
							<a className="nav-link" href="#">
								<i className="fas fa-search fa-lg" />
							</a>
						</li>
						{login && (
							<>
								<li className="nav-item">
									<a className="nav-link" href="/profile">
										{info.map(item => item.name)}{" "}
										<i className="fas fa-user-circle fa-lg text-warning" />
									</a>
								</li>
								<li className="nav-item" onClick={() => dispatch(logout())}>
									<a className="nav-link text-danger" href="/">
										<i className="fas fa-sign-in-alt" />
									</a>
								</li>
							</>
						)}
						{!login && (
							<li className="nav-item">
								<a className="nav-link" href="/login">
									<i className="fas fa-user-circle fa-lg" />
								</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
