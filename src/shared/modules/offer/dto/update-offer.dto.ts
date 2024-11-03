import { Cities, Coordinates, Goods, HousesTypes } from '../../../types/index.js';
import { IsOptional, IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, ArrayMinSize, IsObject, IsBoolean } from 'class-validator';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.createdDate.invalidFormat })
  public createdDate?: Date;

  @IsOptional()
  @IsEnum(Cities, { message: UpdateOfferValidationMessage.cities.invalid })
  public city?: Cities;

  @IsOptional()
  @MaxLength(256, { message: UpdateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @ArrayMinSize(6, { message: UpdateOfferValidationMessage.images.minSize })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalid })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousesTypes, { message: UpdateOfferValidationMessage.houseType.invalid })
  public houseType?: HousesTypes;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.guests.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Goods, { each: true, message: UpdateOfferValidationMessage.goods.invalid })
  public goods?: Goods[];

  @IsOptional()
  @IsObject({ message: UpdateOfferValidationMessage.coordinates.invalidObject })
  public coordinates?: Coordinates;
}
