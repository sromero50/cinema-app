import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [form, setForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
		surname: "",
		phone: "",
		birthDate: ""
	});
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
						<h1 className="text-light text-center display-5">Sign up</h1>
						<div className="row">
							<div className="col-md">
								<label className="form-label">
									<h4>Name</h4>
								</label>
								<div className="form-input mb-3">
									<input type="text" className="form-control" placeholder="Name" />
								</div>
							</div>
							<div className="col-md">
								<label className="form-label">
									<h4>Surname</h4>
								</label>
								<div className="form-input mb-3">
									<input type="text" className="form-control" placeholder="Surname" />
								</div>
							</div>
						</div>
						<label className="form-label">
							<h4>Email</h4>
						</label>
						<div className="form-input input-group mb-3">
							<span className="input-group-text">
								<i className="fa fa-envelope fa-sm" />
							</span>
							<input type="text" className="form-control" placeholder="Email address" />
						</div>
						<div className="row">
							<div className="col-md">
								<label className="form-label mt-3">
									<h4>Password</h4>
								</label>
								<div className="form-input input-group mb-3">
									<span className="input-group-text">
										<i className="fas fa-lock fa-md" />
									</span>
									<input type="text" className="form-control" placeholder="Password" />
								</div>
							</div>
							<div className="col-md">
								<label className="form-label mt-3">
									<h4>Confirm Password</h4>
								</label>
								<div className="form-input input-group mb-3">
									<span className="input-group-text">
										<i className="fas fa-lock fa-md" />
									</span>
									<input type="text" className="form-control" placeholder="Confirm Password" />
								</div>
							</div>
							<div className="row">
								<div className="col-md">
									<label className="form-label mt-3">
										<h4>Date of Birth</h4>
									</label>
									<div className="form-input mb-3">
										<input type="date" className="form-control" />
									</div>
								</div>
								<div className="col-md ms-4">
									<label className="form-label mt-3">
										<h4>Phone Number</h4>
									</label>
									<div className="form-input mb-3">
										<input type="number" className="form-control" placeholder="Phone Number" />
									</div>
								</div>
								<button className="btn btn-warning mt-4 ms-3" type="submit">
									Create account
								</button>
								<div className="text-center mt-4">
									<span>Already have an account? </span>
									<a href="/login" className="text-decoration-none text-warning">
										Login!
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
