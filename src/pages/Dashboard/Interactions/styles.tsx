import { Box } from '@mui/material';
import styled from 'styled-components';

export const Chart = styled(Box)`
  width: 100%;
  height: 210px;
  margin-top: 0.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Item = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-left: ${(props) => props.theme.spacing(12)};
  }
`;

export const Bar = styled(Box)<{ percent: number }>`
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.palette.success.main};
  height: ${(props) => props.percent * 156}px;
  margin: ${(props) => props.theme.spacing(2, 0, 12)};
`;
