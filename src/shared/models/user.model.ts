import { ROLE } from '../enums';
import { IProduct, IUser } from '../types';
import { ProductModel } from './product.model';

export class UserModel {
  id: string;
  name: string;
  email: string;
  verify: boolean;
  birthday?: string;
  phoneNumber?: string;
  role: ROLE;
  notificationSettings: string[];
  favouriteProducts: string[] | ProductModel[] | (string | ProductModel)[];
  createdAt: string;
  updatedAt: string;
  language?: string;
  currency?: string;
  zip?: string;
  region?: string;
  city?: string;
  country?: string;
  addressLine1?: string;
  username?: string;

  constructor(init?: IUser) {
    const data = {
      id: '',
      name: '',
      email: '',
      verify: false,
      role: ROLE.USER,
      notificationSettings: [],
      favouriteProducts: [],
      createdAt: '',
      updatedAt: '',
      language: '',
      currency: '',
      zip: '',
      region: '',
      city: '',
      country: '',
      addressLine1: '',
      username: '',
      ...init
    };

    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.verify = data.verify;
    this.birthday = data.birthday;
    this.phoneNumber = data.phoneNumber;
    this.role = data.role;
    this.notificationSettings = data.notificationSettings;
    this.language = data.language;
    this.currency = data.currency;
    this.zip = data.zip;
    this.region = data.region;
    this.city = data.city;
    this.country = data.country;
    this.addressLine1 = data.addressLine1;
    this.username = data.username;
    this.favouriteProducts = data.favouriteProducts.map((item: string | IProduct) => {
      if (typeof item === 'string') return item;
      return new ProductModel(item);
    });
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
