import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const SearchBar = ({ placeholder, data }) => {
	const [search, setSearch] = useState([]);

	const handleFilter = event => {
		const searchWord = event.target.value;
		const newList = data.filter(value => {
			return value.name.toLowerCase().includes(searchWord.toLowerCase());
		});
		setSearch(newList);
		if (searchWord.length === 0) {
			setSearch("");
		}
	};

	return (
		<div>
			<input
				type="search"
				className="form-control me-2 dropdown"
				placeholder={placeholder}
				onChange={handleFilter}
			/>
			{search.length != 0 && (
				<ul className="list-group dropdown-menu">
					{search.map((value, index) => {
						return (
							<li key={index} className="list-group-item search">
								<Link to={"/movie/" + value.name} style={{ textDecoration: "none", color: "black" }}>
									{" "}
									<p>{value.name}</p>{" "}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

SearchBar.propTypes = {
	placeholder: PropTypes.string,
	data: PropTypes.array
};

export default SearchBar;
