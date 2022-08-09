import React, { FC } from "react";
import PropTypes from "prop-types";
import style from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";



type TTabsProps = {
  onClickTab: ((value: string) => void),
  current?:  string,
};

const Tabs: FC<TTabsProps> = ({onClickTab, current}) => {

  return (
    <div id="tabs" className={style.Tabs}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={ onClickTab}
      ></Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={onClickTab}
      ></Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={onClickTab}
      ></Tab>
    </div>
  );
};

Tabs.propTypes = {
  onClickTab: PropTypes.func.isRequired,
  current:  PropTypes.string.isRequired
}

export default Tabs;
