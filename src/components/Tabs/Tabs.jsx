import React from "react";
import PropTypes from "prop-types";
import style from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({onClickTab, current}) => {

  return (
    <div id="tabs" className={style.Tabs}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={ onClickTab}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={onClickTab}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={onClickTab}
      >
        Начинки
      </Tab>
    </div>
  );
};

Tabs.propTypes = {
  onClickTab: PropTypes.func.isRequired,
  current:  PropTypes.string.isRequired
}

export default Tabs;
