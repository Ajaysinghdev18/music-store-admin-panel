// Dependencies
import { Avatar, Chip, Stack, Switch, Typography } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Apis
import { ProductsApi } from '../../../apis';
// Components
import { ConfirmDialog, IColumn, Table } from '../../../components';
// Global constants
import { PAGE_LIMIT, ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { PRODUCT_TYPE } from '../../../shared/enums';
import { ProductModel } from '../../../shared/models';
// Types
import { IAccount, IProduct, Order } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import { getAccount, getSearchExp } from '../../../store/selectors';

// Export image page
export const ImageListPage: FC = () => {
  // States
  const [images, setImages] = useState<IProduct[]>([]);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [visibleDeleteAlertDialog, setVisibleDeleteAlertDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [orderId, setOrderId] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);
  const searchExp = useSelector(getSearchExp);
  const account: IAccount = useSelector(getAccount);
  // Get navigate from hook
  const navigate = useNavigate();

  // Fetch images
  const fetchProducts = () => {
    setIsLoading(true);
    const newQuery: any = {
      type: PRODUCT_TYPE.IMAGE,
      name: searchExp
    };
    if (account?.role == 'artist') {
      newQuery.artistId = account?.artistId;
    }
    ProductsApi.readAll({
      query: {
        ...newQuery
      },
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      }
    })
      .then((res) => {
        setImages(res.products.map((product) => new ProductModel(product)));
        setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // New handler
  const handleNew = () => {
    navigate(ROUTES.IMAGE.NEW);
  };

  // Routing handler
  const orderDetailHandler = () => {
    if (orderId) {
      navigate(ROUTES.IMAGE.DETAIL.replace(':id', orderId));
    }
  };

  // Delete handler
  const handleDelete = (id: string) => {
    setSelectedProductId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  // Delete confirm handler
  const handleDeleteConfirmed = async () => {
    try {
      const res = await ProductsApi.remove(selectedProductId as string);
      if (res.orderId) {
        setVisibleDeleteAlertDialog(true);
        setOrderId(res.orderId);
      } else {
        await fetchProducts();
      }
    } catch (error) {
      console.log(error);
      setVisibleDeleteAlertDialog(true);
    }
  };

  // Edit handler
  const handleEdit = (id: string) => {
    navigate(ROUTES.IMAGE.EDIT.replace(':id', id));
  };

  // Feature handler
  const handleFeature = (id: string, isFeature: boolean) => {
    ProductsApi.toggleFeature(id, isFeature)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // Page change handler
  const handlePageChange = (pageN: number) => {
    setPageNumber(pageN);
  };

  // Sort handler
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  // View handler
  const handleView = (id: string) => {
    navigate(ROUTES.IMAGE.DETAIL.replace(':id', id));
  };

  // Constant
  const columns: IColumn[] = [
    {
      title: 'Name',
      render: (row) => (
        <Stack direction="row" spacing={12} alignItems="center">
          <Avatar src={row.getAvatarUrl} alt="product-image" />
          <Typography variant="body2">{row.name}</Typography>
        </Stack>
      )
    },
    {
      field: 'category',
      title: 'Category',
      render: (row) => (
        <Stack direction="row" spacing={4}>
          {row.categoryNames.map((category, index) => (
            <Chip
              key={index}
              label={category}
              sx={{ borderRadius: '0.5rem', background: COLORS.BLUELIGHT, color: 'white' }}
            />
          ))}
        </Stack>
      )
    },
    {
      field: 'price',
      title: 'Price',
      render: (row) => `${row.currency}${row.price}`
    },
    {
      title: 'Featured',
      render: (row) => (
        <Switch
          defaultChecked={row?.isFeatured}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFeature(row?.id as string, e.target.checked)}
          sx={{ scale: '0.8' }}
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
    }
  ];

  // On pageNumber, order, orderBy & searchKey changed
  useEffect(() => {
    fetchProducts();
  }, [pageNumber, order, orderBy, searchExp]);

  // Return products page
  return (
    <>
      <Table
        title="Images"
        data={images}
        columns={columns}
        totalPage={totalPage}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
        order={order}
        orderBy={orderBy}
        isLoading={isLoading}
        onSort={handleSort}
        onNew={handleNew}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      <ConfirmDialog
        title={'Confirm Dialog'}
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
      <ConfirmDialog
        title={'Alert'}
        description="You can not remove the image. Because there is an order which is bind with the current song."
        visible={visibleDeleteAlertDialog}
        setVisible={setVisibleDeleteAlertDialog}
        onConfirmed={orderDetailHandler}
        confirmButtonText="Go to Order Details"
        noButtonText="Close"
      />
    </>
  );
};
