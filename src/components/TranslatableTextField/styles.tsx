import { TextField } from '@mui/material';
import styled from 'styled-components';

export const TranslatableTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      align-items: baseline;
      background-color: white;
      border-radius: 2rem;
      & textarea {
        height: auto !important;
      }
    }
    & label {
      display: none;
    }
    & fieldset {
      border: none;
      box-shadow: 0 0.4375rem 0.875rem 0.125rem rgba(100, 100, 100, 0.3) !important;
      border-radius: 2rem;
    }
  }
`;
