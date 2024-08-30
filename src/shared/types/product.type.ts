import { CURRENCY, PRODUCT_TYPE } from '../enums';
import { ICategory } from './category.type';
import { IUser } from './users.type';

export interface IFile {
  filename: string;
  fieldname: string;
  path: string;
  size: number;
  name?: string;
  mimetype?: string;
  ipfsHash?: string;
  url?: string;
}


export interface IAuction {
  id?: string;
  ended?: boolean;
}

export interface IProduct {
  id?: string;
  productURLId?: string
  artistDetails?:any;
  productFeatures?: any;
  type: PRODUCT_TYPE;
  name: string;
  category: ICategory[] | string[];
  thumbnail: IFile | null;
  mask_thumbnail?: IFile | null;
  icon?: IFile | null;
  sign?: IFile | null;
  image?: IFile | null;
  video?: IFile | null;
  object?: IFile | null;
  price: number | undefined;
  description: string;
  currency: CURRENCY;
  sku?: string;
  statement?: string;
  music?: IFile;
  preview?: IFile;
  txHash?: string;
  createdAt?: string;
  updatedAt?: string;
  transferTxHash?: string;
  tokenId?: string;
  ownerAddress?: string;
  isFeatured?: boolean;
  isAuction?: boolean;
  auction?: IAuction | undefined;
  location?: string;
  startTime?: string | Date;
  endTime?: string | Date;
  attenders?: string[] | IUser[];
  check?: boolean;
  artistId?: string | undefined;
  gallery?: string;
  svg?: string;
  blockChain?: string;
  ipfsFileHash?: string;
  ipfsImgHash?: string;
  ipfsId?: string;
}
