// Dependencies
import { Avatar, Box, Grid, Stack, Typography, Tooltip, Accordion, AccordionActions, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Apis
import { OrdersApi } from '../../../apis';
import { IOrderReadRes } from '../../../apis/orders.api';
import { RoundedButton } from '../../../components';
import { ShadowCard } from '../../../components/Common/ShadowCard/ShadowCard';
import { COLORS } from '../../../constants/colors';
// Global constants
import { ORDER_STATUS } from '../../../shared/enums';
import { setSearchExp } from '../../../store/actions/header.actions';
import * as S from '../../User/Detail/styles';
import { StatusLabel } from '../List';
import { countries } from 'countries-list';

// Export order-detail page
export const OrderDetailPage: FC = () => {
  // States
  const [order, setOrder] = useState<IOrderReadRes>();
  // Get navigate from hook
  const navigate = useNavigate();

  // Get order id from hook
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  // Back to handler
  const handleBack = () => {
    navigate(-1);
  };

  // Update order status handler
  const handleUpdateOrderStatus = (status: ORDER_STATUS) => {
    OrdersApi.updateOrderStatus(id, status)
      .then((res) => {
        setOrder(res.order);
      })
      .catch((err) => console.log(err));
  };

  // On id changed
  useEffect(() => {
    if (id) {
      OrdersApi.read(id)
        .then((res) => setOrder(res.order))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const nft = (productId: string) => {
    const nft = order?.nfts.find((nft: any) => nft.productId == productId);
    if (nft) return nft;
    return undefined;
  };
  const getDiscount = (totalPrice: any, discount = 0, vat) => {
    const subTotal = ((totalPrice) + vat).toFixed(2);
    const discountedPrice = subTotal * (1 - discount / 100);
    return discountedPrice;
  };

  const addressData: any = `${order?.userId?.addressLine1 ? `${order?.userId?.addressLine1},` : ''}
  ${order?.userId?.addressLine2 ? `${order?.userId?.addressLine2},` : ''}
  ${order?.userId?.city ? `${order?.userId?.city},` : ''}
  ${order?.userId?.region ? `${order?.userId?.region},` : ''}
  ${order?.userId?.country ? `${countries[order?.userId?.country].name},` : ''}
  ${order?.userId?.zip ? `${order?.userId?.zip}` : ''}`;

  // Return order-detail page
  return (
    <Box sx={{ pr: 32, pb: 4 }}>
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={16}>
        <Typography color={'black'} fontSize={'3rem'} fontWeight={'600'}>
          {order?.username}
        </Typography>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} gap={'0.5rem'}>
          {[ORDER_STATUS.CANCELLED, ORDER_STATUS.PROCESSED].map((status, index) => (
            <RoundedButton
              label={StatusLabel[status]}
              key={index}
              outline={status === ORDER_STATUS.CANCELLED}
              background={
                (status === ORDER_STATUS.CREATED && COLORS.BLUE) ||
                (status === ORDER_STATUS.CANCELLED && COLORS.BLACK) ||
                (status === ORDER_STATUS.PROCESSED && COLORS.BLACK) ||
                'primary'
              }
              onClick={() => handleUpdateOrderStatus(status)}
            />
          ))}
        </Stack>
      </Stack>
      <ShadowCard>
        <Typography textAlign={'left'} color={'black'} fontSize={'1.5rem'} fontWeight={'600'} width={'100%'} pb={32}>
          Basic Info
        </Typography>
        <Grid container spacing={48}>
          <Grid item xs={4} display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                1
              </Box>
              <S.BasicInfoItem>
                <Box>Username</Box>
                <Box fontWeight={'600'}>{order?.username}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                2
              </Box>
              <S.BasicInfoItem>
                <Box>Phone Number</Box>
                <Box fontWeight={'600'}>{order?.phoneNumber}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                3
              </Box>
              <S.BasicInfoItem>
                <Box>Taxamo Identifier</Box>
                <Box fontWeight={'600'}>{order?.taxamoId}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                4
              </Box>
              <S.BasicInfoItem>
                <Box>Email</Box>
                <Box fontWeight={'600'}>{order?.email}</Box>
              </S.BasicInfoItem>
            </Box>
          </Grid>
          <Grid item xs={4} display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
            <Box>
              {order?.orderItems.map((item: any) => {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      style={{ fontWeight: 600 }}
                    >
                      {item.productName}
                    </AccordionSummary>
                    <AccordionDetails>

                      <Stack>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}> Thumbnails</Typography>
                          <Avatar
                            src={item.thumbnail?.url}
                            alt="thumbnail"
                            sx={{ width: '1.5rem', height: '1.5rem', marginLeft: 2 }}
                          />
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}> Name</Typography>
                          <Typography fontSize={16} fontWeight={600}> {item.productName}</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}> Feature</Typography>
                          {item?.features.legth > 0 ? <p>-</p> :
                            item?.features?.map((item: any, index: number) => (
                              <div key={index}>
                                {Object.entries(item).map(([key, value]) => (
                                  <Box key={key} fontWeight={'600'}> {key}: {value}</Box>
                                ))}
                              </div>
                            ))}
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}> Description</Typography>
                          <Typography fontSize={16} fontWeight={600}>{item.description}</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}>Type</Typography>
                          <Typography fontSize={16} fontWeight={600}>{item.type?.replace('_', ' ')}</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}>Price</Typography>
                          <Typography fontSize={16} fontWeight={600}> {item.price}</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}>Transaction Hash</Typography>
                          <Box width={'50%'} overflow={'hidden'} textOverflow={'ellipsis'} >
                            <Tooltip title={item?.nftDetail?.details?.transactionHash}>
                              <Typography noWrap fontSize={16} fontWeight={600}> {item?.nftDetail?.details?.transactionHash}</Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}>To</Typography>
                          <Box width={'50%'} overflow={'hidden'} textOverflow={'ellipsis'}>
                            <Tooltip title={item?.nftDetail?.details?.to}>
                              <Typography
                                fontSize={16}
                                fontWeight={600}
                                noWrap
                              >
                                {item?.nftDetail?.details?.to}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}>Token</Typography>
                          <Typography fontSize={16} fontWeight={600}> {item?.nftDetail?.tokenId}</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={5}>
                          <Typography fontSize={16}>Chain</Typography>
                          <Typography fontSize={16} fontWeight={600}> {item?.nftDetail?.details?.chain}</Typography>
                        </Box>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
              <Box display={'flex'} flexDirection={'column'} width={'100%'} justifyContent={'start'}>
                <S.BasicInfoItem>
                  <Box>SubTotal</Box>
                  <Box fontWeight={'600'}>{order?.totalPrice}</Box>
                </S.BasicInfoItem>
                <S.BasicInfoItem>
                  <Box>Discount</Box>
                  <Box fontWeight={'600'}>{order?.discount ? order?.discount > 0 ? order?.discount : 0 : 0}%</Box>
                </S.BasicInfoItem>
                <S.BasicInfoItem>
                  <Box>Total</Box>
                  <Box fontWeight={'600'}>{getDiscount(order?.totalPrice, order?.discount as number, order?.vat)}</Box>
                </S.BasicInfoItem>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4} display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                1
              </Box>
              <S.BasicInfoItem>
                <Box>ID</Box>
                <Box fontWeight={'600'}>{order?._id}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                2
              </Box>
              <S.BasicInfoItem>
                <Box>Status</Box>
                <Box
                  fontWeight={'600'}
                  sx={(theme) => ({
                    color: () => {
                      switch (order?.status) {
                        case ORDER_STATUS.CREATED: {
                          return theme.palette.info.main;
                        }

                        case ORDER_STATUS.CANCELLED: {
                          return theme.palette.warning.main;
                        }

                        case ORDER_STATUS.PROCESSED: {
                          return theme.palette.success.main;
                        }

                        default: {
                          return theme.palette.primary.main;
                        }
                      }
                    }
                  })}
                >
                  {order?.status && StatusLabel[order?.status]}
                </Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                3
              </Box>
              <S.BasicInfoItem>
                <Box>Note</Box>
                <Box fontWeight={'600'}>{order?.note}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                4
              </Box>
              <S.BasicInfoItem>
                <Box>Payment Method</Box>
                <Box fontWeight={'600'}>
                  <RoundedButton label={order?.paymentMethod} />
                </Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                5
              </Box>
              <S.BasicInfoItem>
                <Box>Payment Invoice</Box>
                <Box fontWeight={'600'}>{order?.taxamoInvoiceNumber}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                6
              </Box>
              <S.BasicInfoItem>
                <Box>Address</Box>
                <Box fontWeight={'600'} width={'60%'}>
                  <Box fontWeight={'600'}>{addressData}</Box>
                </Box>
              </S.BasicInfoItem>
            </Box>
          </Grid>
        </Grid>
      </ShadowCard>
    </Box>
  );
};
