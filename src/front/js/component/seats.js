import React from "react";
import PropTypes from "prop-types";

const Prueba = props => {
	return (
		<div>
			{props.values.map(seat => {
				return <div key={seat}>{seat}</div>;
			})}
		</div>
	);
};
export default Prueba;

Prueba.propTypes = {
	values: PropTypes.number,
	availableSeats: PropTypes.number,
	bookedSeats: PropTypes.number,
	addSeat: PropTypes.number
};
