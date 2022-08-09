import React, {
 useCallback, useEffect, useMemo, useState,
  } from 'react';
  import { useParams } from 'react-router-dom';
  import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
  import { getDate, getOrderStatus } from '../../utils/helpers';
  import { useSelector, useDispatch } from "../../utils/hooks";
  import styles from './Order.module.css';
  import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../../store/constants/ws";
 import { IIngredient } from '../../utils/interface/ingredient.interface';

  export const Order = () => {
    const { orderId } = useParams<{ orderId?: string }>();
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const { orders } = useSelector((state) => state.ws);
  
    const [orderIngredients, setOrderIngredients] = useState<(IIngredient & { _count?: number })[]>([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE })
        }
    }, [dispatch]);
  
    const orderDetails = useMemo(
      () => orders.find((order) => order._id === orderId)
        || null,
      [orders, orderId],
    );
  
    useEffect(() => {
      if (orderDetails) {
        const { ingredients: orderIngredients } = orderDetails;
        const uniqIngredients = Array.from(new Set(orderIngredients));
  
        setOrderIngredients(
          uniqIngredients
            .map((orderIngredient) => {
              const ingredient = ingredients.find((ingredient) => ingredient._id === orderIngredient);
  
              return (ingredient === undefined)
                ? undefined
                : {
                  ...ingredient,
                  _count: (orderIngredients.filter((ingredientId) => ingredientId === ingredient._id).length),
                };
            })
            .filter((ingredient) => ingredient !== undefined) as IIngredient[],
        );
      }
    }, [ingredients, orderDetails]);
  
    const orderStatus = useMemo(() => {
      if (orderDetails) {
        const { status } = orderDetails;
        return getOrderStatus(status);
      }
  
      return { name: 'Не определен', fontClass: '' };
    }, [orderDetails]);
  
    const orderPrice = useCallback(
      () => (orderIngredients.length > 0 ? orderIngredients.map((ingredient) => ingredient.price)
        .reduce((acc, price) => acc + price) : 0),
      [orderIngredients],
    );
  
    return (
      <div className={styles.orderDetails}>
        {orderDetails && (
          <>
            <p className={`${ styles.header} text text_type_digits-default`}>
              {`#${orderDetails.number}`}
            </p>
            <p className="text text_type_main-medium mt-10">
              {orderDetails.name}
            </p>
            <p className={`${orderStatus.fontClass} text text_type_main-default mt-3`}>
              {orderStatus.name}
            </p>
            <p className="text text_type_main-medium mt-15">
              Состав:
            </p>
            <div className={`${styles.ingredients} mt-6`}>
              {orderIngredients.map((ingredient) => (
                <div className={styles.ingredient} key={ingredient._id}>
                  <div className={`${styles.ingredientPreview} mr-4`}>
                    <div
                      className={styles.ingredientPreviewImage}
                      style={{ backgroundImage: `url(${ingredient.image})` }}
                    />
                  </div>
                  <div className={`${styles.ingredientName} mr-4`}>
                    {ingredient.name}
                  </div>
                  <div className={styles.ingredientCountNPrice}>
                    <p className="text text_type_digits-default mr-2">{`${ingredient._count} x ${ingredient.price}`}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              ))}
            </div>
            <div className={`${styles.footer} mt-10`}>
              <div className={`${styles.orderStamp} text text_type_main-default text_color_inactive`}>{getDate(orderDetails.createdAt)}</div>
              <div className={styles.orderPrice}>
                <p className="text text_type_digits-default mr-2">
                  {orderPrice()}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };