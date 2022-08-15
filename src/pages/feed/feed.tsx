import React, { useMemo, useEffect } from "react";

import { OrdersList } from "../../components/OrdersList/OrdersList";
import { FEED_MAX_ORDERS } from "../../utils/constants";
import { useSelector, useDispatch } from "../../utils/hooks";
import styles from "./feed.module.css";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../../store/constants/ws";


export const FeedPage = () => {
  const { orders, total, totalToday } = useSelector((store) => store.ws)
 
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
          dispatch({ type: WS_CONNECTION_CLOSE })
      }
  }, [dispatch]);
  
  const foreignOrders = useMemo(
    () => orders.filter((order) => order) ,
    [orders]
  );
  
  const doneOrders = useMemo(
    () =>
      foreignOrders
        .filter((order) => order.status === "done")
        .slice(0, FEED_MAX_ORDERS)
        .map((order) => order.number),
    [foreignOrders]
  );
  const inProgressOrders = useMemo(
    () =>
      foreignOrders
        .filter((order) => order.status === "pending")
        .slice(0, FEED_MAX_ORDERS)
        .map((order) => order.number),
    [foreignOrders]
  );
  
  return (
    <div className={` ${styles.feedPage}`}>
      <p className="text text_type_main-large mt-10 ml-4">Лента заказов</p>
      <div className={`${styles.neighboringBlocks} mt-5`}>
        <div className={styles.feed}>
        {
          <OrdersList
            orders={foreignOrders}
            showOrderStatus={false}
          />
        }

        </div>
        
        <section className={`${styles.dashboard} ml-15`}>
          <div className={styles.neighboringBlocks}>
            <div className={styles.doneContainer}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <div className={`${styles.ordersList} ${styles.doneOrdersList}`}>
                {doneOrders.map((orderNumber) => (
                  <div
                    className={`${styles.listOrder} ${styles.doneOrder} text text_type_digits-default`}
                    key={orderNumber}
                  >
                    {orderNumber}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.inProgressContainer} ml-9`}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <div
                className={`${styles.ordersList} `}
              >
                {inProgressOrders.map((orderNumber) => (
                  <div
                    className={`${styles.listOrder} text text_type_digits-default`}
                    key={orderNumber}
                  >
                    {orderNumber}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={` mt-15`}>
            <p className="text text_type_main-medium">
              Выполнено за всё время:
            </p>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className={`mt-15`}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
