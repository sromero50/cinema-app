import React from "react";
import PropTypes from "prop-types";
const Hours = props => {
	const { hour, show } = props;
	return (
		<>
			{show && (
				<li className="list-group-item text-light bg-dark border border-dark col-md-3">
					<input
						className="inputReserva"
						id={hour}
						type="checkbox"
						name={hour}
						value={hour}
						// onClick={e =>
						// 	setForm(e.target.value)
						// }
					/>
					<label
						className="labelReserva bg-dark list-group-item text-light border rounded border-secondary mx-2"
						htmlFor={hour}>
						{hour}
					</label>
				</li>
			)}
		</>
	);
};

export default Hours;

Hours.propTypes = {
	hour: PropTypes.String
};
