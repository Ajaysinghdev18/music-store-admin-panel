import { IUserInfo } from '../shared/types';
import Http from './api';

// @ts-ignore
export const signIn = (data: IUserInfo): Promise<any> => {
  return Http.post('/auth/login', data);
};
// @ts-ignore
export const me = (): Promise<any> => {
  return Http.get('/auth/me');
};
