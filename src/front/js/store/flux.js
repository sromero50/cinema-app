const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			movies: []
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
			}
		}
	};
};

export default getState;
