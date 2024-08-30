import React, { useEffect, useState } from 'react';
import { IColumn, Table } from '../../../../components/Table';
import { Avatar, Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAccount } from '../../../../store/selectors';
import { SocialApi } from '../../../../apis';
import * as S from './style';
import { ROUTES } from '../../../../constants';
import { PlusIcon } from '../../../../assets/icons';
import { ISocial } from 'easy-email-core';
import { ConfirmDialog } from '../../../../components';
import { SocialViewModal } from './SocialViewModal';

const columns: IColumn[] = [
    {
        field: 'thumbnail',
        title: 'Thumbnail',
        render: (row) => (
            <Stack direction="row" spacing={12} justifyContent={'center'} alignItems="center">
                <Avatar src={row.thumbnail.url} alt="user-image" />
            </Stack>
        )
    },
    {
        field: 'title',
        title: 'Title'
    },
    {
        field: 'contentType',
        title: 'Type',
        render: (row) => (
           <Typography textTransform={'capitalize'}>{row.contentType}</Typography>
        )
    },
    {
        field: 'createdAt',
        title: 'Published',
        render: (row) => moment(row.createdAt).format(' DD MMMM')
    },
    {
        field: 'publishOnSocialMedia',
        title: 'Integration',
        render: (row) => {
            return row.publishOnSocialMedia ? row.contentType : '-';
        }
    },

];
export const SocialSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [artistId, setArtistId] = useState('');
    const [selectedSocialId, setSelectedSocialId] = useState<string>();
    const [socialContent, setSocialContent] = useState<ISocial[]>([]);
    const [visibleDeleteConfirmDialog, setVisibleDeleteConfirmDialog] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const account = useSelector(getAccount);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const MenuItems = [{
        name: 'Video',
        route: ROUTES.ARTIST.NEW_SOCIAL.replace(':type', 'video').replace(':artistId', artistId),
    },
    {
        name: 'Announcement',
        route: ROUTES.ARTIST.NEW_SOCIAL.replace(':type', 'announcement').replace(':artistId', artistId),
    },
    ];
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (name: string) => {
        const item: any = MenuItems.find((item) => item.name == name);
        navigate(item.route);
        setAnchorEl(null);
    };
    useEffect(() => {
        if (id) {
            setArtistId(id);
        } else if (account?.artistId) {
            setArtistId(account.artistId);
        }
    }, [id]);
    const fetchSoicalContent = () => {
        if (artistId) {
            SocialApi.readAllByArtist(artistId).then(res => setSocialContent(res.SocialContent)).catch(err => console.log('err', err));
        }
    };
    useEffect(() => {
        fetchSoicalContent();
    }, [artistId]);
    const onEdit = (id, contentType) => {
        // console.log('id',contentType,artistId, id, ROUTES.ARTIST.SOCIAL_DETAIL.replace(':type', contentType).replace(':artistId', artistId).replace(':id', id));
        navigate(ROUTES.ARTIST.SOCIAL_DETAIL.replace(':type', contentType).replace(':artistId', artistId).replace(':id', id));
    };
    const onDelete = (id) => {
        setSelectedSocialId(id);
        setVisibleDeleteConfirmDialog(true);
    };
    const onView = (id) => {
        setSelectedSocialId(id);
        setOpenModal(true);

    };
    // Delete confirm handler
    const handleDeleteConfirmed = async () => {
        try {
            const res = await SocialApi.deleteSocial(selectedSocialId as string);
            if (res.success) {
                fetchSoicalContent();
                setVisibleDeleteConfirmDialog(false);
            }
        } catch (error) {
            console.log(error);
            setVisibleDeleteConfirmDialog(true);
        }
    };
    return (
        <>
            <Stack width={'100%'} justifyContent={'flex-end'} alignItems={'flex-end'} mb={30}>
                <S.AddButton onClick={handleClick}
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Box display={'flex'} alignItems={'center'} gap={12}>
                        <S.StackIcon>
                            <PlusIcon />
                        </S.StackIcon>
                        <Box fontWeight={'500'} fontSize={'0.875rem'}>
                            Create New
                        </Box>
                    </Box>
                </S.AddButton>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {MenuItems.map((item) => {
                        return (
                            <MenuItem onClick={() => handleClose(item.name)}>{item.name}</MenuItem>
                        );
                    })}
                </Menu>
            </Stack>
            {
                <Table
                    showToolBar={false}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                    data={socialContent}
                    columns={columns}
                />
            }
            <ConfirmDialog
                title={'Confirm Dialog'}
                description="Are you sure to delete?"
                visible={visibleDeleteConfirmDialog}
                setVisible={setVisibleDeleteConfirmDialog}
                onConfirmed={handleDeleteConfirmed}
            />
            <SocialViewModal 
            open={openModal} 
            setOpen={setOpenModal} 
            id={selectedSocialId}
             />
        </>
    );
};