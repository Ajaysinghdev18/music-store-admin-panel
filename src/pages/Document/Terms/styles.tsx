import { Box, Button } from '@mui/material';
import styled from 'styled-components';

export const Header = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(0, 12)};
  border-bottom: 1px solid ${(props) => props.theme.palette.text.disabled};
`;

export const Content = styled(Box)`
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.secondary};
  padding: ${(props) => props.theme.spacing(16, 12, 0)};
`;

export const SaveButton = styled(Button)`
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
