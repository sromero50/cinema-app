const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			movies: [],
			snackList: [],
			total: 0
		},
		actions: {
			// Use getActions to call a function within a fuction

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			getMovies: async () => {
				const store = getStore();
				try {
					const response = await fetch("https://mcuapi.herokuapp.com/api/v1/movies");
					const responseBody = await response.json();
					console.log(responseBody);
					setStore({ movies: responseBody.data });
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
