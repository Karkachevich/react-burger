import * as Actions from "../../services/actions";
import { IIngredient } from "../../utils/interface/ingredient.interface";

export interface IGetIngredients {
  readonly type: typeof Actions.GET_INGREDIENTS;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof Actions.GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}
export interface IGetIngredientsError {
  readonly type: typeof Actions.GET_INGREDIENTS_ERROR;
  readonly payload: string;
}
export interface IDragIngredient {
  readonly type: typeof Actions.DRAG_INGREDIENT;
}
export interface IDropIngredient {
  readonly type: typeof Actions.DROP_INGREDIENT;
}

export type TIngredientsActionTypes =
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsError
  | IDragIngredient
  | IDropIngredient;

export const getIngredientsSuccess = (
  ingredients: IIngredient[]
): IGetIngredientsSuccess => ({
  type: Actions.GET_INGREDIENTS_SUCCESS,
  payload: ingredients,
});
export const getIngredientsError = (error: string): IGetIngredientsError => ({
  type: Actions.GET_INGREDIENTS_ERROR,
  payload: error,
});
