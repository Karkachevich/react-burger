import React from "react";
import style from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import IngredientsList from "../IngredientsList/IngredientsList";
import PropTypes from "prop-types";
import { IngredientsContext } from "../../services/appContext";

const BurgerIngredients = ({ handleOpenModal }) => {
  const { ingredients } = React.useContext(IngredientsContext);
  const [current, setCurrent] = React.useState("bun");
  
  const onClickTab = (evt) => {
    setCurrent(evt);
    document.getElementById(evt).scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <section className={style.container}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <Tabs current={current} onClickTab={onClickTab} />
      <div className={style.container__element}>
        <IngredientsList
          id="bun"
          title="Булки"
          ingredients={ingredients.filter((i) => i.type === "bun")}
          handleOpenModal={handleOpenModal}
        />
        <IngredientsList
          id="sauce"
          title="Соусы"
          ingredients={ingredients.filter((i) => i.type === "sauce")}
          handleOpenModal={handleOpenModal}
        />
        <IngredientsList
          id="main"
          title="Начинки"
          ingredients={ingredients.filter((i) => i.type === "main")}
          handleOpenModal={handleOpenModal}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
