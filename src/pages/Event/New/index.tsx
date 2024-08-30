// Dependencies
import {
  Box,
  CardHeader,
  CircularProgress,
  Typography
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

// Apis
import { ArtistApi, CategoriesApi, GalleryApi, ProductsApi } from '../../../apis';
// Components
import {
  ConfirmDialog,
  PreviewDialog,
  RoundedButton,
} from '../../../components';

// Constants
import { ROUTES } from '../../../constants';
import { CURRENCY, PRODUCT_TYPE } from '../../../shared/enums';
// Types
import { ICategory, IFile, IProduct } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import { EventForm } from './Form';
import { replaceSpacesWithHyphen } from '../../../utils';


const initialValues: IProduct = {
  type: PRODUCT_TYPE.VIRTUAL_EVENT,
  name: '',
  thumbnail: null as unknown as IFile,
  icon: null as unknown as IFile,
  category: [],
  description: '',
  price: undefined,
  currency: CURRENCY.DOLLAR,
  sku: '',
  statement: '',
  isFeatured: false,
  location: '',
  attenders: [],
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
interface DateRange {
  startDate?: Date | any;
  endDate?: Date | any;
  key: string;
}
// Export new event page
export const NewEventPage: FC = () => {
  const [product, setProduct] = useState<IProduct | undefined>(initialValues);
  const [isLoading, setLoading] = useState(false);
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [visiblePreviewDialog, setVisiblePreviewDialog] = useState<boolean>(false);
  const [svg, setSvg] = useState<string>();
  const [artist, setArtist] = useState<any>('');
  const [gallery, setGallery] = useState<any>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isURLExists, setIsURLExists] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const artistId = searchParams.get('artistId');
  const galleryId = searchParams.get('galleryId');

  const dispatch = useDispatch();
  const isEditPage = {
    galleryValidation: false
  };

  if (location.pathname.includes('/events') && location.pathname.includes('/edit')) {
    isEditPage.galleryValidation = true;
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Please enter less than 50 characters').required('Name is required!'),
    // thumbnail: Yup.object().required('Thumbnail is required!'),
    category: Yup.array().required('Category is required!').min(1, 'Please select at least one of category'),
    price: Yup.number().required('Price is required!'),
    description: Yup.string().required('Description is required!'),
    currency: Yup.string()
      .matches(/([€$])/, 'Please select $ or €!')
      .required('Currency is required!'),
    location: Yup.string().max(50, 'Please enter less than 50 characters').required('Name is required!'),
    // startTime: Yup.date().required('Start time is required'),
    // endTime: Yup.date().required('End time is required')
    gallery: !isEditPage.galleryValidation ? Yup.string().required('Gallery is required!') : Yup.string(),
    artistId: Yup.string().required('Artist is required!')
  });


  const fetchProduct = () => {
    if (!id) return;
    if (isLoading) {
      // add your code
    }
    setLoading(true);
    ProductsApi.read(id)
      .then((res) => {
        const categoryIds = res.product.category.map((cat) => cat.id);
        setSearchQuery(replaceSpacesWithHyphen(res.product.name));
        setProduct({ ...res.product, category: categoryIds });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
    dispatch(setSearchExp(''));
  }, [location.pathname]);


  const handleSubmit = (values: IProduct, { setSubmitting }: FormikHelpers<any>) => {
    const newProduct = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'category') {
        value.forEach((cat) => newProduct.append(key, cat));
      } else {
        newProduct.append(key, value);
      }
    });
    newProduct.delete('next');
    newProduct.delete('productURLId');
    newProduct.append('productURLId', replaceSpacesWithHyphen(searchQuery));

    if (id && product) {
      if (_.isEqual(product?.thumbnail, values.thumbnail)) {
        newProduct.delete('thumbnail');
      }
      if (_.isEqual(product?.mask_thumbnail, values.mask_thumbnail)) {
        newProduct.delete('mask_thumbnail');
      }
      if (_.isEqual(product?.music, values.music)) {
        newProduct.delete('music');
        newProduct.delete('preview');
      }
      if (_.isEqual(product?.video, values.video)) {
        newProduct.delete('video');
      }

      newProduct.delete('auction');
      ProductsApi.update(id, newProduct as unknown as IProduct)
        .then(() => {
          setSubmitting(false);
          navigate(ROUTES.EVENT.LIST);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    } else {
      if (artistId) {
        newProduct.set('artistId', artist._id);
      }
      if (galleryId || gallery._id) {
        newProduct.set('gallery', gallery._id);
      }
      newProduct.append('startTime', dateValue.startDate);
      newProduct.append('endTime', dateValue.endDate);
      ProductsApi.create(newProduct as unknown as IProduct)
        .then(() => {
          setSubmitting(false);
          navigate(ROUTES.EVENT.LIST);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    }
  };

  const handleDeleteConfirmed = () => {
    if (id) {
      ProductsApi.remove(id)
        .then(() => navigate(ROUTES.EVENT.LIST))
        .catch((err) => console.log(err));
    }
  };


  const handleOpenPreviewDialog = () => {
    setVisiblePreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setVisiblePreviewDialog(false);
  };

  useEffect(() => {
    if (product?.artistId && !artistId) {
      GalleryApi.readAll(product?.artistId)
        .then((res) => {
          //@ts-ignore
          if (galleryId || product.galleryId) {
            const galleryFound = res.galleries.find((gallery) => gallery._id == galleryId);
            setGallery(galleryFound);
          }
        })
        .catch((err) => {
          console.log('err :', err);
        });
    }
  }, [product?.artistId]);



  useEffect(() => {
    if (artist) {
      ArtistApi.read(artist)
        .then((res) => {
          setArtist(res.artist);
          setProduct({ ...initialValues, artistId: res.artist.name });
        })
        .catch((err) => {
          console.log('err :', err);
        });
      GalleryApi.readAll(artist)
        .then((res) => {
          //@ts-ignore
          if ((artistId && galleryId) || product?.galleryId) {
            const galleryFound = res.galleries.find((gallery) => gallery._id == galleryId);
            setGallery(galleryFound);
          }
        })
        .catch((err) => {
          console.log('err :', err);
        });
    }
  }, [artistId]);

  return (
    <>
      <Box sx={{ overflow: 'visible', paddingRight: '1rem' }}>
        {id && !product ? (
          <Box height={300} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <CardHeader
              title={
                <Typography color="text.black" fontWeight={'600'} variant="title">
                  {id ? 'Edit' : 'Add a New'} Event
                </Typography>
              }
              action={<RoundedButton onClick={handleOpenPreviewDialog} label={'Preview'} />}
              sx={{ mb: 24 }}
            />
            <Formik
              enableReinitialize
              initialValues={product || initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <EventForm
                    artist={artist}
                    product={product}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    values={values}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    setArtist={setArtist}
                    setProduct={setProduct}
                    setSearchQuery={setSearchQuery}
                    setIsURLExists={setIsURLExists}
                    isURLExists={isURLExists}
                    searchQuery={searchQuery}
                    gallery={gallery}
                    setGallery={setGallery}
                    setDateValue={setDateValue} />
                </Form>
              )}
            </Formik>
          </>
        )}
      </Box>
      {visibleDeleteConfirmDialog && (
        <ConfirmDialog
          title={'Confirm Dialog'}
          description="Are you sure to delete?"
          visible={visibleDeleteConfirmDialog}
          setVisible={setVisibleDeleteConfirmDialog}
          onConfirmed={handleDeleteConfirmed}
        />
      )}
      {visiblePreviewDialog && product && (
        <PreviewDialog open={visiblePreviewDialog} product={product} svg={svg} onClose={handleClosePreviewDialog} />
      )}
    </>
  );
};
