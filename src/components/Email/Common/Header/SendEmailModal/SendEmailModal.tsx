// Dependencies
import { Mail } from '@mui/icons-material';
import {
  Autocomplete,
  Avatar,
  DialogActions,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { UsersApi } from '../../../../../apis';
import { ActiveSendIcon, CancelIcon, SendIcon } from '../../../../../assets/icons';
import { COLORS } from '../../../../../constants/colors';
import { getUsersAction } from '../../../../../store/actions/users.actions';
import { getUsersSelector } from '../../../../../store/selectors';
import CustomButton from '../../../../CustomButton/CustomButton';
import {
  DescriptionField,
  MailContent,
  ModalContainer,
  ModalContent,
  ModalGrid,
  ModalHeader,
  Recipient,
  RecipientsBox,
  Row,
  StyledOutlinedInput,
  SubTitle
} from './style';

interface ISendEmailModal {
  showTemplateModal: boolean;
  handleClose: () => void;
  handleSend: (val: any) => void;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Supporting text'),
  subject: Yup.string().required('Supporting text')
  // to: Yup.string().required('Supporting text')
});
const initialValues = {
  description: '',
  subject: ''
  // to: ''
};

export const SendEmailModal: FC<ISendEmailModal> = ({ showTemplateModal, handleClose, handleSend }) => {
  const [recipients, setRecipients] = useState<Array<any>>([]);
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const users = useSelector(getUsersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers();
  }, []);

  const userEmail = users.map((val) => val.email);

  // Fetch users
  const fetchUsers = () => {
    UsersApi.readAll({
      options: {}
    })
      .then((res) => {
        dispatch(getUsersAction(res.users));
      })
      .catch((err) => console.log(err));
  };

  const toggleChange = () => {
    setIsToggle(!isToggle);
    setRecipients([]);
  };

  const addRecipients = (option) => {
    if (recipients.includes(option)) return;
    setRecipients([...recipients, option]);
  };

  const handleRemove = (value) => {
    setRecipients([...recipients.filter((recipient) => recipient !== value)]);
  };

  // Return products page
  return (
    <Modal open={showTemplateModal} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader>
          <Mail />
          <Typography>Send Mail</Typography>
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSend({ ...values, to: recipients });
            console.log('values', { ...values, to: isToggle ? userEmail : recipients });
          }}
        >
          {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isSubmitting }) => (
            // <ModalContent>
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <MailContent>
                <Stack
                  direction="column"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={24}
                  width={'100%'}
                  marginRight={'1rem'}
                >
                  <TextField
                    fullWidth
                    name="subject"
                    label="Subject"
                    disabled={isSubmitting}
                    value={values.subject}
                    error={!!(errors.subject && touched.subject)}
                    helperText={errors.subject && touched.subject && String(errors.subject)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <DescriptionField
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
                    sx={{ flexGrow: 1 }}
                  />
                </Stack>
                <img src="/images/happy-birthday.png" />
              </MailContent>
              <RecipientsBox>
                <SubTitle>SELECTE TEMPLATE</SubTitle>
                <Row mt={15}>
                  <Autocomplete
                    renderInput={(params) => <TextField {...params} label="TO" placeholder="" value={5} />}
                    options={userEmail}
                    multiple
                    disableCloseOnSelect
                    renderOption={(props, option) => (
                      <li {...props} onClick={() => addRecipients(option)}>
                        {option}
                      </li>
                    )}
                    sx={{ width: '50%', marginRight: '1rem' }}
                  />
                  <FormControl sx={{ m: 1, width: '50%' }} variant="outlined" onClick={toggleChange}>
                    <InputLabel htmlFor="outlined-adornment-password">SEND TO ALL</InputLabel>
                    <StyledOutlinedInput
                      value={isToggle ? 'Send to all users' : 'Don\'t send to all users'}
                      type="button"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>{<Switch disabled checked={isToggle} sx={{ marginRight: 20 }} />}</IconButton>
                        </InputAdornment>
                      }
                      active={isToggle}
                      label="Password"
                    />
                  </FormControl>
                </Row>
                <ModalGrid>
                  {recipients.map((item, index) => (
                    <Recipient key={index}>
                      <Avatar sx={{ width: ' 1.5rem', height: ' 1.5rem' }} />
                      <Typography fontSize="0.6875rem" color={COLORS.BLUELIGHT}>
                        {item}
                      </Typography>
                      <IconButton
                        sx={{ width: '1.5rem', height: '1.5rem', padding: '0' }}
                        onClick={() => handleRemove(item)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Recipient>
                  ))}
                </ModalGrid>
              </RecipientsBox>
              <DialogActions>
                <CustomButton variant="outlined" width={115} onClick={handleClose} title="Discard" />
                <CustomButton
                  variant="contained"
                  width={115}
                  start
                  type="submit"
                  activeIcon={<ActiveSendIcon />}
                  icon={<SendIcon />}
                  title="Send"
                />
              </DialogActions>
            </Form>
            // {/* </ModalContent> */}
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};
