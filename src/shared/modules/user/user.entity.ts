import { User, UserTypes } from '../../types/index.js';

export class UserEntity implements User {
  public name: string;
  public email: string;
  public avatarUrl: string;
  public type: UserTypes;
  public password: string;
}
