import Http from './api';

// @ts-ignore
export const readAll = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return Http.get('/kyc', params);
};

export const readById = (id: string) => {
  return Http.get(`/kyc/${id}`);
};

export const updateById = (id: string, values: any) => {
  return Http.patch(`/kyc/${id}`, values);
};
