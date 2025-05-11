// filter-box.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import "../css/filter-box.css";

export interface FilterProps {
  label: string;
  value: string;
}

export interface FilterBoxProps {
  label: string;
  options: FilterProps[];
  // new:
  value?: string;
  onChange?: (value: string) => void;
}

export const FilterBox: React.FC<FilterBoxProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  // keep an internal state only if parent doesn't control us:
  const [internalValue, setInternalValue] = useState<string>("");

  // if the parent gives us a value, mirror it internally:
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (onChange) {
      onChange(v);
    } else {
      setInternalValue(v);
    }
  };

  const selected = value !== undefined ? value : internalValue;

  return (
    <div className="filter-box">
      <div
        className={`filter-select-wrapper ${
          selected ? "has-value" : ""
        }`}
      >
        <label>{label}</label>
        <select value={selected} onChange={handleChange}>
          <option value="">—</option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
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
