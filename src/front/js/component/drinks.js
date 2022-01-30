import React from "react";
import cokePic from "../../img/coke.jpg";
import waterPic from "../../img/water.jpg";
import { useDispatch } from "react-redux";
import { addSnackToList, sumPrice } from "../redux/actions";
const Drinks = () => {
	const dispatch = useDispatch();
	return (
		<>
			<h2 className="bg-warning text-dark mt-5 border rounded border-warning">Drinks</h2>
			<div className="row m-auto">
				<div className="col-md-6 bg-dark my-2">
					<div className="border movie border-dark">
						<img src={cokePic} className="img-fluid" alt="coke" />
						<div className="bg-warning text-dark hoverButton p-2">
							<button style={{ width: "100%", background: "none", border: "none" }}>
								<h2
									className="card-title"
									id="Coke"
									onClick={e => {
										dispatch(addSnackToList(e.target.id, 1, 5));
										dispatch(sumPrice());
									}}>
									Coke
								</h2>
								<h2 className="card-title">$5</h2>
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-6 bg-dark my-2">
					<div className="border movie border-dark">
						<img src={waterPic} className="img-fluid" alt="water" />
						<div className="bg-warning text-dark hoverButton p-2">
							<button style={{ width: "100%", background: "none", border: "none" }}>
								<h2
									className="card-title"
									id="Water"
									onClick={e => {
										dispatch(addSnackToList(e.target.id, 1, 3));
										dispatch(sumPrice());
									}}>
									Water
								</h2>
								<h2 className="card-title">$3</h2>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Drinks;
