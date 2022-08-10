import PropTypes from "prop-types";

import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { store } from "../store/store";
import { TAuthActionTypes } from "../store/actions/auth";
import { TConstructorIngredientsActionTypes } from "../store/actions/constructor-ingredients";
import { TDetailedIngredientActionTypes } from "../store/actions/detailed-ingredient";
import { TIngredientsActionTypes } from "../store/actions/ingredients";
import { TOrderActionTypes } from "../store/actions/order";
import { TFeedActionTypes } from "../store/actions/feed";
import {
  TWSActionsAuthTypes,
  wsActionsAuth,
} from "../store/actions/wsActionAuth";
import { TWSActionsTypes, wsActions } from "../store/actions/wsAction";

export type TApplicationActions =
  | TAuthActionTypes
  | TConstructorIngredientsActionTypes
  | TDetailedIngredientActionTypes
  | TIngredientsActionTypes
  | TOrderActionTypes
  | TFeedActionTypes
  | TWSActionsAuthTypes
  | TWSActionsTypes;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type TWSAction = typeof wsActions | typeof wsActionsAuth;
