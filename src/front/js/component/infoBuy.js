import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
const InfoBuy = () => {
	const { store, actions } = useContext(Context);
	const [price, setPrice] = useState(localStorage.getItem("total"));
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
				<h2>Total: ${price} </h2>
			</div>
			<button className="btn btn-block btn-warning w-100 mt-3 fw-bold" type="submit">
				Confirm
			</button>
		</>
	);
};

export default InfoBuy;
