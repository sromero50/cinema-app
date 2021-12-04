import React, { useState, useEffect } from "react";
import popbig from "../../img/popbig.jpg";
import popsmall from "../../img/popsmall.jpg";
import cokePic from "../../img/coke.jpg";
import waterPic from "../../img/water.jpg";
const Snacks = () => {
	const [price, setPrice] = useState(localStorage.getItem("total"));
	const [big, setBig] = useState("");
	const [small, setSmall] = useState("");
	const [coke, setCoke] = useState("");
	const [water, setWater] = useState("");

	// useEffect(
	// 	() => {
	// 		setPrice(price * quantity);
	// 	},
	// 	[quantity]
	// );

	return (
		<div className="container bg-dark border border-dark rounded movie mt-4">
			<div className="text-light text-center row">
				<div className="col row">
					<h2 className="ms-auto">Popcorn</h2>
					<div className="col-md-6 card bg-dark movie border border-dark rounded">
						<div className="card-body row border rounded border-dark">
							<img
								src={popbig}
								className="card-img-top img-fluid col bg-light"
								alt="big popcorn"
								style={{ width: "200px" }}
							/>
							<div className="col bg-warning text-dark border-dark border rounded hoverSnack">
								<h2 className="card-title" id="Big Size" onClick={e => setBig(e.target.id)}>
									Big size
								</h2>
								<h2 className="card-title">Price: $15</h2>
							</div>
						</div>
					</div>
					<div className="col-md-6 card bg-dark movie border border-dark rounded">
						<div className="card-body row border rounded border-dark">
							<img
								src={popsmall}
								className="card-img-top img-fluid col bg-light"
								alt="small popcorn"
								style={{ width: "200px" }}
							/>
							<div className="col bg-warning text-dark border-dark border rounded hoverSnack">
								<h2 className="card-title" id="Small Size" onClick={e => setSmall(e.target.id)}>
									Small size
								</h2>
								<h2 className="card-title">Price: $8</h2>
							</div>
						</div>
					</div>
					<h2 className="ms-auto mt-4">Drinks</h2>
					<div className="col-md-6 card bg-dark movie border border-dark rounded">
						<div className="card-body row border rounded border-dark">
							<img
								src={cokePic}
								className="card-img-top img-fluid col bg-light"
								alt="coke"
								style={{ width: "200px" }}
							/>
							<div className="col bg-warning text-dark border-dark border rounded hoverSnack">
								<h2 className="card-title" id="Coke" onClick={e => setCoke(e.target.id)}>
									Coke
								</h2>
								<h2 className="card-title">Price: $5</h2>
							</div>
						</div>
					</div>
					<div className="col-md-6 card bg-dark movie border border-dark rounded">
						<div className="card-body row border rounded border-dark">
							<img
								src={waterPic}
								className="card-img-top img-fluid col bg-light"
								alt="water bottle"
								style={{ width: "200px" }}
							/>
							<div className="col bg-warning text-dark border-dark border rounded hoverSnack">
								<h2 className="card-title" id="Water" onClick={e => setWater(e.target.id)}>
									Water
								</h2>
								<h2 className="card-title">Price: $3</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="col text-light text-start p-4 my-4">
					<div className="border border-dark rounded movie p-3">
						<h2>Movie: </h2>
						<h2>Time: </h2>
						<h2>Cinema: </h2>
						<h2>{big} </h2>
						<h2>{small} </h2>
						<h2>{coke} </h2>
						<h2>{water} </h2>
						<h2>Total: ${price} </h2>
					</div>
					<button className="btn btn-block btn-warning w-100 mt-3 fw-bold" type="submit">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default Snacks;
