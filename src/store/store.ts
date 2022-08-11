import { WS_URL, WS_URL_AUTH } from "../utils/constants";
import { socketMiddleware } from "../services/socketMiddleware";

import { wsActions } from "./actions/wsAction";
import { wsActionsAuth } from "./actions/wsActionAuth";
import rootReducer from "../services/reducers";
import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(WS_URL, wsActions, false)),
  applyMiddleware(socketMiddleware(WS_URL_AUTH, wsActionsAuth, true))
);

export const store = createStore(rootReducer, enhancer);
