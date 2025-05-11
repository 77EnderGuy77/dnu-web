// src/components/pet-count.tsx
import React, { useMemo } from "react";
import "../css/pet-count.css";

import pets from "../pets.json";

interface AnimalStat {
  label: string;
  count: number;
}

export const PetCount: React.FC = () => {
  const stats: AnimalStat[] = useMemo(() => {
    // helper to count by a predicate
    const countIf = (pred: (p: typeof pets[0]) => boolean) =>
      pets.filter(pred).length;

    return [
      { label: "Собак",    count: countIf(p => p.petType.toLowerCase() === "собака") },
      { label: "Птахів",   count: countIf(p => p.petType.toLowerCase() === "папуга") },
      { label: "Котів",    count: countIf(p => p.petType.toLowerCase() === "кішка") },
      { label: "Гризунів", count: countIf(p => ["морська свинка", "криса"].includes(p.petType.toLowerCase())) },
      { label: "Рептилій", count: countIf(p => p.petType.toLowerCase() === "черепаха") },
    ];
  }, []);

  return (
    <div className="pet-count-wrapper">
      <div className="back-color" />
      <div className="pet-stats-container">
        <div className="pet-stats">
          {stats.map((a) => (
            <div className="stat-item" key={a.label}>
              <div className="count">{a.count}</div>
              <div className="label">{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
