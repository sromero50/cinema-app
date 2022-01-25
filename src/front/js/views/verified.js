import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";
import { useNavigate } from "react-router-dom";
const Verified = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (params.token) {
			actions.verify(params.token);
			if (store.reload) {
				navigate("/login");
			}
		}
	}, []);

	return (
		<>
			{store.reload ? (
				<div className="container text-center movie bg-dark border-dark border rounded col-md-6 p-2 mt-5">
					<h1 className="text-light my-3">Account successfully verified</h1>
					<a className="my-3" href="/login" style={{ textDecoration: "none", color: "black" }}>
						<button style={{ fontSize: "20px" }} className="btn my-3 fw-bold btn-warning col-md-4 movie">
							Go to login
						</button>
					</a>
				</div>
			) : (
				<div className="text-warning m-auto mt-5 text-center">
					<div className="spinner-border" role="status" />
					<div className="spinner-border" role="status" />
					<div className="spinner-border" role="status" />
				</div>
			)}
		</>
	);
};

export default Verified;
