import { Box, Button, Card, CardHeader, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { WalletApi } from '../../../../apis';
import {
  GalleryIcon,
  GalleryOutlinedIcon,
  PlusIcon,
  SatisIcon,
  SatisOutLinedIcon,
  TokenIcon,
  TokenOutlinedIcon
} from '../../../../assets/icons';
import { RoundedButton } from '../../../../components';
import { COLORS } from '../../../../constants/colors';
import { IArtist } from '../../../../shared/types';
import { IWallet } from '../../../../shared/types/wallet.type';
import { CreateContractDialog } from '../SmartContract/Create';
import { ArtistDetailGalleryListPage } from './List';

// import { EditContractDialog } from '../SmartContract/Edit';

interface IArtistDetailGalleryProps {
  contractExecuted: () => void;
  isContractCreated: boolean | undefined;
  artist: IArtist | undefined;
}

export const ArtistDetailGalleryPage: FC<IArtistDetailGalleryProps> = ({
  contractExecuted,
  isContractCreated,
  artist
}) => {
  // Mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchParams, setSearchParams] = useSearchParams();
  const tabType = searchParams.get('type');
  const [profileTabs, setProfileTabs] = useState([
    {
      label: 'NFTs',
      status: 'PROFILE_NFTS',
      icon: {
        default: <TokenOutlinedIcon />,
        active: <TokenIcon />
      }
    },
    {
      label: 'Galleries',
      status: 'PROFILE_GALLERY',
      icon: {
        default: <GalleryIcon />,
        active: <GalleryOutlinedIcon />
      }
    },
    {
      label: 'Smart Contracts',
      status: 'Smart_Contracts',
      icon: {
        default: <SatisIcon />,
        active: <SatisOutLinedIcon />
      }
    }, {
      label: 'Subscriber',
      status: 'Subscriber',
      icon: {
        default: <SatisIcon />,
        active: <SatisOutLinedIcon />
      }
    },
    {
      label: 'Social',
      status: 'Social',
      icon: {
        default: <SatisIcon />,
        active: <SatisOutLinedIcon />
      }
    }
  ]);
  const [profileState, setProfileStatus] = useState('PROFILE_NFTS');
  const [showContractModal, setShowContractModal] = useState<boolean>(false);
  const [wallets, setWallets] = useState<IWallet[]>([]);
  const [showEditContractModal, setShowEditContractModal] = useState<boolean>(false);
  const [editingContractId, setEditingContractId] = useState<string>('');

  // Get navigate from hook
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  // Modifying query parameters
  const updateQueryParam = (paramName: string, paramValue: string) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set(paramName, paramValue);
      return newSearchParams;
    });
    setProfileStatus(paramValue);
  };
  // handle routing
  const handleNew = () => {
    if (profileState == 'Smart_Contracts') {
      setShowContractModal(true);
    }
    if (profileState == 'PROFILE_GALLERY') {
      navigate(`/artists/${id}/gallery/new`);
    }
    if (profileState == 'PROFILE_NFTS') {
      navigate(`/songs/new?artistId=${id}`);
    }
  };

  const handleClickOpen = () => {
    setShowContractModal(true);
  };

  const handleClose = () => {
    setShowContractModal(false);
  };

  // Fetch wallets
  const fetchWallets = useCallback(() => {
    WalletApi.readAll({
      query: {
        artistId: id
      }
    })
      .then((res) => {
        setWallets(res.wallets);
        if (res.wallets.length > 0) {
          setProfileTabs([
            ...profileTabs,
            {
              label: 'Wallets',
              status: 'Wallets',
              icon: {
                default: <SatisIcon />,
                active: <SatisOutLinedIcon />
              }
            }
          ]);
        }
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:187 ~ fetchWallets ~ err:', err);
      });
  }, [id]);


  useEffect(() => {
    if (id && artist?.deploymentExecution == 'custom') {
      fetchWallets();
    } else if (id && artist?.deploymentExecution == 'corporate') {
      setProfileTabs(profileTabs.filter((tab) => tab.label !== 'Wallets'));
      setWallets([]);
    }
    if (!tabType) {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        newSearchParams.set('type', 'PROFILE_NFTS');
        return newSearchParams;
      });
    }
  }, [id, artist, tabType]);

  useEffect(() => {
    if (tabType) {
      setProfileStatus(tabType as string);
    }
  }, [tabType]);

  return (
    <Box marginTop={'2rem'}>
      <Box display={'flex'} gap={'0.5rem'}>
        {profileTabs.map((item, index) => (
          <RoundedButton
            key={index}
            label={isMobile ? '' : item.label}
            outline={item.status !== profileState}
            onClick={() => updateQueryParam('type', item.status)}
            background={COLORS.BLUE}
          />
        ))}
      </Box>
      <ArtistDetailGalleryListPage
        artist={artist}
        isContractCreated={isContractCreated}
        galleryState={profileState}
        setShowEditContractModal={setShowEditContractModal}
        setEditingContractId={setEditingContractId}
        setShowContractModal={setShowContractModal}
        wallets={wallets}
      />
      {showContractModal && (
        <CreateContractDialog
          showContractModal={showContractModal}
          contractExecuted={contractExecuted}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      )}
      {/* {showEditContractModal && (
        <EditContractDialog
          showContractModal={showEditContractModal}
          contractExecuted={contractExecuted}
          handleClickOpen={() => setShowEditContractModal(true)}
          handleClose={() => setShowEditContractModal(false)}
          editingContractId={editingContractId}
        />
      )} */}
    </Box>
  );
};
