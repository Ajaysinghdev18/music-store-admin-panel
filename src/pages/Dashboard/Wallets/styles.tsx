import { Box } from '@mui/material';
import styled from 'styled-components';

export const Chart = styled(Box)`
  display: flex;
  align-items: flex-end;
`;

export const Item = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-left: ${(props) => props.theme.spacing(12)};
  }
`;

export const ColorBox = styled(Box)<{ color: string }>`
  width: 50px;
  height: 25px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.palette[props.color].main};
`;

export const WalletChart = styled(Box)`
  flex: 1;
  transform: rotate(180deg);
`;
