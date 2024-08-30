import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { FaqApi } from '../../../../apis';
import { ArrowLeftIcon, PublishIcon } from '../../../../assets/icons';
import { TranslatableTextField } from '../../../../components';
import { ShadowCard } from '../../../../components/Common/ShadowCard/ShadowCard';
import { ROUTES } from '../../../../constants';
import { IFaqCategory, IFaqQuestion } from '../../../../shared/types';
import { setSearchExp } from '../../../../store/actions/header.actions';
import { displayTranslation } from '../../../../utils';
import * as S from './styles';

const validationSchema = Yup.object().shape({
  title: Yup.object().required('Required field!')
});

export const NewFaqCategoryPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<IFaqQuestion[]>([]);
  const [category, setCategory] = useState<IFaqCategory | undefined>(undefined);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      title: category?.title ? category?.title : '',
      questions: category?.questions ? category?.questions : ([] as any)
    },
    onSubmit: (values) => {
      console.log('values', values);
      if (id && category) {
        FaqApi.updateCategory(id, values)
          .then(() => {
            setSubmitting(false);
            navigate(ROUTES.DOCUMENT.FAQ.DASHBOARD);
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
          });
      } else {
        FaqApi.createCategory(values)
          .then(() => {
            navigate(ROUTES.DOCUMENT.FAQ.DASHBOARD);
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

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchQuestionData = () => {
    setIsLoading(true);
    FaqApi.readQuestions()
      .then((res) => {
        setQuestions(res.faqQuestions);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const fetchCategory = () => {
    if (!id) return;
    setIsLoading(true);
    FaqApi.readCategory(id)
      .then((res) => {
        setCategory(res.faqCategory);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchQuestionData();
    dispatch(setSearchExp(''));
  }, []);

  useEffect(() => {
    fetchCategory();
    dispatch(setSearchExp(''));
  }, [location.pathname]);

  const handlePublish = () => {
    handleSubmit();
  };

  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value;
    const item = questions.find((item) => item?.id === value);
    if (values.questions.includes(item?.id)) {
      setFieldValue(
        'questions',
        values.questions.filter((v) => v !== item?.id)
      );
    } else {
      setFieldValue('questions', [...values.questions, item?.id]);
    }
  };

  return (
    <ShadowCard>
      <CardHeader
        title={
          <Button
            variant="text"
            size="medium"
            startIcon={<ArrowLeftIcon />}
            component={Link}
            to={ROUTES.DOCUMENT.FAQ.DASHBOARD}
          >
            Back
          </Button>
        }
        action={
          <S.PublishButton startIcon={<PublishIcon />} disabled={isSubmitting} onClick={handlePublish}>
            Publish
          </S.PublishButton>
        }
        sx={{ mb: 23, width: '100%' }}
      />
      <Typography variant="title" color="text.black" sx={{ mb: 72 }}>
        {id ? 'Edit Faq Category' : 'Add new Faq Category'}
      </Typography>
      <Grid container spacing={56}>
        <Grid item sm={6} xs={12}>
          <Stack spacing={20}>
            <TranslatableTextField
              fullWidth
              name="title"
              label="Category Title"
              disabled={isSubmitting}
              value={values.title}
              error={!!(errors.title && touched.title)}
              helperText={errors.title && touched.title && String(errors.title)}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormControl error={!!(errors.questions && touched.questions)}>
              {/* @ts-ignore */}
              <InputLabel variant="alone">Question</InputLabel>
              <S.Group>
                {questions.map((item, index) => (
                  <S.ControlLabel
                    key={index}
                    checked={values.questions.includes(item?.id)}
                    control={<Checkbox onChange={handleChangeQuestion} />}
                    value={item.id}
                    label={typeof item.title === 'object' ? displayTranslation(item.title) : item.title}
                  />
                ))}
              </S.Group>
              {errors.questions && touched.questions && <FormHelperText>{String(errors.questions)}</FormHelperText>}
            </FormControl>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} />
      </Grid>
    </ShadowCard>
  );
};
