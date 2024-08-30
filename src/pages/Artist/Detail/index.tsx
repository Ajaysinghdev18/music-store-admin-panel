import { Facebook, Forum, Instagram, Wifi } from '@mui/icons-material';
import { Avatar, Box, Button, CardHeader, CircularProgress, Grid, Stack, Switch, Typography } from '@mui/material';
import moment from 'moment/moment';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ArtistApi, ContractApi } from '../../../apis/index';
import { ArrowLeftIcon, PencilIcon } from '../../../assets/icons';
import { RoundedButton } from '../../../components';
import { ShadowCard } from '../../../components/Common/ShadowCard/ShadowCard';
import { PAGE_LIMIT, ROUTES } from '../../../constants';
import { COLORS } from '../../../constants/colors';
import { IArtist } from '../../../shared/types';
import { setSearchExp } from '../../../store/actions/header.actions';
import { getAccount } from '../../../store/selectors';
import { ArtistDetailGalleryPage } from './Gallery';
import * as S from './styles';

export const ArtistDetailPage: FC = () => {
  //useState
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artist, setArtist] = useState<IArtist>();
  const [isContractCreated, setContractCreated] = useState<boolean>(false);
  const [nfts, setNfts] = useState<any>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [artistId, setArtistId] = useState('');
  const account = useSelector(getAccount);
  const location = useLocation();

  useEffect(() => {
    if (id) {
      setArtistId(id);
    } else if (account?.artistId) {
      setArtistId(account.artistId);
    }
  }, [id]);

  const fetchArtistDetails = () => {
    if (!artistId) return;
    setIsLoading(true);
    ArtistApi.read(artistId)
      .then((res) => {
        setArtist(res.artist);
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally();
  };

  const fetchNfts = () => {
    setIsLoading(true);
    if (!artistId) return;
    ContractApi.readAllNftsByArtist({
      query: {
        artistId
      },
      options: {}
    })
      .then((res) => {
        setNfts(res);
        console.log(nfts);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  //useEffect
  useEffect(() => {
    if (artistId) {
      dispatch(setSearchExp(''));
      fetchArtistDetails();
      fetchNfts();
    }
  }, [artistId]);
  const handleClickBackBtn = () => {
    navigate(-1);
  };
  const handleClickEdit = () => {
    navigate(ROUTES.ARTIST.EDIT.replace(':id', `${artistId}`));
  };

  const contractExecuted = () => {
    setContractCreated(!isContractCreated);
  };

  const executionHandler = (type: string) => {
    const newArtist: IArtist = { ...artist };
    if (type == 'corporate') {
      newArtist.deploymentExecution = 'corporate';
    } else if (type == 'custom') {
      newArtist.deploymentExecution = 'custom';
    } else if (type == 'isFeatured') {
      newArtist.isFeatured = artist && !artist.isFeatured;
    }
    ArtistApi.update(id as string, newArtist)
      .then((res) => {
        console.log('🚀 ~ file: index.tsx:43 ~ .then ~ res:', res);
        setArtist(newArtist as IArtist);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:47 ~ executionHandler ~ err:', err);
      });
  };

  return (
    <>
      <Box sx={{ mb: 8, paddingRight: '1rem' }}>
        {artistId && isLoading ? (
          <Box height={300} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          artist && (
            <Fragment>
              {location.pathname !== ROUTES.HOME && (
                <CardHeader
                  title={
                    <Button variant="text" startIcon={<ArrowLeftIcon />} onClick={handleClickBackBtn}>
                      Back
                    </Button>
                  }
                  action={
                    <Button variant="contained" type="submit" startIcon={<PencilIcon />} onClick={handleClickEdit}>
                      Edit artist profile
                    </Button>
                  }
                  sx={{ mb: 24 }}
                />
              )}

              <S.Profile>
                <Stack display={'flex'} gap={'1rem'} width={'50%'}>
                  <Typography color={'text.black'} fontSize={'3rem'} fontWeight={'600'}>
                    {artist?.name}
                  </Typography>
                  <S.CategoryButtonBox>
                    <RoundedButton label={'Alternative'} background={'#7d7dff'} />
                    <RoundedButton label={'Hip-hop'} background={COLORS.BLUE} />
                    <RoundedButton label={'Electronic'} background={COLORS.BLUELIGHT} />
                  </S.CategoryButtonBox>
                  <Box fontSize={'1rem'}>{artist.bio}</Box>
                  <Box>
                    <Grid container spacing={'1rem'}>
                      <Grid item xs={3}>
                        <ShadowCard>
                          <Typography fontSize={'2rem'} fontWeight={'600'}>
                            {artist?.nftsCount || 0}
                          </Typography>
                          <Typography fontSize={'1rem'}>NFTS</Typography>
                        </ShadowCard>
                      </Grid>
                      <Grid item xs={3}>
                        <ShadowCard>
                          <Typography fontSize={'2rem'} fontWeight={'600'}>
                            {artist?.sellNfts || 0}
                          </Typography>
                          <Typography fontSize={'1rem'}>Sells</Typography>
                        </ShadowCard>
                      </Grid>
                      <Grid item xs={3}>
                        <ShadowCard>
                          <Typography fontSize={'2rem'} fontWeight={'600'}>
                            0
                          </Typography>
                          <Typography fontSize={'1rem'}>Shares</Typography>
                        </ShadowCard>
                      </Grid>
                      <Grid item xs={3}>
                        <ShadowCard>
                          <Typography fontSize={'2rem'} fontWeight={'600'}>
                            0
                          </Typography>
                          <Typography fontSize={'1rem'}>Likes</Typography>
                        </ShadowCard>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
                <Stack display={'flex'}>
                  <Avatar
                    src={`${artist?.thumbnail && artist?.thumbnail}`}
                    sx={{
                      width: 300,
                      height: 300
                    }}
                  />
                </Stack>
                <S.IconBox>
                  <Wifi />
                  <Facebook />
                  <Instagram />
                  <Forum />
                </S.IconBox>
              </S.Profile>
              <S.BasicInfo>
                <Box paddingY={'1rem'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography fontSize={'1.5rem'} fontWeight={'700'}>
                    Basic Info
                  </Typography>
                  <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                    <S.FeaturedButton>Featured</S.FeaturedButton>
                    <Switch
                      size={'medium'}
                      color={'success'}
                      defaultChecked={artist.isFeatured}
                      onChange={() => executionHandler('isFeatured')}
                    />
                  </Box>
                  {account?.role == 'admin' && (
                    <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                      <S.FeaturedButton>Minting Type</S.FeaturedButton>
                      <Switch
                        size={'medium'}
                        color={'success'}
                        defaultChecked={artist?.deploymentExecution == 'corporate' ? false : true}
                        onChange={() =>
                          executionHandler(artist?.deploymentExecution == 'corporate' ? 'custom' : 'corporate')
                        }
                      />
                    </Box>
                  )}
                </Box>
                <Stack display={'flex'} flexDirection={'column'} gap={'1rem'}>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      1
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Joined</Box>
                      <Box fontWeight={'600'}>{moment(artist?.createdAt).format('MMMM YYYY')}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      2
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Paypal</Box>
                      <Box fontWeight={'600'}>{artist.paypal}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      3
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Ethereum Wallet</Box>
                      <Box fontWeight={'600'}>{artist.ethereumWallet}</Box>
                    </S.BasicInfoItem>
                  </Box>
                  <Box display={'flex'} alignItems={'end'} gap={'0.5rem'}>
                    <Box fontSize={'0.75rem'} fontWeight={'500'}>
                      4
                    </Box>
                    <S.BasicInfoItem>
                      <Box>Casper Wallet</Box>
                      <Box fontWeight={'600'}>{artist.casperWallet}</Box>
                    </S.BasicInfoItem>
                  </Box>
                </Stack>
              </S.BasicInfo>
            </Fragment>
          )
        )}
        <ArtistDetailGalleryPage
          isContractCreated={isContractCreated}
          contractExecuted={contractExecuted}
          artist={artist}
        />
      </Box>
    </>
  );
};
