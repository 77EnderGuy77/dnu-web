import React, { useState, ChangeEvent } from "react";
import "../css/gender.css";

export type Gender = "Хлопчик" | "Дівчинка";

interface GenderFilterProps {
  label: string;
  onChange: (selected: Gender[]) => void;
}

export const GenderFilter: React.FC<GenderFilterProps> = ({ label, onChange }) => {
  const options: Gender[] = ["Хлопчик", "Дівчинка"];
  const [selected, setSelected] = useState<Gender[]>([]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Gender;
    const checked = e.target.checked;

    const withoutValue = selected.filter(g => g !== value);
    const newSelected = checked ? [...withoutValue, value] : withoutValue;

    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="gender-filter-container">
      <span className="gender-label">{label}</span>
      <div className="gender-options">
        {options.map(opt => (
          <label key={opt} className="checkbox-wrapper">
            <input
              type="checkbox"
              value={opt}
              checked={selected.includes(opt)}
              onChange={handleCheckboxChange}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
};