// src/pages/MainPage.tsx
import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';

import { OptionBox } from "../components/option-box";
import { SearchButton } from "../components/search";
import { PetCount } from "../components/pet-count";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Girl } from "../components/girl";
import { PetCard } from "../components/pet-card";

import "../css/main-page.css";

import { formatAge } from "../utils/ageInDays";
import pets from "../pets.json";

interface Option {
  label: string;
  value: string;
}

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  // Derive unique pet types and cities from pets.json
  const petTypeOptions: Option[] = useMemo(() => {
    const types = Array.from(new Set(pets.map((p) => p.petType)));
    return types.map((t) => ({ label: t, value: t }));
  }, []);

  const cityOptions: Option[] = useMemo(() => {
    const cities = Array.from(new Set(pets.map((p) => p.contact_location)));
    return cities.map((c) => ({ label: c, value: c }));
  }, []);

  // Track selection (for wiring up SearchButton later)
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Four newest pets
  const latestPets = useMemo(() => {
    return pets
      .sort(
        (a, b) =>
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
      )
      .slice(0, 4);
  }, []);

  const onSearch = () => {
    const params = new URLSearchParams();
    if (selectedType) params.set("petType", selectedType);
    if (selectedCity) params.set("city", selectedCity);
    navigate(`/catalog?${params.toString()}`);
  };

  return (
    <div className="main-page">
      <Header />

      <div className="main-page-top">
        <div>
          <h1 className="main-page-title">
            Звідси починається <br /> найкраща дружба
          </h1>
          <div className="option-box-container">
            <div className="option-box-group">
              <OptionBox
                label="Вид тварини"
                options={petTypeOptions}
                value={selectedType}
                onChange={setSelectedType}
              />
              <OptionBox
                label="Локація"
                options={cityOptions}
                value={selectedCity}
                onChange={setSelectedCity}
              />
            </div>
            <div className="search-button-container">
              <SearchButton onClick={onSearch} />
            </div>
          </div>
        </div>
        <Girl />
      </div>

      <PetCount />

      <section className="latest-pets">
        <h2>Найновіші оголошення</h2>
        <div className="pet-cards-grid">
          {latestPets.map((pet) => (
            <PetCard
              key={pet.id}
              id={pet.id}
              img={pet.image}
              title={pet.title}
              location={pet.contact_location}
              gender={pet.gender}
              age={formatAge(pet.ageInDays)}
              price={pet.price}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
