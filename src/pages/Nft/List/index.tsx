// Dependencies
import { Tooltip } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Apis
import { ContractApi, UsersApi } from '../../../apis';
// Components
import { ConfirmDialog, IColumn, Table } from '../../../components';
// Global constants
import { PAGE_LIMIT } from '../../../constants';
// Interfaces
import { IAccount, Order } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import { getAccount } from '../../../store/selectors';

export const WEB3_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';

// Constants
const columns: IColumn[] = [
  {
    field: 'icon',
    title: 'Thumbnail Avatar',
    render: (row) => {
      if (row.ipfsImageHash) {
        return (
          <img
            src={`${WEB3_STORAGE_GATEWAY_URL}/${row.ipfsImageHash.replace('ipfs://', '')}`}
            alt="thumbnail"
            height={50}
          />
        );
      } else {
        return <img src={row.uri} alt="thumbnail" height={50} />;
      }
    }
  },
  {
    field: 'productId.name',
    title: 'Product Name',
    render: (row) => <p>{row.productId?.name}</p>
  },
  {
    field: 'txHash',
    title: 'Token Address',
    render: (row) => {
      return (
        <Tooltip title={row.details.transactionHash} placement="bottom" arrow>
          {row.details.transactionHash && row.details.to ? (
            <a
              href={
                row.details.chain == 'CSPR'
                  ? `https://testnet.cspr.live/deploy/${row.details.transactionHash}`
                  : `https://sepolia.etherscan.io/tx/${row.details.transactionHash}`
              }
              target="_blank"
            >
              {row.details.transactionHash.slice(0, 4)}...{row.details.transactionHash.slice(-4)}
            </a>
          ) : (
            <p>---</p>
          )}
        </Tooltip>
      );
    }
  },
  {
    field: 'owner',
    title: 'Owner',
    render: (row) => (
      <Tooltip title={row.details.to} placement="bottom" arrow>
        {row.details.transactionHash && row.details.to ? (
          <a
            href={
              row.details.chain == 'CSPR'
                ? `https://testnet.cspr.live/account/${row.details.to}`
                : `https://sepolia.etherscan.io/address/${row.details.to}`
            }
            target="_blank"
          >
            {row.details.to.slice(0, 4)}...{row.details.to.slice(-4)}
          </a>
        ) : (
          <p>---</p>
        )}
      </Tooltip>
    )
  },
  {
    field: 'createdAt',
    title: 'Listed',
    render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
  },
  {
    field: 'updatedAt',
    title: 'Updated',
    render: (row) => moment(row.updatedAt).format('HH:mm - DD MMMM YYYY')
  }
];

interface INftListProps {
  title?: string;
}

// Export users page
export const NftListPage: FC<INftListProps> = ({ title = 'NFT Tokens' }: INftListProps) => {
  // States
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [order, setOrder] = useState<Order>(Order.Desc);
  const [nfts, setNfts] = useState<any>([]);
  const [artistId, setArtistId] = useState('');
  const account: IAccount = useSelector(getAccount);
  const [selectedNftId, setSelectedNftId] = useState<string>();
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get navigate from hook
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  useEffect(() => {
    if (id) {
      setArtistId(id);
    } else if (account?.artistId) {
      setArtistId(account.artistId);
    }
  }, [id]);

  // Page change handler
  const handleChangePage = (value: number) => {
    setPageNumber(value);
  };

  // Sort handler
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? Order.Desc : Order.Asc);
    setOrderBy(property);
  };

  // Fetch products
  const fetchNfts = () => {
    setIsLoading(true);
    const newQuery: any = {};
    // if (!artistId) return;
    newQuery.artistId = id || account?.artistId || undefined;

    ContractApi.readAllNftsByArtist({
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
        setNfts(res);
        // setTotalPage(res.pagination.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // On pageNumber, order and orderBy changed
  useEffect(() => {
    // if (artistId) {
    fetchNfts();
    // }
  }, [pageNumber, order, orderBy, artistId]);

  // View handler
  const handleView = (id: string) => {
    const nft = nfts.nfts.find((nft) => nft.details.transactionHash === id);
    navigate(`/nfts/${nft?.details.transactionHash}?tokenId=${nft?.tokenId}`);
  };

  // Delete handler
  const handleDelete = (id: string) => {
    if (id) {
      setSelectedNftId(id);
      setVisibleDeleteConfirmDialog(true);
      // Add your code
    }
  };

  const handleDeleteConfirmed = () => {
    ContractApi.deleteNft(selectedNftId as string)
      .then(() => fetchNfts())
      .catch((err) => console.log(err));
  };

  // Edit handler
  const handleEdit = (id: string) => {
    if (id) {
      // Add your code
    }
  };

  // Return users page
  return (
    <>
      <Table
        title={title}
        order={order}
        data={nfts?.nfts}
        columns={columns}
        orderBy={orderBy}
        pageNumber={pageNumber}
        totalPage={nfts?.pagination?.total}
        isLoading={isLoading}
        onSort={handleSort}
        onPageChange={handleChangePage}
        onView={handleView}
        onDelete={handleDelete}
        onEdit={handleEdit}
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
