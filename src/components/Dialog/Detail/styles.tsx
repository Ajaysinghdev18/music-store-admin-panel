// Dependencies
import {
  IconButton,
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle
} from '@mui/material';
import styled from 'styled-components';

// Export styled components
export const Dialog = styled(MuiDialog)`
  &.MuiModal-root {
    padding: 0;
    border-radius: 8px;
    .MuiDialog-container {
      > .MuiPaper-root {
        ${(props) => props.theme.breakpoints.down('sm')} {
          margin: 2.75rem 0 0;
          width: 100%;
          vertical-align: bottom;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }

    .MuiDialog-paper {
      //min-width: 71.75rem;
    }

    .MuiDialogContent-root {
      padding: 8px;
    }

    .MuiDialogActions-root {
      padding: 8px;
    }
  }
`;

export const DialogTitle = styled(MuiDialogTitle)`
  && {
    margin: 0;
    padding: 0.3125rem 1.25rem !important;
    border-bottom: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
    display: flex;
    align-items: center;
    .MuiTypography-h2 {
      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 1.25rem;
      }
    }
  }
`;

export const CloseIconButton = styled(IconButton)`
  margin-left: auto;
  color: ${(props) => props.theme.palette.text.primary};

  ${(props) => props.theme.breakpoints.down('sm')} {
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const DialogContent = styled(MuiDialogContent)`
  padding: 1.25rem !important;
`;

export const DialogActions = styled(MuiDialogActions)`
  padding: 0 1.25rem 1.25rem 1.25rem !important;
`;
