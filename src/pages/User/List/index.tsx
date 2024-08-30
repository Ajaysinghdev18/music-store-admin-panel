// Dependencies
import { Avatar, Stack, Typography } from '@mui/material';
import { countries } from 'countries-list';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Apis
import { UsersApi } from '../../../apis';
// Components
import { ConfirmDialog, IColumn, RoundedButton, Table } from '../../../components';
// Global constants
import { PAGE_LIMIT, ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { ROLE } from '../../../shared/enums';
// Types
import { Order } from '../../../shared/types';
import { getUsersAction } from '../../../store/actions/users.actions';
import { getSearchExp, getUsersSelector } from '../../../store/selectors';

// Export users page
export const UserListPage: FC = () => {
  // States
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const searchExp = useSelector(getSearchExp);
  // Fetch users
  const fetchUsers = () => {
    setIsLoading(true);
    UsersApi.readAll({
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          [orderBy]: order
        }
      },
      query: {
        name: searchExp
      }
    })
      .then((res) => {
        dispatch(getUsersAction(res.users));
        setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Page change handler
  const handleChangePage = (pageN: number) => {
    setPageNumber(pageN);
  };

  // Sort handler
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  // Delete handler
  const handleDelete = (id: string) => {
    setSelectedUserId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  // const handleToggleKYCVerified = (id: string) => {
  //   UsersApi.toggleKYCVerified(id).catch((err) => console.log(err));
  // };

  // Delete confirm dialog
  const handleDeleteConfirmed = () => {
    UsersApi.remove(selectedUserId as string)
      .then(() => fetchUsers())
      .catch((err) => console.log(err));
  };

  // Edit handler
  const handleEdit = (id: string) => {
    // navigate(ROUTES.USER.DETAIL.replace(':id', id));
    navigate(ROUTES.USER.EDIT.replace(':id', id));
  };

  // View handler
  const handleView = (id: string) => {
    navigate(ROUTES.USER.DETAIL.replace(':id', id));
  };

  // Constants
  const columns: IColumn[] = [
    {
      field: 'name',
      title: 'Name',
      render: (row) => (
        <Stack direction="row" spacing={12} alignItems="center">
          <Avatar src={row.avatarUrl} alt="user-image" />
          <Typography variant="body2">{row.name}</Typography>
        </Stack>
      )
    },
    {
      field: 'email',
      title: 'Email'
    },
    {
      field: 'country',
      title: 'Country',
      render: (row) => <Typography variant="body2">{row.country ? countries[row.country]?.name : ''}</Typography>
    },
    {
      field: 'role',
      title: 'Role',
      render: (row) => (
        <RoundedButton background={row.role === ROLE.ADMIN ? COLORS.BLUE : COLORS.BLUEGRAY} label={row.role} />
      )
    },
    {
      field: 'isKYCVerified',
      title: 'KYC Verified',
      render: (row) => {
        // <Switch defaultChecked={row.isKYCVerified} onChange={() => handleToggleKYCVerified(row.id)}/>
        return row.isKYCVerified ? <span>Verified</span> : <span>Not Verified</span>;
      }
    },
    {
      field: 'totalSpent',
      title: 'Total Spent'
    },
    {
      field: 'createdAt',
      title: 'Joined',
      render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
    }
  ];

  // New handler
  const handleNew = () => {
    navigate(ROUTES.USER.NEW);
  };

  // On pageNumber, pageLimit, order, orderBy changed
  useEffect(() => {
    fetchUsers();
  }, [pageNumber, order, orderBy, searchExp]);

  // Return users page
  return (
    <>
      <Table
        title="Users"
        data={users}
        columns={columns}
        totalPage={totalPage}
        pageNumber={pageNumber}
        onPageChange={handleChangePage}
        order={order}
        orderBy={orderBy}
        isLoading={isLoading}
        onNew={handleNew}
        onSort={handleSort}
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
    </>
  );
};
