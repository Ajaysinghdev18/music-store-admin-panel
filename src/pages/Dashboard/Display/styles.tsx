import { Box, Stack } from '@mui/material';
import styled from 'styled-components';

export const Footer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing(4)};
`;

export const Progress = styled(Stack)`
  flex: 1;
  margin-right: ${(props) => props.theme.spacing(89)};
`;

export const IconBox = styled(Box)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: rgb(22, 23, 25);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
