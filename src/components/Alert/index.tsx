// Dependencies
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';

import {
  AlertErrorIcon,
  AlertInfoIcon,
  AlertSuccessIcon,
  AlertWarningIcon,
  ArrowRightIcon,
  CloseAlertIcon
} from '../../assets/icons';
import * as S from './styles';

export enum ALERT_TYPES {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING'
}

export enum ALERT_CATEGORY {
  SONG = 'SONG',
  EVENT = 'EVENT',
  ARTIST = 'ARTIST'
}

export interface IAlert {
  type: ALERT_TYPES;
  category?: ALERT_CATEGORY;
  title?: string;
  content?: string;
  alertActionTitle?: string;
  alertAction?: () => void;
  onClose?: () => void;
}

export const Alert: FC<IAlert> = ({ type, title, content, alertActionTitle, alertAction, onClose }) => {
  const theme = useTheme();
  const color = useMemo(() => {
    switch (type) {
      case ALERT_TYPES.INFO:
        return theme.palette.info.main;
      case ALERT_TYPES.ERROR:
        return theme.palette.error.main;
      case ALERT_TYPES.SUCCESS:
        return theme.palette.success.main;
      case ALERT_TYPES.WARNING:
        return theme.palette.warning.main;
      default:
        break;
    }
    return theme.palette.success.main;
  }, [type]);

  const icon = useMemo(() => {
    switch (type) {
      case ALERT_TYPES.INFO:
        return <AlertInfoIcon />;
      case ALERT_TYPES.ERROR:
        return <AlertErrorIcon />;
      case ALERT_TYPES.SUCCESS:
        return <AlertSuccessIcon />;
      case ALERT_TYPES.WARNING:
        return <AlertWarningIcon />;
      default:
        break;
    }
    return 'success.main';
  }, [type]);

  const handleAlertAction = () => {
    if (alertAction) alertAction();
  };

  const handleAlertClose = () => {
    if (onClose) onClose();
  };

  return (
    <S.Alert>
      <S.Circle bColor={color}>{icon}</S.Circle>
      <Box display="flex" flexDirection="column" justifyContent="space-between" ml={16}>
        <Typography variant="body2" color={color}>
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Box display="flex" color={color} alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleAlertAction}>
          <Typography mr={24} variant="body2">
            {alertActionTitle}
          </Typography>
          {alertActionTitle && <ArrowRightIcon />}
        </Box>
      </Box>
      <IconButton onClick={handleAlertClose} sx={{ ml: 'auto' }}>
        <CloseAlertIcon />
      </IconButton>
    </S.Alert>
  );
};
