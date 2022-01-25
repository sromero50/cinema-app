import React, { useContext } from "react";
import popbig from "../../img/popbig.jpg";
import popsmall from "../../img/popsmall.jpg";
import { Context } from "../store/appContext";
const Popcorns = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<h2 className="bg-warning text-dark mt-5 border rounded border-warning">Popcorn</h2>
			<div className="row m-auto">
				<div className="col-md-6 bg-dark my-2">
					<div className="border movie rounded border-dark">
						<img src={popbig} className="img-fluid" alt="big popcorn" />
						<div className="bg-warning text-dark hoverSnack p-1">
							<button type="button" style={{ width: "100%", background: "none", border: "none" }}>
								<h2 id="Big size Popcorn" onClick={e => actions.addSnackToList(e.target.id, 1, 15)}>
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
						<div className="bg-warning text-dark hoverSnack p-1">
							<button style={{ width: "100%", background: "none", border: "none" }}>
								<h2
									className="card-title"
									id="Small Size Popcorn"
									onClick={e => actions.addSnackToList(e.target.id, 1, 8)}>
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
