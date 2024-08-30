// Dependencies
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';

import * as S from './styles';

// Types
interface IConfirmDialogProps {
  description?: string;
  confirmButtonText?: string;
  noButtonText?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onConfirmed?: () => void;
  title?: string;
}

// Export delete-confirm-dialog component
export const ConfirmDialog: FC<IConfirmDialogProps> = ({
  description = 'Are you sure?',
  confirmButtonText = 'Yes',
  noButtonText = 'No',
  visible,
  setVisible,
  onConfirmed,
  title
}) => {
  // Close handler
  const handleClose = () => {
    setVisible(false);
  };

  // Confirm handler
  const handleConfirm = () => {
    setVisible(false);
    onConfirmed && onConfirmed();
  };

  // Return delete-confirm-dialog component
  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 300
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions sx={{ marginX: 'auto' }}>
        <S.CancelButton onClick={handleClose}>{noButtonText}</S.CancelButton>
        <S.SaveButton onClick={handleConfirm} autoFocus color="error">
          {confirmButtonText}
        </S.SaveButton>
      </DialogActions>
    </Dialog>
  );
};
