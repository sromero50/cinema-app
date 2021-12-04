import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
const Login = () => {
	const { store, actions } = useContext(Context);
	const [form, setForm] = useState({ email: "", password: "" });
	const [hide, setHide] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		actions.loginUser(form.email, form.password);
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<div className="container mt-5 mb-5">
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
							<input type="text" className="form-control" placeholder="Email address" />{" "}
						</div>
						<label className="form-label mt-3">
							<h4>Password</h4>
						</label>
						<div className="form-input input-group mb-3">
							<span className="input-group-text">
								<i className="fas fa-lock fa-md" />
							</span>
							<input type={hide ? "text" : "password"} className="form-control" placeholder="Password" />{" "}
							<span className="input-group-text" onClick={() => setHide(!hide)}>
								<i className="far fa-eye" />
							</span>
						</div>
						<button className="btn btn-warning mt-4">Enter</button>
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
		</div>
	);
};

export default Login;
