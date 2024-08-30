import { Box, Button, Card, Typography } from '@mui/material';
import styled from 'styled-components';

import TableToolbar from '../../components/Gallery/Toolbar';

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

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px;
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

export const Keys = styled(Box)`
  padding: ${(props) => props.theme.spacing(16, 0)};
  display: flex;
  justify-content: space-between;
  align-items: center;
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
