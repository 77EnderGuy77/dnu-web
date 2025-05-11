// Char.tsx
import React from 'react'
import "../css/char.css"
import { CharProp } from "../types"

export const Char: React.FC<CharProp> = ({ title, info, img }) => (
  <div className="char">
    <div className="char-left">
      <img src={img} alt={title} className="char-icon" />
      <span className="char-title">{title}</span>
    </div>
    <span className="char-info">{info}</span>
  </div>
)
