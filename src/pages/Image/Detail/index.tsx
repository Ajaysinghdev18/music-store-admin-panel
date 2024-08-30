// Dependencies
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

// Apis
import { AuctionApi, ProductsApi } from '../../../apis';
import { ArrowLeftIcon } from '../../../assets/icons';
// Components
import { ConfirmDialog, Dropzone, IColumn, RoundedButton } from '../../../components';
import { TextInput } from '../../../components/TextInput';
// Constants
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
// Interfaces
import { ProductModel } from '../../../shared/models';
import { setSearchExp } from '../../../store/actions/header.actions';
import * as S from './styles';
import { Table as BidderList } from '../../../components';

// Export ProductDetail page
export const ImageDetailPage: FC = () => {
  const [product, setProduct] = useState<ProductModel | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [auction, setAuction] = useState<any>(undefined);

  console.log('🚀 ~ file: index.tsx:43 ~ product:', auction);
  const location = useLocation();
  const routes = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);


  // Check bidder exists in product
  const isBidder = useMemo(() => {
    let flag = false;
    if (auction) {
      flag = auction.bids.length > 0;
    }

    return flag;
  }, [auction]);
  const fetchProduct = () => {
    const id = routes.id;
    if (!id) return;

    setLoading(true);
    ProductsApi.read(id)
      .then((res) => {
        setProduct(new ProductModel(res.product));
        setAuction(res.product?.auction);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
  }, [location.pathname]);

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const handleClickDeleteBtn = () => {
    setVisibleDeleteConfirmDialog(true);
  };


  const approveBidHandler = (bidId: string, status: string, userId) => {
    AuctionApi.updateAuctionStatus(auction.id, bidId, status, userId)
      .then((res) => {
        fetchProduct();
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


  const handleDeleteConfirmed = () => {
    ProductsApi.remove(routes.id as string)
      .then(() => navigate(ROUTES.SONG.LIST))
      .catch((err) => console.log(err));
  };



  // Auction handler
  const handleAuction = (isAuction: boolean) => {
    if (product) {
      ProductsApi.toggleAuction(product.id, isAuction)
        .then((res) => {
          setProduct(new ProductModel({ ...product, isAuction }));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = () => {
    if (product) {
      navigate(ROUTES.SONG.EDIT.replace(':id', product.id));
    }
  };

  return (
    <Box paddingRight={'1rem'}>
      {loading || !product ? (
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
                {product?.isAuction ? <Button size="medium" disabled={isBidder} onClick={() => handleAuction(!product?.isAuction)}>
                  Close For Sale
                </Button> : <Button size="medium" onClick={() => handleAuction(!product?.isAuction)}>
                  Open For Sale
                </Button>}
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
          <Box padding={16}>
            <Box display="flex" alignItems="center">
              <Avatar src={product.getAvatarUrl} />
              <Typography variant="h5" sx={{ ml: 8 }}>
                {product.name}
              </Typography>
            </Box>
            <Grid container sx={{ mt: 16 }} justifyContent="space-between">
              <Grid item xs={12} lg={5.8}>
                <Stack direction="column" spacing={16}>
                  <Table>
                    <TableBody>
                      {product?.name && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem>
                            <Box>Name</Box>
                            <Box fontSize={'1.2rem'} fontWeight={'600'}>
                              {product?.name}
                            </Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      {product?.categoryNames && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Box>Category</Box>
                            <Box display={'flex'} gap={'0.5rem'}>
                              {product.categoryNames.map((cat) => (
                                <Chip label={cat} key={cat} sx={{ backgroundColor: COLORS.BLUE, color: 'white' }} />
                              ))}
                            </Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      {product?.productFeatures && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Box>Features</Box>
                            <Box display={'flex'} gap={'0.5rem'}>
                              {product.productFeatures.map((feat) => (
                                <Chip label={`${feat.name} | ${feat.value}`} key={feat.name} sx={{ backgroundColor: COLORS.BLUE, color: 'white' }} />
                              ))}
                            </Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      {product?.price && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Box>Price</Box>
                            <Box>
                              {product?.currency}
                              {product?.price}
                            </Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      {product?.sku && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Box>SKU</Box>
                            <Box>{product?.sku}</Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>is Featured</Box>
                          <Box>
                            <Switch disabled checked={product?.isFeatured} />
                          </Box>
                        </S.BasicInfoItem>
                      </Box>
                      {product?.startTime && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Box>Start</Box>
                            <Box>{moment(product?.startTime).format('YYYY-MM-DD')}</Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      {product?.endTime && (
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                          <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Box>End</Box>
                            <Box>{moment(product?.endTime).format('YYYY-MM-DD')}</Box>
                          </S.BasicInfoItem>
                        </Box>
                      )}
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>Created</Box>
                          <Box>{moment(product?.createdAt).format('YYYY-MM-DD')}</Box>
                        </S.BasicInfoItem>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>Updated</Box>
                          <Box>{moment(product?.updatedAt).format('YYYY-MM-DD')}</Box>
                        </S.BasicInfoItem>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>Sign ipfs</Box>
                          <Box>{product?.sign?.ipfsHash}</Box>
                        </S.BasicInfoItem>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>Music ipfs</Box>
                          <Box>{product?.music?.ipfsHash}</Box>
                        </S.BasicInfoItem>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>Icon ipfs</Box>
                          <Box>{product?.icon?.ipfsHash}</Box>
                        </S.BasicInfoItem>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                        <S.BasicInfoItem sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Box>Thumbnail</Box>
                          <Box>{product?.thumbnail?.ipfsHash}</Box>
                        </S.BasicInfoItem>
                      </Box>
                    </TableBody>
                  </Table>

                  {product.statement && (
                    <TextInput
                      multiline
                      minRows={5}
                      name="statement"
                      label="Statement"
                      value={product.statement}
                      disabled
                    />
                  )}
                  <TextInput
                    multiline
                    minRows={7}
                    name="description"
                    label="Description"
                    value={product.description}
                    disabled
                  />
                </Stack>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={12} lg={5.8}>
                <Grid container spacing={24}>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <Typography color="text.black" fontSize={14}>
                      Status
                    </Typography>
                    <Dropzone
                      label="Drag music here to upload"
                      accept={['.mp3']}
                      onDrop={handleEdit}
                      audioSrc={`${REACT_APP_API_ASSETS_SERVER}/${product.music?.filename}`}
                    />
                    {product.music && (
                      <Typography sx={{ marginLeft: 1 }}>
                        <b>Music File:</b> {product.music.filename || product.music.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <Typography color="text.black" fontSize={14}>
                      Thumbnail
                    </Typography>
                    <Dropzone
                      label="Drag image here to upload"
                      accept={['.png', '.jpg', '.svg']}
                      onDrop={handleEdit}
                      preview={`${REACT_APP_API_ASSETS_SERVER}/${product.thumbnail?.fieldname}/${product.thumbnail?.filename}`}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <Typography color="text.black" fontSize={14}>
                      Icon
                    </Typography>
                    <Dropzone
                      label="Drag image here to upload"
                      accept={['.png', '.jpg', '.svg']}
                      onDrop={handleEdit}
                      preview={`${REACT_APP_API_ASSETS_SERVER}/${product.icon?.fieldname}/${product.icon?.filename}`}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <Typography color="text.black" fontSize={14}>
                      Signature
                    </Typography>
                    <Dropzone
                      label="Drag image here to upload"
                      accept={['.png', '.jpg', '.svg']}
                      onDrop={handleEdit}
                      preview={`${REACT_APP_API_ASSETS_SERVER}/${product.sign?.fieldname}/${product.sign?.filename}`}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {auction && product.isAuction && <BidderList
            title="Bids"
            data={auction?.bids}
            columns={columns}
          />}
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
