import * as Actions from "../../services/actions";
import { IUser } from "../../utils/interface/user.interface";

export interface IResetAuth {
  readonly type: typeof Actions.RESET_AUTH;
}
export interface IRegisterUser {
  readonly type: typeof Actions.REGISTER_USER;
}
export interface IRegisterUserSuccess {
  readonly type: typeof Actions.REGISTER_USER_SUCCESS;
  readonly payload: IUser;
}
export interface IRegisterUserError {
  readonly type: typeof Actions.REGISTER_USER_ERROR;
  readonly payload: string;
}
export interface ILogoutUser {
  readonly type: typeof Actions.LOGOUT;
}
export interface ILogoutUserSuccess {
  readonly type: typeof Actions.LOGOUT_SUCCESS;
}
export interface ILogoutUserError {
  readonly type: typeof Actions.LOGOUT_ERROR;
  readonly payload: string;
}
export interface ILoginUser {
  readonly type: typeof Actions.LOGIN;
}
export interface ILoginUserSuccess {
  readonly type: typeof Actions.LOGIN_SUCCESS;
  readonly payload: IUser;
}
export interface ILoginUserError {
  readonly type: typeof Actions.LOGIN_ERROR;
  readonly payload: string;
}
export interface IPatchUserInfo {
  readonly type: typeof Actions.PATCH_USER_INFO;
}
export interface IPatchUserInfoSuccess {
  readonly type: typeof Actions.PATCH_USER_INFO_SUCCESS;
  readonly payload: IUser;
}
export interface IPatchUserInfoError {
  readonly type: typeof Actions.PATCH_USER_INFO_ERROR;
  readonly payload: string;
}
export interface IFetchUserInfo {
  readonly type: typeof Actions.FETCH_USER_INFO;
}
export interface IFetchUserInfoSuccess {
  readonly type: typeof Actions.FETCH_USER_INFO_SUCCESS;
  readonly payload: IUser;
}
export interface IFetchUserInfoError {
  readonly type: typeof Actions.FETCH_USER_INFO_ERROR;
  readonly payload: string;
}
export interface IResetPassword {
  readonly type: typeof Actions.PASSWORD_RESET;
}
export interface IResetPasswordSuccess {
  readonly type: typeof Actions.PASSWORD_RESET_SUCCESS;
}
export interface IResetPasswordError {
  readonly type: typeof Actions.PASSWORD_RESET_ERROR;
  readonly payload: string;
}
export interface IRequestPasswordResetCode {
  readonly type: typeof Actions.REQUEST_PASSWORD_RESET_CODE;
  readonly payload: string;
}
export interface IRequestPasswordResetCodeSuccess {
  readonly type: typeof Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS;
}
export interface IRequestPasswordResetCodeError {
  readonly type: typeof Actions.REQUEST_PASSWORD_RESET_CODE_ERROR;
  readonly payload: string;
}

export type TAuthActionTypes =
  | IResetAuth
  | IRegisterUser
  | IRegisterUserSuccess
  | IRegisterUserError
  | ILogoutUser
  | ILogoutUserSuccess
  | ILogoutUserError
  | ILoginUser
  | ILoginUserSuccess
  | ILoginUserError
  | IPatchUserInfo
  | IPatchUserInfoSuccess
  | IPatchUserInfoError
  | IFetchUserInfo
  | IFetchUserInfoSuccess
  | IFetchUserInfoError
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordError
  | IRequestPasswordResetCode
  | IRequestPasswordResetCodeSuccess
  | IRequestPasswordResetCodeError;

export const registerUserSuccess = (user: IUser): IRegisterUserSuccess => ({
  type: Actions.REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = (error: string): IRegisterUserError => ({
  type: Actions.REGISTER_USER_ERROR,
  payload: error,
});

export const logoutUserSuccess = (): ILogoutUserSuccess => ({
  type: Actions.LOGOUT_SUCCESS,
});
export const logoutUserError = (error: string): ILogoutUserError => ({
  type: Actions.LOGOUT_ERROR,
  payload: error,
});

export const loginUserSuccess = (user: IUser): ILoginUserSuccess => ({
  type: Actions.LOGIN_SUCCESS,
  payload: user,
});
export const loginUserError = (error: string): ILoginUserError => ({
  type: Actions.LOGIN_ERROR,
  payload: error,
});

export const patchUserInfoSuccess = (user: IUser): IPatchUserInfoSuccess => ({
  type: Actions.PATCH_USER_INFO_SUCCESS,
  payload: user,
});
export const patchUserInfoError = (error: string): IPatchUserInfoError => ({
  type: Actions.PATCH_USER_INFO_ERROR,
  payload: error,
});

export const fetchUserInfoSuccess = (user: IUser): IFetchUserInfoSuccess => ({
  type: Actions.FETCH_USER_INFO_SUCCESS,
  payload: user,
});
export const fetchUserInfoError = (error: string): IFetchUserInfoError => ({
  type: Actions.FETCH_USER_INFO_ERROR,
  payload: error,
});

export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
  type: Actions.PASSWORD_RESET_SUCCESS,
});
export const resetPasswordError = (error: string): IResetPasswordError => ({
  type: Actions.PASSWORD_RESET_ERROR,
  payload: error,
});

export const requestPasswordResetCodeSuccess =
  (): IRequestPasswordResetCodeSuccess => ({
    type: Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS,
  });
export const requestPasswordResetCodeError = (
  error: string
): IRequestPasswordResetCodeError => ({
  type: Actions.REQUEST_PASSWORD_RESET_CODE_ERROR,
  payload: error,
});


