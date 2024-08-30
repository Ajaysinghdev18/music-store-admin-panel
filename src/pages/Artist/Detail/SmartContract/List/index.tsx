// Dependencies
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Apis
import { ContractApi, ProductsApi } from '../../../../../apis';
// Components
import { ConfirmDialog, IColumn, Table } from '../../../../../components';
// Global constants
import { PAGE_LIMIT, ROUTES } from '../../../../../constants';
// Types
import { IContract, Order } from '../../../../../shared/types';
import { getAccount } from '../../../../../store/selectors';

interface IContractListProps {
  contractExecuted?: () => void;
  isContractCreated: boolean | undefined;
  setShowEditContractModal: (boolean) => void;
  setEditingContractId: (string) => void;
  setShowContractModal: (boolean) => void;
}

// Export contracts page
export const SmartContractListPage: FC<IContractListProps> = ({
  isContractCreated,
  setShowEditContractModal,
  setEditingContractId,
  setShowContractModal,
}) => {
  // States
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [visibleDeleteAlertDialog, setVisibleDeleteAlertDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [orderId, setOrderId] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [artistId, setArtistId] = useState('');
  const account = useSelector(getAccount);

  // Get navigate from hook
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setArtistId(id);
    } else if (account?.artistId) {
      setArtistId(account.artistId);
    }
  }, [id]);

  // Fetch contracts
  const fetchAllContracts = () => {
    setIsLoading(true);
    ContractApi.readAll({
      query: {
        artistId
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
        setContracts(res.contracts);
        setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // New handler
  const handleNew = () => {
    // navigate(ROUTES.SONG.NEW);
    setShowContractModal(true);
  };

  // Routing handler
  const orderDetailHandler = () => {
    if (orderId) {
      navigate(ROUTES.SONG.DETAIL.replace(':id', orderId));
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
        await fetchAllContracts();
      }
    } catch (error) {
      console.log(error);
      setVisibleDeleteAlertDialog(true);
    }
  };

  // Edit handler
  const handleEdit = (id: string) => {
    // navigate(ROUTES.SONG.EDIT.replace(':id', id));
    setShowEditContractModal(true);
    setEditingContractId(id);
  };

  // // Feature handler
  // const handleFeature = (id: string, isFeature: boolean) => {
  //   ProductsApi.toggleFeature(id, isFeature)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

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
    navigate(ROUTES.CONTRACT.DETAIL.replace(':id', id));
  };

  // Constant
  const columns: IColumn[] = [
    {
      title: 'Contract ID',
      field: '_id',
      render: (row) => row._id
    },
    {
      field: 'description',
      title: 'description',
      render: (row) => `${row.description}`
    },
    {
      field: 'tokenName',
      title: 'token Name',
      render: (row) => row.tokenName
    },
    {
      field: 'tokenSymbol',
      title: 'token Symbol',
      render: (row) => row.tokenSymbol
    },
    {
      field: 'details.network',
      title: 'main network',
      render: (row) => `${row.details.network}`
    },
    {
      field: 'details.chain',
      title: 'chain',
      render: (row) => `${row.details.chain}`
    },
    {
      field: 'status',
      title: 'status',
      render: (row) => `${row.status}`
    },
    {
      field: 'createdAt',
      title: 'Created At',
      render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
    }
  ];

  // On pageNumber, order, orderBy & searchKey changed
  useEffect(() => {
    if (artistId) {
      fetchAllContracts();
    }
  }, [pageNumber, order, orderBy, isContractCreated, artistId]);

  // Return products page
  return (
    <>
      <Table
        title="Smart Contracts"
        data={contracts}
        columns={columns}
        totalPage={totalPage}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
        order={order}
        orderBy={orderBy}
        isLoading={isLoading}
        onSort={handleSort}
        onNew={handleNew}
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
        description="You can not remove the song. Because there is an order which is bind with the current song."
        visible={visibleDeleteAlertDialog}
        setVisible={setVisibleDeleteAlertDialog}
        onConfirmed={orderDetailHandler}
        confirmButtonText="Go to Order Details"
        noButtonText="Close"
      />
    </>
  );
};
