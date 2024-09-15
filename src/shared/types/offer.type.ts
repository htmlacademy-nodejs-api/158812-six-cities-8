import { Cities, Coordinates } from './cities.enum.js';
import { Goods } from './goods.enum.js';
import { HousesTypes } from './houses-types.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  uploadDate: string;
  city: Cities;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousesTypes;
  bedrooms: number;
  guests: number;
  price: number;
  goods: Goods[];
  author: User;
  coordinates: Coordinates;
};
