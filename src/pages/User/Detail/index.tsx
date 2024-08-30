// Dependencies
import {
  Avatar,
  Box,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Apis
import { BalanceApi, ContractApi, OrdersApi, TransactionsApi, UsersApi, WalletApi } from '../../../apis';
import { TicketAltIcon, TicketAltOutlinedIcon, TokenIcon, TokenOutlinedIcon } from '../../../assets/icons';
import { RoundedButton, SwitchField } from '../../../components';
import { Pagination } from '../../../components/Table/styles';
// Constants
import { ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
// import { ROLE } from '../../../shared/enums';
// Interfaces
import { IOrder, IUser } from '../../../shared/types';
import { ITransaction } from '../../../shared/types/transaction.type';
import { IWallet } from '../../../shared/types/wallet.type';
import { getUserAvatar } from '../../../utils';
// import { STATUS } from '../../KYC/List';
import { WEB3_STORAGE_GATEWAY_URL } from '../../Nft';
import { DownloadKey, TransactionsWrapper } from './styles';
import * as S from './styles';
import { STATUS } from '../../KYC/List';
import { countries } from 'countries-list';

enum TAB {
  PURCHASED_NFTS,
  ORDERS,
  TRANSACTIONS,
  WALLETS
}

const USER_INFO_TABS = [
  {
    label: 'Orders',
    value: TAB.ORDERS,
    icon: {
      default: <TokenOutlinedIcon />,
      active: <TokenIcon />
    }
  },
  {
    label: 'Purchased NFTs',
    value: TAB.PURCHASED_NFTS,
    icon: {
      default: <TokenOutlinedIcon />,
      active: <TokenIcon />
    }
  },
  {
    label: 'Transactions',
    value: TAB.TRANSACTIONS,
    icon: {
      default: <TicketAltOutlinedIcon />,
      active: <TicketAltIcon />
    }
  },
  {
    label: 'Wallets',
    value: TAB.WALLETS,
    icon: {
      default: <TicketAltOutlinedIcon />,
      active: <TicketAltIcon />
    }
  }
];

const PAGE_LIMIT = 12;

// Export UserDetail page
export const UserDetailPage: FC = () => {
  // States
  const [user, setUser] = useState<IUser>();
  const [wallets, setWallets] = useState<IWallet[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [purchasedNfts, setPurchasedNfts] = useState<any>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [activeTab, setActiveTab] = useState<TAB>(TAB.ORDERS);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const ETH_SEPOLIA_NETWORK_URL = 'https://sepolia.etherscan.io';
  const CSPR_NETWORK_URL = 'https://testnet.cspr.live';

  // Fetch User
  const fetchUser = () => {
    if (id) {
      UsersApi.read(id)
        .then((res) => {
          setUser(res.user);
        })
        .catch((err) => {
          console.log(err);
          navigate(-1);
        });
    }
  };

  // Page change handler
  const handlePageChange = (event: unknown, newPage: number) => {
    setPageNumber(newPage - 1);
  };

  // Fetch orders
  const fetchOrders = () => {
    OrdersApi.readAll({
      query: {
        userId: id
      }
    })
      .then((res) => {
        setOrders(res.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch orders
  const fetchUserNfts = () => {
    if (id) {
      ContractApi.readAllNftsByArtist({
        query: { userId: id },
        options: {
          limit: PAGE_LIMIT,
          skip: pageNumber * PAGE_LIMIT
        }
      })
        .then((res) => {
          setPurchasedNfts(res.nfts);
        })
        .catch((err) => console.log(err));
    }
  };

  // Fetch balances
  const fetchBalance = () => {
    BalanceApi.readAll({
      options: {
        id
      }
    })
      .then((res) => {
        console.log(res.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch wallets
  const fetchWallets = useCallback(() => {
    WalletApi.readAll({
      query: {
        userId: id
      }
    })
      .then((res) => {
        setWallets(res.wallets);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:187 ~ fetchWallets ~ err:', err);
      });
  }, []);

  // Fetch transactions
  const fetchTransactions = () => {
    TransactionsApi.read({
      query: {
        userId: id
      },
      options: {
        limit: PAGE_LIMIT,
        skip: pageNumber * PAGE_LIMIT,
        sort: {
          createdAt: -1
        }
      }
    })
      .then((res) => {
        setTransactions(res.transactions);
        setTotalPage(res.pagination.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Back handler
  // const handleBack = () => {
  //   navigate(ROUTES.USER.LIST);
  // };
  //
  // // Index change handler
  // const handleTabChange = (_: React.SyntheticEvent, tab: TAB) => {
  //   setActiveTab(tab);
  // };
  //
  // const handleUpdateUserStatus = () => {
  //   if (id && user) {
  //     UsersApi.update(id, { name: user.name, verify: !user.verify })
  //       .then(() => {
  //         setUser({
  //           ...user,
  //           verify: !user.verify
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  //
  const handleisKYCVerifiedUserStatus = () => {
    if (id && user) {
      UsersApi.update(id, {
        name: user.name,
        isKYCVerified: !user.isKYCVerified,
        KYCStatus: user.isKYCVerified ? STATUS.NOT_VERIFIED : STATUS.VERIFIED
      })
        .then(() => {
          setUser({
            ...user,
            isKYCVerified: !user.isKYCVerified
          });
        })
        .catch((err) => console.log(err));
    }
  };
  //
  // const handleIsAdmin = () => {
  //   if (id && user) {
  //     UsersApi.update(id, { name: user.name, role: user.role == 'admin' ? ROLE.USER : ROLE.ADMIN })
  //       .then(() => {
  //         setUser({
  //           ...user,
  //           role: user.role == 'admin' ? ROLE.USER : ROLE.ADMIN
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  //
  // const handleIsBlock = () => {
  //   if (id && user) {
  //     UsersApi.update(id, { name: user.name, block: !user.block })
  //       .then(() => {
  //         setUser({
  //           ...user,
  //           block: !user.block
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  //
  const handleAddNew = () => {
    navigate(ROUTES.USER.NEW);
  };

  // const handleEdit = () => {
  //   if (id) {
  //     navigate(ROUTES.USER.EDIT.replace(':id', id));
  //   }
  // };

  const downloadKey = (wallet: IWallet) => {
    if (wallet?._id) {
      WalletApi.downloadPrivateKey(wallet?._id as string, wallet?.chain)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${wallet.name}.pem`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.tsx:179 ~ useEffect ~ err:', err);
        });
    }
  };

  // On user id changed
  useEffect(() => {
    if (id) {
      fetchUser();
      fetchOrders();
      fetchBalance();
      fetchUserNfts();
      fetchWallets();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTransactions();
    }
  }, [pageNumber]);

  return (
    <>
      <Stack spacing={8} paddingRight={'1rem'}>
        <Box>
          <Box mb={32}>
            <Avatar sx={{ width: 200, height: 200, mb: 32 }} src={getUserAvatar(user)} />
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="headline" fontSize={'3rem'} fontWeight={'600'}>
                {user?.name}
              </Typography>
              <RoundedButton label={user?.email} background={COLORS.BLUE} />
            </Box>
          </Box>
          <S.BasicInfo>
            <Box paddingBottom={'1rem'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography fontSize={'1.5rem'} fontWeight={'700'}>
                Basic Info
              </Typography>
              <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                <S.FeaturedButton>Active</S.FeaturedButton>
                <S.StyledSwitch size={'medium'} color={'success'} value={user?.verify} />
              </Box>
            </Box>
            <Grid container spacing={'2rem'}>
              <Grid item xs={4}>
                <Stack display={'flex'} flexDirection={'column'} gap={'1rem'}>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      1
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Joined</Box>
                      <Box fontWeight={'600'}>{moment(user?.createdAt).format('MMMM YYYY')}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      2
                    </Box>
                    <S.BasicInfoItem>
                      <Box>is Block</Box>
                      <Box fontWeight={'600'}>
                        <Switch value={user?.block} checked={user?.block} />
                      </Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      3
                    </Box>
                    <S.BasicInfoItem>
                      <Box>is KYC verified</Box>
                      <Box fontWeight={'600'}>
                        <Switch checked={user?.isKYCVerified} value={user?.isKYCVerified} onChange={() => handleisKYCVerifiedUserStatus()} />
                      </Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      4
                    </Box>
                    <S.BasicInfoItem>
                      <Box>is Admin</Box>
                      <Box fontWeight={'600'}>
                        <Switch value={user?.role === 'admin'} checked={user?.role === 'admin'} />
                      </Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      5
                    </Box>
                    <S.BasicInfoItem>
                      <Box>PhoneNumber</Box>
                      <Box fontWeight={'600'}>{user?.phoneNumber}</Box>
                    </S.BasicInfoItem>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack display={'flex'} flexDirection={'column'} gap={'1rem'}>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      1
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Country</Box>
                      <Box fontWeight={'600'}>{user ? countries[user?.country]?.name : null}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      2
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Region</Box>
                      <Box fontWeight={'600'}>{user?.region}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      3
                    </Box>
                    <S.BasicInfoItem>
                      <Box>City</Box>
                      <Box fontWeight={'600'}>{user?.city}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      4
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Postal Code</Box>
                      <Box fontWeight={'600'}>{user?.zip}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      5
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Address</Box>
                      <Box fontWeight={'600'}>{user?.addressLine1}</Box>
                    </S.BasicInfoItem>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack display={'flex'} flexDirection={'column'} gap={'1rem'}>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      1
                    </Box>
                    <S.BasicInfoItem>
                      <Box>BTC</Box>
                      <Box fontWeight={'600'}>0</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      2
                    </Box>
                    <S.BasicInfoItem>
                      <Box>ETH</Box>
                      <Box fontWeight={'600'}>0</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      3
                    </Box>
                    <S.BasicInfoItem>
                      <Box>USDT</Box>
                      <Box fontWeight={'600'}>0</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      4
                    </Box>
                    <S.BasicInfoItem>
                      <Box>USDC</Box>
                      <Box fontWeight={'600'}>0</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      5
                    </Box>
                    <S.BasicInfoItem>
                      <Box>LTCT</Box>
                      <Box fontWeight={'600'}>0</Box>
                    </S.BasicInfoItem>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </S.BasicInfo>
        </Box>
        <Box>
          <CardHeader
            title={
              <Box display={'flex'} gap={'0.5rem'}>
                {USER_INFO_TABS.map(({ label, value, icon }, index) => (
                  // <Tab
                  //   key={index}
                  //   label={label}
                  //   value={value}
                  //   icon={value === activeTab ? icon.active : icon.default}
                  // />
                  <RoundedButton
                    key={index}
                    label={label}
                    outline={value !== activeTab}
                    onClick={() => setActiveTab(value)}
                    background={COLORS.BLUE}
                  />
                ))}
              </Box>
            }
            action={<RoundedButton label={'Add New'} onClick={handleAddNew} />}
            sx={{ paddingY: '1rem' }}
          />
          {activeTab === TAB.TRANSACTIONS &&
            (transactions?.length > 0 ? (
              <TransactionsWrapper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Network</TableCell>
                      <TableCell>Deposit / Withdrawal Address</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>TXID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions?.map(({ address, amount, createdAt, status, txKey, currency, to, type, network }, index) => (
                      <TableRow key={index}>
                        <TableCell>{moment(createdAt).calendar()}</TableCell>
                        <TableCell>{isNaN(amount) ? '-' : amount}</TableCell>
                        <TableCell>{currency}</TableCell>
                        <TableCell>
                          {to ? (
                            <Tooltip title={address} placement="bottom" arrow>
                              <a
                                href={
                                  currency == 'ETH'
                                    ? `${ETH_SEPOLIA_NETWORK_URL}/tx/${txKey}`
                                    : `${CSPR_NETWORK_URL}/account/${txKey}`
                                }
                                target="_blank"
                              >
                                {to?.slice(0, 4)}...{to?.slice(-4)}    <Chip label={type} />
                              </a>

                            </Tooltip>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip label={status} />
                        </TableCell>
                        <TableCell>
                          {txKey ? (
                            <Tooltip title={txKey} placement="bottom" arrow>
                              <p>
                                {txKey?.slice(0, 4)}...{txKey?.slice(-4)}
                              </p>
                            </Tooltip>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  count={Math.ceil(totalPage / PAGE_LIMIT)}
                  page={pageNumber + 1}
                  onChange={handlePageChange}
                />
              </TransactionsWrapper>
            ) : (
              <Typography>There are not any transactions :(</Typography>
            ))}
          {activeTab === TAB.ORDERS &&
            (orders.length > 0 ? (
              <Table>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Is Gift</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
                <TableBody>
                  {orders.map(({ orderItems, status, totalPrice, isGift, _id }, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link to={ROUTES.ORDER.DETAIL.replace(':id', _id)}>{_id}</Link>
                      </TableCell>
                      <TableCell>
                        {orderItems.map(({ productName }, index) => (
                          <Typography key={index} variant="caption">
                            {productName}
                            {orderItems.length - 1 !== index && <>, </>}
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell>
                        <S.StyledSwitch disabled checked={isGift} />
                      </TableCell>
                      <TableCell>
                        <Chip label={status} />
                      </TableCell>
                      <TableCell>{totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>There are not ordered products :(</Typography>
            ))}
          {activeTab === TAB.PURCHASED_NFTS &&
            (purchasedNfts.length > 0 ? (
              <Table>
                <TableRow>
                  <TableCell> Thumbnail</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Token Address</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Listed</TableCell>
                  <TableCell>Updated</TableCell>
                </TableRow>
                <TableBody>
                  {purchasedNfts.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {row.ipfsImageHash ? (
                            <img
                              src={`${WEB3_STORAGE_GATEWAY_URL}/${row?.ipfsImageHash.replace('ipfs://', '')}`}
                              alt="thumbnail"
                              height={50}
                            />
                          ) : (
                            <img src={row.uri} alt="thumbnail" height={50} />
                          )}
                        </TableCell>
                        <TableCell>{row.productId?.name}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{moment(row.createdAt).format('HH:mm - DD MMMM YYYY')}</TableCell>
                        <TableCell>{moment(row.updatedAt).format('HH:mm - DD MMMM YYYY')}</TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {purchasedNfts.map(({ isMinted, tokenId, productId: { _id, name, type } }, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Link to={type == PRODUCT_TYPE.SONG ? ROUTES.SONG.DETAIL.replace(':id', _id) : type == PRODUCT_TYPE.VIDEO ? ROUTES.VIDEO.DETAIL.replace(':id', _id) : type == PRODUCT_TYPE.VIRTUAL_EVENT ? ROUTES.EVENT.DETAIL.replace(':id', _id) : type == PRODUCT_TYPE.IMAGE ? ROUTES.IMAGE.DETAIL.replace(':id', _id) : ''}>{_id}</Link>
                        </TableCell>
                        <TableCell>
                          {name}
                        </TableCell>
                        <TableCell>
                          <S.StyledSwitch disabled checked={isMinted} />
                        </TableCell>
                        <TableCell>{tokenId}</TableCell>
                      </TableRow>
                    );
                  }
                  )} */}
                </TableBody>
              </Table>
            ) : (
              <Typography>There are no nfts :(</Typography>
            ))}
          {activeTab === TAB.WALLETS &&
            (wallets.length > 0 ? (
              <Table>
                <TableRow>
                  <TableCell> Name</TableCell>
                  <TableCell>Chain</TableCell>
                  <TableCell>Public Address</TableCell>
                  <TableCell>Private Key</TableCell>
                </TableRow>
                <TableBody>
                  {wallets.map((wallet, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{wallet?.name}</TableCell>
                        <TableCell>{wallet?.chain}</TableCell>
                        <TableCell>{wallet?.address}</TableCell>
                        <TableCell>
                          {' '}
                          <DownloadKey onClick={() => downloadKey(wallet)}>download</DownloadKey>{' '}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Typography>There are no nfts :(</Typography>
            ))}
        </Box>
      </Stack>
    </>
  );
};
