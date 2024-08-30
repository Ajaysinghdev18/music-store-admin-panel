import { IMultiLang, IMultiLangType } from '../shared/types/multilang.type';

export const displayTranslation = (word: IMultiLang, lang: IMultiLangType = 'en') => {
  return word[lang] || word.en || word.nl || word.de || word.fr || word.es;
};
