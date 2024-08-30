import Http from './api';

// @ts-ignore
export const readAll = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return Http.get('/histories', params);
};
