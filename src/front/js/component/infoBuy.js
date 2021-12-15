import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
const InfoBuy = props => {
	const { store, actions } = useContext(Context);
	const [total, setTotal] = useState(props.total);

	useEffect(
		() => {
			store.snackList.map(item => {
				let big = "";
				let small = "";
				let coke = "";
				let water = "";

				if (item.snack === "Big size Popcorn") {
					big = item.quantity * 15;
					return setTotal(total + big);
				}
			});
		},
		[total]
	);

	return (
		<>
			<div className="border border-dark rounded movie p-3">
				<h2>Movie: </h2>
				<h2>Time: </h2>
				<h2>Cinema: </h2>
				{store.snackList.map(product => {
					return (
						<h2 key={product.id}>
							{product.snack}: {product.quantity}
						</h2>
					);
				})}
				<h2>Total: ${props.total} </h2>
			</div>
			<button className="btn btn-block btn-warning w-100 mt-3 fw-bold" type="submit">
				Confirm
			</button>
		</>
	);
};

export default InfoBuy;
