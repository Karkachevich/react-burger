import React, { useRef } from "react";
import style from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import IngredientsList from "../IngredientsList/IngredientsList";

import { useSelector } from "../../utils/hooks";
type TTabs = "bun" | "sauce" | "main";

const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.ingredients);
  const [current, setCurrent] = React.useState("bun");


  const onClickTab = (value: string) => {
    setCurrent(value);
    const element = document.getElementById(value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const onScroll = () => {
    const containerRecTop: any = document.getElementById("container");
    const saueceRecTop: any = document.getElementById("sauce");
    const bunRecTop: any = document.getElementById("bun");

    if (
      bunRecTop.getBoundingClientRect().top +
        containerRecTop.getBoundingClientRect().top >
      containerRecTop.getBoundingClientRect().top
    ) {
      setCurrent("bun");
    } else if (
      saueceRecTop.getBoundingClientRect().top +
        containerRecTop.getBoundingClientRect().top >
      0
    ) {
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
