import React from "react";
import PropTypes from "prop-types";
const Pagination = props => {
	const { perPage, total, paginate, current } = props;
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(total / perPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination justify-content-center pagination-lg">
				{pageNumbers.map(number => {
					return (
						<li key={number} className={number == current ? "page-item mx-1 active" : "page-item mx-1"}>
							<button onClick={() => paginate(number)} className="page-link text-light bg-dark">
								{number}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Pagination;

Pagination.propTypes = {
	perPage: PropTypes.number,
	total: PropTypes.number,
	paginate: PropTypes.func,
	current: PropTypes.string
};
