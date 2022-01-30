import React from "react";
import popbig from "../../img/popbig.jpg";
import popsmall from "../../img/popsmall.jpg";
import { useDispatch } from "react-redux";
import { addSnackToList, sumPrice } from "../redux/actions";
const Popcorns = () => {
	const dispatch = useDispatch();
	return (
		<>
			<h2 className="bg-warning text-dark border rounded border-warning">Popcorn</h2>
			<div className="row m-auto">
				<div className="col-md-6 bg-dark my-2">
					<div className="border movie rounded border-dark">
						<img src={popbig} className="img-fluid" alt="big popcorn" />
						<div className="bg-warning text-dark hoverButton p-1">
							<button type="button" style={{ width: "100%", background: "none", border: "none" }}>
								<h2
									id="Big size Popcorn"
									onClick={e => {
										dispatch(addSnackToList(e.target.id, 1, 15));
										dispatch(sumPrice());
									}}>
									Big size
								</h2>
								<h2>$15</h2>
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-6 bg-dark my-2">
					<div className="border movie rounded border-dark">
						<img src={popsmall} className="img-fluid" alt="big popcorn" />
						<div className="bg-warning text-dark hoverButton p-1">
							<button style={{ width: "100%", background: "none", border: "none" }}>
								<h2
									className="card-title"
									id="Small Size Popcorn"
									onClick={e => {
										dispatch(addSnackToList(e.target.id, 1, 8));
										dispatch(sumPrice());
									}}>
									Small size
								</h2>
								<h2 className="card-title">$8</h2>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Popcorns;
