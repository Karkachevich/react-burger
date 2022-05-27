import React from "react";
import style from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { urlDomain } from "../../utils/constants";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientsDetails/IngredientsDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getIngridients } from "../Api/Api";
import {
  IngredientsContext,
  OrderNumberContext,
  TotalPriceContext,
} from "../../services/appContext";

const totalPriceInitialState =  { count: 0 };

function totalPriceReducer(state, action) {
  switch (action.type) {
    case "set":
      return { count: action.payload };
    case "reset":
      return totalPriceInitialState;
    default:
      throw new Error(`erorr: ${action.type}`);
  }
}

function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState(null);
  const [orderNumber, setOrderNumber] = React.useState();
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(
    totalPriceReducer,
    totalPriceInitialState,
    undefined
  );

  const handleOpenModal = (info) => {
    setModalInfo(info);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [data, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  React.useEffect(() => {
    getIngridients(`${urlDomain}/ingredients`)
      .then((res) =>
        setIngredients({ ingredients: res.data, isLoading: false })
      )
      .catch((err) => {
        setIngredients({ hasError: true, isLoading: false });
      });
  }, []);

  const { ingredients, isLoading, hasError } = data;

  return (
    <div className={style.App}>
      <IngredientsContext.Provider value={{ ingredients }}>
        <OrderNumberContext.Provider value={{ orderNumber, setOrderNumber }}>
          <TotalPriceContext.Provider
            value={{ totalPriceState, totalPriceDispatcher }}
          >
            <AppHeader />
            <main style={{ display: "flex" }}>
              {isLoading && "Загрузка..."}
              {hasError && "Произошла ошибка загрузки"}
              {!isLoading && !hasError && ingredients.length && (
                <BurgerIngredients handleOpenModal={handleOpenModal} />
              )}
              {!isLoading && !hasError && ingredients.length && (
                <BurgerConstructor onOpenModal={handleOpenModal} />
              )}
            </main>
            {modalVisible && (
              <Modal header={modalInfo.header} onClose={handleCloseModal}>
                {modalInfo.type === "ingredient_details" && (
                  <IngredientDetails ingredient={modalInfo.ingredient} />
                )}
                {modalInfo.type === "order_details" && <OrderDetails />}
              </Modal>
            )}
          </TotalPriceContext.Provider>
        </OrderNumberContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
