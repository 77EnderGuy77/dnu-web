import React, { useState, useMemo } from "react";
import "../css/filter.css";

import pets from "../pets.json";
import { AgeFilter } from "./age";
import { FilterBox, FilterProps } from "./filter-box";
import { PriceFilter } from "./price";
import { GenderFilter, Gender } from "./gender";
import { FilterButton } from "./filter-button";

interface FilterValues {
  petType: string;
  breed: string;
  city: string;
  minAgeDays: number;
  maxAgeDays: number;
  minPrice: number;
  maxPrice: number;
  gender: Gender[];
}

interface FilterPropsExternal {
  values: FilterValues;
  onApply: (filters: FilterValues) => void;
  onResetAll: () => void;
}

export const Filter: React.FC<FilterPropsExternal> = ({ values, onApply, onResetAll }) => {
  // Draft state initialized once
  const [draft, setDraft] = useState<FilterValues>(values);
  const [resetKey, setResetKey] = useState(0);

  // Option arrays
  const petTypeOptions: FilterProps[] = useMemo(
    () => Array.from(new Set(pets.map(p => p.petType))).map(t => ({ label: t, value: t })),
    []
  );
  const cityOptions: FilterProps[] = useMemo(
    () => Array.from(new Set(pets.map(p => p.contact_location))).map(c => ({ label: c, value: c })),
    []
  );
  const breedOptions: FilterProps[] = useMemo(() => {
    if (!draft.petType) return [];
    return Array.from(
      new Set(pets.filter(p => p.petType === draft.petType).map(p => p.breed))
    ).map(b => ({ label: b, value: b }));
  }, [draft.petType]);

  // Check if any draft filter is active
  const isAnyDraftSelected = useMemo(() => {
    const { petType, breed, city, minAgeDays, maxAgeDays, minPrice, maxPrice, gender } = draft;
    return (
      Boolean(petType) ||
      Boolean(breed) ||
      Boolean(city) ||
      minAgeDays > 0 ||
      maxAgeDays > 0 ||
      minPrice > 0 ||
      maxPrice > 0 ||
      gender.length > 0
    );
  }, [draft]);

  const updateDraft = (fields: Partial<FilterValues>) => {
    setDraft(prev => ({ ...prev, ...fields }));
  };

  const handleReset = () => {
    onResetAll();
    setDraft({
      petType: "",
      breed: "",
      city: "",
      minAgeDays: 0,
      maxAgeDays: 0,
      minPrice: 0,
      maxPrice: 0,
      gender: [],
    });
    setResetKey(k => k + 1);
  };

  return (
    <div className="filter-container">
      <span>Фільтри</span>

      <div className="filter-options">
        <FilterBox
          key={`box1-${resetKey}`}
          label="Вид тварин"
          options={petTypeOptions}
          value={draft.petType}
          onChange={v => updateDraft({ petType: v, breed: "" })}
        />
        <FilterBox
          key={`box2-${resetKey}`}
          label="Різновид"
          options={breedOptions}
          value={draft.breed}
          onChange={v => updateDraft({ breed: v })}
        />
        <FilterBox
          key={`box3-${resetKey}`}
          label="Місто"
          options={cityOptions}
          value={draft.city}
          onChange={v => updateDraft({ city: v })}
        />
      </div>

      <div className="age-row" key={`age-${resetKey}`}>        
        <AgeFilter label="Мін" onChange={d => updateDraft({ minAgeDays: d })} />
        <AgeFilter label="Макс" onChange={d => updateDraft({ maxAgeDays: d })} />
      </div>

      <div className="price-row" key={`price-${resetKey}`}>        
        <PriceFilter label="Мін" onChange={p => updateDraft({ minPrice: p })} />
        <PriceFilter label="Макс" placeholder="10000" onChange={p => updateDraft({ maxPrice: p })} />
      </div>

      <div key={`gender-${resetKey}`}>        
        <GenderFilter label="Стать" onChange={g => updateDraft({ gender: g })} />
      </div>

      <FilterButton
        disableReset={!isAnyDraftSelected}
        onReset={handleReset}
        onApply={() => onApply(draft)}
      />
    </div>
  );
};