import { Box } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  height: 100vh;
`;

export const Row = styled(Box)<{ height?: string }>`
  && {
    height: ${(props) => (props.height ? props.height : 'auto')};
    display: flex;
  }
`;

export const Col = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 0;
  height: 100%;
`;
