import { IFile } from './product.type';
import { IUser } from './users.type';

export interface IArtist {
  deploymentExecution?: string;
  id?: string;
  name?: string;
  bio?: string;
  email?: string;
  createdAt?: Date;
  thumbnail?: IFile | undefined;
  isFeatured?: boolean;
  instagram?: string;
  discord?: string;
  website?: string;
  spotify?: string;
  twitter?: string;
  facebook?: string;
  apiKey?: string;
  paypal?: string;
  subscriber?:IUser[];
  ethereumWallet?: string;
  casperWallet?: string;
  password?: string;
  confirmPassword?: string;
  nftsCount?: number;
  sellNfts?: number;
}
