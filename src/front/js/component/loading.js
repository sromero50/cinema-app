import React from "react";
import PropTypes from "prop-types";
const Loading = props => {
	const { active } = props;
	return (
		<>
			{active ? (
				<>{props.children}</>
			) : (
				<div className="d-flex justify-content-center m-auto">
					<div className="spinner-grow text-warning mt-3 mx-2" role="status" />
					<div className="spinner-grow text-warning mt-3 mx-2" role="status" />
					<div className="spinner-grow text-warning mt-3 mx-2" role="status" />
				</div>
			)}
		</>
	);
};

export default Loading;

Loading.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.element
};
