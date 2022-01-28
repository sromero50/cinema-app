import React from "react";

export const Footer = () => {
	return (
		<footer className="navbar navbar-expand-lg navbar-dark bg-dark footer">
			<div className="container">
				<ul className="navbar-nav mb-lg-0  m-auto list-group list-group-horizontal-sm">
					<li className="nav-item">
						<a className="nav-link" href="https://facebook.com/">
							<i className="fab fa-facebook-square fa-2x" />
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="https://twitter.com/">
							<i className="fab fa-twitter-square fa-2x" />
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="https://instagram.com/">
							<i className="fab fa-instagram fa-2x" />
						</a>
					</li>
				</ul>
			</div>
			<div className="container">
				<ul className="navbar-nav mb-lg-0  m-auto">
					<li className="nav-item">
						<a className="nav-link" href="https://www.linkedin.com/in/sebastian-romero-portela/">
							Made by sromero50
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};
