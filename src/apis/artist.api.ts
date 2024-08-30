import { IArtist } from '../shared/types';
import Http from './api';

export const create = (artist: IArtist) => {
  return Http.post('/artists', artist);
};
// @ts-ignore
export const readAll = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return Http.get('/artists', params);
};
// @ts-ignore
export const read = (id: string) => {
  return Http.get(`/artists/${id}`);
};
// @ts-ignore
export const update = (id: string, artist: any) => {
  return Http.patch(`/artists/${id}`, artist);
};

export const remove = (id: string) => {
  return Http.delete(`/artists/${id}`);
};
// @ts-ignore
export const verifyUrlId = (id: string): Promise<any> => {
  return Http.get(`/artists/search/${id}`);
};