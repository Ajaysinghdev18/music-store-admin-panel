import { Box, Modal } from '@mui/material';
import { FC } from 'react';

import { ModalContainer } from './style';

interface IImageViewModal {
  showModal: boolean;
  handleClose: () => void;
  imageArray: [] | any;
}

export const ImageViewModal: FC<IImageViewModal> = ({ handleClose, showModal, imageArray }) => {
  return (
    <Modal open={showModal} onClose={handleClose}>
      <ModalContainer>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
          {imageArray.map((val) => (
            <Box height={500} width={500}>
              <img src={val} height={'100%'} width={'100%'} />
            </Box>
          ))}
        </Box>
      </ModalContainer>
    </Modal>
  );
};
