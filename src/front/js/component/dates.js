import React from "react";
import Hours from "./hours";
import PropTypes from "prop-types";
const Dates = props => {
	const { date, show } = props;
	return (
		<>
			<button
				className="border rounded border-warning btn btn-warning mx-2 py-2 col-md-2"
				onClick={e => {
					setDate(e.target.value);
				}}
				value={date}>
				{date}
			</button>
		</>
	);
};

export default Dates;

Dates.propTypes = {
	date: PropTypes.String,
	show: PropTypes.Boolean
};
