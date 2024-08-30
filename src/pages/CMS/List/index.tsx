import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CMSApi, EmailApi } from '../../../apis';
import { EmailTemplateList } from '../../../components/Email/EmailTemplateList';
import { ROUTES } from '../../../constants';
import { setSearchExp } from '../../../store/actions/header.actions';
import { CMSList } from '../../../components/CMS/CMSList';
import { SelectTemplateModal } from '../../../components/CMS/SelectTemplateModal';

export interface ICMSProps {
  children?: ReactNode;
}

// export interface IEmailItem {
//   name: string;
//   role: string;
//   title: string;
//   modifiedAt: string;
//   description: string;
//   thumbnail: string;
// }

export const CMSTemplatesPage: FC<ICMSProps> = ({ children }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [templateList, setTemplateList] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  const total = 20,
    Limits = 12;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    await CMSApi.getAllCMSTemplate().then((res) => {
      setTemplateList(res.templates);
    });
  };

  const handleNew = () => {
    setOpen(true);
  };

  const handlePageChanged = (pageN: number) => {
    setPageNumber(pageN);
  };

  const handleItemClicked = (id: string) => {
    navigate(ROUTES.CMS.DETAIL.replace(':id', id));
  };
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <SelectTemplateModal open={open} handleClose={handleClose} />
      <CMSList
        title={'CMS'}
        isLoading={false}
        templateList={templateList}
        totalPage={total}
        pageNumber={pageNumber}
        pageLimits={Limits}
        onNew={(handleNew)}
        onItemClicked={(id) => handleItemClicked(id)}
        onPageChanged={handlePageChanged}
      />
    </>
  );
};
