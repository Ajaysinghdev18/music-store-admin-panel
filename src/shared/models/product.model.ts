import { REACT_APP_API_ASSETS_SERVER } from '../../constants';
import { CURRENCY, PRODUCT_TYPE } from '../enums';
import { IAuction, IFile, IProduct } from '../types';
import { CategoryModel } from './category.model';

export class ProductModel {
  id: string;
  type: PRODUCT_TYPE;
  name: string;
  productFeatures?: any;
  artistDetails?:any;
  category: CategoryModel[] | [];
  thumbnail: IFile;
  mask_thumbnail?: IFile;
  icon?: IFile;
  sign?: IFile;
  price: number;
  description: string;
  currency: CURRENCY;
  sku?: string;
  statement?: string;
  music?: IFile;
  video?: IFile;
  object?: IFile;
  preview?: IFile;
  image?: IFile;
  txHash?: string;
  createdAt?: string;
  updatedAt?: string;
  transferTxHash?: string;
  tokenId?: string;
  ownerAddress?: string;
  isFeatured?: boolean;
  isAuction?: boolean;
  auction?: IAuction;
  location?: string;
  startTime?: string | Date;
  endTime?: string | Date;

  get getAvatarUrl(): string {
    return `${REACT_APP_API_ASSETS_SERVER}/${this.icon?.fieldname}/${this.icon?.filename}?timestamp=${Date.now()}`;
  }

  get getThumbnailUrl() {
    return `${REACT_APP_API_ASSETS_SERVER}/${this.thumbnail?.fieldname}/${this.thumbnail?.filename}?timestamp=${Date.now()}`;
  }

  get thumbnailMaskUrl(): string {
    return `${REACT_APP_API_ASSETS_SERVER}/${this.mask_thumbnail?.fieldname}/${this.mask_thumbnail?.filename}`;
  }

  get getSignUrl(): string {
    return `${REACT_APP_API_ASSETS_SERVER}/${this.sign?.fieldname}/${this.sign?.filename}`;
  }

  get getVideoPreview(): string {
    return `${REACT_APP_API_ASSETS_SERVER}/${this.video?.fieldname}/${this.video?.filename}`;
  }

  get categoryNames(): string[] {
    return this.category.map((cat) => cat.name);
  }

  constructor(init?: IProduct) {
    const data = {
      id: '',
      type: PRODUCT_TYPE.SONG,
      name: '',
      thumbnail: {},
      price: 0,
      description: '',
      currency: CURRENCY.DOLLAR,
      isFeatured: false,
      isAuction: false,
      ...init
    };

    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.category = data.category?.map((cat) => new CategoryModel(cat)) || [];
    this.thumbnail = data.thumbnail as IFile;
    this.image = data.image as IFile;
    this.mask_thumbnail = data.mask_thumbnail as IFile;
    this.icon = data.icon as IFile;
    this.sign = data.sign as IFile;
    this.price = data.price;
    this.description = data.description;
    this.currency = data.currency;
    this.sku = data.sku;
    this.statement = data.statement;
    this.music = data.music;
    this.video = data.video as IFile;
    this.preview = data.preview as IFile;
    this.txHash = data.txHash;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.transferTxHash = data.transferTxHash;
    this.tokenId = data.tokenId;
    this.ownerAddress = data.ownerAddress;
    this.isFeatured = data.isFeatured;
    this.isAuction = data.isAuction;
    this.auction = data.auction;
    this.location = data.location;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.object = data.object as IFile;
    this.productFeatures = data.productFeatures;
    this.artistDetails = data.artistDetails;
  }
}
