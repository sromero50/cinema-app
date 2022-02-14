import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addSnackToList, sumPrice } from "../redux/actions";
const SnackProduct = ({ image, alt, idSnack, snack, price }) => {
	const dispatch = useDispatch();
	return (
		<div className="col-md-6 bg-dark my-2">
			<div className="border movie rounded border-dark">
				<img src={image} className="img-fluid" alt={alt} />
				<div className="bg-warning text-dark hoverButton p-1">
					<button type="button" style={{ width: "100%", background: "none", border: "none" }}>
						<h2
							id={idSnack}
							onClick={e => {
								dispatch(addSnackToList(e.target.id, 1, price));
								dispatch(sumPrice());
							}}>
							{snack}
						</h2>
						<h2>${price}</h2>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SnackProduct;

SnackProduct.propTypes = {
	image: PropTypes.string,
	alt: PropTypes.string,
	idSnack: PropTypes.string,
	snack: PropTypes.string,
	price: PropTypes.number
};
