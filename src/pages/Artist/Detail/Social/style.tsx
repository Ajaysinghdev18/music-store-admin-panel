import {  Button, Stack } from '@mui/material';
import styled from 'styled-components';

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


export const StackIcon = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0.125rem;
  border-radius: 50%;
  & svg {
    width: 0.8rem;
    height: 0.8rem;
    line {
      stroke: #2659ed;
    }
  }
`;
export const AddButton = styled(Button)`
  cursor: pointer;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 3rem;
  background-color: #2659ed;
  color: white;
  border-radius: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
    width: fit-content;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: #2659ed;
    color: white;
    border-radius: 2rem;
    border: none;
  }
`;
