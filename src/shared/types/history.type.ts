import { IUser } from './users.type';

export interface IHistory {
  id?: string;
  user: IUser;
  content?: any;
  createdAt?: string;
  updatedAt?: string;
}
