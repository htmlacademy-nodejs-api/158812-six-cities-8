import { Cities, Goods, HousesTypes } from '../../../types/index.js';
import { CoordinatesDto } from './coordinates.dto.js';

export class UpdateOfferDto {
  public title: string;
  public description: string;
  public createdDate: Date;
  public city: Cities;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public houseType: HousesTypes;
  public bedrooms: number;
  public guests: number;
  public price: number;
  public goods: Goods[];
  public author: string;
  public coordinates: CoordinatesDto;
}
