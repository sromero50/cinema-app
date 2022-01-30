import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../redux/actions";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const Verified = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const verified = useSelector(state => state.verified);

	useEffect(() => {
		if (params.token) {
			dispatch(verify(params.token));
			if (verified) {
				navigate("/login");
			}
		}
	}, []);

	return (
		<>
			{verified ? (
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
