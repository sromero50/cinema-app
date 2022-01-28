import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";
const Map = props => {
	const { latitude, longitude, location } = props;

	const [marker, setMarker] = useState(null);
	const containerStyle = {
		maxWidth: "100%",
		height: "350px"
	};

	const center = {
		lat: latitude,
		lng: longitude
	};

	return (
		<LoadScript googleMapsApiKey={process.env.maps}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
				<Marker position={center} onClick={() => setMarker(location)} />
				{marker && (
					<InfoWindow
						onCloseClick={() => {
							setMarker(null);
						}}
						position={center}>
						<div>
							<h5 className="text-dark">{location}</h5>
						</div>
					</InfoWindow>
				)}
				<></>
			</GoogleMap>
		</LoadScript>
	);
};

export default Map;

Map.propTypes = {
	latitude: PropTypes.number,
	longitude: PropTypes.number,
	location: PropTypes.string
};
