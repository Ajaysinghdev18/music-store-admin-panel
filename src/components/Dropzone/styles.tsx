import { Box } from '@mui/material';
import styled from 'styled-components';

export const Dropzone = styled(Box)<{ active: boolean; disabled?: boolean }>`
  && {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0.0675rem 0.4375rem 0.75rem 0.125rem rgba(100, 100, 100, 0.3) !important;
    border-radius: 1.5rem;
    background-color: white;
    padding: ${(props) => props.theme.spacing(0)};
    min-height: 16.625rem;
    padding: ${(props) => props.theme.spacing(props.active ? 0 : 1)};
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: transparent;
    }

    img {
      border-radius: 8px;
    }

    .MuiTypography-root {
      color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.26)' : '#707070')};
    }
  }
`;
