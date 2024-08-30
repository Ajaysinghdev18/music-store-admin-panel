// Dependencies
import { AccountCircle, AccountCircleOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// Apis
import { AuthApi } from '../../../apis';
// Constants
import { ACCESS_TOKEN_KEY, ROUTES } from '../../../constants';
// Actions
import { setAccount } from '../../../store/actions/auth.actions';
// Styles
import * as S from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  password: Yup.string().required('Password is required!').min(8, 'Password must be at least 8 characters!')
});

// Interfaces
interface ISignInValues {
  email: string;
  password: string;
  submit?: string;
}

// Export sign-in page
export const SignInPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (
    values: ISignInValues,
    { setErrors, setStatus, setSubmitting }: FormikHelpers<ISignInValues>
  ) => {
    const { email, password } = values;
    AuthApi.signIn({ email, password })
      .then((data) => {
        if ((data.user && data.user.role === 'admin') || data.user.role === 'artist') {
          if (data.token) {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
          }
          dispatch(setAccount(data.loginUser));

          navigate(ROUTES.HOME);
        } else {
          setStatus({ success: false });
          setErrors({ submit: 'Invalid user' });
        }
      })
      .catch((error) => {
        const message = error.msg || 'Something went wrong';
        setStatus({ success: false });
        setErrors({ submit: message });
        setSubmitting(false);
      });
  };

  return (
    <S.SignInPage>
      <Typography variant="h5" textAlign="center">
        Music Admin
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <Form className="form-area" onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert severity="error" sx={{ marginBottom: '20px' }}>
                {errors.submit}
              </Alert>
            )}
            <FormControl>
              <TextField
                id="user-email-input"
                name="email"
                placeholder="Email"
                value={values.email}
                error={Boolean(errors.email && touched.email)}
                helperText={Boolean(errors.email && touched.email) && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>{values.email ? <AccountCircle /> : <AccountCircleOutlined />}</IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <FormControl sx={{ my: 4 }}>
              <TextField
                id="user-password"
                name="password"
                placeholder="Password"
                type={passwordVisible ? 'text' : 'password'}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
                helperText={Boolean(errors.password && touched.password) && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisible}>
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <div className="form-actions">
              <Button type="submit">Login</Button>
            </div>
          </Form>
        )}
      </Formik>
    </S.SignInPage>
  );
};
