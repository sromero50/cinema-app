import React from "react";
import Carousel from "../component/carousel";
import MovieCard from "../component/movieCard";

export const Home = () => {
	return (
		<div className="container user-select-none">
			<Carousel />
			<div className="text-light mt-3 mb-2 d-flex align-items-baseline">
				<h1 className="me-auto">Movies</h1>
				<ul className="list-group list-group-horizontal">
					<li className="list-group">
						<h4 className="mx-2 text-secondary pe-auto filterMovies">Now playing</h4>
					</li>
					<li className="list-group">
						<h4 className="text-secondary pe-auto filterMovies">Coming soon</h4>
					</li>
				</ul>
			</div>
			<MovieCard />
		</div>
	);
};
