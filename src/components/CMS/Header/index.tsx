import React, { useState } from 'react';
import { Container, CustomInput, Row } from './styles';
import { Avatar, Box, Divider, IconButton } from '@mui/material';
import CustomButton from '../../CustomButton/CustomButton';
import MenuView from '../../Email/Common/Header/MenuView';
import { BackIcon, DMIcon, MenuIcon, RingIcon, SaveIcon, SendIcon, SettingsIcon } from '../../../assets/icons';
import { COLORS } from '../../../constants/colors';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export interface ICMSHeaderProps {
    template?: any;
    handleSaveAsDraft?: any;
    setTemplateName: any;
    templateName: any;
    handlePublish: any;
  }
  
export const CMSHeader = ({ setTemplateName, templateName, handlePublish, handleSaveAsDraft }:ICMSHeaderProps) => {
    const [menuView, setMenuView] = useState(false);
    const navigate = useNavigate();
    //menu handler
    const handleMenuView = () => {
        setMenuView(!menuView);
    };

    const onClickBackButton = () => {
        navigate(ROUTES.CMS.LIST);
    };
    return (
        <Container>
            <Box ml="0.25rem">
                <IconButton onClick={handleMenuView}>
                    <MenuIcon />
                </IconButton>
                <MenuView visible={false} />
            </Box>
            <DMIcon />
            <Row
                // ml={isCollapsed ? '8px' : '160px'}
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
                        onChange={(e)=>setTemplateName(e.target.value)}
                        placeholder="Enter the Template Name"
                    />
                    <Divider orientation="vertical" sx={{ mx: '0.25rem' }} />
                    <Box display={'flex'}>
                        <CustomButton
                            title="Save  As Draft"
                            disabled={templateName === ''}
                            onClick={()=>handleSaveAsDraft()}
                            variant="outlined"
                            start={true}
                            width={160}
                            icon={<SaveIcon />}
                        />
                         <CustomButton
                            variant="contained"
                            start={true}
                            disabled={templateName === ''}
                            icon={<SendIcon />}
                            width={115}
                            title="Publish"
                        onClick={()=>handlePublish()}
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