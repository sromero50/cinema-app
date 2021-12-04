import React from "react";

export const Footer = () => {
	return (
		<div className="mt-3 ">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<ul className="navbar-nav mb-lg-0  m-auto list-group list-group-horizontal-sm">
						<li className="nav-item">
							<a className="nav-link" href="#">
								<i className="fab fa-facebook-square fa-2x" />
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								<i className="fab fa-twitter-square fa-2x" />
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								<i className="fab fa-instagram fa-2x" />
							</a>
						</li>
					</ul>
				</div>
				<div className="container">
					<ul className="navbar-nav mb-lg-0  m-auto">
						<li className="nav-item">
							<a className="nav-link" href="#">
								© 2021 Copyright
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
