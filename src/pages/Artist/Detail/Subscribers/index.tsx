import moment from 'moment';
import React from 'react';
import { IColumn, Table } from '../../../../components';
import { Avatar, Stack, Typography } from '@mui/material';
import { IArtist } from '../../../../shared/types';

interface ISubscribedUserListProps {
    artist: IArtist | undefined;
}
export const SubscribedUserList = ({ artist }: ISubscribedUserListProps) => {
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
        // {
        //     field: 'country',
        //     title: 'Country',
        //     render: (row) => <Typography variant="body2">{row.country ? countries[row.country]?.name : ''}</Typography>
        // },
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
    return (
        <>
            {
                artist?.subscriber?.length === 0 ?
                    <h1>Not data found</h1> :
                    <Table
                        showToolBar={false}
                        title="Users"
                        data={artist?.subscriber ? artist?.subscriber : []}
                        columns={columns}
                    />
            }
        </>
    );
};