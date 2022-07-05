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
} from "./pages";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

export function Routes() {
  const history = useHistory();
  const location = useLocation();

  const background = location.state && location.state.ingredientModal;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path={['/', '/react-burger']} component={MainPage}/>        
        <ProtectedRoute
          exact
          path={["/profile", "/profile/orders", "/profile/orders/:id"]}
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
        <Route exact path="/ingredients/:id" component={IngredientsPage}/>
      </Switch>

      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal onClose={() => history.goBack()} header="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}
//
