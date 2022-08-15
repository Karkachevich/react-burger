import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_GET_MESSAGE_AUTH,
} from "../../store/constants/wsAuth";
import { TWSActionsAuthTypes } from "../../store/actions/wsActionAuth";
import { IOrderDetails } from "../../utils/interface/order.interface";
import { PayloadAction } from "@reduxjs/toolkit";

type TWsReduserAuthState = {
  wsConnected: Boolean;
  error: PayloadAction | null;
  orders: Array<IOrderDetails>;
  total: number | null;
  totalToday: number | null;
};
const initialState: TWsReduserAuthState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducerAuth = (
  state = initialState,
  action: TWSActionsAuthTypes
): TWsReduserAuthState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
