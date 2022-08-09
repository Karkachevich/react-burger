import * as Actions from "../../services/actions";

export interface ISetDetailedIngredient {
  readonly type: typeof Actions.SET_DETAILED_INGREDIENT;
  readonly payload: string;
}
export interface IResetDetailedIngredient {
  readonly type: typeof Actions.RESET_DETAILED_INGREDIENT;
}
export type TDetailedIngredientActionTypes =
  | ISetDetailedIngredient
  | IResetDetailedIngredient;
