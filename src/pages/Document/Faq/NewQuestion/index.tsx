import {
  Button,
  Card,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Radio,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
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
  title: Yup.object().required('Required field!'),
  answer: Yup.object().required('Required field!'),
  category: Yup.string().required('Required field!')
});

export const NewFaqQuestionPage: FC = () => {
  const [categories, setCategories] = useState<IFaqCategory[]>([]);
  const [question, setQuestion] = useState<IFaqQuestion | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const fetchQuestions = () => {
    if (!id) return;
    FaqApi.readQuestion(id)
      .then((res) => {
        setQuestion(res.faqQuestion);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const fetchCategories = () => {
    FaqApi.readCategories()
      .then((res) => {
        setCategories(res.faqCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const { values, errors, touched, isSubmitting, setSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      title: question ? question.title : '',
      answer: question ? question.answer : '',
      category: question ? question.category : ''
    },
    onSubmit: (values) => {
      if (id && question) {
        FaqApi.updateQuestion(id, values)
          .then(() => {
            setSubmitting(false);
            navigate(ROUTES.DOCUMENT.FAQ.DASHBOARD);
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
          });
      } else {
        FaqApi.createQuestion(values)
          .then((res) => {
            console.log(res);
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

  const handlePublish = () => {
    handleSubmit();
  };

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, [location.pathname]);

  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

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
        {id ? 'Edit FAQ Question' : 'Add new FAQ question'}
      </Typography>
      <Grid container columns={12} spacing={56}>
        <Grid item sm={6} xs={12}>
          <Stack spacing={20}>
            <TranslatableTextField
              fullWidth
              name="title"
              label="Question Title"
              disabled={isSubmitting}
              value={values.title}
              error={!!(errors.title && touched.title)}
              helperText={errors.title && touched.title && String(errors.title)}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormControl error={!!(errors.category && touched.category)}>
              {/* @ts-ignore */}
              <InputLabel variant="alone">Category</InputLabel>
              <S.Group name="category" onChange={handleChange}>
                {categories.map(({ id, title }, index) => (
                  <S.ControlLabel
                    key={index}
                    disabled={isSubmitting}
                    checked={id === values?.category}
                    control={<Radio />}
                    value={id}
                    label={typeof title === 'object' ? displayTranslation(title) : title}
                  />
                ))}
              </S.Group>
              {errors.category && touched.category && <FormHelperText>{String(errors.category)}</FormHelperText>}
            </FormControl>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TranslatableTextField
            fullWidth
            multiline
            name="answer"
            label="ANSWER"
            rows={30}
            disabled={isSubmitting}
            value={values.answer}
            error={!!(errors.answer && touched.answer)}
            helperText={errors.answer && touched.answer && String(errors.answer)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </ShadowCard>
  );
};
