// Dependencies
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { GalleryApi } from '../../../../apis';
// Component
import { Gallery } from '../../../../components/Gallery';
import { PAGE_LIMIT, ROUTES } from '../../../../constants';
import { getAccount } from '../../../../store/selectors';

interface IArtistListProps {
  title?: string;
}

export const GalleryListPage: FC<IArtistListProps> = ({ title = 'Gallery' }) => {
  // States
  // const [isLoading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [galleryList, setGalleryList] = useState([]);
  const { id } = useParams<{ id: string }>();
  const [artistId, setArtistId] = useState('');
  const account = useSelector(getAccount);
  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setArtistId(id);
    } else if (account?.artistId) {
      setArtistId(account.artistId);
    }
  }, [id]);

  //useEffect
  useEffect(() => {
    if (artistId) {
      GalleryApi.readAll(artistId, {
        options: {
          limit: PAGE_LIMIT,
          skip: pageNumber * PAGE_LIMIT
        }
      })
        .then((res) => {
          setGalleryList(res.galleries);
        })
        .catch((error) => console.log('Error ', error));
    }
  }, [artistId]);

  // Page change handler
  const handlePageChange = (pageN: number) => {
    setPageNumber(pageN);
  };

  // New handler
  const handleNew = () => {
    navigate(`/artists/${id}/gallery/new`);
  };

  const handleItemClick = (gallerId) => {
    navigate(`/artists/${id}/gallery/${gallerId}/detail`);
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
        isGallery={true}
      />
    </>
  );
};
