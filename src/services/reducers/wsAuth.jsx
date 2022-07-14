import { WS_CONNECTION_SUCCESS_AUTH, WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_ERROR_AUTH, WS_GET_MESSAGE_AUTH} from "../../store/constants/wsAuth";

const initialState = {
	wsConnected: false,
	error: null,
	orders: [],
	total: null,
	totalToday: null
};

export const wsReducerAuth = (state = initialState, action) => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS_AUTH:
			return {
				...state,
				wsConnected: true
			};

		case WS_CONNECTION_ERROR_AUTH:
			return {
				...state,
				error: action.payload,
				wsConnected: false
			};

		case WS_CONNECTION_CLOSED_AUTH:
			return {
				...state,
				wsConnected: false
			};

		case WS_GET_MESSAGE_AUTH:
			return {
				...state,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday
			};

		default:
			return state;
	}
};