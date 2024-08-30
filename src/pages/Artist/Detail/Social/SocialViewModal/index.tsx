import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { ISocial } from '../../../../../shared/types';
import { SocialApi } from '../../../../../apis';
import { VideoPlayer } from '../../../../../components';
import { ROUTES } from '../../../../../constants';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { TextInput } from '../../../../../components/TextInput';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    maxWidth:800,
    minHeight: 400,
    padding: 4,
    bgcolor: 'background.paper',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

export const SocialViewModal = ({ open, setOpen, id }: any) => {
    const [social, setSocial] = useState<ISocial | any>();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            SocialApi.read(id).then(res => setSocial(res.SocialContent));
        }
    }, [id]);
    const handleClose = () => setOpen(false);
    const onEdit = () => {
        navigate(ROUTES.ARTIST.SOCIAL_DETAIL.replace(':type', social.contentType).replace(':artistId', social.artistId).replace(':id', id));
    };
    return (
        <Modal open={open}
            onClose={handleClose}>
            <Box sx={style}>
                {social &&
                    <Box margin={10} >
                        <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                <Avatar src={social.thumbnail.url} />
                                <Typography marginLeft={20}>{social.title}</Typography>
                            </Box>
                            <Close onClick={handleClose} />
                        </Box>
                        <Box my={30}>
                        <TextInput
                            multiline
                            minRows={6}
                            label="Statement"
                            value={social.statement}
                        />
                        </Box>
                        {social.contentType === 'video' && <VideoPlayer videoUrl={social?.video?.url} />}
                        {social.contentType === 'announcement' && <img src={social?.attachment?.url} />}
                        <Box my={32} display={'flex'} justifyContent={'flex-end'} width={'full'} alignItems={'flex-end'}>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Box marginLeft={10}>
                                <Button onClick={onEdit}>Edit</Button>
                            </Box>
                        </Box>
                    </Box>
                }
            </Box>
        </Modal>
    );
};