import Swal from "sweetalert2";
import store from "../store/index.";
let reload = true;
const userID = JSON.parse(localStorage.getItem("id"));

export function getMovies() {
	return async dispatch => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/movie");
			const responseBody = await response.json();
			let movies = [];
			let upcoming = [];
			responseBody.filter(item => {
				if (item.released === true) {
					return (movies = [...movies, item]);
				} else if (item.released === false) {
					return (upcoming = [...upcoming, item]);
				}
			});

			dispatch({ type: "GET_MOVIES", payload: { movies, upcoming, reload } });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUsers() {
	return async dispatch => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/user");
			const responseBody = await response.json();
			let users = responseBody;
			dispatch({ type: "GET_USERS", payload: { users, reload } });
		} catch (error) {
			console.log(error);
		}
	};
}

export function getSchedules() {
	return async dispatch => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/schedule");
			const responseBody = await response.json();

			const scheduleOrder = responseBody.sort((a, b) => parseFloat(a.hour) - parseFloat(b.hour));
			const format = [...new Set(scheduleOrder.map(format => format.type))];
			dispatch({ type: "GET_SCHEDULES", payload: { scheduleOrder, format, reload } });
		} catch (error) {
			console.log(error);
		}
	};
}
export function getCinemas() {
	return async dispatch => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/cinema");
			const responseBody = await response.json();
			let cinemas = responseBody;
			dispatch({ type: "GET_CINEMAS", payload: { cinemas, reload } });
		} catch (error) {
			console.log(error);
		}
	};
}
export function getTickets() {
	return async dispatch => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/ticket");
			const responseBody = await response.json();

			dispatch({ type: "GET_TICKETS", payload: responseBody });
		} catch (error) {
			console.log(error);
		}
	};
}
export function getSnacks() {
	return async dispatch => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/snack");
			const responseBody = await response.json();

			dispatch({ type: "GET_SNACKS", payload: responseBody });
		} catch (error) {
			console.log(error);
		}
	};
}
export function signup(name, surname, email, password, date_of_birth, phone) {
	return async dispatch => {
		try {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				name: name,
				surname: surname,
				email: email,
				password: password,
				date_of_birth: date_of_birth,
				phone: phone,
				is_active: false
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			const response = await fetch(process.env.BACKEND_URL + "/api/user/signup", requestOptions);
			const responseBody = await response.json();
			if (responseBody.msg === "account created") {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Account created, check your email to verify ",
					showConfirmButton: true
				});
				dispatch({ type: "SIGNUP", payload: true });
			} else if (responseBody.msg === "email alredy exists") {
				Swal.fire({
					icon: "error",
					title: "Email already in use ",
					text: "Try a different one"
				});
			}
		} catch (error) {
			console.log("error", error);
		}
	};
}
export function login(email, password) {
	return async dispatch => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			email: email,
			password: password
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(process.env.BACKEND_URL + "/api/user/login", requestOptions);
		const responseBody = await response.json();

		if (responseBody.token) {
			localStorage.setItem("user", responseBody.token);
			localStorage.setItem("login", true);
			localStorage.setItem("info", JSON.stringify(responseBody));
			localStorage.setItem("id", JSON.stringify(responseBody.user_id));
			let userID = responseBody.user_id;
			let info = [responseBody];
			let user = true;
			let login = true;

			dispatch({ type: "LOGIN", payload: { userID, info, user, login } });
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: responseBody.msg
			});
		}
	};
}
export function verify(token) {
	return async dispatch => {
		try {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				token: token
			});

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			const response = await fetch(process.env.BACKEND_URL + "/api/verify", requestOptions);
			const responseBody = await response.json();

			if (responseBody.msg == "account verified") {
				dispatch({ type: "VERIFY", payload: true });
			}
		} catch (error) {
			console.log(error);
		}
	};
}
export function logout() {
	return async dispatch => {
		let user = localStorage.removeItem("user");
		let login = localStorage.removeItem("login");
		let info = localStorage.removeItem("info");
		let userID = localStorage.removeItem("id");
		dispatch({ type: "LOGOUT", payload: { user, login, info, userID } });
	};
}
export function recoverPassword(email) {
	return async dispatch => {
		try {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				email: email
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			const response = await fetch(process.env.BACKEND_URL + "/api/recover", requestOptions);
			const responseBody = await response.json();

			if (responseBody.msg == "email sent") {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Email sent",
					showConfirmButton: false,
					timer: 1500
				});
				dispatch({ type: "RECOVER_PASSWORD", payload: reload });
			}
		} catch (error) {
			console.log(error);
		}
	};
}
export function resetPassword(token, new_password) {
	return async dispatch => {
		try {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				token: token,
				new_password: new_password
			});

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			const response = await fetch(process.env.BACKEND_URL + "/api/resetpassword", requestOptions);
			const responseBody = await response.json();

			if (responseBody.msg == "password changed") {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Password changed",
					showConfirmButton: false,
					timer: 2000
				});
				dispatch({ type: "RESET_PASSWORD", payload: reload });
			} else if (responseBody.msg == "wrong email") {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Wrong email"
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
}
export function updateProfile(name, surname, email, date_of_birth, phone) {
	return async dispatch => {
		try {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
			var raw = JSON.stringify({
				name: name,
				surname: surname,
				date_of_birth: date_of_birth,
				phone: phone,
				email: email
			});

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			const response = await fetch(process.env.BACKEND_URL + "/api/user/" + userID, requestOptions);
			const responseBody = await response.json();

			if (responseBody) {
				console.log(responseBody);
				localStorage.setItem("info", JSON.stringify(responseBody));
				let info = [responseBody];
				dispatch({ type: "UPDATE_PROFILE", payload: { info, reload } });
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Profile modified",
					showConfirmButton: false,
					timer: 1500
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
}
export function updatePassword(old_password, new_password) {
	return async dispatch => {
		try {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
			var raw = JSON.stringify({
				old_password: old_password,
				new_password: new_password
			});

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			const response = await fetch(process.env.BACKEND_URL + "/api/password/" + userID, requestOptions);
			const responseBody = await response.json();
			console.log(responseBody);
			if (responseBody.msg === "password modified") {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Password modified",
					showConfirmButton: false,
					timer: 1500
				});
				dispatch({ type: "UPDATE_PASSWORD", payload: reload });
				dispatch({ type: "UPDATE_PASSWORD", payload: false });
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Wrong pasword"
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
}
export function addSnackToList(snack, quantity, price) {
	return async dispatch => {
		dispatch({ type: "ADD_SNACK_TO_LIST", payload: { snack, quantity, price } });
	};
}
export function sumPrice() {
	return async dispatch => {
		dispatch({ type: "SUM_PRICE", payload: true });
	};
}
export function deleteSnack(snack) {
	return async dispatch => {
		dispatch({ type: "DELETE_SNACK", payload: { snack } });
		substractPrice(snack);
	};
}
export function substractPrice() {
	return async dispatch => {
		dispatch({ type: "SUBSTRACT_PRICE", payload: true });
	};
}

export function purchaseSnacks(snack, quantity, id_user, id_ticket) {
	return async dispatch => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			snack: snack,
			quantity: quantity,
			id_user: id_user,
			id_ticket: id_ticket
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(process.env.BACKEND_URL + "/api/snack", requestOptions);
		const responseBody = await response.json();
		dispatch({ type: "PURCHASE_SNACKS", payload: true });
	};
}

export function purchaseTicket(id_movie, id_schedule, type, hour, date, cinema, id_user, seat, snack) {
	return async dispatch => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
		myHeaders.append("Content-Type", "application/json");

		var code = Math.floor(Math.random() * 90000) + 10000;

		var raw = JSON.stringify({
			id_movie: id_movie,
			id_schedule: id_schedule,
			type: type,
			hour: hour,
			date: date,
			cinema: cinema,
			id_user: id_user,
			code: code,
			seat: seat
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		const response = await fetch(process.env.BACKEND_URL + "/api/ticket", requestOptions);
		const responseBody = await response.json();
		console.log(responseBody);
		if (response.status === 200) {
			responseBody.map(item => {
				console.log(item.id, item.id_user, id_user);
				if (item.id_user === id_user) {
					snack.map(snack => {
						dispatch(purchaseSnacks(snack.snack, snack.quantity, id_user, item.id));
					});
				}
			});
			dispatch({ type: "PURCHASE_TICKET", payload: true });
		} else if (responseBody.msg == "Token has expired") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Relog your account, token has expired"
			});
		}
	};
}
export function deletePurchase(id_ticket) {
	return dispatch => {
		Swal.fire({
			title: "Do you want delete this purchase?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancel",
			confirmButtonText: "Confirm"
		}).then(async result => {
			if (result.isConfirmed) {
				var myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));
				myHeaders.append("Content-Type", "application/json");

				var requestOptions = {
					method: "DELETE",
					headers: myHeaders,
					redirect: "follow"
				};

				const response = await fetch(process.env.BACKEND_URL + "/api/ticket/" + id_ticket, requestOptions);
				const responseBody = await response.json();
				console.log(responseBody);
				if (response.status === 200) {
					dispatch({ type: "DELETE_TICKET", payload: true });
				}
			}
		});
	};
}
