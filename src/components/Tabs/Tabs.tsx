import React, { FC } from "react";
import { Tab } from "../Tab/tab";
import style from "./Tabs.module.css";

type TTabsProps = {
  onClickTab: (value: string) => void;
  current?: string;
};
const Tabs: FC<TTabsProps> = ({ onClickTab, current }) => {
  return (
    <div id="tabs" className={style.Tabs}>
      <Tab value="bun" active={current === "bun"} onClick={onClickTab}>
        {" "}
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={onClickTab}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={onClickTab}>
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
