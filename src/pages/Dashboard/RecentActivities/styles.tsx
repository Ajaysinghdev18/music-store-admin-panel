import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';

export const Item = styled(Box)`
  display: flex;
  align-items: center;
`;

export const Color = styled.span<{ color: 'success' | 'info' | 'error' | 'warning' }>`
  display: inline;
  color: ${(props) => props.theme.palette[props.color].main};
`;

export const Time = styled(Typography)`
  min-width: 110px;
  max-width: 110px;
  flex: 1;
  white-space: nowrap;
`;

export const Separator = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing(16)};
`;

export const Dot = styled(Box)<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => props.theme.palette[props.color].main};
`;

export const Connector = styled(Box)`
  width: 2px;
  min-height: 20px;
  flex: 1;
  background-color: ${(props) => props.theme.palette.text.disabled};
`;

export const Label = styled(Typography)`
  font-size: 16px;
  line-height: 20px;
`;

export const ViewButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: black;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: black;
    color: white;
    border-radius: 2rem;
    border: none;
  }
`;
