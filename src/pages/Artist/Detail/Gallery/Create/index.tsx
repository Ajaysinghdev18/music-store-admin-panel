// Dependencies
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { ContractApi, GalleryApi, ProductsApi } from '../../../../../apis';
import { ArrowLeftIcon, CreateArtistIcon, EyeIcon, RecycleIcon, UpdateIcon } from '../../../../../assets/icons';
import { ConfirmDialog, Dropzone, IColumn, SwitchField, Table } from '../../../../../components';
import { PAGE_LIMIT, ROUTES } from '../../../../../constants';
import { IFile, IGallery, Order } from '../../../../../shared/types';
import { getObjectUrl, replaceSpacesWithHyphen } from '../../../../../utils/common';
import { WEB3_STORAGE_GATEWAY_URL } from '../../../../Nft';
import { useDebounce } from '../../../../../hooks/useDebounce';

const validationSchema = Yup.object().shape({
  name: Yup.string().max(50, 'Please enter less than 50 characters').required('Title is required!'),
  //   thumbnail: Yup.object().required('Thumbnail is required!'),
  description: Yup.string().required('Description is required!'),
  chain: Yup.string().required('Chain address is required!'),
  contractId: Yup.string().required('ContractId is required!')
});

export const NewGalleryPage: FC = () => {
  const [gallery, setGallery] = useState<IGallery | any>({
    name: '',
    thumbnail: null as unknown as IFile,
    description: '',
    chain: 'ETH',
    contractId: '',
    isFeatured: false,
    isPublic: false,
    artistId: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { artistId } = useParams<{ artistId: string }>();
  const [nfts, setNfts] = useState([]);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [visibleDeleteAlertDialog, setVisibleDeleteAlertDialog] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [orderId, setOrderId] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  // const [totalPage, setTotalPage] = useState<number>();
  const [order, setOrder] = useState<Order>(Order.Asc);
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState();
  const [currentURL, setCurrentUrl] = useState('');
  const [isURLExists, setIsURLExists] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCurrentUrl(replaceSpacesWithHyphen(gallery.name));
  }, [gallery]);

  // Get navigate from hook
  const navigate = useNavigate();
  // New handler
  const handleNew = () => {
    navigate(`/songs/new?artistId=${artistId}&galleryId=${galleryId}`);
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
        // await fetchProducts();
      }
    } catch (error) {
      console.log(error);
      setVisibleDeleteAlertDialog(true);
    }
  };

  // Edit handler
  const handleEdit = (id: string) => {
    navigate(ROUTES.SONG.EDIT.replace(':id', id));
  };

  // Feature handler
  const handleFeature = (id: string, isFeature: boolean) => {
    ProductsApi.toggleFeature(id, isFeature)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
  const handleView = (id: string, tokenId?: string) => {
    navigate(`/nfts/${id}?tokenId=${tokenId}`);
  };

  // Constant
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
      title: 'Create At',
      render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
    },
  ];
  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const handleRemove = () => {
    GalleryApi.remove(galleryId as string)
      .then(() => navigate(ROUTES.ARTIST.DETAIL.replace(':id', artistId as string) + '?type=PROFILE_GALLERY'))
      .catch(() => navigate(ROUTES.ARTIST.DETAIL.replace(':id', artistId as string) + '?type=PROFILE_GALLERY'));
  };

  const handleSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    setSubmitting(true);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('thumbnail', values.thumbnail);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('contractId', values.contractId);
      formData.append('chain', values.chain);
      formData.append('isFeatured', values.isFeatured);
      formData.append('isPublic', values.isPublic);
      formData.append('galleryURLId', replaceSpacesWithHyphen(searchQuery));
      if (artistId) {
        formData.append('artistId', artistId);
      }
      if (artistId && galleryId) {
        GalleryApi.update(galleryId, formData)
          .then((res) => {
            setLoading(false);
            navigate(ROUTES.ARTIST.DETAIL.replace(':id', artistId) + '?type=PROFILE_GALLERY');
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });

      } else {
        console.log('=============> Creating,');

        await GalleryApi.create(formData);
        setSubmitting(false);
        navigate(ROUTES.ARTIST.DETAIL.replace(':id', artistId as string) + '?type=PROFILE_GALLERY');
      }

    } catch (e) {
      console.log('error', e);
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handleImageUpload = (files, field: string, setFieldValue: any) => {
    if (files && files.length > 0) {
      setFieldValue(field, files[0]);
    }
  };

  const handlePreview = () => {
    navigate(ROUTES.ARTIST.DETAIL.replace(':id', `${artistId}`));
  };

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { galleryId } = useParams<{ galleryId: string }>();

  useEffect(() => {
    if (galleryId && artistId) {
      setIsLoading(true);
      GalleryApi.read(galleryId)
        .then((res) => {
          setGallery(res.gallery);
          setSearchQuery(replaceSpacesWithHyphen(res.gallery.name));
        })
        .catch((err) => console.log('error[gallery]:', err));

      ContractApi.readAllNftsByArtist({
        query: {
          galleryId
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
          setNfts(res.nfts);
          setTotalPage(res.pagination.total);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [galleryId, artistId, pageNumber]);
  // Your search function that makes API calls (replace the URL with your actual API endpoint)
  const performSearch = async () => {
    try {
      const response = await GalleryApi.verifyUrlId(replaceSpacesWithHyphen(searchQuery));
      setIsURLExists(response.exists);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const debounceQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [debounceQuery, searchQuery]);

  return (
    <>
      <Card>
        {loading ? (
          <Box height={300} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            enableReinitialize
            initialValues={gallery}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <CardHeader
                  title={
                    <Button variant="text" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
                      Back
                    </Button>
                  }
                  action={
                    galleryId && artistId ? (
                      isMobile ? (
                        <Stack direction="row" spacing={16}>
                          <IconButton onClick={handleRemove}>
                            <RecycleIcon />
                          </IconButton>
                          <IconButton type="submit">
                            <UpdateIcon />
                          </IconButton>
                          <IconButton onClick={handlePreview}>
                            <EyeIcon />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={16}>
                          {/* <Button variant="outlined" startIcon={<RecycleIcon />} onClick={handleRemove}>
                            Remove this gallery
                          </Button> */}
                          <Button
                            variant="contained"
                            disabled={isSubmitting}
                            startIcon={loading ? <CircularProgress size={20} /> : <UpdateIcon />}
                            type={'submit'}
                          >
                            Update
                          </Button>
                          <Button variant="contained" startIcon={<EyeIcon />} onClick={handlePreview}>
                            Preview
                          </Button>
                        </Stack>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : <CreateArtistIcon />}
                      >
                        Create this gallery
                      </Button>
                    )
                  }
                  sx={{ mb: 24 }}
                />
                <Typography mb={72} color="text.secondary" variant="title">
                  {galleryId && artistId ? 'Edit' : 'Add new'} gallery
                </Typography>
                <Grid container>
                  <Grid xs={10} sm={6} lg={3} sx={{ mb: 16 }}>
                    <FormControl fullWidth error={!!(errors.thumbnail && touched.thumbnail)} disabled={isSubmitting}>
                      {/* @ts-ignore */}
                      <InputLabel variant="alone">Thumbnail</InputLabel>
                      <Dropzone
                        label="Drag image here to upload"
                        accept={['.png', '.jpg', '.svg']}
                        onDrop={(files) => handleImageUpload(files, 'thumbnail', setFieldValue)}
                        preview={
                          typeof values.thumbnail == 'string' ? values.thumbnail : getObjectUrl(values.thumbnail)
                        }
                      />
                      <FormHelperText>
                        {errors.thumbnail && touched.thumbnail && String(errors.thumbnail)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={24}>
                  <Stack spacing={16} sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Gallery Title"
                      disabled={isSubmitting}
                      value={values.name}
                      error={!!(errors.name && touched.name)}
                      helperText={errors.name && touched.name && String(errors.name)}
                      onChange={(e) => {
                        setFieldValue('name', e.target.value);
                        setFieldValue('galleryURLId', e.target.value);
                        setSearchQuery(e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                     <p className='text-body3'>{replaceSpacesWithHyphen(values.name)}</p>
                    <Box sx={{ color: 'red', fontSize: '0.75rem' }}> {currentURL === replaceSpacesWithHyphen(searchQuery) ? null : isURLExists ? 'Gallery Name already exists in our system' : null}</Box>
                    <FormControl fullWidth>
                      {/* @ts-ignore */}
                      <InputLabel variant="alone">Status</InputLabel>
                      <SwitchField
                        value={values.isFeatured}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        checked={values.isFeatured}
                        onChange={(e) => {
                          setFieldValue('isFeatured', (e as React.ChangeEvent<HTMLInputElement>).target.checked);
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      {/* @ts-ignore */}
                      <InputLabel variant="alone">Public</InputLabel>
                      <SwitchField
                        trueLabel='Public'
                        falseLabel='Private'
                        value={values.isPublic}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        checked={values.isPublic}
                        onChange={(e) => {
                          setFieldValue('isPublic', (e as React.ChangeEvent<HTMLInputElement>).target.checked);
                        }}
                      />
                    </FormControl>
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      name="description"
                      label="Description"
                      disabled={isSubmitting}
                      value={values.description}
                      error={!!(errors.description && touched.description)}
                      helperText={errors.description && touched.description && String(errors.description)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">SELECT BLOCKCHAIN</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.chain}
                        label="Chain"
                        onChange={(e) => {
                          setFieldValue('chain', (e as React.ChangeEvent<HTMLInputElement>).target.value);
                        }}
                      >
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="CSPR">CSPR</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      name="contractId"
                      label="Contract ID"
                      disabled={isSubmitting}
                      value={values.contractId}
                      error={!!(errors.contractId && touched.contractId)}
                      helperText={errors.contractId && touched.contractId && String(errors.contractId)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </Card>
      {artistId && galleryId && nfts.length > 0 && (
        <Card sx={{ marginTop: 20 }}>
          <Table
            title="NFTS"
            data={nfts}
            columns={columns}
            totalPage={totalPage}
            pageNumber={pageNumber}
            onPageChange={handlePageChange}
            order={order}
            orderBy={orderBy}
            isLoading={isLoading}
            onSort={handleSort}
            onNew={handleNew}
            onDelete={handleDelete}
            onEdit={handleEdit}
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
        </Card>
      )}
    </>
  );
};
