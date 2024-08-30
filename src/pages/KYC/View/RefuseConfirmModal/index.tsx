// Dependencies
import { Modal, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import * as Yup from 'yup';

import { ActiveSendIcon, SendIcon } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { ModalContainer, ModalContent, ModalHeader } from './style';

interface IConfirmModal {
  showTemplateModal: boolean;
  handleClose: () => void;
  handleSubmitRefuse: (values: any) => void;
}

const validationSchema = Yup.object().shape({
  // description: Yup.string().required('Supporting text'),
  reason: Yup.string().required('Supporting text')
  // to: Yup.string().required('Supporting text')
});

const initialValues = {
  // description: '',
  reason: ''
  // to: ''
};

export const RefuseConfirmModal: FC<IConfirmModal> = ({ showTemplateModal, handleClose, handleSubmitRefuse }) => {
  // Return products page
  return (
    <Modal open={showTemplateModal} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader>
          <Typography>Refuse Request</Typography>
        </ModalHeader>
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
               handleSubmitRefuse(values);
            }}>
            {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="reason"
                    label="note for user"
                    disabled={isSubmitting}
                    value={values.reason}
                    error={!!(errors.reason && touched.reason)}
                    helperText={errors.reason && touched.reason && String(errors.reason)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Typography>
                    You can explain the reason of refusing this request and how to fix it for user
                  </Typography>
                  <DialogActions>
                    <CustomButton variant="outlined" type="button" width={115} onClick={handleClose} title="Discard" />
                    <CustomButton
                      type="submit"
                      // onClick={handleSubmit}
                      variant="contained"
                      width={115}
                      start={true}
                      activeIcon={<ActiveSendIcon />}
                      icon={<SendIcon />}
                      title="Send"
                    />
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
