// Dependencies
import UpdateIcon from '@mui/icons-material/Update';
import { Divider, InputAdornment, MenuItem, Modal, Stack, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import * as Yup from 'yup';

import { ActiveSaveIcon2, SaveIcon2, SearchIcon } from '../../../../../assets/icons';
import { COLORS } from '../../../../../constants/colors';
import CustomButton from '../../../../CustomButton/CustomButton';
import { CustomSelect } from '../../styles';
import {
  AdminName,
  Col,
  DescriptionField,
  EmailTitle,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SearchContainer,
  SearchInput,
  StyledEmailsBox,
  StyledGrid,
  StyledSearchInput,
  SubTitle
} from './style';

interface IUpdateTemplateModal {
  showTemplateModal: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Supporting text'),
  subject: Yup.string().required('Supporting text')
});
const initialValues = {
  description: '',
  subject: ''
};

export const UpdateTemplateModal: FC<IUpdateTemplateModal> = ({ showTemplateModal, handleClose }) => {
  const handleSubmit = () => {
    console.log('````````');
  };

  // Return products page
  return (
    <Modal open={showTemplateModal} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader>
          <UpdateIcon />
          <Typography>Update Existing Template</Typography>
        </ModalHeader>
        <ModalContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Stack
                  direction="column"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={24}
                  height="100%"
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
                    sx={{ flexGrow: 1, height: '100%' }}
                  />
                </Stack>
              </Form>
            )}
          </Formik>
          <img src="/images/happy-birthday.png" />
        </ModalContent>
        <ModalFooter>
          <SubTitle>SELECTE TEMPLATE</SubTitle>
          <SearchContainer>
            <StyledSearchInput sx={{ width: '23.625rem !important' }}>
              <SearchInput
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </StyledSearchInput>
            <CustomSelect
              inputProps={{ 'aria-label': 'Without label' }}
              value={'none'}
              sx={{ width: '180.0675rem !important' }}
            >
              <MenuItem value={10}>A-Z</MenuItem>
              <MenuItem value={20}>Z-A</MenuItem>
              <MenuItem value={30}>Newest</MenuItem>
              <MenuItem value={30}>Oldest</MenuItem>
            </CustomSelect>
          </SearchContainer>
          <StyledGrid container>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <StyledEmailsBox key={index}>
                <Col padding={'1.125rem'}>
                  <EmailTitle>Email Template Title</EmailTitle>
                  <AdminName>Joe Doe-Administraotr</AdminName>
                </Col>
                <Col bgcolor={COLORS.LIGHTBROWN} borderRadius={'8px'} width={'80px'} height={'100%'} />
              </StyledEmailsBox>
            ))}
          </StyledGrid>
        </ModalFooter>
        <DialogActions>
          <CustomButton variant="outlined" width={115} onClick={handleClose} title="Discard" />
          <CustomButton
            variant="contained"
            width={115}
            start={true}
            icon={<ActiveSaveIcon2 />}
            activeIcon={<SaveIcon2 />}
            title="Update"
          />
        </DialogActions>
      </ModalContainer>
    </Modal>
  );
};
