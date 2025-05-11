import React from "react";

import "../css/header.css";

import { Link } from "react-router-dom";

import logo from "../assets/logo_top.svg";
import pet_world from "../assets/pet_world_top.svg";
import plus from "../assets/plus.svg";
import login from "../assets/login.svg";

export const Header: React.FC = () => {
  return (
    <div className="header">
      <Link to="/" className="header-logo-text" style={{ cursor: "pointer" }}>
        <div className="header-logo">
          <div className="header-logo-img">
            <img src={logo} alt="Pet World logo" />
          </div>
          <img src={pet_world} alt="Pet World" />
        </div>
        <p className="header-text">Оголошення</p>
      </Link>

      <div className="header-post-acc">
        <div className="header-ads-post">
          <div className="header-post">
            <Link to="/error-page">
              <button className="header-post-btn">
                <img src={plus} alt="Add" />
                Додати оголошення
              </button>
            </Link>
          </div>
        </div>
        <div className="header-acc">
          <img src={login} className="header-acc-img" alt="Login" />
          <p className="header-text">Вхід</p>
        </div>
      </div>
    </div>
  );
};
