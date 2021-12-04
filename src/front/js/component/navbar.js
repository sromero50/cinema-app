import React from "react";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
				<a className="navbar-brand" href="/home/">
					Cinema
					<i className="fas fa-film mx-2 fa-md" />
				</a>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
					<ul className="navbar-nav m-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link" aria-current="page" href="#">
								Movies
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Food & Drinks
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Our Cinemas
							</a>
						</li>
					</ul>
					<ul className="navbar-nav m-start mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link" href="#">
								<i className="fas fa-search fa-lg" />
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/login">
								<i className="fas fa-user-circle fa-lg" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
