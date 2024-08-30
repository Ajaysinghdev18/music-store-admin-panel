// Dependencies
// Material
import {
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
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
// Form
import { Form, Formik, FormikHelpers } from 'formik';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Router
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

// Icons
import {
  ArrowLeftIcon,
  DeleteIcon,
  PublishIcon,
  RecycleIcon,
  TextFieldCopyIcon,
  UpdateIcon
} from '../../../../../assets/icons';
// Component
import { ALERT_CATEGORY, ALERT_TYPES, Alert, Dropzone, SwitchField } from '../../../../../components';
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../../../constants';
import { IFile } from '../../../../../shared/types';
import { removeAlert, setAlert } from '../../../../../store/actions/alert.actions';
import { getAlert } from '../../../../../store/selectors';
import { getObjectUrl } from '../../../../../utils/common';
import { ArtistDetailNFTListPage } from '../List/NFT';

const initialValues = {
  name: '',
  thumbnail: null as unknown as IFile,
  description: '',
  ethereumId: '',
  csprId: '',
  isFeatured: false,
  isPublic: false
};

const gallery = {
  name: '',
  thumbnail: null as unknown as IFile,
  description: '',
  ethereumId: '',
  csprId: '',
  isFeatured: false,
  isPublic: false
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(50, 'Please enter less than 50 characters').required('Name is required!'),
  thumbnail: Yup.object().required('Thumbnail is required!'),
  description: Yup.string().required('Description is required!'),
  ethereumId: Yup.string().required('Gallery ID for ETH is required!'),
  csprId: Yup.string().required('Gallery ID for CSPR is required!')
});

export const ArtistGalleryNewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const getAlertState = useSelector(getAlert);

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const handleRemove = () => {
    navigate(-1);
  };
  const handleClickPublish = () => {
    dispatch(
      setAlert({
        type: ALERT_TYPES.SUCCESS,
        category: ALERT_CATEGORY.ARTIST
      })
    );
    navigate(ROUTES.ARTIST.GALLERY_DETAIL.replace(':id', '12121212'));
  };

  const handleSubmit = (values, { setSubmitting }: FormikHelpers<any>) => {
    dispatch(
      setAlert({
        type: ALERT_TYPES.SUCCESS,
        category: ALERT_CATEGORY.ARTIST
      })
    );
    setSubmitting(false);
    navigate(ROUTES.ARTIST.GALLERY_DETAIL.replace(':id', '12121212'));
  };

  const handleImageUpload = (files, field: string, setFieldValue: any) => {
    if (files && files.length > 0) {
      setFieldValue(field, files[0]);
    }
  };

  const handleAlertClose = () => {
    dispatch(removeAlert());
  };

  return (
    <>
      {getAlertState && (
        <Alert
          type={ALERT_TYPES.SUCCESS}
          title="Great!"
          content="New gallery published successfully."
          onClose={handleAlertClose}
        />
      )}
      <Card sx={{ mb: 8 }}>
        {id && !gallery ? (
          <Box height={300} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <CardHeader
                  title={
                    <Button variant="text" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
                      Back
                    </Button>
                  }
                  action={
                    isMobile ? (
                      <Stack direction="row" spacing={16}>
                        <IconButton onClick={handleRemove} sx={{ display: id ? 'flex' : 'none' }}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={handleClickPublish}>{id ? <PublishIcon /> : <UpdateIcon />}</IconButton>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={16}>
                        <Button
                          variant="outlined"
                          startIcon={<RecycleIcon />}
                          onClick={handleRemove}
                          sx={{ display: id ? 'flex' : 'none' }}
                        >
                          Remove this gallery
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                          startIcon={
                            isSubmitting ? <CircularProgress size={20} /> : id ? <UpdateIcon /> : <PublishIcon />
                          }
                          onClick={handleClickPublish}
                        >
                          {id ? 'Update' : 'Publish'}
                        </Button>
                      </Stack>
                    )
                  }
                  sx={{ mb: 24 }}
                />
                <Typography mb={72} color="text.secondary" variant="title">
                  {id ? 'Gallery Info' : 'Add new gallery'}
                </Typography>
                <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={24}>
                  <Stack spacing={4} sx={{ flex: 1 }}>
                    <Grid container spacing={28} justifyContent="space-between">
                      <Grid item xs={12} md={6} mt={24}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="name"
                            label="NAME"
                            disabled={isSubmitting}
                            value={values.name}
                            error={!!(errors.name && touched.name)}
                            helperText={errors.name && touched.name && String(errors.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} mt={24}>
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
                        </Grid>
                        <Grid item xs={12} mt={24}>
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
                        </Grid>
                        <Grid item xs={12} mt={24}>
                          <TextField
                            fullWidth
                            multiline
                            minRows={7}
                            name="description"
                            label="DESCRIPTION"
                            disabled={isSubmitting}
                            value={values.description}
                            error={!!(errors.description && touched.description)}
                            helperText={errors.description && touched.description && String(errors.description)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={3} mt={24}>
                        <FormControl
                          fullWidth
                          error={!!(errors.thumbnail && touched.thumbnail)}
                          disabled={isSubmitting}
                        >
                          {/* @ts-ignore */}
                          <InputLabel variant="alone">Gallery Thumbnail</InputLabel>
                          <Dropzone
                            label="Drag image here to upload"
                            accept={['.png', '.jpg', '.svg']}
                            onDrop={(files) => handleImageUpload(files, 'thumbnail', setFieldValue)}
                            preview={
                              values.thumbnail?.fieldname
                                ? `${REACT_APP_API_ASSETS_SERVER}/${values.thumbnail?.fieldname}/${values.thumbnail?.filename}`
                                : values.thumbnail
                                ? getObjectUrl(values.thumbnail)
                                : false
                            }
                          />
                          <FormHelperText>
                            {errors.thumbnail && touched.thumbnail && String(errors.thumbnail)}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack spacing={4} sx={{ flex: 1 }}>
                    <Grid container spacing={28}>
                      <Grid item xs={12} md={6} mt={16}>
                        <TextField
                          fullWidth
                          name="ethereumId"
                          label={
                            isMobile ? 'Enter Id for ETH' : 'Enter the Gallery ID for the Ethereum (ETH) Blockchain'
                          }
                          disabled={isSubmitting}
                          value={values.ethereumId}
                          error={!!(errors.ethereumId && touched.ethereumId)}
                          helperText={errors.ethereumId && touched.ethereumId && String(errors.ethereumId)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={
                            id && values.ethereumId
                              ? {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton>
                                        <TextFieldCopyIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                              : undefined
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6} mt={16}>
                        <TextField
                          fullWidth
                          name="csprId"
                          label={
                            isMobile ? 'Enter Id for CSPR' : 'Enter the Gallery ID for the Casper (CSPR) Blockchain'
                          }
                          disabled={isSubmitting}
                          value={values.csprId}
                          error={!!(errors.csprId && touched.csprId)}
                          helperText={errors.csprId && touched.csprId && String(errors.csprId)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={
                            id && values.csprId
                              ? {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton>
                                        <TextFieldCopyIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }
                              : undefined
                          }
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </Card>
      {id && <ArtistDetailNFTListPage title="NFTs in this gallery" id={id} />}
    </>
  );
};
