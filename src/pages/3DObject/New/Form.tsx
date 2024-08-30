// Dependencies
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// Apis
import { ArtistApi, CategoriesApi, GalleryApi, ProductsApi } from '../../../apis';
// Components
import { Dropzone, SwitchField } from '../../../components';
import { TextInput } from '../../../components/TextInput';
// Constants
import { API_SERVER, REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../constants';
import { CURRENCY, PRODUCT_TYPE } from '../../../shared/enums';
// Types
import { ICategory, IFile, IProduct } from '../../../shared/types';
import { getAccount, getSearchExp } from '../../../store/selectors';
// Styles
import * as S from './styles';
import ImageCropDialog from '../../../components/ImageCropper';
import { replaceSpacesWithHyphen } from '../../../utils';
import { useDebounce } from '../../../hooks/useDebounce';
import { FeatureField, MultipleFeatureField } from '../../../components/FeaturesFiled';

const initialValues: IProduct = {
  type: PRODUCT_TYPE.IMAGE,
  name: '',
  thumbnail: null as unknown as IFile,
  category: [],
  description: '',
  price: undefined,
  currency: CURRENCY.DOLLAR,
  sku: '',
  statement: '',
  artistId: '',
  gallery: ''
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const ObjectForm = ({
  setGallery,
  gallery,
  artist,
  product,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  errors,
  touched,
  isSubmitting,
  setArtist,
  setProduct,
  searchQuery,
  setSearchQuery,
  isURLExists,
  setIsURLExists,
  fieldsArray,
  setFieldsArray,
  multiFieldsArray,
  setMultiFieldsArray
}) => {
  const [artists, setArtists] = useState<any>([]);
  const [galleries, setGalleries] = useState<any>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [open, setOpen] = useState(false);
  const [upImg, setUpImg] = useState();
  const [cropFieldValue, setCropFieldValue] = useState('');
  const [currentURL, setCurrentUrl] = useState('');

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artistId');
  const galleryId = searchParams.get('galleryId') || product.galleryId;

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const searchExp = useSelector(getSearchExp);
  const account = useSelector(getAccount);

  useEffect(() => {
    setCurrentUrl(replaceSpacesWithHyphen(product.name));
  }, [product]);

  useEffect(() => {
    CategoriesApi.readAll()
      .then((res) => {
        setCategories(res.categories);
      })
      .catch((err) => console.log(err));
    ArtistApi.readAll({
      query: {
        keyword: searchExp
      }
    })
      .then((res) => {
        if (account.role === 'admin') {
          setArtists(res.artists);
        }else{
          setArtists(res.artists.filter(artist => artist.id === account.artistId));
        }
      })
      .catch((err) => {
        console.log('err :', err);
      });
  }, []);

  const handleObjectUpload = (files, setFieldValue: any) => {
    if (files && files.length > 0) {
      const file = files[0];
      setProduct({ ...product, object: file });
      setFieldValue('object', file);
    }
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    // Check if the input is a valid positive number
    if (/^[1-9][0-9]*$/.test(value) && value != '') {
      setFieldValue(name, value);
    } else {
      setFieldValue(name, '');
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

  const handleCancel = () => {
    navigate(ROUTES.OBJECT.LIST);
  };

  const renderSelectedCategories = (selected) => {
    const selectedCategoriesName = selected.map((cat) => {
      const category = categories.find((c) => (typeof cat === 'string' ? c.id === cat : c.id === cat.id));
      return category?.name;
    });

    return selectedCategoriesName.join(', ');
  };

  const getObjectUrl = (file) => {
    const url = URL.createObjectURL(file);
    return url.toString();
  };

  useEffect(() => {
    if (values.artistId && !artistId) {
      GalleryApi.readAll(values.artistId)
        .then((res) => {
          setGalleries(res.galleries);
          if (galleryId || product.galleryId) {
            const galleryFound = res.galleries.find((gallery) => gallery._id == galleryId);
            setGallery(galleryFound);
            setFieldValue('gallery', galleryFound.name);
          }
        })
        .catch((err) => {
          console.log('err :', err);
        });
    }
  }, [values.artistId]);

  useEffect(() => {
    if (artistId) {
      ArtistApi.read(artistId)
        .then((res) => {
          setArtist(res.artist);
          setProduct({ ...initialValues, artistId: res.artist.name });
        })
        .catch((err) => {
          console.log('err :', err);
        });
      GalleryApi.readAll(artistId)
        .then((res) => {
          setGalleries(res.galleries);
          if ((artistId && galleryId) || product.galleryId) {
            const galleryFound = res.galleries.find((gallery) => gallery._id == galleryId);
            setGallery(galleryFound);
            setFieldValue('gallery', galleryFound.name);
          }
        })
        .catch((err) => {
          console.log('err :', err);
        });
    }
  }, [artistId]);
  // Your search function that makes API calls (replace the URL with your actual API endpoint)
  const performSearch = async () => {
    try {
      const response = await ProductsApi.verifyUrlId(replaceSpacesWithHyphen(searchQuery));
      setIsURLExists(response.exists);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const debounceQuery = useDebounce(searchQuery);

  // Handle input change
  const handleInputChange = (value, field) => {
    setFieldValue(field, value);
    setFieldValue('productURLId', replaceSpacesWithHyphen(value));
    setSearchQuery(value);
  };

  useEffect(() => {
    if (values.name) {
      performSearch();
    }
  }, [debounceQuery, values.name]);


  const renderObject = useMemo(() => {
    const url = values.object
      ? values.object.filename
        ? `${API_SERVER}/${values.object.fieldname}/${values.object.filename}`
        : getObjectUrl(values.object)
      : '';
    return (
      <Dropzone
        label="Drag 3d file here to upload"
        accept={['.glb']}
        onDrop={(files) => handleObjectUpload(files, setFieldValue)}
        objectSrc={url}
      />
    );
  }, [values.object]);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ImageCropDialog open={open} handleCloseDialog={handleCloseDialog} upImg={upImg} setFieldValue={setFieldValue} cropFieldValue={cropFieldValue} />
      <Stack direction="row" spacing={24}>
        <Stack spacing={16} sx={{ flex: 1 }}>
          {isMobile && (
            <Grid container spacing={24}>
              <Grid item xs={12} md={12}>
                <FormControl
                  fullWidth
                  error={!!(errors.thumbnail && touched.thumbnail)}
                  disabled={isSubmitting}
                  hiddenLabel
                >
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Object
                  </Typography>
                  <Dropzone
                    label="Drag Object here to upload"
                    accept={['.glb']}
                    onDrop={(files) => handleObjectUpload(files, setFieldValue)}
                    preview={
                      values.image?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.image?.fieldname}/${values.image?.filename}?timestamp=${Date.now()}`
                        : values.image
                          ? getObjectUrl(values.image)
                          : false
                    }
                  />
                  <FormHelperText>{errors.image && touched.image && String(errors.image)}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!(errors.icon && touched.icon)} disabled={isSubmitting}>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Icon
                  </Typography>
                  <Dropzone
                    label="Drag image here to upload"
                    accept={['.png', '.jpg', '.svg']}
                    onDrop={(files) => handleImageUpload(files, 'icon', setFieldValue)}
                    preview={
                      values.icon?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.icon?.fieldname}/${values.icon?.filename}?timestamp=${Date.now()}`
                        : values.icon
                          ? getObjectUrl(values.icon)
                          : false
                    }
                  />
                  <FormHelperText>{errors.icon && touched.icon && String(errors.icon)}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!(errors.sign && touched.sign)} disabled={isSubmitting}>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Signature
                  </Typography>
                  <Dropzone
                    label="Drag image here to upload"
                    accept={['.png', '.jpg', '.svg']}
                    onDrop={(files) => handleImageUpload(files, 'sign', setFieldValue)}
                    preview={
                      values.sign?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.sign?.fieldname}/${values.sign?.filename}?timestamp=${Date.now()}`
                        : values.sign
                          ? getObjectUrl(values.sign)
                          : false
                    }
                  />
                  <FormHelperText>{errors.sign && touched.sign && String(errors.sign)}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          )}
          <TextInput
            name="name"
            label="Name"
            value={values.name}
            error={!!(errors.name && touched.name)}
            helperText={errors.name && touched.name && String(errors.name)}
            disabled={isSubmitting}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
            onBlur={handleBlur}
          />
          <p className='text-body3'>{replaceSpacesWithHyphen(values.name)}</p>
          <Box sx={{ color: 'red', fontSize: '0.75rem' }}> {currentURL === replaceSpacesWithHyphen(searchQuery) ? null : isURLExists ? 'Product Name already exists in our system' : null}</Box>
          <TextInput
            multiline
            minRows={5}
            name="description"
            label="Description"
            value={values.description}
            error={!!(errors.description && touched.description)}
            helperText={errors.description && touched.description && String(errors.description)}
            disabled={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl fullWidth size="small" sx={{ marginTop: '0.5rem' }}>
            <Typography color="text.black" fontSize={14}>
              Category
            </Typography>
            <S.StyledSelect
              labelId="category"
              id="category"
              name="category"
              multiple
              fullWidth
              value={values.category}
              onChange={handleChange}
              input={<OutlinedInput label="Category" />}
              renderValue={(selected) => renderSelectedCategories(selected)}
              MenuProps={MenuProps}
              error={!!(errors.category && touched.category)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </S.StyledSelect>
            {errors.category && touched.category && <FormHelperText error>{String(errors.category)}</FormHelperText>}
          </FormControl>
          <Box>
            <Grid container spacing={16}>
              <Grid item xs={9}>
                <TextInput
                  name="price"
                  label="Price"
                  type="number"
                  value={values.price}
                  error={!!(errors.price && touched.price)}
                  helperText={errors.price && touched.price && String(errors.price)}
                  disabled={isSubmitting}
                  onChange={handlePriceChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography color="text.black" fontSize={14}>
                  Currency
                </Typography>
                <S.StyledSelect
                  fullWidth
                  name="currency"
                  label="Currency"
                  value={values.currency}
                  error={!!(errors.currency && touched.currency)}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="€">€</MenuItem>
                </S.StyledSelect>
              </Grid>
            </Grid>
          </Box>
          <TextInput
            name="sku"
            label="SKU"
            value={values.sku}
            error={!!(errors.sku && touched.sku)}
            helperText={errors.sku && touched.sku && String(errors.sku)}
            disabled={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            multiline
            minRows={5}
            name="statement"
            label="Statement"
            value={values.statement}
            error={!!(errors.statement && touched.statement)}
            helperText={errors.statement && touched.statement && String(errors.statement)}
            disabled={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {values.thumbnail && location.pathname.includes('/edit') && (
            <>
              <TextInput
                name="thumbnailIpfs"
                label="Thumbnail Ipfs"
                value={values.thumbnail?.ipfsHash}
                disabled={true}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                name="imageIpfs"
                label="Image Ipfs"
                value={values.image?.ipfsHash}
                disabled={true}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <TextInput
                name="iconIpfs"
                label="Icon Ipfs"
                value={values.icon?.ipfsHash}
                disabled={true}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                name="signIpfs"
                label="Sign Ipfs"
                value={values.sign?.ipfsHash}
                disabled={true}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </>
          )}

          {/*{!id && (*/}
          {/*  <FormControl fullWidth>*/}
          {/*    /!* @ts-ignore *!/*/}
          {/*    <InputLabel variant="alone">PREPARE PRODUCT AS NFT</InputLabel>*/}
          {/*  </FormControl>*/}
          {/*)}*/}
          <FormControl fullWidth>
            {/* @ts-ignore */}
            <Typography color="text.black" fontSize={14}>
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
          <FormControl fullWidth>
            {/* @ts-ignore */}
            <Box fontSize={'14px'}>Auction</Box>
            <SwitchField
              value={values.isAuction}
              disabled={isSubmitting}
              onBlur={handleBlur}
              checked={values.isAuction}
              onChange={(e) => {
                setFieldValue('isAuction', (e as React.ChangeEvent<HTMLInputElement>).target.checked);
              }}
              trueLabel='Auctioned'
              falseLabel='No Auction'
            />
          </FormControl>
        </Stack>
        {!isMobile && (
          <Stack sx={{ flex: 1 }}>
            <Grid container spacing={24}>
              <Grid item xs={12} md={12}>
                <FormControl
                  fullWidth
                  error={!!(errors.thumbnail && touched.thumbnail)}
                  disabled={isSubmitting}
                  hiddenLabel
                >
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Object
                  </Typography>
                  {renderObject}
                  <FormHelperText>{errors.image && touched.image && String(errors.image)}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!(errors.icon && touched.icon)} disabled={isSubmitting}>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Icon
                  </Typography>
                  <Dropzone
                    label="Drag image here to upload"
                    accept={['.png', '.jpg', '.svg']}
                    onDrop={(files) => handleImageUpload(files, 'icon', setFieldValue)}
                    preview={
                      values.icon?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.icon?.fieldname}/${values.icon?.filename}?timestamp=${Date.now()}`
                        : values.icon
                          ? getObjectUrl(values.icon)
                          : false
                    }
                  />
                  <FormHelperText>{errors.icon && touched.icon && String(errors.icon)}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!(errors.sign && touched.sign)} disabled={isSubmitting}>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Signature
                  </Typography>
                  <Dropzone
                    label="Drag image here to upload"
                    accept={['.png', '.jpg', '.svg']}
                    onDrop={(files) => handleImageUpload(files, 'sign', setFieldValue)}
                    preview={
                      values.sign?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.sign?.fieldname}/${values.sign?.filename}?timestamp=${Date.now()}`
                        : values.sign
                          ? getObjectUrl(values.sign)
                          : false
                    }
                  />
                  <FormHelperText>{errors.sign && touched.sign && String(errors.sign)}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small" sx={{ mt: '24px' }}>
                  <Typography color="text.black" fontSize={14}>
                    Select Artist
                  </Typography>

                  <S.StyledSelect
                    labelId="artist"
                    id="artistId"
                    name="artistId"
                    fullWidth
                    disabled={!!(artistId || product.artistId)}
                    value={artist ? artist.id : values.artistId}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('gallery', '');
                    }}
                    defaultValue="SOmething"
                    input={<OutlinedInput label="SELECT ARTIST" />}
                    MenuProps={MenuProps}
                    error={!!(errors.artistId && touched.artistId)}
                  >
                    {artists?.length > 0 ? (
                      artists.map((art) => {
                        return (
                          <MenuItem key={art.id} value={art.id}>
                            {art.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={values.artistId}>{values.artistId}</MenuItem>
                    )}
                  </S.StyledSelect>
                  {errors.artistId && touched.artistId && (
                    <FormHelperText error>{String(errors.artistId)}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small" sx={{ mt: '24px' }}>
                  <Typography color="text.black" fontSize={14}>
                    Select Gallery
                  </Typography>
                  <S.StyledSelect
                    labelId="gallery"
                    id="gallery"
                    name="gallery"
                    fullWidth
                    disabled={!!gallery?._id}
                    value={values.gallery}
                    onChange={handleChange}
                    input={<OutlinedInput label="SELECT GALLERY" />}
                    error={!!(errors.gallery && touched.gallery)}
                  >
                    {gallery?._id && <MenuItem value={values.gallery}>{values.gallery}</MenuItem>}
                    {!gallery?._id || (product.galleryId && galleries.length > 0)
                      ? galleries?.map((gallery) => {
                        return <MenuItem value={gallery.id}>{gallery.name}</MenuItem>;
                      })
                      : null}
                  </S.StyledSelect>
                  {errors.gallery && touched.gallery && <FormHelperText error>{String(errors.gallery)}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FeatureField setFieldsArray={setFieldsArray} fieldsArray={fieldsArray} />
                  <MultipleFeatureField multiFieldsArray={multiFieldsArray} setMultiFieldsArray={setMultiFieldsArray} />
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        )}
      </Stack>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={16}>
        <Stack direction="row" gap={16} spacing={1}>
          <S.CancelButton variant="outlined" onClick={handleCancel}>
            Cancel
          </S.CancelButton>
          <S.SaveButton
            type="submit"
            disabled={currentURL === replaceSpacesWithHyphen(searchQuery) ? false : isURLExists ? true : isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
          >
            {product ? 'Save' : 'Create'}
          </S.SaveButton>
        </Stack>
      </Box>
    </Fragment>
  );
};
