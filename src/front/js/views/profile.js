import React, { useState, useContext } from "react";
import FormProfile from "../component/formProfile";
import PassProfile from "../component/passProfile";
import PurchaseOrders from "../component/purchaseOrders";
import NotFound from "./notFound";
import { Context } from "../store/appContext";
const Profile = () => {
	const { store, actions } = useContext(Context);
	const [change, setChange] = useState("profile");

	return (
		<>
			{store.login && (
				<div className="container bg-dark my-4 movie p-3 m-auto border rounded border-dark ">
					<h1 className="text-dark bg-warning border text-center rounded border-dark p-2 display-5 movie">
						Profile
					</h1>{" "}
					<div className="text-light row mx-1">
						{change == "profile" ? <FormProfile /> : null}
						{change == "password" ? <PassProfile /> : null}
						{change == "orders" ? <PurchaseOrders /> : null}
						<div className="col-md-3 m-auto text-center border rounded border-dark movie  my-1">
							<div className="mt-5">
								<button
									value={
										change === "orders"
											? "profile"
											: change === "password"
												? "profile"
												: change === "profile"
													? "orders"
													: "profile"
									}
									onClick={e => setChange(e.target.value)}
									className="my-4 movie col-md-12 p-3 hoverButton btn btn-warning fw-bold">
									{change === "orders"
										? "Profile"
										: change === "password"
											? "Profile"
											: change === "profile"
												? "Purchase Orders"
												: "Profile"}
								</button>
							</div>
							<div>
								<button
									value={
										change === "profile"
											? "password"
											: change === "orders"
												? "password"
												: change === "password"
													? "orders"
													: "password"
									}
									onClick={e => setChange(e.target.value)}
									className="my-4 movie col-md-12 p-3 hoverButton btn btn-warning fw-bold">
									{change === "profile"
										? "Change Password"
										: change === "orders"
											? "Change Password"
											: change === "password"
												? "Purchase Orders"
												: "Change Password"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{!store.login && <NotFound />}
		</>
	);
};

export default Profile;
