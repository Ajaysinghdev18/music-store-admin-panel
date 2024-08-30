import { IArticle } from '../shared/types';
import Http from './api';

export const create = (article: IArticle) => {
  return Http.post('/articles', article);
};
// @ts-ignore
export const readAll = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return Http.get('/articles', params);
};

export const read = (id: string) => {
  return Http.get(`/articles/${id}`);
};

export const update = (id: string, article) => {
  return Http.patch(`/articles/${id}`, article);
};

// @ts-ignore
export const remove = (id: string): Promise<any> => {
  return Http.delete(`/articles/${id}`);
};

// @ts-ignore
export const toggleFeature = (id: string, isFeatured?: boolean): Promise<any> => {
  return Http.post('/articles/toggle-feature', { id, isFeatured });
};
