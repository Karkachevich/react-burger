import { urlDomain } from "../utils/constants";
import Actions from "./actions";
import { setTokens, auth } from "./auth";

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

const restoreSession = async ({ refreshToken }) => {
  const success = await fetch(`${urlDomain}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((res) => checkResponse(res))
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        const { accessToken, refreshToken } = parsedResponse;
        setTokens({ accessToken, refreshToken });

        return true;
      }

      return Promise.reject(parsedResponse.message);
    })
    .catch((err) => false);

  return success;
};

export const request = async ({
  url = "",
  method = "GET",
  body = {},
  headers = {},
}) => {
  const { accessToken, refreshToken } = auth();

  if (!accessToken && refreshToken) {
    await restoreSession({ refreshToken });
  }

  const result = await fetch(new URL(url, `${urlDomain}/`).href, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken || null,
      ...headers,
    },
    body: ["GET", "HEAD"].includes(method) && body ? null : body,
  }).then((res) => checkResponse(res));

  return result;
};
