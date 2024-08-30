import { IProduct } from './product.type';

export interface ICart {
  id: string;
  fingerPrint: string;
  total: number;
  products: IProduct[];
  userId?: string;
}
