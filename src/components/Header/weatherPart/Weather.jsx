import React, { useEffect, useState } from "react";
import cls from "./weather.module.scss";
import axios from "axios";

const Weather = () => {
  const [fetchingData, setFetchingData] = useState([]);
  const date = new Date();
  const hour = date.getHours() + ":" + date.getMinutes();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const dateMonth = day + " " + month + " " + year;
  const url =
    "https://www.meteosource.com/api/v1/free/point?key=ytxekr9dsf51mmp75qu6z1wp662t76b0y17xbv6t&place_id=tashkent";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setFetchingData(res.data.current))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={cls.wrapper}>
      <h1 className={cls.weather_Hour}>
        {fetchingData.temperature}&deg;C
        <h1>|</h1>
        <span>{hour}</span>
      </h1>
      <h2>{dateMonth}</h2>
      <div className={cls.location}>
        <box-icon color="#000" name="location-plus"></box-icon>
        <p>Tashkent, Uz</p>
      </div>
    </div>
  );
};

export default Weather;
