import { Avatar, Box, Button, DialogActions, Modal, Typography } from '@mui/material';
import { useState } from 'react';

import { EmailApi } from '../../../apis';
import {
  SectionBody,
  SectionTitle,
  Template,
  TemplateActions,
  TemplateBody,
  TemplateFooter,
  TemplateHeader
} from '../style';
import { ConfigurationModal } from './ConfigurationModal/Configuration';
import MoreActionMenu, { TEMPLATE_TYPE } from './MoreActionMenu';
import { ModalContainer, ModalContent } from './ConfigurationModal/style';
import CustomButton from '../../CustomButton/CustomButton';

export interface ITemplateCard {
  onItemClicked: (number) => void;
  template: any;
  index: number;
}

const TemplateCard = ({ onItemClicked, template }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  const clickHandler = (id) => {
    if (!open) onItemClicked(id);
  };

  const handleClose = () => {
    setShowConfigModal(false);
  };

  const handleDelete = () => {
    EmailApi.deleteEmailTemplateById(template.id);
  };

  const handleConfig = async () => {
    try {
      if (template.template_type === TEMPLATE_TYPE.DRAFT) {
        await EmailApi.updateEmailTemplateById(template.id, { template_type: TEMPLATE_TYPE.PUBLISH });
      }
      if (template.template_type === TEMPLATE_TYPE.PUBLISH || template.template_type === TEMPLATE_TYPE.PUBLISHED) {
        setShowConfigModal(true);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <Template onClick={() => clickHandler(template.id)}>
      <TemplateHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={template.thumbnail || ''} sx={{ width: 40, height: 40 }} />
          <Box ml={16}>
            <Typography fontSize={20} sx={{ fontWeight: 500 }}>
              {template.title}
            </Typography>
            <SectionBody mt="0.0675rem">{template.email_type}</SectionBody>
          </Box>
        </Box>
        <MoreActionMenu
          type={template.template_type}
          onDelete={()=> setOpenDelete(true)}
          onConfig={handleConfig}
          onClick={() => setOpen(!open)}
        />
      </TemplateHeader>
      <TemplateBody>
        {template.thumbnail ? <img src={template.thumbnail} height={'100%'} width={'100%'} /> : null}
      </TemplateBody>

      <TemplateFooter>
        <Box>
          <SectionTitle>{template.subject}</SectionTitle>
          <SectionBody mt="0.0675rem">{template.updatedAt}</SectionBody>
        </Box>
        <SectionBody mt="2.125rem">{template.description}</SectionBody>
        <TemplateActions>
          <Button variant="outlined" sx={{ marginRight: '1rem' }}>
            Edit
          </Button>
        </TemplateActions>
      </TemplateFooter>
      <ConfigurationModal showTemplateModal={showConfigModal} template={template} handleClose={handleClose} />
      <Modal
      open={openDelete}
      onClose={() => {
        setOpenDelete(!openDelete);
      }}
    >
      <ModalContainer>
        <ModalContent>
        <SectionTitle>Are You sure you want to delete template?</SectionTitle>
        </ModalContent>
        <Box justifyContent={'flex-end'}>
          <DialogActions>
            <CustomButton
              variant="outlined"
              width={115}
              onClick={() => {
                setOpenDelete(false);
              }}
              title="Cancel"
            />
            <CustomButton
              variant="contained"
              onClick={handleDelete}
              width={155}
              start={true}
              title="Delete"
            />
          </DialogActions>
        </Box>
      </ModalContainer>
    </Modal>
    </Template>
  );
};

export default TemplateCard;
