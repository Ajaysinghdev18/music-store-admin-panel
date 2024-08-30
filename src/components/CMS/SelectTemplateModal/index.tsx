import { Box, Button, Modal } from '@mui/material';
import './styles';
import { ModalContainer, ModalContent } from './styles';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useEffect, useState } from 'react';
import { CMSApi } from '../../../apis';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import temp from '../../../assets/image/temp.png';
import { ModalFooter } from '../../Email/Common/Header/SendEmailModal/style';
export const SelectTemplateModal = ({ open, handleClose }) => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [showTemplate, setShowTemplate] = useState<boolean>(false);
    useEffect(() => {
        CMSApi.getAllTemplate().then((res) => {
            setTemplates(res.templates);
        });
    }, []);
    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContainer>
                {showTemplate ?
                    <ModalContent>
                        {templates.map((item: any) => {
                            return (
                                <Box
                                    justifyContent={'center'}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    alignItems={'center'}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(ROUTES.CMS.NEWTEMPLATE, {
                                        state: {
                                            item
                                        }
                                    })}>
                                    <Box height={250}>
                                        <img src={temp} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                    </Box>
                                    {item?.title}
                                </Box>
                            );
                        })}
                        <ModalFooter>
                            <Button onClick={()=>setShowTemplate(false)}> Back </Button>
                        </ModalFooter>
                    </ModalContent>
                    :
                    <ModalContent>
                        <Box
                            sx={{ cursor: 'pointer' }}
                            width={'50%'}
                            flexDirection={'column'}
                            height={100}
                            alignItems={'center'}
                            display={'flex'}
                            justifyContent={'center'}
                            onClick={() => setShowTemplate(true)}
                        >
                            <SpaceDashboardIcon sx={{ fontSize: 40 }} />
                            Select Existing Template
                        </Box>
                        <Box
                            sx={{ cursor: 'pointer' }}
                            width={'50%'}
                            flexDirection={'column'}
                            height={100}
                            alignItems={'center'}
                            display={'flex'}
                            justifyContent={'center'}
                            onClick={() => navigate(ROUTES.CMS.NEW)}
                        >
                            <AddCardIcon sx={{ fontSize: 40 }} />
                            Create new Template
                        </Box>
                    </ModalContent>}
            </ModalContainer>
        </Modal>
    );
};