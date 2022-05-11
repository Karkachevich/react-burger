import React from "react";
import style from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = () => {
  const [current, setCurrent] = React.useState("bun");

  return (
   
    <div className={style.Tabs}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>   
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
       Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
