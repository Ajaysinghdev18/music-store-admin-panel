import { IUser } from '../users.type';

export interface IUserState {
  users: [IUser] | [];
  loading: boolean;
}
