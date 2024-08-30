import { Box } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 8px 1.5rem 8px;
  height: 100vh;
`;

export const Body = styled(Box)`
  display: flex;
  flex-grow: 1;
  height: 0;
`;
