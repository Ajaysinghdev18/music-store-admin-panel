// Dependencies
import { Alert, Divider, FormControl, InputLabel, Modal, Stack, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Field, Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import * as Yup from 'yup';

import { ActiveSaveIcon2, SaveIcon2 } from '../../../../../assets/icons';
import { getObjectUrl } from '../../../../../utils';
import CustomButton from '../../../../CustomButton/CustomButton';
import { Dropzone } from '../../../../Dropzone';
import { TEMPLATE_TYPE } from '../../MoreActionMenu';
import { DescriptionField, ModalContainer, ModalContent, ModalHeader } from './style';

interface ICreateContractDialog {
  showTemplateModal: boolean;
  handleClose: () => void;
  handleSaveAsSubmit: (any) => void;
  type: string;
  template?: any;
  actionType: any;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Supporting text'),
  subject: Yup.string().required('Supporting text')
});

export const SaveTemplateModal: FC<ICreateContractDialog> = ({
  showTemplateModal,
  handleClose,
  handleSaveAsSubmit,
  type,
  template,
  actionType
}) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState<string>();
  const initialValues = {
    description: template ? template.description : '',
    subject: template ? template.subject : ''
  };

  // Return products page
  return (
    <Modal open={showTemplateModal} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader>
          <SaveIcon2 />
          <Typography>{type === TEMPLATE_TYPE.DRAFT ? 'Save as Draft' : 'Save a New Template'}</Typography>
        </ModalHeader>
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (thumbnail !== null) {
                return handleSaveAsSubmit({ ...values, thumbnail: thumbnail });
              } else if (actionType === 'edit' && template?.thumbnail !== null) {
                return handleSaveAsSubmit({ ...values, thumbnail: template?.thumbnail });
              } else {
                setError('Please Upload the Image');
              }
            }}
          >
            {({ handleSubmit, handleBlur, handleChange, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Stack direction="column" width={'100%'} justifyContent={'space-between'}>
                  <Stack direction="row" width={'100%'} justifyContent={'space-between'}>
                    <Stack
                      direction="column"
                      width={'48%'}
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
                    <Stack width={'50%'} pl={'2%'} borderLeft={1}>
                      <FormControl fullWidth>
                        <InputLabel>THUMBNAIL</InputLabel>
                        {/* @ts-ignore */}
                        <Dropzone
                          label="Drag image here to upload"
                          accept={['.png', '.jpg', '.svg']}
                          onDrop={(files) => {
                            setThumbnail(files[0]);
                            setError('');
                          }}
                          preview={
                            template?.thumbnail ? template.thumbnail : thumbnail ? getObjectUrl(thumbnail) : false
                          }
                        />
                        {error && (
                          <Alert style={{ marginTop: 30, alignItems: 'center' }} severity="error">
                            <Typography fontSize={14} color={'red'}>
                              {error}
                            </Typography>
                          </Alert>
                        )}
                      </FormControl>
                    </Stack>
                  </Stack>
                  <Stack>
                    <DialogActions>
                      <CustomButton variant="outlined" width={115} onClick={handleClose} title="Discard" />
                      <CustomButton
                        variant="contained"
                        width={115}
                        start={true}
                        icon={<ActiveSaveIcon2 />}
                        type="submit"
                        activeIcon={<SaveIcon2 />}
                        title="Save"
                      />
                    </DialogActions>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
