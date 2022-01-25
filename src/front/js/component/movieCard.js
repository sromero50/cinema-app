import React, { useContext } from "react";
import { Context } from "../store/appContext";

const MovieCard = () => {
	const { store, actions } = useContext(Context);
	console.log(store.movies);
	return (
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{store.movies.map(movies => {
				return (
					<div key={movies.id} className="col">
						<a href={"/movie/" + movies.name}>
							<div className="card border border-rounded border-dark movie">
								<img src={movies.poster} className="img-fluid" alt={movies.name} />
							</div>
						</a>
						<h4 className="text-center text-light">{movies.name} </h4>
					</div>
				);
			})}
		</div>
	);
};

export default MovieCard;
