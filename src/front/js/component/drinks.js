import React from "react";
import cokePic from "../../img/coke.jpg";
import waterPic from "../../img/water.jpg";
const Drinks = () => {
	return (
		<>
			<h2 className="ms-auto bg-warning text-dark mt-5 border rounded border-warning">Drinks</h2>
			<div className="col-md-6 card bg-dark">
				<div className="card-body border movie rounded border-dark">
					<img
						src={cokePic}
						className="card-img-top img-fluid bg-light"
						alt="big popcorn"
						style={{ objectFit: "contain" }}
					/>
					<div className="bg-warning text-dark hoverSnack p-2">
						<h2 className="card-title" id="Coke" onClick={e => setCoke(e.target.id)}>
							Coke
						</h2>
						<h2 className="card-title">Price: $5</h2>
					</div>
				</div>
			</div>
			<div className="col-md-6 card bg-dark">
				<div className="card-body border movie rounded border-dark">
					<img
						src={waterPic}
						className="card-img-top img-fluid bg-light"
						alt="big popcorn"
						style={{ objectFit: "contain" }}
					/>
					<div className="bg-warning text-dark hoverSnack p-2">
						<h2 className="card-title" id="Water" onClick={e => setWater(e.target.id)}>
							Water
						</h2>
						<h2 className="card-title">Price: $3</h2>
					</div>
				</div>
			</div>
		</>
	);
};

export default Drinks;
