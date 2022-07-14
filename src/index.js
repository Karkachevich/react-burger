import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./services/reducers";
import { BrowserRouter } from "react-router-dom";
import { WS_URL, WS_URL_AUTH } from "./utils/constants";
import { socketMiddleware } from "./services/socketMiddleware";
import { wsActions } from "./store/actions/wsAction";
import { wsActionsAuth } from "./store/actions/wsActionAuth";


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(WS_URL, wsActions, false)), 
  applyMiddleware(socketMiddleware(WS_URL_AUTH, wsActionsAuth, true))
);

const store = createStore(rootReducer, enhancer);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
