import { IOrder } from '../orders.type';

export interface IOrderState {
  orders: [IOrder] | [];
  loading: boolean;
}
