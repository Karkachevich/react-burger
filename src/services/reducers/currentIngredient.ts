import * as Actions from "../actions";
import { TDetailedIngredientActionTypes } from "../../store/actions/detailed-ingredient";

export type TDetailedIngredientState = {
  detailedIngredient: string | null;
};
const initialState: TDetailedIngredientState = {
  detailedIngredient: null,
};

export const currentIngredientReducer = (
  state = initialState,
  action: TDetailedIngredientActionTypes
): TDetailedIngredientState => {
  switch (action.type) {
    case Actions.SET_DETAILED_INGREDIENT:
      return {
        ...state,
        detailedIngredient: action.payload,
      };
    case Actions.RESET_DETAILED_INGREDIENT:
      return {
        ...state,
        detailedIngredient: null,
      };
    default:
      return state;
  }
};
