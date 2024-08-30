import { Button, Grid, Stack, Switch, Typography } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
// Types
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ArticleApi } from '../../../../apis';
import {
  ConfirmDialog,
  DetailDialog,
  IColumn,
  RoundedButton,
  Table,
  TranslatableTextField
} from '../../../../components';
import { PAGE_LIMIT, REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../../constants';
import { COLORS } from '../../../../constants/colors';
import { ARTICLE_STATUS } from '../../../../shared/enums';
import { IArticle, Order } from '../../../../shared/types';
import { setSearchExp } from '../../../../store/actions/header.actions';
import { getSearchExp } from '../../../../store/selectors';
// Styles
import * as S from './styles';

export const ArticleListPage: FC = () => {
  const [article, setArticle] = useState<IArticle[]>([]);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [visiblePreviewDialog, setVisiblePreviewDialog] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<IArticle>();
  const navigate = useNavigate();
  const searchExp = useSelector(getSearchExp);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  const fetchData = () => {
    ArticleApi.readAll({
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      },
      query: {
        // title: searchExp
      }
    })
      .then((res) => {
        setArticle(res.articles);
        setTotalPage(res.pagination.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNew = () => {
    navigate(ROUTES.DOCUMENT.ARTICLE.NEW);
  };

  const handleEdit = (id = '') => {
    navigate(ROUTES.DOCUMENT.ARTICLE.EDIT.replace(':id', id));
  };

  const handleView = (id: string) => {
    ArticleApi.read(id)
      .then((res) => {
        setPreviewArticle(res.article);
        setVisiblePreviewDialog(true);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteConfirmed = () => {
    ArticleApi.remove(selectedProductId as string)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id: string) => {
    setSelectedProductId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  const handlePageChange = (pageN: number) => {
    setPageNumber(pageN);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  const handleFeature = (id: string, isFeature: boolean) => {
    ArticleApi.toggleFeature(id, isFeature)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, order, orderBy, searchExp]);

  const columns: IColumn[] = [
    {
      field: 'author',
      title: 'Author',
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <Typography variant="body2">{row.author}</Typography>
        </Stack>
      )
    },
    {
      title: 'Featured',
      render: (row) => (
        <Switch
          defaultChecked={row?.isFeatured}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFeature(row?.id as string, e.target.checked)}
        />
      )
    },
    {
      field: 'createdAt',
      title: 'Create At',
      render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
    },
    {
      field: 'updatedAt',
      title: 'Updated At',
      render: (row) => moment(row.updatedAt).format('HH:mm - DD MMMM YYYY')
    },
    {
      field: 'category',
      title: 'Category',
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <RoundedButton
            label={row.status}
            background={
              row.status == ARTICLE_STATUS.DRAFT
                ? COLORS.BLUELIGHT
                : row.status == ARTICLE_STATUS.PUBLISHED
                ? COLORS.BLUE
                : '#7d7dff'
            }
          />
        </Stack>
      )
    }
  ];

  return (
    <>
      <Table
        title="Articles"
        data={article}
        columns={columns}
        totalPage={totalPage}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        onNew={handleNew}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      <ConfirmDialog
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
      <DetailDialog
        title={previewArticle?.title?.en}
        open={visiblePreviewDialog}
        onClose={() => setVisiblePreviewDialog(false)}
        actions={
          <>
            <S.CancelButton variant="text" size="medium" onClick={() => setVisiblePreviewDialog(false)}>
              Cancel
            </S.CancelButton>
            <S.SaveButton variant="contained" size="medium" onClick={() => handleEdit(previewArticle?.id)}>
              Edit
            </S.SaveButton>
          </>
        }
      >
        <Grid xs={6} spacing={12}>
          <S.PreviewContentItem>
            <img src={`${REACT_APP_API_ASSETS_SERVER}/${previewArticle?.thumbnail?.fieldname}/${previewArticle?.thumbnail?.filename}`} alt="" />
          </S.PreviewContentItem>
        </Grid>

        <Grid xs={6} spacing={12}>
          <S.PreviewContentItem>
            <Typography variant="body1">{previewArticle?.author}</Typography>
            <Typography variant="label">{moment(previewArticle?.createdAt).format('yyyy/MM/DD hh:mm:ss')}</Typography>
          </S.PreviewContentItem>
        </Grid>
        <Grid item xs={6}>
          <S.PreviewContentItem>
            <Typography variant="body1">{previewArticle?.isFeatured ? 'Featured' : 'Not featured'}</Typography>{' '}
            <RoundedButton
              label={previewArticle?.status}
              background={
                previewArticle?.status == ARTICLE_STATUS.DRAFT
                  ? COLORS.BLUELIGHT
                  : previewArticle?.status == ARTICLE_STATUS.PUBLISHED
                  ? COLORS.BLUE
                  : '#7d7dff'
              }
            />
          </S.PreviewContentItem>
        </Grid>
        <Grid xs={12}>
          <S.PreviewContentItem>
            <TranslatableTextField
              fullWidth
              multiline
              minRows={5}
              name="description"
              label="Article"
              value={previewArticle?.description}
              disabled
            />
          </S.PreviewContentItem>
        </Grid>
      </DetailDialog>
    </>
  );
};
