import { Avatar, Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

import { EmailApi, NewsLetterApi } from '../../../apis';
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

export interface ITemplateCard {
  onItemClicked: (number) => void;
  template: any;
  index: number;
  showEdit?: boolean
}

const TemplateCard = ({ onItemClicked, template, showEdit=true }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  const clickHandler = (id) => {
    if (!open) onItemClicked(id);
  };

  const handleClose = () => {
    setShowConfigModal(false);
  };

  const handleDelete = () => {
    NewsLetterApi.deleteNewsLetterById(template.id);
  };

  const handleConfig = async () => {
    try {
      if (template.template_type === TEMPLATE_TYPE.DRAFT) {
        await NewsLetterApi.updateNewsLettereById(template.id, { template_type: TEMPLATE_TYPE.PUBLISHED });
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
        {showEdit &&<MoreActionMenu
          type={template.template_type}
          onDelete={handleDelete}
          onConfig={handleConfig}
          onClick={() => setOpen(!open)}
        />}
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
       {showEdit && <TemplateActions>
          <Button variant="outlined" sx={{ marginRight: '1rem' }}>
            Edit
          </Button>
        </TemplateActions>}
      </TemplateFooter>
      <ConfigurationModal showTemplateModal={showConfigModal} template={template} handleClose={handleClose} />
    </Template>
  );
};

export default TemplateCard;
