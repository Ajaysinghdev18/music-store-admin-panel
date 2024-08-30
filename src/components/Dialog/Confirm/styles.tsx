import { Button } from '@mui/material';
import styled from 'styled-components';

export const SaveButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: black;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 0.875rem;
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
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: transparent;
  border: 0.0675rem solid black;
  color: black;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: transparent;
    border: 0.0675rem solid black;
    color: black;
    border-radius: 2rem;
  }
`;
