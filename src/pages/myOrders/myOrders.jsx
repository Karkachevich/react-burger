import React, { useEffect } from "react";

import { OrdersList } from "../../components/OrdersList/OrdersList";
import { useSelector, useDispatch } from "react-redux";
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
} from "../../store/constants/wsAuth";
import style from './myOrder.module.css'

export const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.wsAuth);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  return (
    <div className={style.container}>
      <OrdersList orders={orders} showOrderStatus />
    </div>
  );
};
