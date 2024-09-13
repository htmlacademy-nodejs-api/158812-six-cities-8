import { UserTypes } from './user-types.enum.js';

export type User = {
  name: string;
  email: string;
  password: string;
  type: UserTypes;
  avatarUrl: string;
}
