import React from "react";
import cls from "./empty.module.scss";

const EmptyImage = () => {
  return (
    <div className={cls.nothing_image}>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/nothing-found-here-7684577-6209371.png?f=webp"
        alt="image"
      />
    </div>
  );
};

export default EmptyImage;
