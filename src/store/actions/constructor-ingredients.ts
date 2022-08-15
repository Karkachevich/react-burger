import * as Actions from "../../services/actions";
import { IConstructorIngredient } from "../../utils/interface/constructor-ingredients.interface";

export interface IAddBunToConstructor {
  readonly type: typeof Actions.ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: IConstructorIngredient;
}
export interface IAddIngredientToConstructor {
  readonly type: typeof Actions.ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: IConstructorIngredient;
}
export interface IRemoveIngredientFromConstructor {
  readonly type: typeof Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: string;
}
export interface IResetConstructorIngredients {
  readonly type: typeof Actions.RESET_CONSTRUCTOR_INGREDIENTS;
}
export interface IChangeConstructorIngredientPosition {
  readonly type: typeof Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION;
  readonly payload: {
    whichIngredientDroppedId: string;
    onWhichIngredientDroppedId: string;
  };
}

export type TConstructorIngredientsActionTypes =
  | IAddBunToConstructor
  | IAddIngredientToConstructor
  | IRemoveIngredientFromConstructor
  | IResetConstructorIngredients
  | IChangeConstructorIngredientPosition;
