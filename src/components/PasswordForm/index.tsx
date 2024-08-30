// Dependencies
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';

// Interfaces
interface IPasswordFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// Constants
const initialValues = {
  password: '',
  newPassword: '',
  confirmPassword: ''
};

// Create password-form component
export const PasswordForm: FC<IPasswordFormProps> = ({ visible, setVisible }) => {
  // Submit handler
  const handleSubmit = (values) => {
    console.log(values);
  };

  // Cancel handler
  const handleCancel = () => {
    setVisible(false);
  };

  // Return password-form component
  return (
    <Dialog open={visible} fullWidth>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Reset Password Form</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                fullWidth
                value={values.password}
                error={!!(errors.password && touched.password)}
                helperText={errors.password && touched.password && String(errors.password)}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                margin="dense"
                id="newPassword"
                name="newPassword"
                label="New Password"
                fullWidth
                value={values.newPassword}
                error={!!(errors.newPassword && touched.newPassword)}
                helperText={errors.newPassword && touched.newPassword && String(errors.newPassword)}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                margin="dense"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                value={values.confirmPassword}
                error={!!(errors.confirmPassword && touched.confirmPassword)}
                helperText={errors.confirmPassword && touched.confirmPassword && String(errors.confirmPassword)}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} startIcon={isSubmitting && <CircularProgress size={20} />}>
                Reset Password
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
