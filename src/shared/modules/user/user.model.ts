import { Schema, Document, model } from 'mongoose';
import { User, UserTypes } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  email: String,
  avatarUrl: String,
  name: String,
  password: String,
  type: UserTypes
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
