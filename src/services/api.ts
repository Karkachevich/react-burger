import { urlDomain } from "../utils/constants";
import * as Actions from "./actions";
import { setTokens, auth } from "./auth";
import {
  ICommonResponse,
  ITokenResponse,
} from "../utils/interface/api.interface";

import { AppDispatch, AppThunk } from "../utils/types";
import {
  getIngredientsSuccess,
  getIngredientsError,
} from "../store/actions/ingredients";
import { postOrderSuccess, postOrderError } from "../store/actions/order";

const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: Actions.GET_INGREDIENTS,
  });

  fetch(`${urlDomain}/ingredients`)
    .then((res) => checkResponse(res))
    .then((res) => {
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getIngredientsError(err.toLocaleString()));
    });
};

export const createOrder: AppThunk =
  (ingredients: string[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: Actions.POST_ORDER,
    });

    request({
      url: "orders",
      method: "POST",
      body: JSON.stringify({ ingredients }),
    })
      .then((parsedResponse) => {
        if (parsedResponse) {
          const { order } = parsedResponse;
          const { number, name } = order;

          dispatch(postOrderSuccess({ orderNumber: number, burgerName: name }));
          return;
        }

        return Promise.reject(new Error("Unknown response"));
      })
      .catch((err) => dispatch(postOrderError(err.toLocaleString())));
  };

const restoreSession = async ({ refreshToken }: { refreshToken: string }) => {
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
    .catch(() => false);

  return success;
};

export const request = async ({
  url = "",
  method = "GET",
  body = "",
  headers = [],
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
      Authorization: accessToken,
      ...headers,
    },
    body: ["GET", "HEAD"].includes(method) && body ? null : body,
  }).then((res) => checkResponse(res));

  return result;
};
