import * as Actions from "../../services/actions";
import { IOrder } from "../../utils/interface/order.interface";
export interface IPostOrder {
  readonly type: typeof Actions.POST_ORDER;
}
export interface IPostOrderSuccess {
  readonly type: typeof Actions.POST_ORDER_SUCCESS;
  readonly payload: IOrder;
}
export interface IPostOrderError {
  readonly type: typeof Actions.POST_ORDER_ERROR;
  readonly payload: string;
}

export interface IResetOrderNumber {
  readonly type: typeof Actions.RESET_ORDER_NUMBER;
}

export type TOrderActionTypes =
  | IPostOrder
  | IPostOrderSuccess
  | IPostOrderError
  | IResetOrderNumber;

type TPostOrderParams = { orderNumber: number; burgerName: string };

export const postOrderSuccess = ({
  orderNumber,
  burgerName,
}: TPostOrderParams): IPostOrderSuccess => ({
  type: Actions.POST_ORDER_SUCCESS,
  payload: { orderNumber, burgerName },
});

export const postOrderError = (error: string): IPostOrderError => ({
  type: Actions.POST_ORDER_ERROR,
  payload: error,
});
