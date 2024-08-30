import { ICategory } from '../types';

export class CategoryModel {
  id: string;
  name: string;
  visibleInNav: boolean;
  subCategories?: string[];
  createdAt?: string;
  updatedAt?: string;

  constructor(data: ICategory) {
    this.id = data.id || '';
    this.name = data.name;
    this.visibleInNav = data.visibleInNav;
    this.subCategories = data.subCategories;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
