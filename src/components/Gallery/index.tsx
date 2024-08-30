// Dependencies
import { Avatar, Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import TableToolbar from './Toolbar';
import * as S from './styles';

// Components

// Interface
interface IGalleryProps {
  title?: string;
  data: any[];
  pageLimit?: number;
  isLoading?: boolean;
  totalPage?: number;
  pageNumber?: number;
  onPageChange?: (page: number) => void;
  onNew?: () => void;
  onItemClick?: (index: number) => void;
  isGallery?: boolean;
}

export const Gallery = ({
  title,
  data = [],
  pageLimit = 24,
  isLoading = true,
  totalPage = 0,
  pageNumber = 0,
  onPageChange,
  onNew,
  onItemClick,
  isGallery
}: IGalleryProps) => {
  // Page change handler
  const handlePageChange = (event: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage - 1);
    }
  };
  // Check pagination visibility
  const isVisiblePagination = useMemo(
    () => !isLoading && data.length > 0 && onPageChange,
    [isLoading, data, onPageChange]
  );

  return (
    <S.Container>
      {title && <TableToolbar isLoading={isLoading} title={title} onNew={onNew} />}
      <Grid container spacing={16}>
        {!isGallery &&
          data.map((artist, index) => (
            <Grid direction={'column'} item xs={12} sm={6} md={3} lg={2} key={index}>
              <S.ArtistList sx={{ cursor: 'pointer' }} onClick={() => onItemClick && onItemClick(artist.id)}>
                <Avatar src={artist.thumbnail ? artist.thumbnail : ''} sx={{ width: 80, height: 80 }} />
                <Typography variant="subtitle" sx={{ mt: 10, color: 'black', fontSize: '1rem', fontWeight: 600 }}>
                  {artist.name}
                </Typography>
                {/*<Typography variant="subtitle" sx={{ mt: 12, color: '#707070' }}>*/}
                {/*  {artist.email.substring(0, 10)}...*/}
                {/*</Typography>*/}
              </S.ArtistList>
            </Grid>
          ))}
        {isGallery &&
          data
            .slice(pageNumber * pageLimit, Math.min((pageNumber + 1) * pageLimit, totalPage))
            .map((gallery, index) => (
              <Grid item xs={12} sm={6} md={3} lg={3} spacing={35} key={index}>
                <S.ArtistList sx={{ cursor: 'pointer' }} onClick={() => onItemClick && onItemClick(gallery.id)}>
                  <Avatar src={gallery.thumbnail} sx={{ width: 80, height: 80 }} />
                  <Typography variant="subtitle" sx={{ mt: 40 }}>
                    {gallery.name}
                  </Typography>
                  <Typography variant="label" color="success.main" sx={{ mt: 9 }}>
                    {gallery.email}
                  </Typography>
                </S.ArtistList>
              </Grid>
            ))}
      </Grid>
      {isVisiblePagination && (
        <S.Pagination count={Math.ceil(totalPage / pageLimit)} page={pageNumber + 1} onChange={handlePageChange} />
      )}
    </S.Container>
  );
};
