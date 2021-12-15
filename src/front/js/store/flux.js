const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			movies: [],
			snackList: [],
			total: ""
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
			addSnack: (snack, quantity) => {
				const store = getStore();
				const snackList = store.snackList;

				const exist = store.snackList.find(x => x.snack === snack);
				if (exist) {
					setStore({
						snackList: store.snackList.map(
							x => (x.snack === snack ? { ...exist, quantity: exist.quantity + 1 } : x)
						)
					});
				} else {
					setStore({ snackList: [...store.snackList, { snack: snack, quantity: quantity }] });
				}
			}
		}
	};
};

export default getState;
