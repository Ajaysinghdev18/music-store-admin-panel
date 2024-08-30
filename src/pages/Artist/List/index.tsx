// Dependencies
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArtistApi } from '../../../apis';
// Component
import { Gallery } from '../../../components/Gallery';
import { ROUTES } from '../../../constants';
import { setSearchExp } from '../../../store/actions/header.actions';
import { getSearchExp } from '../../../store/selectors';

interface IArtistListProps {
  title?: string;
}

export const ArtistListPage: FC<IArtistListProps> = ({ title = 'Artists' }) => {
  // States
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [galleryList, setGalleryList] = useState<any>('');

  const [searchParams] = useSearchParams();
  const searchExp = searchParams.get('key') || '';
  console.log('🚀 ~ file: index.tsx:19 ~ galleryList', galleryList);

  // Navigate
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    ArtistApi.readAll({
      options: {
        limit: 16,
        skip: pageNumber * 16
      },
      query: {
        name: searchExp
      }
    })
      .then((res) => {
        setGalleryList(res);
      })
      .catch((error) => console.log('Error ', error));
  }, [pageNumber, searchExp]);

  // Page change handler
  const handlePageChange = (pageN: number) => {
    setPageNumber(pageN);
  };

  // New handler
  const handleNew = () => {
    navigate(ROUTES.ARTIST.NEW);
  };

  const handleItemClick = (id) => {
    navigate(ROUTES.ARTIST.DETAIL.replace(':id', id));
  };

  return (
    <Gallery
      title={title}
      data={galleryList?.artists}
      pageLimit={galleryList?.pagination?.pageLimit}
      isLoading={false}
      totalPage={galleryList?.pagination?.total}
      pageNumber={pageNumber}
      onNew={handleNew}
      onPageChange={handlePageChange}
      onItemClick={handleItemClick}
      isGallery={false}
    />
  );
};
