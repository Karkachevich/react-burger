import React from "react";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ data }) => {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [topBun, setTopBun] = React.useState("");
  const [bottomBun, setBottomBun] = React.useState("");

  React.useEffect(() => {
    setTotalPrice(
      data
        .map((el) => data.find((i) => i._id === el._id).price)
        .reduce((acc, price) => acc + price)
    );

    let bun;
    const buns = data.filter((i) => i.type === "bun");
    buns.some((element) => {
      if (data.find((i) => i._id === element._id)) {
        bun = element;
        return true;
      }

      return false;
    });

    setTopBun(bun);
    setBottomBun(bun);
  }, [data]);

  const ingredient = data.filter((i) => i.type !== "bun");

  return (
    <>
      <div className={`${styles.basketListContainer} ${"mt-30 ml-10"}`}>
        <div className={`${styles.bulletEdge} ${"mb-4 mr-6"}`}>
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${topBun.name} (верх)`}
            price={topBun.price}
            thumbnail={topBun.image}
          />
        </div>
        <div className={styles.basketListBar}>
          <div className={`${styles.basketList} ${"ml-2"}`}>
            {ingredient.map((element) => (
              <div className={`${styles.basketListElem}`} key={element._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={`${element.name}`}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.bulletEdge}  ${"mt-4 mr-6"}`}>
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${bottomBun.name} (низ)`}
            price={bottomBun.price}
            thumbnail={bottomBun.image}
          />
        </div>
        <div className={`${styles.orderInfo} ${"mt-10 mr-4"}`}>
          <div className={styles.orderInfoPrice}>
            <span className="text text_type_digits-medium mr-2">
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
