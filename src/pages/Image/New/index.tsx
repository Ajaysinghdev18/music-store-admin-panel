// Dependencies
import { Box, Button, Card, CardHeader, CircularProgress, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import _ from 'lodash';
import React, { FC, Fragment, useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

// Apis
import { ProductsApi } from '../../../apis';
// Components
import { ConfirmDialog, PreviewDialog, RoundedButton } from '../../../components';
// Constants
import { ROUTES } from '../../../constants';
import { CURRENCY, PRODUCT_TYPE } from '../../../shared/enums';
// Types
import { IFile, IProduct } from '../../../shared/types';
//Form
import { ImageForm } from './Form';
import { replaceSpacesWithHyphen } from '../../../utils';

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
  gallery: '',
  productURLId: '',
};

export const NewImagePage: FC = () => {
  const [product, setProduct] = useState<IProduct | undefined>(initialValues);
  const [isLoading, setLoading] = useState(false);
  const [artist, setArtist] = useState<any>('');
  const [gallery, setGallery] = useState<any>('');
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [visiblePreviewDialog, setVisiblePreviewDialog] = useState<boolean>(false);
  const [isURLExists, setIsURLExists] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fieldsArray, setFieldsArray] = useState<any>([]);
  const [multiFieldsArray, setMultiFieldsArray] = useState<any>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artistId');
  const galleryId = searchParams.get('galleryId');

  const isEditPage = {
    galleryValidation: false
  };

  if (location.pathname.includes('/image') && location.pathname.includes('/edit')) {
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
    sku: Yup.string(),
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
        setFieldsArray(res.product.productFeatures.filter(feat => feat.type === 'single'));
        setMultiFieldsArray(res.product.productFeatures.filter(feat => feat.type === 'multiple'));
        setSearchQuery(replaceSpacesWithHyphen(res.product.name));
        setProduct({ ...res.product, category: categoryIds });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
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
    newProduct.delete('productFeatures');
    const featuresJsonString = JSON.stringify([...fieldsArray, ...multiFieldsArray]);
    newProduct.append('productFeatures', featuresJsonString);

    if (id && product) {
      if (_.isEqual(product?.thumbnail, values.thumbnail)) {
        newProduct.delete('thumbnail');
      }
      if (_.isEqual(product?.icon, values.icon)) {
        newProduct.delete('icon');
      }
      if (_.isEqual(product?.sign, values.sign)) {
        newProduct.delete('sign');
      }
      if (_.isEqual(product?.image, values.image)) {
        newProduct.delete('image');
        // newProduct.delete('preview');
      }
      newProduct.delete('auction');
      ProductsApi.update(id, newProduct as unknown as IProduct)
        .then(() => {
          setSubmitting(false);
          navigate(ROUTES.IMAGE.LIST);
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
      ProductsApi.create(newProduct as unknown as IProduct)
        .then(() => {
          setSubmitting(false);
          navigate(ROUTES.IMAGE.LIST);
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
        .then(() => navigate(ROUTES.IMAGE.LIST))
        .catch((err) => console.log(err));
    }
  };

  const handleOpenPreviewDialog = () => {
    setVisiblePreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setVisiblePreviewDialog(false);
  };

  return (
    <Fragment>
      <Box sx={{ overflow: 'visible', paddingRight: '1rem' }}>
        {id && !product ? (
          <Box height={300} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Fragment>
            <CardHeader
              title={
                <Typography color="text.black" fontWeight={'600'} variant="title">
                  {id ? 'Edit' : 'Add a New'} Image
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
              {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <ImageForm
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
                      setIsURLExists={setIsURLExists}
                      isURLExists={isURLExists}
                      setSearchQuery={setSearchQuery}
                      searchQuery={searchQuery}
                      setProduct={setProduct}
                      gallery={gallery}
                      setGallery={setGallery}
                      setFieldsArray={setFieldsArray}
                      fieldsArray={fieldsArray}
                      multiFieldsArray={multiFieldsArray}
                      setMultiFieldsArray={setMultiFieldsArray}
                    />
                  </Form>
                );
              }}
            </Formik>
          </Fragment>
        )}
      </Box>
      {visibleDeleteConfirmDialog && (
        <ConfirmDialog
          description="Are you sure to delete?"
          visible={visibleDeleteConfirmDialog}
          setVisible={setVisibleDeleteConfirmDialog}
          onConfirmed={handleDeleteConfirmed}
        />
      )}
      {visiblePreviewDialog && product && (
        <PreviewDialog open={visiblePreviewDialog} product={product} onClose={handleClosePreviewDialog} />
      )}
    </Fragment>
  );
};
