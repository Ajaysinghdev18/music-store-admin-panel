import { Box, Button, styled } from '@mui/material';

export const BasicInfoItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
  padding: 0.5rem;
  flex-grow: 1;
  font-size: 16px;
`;

export const DeleteButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: #fc5454;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: #fc5454;
    color: white;
    border-radius: 2rem;
    border: none;
  }
`;

export const EditButton = styled(Button)`
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
