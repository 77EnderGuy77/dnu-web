import React from 'react';

import '../css/pet-card.css';

import { Link } from 'react-router-dom';
import { Pet } from '../types';

import pin from '../assets/pin.svg';
import genderIcon from '../assets/gender.svg';
import calendarIcon from '../assets/calendar.svg';

interface PetCardProps extends Pet {}

export const PetCard: React.FC<PetCardProps> = ({
  id,
  img,
  title,
  location,
  gender,
  age,
  price,
}) => {
  // Use the first image if img is an array
  const imageSrc = Array.isArray(img) ? img[0] : img;
  const resolved =
    import.meta.env.BASE_URL + imageSrc.replace(/^\.\//, '');

  return (
    <Link to={`/catalog/${id}`} className="pet-card">
      <div className="pet-card-img">
        <img src={resolved} alt={title} />
      </div>
      <div className="pet-card-info-box">
        <p className="pet-card-title">{title}</p>
        <div className="pet-card-info">
          <div className="pet-card-info-item">
            <img src={pin} alt="location" /> <span>{location}</span>
          </div>
          <div className="pet-card-info-item">
            <img src={genderIcon} alt="gender" /> <span>{gender}</span>
          </div>
          <div className="pet-card-info-item">
            <img src={calendarIcon} alt="age" /> <span>{age}</span>
          </div>
        </div>
        <div className="pet-card-price">
          <span>{price === 0 ? 'Безкоштовно' : `₴ ${price}`}</span>
        </div>
      </div>
    </Link>
  );
};
