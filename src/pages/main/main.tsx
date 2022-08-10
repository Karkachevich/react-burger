import React from "react";
import style from "./main.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { Loader } from "../../ui/loader/loader";
import * as Actions from "../../services/actions";
import { useSelector, useDispatch } from "../../utils/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function MainPage() {
  const dispatch = useDispatch();
  
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const hasError = useSelector((state) => state.ingredients.error);
  const orderNumber = useSelector((state) => state.order.orderNumber);

  const handleCloseOrderModal = () => {
    dispatch({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
    dispatch({ type: Actions.RESET_ORDER_NUMBER });
  };
 

  return (
    <>
      {isLoading && <Loader size="large" inverse/>}
      {hasError && (
        <span className="text text_type_main-default mt-20">
          {`Произошла ошибка загрузки (${hasError})`}
        </span>
      )}
      <DndProvider backend={HTML5Backend}>
        <main className={style.main}>
          {!isLoading && ingredients.length && <BurgerIngredients />}
          {!isLoading && ingredients.length && <BurgerConstructor />}
        </main>
      </DndProvider>
      {orderNumber && (
        <Modal header="" onClose={handleCloseOrderModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
     
     
    </>
  );
}
