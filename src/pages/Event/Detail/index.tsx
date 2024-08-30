import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AuctionApi, ProductsApi } from '../../../apis';
import { ArrowLeftIcon } from '../../../assets/icons';
import { ConfirmDialog, Dropzone, IColumn, RoundedButton } from '../../../components';
import { TextInput } from '../../../components/TextInput';
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../constants';
import { ProductModel } from '../../../shared/models';
import { setSearchExp } from '../../../store/actions/header.actions';
import * as S from '../../Song/Detail/styles';
import { Table as BidderList } from '../../../components';


export const EventDetailPage: FC = () => {
  const [event, setEvent] = useState<ProductModel | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [auction, setAuction] = useState<any>(undefined);
  const location = useLocation();
  const routes = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchEvent = () => {
    const id = routes.id;
    if (!id) return;

    setLoading(true);
    ProductsApi.read(id)
      .then((res) => {
        setEvent(new ProductModel(res.product));
        setAuction(res.product?.auction);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Check bidder exists in product
  const isBidder = useMemo(() => {
    let flag = false;
    if (auction) {
      flag = auction.bids.length > 0;
    }

    return flag;
  }, [auction]);

  useEffect(() => {
    fetchEvent();
    dispatch(setSearchExp(''));
  }, [location.pathname]);


  const approveBidHandler = (bidId: string, status: string, userId) => {
    AuctionApi.updateAuctionStatus(auction.id, bidId, status, userId)
      .then((res) => {
        console.log('🚀 ~ file: index.tsx:82 ~ .then ~ res:', res);
      })
      .catch((err) => console.log(err));
  };


  // Constant
  const columns: IColumn[] = [

    {
      field: 'amount',
      title: 'Amount',
      render: (row) => row.amount
    },
    {
      field: 'bidder.name',
      title: 'User',
      render: (row) => row.bidder.name
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
      field: 'status',
      title: 'Status',
      render: (row) => (
        <>
          <RoundedButton
            label={'Decline'}
            onClick={() => approveBidHandler(row._id, 'Decline', row.bidder._id)}
            outline={true}
            disabled={row.status == 'Decline' ? true : false}
          />
          <RoundedButton
            label={'Approve'}
            onClick={() => approveBidHandler(row._id, 'Approve', row.bidder._id)}
            outline={true}
            disabled={row.status == 'Decline' ? true : false}
          />
        </>
      )
    },
  ];
  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const handleClickDeleteBtn = () => {
    setVisibleDeleteConfirmDialog(true);
  };

  const handleDeleteConfirmed = () => {
    ProductsApi.remove(routes.id as string)
      .then(() => navigate(ROUTES.EVENT.LIST))
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    if (event) {
      navigate(ROUTES.EVENT.EDIT.replace(':id', event.id));
    }
  };

  // Auction handler
  const handleAuction = (isAuction: boolean) => {
    if (event) {
      ProductsApi.toggleAuction(event.id, isAuction)
        .then((res) => {
          setEvent(new ProductModel({ ...event, isAuction }));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box paddingRight={'1rem'}>
      {loading || !event ? (
        <Box height={300} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardHeader
            title={
              <Button variant="text" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
                Back
              </Button>
            }
            action={
              <Stack direction="row" spacing={16}>
                {/* {product?.isAuction ? <Button size="medium" disabled={isBidder} onClick={() => handleAuction(!product?.isAuction)}>
                  Close For Sale
                </Button> : <Button size="medium" onClick={() => handleAuction(!event?.isAuction)}>
                  Open For Sale
                </Button>} */}
                <S.DeleteButton startIcon={<Delete />} color="error" size="medium" onClick={handleClickDeleteBtn}>
                  Delete
                </S.DeleteButton>
                <S.EditButton startIcon={<Edit />} size="medium" onClick={handleEdit}>
                  Edit
                </S.EditButton>
              </Stack>
            }
            sx={{ mb: 24 }}
          />
          <Box display="flex" alignItems="center">
            <Avatar src={event.getAvatarUrl} />
            <Typography variant="h5" sx={{ ml: 8 }}>
              {event.name}
            </Typography>
          </Box>
          <Grid container sx={{ mt: 16 }} justifyContent="space-between">
            <Grid item xs={12} lg={5.8} mb={16}>
              <Stack display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
                {event?.name && (
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Box>Name</Box>
                      <Box>{event?.name}</Box>
                    </S.BasicInfoItem>
                  </Box>
                )}
                {event?.categoryNames && (
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Box>Category</Box>
                      <Box display={'flex'} gap={'0.5rem'}>
                        {event.categoryNames.map((cat) => (
                          <Chip label={cat} key={cat} />
                        ))}
                      </Box>
                    </S.BasicInfoItem>
                  </Box>
                )}
                {event?.price && (
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Box>Price</Box>
                      <Box>
                        {event?.currency}
                        {event?.price}
                      </Box>
                    </S.BasicInfoItem>
                  </Box>
                )}
                {event?.sku && (
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Box>SKU</Box>
                      <Box>{event?.sku}</Box>
                    </S.BasicInfoItem>
                  </Box>
                )}
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                    <Box>is Featured</Box>
                    <Box>
                      <Switch disabled checked={event?.isFeatured} />
                    </Box>
                  </S.BasicInfoItem>
                </Box>
                {event?.startTime && (
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Box>Start Time</Box>
                      <Box>{event?.startTime}</Box>
                    </S.BasicInfoItem>
                  </Box>
                )}
                {event?.endTime && (
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Box>End Time</Box>
                      <Box>{event?.endTime}</Box>
                    </S.BasicInfoItem>
                  </Box>
                )}
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                    <Box>Created At</Box>
                    <Box>{moment(event?.createdAt).calendar()}</Box>
                  </S.BasicInfoItem>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                    <Box>updatedAt At</Box>
                    <Box>{moment(event?.updatedAt).calendar()}</Box>
                  </S.BasicInfoItem>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5.8}>
              <Grid container spacing={24} direction="column">
                <Grid item xs={12} lg={6}>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Thumbnail
                  </Typography>
                  <Dropzone
                    label="Drag image here to upload"
                    accept={['.png', '.jpg', '.svg']}
                    onDrop={handleEdit}
                    preview={`${REACT_APP_API_ASSETS_SERVER}/${event.thumbnail?.fieldname}/${event.thumbnail?.filename}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  {event.statement && (
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      name="statement"
                      label="Statement"
                      value={event.statement}
                      disabled
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    multiline
                    minRows={7}
                    name="description"
                    label="Description"
                    value={event.description}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* {auction && product.isAuction && <BidderList
            title="Bids"
            data={auction?.bids}
            columns={columns}
          />} */}
        </>
      )}
      <ConfirmDialog
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
    </Box>
  );
};
