// Http
import Http from './api';

// Export balance api
// @ts-ignore
export const readAll = (params?: { query?: any; projection?: any; options?: any }): Promise<any> => {
  return Http.get('/balance', params);
};
