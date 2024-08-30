// Dependencies
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CardHeader,
  CircularProgress,
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
import { Form, Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { ArtistApi, ProductsApi } from '../../../apis';
import { EyeIcon, PlusIcon, RecycleIcon, UpdateIcon } from '../../../assets/icons';
import { Dropzone, RoundedButton, SwitchField } from '../../../components';
import { TextInput } from '../../../components/TextInput';
import { ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { IArtist, IFile } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import { getObjectUrl, replaceSpacesWithHyphen } from '../../../utils';
import * as S from './styles';

import ImageCropDialog from '../../../components/ImageCropper';
import { useDebounce } from '../../../hooks/useDebounce';

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/[a-zA-Z]/, 'Password should contain at least one alphabet!' as string)
    .matches(/\d/, 'Password should contain at least one number!' as string)
    .min(8, 'Password should contain at least 8 characters!' as string)
    .required('Password should contain at least 8 characters!' as string),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Input a correct password!' as string)
    .required('Input a correct password!' as string)
    .matches(/[a-zA-Z]/, 'Password should contain at least one alphabet!' as string)
    .required('Password should contain at least one alphabet!' as string)
    .matches(/\d/, 'Password should contain at least one number!' as string)
    .required('Password should contain at least one number!' as string)
    .min(8, 'Password should contain at least 8 characters!' as string)
    .required('Password should contain at least 8 characters!' as string)
});


const initialValues = {
  name: '',
  thumbnail: null as unknown as IFile,
  email: '',
  bio: '',
  id: '',
  website: '',
  spotify: '',
  twitter: '',
  facebook: '',
  instagram: '',
  discord: '',
  apiKey: '',
  paypal: '',
  ethereumWallet: '',
  casperWallet: '',
  isFeatured: false,
  password: '',
  confirmPassword: '',
  productURLId: '',
  isCreating: true,
};

export const ArtistNewPage: FC = () => {
  const navigate = useNavigate();
  const [artist, setArtist] = useState<IArtist>(initialValues);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [upImg, setUpImg] = useState();
  const [cropFieldValue, setCropFieldValue] = useState('');
  const [isURLExists, setIsURLExists] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentURL, setCurrentUrl] = useState('');

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const formValidationSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Please enter less than 50 characters').required('Name is required!'),
    // thumbnail: Yup.object().required('Thumbnail is required!'),
    // thumbnail: Yup.mixed().when('$isCreating', {
    //   is: true,  // Check if it's a new item
    //   then: Yup.object().required('Thumbnail is required when creating a new item'), // Require thumbnail for new items
    //   otherwise: Yup.string().notRequired(), // Allow thumbnail to be empty or not provided for existing items
    // }),
    email: Yup.string().matches(/([@])/, 'Insert correct email').required('email is required!'),
    bio: Yup.string().required('BIO is required!'),
    id: Yup.string(),
    website: Yup.string()
      .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value))
      .required('Website address is required!'),
    spotify: Yup.string()
      .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value))
      .required('Spotify is required!'),
    twitter: Yup.string()
      .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value))
      .required('Twitter address is required!'),
    facebook: Yup.string()
      .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value))
      .required('Facebook address is required!'),
    instagram: Yup.string()
      .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value))
      .required('Instagram  is required!'),
    discord: Yup.string()
      .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value))
      .required('Discord is required!'),
    // apiKey: Yup.string().required('API key is required!'),
    // paypal: Yup.string().required('Paypal is required!'),
    ethereumWallet: Yup.string().matches(/^(0x){1}[0-9a-fA-F]{40}$/i, 'Please Enter valid Ethereum Wallet Address'),
    casperWallet: Yup.string().matches(/^(0[a-fA-F0-9]{65}|0[a-fA-F0-9]{67})$/, 'Invalid Casper wallet address'),
  });

  const validationSchema = id ? formValidationSchema : formValidationSchema.concat(passwordSchema);


  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleconfirmPasswordVisible = () => {
    setconfirmPasswordVisible(!confirmPasswordVisible);
  };

  useEffect(() => {
    setCurrentUrl(replaceSpacesWithHyphen(artist.name));
  }, [artist]);

  //useEffect
  useEffect(() => {
    dispatch(setSearchExp(''));
    if (id) {
      setLoading(true);
      ArtistApi.read(`${id}`)
        .then((res) => {
          setArtist({ ...res.artist, isCreating: false });
          setSearchQuery(replaceSpacesWithHyphen(res.artist.name));
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log('error', e);
        });
    }
  }, []);

  const handleRemove = () => {
    ArtistApi.remove(id as string)
      .then(() => {
        navigate(ROUTES.ARTIST.LIST);
        enqueueSnackbar('Success!', { variant: 'success' });
      })

      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:96 ~ .then ~ err', err);
        enqueueSnackbar(err.msg, { variant: 'error' });
      });
  };

  const handleSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    setSubmitting(true);
    try {
      const artist = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        artist.append(key, value as string);
      });
      artist.delete('artistURLId');
      artist.append('artistURLId', replaceSpacesWithHyphen(searchQuery));

      if (id) {
        await ArtistApi.update(`${id}`, artist as unknown as IArtist);
        navigate('/artists');
      } else {
        await ArtistApi.create(artist as unknown as IArtist);
        navigate('/artists');
      }
      setSubmitting(false);
    } catch (err: any) {
      console.log('error', err);
      setSubmitting(false);
      enqueueSnackbar(err.msg, { variant: 'success' });
    }
  };

  const handleImageUpload = (files, field: string, setFieldValue: any) => {
    if (files && files.length > 0) {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      //@ts-ignore
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(files[0]);
      setCropFieldValue(field);
      setOpen(true);
    }
  };

  const handlePreview = () => {
    navigate(ROUTES.ARTIST.DETAIL.replace(':id', `${id}`));
  };

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseDialog = () => {
    setOpen(false);
  };
  // Your search function that makes API calls (replace the URL with your actual API endpoint)
  const performSearch = async () => {
    try {
      const response = await ArtistApi.verifyUrlId(replaceSpacesWithHyphen(searchQuery));
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
    <Box paddingX={'1rem'}>
      {loading ? (
        <Box height={300} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Formik initialValues={artist} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <ImageCropDialog open={open} handleCloseDialog={handleCloseDialog} upImg={upImg} setFieldValue={setFieldValue} cropFieldValue={cropFieldValue} />
                <CardHeader
                  title={
                    <Typography color="text.black" fontWeight="600" variant="title">
                      {id ? 'Edit' : 'Add a new'} Artist
                    </Typography>
                  }
                  action={
                    id ? (
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
                          <Button variant="outlined" startIcon={<RecycleIcon />} onClick={handleRemove}>
                            Remove this artist
                          </Button>
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={currentURL === replaceSpacesWithHyphen(searchQuery) ? false : isURLExists ? true : isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <UpdateIcon />}
                          >
                            Update
                          </Button>
                          <Button variant="contained" startIcon={<EyeIcon />} onClick={handlePreview}>
                            Preview
                          </Button>
                        </Stack>
                      )
                    ) : (
                      <RoundedButton label={'Preview'} background={COLORS.BLUELIGHT} />
                    )
                  }
                  sx={{ mb: 24, paddingY: '2rem' }}
                />
                <Grid container>
                  <Grid xs={4} paddingRight={'5rem'}>
                    <Typography color={'text.black'} fontWeight={'600'} paddingBottom={'1rem'}>
                      Personal Info
                    </Typography>
                    <FormControl fullWidth error={!!(errors.thumbnail && touched.thumbnail)} disabled={isSubmitting}>
                      <Typography color="text.black" fontSize={14}>
                        Profile Picture
                      </Typography>
                      <Dropzone
                        label="Drag image here to upload"
                        accept={['.png', '.jpg', '.svg']}
                        onDrop={(files) => handleImageUpload(files, 'thumbnail', setFieldValue)}
                        preview={
                          values.thumbnail instanceof File
                            ? getObjectUrl(values.thumbnail)
                            : values.thumbnail
                              ? values.thumbnail
                              : false
                        }
                      />
                      <FormHelperText>
                        {errors.thumbnail && touched.thumbnail && String(errors.thumbnail)}
                      </FormHelperText>
                    </FormControl>
                    <TextInput
                      label="Name"
                      name="name"
                      disabled={isSubmitting}
                      value={values.name}
                      error={!!(errors.name && touched.name)}
                      helperText={errors.name && touched.name && String(errors.name)}
                      onChange={(e) => {
                        setFieldValue('name', e.target.value);
                        setFieldValue('artistURLId', e.target.value);
                        setSearchQuery(e.target.value);
                      }}
                    />
                    <p className='text-body3'>{replaceSpacesWithHyphen(values.name)}</p>
                    <Box sx={{ color: 'red', fontSize: '0.75rem' }}> {currentURL === replaceSpacesWithHyphen(searchQuery) ? null : isURLExists ? 'Artist Name already exists in our system' : null}</Box>
                    <TextInput
                      name="email"
                      label="Email"
                      // disabled={true}
                      disabled={id ? true : isSubmitting}
                      value={values.email}
                      error={!!(errors.email && touched.email)}
                      helperText={errors.email && touched.email && String(errors.email)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextInput
                      name="id"
                      label="ID"
                      disabled={isSubmitting}
                      value={values.id}
                      error={!!(errors.id && touched.id)}
                      helperText={errors.id && touched.id && String(errors.id)}
                      onChange={handleChange}
                    />
                    <TextInput
                      multiline={true}
                      minRows={5}
                      name="bio"
                      label="Bio"
                      disabled={isSubmitting}
                      value={values.bio}
                      error={!!(errors.bio && touched.bio)}
                      helperText={errors.bio && touched.bio && String(errors.bio)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextInput
                      name="website"
                      label="Website"
                      disabled={isSubmitting}
                      value={values.website}
                      error={!!(errors.website && touched.website)}
                      helperText={errors.website && touched.website && String(errors.website)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {!showMore ? (
                      <S.ShowMoreBox onClick={() => setShowMore(true)}>
                        <PlusIcon />
                        Add more
                      </S.ShowMoreBox>
                    ) : (
                      <>
                        <TextInput
                          name="spotify"
                          label="Spotify"
                          disabled={isSubmitting}
                          value={values.spotify}
                          error={!!(errors.spotify && touched.spotify)}
                          helperText={errors.spotify && touched.spotify && String(errors.spotify)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="twitter"
                          label="Twitter"
                          disabled={isSubmitting}
                          value={values.twitter}
                          error={!!(errors.twitter && touched.twitter)}
                          helperText={errors.twitter && touched.twitter && String(errors.twitter)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="facebook"
                          label="Facebook"
                          disabled={isSubmitting}
                          value={values.facebook}
                          error={!!(errors.facebook && touched.facebook)}
                          helperText={errors.facebook && touched.facebook && String(errors.facebook)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="instagram"
                          label="Instagram"
                          disabled={isSubmitting}
                          value={values.instagram}
                          error={!!(errors.instagram && touched.instagram)}
                          helperText={errors.instagram && touched.instagram && String(errors.instagram)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="discord"
                          label="Discord"
                          disabled={isSubmitting}
                          value={values.discord}
                          error={!!(errors.discord && touched.discord)}
                          helperText={errors.discord && touched.discord && String(errors.discord)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormControl fullWidth>
                          {/* @ts-ignore */}
                          <Typography color={'text.black'} fontSize={'14px'}>
                            Status
                          </Typography>
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
                      </>
                    )}
                    {isMobile && (
                      <>
                        <TextInput
                          name="apiKey"
                          label="API KEY"
                          disabled={isSubmitting}
                          value={values.apiKey}
                          error={!!(errors.apiKey && touched.apiKey)}
                          helperText={errors.apiKey && touched.apiKey && String(errors.apiKey)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="paypal"
                          label="Paypal"
                          disabled={isSubmitting}
                          value={values.paypal}
                          error={!!(errors.paypal && touched.paypal)}
                          helperText={errors.paypal && touched.paypal && String(errors.paypal)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="ethereumWallet"
                          label="Ethereum Wallet"
                          disabled={isSubmitting}
                          value={values.ethereumWallet}
                          error={!!(errors.ethereumWallet && touched.ethereumWallet)}
                          helperText={errors.ethereumWallet && touched.ethereumWallet && String(errors.ethereumWallet)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="casperWallet"
                          label="Casper Wallet"
                          disabled={isSubmitting}
                          value={values.casperWallet}
                          error={!!(errors.casperWallet && touched.casperWallet)}
                          helperText={errors.casperWallet && touched.casperWallet && String(errors.casperWallet)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </Grid>
                  {!isMobile && (
                    <Grid container xs={8} spacing={0} paddingX={'2rem'}>
                      <Grid xs={6} paddingRight={'1.5rem'}>
                        <Typography color={'text.black'} fontWeight={'600'} paddingBottom={'1rem'}>
                          Other Info
                        </Typography>
                        <TextInput
                          name="apiKey"
                          label="API Key"
                          disabled={isSubmitting}
                          value={values.apiKey}
                          error={!!(errors.apiKey && touched.apiKey)}
                          helperText={errors.apiKey && touched.apiKey && String(errors.apiKey)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="ethereumWallet"
                          label="Ethereum Wallet"
                          disabled={isSubmitting}
                          value={values.ethereumWallet}
                          error={!!(errors.ethereumWallet && touched.ethereumWallet)}
                          helperText={errors.ethereumWallet && touched.ethereumWallet && String(errors.ethereumWallet)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {/* <TextInput
                          name="password"
                          label="Password"
                          type="password"
                          disabled={isSubmitting}
                          value={values.password}
                          error={!!(errors.password && touched.password)}
                          helperText={errors.password && touched.password && String(errors.password)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        /> */}
                      </Grid>
                      <Grid xs={6} paddingLeft={'1.5rem'}>
                        <Typography color={'text.black'} fontWeight={'600'} paddingBottom={'1rem'}>
                          &nbsp;
                        </Typography>
                        <TextInput
                          name="paypal"
                          label="Paypal"
                          disabled={isSubmitting}
                          value={values.paypal}
                          error={!!(errors.paypal && touched.paypal)}
                          helperText={errors.paypal && touched.paypal && String(errors.paypal)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextInput
                          name="casperWallet"
                          label="Casper Wallet"
                          disabled={isSubmitting}
                          value={values.casperWallet}
                          error={!!(errors.casperWallet && touched.casperWallet)}
                          helperText={errors.casperWallet && touched.casperWallet && String(errors.casperWallet)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextField
                          fullWidth
                          name="password"
                          label="PASSWORD"
                          style={{ marginTop: 20 }}
                          disabled={isSubmitting}
                          type={passwordVisible ? 'text' : 'password'}
                          value={values.password}
                          error={!!(errors.password && touched.password)}
                          helperText={errors.password && touched.password && String(errors.password)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisible}>
                                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <TextField
                          fullWidth
                          name="confirmPassword"
                          label="CONFIRM PASSWORD"
                          type={confirmPasswordVisible ? 'text' : 'password'}
                          disabled={isSubmitting}
                          style={{ marginTop: 20 }}
                          value={values.confirmPassword}
                          error={!!(errors.confirmPassword && touched.confirmPassword)}
                          helperText={
                            errors.confirmPassword && touched.confirmPassword && String(errors.confirmPassword)
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={toggleconfirmPasswordVisible}>
                                  {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <Stack
                          display="flex"
                          flexDirection="row"
                          justifyContent="end"
                          alignItems="center"
                          gap={8}
                          mt={16}
                        >
                          {id ? null : <S.CancelButton disabled={isSubmitting} onClick={() => navigate(-1)}>Cancel</S.CancelButton>}
                          {id ? null : <S.SaveButton
                            disabled={currentURL === replaceSpacesWithHyphen(searchQuery) ? false : isURLExists ? true : isSubmitting}
                            type={'submit'}>Save</S.SaveButton>}
                        </Stack>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Form>
            );
          }}
        </Formik>
      )}
    </Box>
  );
};
