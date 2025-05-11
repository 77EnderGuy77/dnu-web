// src/components/search.tsx
import React from "react";
import Search_Icon from "../assets/search.svg";
import "../css/search.css";

export interface SearchButtonProps {
  onClick?: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {

  return (
    <button className="search-button" onClick={onClick}>
      <img src={Search_Icon} alt="search icon" className="search-icon" />
      <span className="search-text">Шукати</span>
    </button>
  );
};
