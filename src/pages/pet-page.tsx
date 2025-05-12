import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "../css/pet-page.css";

import { Char } from "../components/char"; // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
import { Header } from "../components/header";
import { Footer } from "../components/footer";

import petsData from "../pets.json";
import { formatAge } from "../utils/ageInDays";

import pinIcon from "../assets/pin.svg";
import healthIcon from "../assets/health.svg";
import pawIcon from "../assets/paw.svg";
import genderIcon from "../assets/gender.svg";
import calendarIcon from "../assets/calendar.svg";
import colorIcon from "../assets/color.svg";
import phone from "../assets/phone.svg";
import lastIcon from "../assets/last.svg";
import nextIcon from "../assets/next.svg";

interface Pet {
  // :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}
  id: number;
  name: string;
  title: string;
  price: number;
  breed: string;
  gender: string;
  color: string;
  ageInDays: number;
  health: string;
  documents: string;
  contact_phone: string;
  contact_location: string;
  publish_date: string;
  image: string | string[];
}

export const PetPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const pet = petsData.find((p: Pet) => p.id === Number(id));
  const [currentIdx, setCurrentIdx] = useState(0);
  const base = import.meta.env.BASE_URL;

  if (!pet) {
    return (
      <div className="pet-page">
        <Link to="/catalog" className="pet-back-link">
          &larr; Back to Catalog
        </Link>
        <h2 className="pet-not-found">Pet not found</h2>
      </div>
    );
  }

  const images = Array.isArray(pet.image) ? pet.image : [pet.image];
  const hasMulti = images.length > 1;

  const prevImage = () =>
    setCurrentIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const nextImage = () =>
    setCurrentIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  const attributes = [
    { title: "Порода", info: pet.breed, img: pawIcon },
    { title: "Стать", info: pet.gender, img: genderIcon },
    { title: "Колір", info: pet.color, img: colorIcon },
    { title: "Вік", info: formatAge(pet.ageInDays), img: calendarIcon },
    { title: "Вакцинации", info: pet.health, img: healthIcon },
  ];

  const contacts = [
    { title: "Телефон", info: pet.contact_phone, img: phone },
    { title: "Місто", info: pet.contact_location, img: pinIcon },
  ];

  return (
    <div className="pet-page">
      <Header />
      <Link to="/catalog" className="pet-back-link">
        &larr; Back to Catalog
      </Link>
      <div className="pet-show">
        <div className="pet-img">
          <img
            key={currentIdx}
            className="slide-image"
            src={`${base}${images[currentIdx]}`}
            alt={pet.name}
          />
          {hasMulti && (
            <div className="arrows">
              <img src={lastIcon} alt="Prev" onClick={prevImage} />
              <img src={nextIcon} alt="Next" onClick={nextImage} />
            </div>
          )}
        </div>
        <div className="pet-desc">
          <h2>Інформація про улюбленця</h2>
          <p className="pet-desc p">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Pellentesque ipsum. Fusce suscipit libero eget elit. Integer
            vulputate sem a nibh rutrum consequat. Maecenas libero. Donec
            iaculis gravida nulla. Nunc auctor. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Fusce wisi. Sed vel lectus. Donec
            odio tempus molestie, porttitor ut, iaculis quis, sem. Aliquam erat
            volutpat. Integer malesuada.
          </p>
        </div>
        <div className="pet-info">
          <div className="pet-info-title">
            <h2>{pet.title}</h2>
            <span className="pet-price">{pet.price} грн</span>
          </div>
          <div className="pet-attributes">
            <h3>Деталі</h3>
            {attributes.map((attr, index) => (
              <Char
                key={index}
                title={attr.title}
                info={attr.info}
                img={attr.img}
              />
            ))}
          </div>
          <div className="pet-contact">
            <h3>Контакти</h3>
            {contacts.map((contact, index) => (
              <Char
                key={index}
                title={contact.title}
                info={contact.info}
                img={contact.img}
              />
            ))}
          </div>
          <div className="take-button-container">
            <button
              className="take-button"
              onClick={() => navigate("/error-page")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 8.88889H3.125V5.55556H6.875V8.88889H8.75V3.88889L5 1.38889L1.25 3.88889V8.88889ZM0 10V3.33333L5 0L10 3.33333V10H5.625V6.66667H4.375V10H0Z"
                  fill="white"
                />
              </svg>
              Взяти до дому
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
