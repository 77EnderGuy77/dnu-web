import React from "react";
import "../css/girl.css";

import decore_big from "../assets/decore_big.svg";
import decore_small from "../assets/decore_small.svg";

export const Girl: React.FC = () => {
  return (
    <div className="girl_back">
      <div className="girl-wrapper">
        <img
          src={`${import.meta.env.BASE_URL}assets/img/girl_with_dogs.webp`}
          alt="Girl with dogs"
          className="girl-photo"
        />
      </div>
      <img src={decore_big} alt="big deco" className="decore-big" />
      <img src={decore_small} alt="small deco" className="decore-small" />
    </div>
  );
};