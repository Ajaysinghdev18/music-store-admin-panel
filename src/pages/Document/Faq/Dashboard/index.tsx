import { Button, Card, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Shadow } from '@react-three/drei';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaqApi } from '../../../../apis';
import { DeleteIcon, DotIcon, EyeIcon, PencilIcon, PlusIcon } from '../../../../assets/icons';
import { ConfirmDialog, DetailDialog, IColumn, Table, TranslatableTextField } from '../../../../components';
import { ShadowCard } from '../../../../components/Common/ShadowCard/ShadowCard';
import { ROUTES } from '../../../../constants';
import { IFaqCategory, IFaqQuestion } from '../../../../shared/types';
import { setSearchExp } from '../../../../store/actions/header.actions';
import { displayTranslation } from '../../../../utils';
import * as S from './styles';

export const FaqDashboardPage: FC = () => {
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [categories, setCategories] = useState<IFaqCategory[]>([]);
  const [qsId, setQsId] = useState<string | undefined>();
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IFaqQuestion[]>([]);
  console.log('🚀 ~ file: index.tsx:23 ~ questions:', questions);
  const [previewQuestion, setPreviewQuestion] = useState<IFaqQuestion>();
  const [curCategoryName, setCurCategoryName] = useState<string>();
  const [visiblePreviewDialog, setVisiblePreviewDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const category = categories.find(({ id }) => id === categoryId);
    if (category) {
      setQuestions(category.questions);
    }
  }, [categories, categoryId]);

  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  const fetchCategories = () => {
    FaqApi.readCategories()
      .then((res) => {
        setCategories(res.faqCategories);
        setCategoryId(res.faqCategories[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickCategory = (id: string) => () => {
    setCategoryId(id);
  };

  const handleDeleteConfirmed = () => {
    if (categoryId) {
      FaqApi.removeCategory(categoryId).then(() => {
        setCategories(categories.filter((item) => item.id !== categoryId));
        setCategoryId(undefined);
      });
    }
    if (qsId) {
      FaqApi.removeQuestion(qsId as string)
        .then(() => {
          setQuestions(questions.filter((item) => item.id !== qsId));

          setQsId(undefined);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id: string) => {
    setQsId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  const handleCategoryDelete = (id: string) => {
    setCategoryId(id);
    setVisibleDeleteConfirmDialog(true);
  };

  const handleEditQuestion = (id = '') => {
    navigate(ROUTES.DOCUMENT.FAQ.EDIT_QUESTION.replace(':id', id));
  };
  const handlePreviewQuestion = (id: string) => {
    questions.map((item) => {
      if (item.id === id) {
        setPreviewQuestion(item);
      }
    });
    categories.map((item) => {
      if (item.id == categoryId) {
        setCurCategoryName(displayTranslation(item?.title));
      }
      return item;
    });
    setVisiblePreviewDialog(true);
  };

  const handleEditCategory = (id: string) => {
    navigate(ROUTES.DOCUMENT.FAQ.EDIT_CATEGORY.replace(':id', id));
  };

  const categoryColumns: IColumn[] = [
    {
      title: 'Category',
      render: (row) => (
        <S.Category active={row.id === categoryId} onClick={handleClickCategory(row.id)}>
          <S.Circle />
          {typeof row?.title === 'object' ? displayTranslation(row.title) : row.title}
          <S.Actions direction="row" spacing={4}>
            <IconButton onClick={() => handleCategoryDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditCategory(row.id)}>
              <PencilIcon />
            </IconButton>
          </S.Actions>
        </S.Category>
      )
    }
  ];
  const questionColumns: IColumn[] = [
    {
      title: 'Question',
      render: (row) => (
        <S.Question>
          <DotIcon />
          {typeof row?.title === 'object' ? displayTranslation(row.title) : row.title}
          {!isMobile && (
            <S.Actions direction="row" spacing={4}>
              <IconButton onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleEditQuestion(row.id)}>
                <PencilIcon />
              </IconButton>
              <IconButton onClick={() => handlePreviewQuestion(row.id)}>
                <EyeIcon />
              </IconButton>
            </S.Actions>
          )}
        </S.Question>
      )
    }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ShadowCard>
      <S.Header width={'100%'}>
        <Typography variant="title" color="text.black">
          FAQ
        </Typography>
        <Stack direction="row" spacing={16}>
          <S.NewCategoryButton startIcon={<PlusIcon />} onClick={() => navigate(ROUTES.DOCUMENT.FAQ.NEW_CATEGORY)}>
            Add new category
          </S.NewCategoryButton>
          <S.NewQuestionButton startIcon={<PlusIcon />} onClick={() => navigate(ROUTES.DOCUMENT.FAQ.NEW_QUESTION)}>
            Add new question
          </S.NewQuestionButton>
        </Stack>
      </S.Header>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <Table
            data={categories}
            pageLimit={5}
            isMobileDisabled={true}
            columns={categoryColumns}
            onDelete={isMobile ? handleCategoryDelete : undefined}
            onEdit={isMobile ? handleEditQuestion : undefined}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Table
            data={questions}
            onView={isMobile ? handlePreviewQuestion : undefined}
            onDelete={isMobile ? handleDelete : undefined}
            onEdit={isMobile ? handleEditQuestion : undefined}
            columns={questionColumns}
          />
        </Grid>
      </Grid>
      <ConfirmDialog
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
      <DetailDialog
        title="Question"
        open={visiblePreviewDialog}
        onClose={() => setVisiblePreviewDialog(false)}
        actions={
          <>
            <Button variant="text" size="medium" onClick={() => setVisiblePreviewDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained" size="medium" onClick={() => handleEditQuestion(previewQuestion?.id)}>
              Edit
            </Button>
          </>
        }
      >
        <>
          <Grid xs={6} spacing={12}>
            <S.PreviewContentItem>
              <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                CategoryType:
              </Typography>
              <Typography sx={{ ml: 6 }} variant="h5">
                {curCategoryName}
              </Typography>
            </S.PreviewContentItem>
          </Grid>
          <Grid xs={12} spacing={12}>
            <S.PreviewContentItem>
              <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                Title:
              </Typography>
              <TranslatableTextField
                fullWidth
                multiline
                minRows={5}
                name="description"
                label="Article"
                value={previewQuestion?.title}
              />
            </S.PreviewContentItem>
          </Grid>
          <Grid xs={12}>
            <S.PreviewContentItem>
              <TranslatableTextField
                fullWidth
                multiline
                minRows={5}
                name="description"
                label="Article"
                value={previewQuestion?.answer}
              />
            </S.PreviewContentItem>
          </Grid>
        </>
      </DetailDialog>
    </ShadowCard>
  );
};
