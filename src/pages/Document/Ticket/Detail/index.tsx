// Dependencies
import { Box, Button, CardHeader, Chip, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
// Moment
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

// Apis
import { TicketApi } from '../../../../apis';
// Icon
import { ArrowLeftIcon, JpgIcon, PdfIcon, PublishIcon, SvgIcon } from '../../../../assets/icons';
import { ShadowCard } from '../../../../components/Common/ShadowCard/ShadowCard';
import { TextInput } from '../../../../components/TextInput';
import { ROUTES } from '../../../../constants';
import { TICKET_STATUS } from '../../../../shared/enums';
import { ITicket } from '../../../../shared/types';
import { setSearchExp } from '../../../../store/actions/header.actions';
import * as S from './styles';

const validationSchema = Yup.object().shape({
  answer: Yup.string().required('Required field!')
});

// Export ticket details page
export const TicketDetailPage: FC = () => {
  // States
  const [ticket, setTicket] = useState<ITicket>();
  const [mimeType, setMimeType] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSetMimeType = (ticket: ITicket) => {
    if (ticket) {
      const value = ticket?.files?.map((file) => {
        if (file.mimetype?.includes('svg')) {
          return '.SVG';
        } else if (file.mimetype?.includes('png')) {
          return '.PNG';
        } else if (file.mimetype?.includes('jpg')) {
          return '.JPG';
        } else if (file.mimetype?.includes('doc')) {
          return '.DOC';
        } else if (file.mimetype?.includes('pdf')) {
          return '.PDF';
        } else {
          return '.***';
        }
      });
      if (value) {
        setMimeType(value);
      }
    }
  };

  const { values, errors, touched, submitForm, isSubmitting, handleChange, handleBlur } = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      answer: ticket ? ticket.answer : '',
      status: ticket ? ticket.status : 'New'
    },
    onSubmit: (values) => {
      const newTicket = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'status') {
          newTicket.append(key, 'Processing');
        } else {
          // @ts-ignore
          newTicket.append(key, value);
        }
      });
      if (id) {
        TicketApi.update(id, newTicket)
          .then((res) => {
            navigate(ROUTES.DOCUMENT.TICKET.LIST);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });

  // On mounted
  useEffect(() => {
    dispatch(setSearchExp(''));
    if (id) {
      TicketApi.read(id)
        .then((res) => {
          setTicket(res.ticket);
          handleSetMimeType(res.ticket);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleClickBackBtn = () => {
    navigate(-1);
  };
  return (
    <ShadowCard>
      <CardHeader
        title={
          <Button variant="text" size="medium" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
            Back
          </Button>
        }
        action={
          <S.PublishButton
            startIcon={<PublishIcon />}
            disabled={ticket?.status === TICKET_STATUS.CANCELLED || ticket?.status === TICKET_STATUS.SOLVED}
            onClick={submitForm}
          >
            Publish
          </S.PublishButton>
        }
        sx={{ mb: 23, width: '100%' }}
      />
      <Grid container columns={12} spacing={56}>
        <Grid item sm={6} xs={12}>
          <Stack spacing={20}>
            {/*<Typography variant="title" color="text.secondary">*/}
            {/*  {ticket?.subject}*/}
            {/*</Typography>*/}
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                1
              </Box>
              <S.BasicInfoItem>
                <Box>Subject</Box>
                <Box fontWeight={'600'}>{ticket?.subject}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                2
              </Box>
              <S.BasicInfoItem>
                <Box>Updated At</Box>
                <Box fontWeight={'600'}>{ticket && moment(ticket.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                3
              </Box>
              <S.BasicInfoItem>
                <Box>Description</Box>
                <Box fontWeight={'600'}>{ticket?.description}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                4
              </Box>
              <S.BasicInfoItem>
                <Box>Attachments</Box>
                <Box fontWeight={'600'}>
                  {ticket?.files?.map((file, index) => (
                    <Chip
                      key={index}
                      color="info"
                      label={isMobile ? mimeType[index] : `Attached File ${mimeType[index]}`}
                      avatar={
                        file?.mimetype === 'image/svg+xml' ? (
                          <SvgIcon />
                        ) : file.mimetype === 'image/jpg' ? (
                          <PdfIcon />
                        ) : (
                          <JpgIcon />
                        )
                      }
                    />
                  ))}
                </Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                5
              </Box>
              <S.BasicInfoItem>
                <Box>Category</Box>
                <Box fontWeight={'600'}>{ticket?.category}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                6
              </Box>
              <S.BasicInfoItem>
                <Box>Name</Box>
                <Box fontWeight={'600'}>{ticket?.name}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                7
              </Box>
              <S.BasicInfoItem>
                <Box>Email</Box>
                <Box fontWeight={'600'}>{ticket?.email}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                8
              </Box>
              <S.BasicInfoItem>
                <Box>Music username</Box>
                <Box fontWeight={'600'}>{ticket?.username}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                9
              </Box>
              <S.BasicInfoItem>
                <Box>Phone Number</Box>
                <Box fontWeight={'600'}>{ticket?.phoneNumber}</Box>
              </S.BasicInfoItem>
            </Box>
            <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
              <Box fontSize={'0.75rem'} fontWeight={'500'}>
                10
              </Box>
              <S.BasicInfoItem>
                <Box>Country located</Box>
                <Box fontWeight={'600'}>{ticket?.country}</Box>
              </S.BasicInfoItem>
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextInput
            multiline
            name="answer"
            label="ANSWER"
            minRows={10}
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
