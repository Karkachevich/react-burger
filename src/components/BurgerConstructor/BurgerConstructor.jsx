import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./BurgerConstructor.module.css";
import { IngredientsContext } from "../../services/appContext";
import { createOrder } from "../Api/Api";
import { urlDomain } from "../../utils/constants";
import {
  OrderNumberContext,
  TotalPriceContext,
} from "../../services/appContext";

const BurgerConstructor = ({ onOpenModal }) => {
  const [burgerBun, setBurgerBun] = React.useState("");
  const { totalPriceState, totalPriceDispatcher } =
    React.useContext(TotalPriceContext);
  const { ingredients } = React.useContext(IngredientsContext);
  const { setOrderNumber } = React.useContext(OrderNumberContext);

  const ingredientsConstructor = ingredients.filter((i) => i.type !== "bun");
  const ingredientIdConstructor = ingredients.map((i) => i._id);

  const handleOpenModal = () => {
    createOrder(urlDomain, ingredientIdConstructor)
      .then((res) => {
        onOpenModal({
          type: "order_details",
          orderNumber: `${res.order.number}`,
          header: "",
        });
        setOrderNumber(`${res.order.number}`);
      })
      .catch((err) => {
        console.log("Ошибка создания заказа", err.message);
      });
  };

  React.useEffect(() => {
    const bun = ingredients.find((i) => i.type === "bun");
    setBurgerBun(bun);

    if (ingredients) {
      let sumPrice = 0;
      ingredients.forEach((element) => {
        if (element.type !== "bun") sumPrice += element.price;
      });

      totalPriceDispatcher({
        type: "set",
        payload: bun.price * 2 + sumPrice,
      });
    } else {
      totalPriceDispatcher({
        type: "reset",
      });
    }
  }, [ingredients, totalPriceDispatcher]);

  return (
    <section className={`${style.container} mt-30`}>
      <div className={`${style.container__bun} mb-1 mr-6`}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${burgerBun.name} (верх)`}
          price={burgerBun.price}
          thumbnail={burgerBun.image}
        />
      </div>
      <div className={style.filling}>
        <ul className={`${style.filling__list} mr-4`}>
          {ingredientsConstructor.map((element) => (
            <li className={style.filling__element} key={element._id}>
              <DragIcon type="primary" />
              <div className={style.filling__info}>
                <ConstructorElement
                  isLocked={false}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${style.container__bun} mt-4 mr-6`}>
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={`${burgerBun.name} (низ)`}
          price={burgerBun.price}
          thumbnail={burgerBun.image}
        />
      </div>
      <div className={`${style.order__info} mt-10 mr-4`}>
        <div className={style.order__price}>
          <span className="text text_type_digits-medium mr-2">
            {totalPriceState.count}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
