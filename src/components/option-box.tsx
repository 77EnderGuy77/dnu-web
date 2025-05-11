import React, { useState, ChangeEvent } from "react";
import "../css/option-box.css";

export interface Option {
  label: string;
  value: string;
}

export interface OptionBoxProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

export const OptionBox: React.FC<OptionBoxProps> = ({ label, options, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(value || "");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="option-box">
      <div className={`select-wrapper ${selectedOption ? "has-value" : ""}`}>
        <label>{label}</label>
        <select value={selectedOption} onChange={handleChange}>
          <option value="">Усі</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="custom-arrow">
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 5L0 0H10L5 5Z" fill="#49454F" />
          </svg>
        </div>
      </div>
    </div>
  );
};
