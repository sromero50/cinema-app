const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			movies: [],
			snackList: [],
			total: localStorage.getItem("total")
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
			addSnack: snack => {
				const store = getStore();
				const snackList = store.snackList;
				if (snack == "Big size Popcorn") {
					let total = JSON.stringify(localStorage.getItem("total")) + "15";
					localStorage.setItem("total", total);
				}
				setStore({ snackList: [...snackList, { snack: snack, quantity: 1 }] });
			}
		}
	};
};

export default getState;
