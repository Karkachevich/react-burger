import * as Actions from "./index";
import { setCookie } from "../../utils/cookie";
import { getTokens, setTokens } from "../auth";
import { request } from "../api";
import { AppDispatch, AppThunk } from "../../utils/types";
import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  requestPasswordResetCodeSuccess,
  requestPasswordResetCodeError,
  resetPasswordSuccess,
  resetPasswordError,
  patchUserInfoSuccess,
  patchUserInfoError,
  fetchUserInfoSuccess,
  fetchUserInfoError,
  logoutUserSuccess,
  logoutUserError,
} from "../../store/actions/auth";

export const loginUser: AppThunk =
  ({ email, password }: { email: string; password: string }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: Actions.LOGIN });

    request({
      url: "auth/login",
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((parsedResponse) => {
        if (parsedResponse.success) {
          const { user, accessToken, refreshToken } = parsedResponse;
          setTokens({ accessToken, refreshToken });

          dispatch(loginUserSuccess(user));
        } else {
          const errorMessage =
            parsedResponse.message === "email or password are incorrect"
              ? "e-mail или пароль указаны неверно"
              : parsedResponse.message;

          return Promise.reject(errorMessage);
        }
      })
      .catch((err) => dispatch(loginUserError(err.toLocaleString())));
  };

export const registerUser: AppThunk =
  ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: Actions.REGISTER_USER });

    request({
      url: "auth/register",
      method: "POST",
      body: JSON.stringify({ email, name, password }),
    })
      .then((parsedResponse) => {
        if (parsedResponse.success) {
          const { user, accessToken, refreshToken } = parsedResponse;
          setTokens({ accessToken, refreshToken });

          dispatch(registerUserSuccess(user));
        } else {
          const errorMessage =
            parsedResponse.message === "User already exists"
              ? "Пользователь с таким e-mail уже есть в системе"
              : parsedResponse.message;

          return Promise.reject(errorMessage);
        }
      })
      .catch((err) => dispatch(registerUserError(err.toLocaleString())));
  };

export const requestPasswordResetCode: AppThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch({ type: Actions.REQUEST_PASSWORD_RESET_CODE, payload: email });

    request({
      url: "password-reset",
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((parsedResponse) => {
        if (parsedResponse.success) {
          dispatch(requestPasswordResetCodeSuccess());
        } else {
          return Promise.reject(parsedResponse.message);
        }
      })
      .catch((err) => {
        dispatch(requestPasswordResetCodeError(err.toLocaleString()));
      });
  };

export const resetPassword: AppThunk =
  ({
    email,
    password,
    token,
  }: {
    email: string;
    password: string;
    token: string;
  }) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: Actions.PASSWORD_RESET });

    request({
      url: "password-reset/reset",
      method: "POST",
      body: JSON.stringify({ token, password }),
    })
      .then((parsedResponse) => {
        if (parsedResponse.success) {
          dispatch(resetPasswordSuccess());
          loginUser({ email, password });
        } else {
          return Promise.reject(parsedResponse.message);
        }
      })
      .catch((err) => {
        dispatch(resetPasswordError(err.toLocaleString()));
      });
  };

export const patchUser: AppThunk =
  ({
    name,
    email,
    password,
  }: {
    name?: string;
    email?: string;
    password?: string;
  }) =>
  (dispatch) => {
    dispatch({ type: Actions.PATCH_USER_INFO });
    request({
      url: "auth/user",
      method: "PATCH",
      body: JSON.stringify({ name, email, password }),
    })
      .then((parsedResponse) => {
        if (parsedResponse.success) {
          const { user } = parsedResponse;

          dispatch(patchUserInfoSuccess(user));
        } else {
          return Promise.reject(parsedResponse.message);
        }
      })
      .catch((err) => {
        dispatch(patchUserInfoError(err.toLocaleString()));
      });
  };

export const fetchUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: Actions.FETCH_USER_INFO });

  request({
    url: "auth/user",
    method: "GET",
  })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        const { user } = parsedResponse;

        dispatch(fetchUserInfoSuccess(user));
      } else {
        return Promise.reject(parsedResponse.message);
      }
    })
    .catch((err) => {
      dispatch(fetchUserInfoError(err.toLocaleString()));
    });
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: Actions.LOGOUT });
  dispatch({ type: Actions.RESET_AUTH });
  const { refreshToken } = getTokens();
  request({
    url: "auth/logout",
    method: "POST",
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((parsedResponse) => {
      if (parsedResponse.success) {
        dispatch(logoutUserSuccess());
      } else {
        return Promise.reject(parsedResponse.message);
      }
    })
    .catch((err) => {
      dispatch(logoutUserError(err.toLocaleString()));
    });
};
