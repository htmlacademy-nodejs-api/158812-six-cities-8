import { Cities, Coordinates } from './cities.enum.js';
import { Goods } from './goods.enum.js';
import { HousesTypes } from './houses-types.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  createdDate: Date;
  city: Cities;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: HousesTypes;
  bedrooms: number;
  guests: number;
  price: number;
  goods: Goods[];
  author: User;
  coordinates: Coordinates;
};
