import { FC, ReactNode } from 'react';

import { NewEmailTemplate } from '../../../components/Email/New/NewTemplate';
import { EMAIL_TYPE } from '../../../constants';
import EasyMailNewTemplate from '../EasyEmail/New';

export interface INewEmailTemplatePageProps {
  children?: ReactNode;
}

export const NewEmailTemplatePage: FC<INewEmailTemplatePageProps> = () => {
  return EMAIL_TYPE == 'easyemail' ? <EasyMailNewTemplate /> : <NewEmailTemplate />;
};
