// Dependencies
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Template1 from '../../../assets/tamplates/template1';
import Template2 from '../../../assets/tamplates/template2';
import Template3 from '../../../assets/tamplates/template3';
import Template4 from '../../../assets/tamplates/template4';
import Template5 from '../../../assets/tamplates/template5';
// Apis
import { ArtistApi, CategoriesApi, GalleryApi, ProductsApi } from '../../../apis';
// Components
import { DateRangePicker, Dropzone, SwitchField } from '../../../components';
import { TextInput } from '../../../components/TextInput';
// Constants
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../constants';
import { CURRENCY, PRODUCT_TYPE } from '../../../shared/enums';
// Types
import { ICategory, IFile, IProduct } from '../../../shared/types';
import { getAccount, getSearchExp } from '../../../store/selectors';
// Styles
import * as S from './styles';
import ImageCropDialog from '../../../components/ImageCropper';
import { replaceSpacesWithHyphen } from '../../../utils';
import { useDebounce } from '../../../hooks/useDebounce';

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

const components = [
  {
    value: 'Template4',
    label: 'Template 1',
    Comp: Template4,
    props: {}
  },
  {
    value: 'Template5',
    label: 'Template 2',
    Comp: Template5,
    props: {}
  },
  {
    value: 'Template2',
    label: 'Template 3',
    Comp: Template2,
    props: {}
  },
  {
    value: 'Template1',
    label: 'Template 4',
    Comp: Template1,
    props: {}
  },
  {
    value: 'Template3',
    label: 'Template 5',
    Comp: Template3,
    props: {}
  }
];

export const EventForm = ({
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
  setDateValue,
  searchQuery,
  setSearchQuery,
  isURLExists,
  setIsURLExists
}) => {

  const [upImg, setUpImg] = useState();
  const [cropFieldValue, setCropFieldValue] = useState('');
  const [artists, setArtists] = useState<any>([]);
  const [galleries, setGalleries] = useState<any>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [icon, setIcon] = useState<string | any>('');
  const [value, setValue] = React.useState('Template4');
  const [open, setOpen] = useState(false);
  const [svg, setSvg] = useState<string>();
  const [currentURL, setCurrentUrl] = useState('');
  const [svgBlob, setSvgBlob] = useState<any>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artistId');
  const galleryId = searchParams.get('galleryId') || product.galleryId;
  const account = useSelector(getAccount);

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const searchExp = useSelector(getSearchExp);
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

  const handleMusicUpload = (files, setFieldValue: any) => {
    if (files && files.length > 0) {
      const file = files[0];
      const blob = new Blob([file], { type: file.type });
      const newBlob = blob.slice(0, blob.size / 10);
      const previewFile = new File([newBlob], `preview-${file.name}`, {
        type: file.type
      });

      setFieldValue('music', file);
      setFieldValue('preview', previewFile);
    }
  };

  const handleVideoUpload = (files, setFieldValue: any) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFieldValue('video', file);
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
    navigate(ROUTES.EVENT.LIST);
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

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    // Check if the input is a valid positive number
    if (/^[1-9][0-9]*$/.test(value) && value != '') {
      setFieldValue(name, value);
    } else {
      setFieldValue(name, '');
    }
  };

  const handleChangeRadio = async (value: string) => {
    setValue(value);
    const svg = document.getElementById(value);
    // console.log('🚀 ~ file: index.tsx:275 ~ handleChangeRadio ~ svg:', svg);
    // @ts-ignore
    const data = new XMLSerializer().serializeToString(svg);
    const svgBlobData = new Blob([data], {
      type: 'image/svg+xml'
    });
    const url = URL.createObjectURL(svgBlobData);
    setSvg(url);
    setSvgBlob(svgBlobData);
  };
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
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <ImageCropDialog open={open} handleCloseDialog={handleCloseDialog} upImg={upImg} setFieldValue={setFieldValue} cropFieldValue={cropFieldValue} />
      <Stack direction="row" display={'flex'} gap={48}>
        <Stack spacing={16} sx={{ width: '50%' }}>
          <TextInput
            name="name"
            label="Name"
            disabled={isSubmitting}
            value={values.name}
            error={!!(errors.name && touched.name)}
            helperText={errors.name && touched.name && String(errors.name)}
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
            disabled={isSubmitting}
            value={values.description}
            error={!!(errors.description && touched.description)}
            helperText={errors.description && touched.description && String(errors.description)}
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
            {errors.category && touched.category && (
              <FormHelperText error>{String(errors.category)}</FormHelperText>
            )}
          </FormControl>
          <Box>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <TextInput
                  name="price"
                  label="Price"
                  type="number"
                  disabled={isSubmitting}
                  value={values.price?.toString()}
                  error={!!(errors.price && touched.price)}
                  helperText={errors.price && touched.price && String(errors.price)}
                  onChange={handlePriceChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography color="text.black" fontSize={14}>
                  Currency
                </Typography>
                <S.StyledSelect
                  fullWidth
                  name="currency"
                  label="Currency"
                  disabled={isSubmitting}
                  value={values.currency}
                  error={!!(errors.currency && touched.currency)}
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
            disabled={isSubmitting}
            value={values.statement}
            error={!!(errors.statement && touched.statement)}
            helperText={errors.statement && touched.statement && String(errors.statement)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            name="location"
            label="Location"
            value={values.location}
            disabled={isSubmitting}
            error={!!(errors.location && touched.location)}
            helperText={errors.location && touched.location && String(errors.location)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Box>
            <DateRangePicker setDateValue={setDateValue} />
          </Box>
          <FormControl fullWidth>
            {/* @ts-ignore */}
            <Typography color="text.black" fontSize={14}>
              Status
            </Typography>
            <SwitchField />
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mt: '24px' }}>
            <Typography color="text.black" fontSize={14}>
              Select Artist
            </Typography>
            <S.StyledSelect
              labelId="artist"
              id="artistId"
              name="artistId"
              fullWidth
              disabled={!!(artistId || product?.artistId)}
              value={artist ? artist.id : values.artistId}
              onChange={(e) => {
                handleChange(e);
                // setFieldValue('gallery', '');
              }}
              defaultValue="SOmething"
              input={<OutlinedInput label="SELECT ARTIST" />}
              MenuProps={MenuProps}
              error={!!(errors.artistId && touched.artistId)}
            >
              {artists?.length > 0 ? (
                artists.map((art) => {
                  return <MenuItem value={art.id}>{art.name}</MenuItem>;
                })
              ) : (
                <MenuItem value={values.artistId}>{values.artistId}</MenuItem>
              )}
            </S.StyledSelect>
            {errors.artistId && touched.artistId && (
              <FormHelperText error>{String(errors.artistId)}</FormHelperText>
            )}
          </FormControl>
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
              {galleries.length > 0 ? galleries?.map((gallery) => {
                return <MenuItem value={gallery.id}>{gallery.name}</MenuItem>;
              }) : null}
              {/* {gallery?._id && <MenuItem value={values.gallery}>{values.gallery}</MenuItem>}

                    {!gallery?._id || (product.galleryId && galleries.length > 0)
                      ? galleries?.map((gallery) => {
                          return <MenuItem value={gallery.id}>{gallery.name}</MenuItem>;
                        })
                      : null} */}
            </S.StyledSelect>
            {errors.gallery && touched.gallery && <FormHelperText error>{String(errors.gallery)}</FormHelperText>}
          </FormControl>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={24}>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl
                  fullWidth
                  error={!!(errors.thumbnail && touched.thumbnail)}
                  disabled={isSubmitting}
                >
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>
                    Thumbnail
                  </Typography>
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
              <Grid item xs={12} md={6} lg={6}>
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
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.icon?.fieldname}/${values.icon?.filename}`
                        : values.icon
                          ? getObjectUrl(values.icon)
                          : false
                    }
                  />
                  <FormHelperText>
                    {errors.icon && touched.icon && String(errors.icon)}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth
                  disabled={isSubmitting}>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>Video</Typography>
                  <Dropzone
                    label="Drag video here to upload"
                    accept={['.mp4']}
                    onDrop={(files) => handleVideoUpload(files, setFieldValue)}
                    videoSrc={
                      values.video?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.video?.fieldname}/${values.video?.filename}`
                        : values.video
                          ? getObjectUrl(values.video)
                          : ''
                    }
                  />
                  {values.video && (
                    <Typography sx={{ marginLeft: 1 }}>
                      <b>Video File:</b> {values.video.filename || values.video.name}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  {/* @ts-ignore */}
                  <Typography color="text.black" fontSize={14}>Music</Typography>
                  <Dropzone
                    label="Drag music here to upload"
                    accept={['.mp3']}
                    onDrop={(files) => handleMusicUpload(files, setFieldValue)}
                    audioSrc={
                      values.music?.fieldname
                        ? `${REACT_APP_API_ASSETS_SERVER}/${values.music?.filename}`
                        : values.music
                          ? getObjectUrl(values.music)
                          : ''
                    }
                  />
                  {values.music && (
                    <Typography sx={{ marginLeft: 1 }}>
                      <b>Music File:</b> {values.music.filename || values.music.name}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container marginTop={40}>
              <Grid item xs={12} alignSelf={'center'}>
                <FormControl>
                  <Typography color="text.black" fontSize={14}>
                    Ticket Style
                  </Typography>
                  {/* @ts-ignore */}
                  <S.StylesRadioGroup
                    value={value}
                    aria-labelledby="demo-radio-buttons-group-label"
                    onChange={(event, value) => handleChangeRadio(value)}
                  >
                    {components.map(({ Comp, label, value }, index) => {
                      return (
                        <Box>
                          <FormControlLabel label={label} value={value} control={<Radio value={value} />} />
                          <Comp
                            key={index}
                            startTime={values.startTime}
                            endTime={values.endTime}
                            name={values.name.toUpperCase()}
                            height={200}
                            width={'100%'}
                            base64={icon}
                            location={values.location}
                          />
                        </Box>
                      );
                    })}
                  </S.StylesRadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={24}>
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
