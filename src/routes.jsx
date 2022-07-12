import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import IngredientDetails from "./components/IngredientsDetails/IngredientsDetails";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientsPage,
  FeedPage,
  OrderDetailsPage
} from "./pages";
import { Order } from "./components/Order/Order";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

export function Routes() {
  const history = useHistory();
  const location = useLocation();


  const feedModal = location.state && location.state.feedModal;
  const ingredientModal = location.state && location.state.ingredientModal;
  const profileFeedModal = location.state && location.state.profileFeedModal;

  const background = ingredientModal || feedModal || profileFeedModal;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path={['/', '/react-burger']} component={MainPage}/>
        <Route exact path="/feed" component={FeedPage} />        
        <ProtectedRoute
          exact
          path={["/profile", "/profile/orders"]}
          accessType="authorized"
        >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/login" accessType="unauthorized">
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/register" accessType="unauthorized">
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/forgot-password" accessType="unauthorized">
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/reset-password" accessType="unauthorized">
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:orderId" accessType="authorized">
          <OrderDetailsPage />
        </ProtectedRoute>
        <Route exact path="/feed/:orderId" component={OrderDetailsPage} />
        <Route exact path="/ingredients/:id" component={IngredientsPage}/>
      </Switch>

      {ingredientModal && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal onClose={() => history.goBack()} header="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {feedModal && (
        <Route
          path="/feed/:orderId"
          children={(
            <Modal
              onClose={() => history.goBack()}
              header=""
            >
              <Order />
            </Modal>
              )}
        />
      )}
      {profileFeedModal && (
        <ProtectedRoute
          exact
          path="/profile/orders/:orderId"
          accessType="authorized"
          children={(
            <Modal
              onClose={() => history.goBack()}
              header=""
            >
              <Order />
            </Modal>
                )}
        />
      )}
    </>
  );
}
//
