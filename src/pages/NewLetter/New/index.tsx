import { FC, ReactNode } from 'react';

import { NewsLetterNew } from '../../../components/NewsLetter/New/NewsLetterNew';
import { EMAIL_TYPE } from '../../../constants';
import EasyMailNewNewsLetter from '../EasyEmail/New';


export interface INewEmailTemplatePageProps {
  children?: ReactNode;
}

export const NewsLetterNewPage: FC<INewEmailTemplatePageProps> = () => {
  return EMAIL_TYPE == 'easyemail' ? <EasyMailNewNewsLetter /> : <NewsLetterNew />;
};
