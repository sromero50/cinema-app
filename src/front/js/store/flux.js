const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			movies: [],
			dates: [],
			schedules: [],
			cinemas: [],
			snackList: [],
			total: 0
		},
		actions: {
			getMovies: async () => {
				const store = getStore();
				try {
					// const response = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
					const response = await fetch("http://192.168.1.76:3001/api/movie");
					const responseBody = await response.json();
					console.log(responseBody);
					setStore({ movies: responseBody });
				} catch (error) {
					console.log(error);
				}
			},
			getSchedules: async () => {
				const store = getStore();
				try {
					// const response = await fetch("https://mcuapi.herokuapp.com/api/v1/Scheduless");
					const response = await fetch("http://192.168.1.76:3001/api/schedule");
					const responseBody = await response.json();
					console.log(responseBody);
					setStore({ schedules: responseBody });
					setStore({ dates: [...new Set(store.schedules.map(schedule => schedule.date))] });
				} catch (error) {
					console.log(error);
				}
			},
			getCinemas: async () => {
				const store = getStore();
				try {
					// const response = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
					const response = await fetch("http://192.168.1.76:3001/api/cinema");
					const responseBody = await response.json();
					console.log(responseBody);
					setStore({ cinemas: responseBody });
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
			}
		}
	};
};

export default getState;
