import { Box, Button } from '@mui/material';
import styled from 'styled-components';

export const Header = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(5, 6)};
  border-bottom: 1px solid ${(props) => props.theme.palette.text.disabled};
`;

export const DetailList = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: ${(props) => props.theme.spacing(12, 0)};
`;

export const Content = styled(Box)`
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.secondary};
  padding: ${(props) => props.theme.spacing(5, 6)};
`;

export const PublishButton = styled(Button)`
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

export const BasicInfoItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
  padding: 0.5rem;
  flex-grow: 1;
  font-size: 16px;
`;
