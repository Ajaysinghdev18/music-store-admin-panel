import { Box, Button } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

export const Description = styled(Box)<{ error: boolean }>`
  && {
    .rdw-editor-toolbar {
      display: none;
    }

    .rdw-editor-main {
      border-width: 1px;
      border-style: solid;
      border-color: ${(props) => (props.error ? props.theme.palette.error.main : props.theme.palette.text.secondary)};
      border-radius: 0.5rem;
      padding: ${(props) => props.theme.spacing(1, 16)};
      min-height: 300px;

      &:focus-within {
        border-width: 2px;
        padding: ${(props) => props.theme.spacing(0, 15)};
        border-color: ${(props) => (props.error ? props.theme.palette.error.main : props.theme.palette.success.main)};
      }
    }
  }
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

export const SaveButton = styled(Button)`
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
