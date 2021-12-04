import React, { useContext } from "react";
import { Context } from "../store/appContext";

const MovieCard = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{store.movies.map(movies => {
				return (
					<div key={movies.id} className="col">
						<a href={"/movie/" + movies.title}>
							<div className="card border border-rounded border-dark movie">
								<img src={movies.cover_url} className="img-fluid" alt="..." />
							</div>
						</a>
						<h4 className="text-center text-light">{movies.title} </h4>
					</div>
				);
			})}
		</div>
	);
};

export default MovieCard;
