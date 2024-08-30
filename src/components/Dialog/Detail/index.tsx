import { DialogActions, DialogContent, Tooltip } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import * as S from './styles';

interface IDetailDialogProps {
  title: ReactNode;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  headerChild?: ReactNode;
  actions?: ReactNode;
}

export const DetailDialog: FC<IDetailDialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  headerChild,
  ...rest
}) => {
  return (
    <S.Dialog onClose={onClose} open={open} fullWidth scroll="body" {...rest}>
      <S.DialogTitle>
        {typeof title === 'string' ? (
          <Tooltip title={title} placement="bottom" arrow>
            <p>{title.length > 50 ? `${title?.slice(0, 10)}...${title?.slice(-10)}` : title}</p>
          </Tooltip>
        ) : (
          title
        )}
        {onClose ? <S.CloseIconButton onClick={onClose}>x</S.CloseIconButton> : null}
        {headerChild && headerChild}
      </S.DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </S.Dialog>
  );
};
