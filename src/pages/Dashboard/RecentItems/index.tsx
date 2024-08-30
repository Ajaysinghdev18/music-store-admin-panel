// Dependencies
import { Avatar, Box, Button, Card, CardHeader, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';

import { ProductsApi } from '../../../apis';
import { IColumn, Table } from '../../../components';
import { RECENT_PAGE_LIMIT } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { PRODUCT_TYPE } from '../../../shared/enums';
import { ProductModel } from '../../../shared/models';
import { IProduct, Order } from '../../../shared/types';
import * as S from './styles';

// Export recent items
const RecentItems: FC = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');

  // Fetch songs
  const fetchProducts = () => {
    setIsLoading(true);
    if (isLoading) {
      // add your code
    }
    ProductsApi.readAll({
      options: {
        limit: RECENT_PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      }
    })
      .then((res) => {
        setItems(res.products.map((product) => new ProductModel(product)));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Constant
  const columns: IColumn[] = [
    {
      title: 'Name',
      sort: false,
      render: (row) => (
        <Stack direction="row" spacing={12} alignItems="center">
          <Avatar src={row.avatarUrl} alt="product-image" />
          <Typography variant="body2">{row.name}</Typography>
        </Stack>
      )
    },
    {
      title: 'Type',
      sort: false,
      render: (row) => (
        <Stack direction="row" spacing={4}>
          {row.type == PRODUCT_TYPE.SONG ? 'Music NFT' : 'Event ticket'}
        </Stack>
      )
    },
    {
      title: 'Listed',
      sort: false,
      render: (row) => moment(row.createdAt).format('DD MMMM YYYY')
    },
    {
      title: 'Price',
      sort: false,
      render: (row) => `${row.currency}${row.price}`
    }
  ];

  // Sort handler
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  // On mounted
  useEffect(() => {
    fetchProducts();
  }, [order, orderBy]);

  // Return recent items
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '2.5rem',
        boxShadow: '0px 7px 14px 2px rgb(100 100 100 / 24%) !important',
        paddingX: '2.5rem'
      }}
    >
      <CardHeader
        title={
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography color={COLORS.BLACK} fontWeight="600" fontSize={26} paddingY={16}>
              Recent Items
            </Typography>
            <S.ViewButton>View all</S.ViewButton>
          </Box>
        }
        sx={{ mb: '1rem' }}
      />
      <Table
        data={items}
        columns={columns}
        pageLimit={RECENT_PAGE_LIMIT}
        isMobileDisabled={true}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
      />
    </Card>
  );
};

// Export recent items
export default RecentItems;
