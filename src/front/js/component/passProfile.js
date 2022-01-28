import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const PassProfile = () => {
	const { store, actions } = useContext(Context);

	const style = {
		fontSize: "20px"
	};

	const [form, setForm] = useState({
		old_password: "",
		new_password: "",
		confirm_password: ""
	});

	useEffect(
		() => {
			setForm({
				old_password: "",
				new_password: "",
				confirm_password: ""
			});
		},
		[store.reload]
	);

	const handleSubmit = event => {
		event.preventDefault();
		if (form.new_password === form.confirm_password) {
			actions.updatePassword(form.old_password, form.new_password);
		} else {
			alert("password does not match");
		}
	};

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<div className="col-md m-auto border rounded border-dark movie my-1">
			<form onSubmit={handleSubmit}>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.old_password} className="col-md-4 col-form-label">
							Old password
						</label>
						<div className="col-md">
							<input
								name="old_password"
								onChange={handleChange}
								type="password"
								value={form.old_password}
								className="form-control"
								id="old_password"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.new_password} className="col-md-4 col-form-label">
							New password
						</label>
						<div className="col-md">
							<input
								name="new_password"
								onChange={handleChange}
								type="password"
								value={form.new_password}
								className="form-control"
								id="new_password"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.confirm_password} className="col-md-4 col-form-label">
							Confirm password
						</label>
						<div className="col-md-6">
							<input
								name="confirm_password"
								onChange={handleChange}
								type="password"
								value={form.confirm_password}
								className="form-control"
								id="confirm_password"
							/>
						</div>
					</div>
				</div>
				<div className="m-auto text-center">
					<button type="submit" className="my-4 movie col-md-8 p-3 hoverButton btn btn-warning fw-bold">
						Change password
					</button>
				</div>
			</form>
		</div>
	);
};

export default PassProfile;
