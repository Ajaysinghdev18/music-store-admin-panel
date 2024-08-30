import { Box, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { WalletApi } from '../../../../../apis';
import { IWallet } from '../../../../../shared/types/wallet.type';
import { getAccount } from '../../../../../store/selectors';
import { NftListPage } from '../../../../Nft';
import { DownloadKey } from '../../../../User/Detail/styles';
import { ArtistListPage } from '../../../List';
import { SmartContractListPage } from '../../SmartContract/List';
import { GalleryListPage } from '../galleryList';
import { SubscribedUserList } from '../../Subscribers';
import { IArtist } from '../../../../../shared/types';
import { SocialSection } from '../../Social';

export const ListContent = styled(Box)`
  padding-top: ${(props) => props.theme.spacing(34)};
`;

interface IGalleryListProps {
  galleryState: string;
  artist?: IArtist | undefined;
  isContractCreated?: boolean | undefined;
  setShowEditContractModal: (boolean) => void;
  setEditingContractId: (string) => void;
  setShowContractModal: (boolean) => void;
  wallets?: IWallet[];
}

export const ArtistDetailGalleryListPage: FC<IGalleryListProps> = ({
  galleryState,
  isContractCreated,
  setShowEditContractModal,
  setEditingContractId,
  wallets,
  setShowContractModal,
  artist
}: IGalleryListProps) => {
  const user = useSelector(getAccount);

  const downloadKey = (wallet: IWallet) => {
    if (wallet?._id) {
      WalletApi.downloadPrivateKey(wallet?._id as string, wallet?.chain)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${wallet.name}.pem`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          console.log('🚀 ~ file: index.tsx:179 ~ useEffect ~ err:', err);
        });
    }
  };

  return (
    <ListContent>
      {galleryState === 'PROFILE_NFTS' ? (
        <NftListPage title='NFT Tokens' />
      ) : galleryState === 'PROFILE_GALLERY' ? (
        <GalleryListPage />
      ) : galleryState === 'Artist_Home' ? (
        <ArtistListPage title="" />
      ) : galleryState == 'Smart_Contracts' ? (
        <SmartContractListPage
          setShowContractModal={setShowContractModal}
          isContractCreated={isContractCreated}
          setShowEditContractModal={setShowEditContractModal}
          setEditingContractId={setEditingContractId}
        />
      ) : galleryState == 'Subscriber' ? 
      <SubscribedUserList artist={artist}/>
        :  galleryState == 'Social' ? 
         <SocialSection/>: (
          wallets &&
          wallets.length > 0 &&
          user?.role == 'admin' && (
            <Table>
              <TableRow>
                <TableCell> Name</TableCell>
                <TableCell>Chain</TableCell>
                <TableCell>Public Address</TableCell>
                <TableCell>Private Key</TableCell>
              </TableRow>
              <TableBody>
                {wallets.map((wallet, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{wallet?.name}</TableCell>
                      <TableCell>{wallet?.chain}</TableCell>
                      <TableCell>{wallet?.address}</TableCell>
                      <TableCell>
                        {' '}
                        <DownloadKey onClick={() => downloadKey(wallet)}>download</DownloadKey>{' '}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )
        )}
    </ListContent>
  );
};
