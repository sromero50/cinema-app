import React, { useState } from "react";
import Prueba from "../component/seats";
import classes from "./BookMySeats.css";

const createSeats = (rows, startIndex) => {
	let i = 0;
	let j = startIndex;
	let k = "A";
	const section = [];
	while (i < 6 && j <= rows) {
		if (k > "F") {
			k = "A";
			j++;
		}
		if (j < rows + 1) {
			section.push(j + k);
			k = String.fromCharCode(k.charCodeAt(0) + 1);
		}
	}
	return section;
};
const Test = () => {
	const premiumSeats = createSeats(2, "1");
	const normalSeats = createSeats(10, "3");
	return (
		<React.Fragment>
			<Seats values={premiumSeats} />
			<Seats values={normalSeats} />
		</React.Fragment>
	);
};

export default Test;
