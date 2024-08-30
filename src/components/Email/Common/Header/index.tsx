import { Avatar, Box, Divider, IconButton } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//icons
import { BackIcon, DMIcon, MenuIcon, RingIcon, SaveIcon, SendIcon, SettingsIcon } from '../../../../assets/icons';
import { ROUTES } from '../../../../constants';
import { COLORS } from '../../../../constants/colors';
import CustomButton from '../../../CustomButton/CustomButton';
import { TEMPLATE_TYPE } from '../MoreActionMenu';
import MenuView from './MenuView';
//Modals
import { SaveTemplateModal } from './SaveTemplateModal/SaveTemplateModal';
import { SendEmailModal } from './SendEmailModal/SendEmailModal';
//Components
import { Container, CustomInput, Row } from './styles';

export interface IHeaderProps {
  isCollapsed: boolean;
  handleSaveAsSubmit: (val: any) => void;
  handleSaveAsDraft: (val: any) => void;
  handleSendEmail: (val: any) => void;
  template?: any;
  type: any;
  setTemplateName: any;
  templateName: any;
}

const Header: FC<IHeaderProps> = ({
  isCollapsed,
  handleSaveAsSubmit,
  handleSaveAsDraft,
  handleSendEmail,
  template,
  type,
  setTemplateName,
  templateName
}) => {
  const [menuView, setMenuView] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [showSaveAsDraftTemplateModal, setShowSaveAsDraftTemplateModal] = useState(false);
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const navigate = useNavigate();
  //menu handler
  const handleMenuView = () => {
    setMenuView(!menuView);
  };

  const onClickBackButton = () => {
    navigate(ROUTES.EMAIL.LIST);
  };

  //modal handlers

  const handleSaveTemplateModalOpen = () => {
    setShowSaveTemplateModal(true);
  };
  const handleSaveTemplateModalClose = () => {
    setShowSaveTemplateModal(false);
  };
  const handleSaveAsDraftTemplateModalOpen = () => {
    setShowSaveAsDraftTemplateModal(true);
  };
  const handleSaveAsDraftTemplateModalClose = () => {
    setShowSaveAsDraftTemplateModal(false);
  };

  const handleSendEmailModalOpen = () => {
    setShowSendEmailModal(true);
  };

  const handleSendEmailModalClose = () => {
    setShowSendEmailModal(false);
  };

  return (
    <Container>
      <Box ml="0.25rem">
        <IconButton onClick={handleMenuView}>
          <MenuIcon />
        </IconButton>
        <MenuView visible={menuView} />
      </Box>
      <DMIcon />
      <Row
        ml={isCollapsed ? '8px' : '160px'}
        py={'8px'}
        justifyContent={'space-between'}
        flexGrow={'1'}
        width={'0'}
        sx={{
          transition: 'ease-in-out 0.2s'
        }}
      >
        <Row height={'3rem'} width={'20%'} display={'flex'}>
          <Row mr={'8px'} bgcolor={COLORS.WHITE} padding={'0.25rem'} borderRadius={'8px'} alignItems="center">
            <CustomButton
              variant="outlined"
              start={true}
              icon={<BackIcon />}
              title="Back"
              width={103}
              onClick={onClickBackButton}
            />
          </Row>
        </Row>
        <Row alignItems={'center'} width={'50%'} justifyContent={'flex-end'}>
          <CustomInput
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter the Template Name"
          />
          <Divider orientation="vertical" sx={{ mx: '0.25rem' }} />
          <Box display={'flex'}>
            <CustomButton
              title="Save"
              onClick={handleSaveTemplateModalOpen}
              variant="outlined"
              start={true}
              width={160}
              icon={<SaveIcon />}
            />
            <CustomButton
              title="Save  As Draft"
              onClick={handleSaveAsDraftTemplateModalOpen}
              variant="outlined"
              start={true}
              width={160}
              icon={<SaveIcon />}
            />
            <SaveTemplateModal
              actionType={type}
              template={template}
              type={TEMPLATE_TYPE.PUBLISH}
              showTemplateModal={showSaveTemplateModal}
              handleClose={handleSaveTemplateModalClose}
              handleSaveAsSubmit={(val) => handleSaveAsSubmit(val)}
            />
            <SaveTemplateModal
              actionType={type}
              template={template}
              type={TEMPLATE_TYPE.DRAFT}
              showTemplateModal={showSaveAsDraftTemplateModal}
              handleClose={handleSaveAsDraftTemplateModalClose}
              handleSaveAsSubmit={(val) => handleSaveAsDraft(val)}
            />
            <SendEmailModal
              showTemplateModal={showSendEmailModal}
              handleClose={handleSendEmailModalClose}
              handleSend={(val) => handleSendEmail(val)}
            />
          </Box>
          <Box>
            <CustomButton
              variant="contained"
              start={true}
              icon={<SendIcon />}
              width={115}
              title="Send"
              onClick={handleSendEmailModalOpen}
            />
          </Box>
          <Divider orientation="vertical" />
          <Row alignItems={'center'} width={'auto'}>
            <Row marginRight={'8px'} width={'auto'}>
              <IconButton>
                <RingIcon />
              </IconButton>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Row>
            <Avatar />
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default Header;
