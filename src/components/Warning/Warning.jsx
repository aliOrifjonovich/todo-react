import React from "react";
import cls from "./warning.module.scss";

const Warning = ({setWarning}) => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.warning}>
        <h1 className={cls.nothing_Written}>You don't write nothing here</h1>
        <span>or</span>
        <h1 className={cls.same_value}>There is a same value in your Todo application</h1>
        <button onClick={()=>setWarning(false)}>Ok</button>
      </div>
    </div>
  );
};

export default Warning;
