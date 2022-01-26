import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Map from "../component/map";
const Cinemas = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container text-center border rounded border-dark bg-dark movie my-2 p-3">
			<h1 className="text-dark bg-warning movie mx-3 border rounded border-dark title">Cinemas</h1>
			{store.cinemas.map(cinema => {
				return (
					<div key={cinema.id}>
						<div className="row p-3 m-3 movie">
							<div className="col-md-6">
								<img
									className="img-fluid my-2 poster border rounded border-dark"
									src={cinema.image}
									alt=""
								/>
							</div>
							<div className="col">
								<h2 className="bg-warning mt-2 border rounded border-dark movie text-dark">
									{cinema.location}
								</h2>
								<div className="text-start text-light">
									<h2 className="mt-4 mb-3 border rounded border-warning movie p-3">
										Address: {cinema.address}
									</h2>
								</div>
								<div className="col-md movie border rounded">
									<Map
										latitude={cinema.latitude}
										longitude={cinema.longitude}
										location={cinema.location}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			})}

			{/* <div>
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
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Cinemas;
