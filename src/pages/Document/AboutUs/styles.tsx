import { Box, Button, Card, Typography } from '@mui/material';
import styled from 'styled-components';

export const CardTitle = styled(Box)`
  border-bottom: 1px solid ${(props) => props.theme.palette.text.disabled};
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;

  button {
    display: none;
  }
`;

export const CardView = styled(Card)`
  min-height: 320px;
  border: 1px solid transparent;

  button {
    display: none;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.palette.text.secondary};

    button {
      color: ${(props) => props.theme.palette.text.secondary};
      display: block;
    }
  }
`;

export const Title = styled(Typography)`
  outline: none;
`;

export const CardAction = styled(Box)`
  display: flex;
`;

export const Description = styled(Typography)`
  outline: none;
`;

export const AddButton = styled(Button)`
  && {
    color: ${(props) => props.theme.palette.text.disabled};
    width: 100%;
    margin-top: 10px;

    &:hover {
      background: ${(props) => props.theme.palette.common.white};
    }
  }
`;

export const ColAddButton = styled(Button)`
  && {
    color: ${(props) => props.theme.palette.text.disabled};
    min-width: 40px;
    height: 100%;
    padding: 0;

    &:hover {
      background: #ffffff;
    }

    span {
      margin: 0;
    }
  }
`;

export const NewSectionButton = styled(Button)`
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1rem;
  padding: 0.5rem 3rem;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 3rem;
    background-color: transparent;
    border: 1px solid black;
    color: black;
    border-radius: 2rem;
  }
`;
