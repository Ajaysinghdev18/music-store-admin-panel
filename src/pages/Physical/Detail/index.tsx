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
// Constants
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../constants';
// Interfaces
import { ProductModel } from '../../../shared/models';
import { setSearchExp } from '../../../store/actions/header.actions';
import { Table as BidderList } from '../../../components';



// Export Physical Product Detail page
export const ProductDetailPage: FC = () => {
  const [product, setProduct] = useState<ProductModel | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [auction, setAuction] = useState<any>(undefined);

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


  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const handleClickDeleteBtn = () => {
    setVisibleDeleteConfirmDialog(true);
  };

  const handleDeleteConfirmed = () => {
    ProductsApi.remove(routes.id as string)
      .then(() => navigate(ROUTES.PHYSICAL_PRODUCT.LIST))
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    if (product) {
      navigate(ROUTES.PHYSICAL_PRODUCT.EDIT.replace(':id', product.id));
    }
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

  return (
    <Card>
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
                <Button startIcon={<Delete />} color="error" size="medium" onClick={handleClickDeleteBtn}>
                  Delete
                </Button>
                <Button startIcon={<Edit />} size="medium" onClick={handleEdit}>
                  Edit
                </Button>
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
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>{product?.name}</TableCell>
                        </TableRow>
                      )}
                      {product?.categoryNames && (
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell>
                            {product.categoryNames.map((cat) => (
                              <Chip label={cat} key={cat} />
                            ))}
                          </TableCell>
                        </TableRow>
                      )}
                      {product?.productFeatures && (
                        <TableRow>
                          <TableCell>Features</TableCell>
                          <TableCell>
                            {product.productFeatures.map((feat) => (
                              <Chip label={`${feat.name} | ${feat.value}`} key={feat.name} />
                            ))}
                          </TableCell>
                        </TableRow>
                      )}
                      {product?.price && (
                        <TableRow>
                          <TableCell>Price</TableCell>
                          <TableCell>
                            {product?.currency}
                            {product?.price}
                          </TableCell>
                        </TableRow>
                      )}
                      {product?.sku && (
                        <TableRow>
                          <TableCell>SKU</TableCell>
                          <TableCell>{product?.sku}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>Is Featured</TableCell>
                        <TableCell>
                          <Switch disabled checked={product?.isFeatured} />
                        </TableCell>
                      </TableRow>
                      {product?.startTime && (
                        <TableRow>
                          <TableCell>StartTime</TableCell>
                          <TableCell>{moment(product?.startTime).calendar()}</TableCell>
                        </TableRow>
                      )}
                      {product?.endTime && (
                        <TableRow>
                          <TableCell>EndTime</TableCell>
                          <TableCell>{moment(product?.endTime).calendar()}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>{moment(product?.createdAt).calendar()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Updated At</TableCell>
                        <TableCell>{moment(product?.updatedAt).calendar()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sign ipfs</TableCell>
                        <TableCell>{product?.sign?.ipfsHash}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Product ipfs</TableCell>
                        <TableCell>{product?.image?.ipfsHash}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Icon ipfs</TableCell>
                        <TableCell>{product?.icon?.ipfsHash}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Thumbnail ipfs</TableCell>
                        <TableCell>{product?.thumbnail?.ipfsHash}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  {product.statement && (
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      name="statement"
                      label="Statement"
                      value={product.statement}
                      disabled
                    />
                  )}
                  <TextField
                    fullWidth
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
                    <InputLabel variant="alone">Product</InputLabel>
                    <Dropzone
                      label="Drag image here to upload"
                      accept={['.png', '.jpg', '.svg']}
                      onDrop={handleEdit}
                      preview={`${REACT_APP_API_ASSETS_SERVER}/${product.image?.fieldname}/${product.image?.filename}`}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <InputLabel variant="alone">Thumbnail</InputLabel>
                    <Dropzone
                      label="Drag image here to upload"
                      accept={['.png', '.jpg', '.svg']}
                      onDrop={handleEdit}
                      preview={`${REACT_APP_API_ASSETS_SERVER}/${product.thumbnail?.fieldname}/${product.thumbnail?.filename}`}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <InputLabel variant="alone">Icon</InputLabel>
                    <Dropzone
                      label="Drag image here to upload"
                      accept={['.png', '.jpg', '.svg']}
                      onDrop={handleEdit}
                      preview={`${REACT_APP_API_ASSETS_SERVER}/${product.icon?.fieldname}/${product.icon?.filename}`}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    {/* @ts-ignore */}
                    <InputLabel variant="alone">Signature</InputLabel>
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
    </Card>
  );
};
