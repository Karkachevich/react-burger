import React from "react";
import style from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, matchPath, useLocation, Link } from "react-router-dom";

const AppHeader = () => {
  
  const location = useLocation();

  const matchedMain = matchPath(location.pathname, { path: ['/', '/react-burger'], exact: true });
  const matchedOrders = matchPath(location.pathname, {
    path: "/orders",
    exact:  true
  });
  const matchedProfile = matchPath(location.pathname, { path: "/profile", exact:  true});
  
  return (
    <header className={style.header}>
      <nav className={`${style.navigation__container} `}>
        <NavLink
          className={style.navigation__element}
          activeClassName={style.element__active}
          type="button"
          exact
          to="/"
        >
          <BurgerIcon type={matchedMain ? "primary" : "secondary"} />
          <p className={`${"text text_type_main-default pl-2"} ${
              matchedMain === null ? "" : `${style.element__active}`
            }`}>
            Конструктор
          </p>
        </NavLink>

        <NavLink
          className={style.navigation__element}
          activeClassName={style.element__active}
          type="button"
          exact
          to="/orders"
        >
          <ListIcon type={matchedOrders ? "primary" : "secondary"} />
          <p className="text text_type_main-default pl-2">
            Лента заказов
          </p>
        </NavLink>
      </nav>
      <Link to='/'>
      <Logo />
      </Link>
      
      <NavLink
        className={style.profile__container}
        activeClassName={style.element__active}
        type="button"
        to="/profile"
      >
        <ProfileIcon type={matchedProfile ? "primary" : "secondary"} />
        <p className="text text_type_main-default pl-2">
          Личный кабинет
        </p>
      </NavLink>
    </header>
  );
};

export default AppHeader;
