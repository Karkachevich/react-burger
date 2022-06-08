import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";
import Ingredient from "../Ingredient/ingredient";
import style from "./IngredientsList.module.css";
import { useSelector } from "react-redux";

const IngredientsList = ({ id, title, ingredients }) => {
  const basket = useSelector((state) => state.constructorIngredients.basket);

  const getCount = React.useCallback((ingredient) => {
    const { _id, type } = ingredient;
    const ingredientsCount = basket.filter((b) => b._id === _id).length;

    return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
  }, [basket]);

  return (
    <section id={id}>
      <h3  className="text text_type_main-medium mt-10">
        {title}
      </h3>
      <ul className={style.container}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            count={getCount(ingredient)}
          />
        ))}
      </ul>
    </section>
  );
};

 IngredientsList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
 
};

export default IngredientsList;
