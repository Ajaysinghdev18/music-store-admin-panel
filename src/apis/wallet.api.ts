import Http from './api';

export const readAll = (query: any) => {
  return Http.get('/wallet', { ...query });
};

export const downloadPrivateKey = (id: string, chain: string) => {
  return Http.post(`/wallet/${id}`, { chain });
};
