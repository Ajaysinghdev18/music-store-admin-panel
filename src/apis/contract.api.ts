import { IContract } from '../shared/types';
import Http, { HttpV2 } from './api';

export const create = (contract: IContract) => {
  return HttpV2.post('/contract', contract);
};

export const contractById = (id: string) => {
  return HttpV2.get(`/contract/${id}`);
};

// @ts-ignore
export const readAll = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return HttpV2.get('/contract', params);
};
// @ts-ignore
export const read = (id: string) => {
  return HttpV2.get(`/contract/${id}`);
};
// @ts-ignore
export const update = (id: string, article) => {
  return HttpV2.patch(`/contract/${id}`, article);
};

export const readAllNftsByArtist = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return HttpV2.get('/contract/artist/nfts', params);
};

export const deleteNft = (id: string): Promise<any> => {
  return HttpV2.delete(`/contract/artist/nft/${id}`);
};
