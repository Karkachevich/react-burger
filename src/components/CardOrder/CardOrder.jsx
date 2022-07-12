import React, { useCallback, useEffect, useMemo, useState,
  } from 'react';
  import { useHistory, useLocation } from 'react-router-dom';
  
  import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
 
  import { v4 as uuidv4 } from 'uuid';
    
  import { getDate, getOrderStatus } from '../../utils/helpers';
  import { useSelector } from "react-redux";
  
  import styles from './CardOrder.module.css';
 
  

  export const CardOrder = ({ orderDetails, maxIngredientsOnPreview = 5, showOrderStatus = false }) => {
    const history = useHistory();
    const location = useLocation();
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const [orderIngredients, setOrderIngredients] = useState([]);
  
    const orderPrice = useCallback(
      () => (orderIngredients.length > 0 ? orderIngredients?.map((ingredient) => ingredient.price)
        .reduce((acc, price) => acc + price) : 0),
      [orderIngredients],
    );
  
    const openOrderDetails = useCallback(() => {
      const { _id: id } = orderDetails;
  
      let state;
      if (showOrderStatus) {
        state = { profileFeedModal: location };
      } else {
        state = { feedModal: location };
      }
  
      history.push({
        pathname: `${location.pathname}/${id}`,
        state,
      });
    }, [history, location, orderDetails, showOrderStatus]);
  
    const orderStatus = useMemo(() => {
      const { status } = orderDetails;
      return getOrderStatus(status);
    }, [orderDetails]);
  
    useEffect(() => {
      const { ingredients: orderIngredients } = orderDetails;
  
      setOrderIngredients(
        orderIngredients
          .map((orderIngredient) => ingredients
            .find((ingredient) => ingredient._id === orderIngredient))
          .filter((ingredient) => ingredient !== undefined),
      );
    }, [ingredients, orderDetails]);
  
    return (
      <div
        className={styles.cardOrder}
        onClick={() => openOrderDetails()}
      >
        <div className={styles.header}>
          <p className="text text_type_digits-default">
            {`#${orderDetails.number}`}
          </p>
          <p className={`${styles.createDate}  text text_type_main-default text_color_inactive`}>
            {getDate(orderDetails.createdAt)}
          </p>
        </div>
        <p className="text text_type_main-medium mt-6">
          {orderDetails.name}
        </p>
        {showOrderStatus && (
        <p className={`${orderStatus.fontClass} text text_type_main-default mt-2`}>
          {orderStatus.name}
        </p>
        )}
        <div className={`${styles.footer} mt-6`}>
          <ul className={styles.ingredientsPreview}>
            {orderIngredients.slice(0, maxIngredientsOnPreview).map((ingredient, index) => {
              const isLast = index === maxIngredientsOnPreview - 1;
              return (
                <li className={`${styles.ingredientPreview} ${styles.ingredientPreviewLast}`} key={uuidv4()}>
                  <div
                    className={`${styles.ingredientPreviewImage} ${isLast ? styles.ingredientPreviewImageTranslucent : ''}`}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                  {isLast && orderIngredients.length > maxIngredientsOnPreview && (
                  <span className={`${styles.ingredientPreviewOverflow} text text_type_main-default`}>
                    {`+${orderIngredients.length - maxIngredientsOnPreview}`}
                  </span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={`${styles.orderPrice} ml-6`}>
            <p className="text text_type_digits-default mr-2">
              {orderPrice()}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  };
  
