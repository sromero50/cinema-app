import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoLogin = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const saveData = () => {
		navigate("/login", {
			state: {
				cinema: location.state.cinema,
				date: location.state.date,
				hour: location.state.hour,
				movie: location.state.movie,
				type: location.state.type
			}
		});
	};

	return (
		<div className="container text-center movie bg-dark border-dark border rounded col-md-6 p-2 mt-5">
			<h1 className="text-light my-3">You need to login first</h1>

			<button
				onClick={saveData}
				style={{ fontSize: "20px" }}
				className="btn my-3 fw-bold btn-warning col-md-4 movie">
				Go to login
			</button>
		</div>
	);
};

export default GoLogin;
