import { Cities, HousesTypes, Goods, Coordinates } from '../../../types/index.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, ArrayMinSize, IsObject, IsBoolean } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  //public id: string;
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public createdDate: Date;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
  public city: Cities;

  @MaxLength(256, { message: CreateOfferValidationMessage.image.maxLength })
  public previewImage: string;

  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.minSize })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  public isPremium: boolean;

  @IsEnum(HousesTypes, { message: CreateOfferValidationMessage.rentType.invalid })
  public houseType: HousesTypes;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.maxValue })
  public guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Goods, { each: true, message: CreateOfferValidationMessage.amenities.invalid })
  public goods: Goods[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public author: string;

  @IsObject({ message: CreateOfferValidationMessage.coordinates.invalidObject })
  public coordinates: Coordinates;
}
