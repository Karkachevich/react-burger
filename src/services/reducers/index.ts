import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { constructorIngredientsReducer } from "./costructorIngredients";
import { currentIngredientReducer } from "./currentIngredient";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";
import { wsReducerAuth } from "./wsAuth";


const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  constructorIngredients: constructorIngredientsReducer,
  auth: authReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth
  
});

export default rootReducer;
