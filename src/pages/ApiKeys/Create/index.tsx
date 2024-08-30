// Dependencies
import {
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { ServiceApi } from '../../../apis';

interface ICreateServiceDialog {
  showServiceModal: boolean;
  handleClickOpen?: () => void;
  handleClose?: () => void;
  serviceCreated?: () => void;
}

const validationSchema = Yup.object().shape({
  secretKey: Yup.string().required('Secret Key is required!'),
  name: Yup.string().required('Name is required!'),
  publishableKey: Yup.string().required('Publish Key required!')
});
const initialValues = {
  name: '',
  secretKey: '',
  publishableKey: ''
};

// Export create service dialouge
export const CreateServiceDialog: FC<ICreateServiceDialog> = ({ serviceCreated, showServiceModal, handleClose }) => {
  // States
  // const [open, setOpen] = React.useState(showServiceModal);
  const [loading, setLoading] = React.useState(false);

  // Get navigate from hook
  // Get artist id from hook
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      setLoading(true);
      setSubmitting(true);
      ServiceApi.create(values)
        .then((res) => {
          handleClose && handleClose();
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.tsx:58 ~ handleSubmit ~ err:', err);
        });
    } catch (e) {
      console.log('error', e);
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Return products page
  return (
    <div>
      <Dialog open={showServiceModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add new Service / Api</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={24}>
                  <Stack spacing={16} sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Name"
                      disabled={isSubmitting}
                      value={values.name}
                      error={!!(errors.name && touched.name)}
                      helperText={errors.name && touched.name && String(errors.name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ mt: '10px' }}
                    />
                    <TextField
                      fullWidth
                      name="secretKey"
                      label="Secret Key"
                      disabled={isSubmitting}
                      value={values.secretKey}
                      error={!!(errors.secretKey && touched.secretKey)}
                      helperText={errors.secretKey && touched.secretKey && String(errors.secretKey)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      fullWidth
                      name="publishableKey"
                      label="Publishable Key"
                      disabled={isSubmitting}
                      value={values.publishableKey}
                      error={!!(errors.publishableKey && touched.publishableKey)}
                      helperText={errors.publishableKey && touched.publishableKey && String(errors.publishableKey)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Stack>
                </Stack>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} startIcon={loading && <CircularProgress size={20} />}>
                    Publish
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};
