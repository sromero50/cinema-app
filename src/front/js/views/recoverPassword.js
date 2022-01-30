import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../redux/actions";
import NotFound from "./notFound";
const RecoverPassword = () => {
	const dispatch = useDispatch();

	const emailSent = useSelector(state => state.recoverPassword);
	const login = useSelector(state => state.login);

	const [form, setForm] = useState({ email: "" });

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(recoverPassword(form.email));
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<>
			{login && <NotFound />}
			{emailSent && <Navigate to="/login/" />}
			{!emailSent && (
				<div className="text-center p-5 container">
					<div className="container col-md-6 bg-dark m-auto mt-3 p-3 border border-dark movie rounded">
						<div className="">
							<div className="text-center text-light">
								<h3 className="my-3">
									<i className="fa fa-lock text-warning fa-4x" />
								</h3>
								<h2 className="text-center my-3">Forgot your password?</h2>
								<h5 className="my-3">Enter your email and you will receive the instructions</h5>
								<div className="my-3">
									<form id="register-form" className="form" onSubmit={handleSubmit}>
										<div className="form-group">
											<div className="input-group">
												<span className="input-group-text">
													<i className="fas fa-envelope" />
												</span>
												<input
													required
													onChange={handleChange}
													value={form.email}
													id="email"
													name="email"
													placeholder="Email"
													className="form-control"
													type="email"
												/>
											</div>
										</div>
										<div className="form-group my-3">
											<button type="submit" className="btn col-md-6 btn-warning movie mt-3">
												Reset password
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default RecoverPassword;
