import React, { useContext } from "react";
import cokePic from "../../img/coke.jpg";
import waterPic from "../../img/water.jpg";
import { Context } from "../store/appContext";
const Drinks = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<h2 className="ms-auto bg-warning text-dark mt-5 border rounded border-warning">Drinks</h2>
			<div className="col-md-6 card bg-dark">
				<div className="card-body border movie rounded border-dark">
					<img
						src={cokePic}
						className="card-img-top img-fluid bg-light"
						alt="coke"
						style={{ objectFit: "contain" }}
					/>
					<div className="bg-warning text-dark hoverSnack p-2">
						<button style={{ width: "100%", background: "none", border: "none" }}>
							<h2
								className="card-title"
								id="Coke"
								onClick={e => actions.addSnackToList(e.target.id, 1, 5)}>
								Coke
							</h2>
							<h2 className="card-title">$5</h2>
						</button>
					</div>
				</div>
			</div>
			<div className="col-md-6 card bg-dark">
				<div className="card-body border movie rounded border-dark">
					<img
						src={waterPic}
						className="card-img-top img-fluid bg-light"
						alt="water"
						style={{ objectFit: "contain" }}
					/>
					<div className="bg-warning text-dark hoverSnack p-2">
						<button style={{ width: "100%", background: "none", border: "none" }}>
							<h2
								className="card-title"
								id="Water"
								onClick={e => actions.addSnackToList(e.target.id, 1, 3)}>
								Water
							</h2>
							<h2 className="card-title">$3</h2>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Drinks;