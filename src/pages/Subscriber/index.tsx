import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { IColumn, Table } from '../../components';
import { useSelector } from 'react-redux';
import { IAccount } from '../../shared/types';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccount } from '../../store/selectors';
import { ArtistApi, NewsLetterApi } from '../../apis';
import { SendIcon } from '../../assets/icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import { SendNewsLetterModal } from '../../components/NewsLetter/Common/Header/SendEmailModal/SendEmailModal';
import { ROUTES } from '../../constants';

export const SubscriberList = () => {
    const [artistId, setArtistId] = useState('');
    const [subscribers, setSubscribers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const account: IAccount = useSelector(getAccount);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setArtistId(id);
        } else if (account?.artistId) {
            setArtistId(account.artistId);
        }
    }, [id]);

    useEffect(() => {
        fetchDetails();
    }, [artistId]);

    const fetchDetails = () => {
        ArtistApi.read(artistId).then(res => {
            setSubscribers(res.artist?.subscriber);
        });
    };
    const userEmail = subscribers?.map((val: any) => val.email);
    // Constants
    const columns: IColumn[] = [
        {
            field: 'name',
            title: 'Name',
            render: (row) => (
                <Stack direction="row" spacing={12} alignItems="center">
                    <Avatar src={row.avatarUrl} alt="user-image" />
                    <Typography variant="body2">{row.name}</Typography>
                </Stack>
            )
        },
        {
            field: 'email',
            title: 'Email'
        },

        {
            field: 'isKYCVerified',
            title: 'KYC Verified',
            render: (row) => {
                return row.isKYCVerified ? <span>Verified</span> : <span>Not Verified</span>;
            }
        },
        {
            field: 'createdAt',
            title: 'Joined',
            render: (row) => moment(row.createdAt).format('HH:mm - DD MMMM YYYY')
        }
    ];
    const handleSendEmailModalOpen = () => {
        setIsOpen(!isOpen);
    };
    const handleSendNewsLetter = (values) => {
        const params = {
            subject: values.subject,
            content: values.contentHtml,
            address: userEmail.map((add) => {
                return { address: add };
            })
        };
        NewsLetterApi.sendNewsLetterToUsers(params).then((res) => {
            if (res) {
                navigate(ROUTES.NEWSLETTER.LIST);
            }
        });
    };
    return (
        <>
            <Box width={'100%'} display={'flex'} marginBottom={20} justifyContent={'end'}>
                <CustomButton
                    variant="contained"
                    start={true}
                    icon={<SendIcon />}
                    width={215}
                    title="Send News Letter"
                    onClick={handleSendEmailModalOpen}
                />
            </Box>
            <Table
                showToolBar={false}
                title="Subscriber"
                data={subscribers}
                columns={columns}
            />
            <SendNewsLetterModal
                showTemplateModal={isOpen}
                handleClose={handleSendEmailModalOpen}
                handleSend={(val) => handleSendNewsLetter(val)} />
        </>
    );
};