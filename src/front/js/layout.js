import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import "../styles/home.scss";
import { Home } from "./views/home";
import { SelectedMovie } from "./views/selectedMovie";
import injectContext from "./store/appContext";
import Login from "./views/login";
import SignUp from "./views/signup";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import SelectSeats from "./views/selectSeats";
import Snacks from "./views/snacks";
import Checkout from "./views/checkout";
import Cinemas from "./views/cinemas";
import Verified from "./views/verified";
import Confirmation from "./views/confirmation";
import NotFound from "./views/notFound";
import RecoverPassword from "./views/recoverPassword";
import ResetPassword from "./views/resetPassword";
import Profile from "./views/profile";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<Router basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/movie/:title" element={<SelectedMovie />} />
						<Route path="/selectseat/" element={<SelectSeats />} />
						<Route path="/snacks/" element={<Snacks />} />
						<Route path="/checkout/" element={<Checkout />} />
						<Route path="/confirmation/" element={<Confirmation />} />
						<Route path="/login/" element={<Login />} />
						<Route path="/verified/:token" element={<Verified />} />
						<Route path="/signup/" element={<SignUp />} />
						<Route path="/profile/" element={<Profile />} />
						<Route path="/recoverpassword/" element={<RecoverPassword />} />
						<Route path="/resetpassword/:token" element={<ResetPassword />} />
						<Route path="*" element={<NotFound />} />
						<Route path="/cinemas/" element={<Cinemas />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</Router>
		</div>
	);
};

export default injectContext(Layout);
