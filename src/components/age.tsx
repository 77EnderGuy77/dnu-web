import React, { useState, ChangeEvent, useCallback } from "react";
import "../css/age.css";

interface AgeFilterProps {
  label: string;
  onChange: (convertedDays: number) => void;
}

export const AgeFilter: React.FC<AgeFilterProps> = ({ label, onChange }) => {
  const [age, setAge] = useState<number | "">("");
  const [unit, setUnit] = useState<"years" | "months" | "days">("days");

  const getYearLabel = (n: number | "") => {
    if (n === 1) return "Рік";
    if (typeof n === "number" && n >= 2 && n <= 4) return "Роки";
    return "Років";
  };
  const getMonthLabel = (n: number | "") => {
    if (n === 1) return "Місяць";
    if (typeof n === "number" && n >= 2 && n <= 4) return "Місяці";
    return "Місяців";
  };
  const getDayLabel = (n: number | "") => {
    if (n === 1) return "День";
    if (typeof n === "number" && n >= 2 && n <= 4) return "Дні";
    return "Днів";
  };

  const computeDays = useCallback((value: number | "", unit: "years" | "months" | "days") => {
    if (value === "" || value <= 0) return 0;
    switch (unit) {
      case "years":
        return value * 365;
      case "months":
        return value * 30;
      default:
        return value;
    }
  }, []);

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").replace(/^0+/, "");
    const newAge = raw === "" ? "" : Number(raw);
    setAge(newAge);
    const days = computeDays(newAge, unit);
    onChange(days);
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as any;
    setUnit(newUnit);
    const days = computeDays(age, newUnit);
    onChange(days);
  };

  return (
    <div className="age-filter-container">
      <div className={`select-wrapper ${age !== "" ? "has-value" : ""}`}>
        <label>{label}</label>
        <input
          type="text"
          value={age}
          placeholder="Введіть вік"
          onChange={handleAgeChange}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
      <div className={`select-wrapper ${unit ? "has-value" : ""}`}>
        <select value={unit} onChange={handleUnitChange}>
          <option value="days">{getDayLabel(age as number)}</option>
          <option value="months">{getMonthLabel(age as number)}</option>
          <option value="years">{getYearLabel(age as number)}</option>
        </select>
        <div className="custom-arrow">
          <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L0 0H10L5 5Z" fill="#49454F" />
          </svg>
        </div>
      </div>
    </div>
  );
};
