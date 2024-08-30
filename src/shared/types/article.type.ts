import { ARTICLE_STATUS } from '../enums';
import { IMultiLang } from './multilang.type';
import { IFile } from './product.type';

export interface IArticle {
  id?: string;
  title?: IMultiLang;
  description?: IMultiLang;
  thumbnail?: IFile | null;
  isFeatured?: boolean;
  author?: string;
  status?: ARTICLE_STATUS;
  createdAt?: string;
  updatedAt?: string;
}
