import { FormControlLabel } from '@mui/material';
import styled from 'styled-components';

export const SwitchField = styled(FormControlLabel)`
  && {
    justify-content: space-between;
    height: 2.5rem;
    padding: ${(props) => props.theme.spacing(11, 16)};
    margin: ${(props) => props.theme.spacing(0)};
    color: ${(props) => props.theme.palette.text.secondary};
    box-shadow: 0 0.4375rem 0.875rem 0.125rem rgba(100, 100, 100, 0.3) !important;
    border-radius: 2rem;
    font-size: 0.875rem;
    background-color: white;

    &.Mui-disabled {
      border-color: rgba(0, 0, 0, 0.26);
    }

    & .MuiTypography-root {
      font-size: 0.875rem;
    }
  }
`;
