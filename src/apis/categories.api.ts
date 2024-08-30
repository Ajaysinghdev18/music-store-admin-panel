// Http
// Types
import { ICategory } from '../shared/types';
import Http from './api';

// Export categories apis
// @ts-ignore
export const create = (category: ICategory): Promise<any> => {
  return Http.post('/categories', category);
};

// @ts-ignore
export const read = (categoryId: string): Promise<any> => {
  return Http.get(`/categories/${categoryId}`);
};

// @ts-ignore
export const readAll = (params?: { query?: any; projection?: any; options?: any; aggregate?: any }): Promise<any> => {
  return Http.get('/categories', params);
};

// @ts-ignore
export const update = (categoryId: string, category: ICategory): Promise<any> => {
  return Http.patch(`/categories/${categoryId}`, category);
};

// @ts-ignore
export const remove = (categoryId: string): Promise<any> => {
  return Http.delete(`/categories/${categoryId}`);
};
