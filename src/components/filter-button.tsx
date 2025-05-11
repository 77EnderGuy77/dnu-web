import React from "react";
import "../css/filter-button.css";

export interface FilterButtonProps {
  disableReset: boolean;
  onReset: () => void;
  onApply?: () => void; // Add onClick property
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  disableReset,
  onReset,
  onApply,
}) => {
  return (
    <div className="filter-button-container">
      <button
        type="button"
        className="filter-button-start"
        onClick={onApply}
      >
        <svg
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9.5H9V8H6V9.5ZM0.75 0.5V2H14.25V0.5H0.75ZM3 5.75H12V4.25H3V5.75Z"
            fill="white"
          />
        </svg>
        <span>Застосувати фільтри</span>
      </button>
      <button
        type="button"
        className="filter-button-reset"
        onClick={onReset}
        disabled={disableReset}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
            fill="currentColor"
          />
        </svg>
        <span>Очистити фільтри</span>
      </button>
    </div>
  );
};
