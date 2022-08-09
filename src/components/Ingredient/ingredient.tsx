import React, { FC } from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";
import { useDispatch } from "../../utils/hooks";
import * as Actions from "../../services/actions";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';
import { IIngredient } from "../../utils/interface/ingredient.interface";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./Ingredient.module.css";

export interface IBurgerIngredientProps {
  ingredient: IIngredient,
  count: number
}


const Ingredient: FC<IBurgerIngredientProps> = ({ ingredient, count }) => {
  const dispatch = useDispatch();
  const didMount = React.useRef(false);

  const history = useHistory();
  const location = useLocation();

  const openDetailedIngredientPage = React.useCallback((ingredientId: string) => {
  
    history.push({
      pathname: `/ingredients/${ingredientId}`,
      state: { ingredientModal: location },
    });
  }, [history, location]);

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
      onClick={() => openDetailedIngredientPage(ingredient._id)}
    >
      <img src={ingredient.image} alt={`картинка ${ingredient.name}`} />
      <p className={style.price}>
        <span className="text text_type_digits-default pr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary"/>
      </p>
      <p className={`${style.name} text text_type_main-small mt-2`}>
        {ingredient.name}
      </p>
      <Counter count={count} />
    </li>
  );
};


export default Ingredient;
