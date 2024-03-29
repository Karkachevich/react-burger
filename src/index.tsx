import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";

const container = document.getElementById("root") as Element;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();

