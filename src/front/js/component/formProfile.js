import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions";
const FormProfile = () => {
	const userData = JSON.parse(localStorage.getItem("info"));

	const style = {
		fontSize: "20px"
	};

	const dispatch = useDispatch();

	const [form, setForm] = useState({
		name: userData.name,
		surname: userData.surname,
		email: userData.email,
		date_of_birth: userData.date_of_birth,
		phone: userData.phone
	});

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(updateProfile(form.name, form.surname, form.email, form.date_of_birth, form.phone));
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
						<label style={style} htmlFor={form.name} className="col-md-4 col-form-label">
							Name
						</label>
						<div className="col-md">
							<input
								name="name"
								onChange={handleChange}
								type="text"
								value={form.name}
								className="form-control"
								id="name"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.surname} className="col-md-4 col-form-label">
							Surname
						</label>
						<div className="col-md">
							<input
								name="surname"
								onChange={handleChange}
								type="text"
								value={form.surname}
								className="form-control"
								id="surname"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.email} className="col-md-4 col-form-label">
							Email
						</label>
						<div className="col-md-6">
							<input
								name="email"
								onChange={handleChange}
								type="text"
								value={form.email}
								className="form-control"
								id="email"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.date_of_birth} className="col-md-4 col-form-label">
							Date of Birth
						</label>
						<div className="col-md-6">
							<input
								name="date_of_birth"
								onChange={handleChange}
								type="date"
								value={form.date_of_birth}
								className="form-control"
								id="date_of_birth"
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8 m-auto ">
					<div className="mb-3 row p-2 mt-2">
						<label style={style} htmlFor={form.phone} className="col-md-4  col-form-label">
							Phone Number
						</label>
						<div className="col-md-6">
							<input
								name="phone"
								onChange={handleChange}
								type="number"
								value={form.phone}
								className="form-control border border-warning rounded"
								id="phone"
							/>
						</div>
					</div>
				</div>

				<div className="m-auto text-center">
					<button type="submit" className="my-4 movie col-md-8 p-3 buttonProfile btn btn-warning fw-bold">
						Modify information
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormProfile;
