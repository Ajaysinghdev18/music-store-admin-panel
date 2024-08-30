import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';

export const PreviewHeader = styled(Box)`
  display: flex;
  align-items: center;
`;

export const PreviewContentItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: ${(props) => props.theme.spacing(12, 12)};
  img {
    width: 100%;
    height: 240px;
  }
`;

export const PreviewContent = styled(Box)`
  padding: ${(props) => props.theme.spacing(6, 6)};
`;

export const PreviewContentContext = styled(Box)`
  padding: ${(props) => props.theme.spacing(6, 6)};
`;

export const ArticleName = styled(Typography)`
  max-width: 400px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  padding: 0 !important;
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

export const CancelButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: transparent;
    border: 1px solid black;
    color: black;
    border-radius: 2rem;
  }
`;
