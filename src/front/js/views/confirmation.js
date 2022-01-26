import React from "react";

const Confirmation = () => {
	return (
		<div className="mt-5 p-3 movie bg-dark border rounded border-dark m-auto text-center col-md-6">
			<h1 className="text-light">Thank you for your purchase</h1>
			<div>
				<i className="text-warning fas fa-check-square" />
			</div>
			<div className="movie border rounded border-dark my-3 p-3 text-light text-start">
				<h3 className="border rounded border-warning p-2">Movie: </h3>
				<h3 className="border rounded border-warning p-2">Date:</h3>
				<h3 className="border rounded border-warning p-2">Hour:</h3>
				<h3 className="border rounded border-warning p-2">Cinema:</h3>
				<h3 className="border rounded border-warning p-2">Format:</h3>
				<h3 className="border rounded border-warning p-2">Seats: </h3>
				<h3 className="border rounded border-warning p-2">Snacks:</h3>
			</div>
		</div>
	);
};

export default Confirmation;
