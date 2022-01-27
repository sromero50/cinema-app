import React from "react";
import FormProfile from "../component/formProfile";
const Profile = () => {
	return (
		<div className="container bg-dark my-4 movie p-3 m-auto border rounded border-dark ">
			<h1 className="text-dark bg-warning border text-center rounded border-dark p-2 display-5 movie">Profile</h1>{" "}
			<div className="text-light">
				<FormProfile />
			</div>
		</div>
	);
};

export default Profile;
