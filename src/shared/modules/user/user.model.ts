import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for password path is 6'],
    maxlength: [12, 'Max length for password is 12'],
  },
  type: {
    type: Boolean,
    required: true,
  }
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
