// Dependencies
import {
  Box,
  Button,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

// Apis
import { ArticleApi } from '../../../../apis';
// Icons
import { ArrowLeftIcon, DocumentIcon, PublishIcon } from '../../../../assets/icons';
// Components
import { Dropzone, SwitchField } from '../../../../components';
import { TranslatableTextField } from '../../../../components';
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../../constants';
import { ARTICLE_STATUS } from '../../../../shared/enums';
import { IArticle } from '../../../../shared/types';
import { setSearchExp } from '../../../../store/actions/header.actions';
import { getObjectUrl } from '../../../../utils';
// Styles
import * as S from './styles';
import ImageCropDialog from '../../../../components/ImageCropper';

// Constants
const validationSchema = Yup.object().shape({
  title: Yup.object().required('Required field!'),
  description: Yup.object().required('Required field!'),
  thumbnail: Yup.mixed().nullable().required('Required field!')
});

// Export new article page
export const NewArticlePage: FC = () => {
  // Get navigate from hook
  const [isLoading, setLoading] = useState(false);
  const [article, setArticle] = useState<IArticle | undefined>(undefined);
  const [upImg, setUpImg] = useState();
  const [cropFieldValue, setCropFieldValue] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();

  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const fetchProduct = () => {
    if (!id) return;

    setLoading(true);
    if (isLoading) {
      // fix warning error
    }
    ArticleApi.read(id)
      .then((res) => {
        setArticle(res.article);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Back to handler
  const handleBack = () => {
    navigate(ROUTES.DOCUMENT.ARTICLE.LIST);
  };

  // Create formik
  const {
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    setSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      title: article ? article.title : '',
      status: article ? article.status : ARTICLE_STATUS.DRAFT,
      description: article ? article.description : '',
      isFeatured: article ? article.isFeatured : false,
      thumbnail: article ? article.thumbnail : null
    },
    onSubmit: (values) => {
      console.log('values', values);
      if (id) {
        const updateArticle = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'title' || key === 'description') {
            // @ts-ignore
            updateArticle.append(key, JSON.stringify(value));
          } else {
            // @ts-ignore
            updateArticle.append(key, value);
          }
        });
        if (_.isEqual(article?.thumbnail, values.thumbnail)) {
          updateArticle.delete('thumbnail');
        }
        ArticleApi.update(id, updateArticle as unknown as IArticle)
          .then(() => {
            setSubmitting(false);
            navigate(ROUTES.DOCUMENT.ARTICLE.LIST);
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
          });
      } else {
        const article = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'title' || key === 'description') {
            // @ts-ignore
            article.append(key, JSON.stringify(value));
          } else {
            // @ts-ignore
            article.append(key, value);
          }
        });
        ArticleApi.create(article as unknown as IArticle)
          .then((res) => {
            navigate(ROUTES.DOCUMENT.ARTICLE.LIST);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    }
  });


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
  const handleUnpublish = () => {
    setFieldValue('status', ARTICLE_STATUS.UNPUBLISHED);
    handleSubmit();
  };

  // Publish handler
  const handlePublish = () => {
    setFieldValue('status', ARTICLE_STATUS.PUBLISHED);
    handleSubmit();
  };

  // Save as draft handler
  const handleSave = () => {
    setFieldValue('status', ARTICLE_STATUS.DRAFT);
    handleSubmit();
  };

  useEffect(() => {
    dispatch(setSearchExp(''));
    fetchProduct();
  }, [location.pathname]);

  const handleCloseDialog = () => {
    setOpen(false);
  };
  // Return new article page
  return (
    <Box paddingRight={'1rem'}>
      <ImageCropDialog open={open} handleCloseDialog={handleCloseDialog} upImg={upImg} setFieldValue={setFieldValue} cropFieldValue={cropFieldValue} />

      <CardHeader
        title={
          <Button variant="text" size="medium" startIcon={<ArrowLeftIcon />} onClick={handleBack}>
            Back
          </Button>
        }
        action={
          <Stack direction="row" spacing={16}>
            {isMobile ? (
              <S.SaveButton onClick={handleSave}>
                <DocumentIcon />
              </S.SaveButton>
            ) : (
              <S.SaveButton variant="outlined" onClick={handleSave}>
                Save as draft
              </S.SaveButton>
            )}
            {(article?.status === ARTICLE_STATUS.DRAFT || !article) ? null : article.status === ARTICLE_STATUS.PUBLISHED &&
              (isMobile ? (
                <S.PublishButton onClick={handleUnpublish}>
                  <DocumentIcon />
                </S.PublishButton>
              ) : (
                <S.PublishButton variant="outlined" startIcon={<DocumentIcon />} onClick={handleUnpublish}>
                  Unpublish
                </S.PublishButton>
              ))
            }


            {(article?.status === ARTICLE_STATUS.PUBLISHED || !article || article?.status === ARTICLE_STATUS.UNPUBLISHED || article?.status === ARTICLE_STATUS.DRAFT ) &&
              (isMobile ? (
                <S.PublishButton onClick={handlePublish}>
                  <PublishIcon />
                </S.PublishButton>
              ) : (
                <S.PublishButton variant="contained" startIcon={<PublishIcon />} onClick={handlePublish}>
                  Publish
                </S.PublishButton>
              ))}
          </Stack>
        }
        sx={{ mb: 24 }}
      />
      <Typography mb={36} color="text.black" fontWeight={'600'} variant="title">
        {id ? 'Edit' : 'Add new'} article
      </Typography>
      <Grid container rowSpacing={20} columnSpacing={56}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!(errors.thumbnail && touched.thumbnail)}>
            {/* @ts-ignore */}
            <Typography color="text.black" fontSize={14}>
              Thumbnail
            </Typography>
            <Dropzone
              label="Drag image here to upload"
              accept={['.png', '.jpg', '.svg']}
              preview={
                values.thumbnail?.fieldname
                  ? `${REACT_APP_API_ASSETS_SERVER}/${values.thumbnail?.fieldname}/${values.thumbnail?.filename}`
                  : values.thumbnail
                    ? getObjectUrl(values.thumbnail)
                    : false
              }
              onDrop={(files) => handleImageUpload(files, 'thumbnail', setFieldValue)}
            />
            {!!(errors.thumbnail && touched.thumbnail) && <FormHelperText>{String(errors.thumbnail)}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} />
        <Grid item xs={12} md={6}>
          <Typography color="text.black" fontSize={14}>
            Title
          </Typography>
          <TranslatableTextField
            fullWidth
            name="title"
            label="Title"
            value={values.title}
            error={!!(errors.title && touched.title)}
            helperText={errors.title && touched.title && String(errors.title)}
            disabled={isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{
              '& .MuiInputBase-root': {
                height: '2.5rem'
              },
              '& .MuiInputAdornment-root': {
                position: 'absolute',
                right: '0.5rem',
                top: '50%'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!(errors.description && touched.description)}>
            <Typography color="text.black" fontSize={14}>
              Text
            </Typography>
            <TranslatableTextField
              fullWidth
              name="description"
              label="TEXT"
              value={values.description}
              error={!!(errors.description && touched.description)}
              helperText={errors.description && touched.description && String(errors.description)}
              disabled={isSubmitting}
              onChange={handleChange}
              multiline={true}
              minRows={8}
              onBlur={handleBlur}
              sx={{
                '& .MuiInputAdornment-root': {
                  position: 'absolute',
                  right: '0.5rem',
                  top: '10%'
                }
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
