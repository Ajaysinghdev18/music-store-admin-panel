// Http
// Types
import { IPrivacy } from '../shared/types';
import Http from './api';

// Export privacy apis
// @ts-ignore
export const create = (privacy: IPrivacy): Promise<any> => {
  return Http.post('/privacy', privacy);
};

// @ts-ignore
export const read = (): Promise<any> => {
  return Http.get('/privacy');
};

// @ts-ignore
export const update = (privacy: IPrivacy): Promise<any> => {
  return Http.patch('/privacy', privacy);
};
