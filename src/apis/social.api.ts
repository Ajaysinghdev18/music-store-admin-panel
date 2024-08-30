import { ISocial } from '../shared/types';
import Http from './api';

export const create = (content: ISocial) => {
  return Http.post('/social', content);
};


// @ts-ignore
export const readAll = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return Http.get('/social', params);
};
export const readAllByArtist = (artistId) => {
  return Http.get(`/social/artist/${artistId}`);
};
// @ts-ignore
export const read = (id: string) => {
  return Http.get(`/social/${id}`);
};
// @ts-ignore
export const update = (id: string, article) => {
  return Http.patch(`/social/${id}`, article);
};

export const deleteSocial = (id: string): Promise<any> => {
  return Http.delete(`/social/${id}`);
};
