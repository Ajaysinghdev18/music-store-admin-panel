import React, { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ViewEmailTemplate } from '../../../components/Email/View/ViewTemplate';
import { EMAIL_TYPE } from '../../../constants';
import { setSearchExp } from '../../../store/actions/header.actions';
import EasyMailViewTemplate from '../EasyEmail/View';

export interface INewEmailTemplatePageProps {
  children?: ReactNode;
}

export const ViewEmailTemplatePage: FC<INewEmailTemplatePageProps> = () => {
  const dispatch = useDispatch();
  const routes = useParams();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);
  return EMAIL_TYPE == 'easyemail' ? <EasyMailViewTemplate id={routes.id} /> : <ViewEmailTemplate id={routes.id} />;
};
