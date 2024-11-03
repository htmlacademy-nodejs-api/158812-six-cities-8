import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { Cities, Coordinates, Goods, HousesTypes } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public createdDate!: Date;

  @prop({
    type: () => String,
    enum: Cities,
    required: true
  })
  public city!: Cities;

  @prop({required: true})
  public previewImage!: string;

  @prop({ type: () => [String], required: true })
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousesTypes,
    required: true
  })
  public houseType!: HousesTypes;

  @prop({required: true})
  public bedrooms!: number;

  @prop({required: true})
  public guests!: number;

  @prop({required: true})
  public price!: number;

  @prop({ type: () => [String], required: true })
  public goods!: Goods[];

  @prop({ _id: false, required: true})
  public coordinates!: Coordinates;

  @prop({default: 0})
  public commentsCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public author!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
