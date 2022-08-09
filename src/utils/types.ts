import PropTypes from "prop-types";

import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { store } from "../store/store";
import { TAuthActionTypes } from "../store/actions/auth";
import { TConstructorIngredientsActionTypes } from "../store/actions/constructor-ingredients";
import { TDetailedIngredientActionTypes } from "../store/actions/detailed-ingredient";
import { TIngredientsActionTypes } from "../store/actions/ingredients";
import { TOrderActionTypes } from "../store/actions/order";
import { TFeedActionTypes } from "../store/actions/feed";
import { TWSActionsAuthTypes, wsActionsAuth } from "../store/actions/wsActionAuth";
import { TWSActionsTypes, wsActions } from "../store/actions/wsAction";

export const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

export type TApplicationActions =
    | TAuthActionTypes
    | TConstructorIngredientsActionTypes
    | TDetailedIngredientActionTypes
    | TIngredientsActionTypes
    | TOrderActionTypes
    | TFeedActionTypes
    | TWSActionsAuthTypes
    | TWSActionsTypes



export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export type TWSAction = typeof wsActions | typeof wsActionsAuth;

