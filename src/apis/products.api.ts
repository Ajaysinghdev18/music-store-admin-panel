// Http
// Types
import { IProduct } from '../shared/types';
import Http from './api';

// Export products apis
// @ts-ignore
export const create = (product: IProduct): Promise<any> => {
  return Http.post('/products', product);
};

// @ts-ignore
export const read = (productId: string): Promise<any> => {
  return Http.get(`/products/${productId}`);
};

// @ts-ignore
export const readAll = (params?: { query?: any; projection?: any; options?: any; aggregate?: any }): Promise<any> => {
  return Http.get('/products', params);
};

// @ts-ignore
export const update = (productId: string, product: IProduct): Promise<any> => {
  return Http.patch(`/products/${productId}`, product);
};

// @ts-ignore
export const remove = (productId: string): Promise<any> => {
  return Http.delete(`/products/${productId}`);
};

// @ts-ignore
export const toggleFeature = (productId: string, isFeatured?: boolean): Promise<any> => {
  return Http.post('/products/toggle-feature', { productId, isFeatured });
};

// @ts-ignore
export const toggleAuction = (productId: string, isAuction?: boolean): Promise<any> => {
  return Http.post('/products/toggle-auction', { productId, isAuction });
};


// @ts-ignore
export const getTransactionDetails = (txHash: string, tokenId: string): Promise<any> => {
  return Http.get(`/products/nft/${txHash}?tokenId=${tokenId}`);
};

// @ts-ignore
export const transferNftToken = (to: string, txHash: string): Promise<any> => {
  return Http.post(`/products/nft/transfer/${to}`, { txHash });
};
// @ts-ignore
export const get3DObjectData = (id: string): Promise<any> => {
  return Http.get(`/products/3d-object/${id}`);
};

// @ts-ignore
export const verifyUrlId = (id: string): Promise<any> => {
  return Http.get(`/products/search/${id}`);
};
