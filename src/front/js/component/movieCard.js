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
								{filter === movies.released ? (
									<div className="col">
										<a href={"/movie/" + movies.name}>
											<div className="card border border-rounded border-dark movie">
												<img src={movies.poster} className="img-fluid" alt={movies.name} />
											</div>
										</a>
										<h4 className="text-center text-light mt-3">{movies.name} </h4>
									</div>
								) : null}
							</React.Fragment>
						);
					})}
				</>
			) : null}
			{filter === false ? (
				<>
					{store.movies.map(movies => {
						return (
							<React.Fragment key={movies.id}>
								{filter === movies.released ? (
									<div className="col">
										<a href={"/movie/" + movies.name}>
											<div className="card border border-rounded border-dark movie">
												<img src={movies.poster} className="img-fluid" alt={movies.name} />
											</div>
										</a>
										<h4 className="text-center text-light mt-3">{movies.name} </h4>
									</div>
								) : null}
							</React.Fragment>
						);
					})}
				</>
			) : null}
		</div>
	);
};

export default MovieCard;

MovieCard.propTypes = {
	filter: PropTypes.bool
};
