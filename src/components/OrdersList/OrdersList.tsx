import React, { FC, useEffect, useState } from "react";

import { CardOrder } from "../CardOrder/CardOrder";

import { IOrderDetails } from "../../utils/interface/order.interface";
import styles from "./OrderList.module.css";

export interface IOrdersListProps {
  orders: IOrderDetails[];
  showOrderStatus?: boolean;
}

export const OrdersList: FC<IOrdersListProps> = ({ orders, showOrderStatus }) => {
  const [loadingText, setLoadingText] = useState("");
 

  useEffect(() => {
    let interval: any;
    let point = 0;
    if (orders.length < 1) {
      interval = setInterval(() => {
        setLoadingText(`Проверка заказов${".".repeat(point)}`);
        point = point === 3 ? 0 : ++point;
      }, 350);
    }

    return () => clearInterval(interval);
  }, [setLoadingText, orders]);

  return (
    <div className={styles.feed}>
      {orders &&
        orders.map((order) => (
          <CardOrder
            orderDetails={order}
            key={order._id}
            showOrderStatus={showOrderStatus}
          />
        ))}
      {orders.length < 1 && (
        <div className={`${styles.waiting} text text_type_main-medium`}>
          {loadingText}
        </div>
      )}
    </div>
  );
};
