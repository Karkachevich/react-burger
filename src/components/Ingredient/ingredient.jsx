import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./Ingredient.module.css";

const Ingredient = ({ data, onOpenModal }) => {
  const handleOpenModal = (ingredient) => {
    onOpenModal({
      type: "ingredient_details",
      ingredient,
      header: "Детали ингредиента",
    });
  };

  return (
    <li
      className={style.container}
      onClick={() => handleOpenModal(data)}
    >
      <img src={data.image} alt='картинка'/>
      <p className={style.price}>
        <span className="text text_type_digits-default pr-2">{data.price}</span>
        <CurrencyIcon />
      </p>
      <p
        className={`${
          style.name
        } text text_type_main-small mt-2`}
      >
        {data.name}
      </p>
      <Counter count={1} />
    </li>
  );
};


Ingredient.propTypes = {
  data: dataPropTypes.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default Ingredient;
