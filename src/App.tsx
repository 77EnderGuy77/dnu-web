import { Routes, Route, Navigate } from "react-router-dom";

import { MainPage } from "./pages/main-page";
import { CatalogPage } from "./pages/catalog-page";
import { PetPage } from "./pages/pet-page";
import { ErrorPage } from "./pages/error-page";

export const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="catalog" element={<CatalogPage />} />
    {/* dynamic detail route */}
    <Route path="catalog/:id" element={<PetPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
    <Route path="error-page" element={<ErrorPage />} />
  </Routes>
);
