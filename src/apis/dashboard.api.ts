// @ts-ignore
import Http from './api';

export const getDashboardData = (params?: any) => {
  return Http.get('/dashboard', params);
};
