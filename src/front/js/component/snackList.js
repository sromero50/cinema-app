import React from "react";
import popbig from "../../img/popbig.jpg";
import popsmall from "../../img/popsmall.jpg";
import cokePic from "../../img/coke.jpg";
import waterPic from "../../img/water.jpg";
import SnackProduct from "./snack";
const SnackList = () => {
	return (
		<>
			<h2 className="bg-warning text-dark border rounded border-warning">Popcorn</h2>
			<div className="row m-auto">
				<SnackProduct
					image={popbig}
					alt={"big popcorn"}
					idSnack={"Big size Popcorn"}
					snack={"Big size"}
					price={15}
				/>
				<SnackProduct
					image={popsmall}
					alt={"small popcorn"}
					idSnack={"Small Size Popcorn"}
					snack={"Small size"}
					price={8}
				/>
			</div>
			<h2 className="bg-warning text-dark mt-5 border rounded border-warning">Drinks</h2>
			<div className="row m-auto">
				<SnackProduct image={cokePic} alt={"coke"} idSnack={"Coke"} snack={"Coke"} price={5} />
				<SnackProduct image={waterPic} alt={"water"} idSnack={"Water"} snack={"Water"} price={3} />
			</div>
		</>
	);
};

export default SnackList;
