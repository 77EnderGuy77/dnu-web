import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/error-page.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <Header />
      <div className="error-page-container">
        <h1 className="message">
          Упс! <br />
          Схоже, ми не можемо знайти цю сторінку.
        </h1>
        <h2 className="sub-message">
          Ця сторінка вирішила піти гуляти без повідка і загубилась. Але не
          хвилюйтесь, ми завжди тут, щоб допомогти вам знайти свого нового
          улюбленця.
        </h2>
        <button className="home-button" onClick={goHome}>
          Перейти на головну
        </button>
      </div>
      <Footer />
    </div>
  );
};
