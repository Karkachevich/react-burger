import React, { useEffect, useState } from "react";

import { CardOrder } from "../CardOrder/CardOrder";


import styles from "./OrderList.module.css";

export const OrdersList = ({ orders, showOrderStatus }) => {
  const [loadingText, setLoadingText] = useState("");
 

  useEffect(() => {
    let interval;
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
