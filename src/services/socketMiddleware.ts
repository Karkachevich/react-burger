import { getTokens } from "./auth";
import { TWSAction } from "../utils/types";
import { AnyAction, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsUrl: string, wsActions: TWSAction, auth: boolean) => (store: MiddlewareAPI) => {
	let socket: WebSocket | undefined;
	let connected = false;
	return (next: (i: AnyAction) => void) => (action: AnyAction) => {
		const { dispatch } = store;
		const { type, payload } = action;
		const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
        const { accessToken } = getTokens();
		const token = auth ? accessToken : null;
		if (type === wsInit) {
			socket = token
				? new WebSocket(`${wsUrl}?token=${token.split(" ")[1]}`)
				: new WebSocket(`${wsUrl}`);
		}
		if (socket) {
			connected = true;
			socket.onopen = event => {
				dispatch({ type: onOpen, payload: event });
			};

			socket.onerror = event => {
				dispatch({ type: onError, payload: event });
			};

			socket.onmessage = event => {
				const { data } = event;
				const parsedData = JSON.parse(data);
				const { success, ...restParsedData } = parsedData;
				dispatch({ type: onMessage, payload: restParsedData });
			};

			socket.onclose = event => {
				dispatch({ type: onClose, payload: event });
				console.log('socket closed with code: ', event.code);
				if (!connected) {
					setTimeout(() => { dispatch({ type: wsInit }) }, 1000)
				}
			};

			if (wsClose && type === wsClose && socket) {
				socket.close(1000, 'socket closed');
				connected = false;
			}


			if (wsSendMessage && type === wsSendMessage && socket) {
				const message = token ? { ...payload, token } : { ...payload };
				socket.send(JSON.stringify(message));
			}
		}

		next(action);
	};
};