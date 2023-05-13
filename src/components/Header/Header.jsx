import React from "react";
import Weather from "../Header/weatherPart/Weather.jsx";
import TodoTitle from "../Header/TodoTitle/TodoTitle.jsx";
import cls from "./header.module.scss";

const Header = () => {
  return (
    <div className={cls.container}>
      <div className={cls.weather}>
        <Weather />
      </div>
      <TodoTitle />
    </div>
  );
};

export default Header;
