import { Cities, Coordinates } from './cities.enum.js';
import { Conveniences } from './conveniences.enum.js';
import { HousesTypes } from './houses-types.enum.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  date: string;
  city: Cities;
  previewImage: string;
  placeImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousesTypes;
  roomsAmount: number;
  guestsAmount: number;
  price: number;
  conveniences: Conveniences[];
  author: User;
  cityCoordinates: Coordinates;
};
