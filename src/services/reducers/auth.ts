import * as Actions from "../actions";
import { IUser } from "../../utils/interface/user.interface";
import { TAuthActionTypes } from "../../store/actions/auth";

export type TAuthState = {
  user: IUser | null;
  loading: boolean | null;
  error: string | boolean | null;
  tokenExpired: boolean | null;
  resetPasswordCodeRequested: boolean;
  resetPasswordCodeEmail: string | null;
};

const initialState: TAuthState = {
  user: null,
  loading: null,
  error: null,
  tokenExpired: null,
  resetPasswordCodeRequested: false,
  resetPasswordCodeEmail: null,
};

export const authReducer = (
  state = initialState,
  action: TAuthActionTypes
): TAuthState => {
  switch (action.type) {
    case Actions.PATCH_USER_INFO:
      return {
        ...state,
        loading: true,
      };
    case Actions.PATCH_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case Actions.PATCH_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.FETCH_USER_INFO:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case Actions.FETCH_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.RESET_AUTH:
      return {
        ...state,
        user: null,
        tokenExpired: true,
      };
    case Actions.LOGOUT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Actions.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Actions.LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case Actions.REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Actions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case Actions.REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case Actions.REQUEST_PASSWORD_RESET_CODE:
      return {
        ...state,
        loading: true,
        error: false,
        resetPasswordCodeRequested: false,
        resetPasswordCodeEmail: action.payload,
      };
    case Actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordCodeRequested: true,
      };
    case Actions.REQUEST_PASSWORD_RESET_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.PASSWORD_RESET: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case Actions.PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        loading: false,
        resetPasswordCodeEmail: null,
        resetPasswordCodeRequested: false,
      };
    }
    case Actions.PASSWORD_RESET_ERROR: {
      return {
        ...state,
        loading: false,
        resetPasswordCodeRequested: false,
      };
    }
    default:
      return state;
  }
};
