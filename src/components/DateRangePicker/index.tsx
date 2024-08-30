// Dependencies
// Mui materials
import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
// moment
import moment from 'moment';
import React, { FC, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as Yup from 'yup';

// Icons
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons';
import { usePopup } from '../../hooks';
import { TextInput } from '../TextInput';
// Styles
import * as S from './styles';

// Icons

interface DateRange {
  startDate?: Date;
  endDate?: Date;
  key: string;
}

const initialValues = {
  startHour: null,
  startMin: null,
  endHour: null,
  endMin: null
};

const validationSchema = Yup.object().shape({
  startHour: Yup.number().nullable().required('Number is required!'),
  startMin: Yup.number().nullable().required('Number is required!'),
  endHour: Yup.number().nullable().required('Number is required!'),
  endMin: Yup.number().nullable().required('Number is required!')
});

export const DateRangePicker: FC<any> = ({ setDateValue }) => {
  const toggleContainer = useRef<HTMLDivElement | null>(null);
  const [dateState, setDateState] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [curDateState, setCurDateState] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  });

  const [isSelected, setSelectedState] = useState(false);
  const { toggleMenu, closeMenu, isOpen } = usePopup(toggleContainer);
  const { values, errors, touched, submitForm, setFieldValue } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: () => {
      setCurDateState(dateState);
      closeMenu();
    }
  });

  const handleSelect = (ranges) => {
    const date = ranges;
    date.startDate.setHours(dateState && dateState.startDate?.getHours());
    date.startDate.setMinutes(dateState && dateState.startDate?.getMinutes());
    date.endDate.setHours(dateState && dateState.endDate?.getHours());
    date.endDate.setMinutes(dateState && dateState.endDate?.getMinutes());
    if (date.startDate < new Date()) return;
    setSelectedState(true);
    setDateState(date);
    setDateValue(date);
  };

  const handleChangeTime = (value: number, event) => {
    const date = dateState;
    const newDate = event.target.value;
    switch (value) {
      case 0: {
        if (newDate >= 0 && newDate <= 24) {
          date?.startDate?.setHours(newDate);
          setFieldValue('startHour', newDate);
        }
        break;
      }
      case 1: {
        if (newDate >= 0 && newDate <= 60) {
          date?.startDate?.setMinutes(newDate);
          setFieldValue('startMin', newDate);
        }
        break;
      }
      case 2: {
        if (newDate >= 0 && newDate <= 24) {
          date?.endDate?.setHours(newDate);
          setFieldValue('endHour', newDate);
        }
        break;
      }
      case 3: {
        if (newDate >= 0 && newDate <= 60) {
          date?.endDate?.setMinutes(newDate);
          setFieldValue('endMin', newDate);
        }
        break;
      }
      default:
        break;
    }
    setDateState(date);
  };

  return (
    <S.DateRangeContainer ref={toggleContainer}>
      <Grid container spacing={16} onClick={toggleMenu}>
        <Grid item xs={6}>
          <TextInput
            name="startTime"
            label="Start Time"
            value={
              curDateState?.startDate
                ? moment(curDateState?.startDate).format('YYYY.MM.DD.hh:mm')
                : 'Click to select a time and date'
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="endTime"
            label="End Time"
            value={
              curDateState?.endDate
                ? moment(curDateState?.endDate).format('YYYY.MM.DD.hh:mm')
                : 'Click to select a time and date'
            }
          />
        </Grid>
      </Grid>

      {isOpen && (
        <S.PanelContainer>
          <S.PanelWrapper>
            <S.DateRangePickerContent
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',

                [theme.breakpoints.up('md')]: {
                  flexDirection: 'row'
                }
              })}
            >
              <DateRange
                className="date-range-picker-calendar1"
                moveRangeOnFirstSelection={false}
                ranges={[dateState]}
                months={1}
                direction={'horizontal'}
                onChange={(item) => handleSelect(item.selection)}
                navigatorRenderer={(currentFocusedDate, changeShownDate) => {
                  return (
                    <Box sx={{ display: 'flex' }}>
                      <S.MonthSelectContent>
                        <IconButton
                          onClick={() => changeShownDate(moment(currentFocusedDate).subtract(1, 'month').toDate())}
                        >
                          <ArrowLeftIcon color="success.main" />
                        </IconButton>
                        <Typography variant="subtitle" color="success.main">
                          {moment(currentFocusedDate).format('MMM YYYY')}
                        </Typography>
                        <IconButton
                          onClick={() => changeShownDate(moment(currentFocusedDate).add(1, 'month').toDate())}
                        >
                          <ArrowRightIcon color="success.main" />
                        </IconButton>
                      </S.MonthSelectContent>
                    </Box>
                  );
                }}
              />
              <DateRange
                className="date-range-picker-calendar1"
                moveRangeOnFirstSelection={false}
                ranges={[dateState]}
                months={1}
                direction={'horizontal'}
                onChange={(item) => handleSelect(item.selection)}
                navigatorRenderer={(currentFocusedDate, changeShownDate) => {
                  return (
                    <Box sx={{ display: 'flex' }}>
                      <S.MonthSelectContent>
                        <IconButton
                          onClick={() => changeShownDate(moment(currentFocusedDate).subtract(1, 'month').toDate())}
                        >
                          <ArrowLeftIcon color="success.main" />
                        </IconButton>
                        <Typography variant="subtitle" color="success.main">
                          {moment(currentFocusedDate).format('MMM YYYY')}
                        </Typography>
                        <IconButton
                          onClick={() => changeShownDate(moment(currentFocusedDate).add(1, 'month').toDate())}
                        >
                          <ArrowRightIcon color="success.main" />
                        </IconButton>
                      </S.MonthSelectContent>
                    </Box>
                  );
                }}
              />
            </S.DateRangePickerContent>
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                [theme.breakpoints.up('md')]: {
                  flexDirection: 'row'
                }
              })}
            >
              <S.TimeRangeContent>
                <TextField
                  name="startHour"
                  label="HOUR"
                  onChange={(event) => handleChangeTime(0, event)}
                  sx={{ mr: 5, width: '30%' }}
                  value={values.startHour}
                  error={!!(errors.startHour && touched.startHour)}
                  helperText={errors.startHour && touched.startHour && String(errors.startHour)}
                />
                <TextField
                  name="startMin"
                  label="MINUTE"
                  onChange={(event) => handleChangeTime(1, event)}
                  sx={{ ml: 'auto', width: '30%' }}
                  value={values.startMin}
                  error={!!(errors.startMin && touched.startMin)}
                  helperText={errors.startMin && touched.startMin && String(errors.startMin)}
                />
              </S.TimeRangeContent>
              <S.TimeRangeContent>
                <TextField
                  name="endHour"
                  label="HOUR"
                  onChange={(event) => handleChangeTime(2, event)}
                  sx={{ mr: 5, width: '30%' }}
                  value={values.endHour}
                  error={!!(errors.endHour && touched.endHour)}
                  helperText={errors.endHour && touched.endHour && String(errors.endHour)}
                />
                <TextField
                  name="endMin"
                  label="MINUTE"
                  onChange={(event) => handleChangeTime(3, event)}
                  sx={{ ml: 'auto', width: '30%' }}
                  value={values.endMin}
                  error={!!(errors.endMin && touched.endMin)}
                  helperText={errors.endMin && touched.endMin && String(errors.endMin)}
                />
              </S.TimeRangeContent>
            </Box>
            <S.ActionContainter>
              <Box
                sx={{
                  display: isSelected ? 'flex' : 'none',
                  alignItems: 'center'
                }}
              >
                <Typography variant="subtitle" color="success.main">
                  Selected:
                </Typography>
                <Typography variant="label" sx={{ ml: 20 }}>
                  {moment(dateState?.startDate).format('MM.DD.YYYY,HH:mm')} to <span> </span>
                  {moment(dateState?.endDate).format('MM.DD.YYYY,HH:mm')}
                </Typography>
              </Box>
              <Stack direction="row" sx={{ mt: 25, display: 'flex', justifyContent: 'flex-end' }}>
                <S.CancelButton onClick={closeMenu}>Cancel</S.CancelButton>
                <S.SaveButton sx={{ ml: 16 }} onClick={submitForm}>
                  Apply
                </S.SaveButton>
              </Stack>
            </S.ActionContainter>
          </S.PanelWrapper>
        </S.PanelContainer>
      )}
    </S.DateRangeContainer>
  );
};
