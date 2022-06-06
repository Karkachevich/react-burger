import React from "react";
import style from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import IngredientsList from "../IngredientsList/IngredientsList";

import { useSelector } from "react-redux";


const BurgerIngredients = () => {
  
  const { ingredients } = useSelector((state) => state.ingredients);
  const [current, setCurrent] = React.useState("bun");

  const onClickTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  
  const onScroll = () => {
    const containerRecTop = document.getElementById("container").getBoundingClientRect().top;
    const saueceRecTop = document.getElementById("sauce").getBoundingClientRect().top;
    const bunRecTop = document.getElementById("bun").getBoundingClientRect().top;
 
    if (bunRecTop + containerRecTop > containerRecTop) {
      setCurrent("bun");
    } else if (saueceRecTop + containerRecTop > 0) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

  return (
    <section className={style.container}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <Tabs current={current} onClickTab={onClickTab} />
      <div
        id="container"
        className={style.container__element}
        onScroll={onScroll}
      >
        <IngredientsList
          id="bun"
          title="Булки"
          ingredients={ingredients.filter((i) => i.type === "bun")}
          
        />
        <IngredientsList
          id="sauce"
          title="Соусы"
          ingredients={ingredients.filter((i) => i.type === "sauce")}
         
        />
        <IngredientsList
          id="main"
          title="Начинки"
          ingredients={ingredients.filter((i) => i.type === "main")}
         
        />
      </div>
    </section>
  );
};



export default BurgerIngredients;
