import { HttpV2 } from './api';

export const create = (gallery) => {
  return HttpV2.post('/gallery', gallery);
};
// @ts-ignore
export const readAll = (artistId, params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return HttpV2.get(`/gallery/${artistId}`, params);
};
// @ts-ignore
export const readAllGalleries = (params?: { query?: any; options?: any; projection?: any; aggregate?: any }) => {
  return HttpV2.get('/gallery/all', params);
};
// @ts-ignore
export const read = (id: string) => {
  return HttpV2.get(`/gallery/detail/${id}`);
};

export const mint = (nft: any) => {
  return HttpV2.post('/gallery/mint', nft);
};
// @ts-ignore
export const readAllNftsOfGallery = (id: string) => {
  return HttpV2.get(`/gallery/nfts/${id}`);
};
// @ts-ignore
export const update = (id: string, gallery) => {
  return HttpV2.patch(`/gallery/${id}`, gallery);
};

export const remove = (id: string) => {
  return HttpV2.delete(`/gallery/${id}`);
};
// @ts-ignore
export const verifyUrlId = (id: string): Promise<any> => {
  return HttpV2.get(`/gallery/search/${id}`);
};
