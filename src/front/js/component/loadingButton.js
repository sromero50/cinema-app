import React from "react";
import PropTypes from "prop-types";
const LoadingButton = props => {
	const { action, loading, style, text } = props;

	return (
		<button className={style} onClick={action} disabled={loading} type="submit">
			{loading && <div className="spinner-border mx-2" role="status" />}
			{text}
		</button>
	);
};

export default LoadingButton;
LoadingButton.propTypes = {
	action: PropTypes.string,
	loading: PropTypes.bool,
	style: PropTypes.string,
	text: PropTypes.string
};
