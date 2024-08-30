// Http
// Types
import { IUser } from '../shared/types';
import Http from './api';

// Export users apis
export const create = (user: Partial<IUser>) => {
  console.log(user);
  return Http.post('/users', user);
};

// @ts-ignore
export const read = (userId: string): Promise<any> => {
  return Http.get(`/users/${userId}`);
};

// @ts-ignore
export const readAll = (params?: { query?: any; projection?: any; options?: any; aggregate?: any }): Promise<any> => {
  return Http.get('/users', params);
};

// @ts-ignore
export const update = (userId, user: Partial<IUser>): Promise<any> => {
  console.log(user);
  return Http.patch(`/users/${userId}`, user);
};

export const changePasswordByAdmin = (userId, body: object): Promise<any> => {
  return Http.patch(`/users/${userId}/change-password`, body);
};

// @ts-ignore
export const remove = (userId: string): Promise<any> => {
  return Http.delete(`/users/${userId}`);
};

// @ts-ignore
export const resetPassword = (userId): Promise<any> => {
  return Http.patch(`/users/${userId}/reset-password`);
};

// @ts-ignore
export const toggleKYCVerified = (userId: string): Promise<any> => {
  return Http.post(`/users/toggle-kyc/${userId}`);
};

// @ts-ignore
export const getFavorites = (id): Promise<any> => {
  return Http.get(`/users/${id}/favorites`);
};
