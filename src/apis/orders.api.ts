// Http
import { IUser } from '../shared/types';
import Http from './api';

// Export products apis
// @ts-ignore
export const readAll = (params?: { query?: any; projection?: any; options?: any; aggregate?: any }): Promise<any> => {
  return Http.get('/checkout/orders', params);
};

export const read = (orderId: string): Promise<{ order: IOrderReadRes; success: boolean }> => {
  return Http.get(`/checkout/orders/${orderId}`);
};

export const purchaseNfts = (params?: {
  query?: any;
  projection?: any;
  options?: any;
  aggregate?: any;
}): Promise<any> => {
  return Http.get('/checkout/purchase/nfts', params);
};

// @ts-ignore
export const updateOrderStatus = (orderId, status): Promise<any> => {
  return Http.patch('/checkout/orders/status', { orderId, status });
};

export interface IOrderReadRes {
  _id: string;
  orderItems: OrderItem[];
  phoneNumber: string;
  username: string;
  email: string;
  note: string;
  isGift: boolean;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  firstName: string;
  lastName: string;
  discount?:number;
  userId: IUser;
  vat: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  cryptoInfo: CryptoInfo;
  nfts: NftDetail[];
  taxamoInvoiceNumber?: string;
  taxamoId?: string;
  invoiceAddress?: any;
}

interface TokenDetail {
  to: string;
  chain: string;
  transactionHash: string;
}
interface NftDetail {
  details: TokenDetail;
  tokenId: string;
}

interface OrderItem {
  productName: string;
  features?: any;
  price: number;
  type: string;
  description: string;
  thumbnail: Thumbnail;
  productId: string;
  _id: string;
  category: string[];
  currency: string;
}

interface Thumbnail {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  url: string;
}

interface CryptoInfo {
  _id: string;
  userId: string;
  currency: string;
  type: string;
  amount: number;
  status: string;
  txId: string;
  createdAt: string;
  __v: number;
}
