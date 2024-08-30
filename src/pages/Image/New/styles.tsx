import { Button, Select, TextField, styled } from '@mui/material';
import Dropzone from 'react-dropzone';

export const StyledTextField = styled(TextField)`
  && {
    border: none;
  }
`;

export const StyledSelect = styled(Select)`
  &.MuiInputBase-root {
    background-color: white;
    border-radius: 2rem;
    height: 2.5rem;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
    border-radius: 2rem;
    box-shadow: 0 7px 14px 2px rgba(100, 100, 100, 0.3) !important;
  }

  & .MuiSelect-icon {
    background-color: black;
    width: 1rem;
    height: 1rem;
    padding: 0.2rem;
    border-radius: 50%;
    color: white;
    & g {
      width: 0.5rem;
      height: 0.5rem;
    }
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
