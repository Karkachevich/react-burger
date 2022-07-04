import React from "react";
import style from "./App.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import { Routes } from "../routes";
import { BrowserRouter as Router } from "react-router-dom";
import { getIngredients } from "../services/api";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Router>
      <div className={style.App}>
        <AppHeader />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
