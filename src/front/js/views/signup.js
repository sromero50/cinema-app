import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
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

	const handleSubmit = event => {
		event.preventDefault();
		if (form.password === form.confirmPassword) {
			actions.signup(form.name, form.surname, form.email, form.password, form.date_of_birth, form.phone);
		} else {
			alert("password doesn't match");
		}
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<form onSubmit={handleSubmit}>
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
										<input
											onChange={handleChange}
											name="name"
											type="text"
											className="form-control"
											placeholder="Name"
										/>
									</div>
								</div>
								<div className="col-md">
									<label className="form-label">
										<h4>Surname</h4>
									</label>
									<div className="form-input mb-3">
										<input
											onChange={handleChange}
											name="surname"
											type="text"
											className="form-control"
											placeholder="Surname"
										/>
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
								<input
									onChange={handleChange}
									name="email"
									type="text"
									className="form-control"
									placeholder="Email address"
								/>
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
										<input
											type="text"
											onChange={handleChange}
											name="password"
											className="form-control"
											placeholder="Password"
										/>
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
										<input
											type="text"
											onChange={handleChange}
											name="confirmPassword"
											className="form-control"
											placeholder="Confirm Password"
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-md">
										<label className="form-label mt-3">
											<h4>Date of Birth</h4>
										</label>
										<div className="form-input mb-3">
											<input
												type="date"
												onChange={handleChange}
												name="date_of_birth"
												className="form-control"
											/>
										</div>
									</div>
									<div className="col-md ms-4">
										<label className="form-label mt-3">
											<h4>Phone Number</h4>
										</label>
										<div className="form-input mb-3">
											<input
												type="number"
												onChange={handleChange}
												name="phone"
												className="form-control"
												placeholder="Phone Number"
											/>
										</div>
									</div>
									<button className="btn hoverButton fw-bold btn-warning mt-4 ms-3" type="submit">
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
		</form>
	);
};

export default SignUp;
