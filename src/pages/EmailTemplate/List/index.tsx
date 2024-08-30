import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { EmailApi } from '../../../apis';
import { EmailTemplateList } from '../../../components/Email/EmailTemplateList';
import { ROUTES } from '../../../constants';
import { setSearchExp } from '../../../store/actions/header.actions';

export interface IEmailTemplateProps {
  children?: ReactNode;
}

export interface IEmailItem {
  name: string;
  role: string;
  title: string;
  modifiedAt: string;
  description: string;
  thumbnail: string;
}

export const EmailTemplatePage: FC<IEmailTemplateProps> = ({ children }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [templateList, setTemplateList] = useState<any>([]);

  const total = 20,
    Limits = 12;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    await EmailApi.getAllEmailTemplate().then((res) => {
      setTemplateList(res.templates);
    });
  };

  const handleNew = () => {
    navigate(ROUTES.EMAIL.NEW);
  };

  const handlePageChanged = (pageN: number) => {
    setPageNumber(pageN);
  };

  const handleItemClicked = (id: string) => {
    navigate(ROUTES.EMAIL.VIEW.replace(':id', id));
  };

  return (
    <EmailTemplateList
      title={'Email Templates'}
      isLoading={false}
      templateList={templateList}
      totalPage={total}
      pageNumber={pageNumber}
      pageLimits={Limits}
      onNew={handleNew}
      onItemClicked={handleItemClicked}
      onPageChanged={handlePageChanged}
    />
  );
};
