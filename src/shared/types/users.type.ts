// Export user type
import { ROLE } from '../enums';
import { IProduct } from './product.type';

export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  verify: boolean;
  block: boolean;
  birthday?: string;
  phoneNumber?: string;
  role: ROLE;
  avatar: any;
  avatarUrl: string;
  isKYCVerified: boolean;
  notificationSettings: string[];
  favouriteProjects: string[] | IProduct[];
  country: string;
  region: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  zip?: string;
  addressLine1?: string;
  addressLine2?: string;
  KYCStatus: string;
}
