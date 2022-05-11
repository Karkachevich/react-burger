import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./Ingredient.module.css";

const Ingredient = ({data}) => {
  return (
    <ul className={style.ingredient__container}>
      <img src={data.image} />
      <p className={style.ingredient__price}>
        <span className="text text_type_digits-default pr-2">{data.price}</span>
        <CurrencyIcon />
      </p>
      <p
        className={`${
          style.ingredient__name
        } ${"text text_type_main-small mt-2"}`}
      >
        {data.name}
      </p>
      <Counter count={1} />
    </ul>
  );
};

export default Ingredient;
