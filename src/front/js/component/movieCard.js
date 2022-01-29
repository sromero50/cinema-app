import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
const MovieCard = props => {
	const { store, actions } = useContext(Context);

	const { filter } = props;

	return (
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{filter === true ? (
				<>
					{store.movies.map(movies => {
						return (
							<React.Fragment key={movies.id}>
								<div className="col">
									<a href={"/movie/" + movies.name}>
										<div className="movie">
											<img
												src={movies.poster}
												className="img-fluid border rounded border-dark"
												alt={movies.name}
											/>
										</div>
									</a>
									<h4 className="text-center text-light mt-3">{movies.name} </h4>
								</div>
							</React.Fragment>
						);
					})}
				</>
			) : (
				<>
					{store.upcoming.map(movies => {
						return (
							<React.Fragment key={movies.id}>
								<div className="col">
									<div className="card border border-rounded border-dark movie">
										<img src={movies.poster} className="img-fluid" alt={movies.name} />
									</div>

									<h4 className="text-center text-light mt-3">{movies.name} </h4>
									<h6 className="text-center text-light mt-2">{movies.release_date} </h6>
								</div>
							</React.Fragment>
						);
					})}
				</>
			)}
		</div>
	);
};

export default MovieCard;

MovieCard.propTypes = {
	filter: PropTypes.bool
};
