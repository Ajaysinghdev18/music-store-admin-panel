import { ORDER_STATUS } from '../enums';
import { IProduct } from './product.type';

interface IOrderItem extends IProduct {
  productName: string;
}

export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  status: ORDER_STATUS;
  totalPrice: number;
  isPaid: boolean;
  isGift: boolean;
}
