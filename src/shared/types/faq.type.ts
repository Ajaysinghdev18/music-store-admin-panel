import { IMultiLang } from './multilang.type';

export interface IFaqQuestion {
  id?: string;
  title: IMultiLang;
  answer: IMultiLang;
  category: IFaqCategory;
}

export interface IFaqCategory {
  id?: string;
  title: IMultiLang;
  questions: IFaqQuestion[];
}
