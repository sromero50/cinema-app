import React from "react";
import PropTypes from "prop-types";
const InputForm = props => {
	const { label, icon, type, placeholder, name, id } = props;
	return (
		<>
			<label className="form-label text-start mt-4">
				<h4>{label}</h4>
			</label>
			<div className="form-input input-group mb-3">
				<span className="input-group-text">
					<i className={icon} />
				</span>
				<input type={type} required className="form-control" placeholder={placeholder} name={name} id={id} />
			</div>
		</>
	);
};

export default InputForm;

InputForm.propTypes = {
	label: PropTypes.string,
	icon: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string
};
