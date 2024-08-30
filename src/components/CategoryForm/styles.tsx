import { Box, styled } from '@mui/material';
import { Dialog } from '@mui/material';

export const DialogForm = styled(Dialog)`
  padding: 1rem 3rem;
  & .MuiBackdrop-root {
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0.5);
  }
  & .MuiPaper-root {
    border-radius: 1.5rem;
    padding: 0 2rem;
    max-width: 31.25rem;
    & .MuiDialogActions-root {
      justify-content: center !important;
      padding-bottom: 1rem;
    }
    & .MuiFormControlLabel-root {
      padding-left: 1rem;
      & span {
        font-size: 1rem;
      }
    }
  }
`;

export const CloseButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  background-color: black;
  border-radius: 0.25rem;
  color: white;
`;
