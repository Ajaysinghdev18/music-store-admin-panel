// Dependencies
import { Button, CardHeader, Divider, Stack, Table, TableCell, TableRow, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ContractApi } from '../../../../../apis';
import { ArrowLeftIcon } from '../../../../../assets/icons';

// Export users page
export const ContractDetailPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractDetail, setContractDetail] = useState<any>({});
  const getContractById = () => {
    ContractApi.contractById(id as string)
      .then((res) => {
        setContractDetail(res.contract);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickBackBtn = () => {
    navigate(-1);
  };
  const ETHEREUM_TESTNET_NETWORK_PROVIDER = 'https://sepolia.etherscan.io';
  const CASPER_TESTNET_NETWORK_PROVIDER = 'https://testnet.cspr.live/';

  useEffect(() => {
    if (id) {
      getContractById();
    }
  }, [id]);

  return (
    <Stack spacing={8}>
      <Card>
        <CardHeader
          title={
            <Button variant="text" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
              Back
            </Button>
          }
        />
        <CardContent>
          <Typography mb={60} variant="title" color="text.secondary">
            Detail
          </Typography>
          {contractDetail?.details && (
            <Stack divider={<Divider />}>
              <Table>
                <TableRow>
                  <TableCell>Contract Name:</TableCell>
                  <TableCell>{contractDetail.contractName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Token Name:</TableCell>
                  <TableCell>{contractDetail.tokenName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Token Symbol:</TableCell>
                  <TableCell>{contractDetail.tokenSymbol}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Chain:</TableCell>
                  <TableCell>{contractDetail?.details.chain}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Network:</TableCell>
                  <TableCell>{contractDetail?.details.network}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description:</TableCell>
                  <TableCell>{contractDetail?.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contract {contractDetail?.details.chain == 'ETH' ? 'Address:' : 'Hash:'}</TableCell>
                  {contractDetail?.details.chain == 'ETH' ? (
                    <TableCell>
                      <a
                        href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${contractDetail.contractAddress}`}
                        target="_blank"
                      >
                        {contractDetail?.contractAddress}
                      </a>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <a
                        href={`${CASPER_TESTNET_NETWORK_PROVIDER}/contract/${
                          contractDetail.contractHash.split('-')[1]
                        }`}
                        target="_blank"
                      >
                        {contractDetail?.contractHash}
                      </a>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Tx Hash:</TableCell>
                  {contractDetail?.details.chain == 'ETH' ? (
                    <TableCell>
                      <a
                        href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/tx/${contractDetail?.details?.transactionHash}`}
                        target="_blank"
                      >
                        {contractDetail?.details?.transactionHash}
                      </a>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <a
                        href={`${CASPER_TESTNET_NETWORK_PROVIDER}/deploy/${contractDetail?.details.transactionHash}`}
                        target="_blank"
                      >
                        {contractDetail?.details.transactionHash}
                      </a>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell>{contractDetail?.status}</TableCell>
                </TableRow>
              </Table>
              <Table>
                <TableRow>
                  <TableCell>From:</TableCell>
                  <TableCell>
                    {contractDetail?.details.chain == 'ETH' ? (
                      <a
                        href={`${ETHEREUM_TESTNET_NETWORK_PROVIDER}/address/${contractDetail?.details?.from}`}
                        target="_blank"
                      >
                        {contractDetail?.details?.from}
                      </a>
                    ) : (
                      <a
                        href={`${CASPER_TESTNET_NETWORK_PROVIDER}/accounts/${contractDetail?.details.from}`}
                        target="_blank"
                      >
                        {contractDetail?.details.from}
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              </Table>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};
