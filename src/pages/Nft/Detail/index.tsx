// Dependencies
import { Box, Button, CardHeader, Divider, Stack, Table, TableCell, TableRow, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getTransactionDetails } from '../../../apis/products.api';
// import TrannsferTokenDialog from '../../../components/TransferTokenDialog';
import { ArrowLeftIcon, ArrowsExchangeAltIcon } from '../../../assets/icons';
import { IColumn, RoundedButton } from '../../../components';
import { Table as DataTable } from '../../../components';
import { COLORS } from '../../../constants/colors';
import { setSearchExp } from '../../../store/actions/header.actions';
import * as S from '../../User/Detail/styles';
import { WEB3_STORAGE_GATEWAY_URL } from '../List';

// Export users page
export const NftDetailPage: FC = () => {
  const { address } = useParams();
  const navigate = useNavigate();
  const [transactionDetail, setTransactionDetail] = useState<any>({});
  console.log('🚀 ~ file: index.tsx:27 ~ transactionDetail', transactionDetail);
  const location = useLocation();
  // const TOKEN_OWNER_ADDRESS = '0x266c2b52b9065f61274f77ca6473e3accbd3e130';
  const query = new URLSearchParams(location.search);
  const tokenId = query.get('tokenId');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  const getTransaction = async () => {
    const res = await getTransactionDetails(address as string, tokenId as string);
    setTransactionDetail(res);
  };

  const handleClickBackBtn = () => {
    navigate(-1);
  };
  const ETHEREUM_TESTNET_NETWORK_PROVIDER = 'https://sepolia.etherscan.io';
  const CASPER_TESTNET_NETWORK_PROVIDER = 'https://testnet.cspr.live';

  const columns: IColumn[] = [
    {
      field: 'txn_hash',
      title: 'Txn Hash',
      sort: false,
      render: (row) => (
        <a href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/tx/${row?.transactionHash}`} target="_blank">
          {row.transactionHash.substring(0, 12) + '...'}
        </a>
      )
    },
    {
      field: 'event',
      title: 'Method',
      sort: false
    },
    {
      field: '',
      title: 'From',
      sort: false,
      render: (row) => (
        <a href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${row?.returnValues?.from}`} target="_blank">
          {row?.returnValues?.from.substring(0, 12) + '...'}
        </a>
      )
    },
    {
      field: '',
      title: 'To',
      sort: false,
      render: (row) => (
        <a href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${row?.returnValues?.to}`} target="_blank">
          {row?.returnValues?.to.substring(0, 12) + '...'}
        </a>
      )
    },
    {
      field: '',
      title: 'Token ID',
      sort: false,
      render: (row) => (
        <a href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/token/${row?.returnValues?.tokenId}`} target="_blank">
          {row?.returnValues?.tokenId}
        </a>
      )
    }
  ];

  useEffect(() => {
    if (address) {
      getTransaction();
    }
  }, [address]);

  return (
    <Stack spacing={8} paddingRight={'1rem'}>
      <Card
        sx={{
          paddingY: '1rem',
          boxShadow: '0 7px 14px 2px rgba(100, 100, 100, 0.3) !important'
        }}
      >
        <CardHeader
          title={
            <Button variant="text" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
              Back
            </Button>
          }
          action={<RoundedButton label={'Transfer Token'} background={COLORS.BLACK} />}
        />
        <CardContent>
          {transactionDetail && !transactionDetail?.tx?.approvals ? (
            <Stack display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  1
                </Box>
                <S.BasicInfoItem>
                  <Box>Token ID</Box>
                  <Box fontWeight={'600'}>{tokenId}</Box>
                </S.BasicInfoItem>
              </Box>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  2
                </Box>
                <S.BasicInfoItem>
                  <Box>Tx Hash</Box>
                  <Box fontWeight={'600'}>
                    <a
                      href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/tx/${transactionDetail?.tx?.transactionHash}`}
                      target="_blank"
                    >
                      {transactionDetail?.tx?.transactionHash}
                    </a>
                  </Box>
                </S.BasicInfoItem>
              </Box>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  3
                </Box>
                <S.BasicInfoItem>
                  <Box>Status</Box>
                  <Box fontWeight={'600'}>{transactionDetail?.tx?.status ? 'Success' : 'Failed'}</Box>
                </S.BasicInfoItem>
              </Box>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  4
                </Box>
                <S.BasicInfoItem>
                  <Box>Own Address</Box>
                  <Box fontWeight={'600'}>
                    <a
                      href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${transactionDetail?.tx?.from}`}
                      target="_blank"
                    >
                      {transactionDetail?.tx?.from}
                    </a>
                  </Box>
                </S.BasicInfoItem>
              </Box>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  5
                </Box>
                <S.BasicInfoItem>
                  <Box>From</Box>
                  <Box fontWeight={'600'}>
                    <a
                      href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${transactionDetail?.tx?.from}`}
                      target="_blank"
                    >
                      {transactionDetail?.tx?.from}
                    </a>
                  </Box>
                </S.BasicInfoItem>
              </Box>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  6
                </Box>
                <S.BasicInfoItem>
                  <Box>To</Box>
                  <Box fontWeight={'600'}>
                    <a
                      href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${transactionDetail?.tx?.to}`}
                      target="_blank"
                    >
                      {transactionDetail?.tx?.to}
                    </a>
                  </Box>
                </S.BasicInfoItem>
              </Box>
              <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                <Box fontSize={'0.75rem'} fontWeight={'500'}>
                  7
                </Box>
                <S.BasicInfoItem>
                  <Box>Gas Limit & Usage by Txn</Box>
                  <Box fontWeight={'600'}>{transactionDetail?.tx?.gasUsed}</Box>
                </S.BasicInfoItem>
              </Box>
            </Stack>
          ) : (
            <Stack>
              <Table>
                <TableRow>
                  <TableCell>Token ID:</TableCell>
                  <TableCell>{tokenId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tx Hash:</TableCell>
                  <TableCell>
                    <a
                      href={`${CASPER_TESTNET_NETWORK_PROVIDER}/deploy/${transactionDetail?.nft?.details.transactionHash}`}
                      target="_blank"
                    >
                      {transactionDetail?.nft?.details.transactionHash}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell>{transactionDetail?.nft?.status ? 'Success' : 'Failed'}</TableCell>
                </TableRow>
              </Table>
              <Table>
                <TableRow>
                  <TableCell>Ipfs image hash:</TableCell>
                  <TableCell>
                    <a
                      href={`${WEB3_STORAGE_GATEWAY_URL}/${transactionDetail?.nft?.ipfsImageHash?.split('//')[1]}`}
                      target="_blank"
                    >
                      {transactionDetail?.nft?.ipfsImageHash}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ipfs json file hash:</TableCell>
                  <TableCell>
                    <a
                      href={`${WEB3_STORAGE_GATEWAY_URL}/${transactionDetail?.nft?.ipfsFileHash?.split('//')[1]}`}
                      target="_blank"
                    >
                      {transactionDetail?.nft?.ipfsFileHash}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>To:</TableCell>
                  <TableCell>
                    <a
                      href={`${CASPER_TESTNET_NETWORK_PROVIDER}/account/${transactionDetail?.nft?.details.to}`}
                      target="_blank"
                    >
                      {transactionDetail?.nft?.details.to}
                    </a>
                  </TableCell>
                </TableRow>
              </Table>
            </Stack>
          )}
        </CardContent>
      </Card>
      <DataTable title="History" data={transactionDetail?.history || []} columns={columns} />
    </Stack>
  );
};
