// Dependencies
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Gallery } from '../../../../../../components/Gallery';
import { ROUTES } from '../../../../../../constants';

// Component

const galleryList = new Array(100).fill(0).map(() => ({
  name: 'Andy Warhol',
  email: '@andy.warhol'
}));

interface IArtistListProps {
  title?: string;
}

export const ArtistDetailGalleryListPage: FC<IArtistListProps> = ({ title = 'Artist' }) => {
  // States
  // const [isLoading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  // const [totalPage, setTotalPage] = useState<number>(-1);

  // Navigate
  const navigate = useNavigate();

  // Page change handler
  const handlePageChange = (pageN: number) => {
    setPageNumber(pageN);
  };

  // New handler
  const handleNew = () => {
    navigate(ROUTES.ARTIST.NEW);
  };

  const handleItemClick = (index) => {
    if (index) navigate(ROUTES.ARTIST.GALLERY_DETAIL.replace(':id', '1111111'));
  };

  return (
    <>
      <Gallery
        title={title}
        data={galleryList}
        pageLimit={24}
        isLoading={false}
        totalPage={galleryList.length}
        pageNumber={pageNumber}
        onNew={handleNew}
        onPageChange={handlePageChange}
        onItemClick={handleItemClick}
      />
    </>
  );
};
