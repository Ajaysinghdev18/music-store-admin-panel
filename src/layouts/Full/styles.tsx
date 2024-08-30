import { Box } from '@mui/material';
import styled from 'styled-components';

export const FullLayout = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.palette.background.default};
`;
