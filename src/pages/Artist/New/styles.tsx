import { Box, Button, styled } from '@mui/material';

export const ShowMoreBox = styled(Box)`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  padding-top: 1rem;
  && svg {
    width: 1rem;
    height: 1rem;
  }
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

export const PreviewButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: #2659ed;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: #2659ed;
    color: white;
    border-radius: 2rem;
    border: none;
  }
`;
