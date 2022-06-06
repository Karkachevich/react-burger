import { urlDomain } from "../utils/constants";

import Actions from "./actions";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: Actions.GET_INGREDIENTS,
  });

  fetch(`${urlDomain}/ingredients`)
    .then((res) => checkResponse(res))
    .then((res) => {
      dispatch({
        type: Actions.GET_INGREDIENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Actions.GET_INGREDIENTS_ERROR,
        payload: err.toLocaleString(),
      });
    });
};

export const createOrder = (ingredients) => (dispatch) => {
  dispatch({
    type: Actions.POST_ORDER,
  });

  fetch(`${urlDomain}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      dispatch({
        type: Actions.POST_ORDER_SUCCESS,
        payload: {
          orderNumber: res.order.number,
          burgerName: res.order.name,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: Actions.POST_ORDER_ERROR,
        payload: err.toLocaleString(),
      });
    });
};
