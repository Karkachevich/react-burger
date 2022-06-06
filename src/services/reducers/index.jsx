import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { constructorIngredientsReducer } from "./costructorIngredients";
import { currentIngredientReducer } from "./currentIngredient";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  constructorIngredients: constructorIngredientsReducer,
});

export default rootReducer;
