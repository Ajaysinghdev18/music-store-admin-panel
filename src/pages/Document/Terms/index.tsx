import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TermApi } from '../../../apis';
import { ITerm } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import * as S from './styles';

export const TermsPage: FC = () => {
  const [termData, setTermData] = useState<ITerm>();
  const dispatch = useDispatch();
  const handleSave = () => {
    if (termData) {
      TermApi.update(termData)
        .then((res) => {
          console.log('req', res.body);
          setTermData(res.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Fetch data
  const fetchData = () => {
    TermApi.read()
      .then((res) => {
        setTermData(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // On mounted
  useEffect(() => {
    fetchData();
    dispatch(setSearchExp(''));
  }, []);

  return (
    <Card>
      <S.Header>
        <TextField
          name="title"
          sx={(theme) => ({
            width: '100%',
            '& fieldset': {
              border: 'none'
            },
            input: {
              color: theme.palette.text.primary,
              fontSize: 24,
              padding: '0 !important'
            }
          })}
          value={termData?.title}
          onChange={(e) =>
            setTermData({
              content: termData?.content,
              title: e.target.value
            })
          }
        />

        <Typography variant="overline" color="text.disabled" sx={{ flexShrink: 0 }}>
          Updated: {moment(termData?.updatedAt).format('HH:MM - MMMM DD,  YYYY')}
        </Typography>
      </S.Header>
      <CardContent>
        <TextField
          fullWidth
          multiline
          minRows={12}
          name="description"
          label=""
          value={termData?.content}
          onChange={(e) =>
            setTermData({
              title: termData?.title,
              content: e.target.value
            })
          }
          sx={(theme) => ({
            '& fieldset': {
              border: 'none'
            },
            '& textarea': {
              color: theme.palette.text.primary,
              fontSize: 20,
              padding: '0 !important'
            }
          })}
        />
      </CardContent>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Stack direction="row" spacing={1}>
          <S.SaveButton variant="contained" onClick={handleSave}>
            Save
          </S.SaveButton>
        </Stack>
      </Box>
    </Card>
  );
};
