import React, { useState } from "react";
import NotFound from "./notFound";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/actions";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";

const ResetPassword = () => {
	const params = useParams();

	const dispatch = useDispatch();

	const reseted = useSelector(state => state.resetPassword);
	const login = useSelector(state => state.login);

	const [hide, setHide] = useState(false);
	const [form, setForm] = useState({ new_password: "" });

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(resetPassword(params.token, form.new_password));
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<>
			{" "}
			{login && <NotFound />}
			{!reseted && (
				<div className="container col-md-6 bg-dark m-auto mt-3 p-5 border border-dark movie rounded">
					<div className="text-center mt-2">
						<h2 className="mb-5 bg-warning p-2 border rounded movie border-dark text-dark">
							Enter your new password
						</h2>
						<div className="mt-3">
							<form onSubmit={handleSubmit}>
								<div className="input-group my-2">
									<span className="input-group-text">
										<i className="fas fa-lock" />
									</span>
									<input
										value={form.nueva_contraseña}
										onChange={handleChange}
										className="form-control"
										type={hide == false ? "password" : "text"}
										name="new_password"
										placeholder="Password"
										required
									/>
									<span className="input-group-text" onClick={() => setHide(!hide)}>
										<i className="far fa-eye" />
									</span>
								</div>
								<button type="submit" className="btn mt-5 col-md-6 btn-warning movie">
									Change password
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
			{reseted && <Navigate to="/login" />}
		</>
	);
};

export default ResetPassword;
