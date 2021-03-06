import React, { useState } from "react";

import Carousel from "../component/carousel";
import Loading from "../component/loading";
import MovieCard from "../component/movieCard";
import { useSelector } from "react-redux";

export const Home = () => {
	const [released, setReleased] = useState(true);
	const reload = useSelector(state => state.reload);

	return (
		<div className="container user-select-none">
			<Carousel />
			<div className="text-light mt-3 mb-2 d-flex align-items-baseline">
				<h1 className="me-auto ">Movies</h1>
				<ul className="list-group list-group-horizontal">
					<li className="list-group">
						<button
							style={{ border: "none", background: "none" }}
							value={released}
							onClick={e => setReleased(true)}>
							<h4
								className={
									released
										? "mx-2 text-light pe-auto filterMovies"
										: "mx-2 text-secondary pe-auto filterMovies"
								}>
								Now playing
							</h4>
						</button>
					</li>
					<li className="list-group">
						<button
							style={{ border: "none", background: "none" }}
							value={released}
							onClick={e => setReleased(false)}>
							<h4
								className={
									!released
										? "text-light pe-auto filterMovies"
										: "text-secondary pe-auto filterMovies"
								}>
								Coming soon
							</h4>
						</button>
					</li>
				</ul>
			</div>
			<div className="mb-4">
				{" "}
				<Loading active={reload}>
					<MovieCard filter={released} />
				</Loading>
			</div>
		</div>
	);
};
