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

import { ContractApi } from '../../../../../apis';

interface ICreateContractDialog {
  showContractModal: boolean;
  handleClickOpen?: () => void;
  handleClose: () => void;
  contractExecuted: () => void;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required!'),
  tokenName: Yup.string().required('Website address is required!'),
  tokenSymbol: Yup.string().required('Spotify is required!'),
  network: Yup.string().required('Twitter address is required!'),
  chain: Yup.string().required('Facebook address is required!'),
  contractName: Yup.string().required('Contract Name is required!')
});
const initialValues = {
  description: '',
  tokenName: '',
  tokenSymbol: '',
  network: 'testnet',
  chain: 'ETH',
  contractName: ''
};

// Export contracts page
export const CreateContractDialog: FC<ICreateContractDialog> = ({
  contractExecuted,
  showContractModal,
  handleClose
}) => {
  // States
  // const [open, setOpen] = React.useState(showContractModal);
  const [loading, setLoading] = React.useState(false);

  // Get navigate from hook
  // Get artist id from hook
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (values, { setSubmitting }: FormikHelpers<any>) => {
    try {
      setLoading(true);
      setSubmitting(true);
      values.artistId = id;
      ContractApi.create(values)
        .then(() => {
          setLoading(false);
          handleClose();
          contractExecuted();
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log('error', e);
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Return products page
  return (
    <div>
      <Dialog open={showContractModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add new Smart Contract</DialogTitle>
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
                      name="contractName"
                      label="Contract Name"
                      disabled={isSubmitting}
                      value={values.contractName}
                      error={!!(errors.contractName && touched.contractName)}
                      helperText={errors.contractName && touched.contractName && String(errors.contractName)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ mt: '10px' }}
                    />
                    <TextField
                      fullWidth
                      name="tokenName"
                      label="Token Name"
                      disabled={isSubmitting}
                      value={values.tokenName}
                      error={!!(errors.tokenName && touched.tokenName)}
                      helperText={errors.tokenName && touched.tokenName && String(errors.tokenName)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      fullWidth
                      name="tokenSymbol"
                      label="Token Symbol"
                      disabled={isSubmitting}
                      value={values.tokenSymbol}
                      error={!!(errors.tokenSymbol && touched.tokenSymbol)}
                      helperText={errors.tokenSymbol && touched.tokenSymbol && String(errors.tokenSymbol)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      name="description"
                      label="DESCRIPTION"
                      disabled={isSubmitting}
                      value={values.description}
                      error={!!(errors.description && touched.description)}
                      helperText={errors.description && touched.description && String(errors.description)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">SELECT NETWORK</InputLabel>
                      <Select
                        value={values.network}
                        disabled={isSubmitting}
                        error={!!(errors.network && touched.network)}
                        onBlur={handleBlur}
                        label="NETWORK"
                        input={<OutlinedInput label="SELECT NETWORK" />}
                        onChange={(e) => {
                          setFieldValue('network', (e as React.ChangeEvent<HTMLInputElement>).target.value);
                        }}
                      >
                        <MenuItem value="testnet">Testnet</MenuItem>
                        {/* <MenuItem value="CSPR">Mainnet</MenuItem> */}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">SELECT BLOCKCHAIN</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.chain}
                        label="Chain"
                        input={<OutlinedInput label="SELECT BLOCKCHAIN" />}
                        onChange={(e) => {
                          setFieldValue('chain', (e as React.ChangeEvent<HTMLInputElement>).target.value);
                        }}
                      >
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="CSPR">CSPR</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
                <DialogActions>
                  <Button  disabled={loading} onClick={handleClose}>Cancel</Button>
                  <Button type="submit" disabled={loading || isSubmitting} startIcon={loading && <CircularProgress size={20} />}>
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
