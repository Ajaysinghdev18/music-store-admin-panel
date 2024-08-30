// Dependencies
import { Chip } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Apis
import { OrdersApi } from '../../../apis';
// Components
import { IColumn, RoundedButton, Table } from '../../../components';
// Global constants
import { PAGE_LIMIT, ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { ORDER_STATUS } from '../../../shared/enums';
// Interfaces
import { Order } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import { geOrdersAction } from '../../../store/actions/orders.actions';
import { getSearchExp } from '../../../store/selectors';
import { getOrdersSelector } from '../../../store/selectors/orders.selector';

export const StatusLabel = {
  Created: 'Processing',
  Processed: 'Delivered',
  Cancelled: 'Cancelled',
  Failed: 'Failed'
};

// Export orders page
export const OrderListPage: FC = () => {
  // States
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(-1);
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const orders = useSelector(getOrdersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  const searchExp = useSelector(getSearchExp);
  // Fetch order
  const fetchUsers = () => {
    setIsLoading(true);
    OrdersApi.readAll({
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      },
      query: {
        phoneNumber: searchExp
      }
    })
      .then((res) => {
        dispatch(geOrdersAction(res.orders));
        setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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

  // Constants
  const columns: IColumn[] = [
    {
      field: '_id',
      title: 'ID',
      render: (row) => <Link to={ROUTES.ORDER.DETAIL.replace(':id', row._id)}>{row._id}</Link>
    },
    {
      field: 'user',
      title: 'User',
      render: (row) => row.email
    },
    {
      field: 'status',
      title: 'Status',
      render: (row) => (
        <RoundedButton
          label={StatusLabel[row.status]}
          background={
            (row.status === ORDER_STATUS.CREATED && '#404b7c') ||
            (row.status === ORDER_STATUS.FAILED && '#ff5a00') ||
            (row.status === ORDER_STATUS.CANCELLED && '#ffde00') ||
            (row.status === ORDER_STATUS.PROCESSED && '#00f0ff') ||
            'default'
          }
          textColor={row.status === ORDER_STATUS.CREATED ? 'white' : 'black'}
        />
      )
    },
    {
      field: 'paymentMethod',
      title: 'Payment Method',
      render: (row) =>
        row.paymentMethod ? (
          <RoundedButton
            label={row.paymentMethod.split('-').slice()[0]}
            background={row.paymentMethod !== 'credit' ? COLORS.BLUEGRAY : COLORS.BLUE}
            widthSize={'6rem'}
          />
        ) : (
          '_'
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
      field: 'totalPrice',
      title: 'Total Amount',
      render: (row) => row.totalPrice,
      align: 'right'
    }
  ];

  // On pageNumber, pageLimit, order, orderBy changed
  useEffect(() => {
    fetchUsers();
  }, [pageNumber, order, orderBy, searchExp]);

  // Return order page
  return (
    <Table
      title="Orders"
      data={orders}
      columns={columns}
      totalPage={totalPage}
      pageNumber={pageNumber}
      onPageChange={handlePageChange}
      order={order}
      orderBy={orderBy}
      isLoading={isLoading}
      onSort={handleSort}
      disableCreate={true}
    />
  );
};
