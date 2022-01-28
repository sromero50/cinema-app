import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { store, actions } = useContext(Context);

	const [form, setForm] = useState({ email: "", password: "" });
	const [hide, setHide] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		actions.login(form.email, form.password);
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	const saveData = () => {
		if (location.state !== null) {
			navigate("/selectseat", {
				state: {
					cinema: location.state.cinema,
					date: location.state.date,
					hour: location.state.hour,
					movie: location.state.movie,
					type: location.state.type
				}
			});
		} else {
			navigate("/");
		}
	};

	useEffect(
		() => {
			if (store.login === true) {
				saveData();
			}
		},
		[store.login]
	);

	return (
		<div className="container mt-5 mb-5">
			<form onSubmit={handleSubmit}>
				<div className="row d-flex align-items-center justify-content-center">
					<div className="col-md-6">
						<div className="card px-5 py-5 bg-dark text-light movie">
							<h1 className="text-light text-center display-5">Login</h1>
							<label className="form-label">
								<h4>Email</h4>
							</label>
							<div className="form-input input-group mb-3">
								<span className="input-group-text">
									<i className="fa fa-envelope fa-sm" />
								</span>
								<input
									required
									onChange={handleChange}
									name="email"
									type="text"
									className="form-control"
									placeholder="Email address"
								/>{" "}
							</div>
							<label className="form-label mt-3">
								<h4>Password</h4>
							</label>
							<div className="form-input input-group mb-3">
								<span className="input-group-text">
									<i className="fas fa-lock fa-md" />
								</span>
								<input
									required
									onChange={handleChange}
									name="password"
									type={hide ? "text" : "password"}
									className="form-control"
									placeholder="Password"
								/>{" "}
								<span className="input-group-text" onClick={() => setHide(!hide)}>
									<i className="far fa-eye" />
								</span>
							</div>
							<a
								href="/recoverpassword"
								className="text-warning col-md-4"
								style={{ textDecoration: "none" }}>
								Forgot your password?
							</a>
							<button style={{ fontSize: "20px" }} className="btn hoverButton btn-warning mt-4 fw-bold">
								Enter
							</button>
							<div className="text-center mt-4">
								{" "}
								<span>Not a member yet?</span>{" "}
								<a href="/signup" className="text-decoration-none text-warning">
									Register!
								</a>{" "}
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
