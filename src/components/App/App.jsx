import React from "react";
import style from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientsDetails/IngredientsDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getIngredients } from "../../services/api";
import { Loader } from "../../ui/loader/loader";
import Actions from "../../services/actions";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const hasError = useSelector((state) => state.ingredients.error);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const detailedIngredient = useSelector(
    (state) => state.currentIngredient.detailedIngredient
  );

  const handleCloseOrderModal = () => {
    dispatch({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
    dispatch({ type: Actions.RESET_ORDER_NUMBER });
  };

  const handleCloseDetailedIngredientModal = () => {
    dispatch({ type: Actions.RESET_DETAILED_INGREDIENT });
  };

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={style.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={style.main}>
          {isLoading && <Loader size="large" />}
          {hasError && (
            <span className="text text_type_main-default mt-20">{`Произошла ошибка загрузки (${hasError})`}</span>
          )}
          {ingredients.length && <BurgerIngredients />}
          {ingredients.length && <BurgerConstructor />}
        </main>
      </DndProvider>
      {orderNumber && (
        <Modal header="" onClose={handleCloseOrderModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {detailedIngredient && (
        <Modal
          header="Детали ингредиента"
          onClose={handleCloseDetailedIngredientModal}
        >
          <IngredientDetails ingredient={detailedIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
