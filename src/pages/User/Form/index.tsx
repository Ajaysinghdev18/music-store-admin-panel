import { Box, CardHeader, FormControl, FormHelperText, Grid, MenuItem, Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CCS from 'countrycitystatejson';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { UsersApi } from '../../../apis';
import { ArrowRepeatIcon, DeleteIcon } from '../../../assets/icons';
import { ConfirmDialog, Dropzone, RoundedButton, SwitchField } from '../../../components';
import { TextInput } from '../../../components/TextInput';
import { REACT_APP_API_ASSETS_SERVER, ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { IUser } from '../../../shared/types';
import { getObjectUrl } from '../../../utils';
import * as S from './styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid Email')
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please Enter Valid Email')
    .required('Supporting text'),
  phoneNumber: Yup.number().required('Supporting Text'),
  verify: Yup.boolean(),
  country: Yup.string().required('Supporting Text'),
  region: Yup.string().required('Supporting Text')
});

export type AlertType = {
  message?: string;
  type?: 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';
  isVisible: boolean;
};

export const UserFormPage: FC = () => {
  const [user, setUser] = useState<IUser>();
  const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchUser = () => {
    if (id) {
      UsersApi.read(id)
        .then((res) => {
          setUser(res.user);
        })
        .catch(() => {
          navigate(-1);
        });
    }
  };

  const handleBack = () => {
    navigate(ROUTES.USER.LIST);
  };

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
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      avatar: user ? user.avatar : null,
      name: user ? user.name : '',
      username: user ? user.username : '',
      email: user ? user.email : '',
      phoneNumber: user ? user.phoneNumber : '',
      verify: user ? user.verify : false,
      country: user ? user?.country : '',
      region: user ? user.region : '',
      city: user ? user.city : '',
      zip: user ? user.zip : '',
      addressLine1: user ? user.addressLine1 : ''
    },
    onSubmit: (values) => {
      if (id) {
        UsersApi.update(id, values as unknown as IUser)
          .then((res) => {
            console.log(res);
            navigate(ROUTES.USER.DETAIL.replace(':id', id));
          })
          .catch((err) => {
            enqueueSnackbar(err.msg, { variant: 'error' });
          });
      } else {
        UsersApi.create({ ...values, password: '123456' } as unknown as IUser)
          .then((res) => {
            console.log(res);
            navigate(ROUTES.USER.LIST);
            enqueueSnackbar('User has been successfully created', { variant: 'success' });
          })
          .catch((err) => {
            enqueueSnackbar(err.msg, { variant: 'error' });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
      setSubmitting(false);
    }
  });

  const AccountFields = [
    {
      label: 'Name',
      name: 'name',
      disabled: isSubmitting
    },
    {
      label: 'UserName',
      name: 'username',
      disabled: isSubmitting
    },
    {
      label: 'Email',
      name: 'email',
      disabled: id ? true : isSubmitting
    },
    {
      label: 'ID',
      name: 'id',
      disabled: isSubmitting
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      disabled: isSubmitting
    },
    {
      label: 'Paypal',
      name: 'paypal',
      disabled: isSubmitting
    }
  ];
  const AddressFields = useMemo(
    () => [
      {
        label: 'Country',
        name: 'country',
        type: 'select',
        size: 1,
        options: CCS.getCountries().map(({ name, shortName }) => ({
          label: name,
          value: shortName
        }))
      },
      {
        label: 'Region',
        name: 'region',
        type: 'select',
        size: 1,
        options: CCS.getStatesByShort(values.country)?.map((state) => ({
          label: state,
          value: state
        }))
      },
      {
        label: 'City',
        name: 'city',
        type: 'select',
        size: 1,
        options: CCS.getCities(values.country, values.region)?.map((city) => ({
          label: city,
          value: city
        }))
      },
      {
        label: 'Postal Code',
        name: 'zip',
        size: 1
      },
      {
        label: 'Address Detail',
        name: 'addressLine1'
      }
    ],
    [values]
  );

  const handleImageUpload = (files, field: string, setFieldValue: any) => {
    if (files && files.length > 0) {
      setFieldValue(field, files[0]);
    }
  };

  const handleOpenConfirmDialog = () => {
    setVisibleDeleteConfirmDialog(true);
  };

  const handleDeleteConfirmed = () => {
    if (id) {
      UsersApi.remove(id)
        .then(() => navigate(ROUTES.USER.LIST))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Box paddingRight={'1rem'}>
        <CardHeader
          title={
            <Typography color="text.black" fontWeight="600" variant="title">
              {id ? 'Edit' : 'Add a New'} User
            </Typography>
          }
          action={
            id ? (
              <Stack direction="row" spacing={16}>
                <S.CancelButton variant="outlined" type='button' startIcon={<DeleteIcon />} onClick={handleOpenConfirmDialog}>
                  Remove this user
                </S.CancelButton>
                <S.SaveButton type='submit' startIcon={<ArrowRepeatIcon />} onClick={() => handleSubmit()} disabled={isSubmitting} >
                  Update
                </S.SaveButton>
              </Stack>
            ) : (
              <RoundedButton label={'Preview'} background={COLORS.BLUELIGHT} />
            )
          }
        />
        <CardContent>
          <Grid container spacing={32}>
            <Grid item xs={4} display={'flex'} flexDirection={'column'} gap={'1rem'}>
              <Typography color={'text.black'} fontWeight={'600'} paddingBottom={'1rem'}>
                Personal Info
              </Typography>
              <FormControl fullWidth error={!!(errors.avatar && touched.avatar)} disabled={isSubmitting} hiddenLabel>
                {/* @ts-ignore */}
                <Typography color="text.black" fontSize={14}>
                  Profile Picture
                </Typography>
                <Dropzone
                  disabled={isSubmitting}
                  label="Drag image here to upload"
                  accept={['.png', '.jpg', '.svg']}
                  onDrop={(files) => handleImageUpload(files, 'avatar', setFieldValue)}
                  preview={
                    values.avatar?.fieldname
                      ? `${REACT_APP_API_ASSETS_SERVER}/${values.avatar?.fieldname}/${values.avatar?.filename}`
                      : values?.avatar
                        ? getObjectUrl(values?.avatar)
                        : false
                  }
                />
                <FormHelperText>{errors.avatar && touched.avatar && String(errors.avatar)}</FormHelperText>
              </FormControl>
              {AccountFields.map(({ label, name, disabled }, index) => (
                <TextInput
                  key={index}
                  name={name}
                  label={label}
                  value={values[name]}
                  error={!!(errors[name] && touched[name])}
                  helperText={errors[name] && touched[name] && String(errors[name])}
                  disabled={disabled}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ))}
              <FormControl fullWidth disabled={isSubmitting}>
                {/* @ts-ignore */}
                <Typography color="text.black" fontSize={14}>
                  Status
                </Typography>
                <SwitchField
                  value={values.verify}
                  disabled={isSubmitting}
                  trueLabel="Active"
                  falseLabel="Inactive"
                  onBlur={handleBlur}
                  checked={values.verify}
                  onChange={(e) => {
                    setFieldValue('verify', (e as React.ChangeEvent<HTMLInputElement>).target.checked);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Typography color={'text.black'} fontWeight={'600'} paddingBottom={'2rem'}>
                Other Info
              </Typography>
              <Grid container spacing={'1rem'}>
                {AddressFields.map(({ label, name, type = 'text', options, size = 1 }, index) =>
                  type === 'text' ? (
                    <Grid item xs={12} sm={6 * size}>
                      <TextInput
                        key={index}
                        name={name}
                        label={label}
                        value={values[name]}
                        error={!!(errors[name] && touched[name])}
                        helperText={errors[name] && touched[name] && String(errors[name])}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6 * size}>
                      <Typography color="text.black" fontSize={14}>
                        {label}
                      </Typography>
                      <S.StyledSelect
                        fullWidth
                        key={index}
                        name={name}
                        label={label}
                        // value={options.filter(opt => opt.label === values[name])[0].value}
                        value={values[name]}
                        error={!!(errors[name] && touched[name])}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {options?.map(({ label, value }, index) => (
                          <MenuItem key={index} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </S.StyledSelect>
                    </Grid>
                  )
                )}
                <Grid item xs={12} sm={6}>
                  <TextInput
                    label={'One more Form'}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              {!id && <Stack display="flex" flexDirection="row" justifyContent="end" alignItems="center" gap={8} mt={16}>
                <S.CancelButton type='button' onClick={() => handleBack()}>Cancel</S.CancelButton>
                <S.SaveButton onClick={() => console.log('>>>')} >Save</S.SaveButton>
              </Stack>}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      <ConfirmDialog
        description="Are you sure to delete?"
        visible={visibleDeleteConfirmDialog}
        setVisible={setVisibleDeleteConfirmDialog}
        onConfirmed={handleDeleteConfirmed}
      />
    </>
  );
};
