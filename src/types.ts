// src/types.ts
export interface Pet {
  id: number;
  img: string | string[];
  title: string;
  location: string;
  gender: string;
  age: string;
  price: number;
}

export interface CharProp {
  title: string;
  info: string;
  img: string;
}