// src/components/price.tsx
import React, { useState, ChangeEvent } from "react";
import "../css/price.css";

interface PriceFilterProps {
  label: string;
  placeholder?: string;
  onChange: (price: number) => void; // <-- new required prop
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  label,
  placeholder,
  onChange,
}) => {
  const [price, setPrice] = useState<number | "">("");

  // Whenever `price` changes, notify parent
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").replace(/^0+/, "");
    const newPrice = cleaned === "" ? 0 : Number(cleaned);
    setPrice(cleaned === "" ? "" : newPrice);
    onChange(newPrice); // <–– notify here
  };

  return (
    <div className="price-filter-container">
      <div className={`select-wrapper ${price !== "" ? "has-value" : ""}`}>
        <label>{label}</label>
        <span className="prefix">₴</span>
        <input
          type="text"
          placeholder={placeholder ?? "0"}
          value={price}
          onChange={handleChange}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
    </div>
  );
};
