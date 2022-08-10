import React from "react";
import style from "./App.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import { Routes } from "../routes";
import { useDispatch } from "../utils/hooks";
import { getIngredients } from "../services/api";
import { BrowserRouter } from "react-router-dom";


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <div className={style.App}>
      <AppHeader />
      <Routes />
    </div>
    </BrowserRouter>
  );
}

export default App;
