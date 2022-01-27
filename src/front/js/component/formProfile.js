import React from "react";

const FormProfile = () => {
	return (
		<form>
			<div className="row">
				<div className="col-md-6">
					<div className="mb-3 row p-2 mt-2">
						<label htmlFor="inputPassword" className="col-md-2 col-form-label">
							Password
						</label>
						<div className="col-md-6">
							<input type="password" className="form-control" id="inputPassword" />
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default FormProfile;
