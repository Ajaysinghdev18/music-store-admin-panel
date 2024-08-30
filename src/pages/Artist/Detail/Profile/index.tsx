import { Box, Grid, IconButton, Switch, Tooltip, Typography } from '@mui/material';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ArtistApi } from '../../../../apis';
import { UploadIcon } from '../../../../assets/icons';
import { IArtist, IFile } from '../../../../shared/types';
import { getAccount } from '../../../../store/selectors';
import * as S from './styles';

const artist = {
  type: '',
  name: '',
  thumbnail: null as unknown as IFile,
  email: '',
  bio: '',
  id: '',
  website: '',
  spotify: '',
  twitter: '',
  facebook: '',
  instagram: '',
  discord: '',
  apikey: '',
  paypal: '',
  ethereum: '',
  casper: '',
  isFeatured: false
};

// test
const hashCode = '0xdf0cbcd1e671ee51a61b3363fa65b9a663401b04bf5cd59e9dae7323b62baa48';
interface IArtistDetailProfilePage {
  details: IArtist | undefined;
  setArtist: (artist: IArtist) => void;
}
export const ArtistDetailProfilePage = (props: IArtistDetailProfilePage) => {
  const { details, setArtist } = props;
  const [loading, setLoading] = useState(false);
  const user = useSelector(getAccount);

  const executionHandler = (type: string) => {
    setLoading(true);
    const newArtist: IArtist = { ...details };
    if (type == 'corporate') {
      newArtist.deploymentExecution = 'corporate';
    } else {
      newArtist.deploymentExecution = 'custom';
    }
    ArtistApi.update(details?.id as string, newArtist)
      .then((res) => {
        console.log('🚀 ~ file: index.tsx:43 ~ .then ~ res:', res);
        setArtist(newArtist as IArtist);
        setLoading(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:47 ~ executionHandler ~ err:', err);
        setLoading(false);
      });
  };

  return (
    <S.Profile>
      <Grid container spacing={16} justifyContent="space-between">
        <Grid item xs={12} md={5}>
          <S.ProfileList>
            <Typography variant="body1">Status:</Typography>
            <Box display="flex" alignItems="center">
              <Typography mr={27} color="success.main" variant="body1">
                Featured
              </Typography>
              <Switch defaultChecked={artist.isFeatured} onChange={() => !artist.isFeatured} />
            </Box>
          </S.ProfileList>
          {user?.role == 'admin' && (
            <S.ProfileList>
              <Typography variant="body1">Minting Type:</Typography>
              <Box display="flex" alignItems="center">
                <Typography mr={27} color="success.main" variant="body1">
                  {details?.deploymentExecution == 'corporate' ? 'Corporate' : 'Custom'}
                </Typography>
                <Switch
                  disabled={loading}
                  defaultChecked={details?.deploymentExecution == 'corporate' ? false : true}
                  onChange={() =>
                    executionHandler(details?.deploymentExecution == 'corporate' ? 'custom' : 'corporate')
                  }
                />
              </Box>
            </S.ProfileList>
          )}

          <S.ProfileList>
            <Typography variant="body1">Email:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.email}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Joined:</Typography>
            <Typography color="info.main" fontWeight={600} variant="body1">
              {moment(details?.createdAt).format('MMMM YYYY')}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">PayPal:</Typography>
            <Typography color="info.main" fontWeight={600} variant="body1">
              {details?.paypal}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Ethereum Wallet:</Typography>
            <Tooltip title={hashCode} placement="bottom" arrow>
              <a href={`https://sepolia.etherscan.io/tx/${hashCode}`} target="_blank">
                {details?.ethereumWallet?.slice(0, 4)}...{details?.ethereumWallet?.slice(-4)}
                <IconButton edge="end">
                  <UploadIcon />
                </IconButton>
              </a>
            </Tooltip>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Casper Wallet:</Typography>
            <Tooltip title={hashCode} placement="bottom" arrow>
              <a href={`https://sepolia.etherscan.io/tx/${hashCode}`} target="_blank">
                {details?.casperWallet?.slice(0, 4)}...{details?.casperWallet?.slice(-4)}
                <IconButton edge="end">
                  <UploadIcon />
                </IconButton>
              </a>
            </Tooltip>
          </S.ProfileList>
        </Grid>
        <Grid item xs={12} md={5}>
          <S.ProfileList>
            <Typography variant="body1">Website:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.website}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Spotify:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.spotify}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Twitter:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.twitter}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Facebook:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.facebook}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Instagram:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.instagram}
            </Typography>
          </S.ProfileList>
          <S.ProfileList>
            <Typography variant="body1">Discord:</Typography>
            <Typography color="info.main" variant="body1">
              {details?.discord}
            </Typography>
          </S.ProfileList>
        </Grid>
      </Grid>
    </S.Profile>
  );
};
