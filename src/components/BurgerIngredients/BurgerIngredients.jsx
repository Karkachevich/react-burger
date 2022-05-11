import React from "react";
import style from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import IngredientsList from "../IngredientsList/IngredientsList";



const BurgerIngredients = ({data}) => {
  
  return (
    <div className={style.container}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <Tabs />
      <section className={style.card__container}>
        <IngredientsList
          id="bun"
          title="Булки"
          ingredients={data.filter((i) => i.type === "bun")}
          
        />
        <IngredientsList
          id="sauce"
          title="Соусы"
          ingredients={data.filter((i) => i.type === "sauce")}
        />
        <IngredientsList
          id="main"
          title="Начинки"
          ingredients={data.filter((i) => i.type === "main")}
        />
      </section>
    </div>
  );
};

export default BurgerIngredients;
