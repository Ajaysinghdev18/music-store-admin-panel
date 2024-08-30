// Http
// Types
import { IUs } from '../shared/types';
import Http from './api';

// Export us apis
// @ts-ignore
export const create = (us: IUs): Promise<any> => {
  return Http.post('/us', us);
};

// @ts-ignore
export const readAll = (): Promise<any> => {
  return Http.get('/us');
};

// @ts-ignore
export const update = (usId: string, us: IUs): Promise<any> => {
  return Http.patch(`/us/${usId}`, us);
};

// @ts-ignore
export const remove = (usId: string): Promise<any> => {
  return Http.delete(`/us/${usId}`);
};
