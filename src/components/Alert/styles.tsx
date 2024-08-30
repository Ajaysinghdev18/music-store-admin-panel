import { Box } from '@mui/material';
import styled from 'styled-components';

export const Alert = styled(Box)`
  width: 29rem;
  height: 4.9rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.1875rem 0.4rem rgba(0, 0, 0, 0.16);
  margin-bottom: 0.5rem;
  background: ${(props) => props.theme.palette.common.white};
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(8, 16)};
`;

export const Circle = styled(Box)<{ bColor: string }>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;

  background: ${(props) => props.bColor + '19'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
