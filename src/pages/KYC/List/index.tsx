import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { countries } from 'countries-list';
import { KycApi } from '../../../apis';
import { IColumn, Table } from '../../../components';
import { ROUTES } from '../../../constants';
import { Order } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import Header from './Header';

export const STATUS = {
  NOT_VERIFIED: 'not-verified',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  UNDER_VERIFICATION: 'under-verification'
};
export const getType = (type?: string) => {
  switch (type) {
    case 'id_cad': {
      return 'ID Card';
    }
    case 'passport': {
      return 'Passport';
    }
    case 'driver_licence': {
      return 'Driver Licences';
    }
  }
};
export const getStatus = (type?: string) => {
  switch (type) {
    case STATUS.REJECTED: {
      return 'Refused';
    }
    case STATUS.VERIFIED: {
      return 'Approved';
    }
    case STATUS.UNDER_VERIFICATION: {
      return 'Processing';
    }
  }
};

const KYCPage = () => {
  const navigate = useNavigate();

  const [totalPage, setTotalPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('Name');
  const [kycs, setKycs] = useState<any[]>([]);
  const [currentTab, setTab] = useState<string>(STATUS.UNDER_VERIFICATION);

  const pageLimits = 12;

  const dispatch = useDispatch();

  // Fetch kycs
  const fetchKycs = () => {
    setIsLoading(true);
    KycApi.readAll({
      query: {
        status: currentTab
      },
      options: {
        limit: pageLimits,
        skip: pageNumber * pageLimits,
        sort: {
          [orderBy]: order
        }
      }
    })
      .then((res) => {
        const kycList = res.kycs.map((kyc) => {
          return { ...kyc, email: kyc.user.email, name: kyc.user.name, type: getType(kyc.type) };
        });
        setKycs(kycList);
        setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

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
      field: 'nationality',
      title: 'Nationality',
      render: (row) => <Typography variant="body2">{row.nationality ? countries[row.nationality]?.name : ''}</Typography>
    },
    {
      field: 'type',
      title: 'Document Type'
    },
    {
      field: 'submitDate',
      title: 'Submit Date',
      render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
    }
  ];

  const handlePageChange = (pageN) => {
    setPageNumber(pageN);
  };

  const handleNew = () => {
    return;
  };

  // Sort handler
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  const handleView = (id) => {
    navigate(ROUTES.KYC.DETAIL.replace(':id', id));
    return;
  };
  //


  useEffect(() => {
    if (currentTab) {
      fetchKycs();
    }
  }, [currentTab]);

  return (
    <>
      <Header setTab={setTab} currentTab={currentTab} />
      <Table
        title="Know Your Customer"
        data={kycs}
        columns={columns}
        totalPage={totalPage}
        pageNumber={pageNumber}
        pageLimit={pageLimits}
        onPageChange={handlePageChange}
        order={order}
        orderBy={orderBy}
        isLoading={isLoading}
        onSort={handleSort}
        onView={handleView}
      />
    </>
  );
};

export default KYCPage;
