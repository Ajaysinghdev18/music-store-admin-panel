// Http
// Types
import { ITerm } from '../shared/types';
import Http from './api';

// Export term apis
// @ts-ignore
export const create = (term: ITerm): Promise<any> => {
  return Http.post('/term', term);
};

// @ts-ignore
export const read = (): Promise<any> => {
  return Http.get('/term');
};

// @ts-ignore
export const update = (term: ITerm): Promise<any> => {
  return Http.patch('/term', term);
};
