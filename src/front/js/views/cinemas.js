import React from "react";

const Cinemas = () => {
	return (
		<div className="container text-center border rounded border-dark bg-dark movie my-2 p-3">
			<h1 className="text-warning title">Cinemas</h1>
			<div>
				<div className="row p-3 m-3 movie">
					<div className="col-md-6">
						<img
							className="img-fluid my-2 poster border rounded border-dark"
							src="https://southbanklondon.com/sites/default/files/2019-05/bfi-imax-2012-dark-knight-rises-wrap-1000x750.jpg"
							alt=""
						/>
					</div>
					<div className="col text-warning">
						<h2>Cinema 1</h2>
						<div className="text-start">
							<h2 className="my-5">Address:</h2>
							<h2 className="my-5">Phone: </h2>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="row p-3 m-3 movie">
					<div className="col-md-6">
						<img
							className="img-fluid my-2 poster border rounded border-dark"
							src="https://static.emol.cl/emol50/Fotos/2017/07/21/file_20170721160151.jpg"
							alt=""
						/>
					</div>
					<div className="col text-warning">
						<h2>Cinema 2</h2>
						<div className="text-start">
							<h2 className="my-5">Address:</h2>
							<h2 className="my-5">Phone: </h2>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="row p-3 m-3 movie">
					<div className="col-md-6">
						<img
							className="img-fluid my-2 poster border rounded border-dark"
							src="https://elpaisanoonline.com/wp-content/uploads/2017/04/Universal-Cinema-at-CityWalk-Online.jpg"
							alt=""
						/>
					</div>
					<div className="col text-warning">
						<h2>Cinema 3</h2>
						<div className="text-start">
							<h2 className="my-5">Address:</h2>
							<h2 className="my-5">Phone: </h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cinemas;
