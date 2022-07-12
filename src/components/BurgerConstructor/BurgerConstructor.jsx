import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerConstructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/api";
import IngredientConstructor from "../IngredientConstructor/ingredientConstructor";
import Actions from "../../services/actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { auth } from "../../services/auth";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken, refreshToken } = auth();
  const isWaitingForOrderNumber = useSelector((state) => state.order.loading);
  //const { user } = useSelector((state) => state.auth);
  const { basket } = useSelector((state) => state.constructorIngredients);
  const { ingredientDragged } = useSelector((state) => state.ingredients);
  const orderReadiness = useSelector(
    (state) =>
      state.constructorIngredients.basket.find(
        (ingredient) => ingredient.type === "bun"
      ) && state.constructorIngredients.basket.length > 1
  );

  const totalPrice = useSelector((state) =>
    state.constructorIngredients.basket.length > 0
      ? state.constructorIngredients.basket
          .map(
            (ingredient) =>
              ingredient.price * (ingredient.type === "bun" ? 2 : 1)
          )
          .reduce((acc, price) => acc + price, 0)
      : 0
  );

  const burgerBun = useSelector(
    (state) =>
      state.constructorIngredients.basket.find(
        (ingredient) => ingredient.type === "bun"
      )
  );

  const burgerStuffing = useSelector(
    (state) =>
      state.constructorIngredients.basket.filter(
        (ingredient) => ingredient.type !== "bun"
      )
  );

  const onDropIngredient = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: Actions.ADD_BUN_TO_CONSTRUCTOR,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    } else {
      dispatch({
        type: Actions.ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    }
  };

  const onClickConstructorElement = (evt, uid) => {
   evt && dispatch({
        type: Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        payload: uid,
      });
  };

  const [, ref] = useDrop({
    accept: "ingredients",
    drop: (ingredient) => onDropIngredient(ingredient),
  });

  const getOrder = async () => {
    if(!(accessToken || refreshToken)) {
      history.push('/login');
    }
    else if (!isWaitingForOrderNumber){
      dispatch(createOrder(basket.map((b) => b._id)));
    }
   
  };

  return (
    <section className={`${style.container} mt-30`} ref={ref}>
      <div className={`${style.container__bun} mb-1 mr-6`}>
        {burgerBun && (
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${burgerBun.name} (верх)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        )}

      </div>
      <div className={`${style.filling}  ${ingredientDragged ? style.hover : ''} `}>
        <ul className={`${style.filling__list} mr-4`}>
          {burgerStuffing.map((ingredient, index) => (
            <IngredientConstructor
              key={ingredient._uid}
              index={index}
              ingredient={ingredient}
              onClick={onClickConstructorElement}
            />
          ))}

          {!burgerStuffing.length && (
            <span className="text text_type_main-default mt-10 ml-20">
              место для булки, соуса и начинки
            </span>
          )}
        </ul>
      </div>
      <div className={`${style.container__bun} mt-4 mr-6`}>
        {burgerBun && (
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${burgerBun.name} (низ)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        )}
      </div>
      <div className={`${style.order__info} mt-10 mr-4`}>
        <div className={style.order__price}>
          <span className="text text_type_digits-medium mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={getOrder}
          disabled={!orderReadiness}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
