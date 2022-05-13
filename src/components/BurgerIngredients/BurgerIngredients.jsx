import React from "react";
import style from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import IngredientsList from "../IngredientsList/IngredientsList";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";

const BurgerIngredients = ({ data, handleOpenModal }) => {
  return (
    <section className={style.container}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <Tabs />
      <div className={style.container__element}>
        <IngredientsList
          id="bun"
          title="Булки"
          ingredients={data.filter((i) => i.type === "bun")}
          handleOpenModal={handleOpenModal}
        />
        <IngredientsList
          id="sauce"
          title="Соусы"
          ingredients={data.filter((i) => i.type === "sauce")}
          handleOpenModal={handleOpenModal}
        />
        <IngredientsList
          id="main"
          title="Начинки"
          ingredients={data.filter((i) => i.type === "main")}
          handleOpenModal={handleOpenModal}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
