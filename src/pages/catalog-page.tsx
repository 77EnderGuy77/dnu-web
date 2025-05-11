// src/pages/catalog-page.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import "../css/catalog-page.css";

import pets from "../pets.json";
import { formatAge } from "../utils/ageInDays";
import { Gender } from "../components/gender";

import { PetCard } from "../components/pet-card";
import { Filter } from "../components/filter";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Pagination } from "../components/pagination";

interface FilterValues {
  petType: string;
  breed: string;
  city: string;
  minAgeDays: number;
  maxAgeDays: number;
  minPrice: number;
  maxPrice: number;
  gender: Gender[]; // updated to array of Gender
}

export const CatalogPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Lifted filter values
  const initialFilters = {
    petType: params.get("petType") ?? "",
    breed: "",
    city: params.get("city") ?? "",
    minAgeDays: 0,
    maxAgeDays: 0,
    minPrice: 0,
    maxPrice: 0,
    gender: [] as Gender[],
  };

  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  // Reset to first page when filters applied
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter pets list based on applied filters
  const filteredPets = useMemo(() => {
    return pets.filter((p) => {
      if (filters.petType && p.petType !== filters.petType) return false;
      if (filters.breed && p.breed !== filters.breed) return false;
      if (filters.city && p.contact_location !== filters.city) return false;
      if (filters.minAgeDays && p.ageInDays < filters.minAgeDays) return false;
      if (filters.maxAgeDays && p.ageInDays > filters.maxAgeDays) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (
        filters.gender.length > 0 &&
        !filters.gender.includes(p.gender as Gender)
      )
        return false;
      return true;
    });
  }, [filters]);

  // Paginate filtered results
  const totalItems = filteredPets.length;
  const start = (currentPage - 1) * itemsPerPage;
  const currentPets = filteredPets.slice(start, start + itemsPerPage);

  return (
    <div className="filter-page">
      <Header />

      {/* sidebar */}
      <aside className="filter">
        <Filter
          values={filters}
          onApply={(newFilters) => setFilters(newFilters)}
          onResetAll={() =>
            setFilters({
              petType: "",
              breed: "",
              city: "",
              minAgeDays: 0,
              maxAgeDays: 0,
              minPrice: 0,
              maxPrice: 0,
              gender: [],
            })
          }
        />
      </aside>

      {/* cards grid */}
      <aside className="right-pets">
        {currentPets.map((pet) => (
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
      </aside>

      {/* pagination row */}
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Footer />
    </div>
  );
};
