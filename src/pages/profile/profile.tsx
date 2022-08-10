import React from "react";
import { deleteCookie } from "../../utils/cookie";
import {
  Route,
  Switch,
  matchPath,
  NavLink,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "../../utils/hooks";

import styles from "./profile.module.css";
import { Profile } from "../../components/Profile/profile";
import { logoutUser } from "../../services/actions/auth";
import { MyOrdersPage } from "../myOrders/myOrders";

export function ProfilePage() {
  

  const location = useLocation();
  const dispatch = useDispatch();
  const matchedProfile = matchPath(location.pathname, {
    path: "/profile",
    exact: true,
  });
  const matchedMyOrders = matchPath(location.pathname, {
    path: "/profile/orders",
    exact: true,
  });

  const clickHandler = () => {
    dispatch(logoutUser());
    deleteCookie("token");
  };

  return (
    <div className={styles.profile}>
      <nav className={styles.navigation}>
        <div className={styles.navigationItem}>
          <NavLink
            className={styles.navigationItemLink}
            activeClassName={styles.navigationItemLinkActive}
            type="button"
            exact
            to="/profile"
          >
            <span className="text text_type_main-medium">Профиль</span>
          </NavLink>
        </div>
        <div className={styles.navigationItem}>
          <NavLink
            className={styles.navigationItemLink}
            activeClassName={styles.navigationItemLinkActive}
            type="button"
            exact
            to="/profile/orders"
          >
            <span className="text text_type_main-medium">История заказов</span>
          </NavLink>
        </div>
        <div className={styles.navigationItem}>
          <NavLink
            className={styles.navigationItemLink}
            activeClassName={styles.navigationItemLinkActive}
            type="button"
            exact
            to="/login"
          >
            <span className="text text_type_main-medium" onClick={clickHandler}>
              Выход
            </span>
          </NavLink>
        </div>

        {matchedProfile && (
          <div className="mt-20">
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете
            </p>
            <p className="text text_type_main-default text_color_inactive">
              изменить свои персональные данные
            </p>
          </div>
        )}
        {matchedMyOrders && (
          <div className="mt-20">
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете
            </p>
            <p className="text text_type_main-default text_color_inactive">
              просмотреть свою историю заказов
            </p>
          </div>
        )}
      </nav>
      <div className={styles.content}>
      <Switch>
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/orders" exact component={MyOrdersPage} />
        </Switch>
      </div>
        
         
    </div>
  );
}
