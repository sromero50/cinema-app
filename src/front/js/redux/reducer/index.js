import store from "../store/index.";

const initialState = {
	message: null,
	movies: [],
	upcoming: [],
	dates: [],
	schedules: [],
	cinemas: [],
	tickets: [],
	snacks: [],
	snackList: [],
	users: [],
	format: [],
	purchaseConfirmed: false,
	userID: localStorage.getItem("id"),
	signup: false,
	reload: false,
	loadSchedule: false,
	loadProfile: false,
	loadCinema: false,
	verified: false,
	recoverPassword: false,
	resetPassword: false,
	reloadProfile: false,
	reloadPassword: false,
	deleteTicket: false,
	user: localStorage.getItem("user"),
	login: JSON.parse(localStorage.getItem("login")),
	info: [JSON.parse(localStorage.getItem("info"))],
	total: 0,
	error: ""
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_MOVIES":
			return {
				...state,
				movies: action.payload.movies,
				upcoming: action.payload.upcoming,
				reload: action.payload.reload
			};
		case "GET_USERS":
			return {
				...state,
				users: action.payload.users,
				loadProfile: action.payload.reload
			};
		case "GET_SCHEDULES":
			return {
				...state,
				schedules: action.payload.scheduleOrder,
				format: action.payload.format,
				loadSchedule: action.payload.reload
			};
		case "GET_CINEMAS":
			return {
				...state,
				cinemas: action.payload.cinemas,
				loadCinema: action.payload.reload
			};
		case "GET_TICKETS":
			return {
				...state,
				tickets: action.payload
			};
		case "GET_SNACKS":
			return {
				...state,
				snacks: action.payload
			};
		case "SIGNUP":
			return {
				...state,
				signup: action.payload
			};
		case "LOGIN":
			return {
				...state,
				userID: action.payload.userID,
				info: action.payload.info,
				user: action.payload.user,
				login: action.payload.login
			};
		case "VERIFY":
			return {
				...state,
				verified: action.payload
			};
		case "LOGOUT":
			return {
				...state,
				user: action.payload.user,
				login: action.payload.login,
				info: action.payload.info,
				userID: action.payload.userID
			};
		case "RECOVER_PASSWORD":
			return {
				...state,
				recoverPassword: action.payload
			};
		case "RESET_PASSWORD":
			return {
				...state,
				resetPassword: action.payload
			};
		case "UPDATE_PROFILE":
			return {
				...state,
				info: action.payload.info,
				reloadProfile: action.payload.reload
			};
		case "UPDATE_PASSWORD":
			return {
				...state,
				reloadPassword: action.payload
			};
		case "ADD_SNACK_TO_LIST":
			let snackList = state.snackList;

			const exist = snackList.find(x => x.snack === action.payload.snack);
			if (exist) {
				return {
					...state,
					snackList: snackList.map(
						x => (x.snack === action.payload.snack ? { ...exist, quantity: exist.quantity + 1 } : x)
					)
				};
			} else {
				return {
					...state,
					snackList: [
						...snackList,
						{ snack: action.payload.snack, quantity: action.payload.quantity, price: action.payload.price }
					]
				};
			}
		case "SUM_PRICE":
			let itemPrice = state.snackList.reduce((a, c) => a + c.price * c.quantity, 0);

			return {
				...state,
				total: itemPrice
			};
		case "DELETE_SNACK":
			const existV2 = state.snackList.find(x => x.snack === action.payload.snack);
			if (existV2.quantity < 2) {
				const index = state.snackList.findIndex(key => key.snack === action.payload.snack);
				const newList = state.snackList.splice(index, 1);
			}
			if (existV2) {
				return {
					...state,
					snackList: state.snackList.map(
						x => (x.snack === action.payload.snack ? { ...existV2, quantity: existV2.quantity - 1 } : x)
					)
				};
			}
		case "SUBSTRACT_PRICE":
			let itemPriceV2 = state.snackList.reduce((a, c) => a + c.price * c.quantity, 0);
			return {
				...state,
				total: itemPriceV2
			};
		case "PURCHASE_TICKET":
			return {
				...state,
				purchaseConfirmed: action.payload
			};
		case "PURCHASE_SNACKS":
			return console.log("success");
		case "DELETE_TICKET":
			return {
				...state,
				deleteTicket: action.payload
			};
		default:
			return state;
	}
}
