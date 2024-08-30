import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmailApi, NewsLetterApi } from '../../../apis';
import { NewsLetterList } from '../../../components/NewsLetter/NewsLetterList';
import { ROUTES } from '../../../constants';
import { useSelector } from 'react-redux';
import { getAccount } from '../../../store/selectors';
import { IAccount } from '../../../shared/types';

export interface INewsLetterPageProps {
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

export const NewsLetterPage: FC<INewsLetterPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [templateList, setTemplateList] = useState<any>([]);
  const account: IAccount = useSelector(getAccount);

  const total = 20,
    Limits = 12;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    await NewsLetterApi.getAllNewsLetter({
      query: {
        artistId: account.artistId
      }
    }).then((res) => {
      setTemplateList(res.newsLetters);
    });
  };

  const handleNew = () => {
    navigate(ROUTES.NEWSLETTER.NEW);
  };

  const handlePageChanged = (pageN: number) => {
    setPageNumber(pageN);
  };

  const handleItemClicked = (id: string) => {
    navigate(ROUTES.NEWSLETTER.VIEW.replace(':id', id));
  };

  return (
    <NewsLetterList
      title={'News Letters'}
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
