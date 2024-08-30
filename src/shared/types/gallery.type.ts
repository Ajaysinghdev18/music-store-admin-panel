export interface IGallery {
  _id?: string;
  name?: string;
  description?: string;
  thumbnail: any;
  contractId: string;
  isFeatured: boolean;
  chain: string;
}
