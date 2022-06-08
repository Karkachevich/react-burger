import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";
import { useDispatch } from "react-redux";
import Actions from "../../services/actions";
import { useDrag } from "react-dnd";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./Ingredient.module.css";

const Ingredient = ({ ingredient, count }) => {
  const dispatch = useDispatch();
  const didMount = React.useRef(false);

  const handleOpenModal = (ingredient) => {
    dispatch({ type: Actions.SET_DETAILED_INGREDIENT, payload: ingredient });
  };

  const [{ isDrag }, ref] = useDrag({
    type: "ingredients",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    }),
  });

  
  React.useEffect(() => {
    if (didMount.current) {
      if (isDrag) {
        dispatch({ type: Actions.DRAG_INGREDIENT });
      } else {
        dispatch({ type: Actions.DROP_INGREDIENT });
      }
    } else {
      didMount.current = true;
    }
  }, [dispatch, isDrag]);

  const className = `${style.container} ${isDrag ? style.opacity : ''}`
 
  return (
    <li
      ref={ref}
      className={className}
      onClick={() => handleOpenModal(ingredient)}
    >
      <img src={ingredient.image} alt={`картинка ${ingredient.name}`} />
      <p className={style.price}>
        <span className="text text_type_digits-default pr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon />
      </p>
      <p className={`${style.name} text text_type_main-small mt-2`}>
        {ingredient.name}
      </p>
      <Counter count={count} />
    </li>
  );
};

Ingredient.propTypes = {
  ingredient: dataPropTypes.isRequired,
  count:  PropTypes.number.isRequired
};

export default Ingredient;
