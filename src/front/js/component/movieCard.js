import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Pagination from "./pagination";
import PropTypes from "prop-types";
const MovieCard = props => {
	const { store, actions } = useContext(Context);

	const { filter } = props;

	const [current, setCurrent] = useState(1);
	const [posts, setPosts] = useState(4);

	const indexOfLastPost = current * posts;
	const indexOfFirtPost = indexOfLastPost - posts;
	const currentPosts = store.movies.slice(indexOfFirtPost, indexOfLastPost);

	const paginate = number => setCurrent(number);

	return (
		<div>
			<div className="row row-cols-1 row-cols-md-4 g-4">
				{filter === true ? (
					<>
						{currentPosts.map(movies => {
							return (
								<React.Fragment key={movies.id}>
									<div className="col-md">
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
									<div className="col-md">
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
			{filter && <Pagination perPage={posts} total={store.movies.length} paginate={paginate} current={current} />}
		</div>
	);
};

export default MovieCard;

MovieCard.propTypes = {
	filter: PropTypes.bool
};
