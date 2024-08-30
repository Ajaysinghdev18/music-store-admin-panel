import { Box } from '@mui/material';
import styled from 'styled-components';

export const Map = styled(Box)`
  height: 450px;
  width: 100%;
  background-color: ${(props) => props.theme.palette.text.disabled};
`;

export const ColorBox = styled(Box)<{ color: string }>`
  width: 50px;
  height: 25px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.palette[props.color].main};
`;
