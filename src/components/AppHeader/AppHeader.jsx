import React from "react";
import style from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const [state, setState] = React.useState("constructor");

  return (
    <header className={style.header}>
      <nav className={`${style.nav__container} `}>
        <button
          className={`${style.nav__element}`}
          type="button"
          onClick={() => setState("constructor")}
        >
          <BurgerIcon
            type={state === "constructor" ? "primary" : "secondary"}
          />
          <p className={`${"text text_type_main-default pl-2"} ${
          state === "constructor" ? "" : "text_color_inactive"
        }`}>Конструктор</p>
        </button>
        <button
          className={`${style.nav__element}`}
          type="button"
          onClick={() => setState("order_list")}
        >
          <ListIcon
            type={state=== "order_list" ? "primary" : "secondary"}
          />
          <p className={`${"text text_type_main-default pl-2"} ${
          state === "order_list" ? "" : "text_color_inactive"
        }`}>Лента заказов</p>
        </button>
      </nav>
      <Logo />
      <button
        className={`${style.prof__container}`}
        type="button"
        onClick={() => setState('profile')}

      >
        <ProfileIcon type={state === 'profile' ? 'primary' : 'secondary'} />
        <p className={`${"text text_type_main-default pl-2"} ${
          state === "profile" ? "" : "text_color_inactive"
        }`}>Личный кабинет</p>
      </button>
    </header>
  );
};

export default AppHeader;
