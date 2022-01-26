const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			movies: [],
			dates: [],
			schedules: [],
			cinemas: [],
			tickets: [],
			snackList: [],
			format: [],
			signup: false,
			reload: false,
			user: localStorage.getItem("user"),
			login: JSON.parse(localStorage.getItem("login")),
			info: [JSON.parse(localStorage.getItem("info"))],
			total: 0,
			error: ""
		},
		actions: {
			getMovies: async () => {
				const store = getStore();
				try {
					const response = await fetch("http://192.168.1.76:3001/api/movie");
					const responseBody = await response.json();

					setStore({ movies: responseBody });
				} catch (error) {
					console.log(error);
				}
			},
			getSchedules: async () => {
				const store = getStore();
				try {
					const response = await fetch("http://192.168.1.76:3001/api/schedule");
					const responseBody = await response.json();

					setStore({ schedules: responseBody });
					setStore({ dates: [...new Set(store.schedules.map(schedule => schedule.date))] });
					setStore({ format: [...new Set(store.schedules.map(format => format.type))] });
				} catch (error) {
					console.log(error);
				}
			},
			getCinemas: async () => {
				const store = getStore();
				try {
					const response = await fetch("http://192.168.1.76:3001/api/cinema");
					const responseBody = await response.json();

					setStore({ cinemas: responseBody });
				} catch (error) {
					console.log(error);
				}
			},
			getTickets: async () => {
				const store = getStore();
				try {
					const response = await fetch("http://192.168.1.76:3001/api/ticket");
					const responseBody = await response.json();

					setStore({ tickets: responseBody });
				} catch (error) {
					console.log(error);
				}
			},
			addSnackToList: (snack, quantity, price) => {
				const store = getStore();

				const exist = store.snackList.find(x => x.snack === snack);
				if (exist) {
					setStore({
						snackList: store.snackList.map(
							x => (x.snack === snack ? { ...exist, quantity: exist.quantity + 1 } : x)
						)
					});
				} else {
					setStore({ snackList: [...store.snackList, { snack: snack, quantity: quantity, price: price }] });
				}

				let itemPrice = store.snackList.reduce((a, c) => a + c.price * c.quantity, 0);

				setStore({ total: itemPrice });
			},
			addSnack: snack => {
				const store = getStore();
				const exist = store.snackList.find(x => x.snack === snack);
				if (exist) {
					setStore({
						snackList: store.snackList.map(
							x => (x.snack === snack ? { ...exist, quantity: exist.quantity + 1 } : x)
						)
					});
				}
				let itemPrice = store.snackList.reduce((a, c) => a + c.price * c.quantity, 0);

				setStore({ total: itemPrice });
			},
			deleteSnack: snack => {
				const store = getStore();
				const exist = store.snackList.find(x => x.snack === snack);
				if (exist.quantity < 2) {
					const index = store.snackList.findIndex(key => key.snack === snack);
					const newList = store.snackList.splice(index, 1);
				}
				if (exist) {
					setStore({
						snackList: store.snackList.map(
							x => (x.snack === snack ? { ...exist, quantity: exist.quantity - 1 } : x)
						)
					});
				}
				let itemPrice = store.snackList.reduce((a, c) => a + c.price * c.quantity, 0);

				setStore({ total: itemPrice });
			},
			signup: async (name, surname, email, password, date_of_birth, phone) => {
				const store = getStore();
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
					const response = await fetch("http://192.168.1.76:3001/api/user/signup", requestOptions);
					const responseBody = await response.json();
					if (responseBody) {
						setStore({ signup: true });
					}
				} catch (error) {
					console.log("error", error);

					setStore({ error: error });
				}
			},
			login: async (email, password) => {
				const store = getStore();
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

				const response = await fetch("http://192.168.1.76:3001/api/user/login", requestOptions);
				const responseBody = await response.json();

				if (responseBody.token) {
					localStorage.setItem("user", responseBody.token);
					localStorage.setItem("login", true);
					localStorage.setItem("info", JSON.stringify(responseBody));
					setStore({ info: [responseBody] });
					setStore({ user: true });
					setStore({ login: true });
				} else {
					console.log(responseBody.msg);
					setStore({ error: responseBody.msg });
				}
			},
			logout: () => {
				const store = getStore();
				setStore({ user: localStorage.removeItem("user") });
				setStore({ login: localStorage.removeItem("login") });
				setStore({ info: localStorage.removeItem("info") });
			},
			verify: async token => {
				const store = getStore();
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
					const response = await fetch("http://192.168.1.76:3001/api/verify", requestOptions);
					const responseBody = await response.json();

					if (responseBody.msg == "account verified") {
						setStore({ reload: true });
					}
				} catch (error) {
					console.log(error);
				}
			},
			purchaseTicket: async (id_movie, id_schedule, type, hour, date, cinema, id_user, seat, snack) => {
				const actions = getActions();
				const store = getStore();
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

				const response = await fetch("http://192.168.1.76:3001/api/ticket", requestOptions);
				const responseBody = await response.json();

				if (responseBody) {
					responseBody.map(item => {
						if (item.id_user === id_user) {
							snack.map(snack => {
								actions.purchaseSnacks(snack.snack, snack.quantity, id_user, item.id);
							});
						}
					});
					setStore({ reload: true });
				} else {
					console.log(responseBody);
					setStore({ error: responseBody });
				}
			},
			purchaseSnacks: async (snack, quantity, id_user, id_ticket) => {
				const store = getStore();
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

				const response = await fetch("http://192.168.1.76:3001/api/snack", requestOptions);
				const responseBody = await response.json();

				console.log(responseBody);
				// if (responseBody) {
				// 	setStore({ reload: true });
				// } else {
				// 	console.log(responseBody);
				// 	setStore({ error: responseBody });
				// }
			}
		}
	};
};

export default getState;
