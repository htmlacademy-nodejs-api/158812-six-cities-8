import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User, UserTypes } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarUrl: string;

  @prop({ required: true })
  public type: UserTypes;

  @prop({ required: true })
  public password: string;
}

export const UserModel = getModelForClass(UserEntity);
