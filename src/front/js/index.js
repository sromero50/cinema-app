//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { Footer } from "./component/footer";
import { Provider } from "react-redux";
import store from "./redux/store/index.";
//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(
	<Provider store={store}>
		<Layout />
		<Footer />
	</Provider>,
	document.querySelector("#app")
);
