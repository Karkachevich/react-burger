import React from "react";
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ data, onOpenModal }) => {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [burgerBun, setBurgerBun] = React.useState("");

  const handleOpenModal = () => {
    onOpenModal({
      type: "order_details",
      orderNumber: "034536",
      header: "",
    });
  };

  const ingredients = data.filter((i) => i.type !== "bun");

  React.useEffect(() => {
    const bun = data.find((i) => i.type === "bun");
    setBurgerBun(bun);

    let sumPrice = 0;
    ingredients.forEach((element) => {
      sumPrice += element.price;
    });

    setTotalPrice(sumPrice + bun.price * 2);
  }, [data, ingredients]);

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
          {ingredients.map((element) => (
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
            {totalPrice}
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
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
