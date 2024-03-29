import React from "react";
import style from "./OrderDetails.module.css";
import done from "../../images/done.svg";


const OrderDetails = ({ orderNumber }: {orderNumber: number}) => {
  return (
    <div className={style.modal}>
      <div
        className={`${
          style.modal__title
        } mb-8 text2 text_type_digits-large `}
      >
        {orderNumber}
      </div>
      <div className="mb-15 text text_type_main-medium">
        идентификатор заказа
      </div>
      <img className="mb-15" src={done} alt="картинка 'сделано'" />
      <div className="mb-2 text text_type_main-default">
        Ваш заказ начали готовить
      </div>
      <div className="mb-20 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};


export default OrderDetails;
