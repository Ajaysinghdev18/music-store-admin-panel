import { Button, FormControlLabel, RadioGroup } from '@mui/material';
import styled from 'styled-components';

export const Group = styled(RadioGroup)`
  border-radius: 0.5rem;
  padding-top: ${(props) => props.theme.spacing(16)};
  border: 1px solid ${(props) => props.theme.palette.text.secondary};

  &.Mui-error {
    border-color: ${(props) => props.theme.palette.error.main};
  }
`;

export const ControlLabel = styled(FormControlLabel)`
  && {
    padding: 16px 0.75rem;
    border-radius: 5px;
    box-sizing: content-box;
    margin: ${(props) => props.theme.spacing(0)};
    color: ${(props) => props.theme.palette.text.secondary};
    background-color: ${(props) =>
      props.checked ? props.theme.palette.action.active : props.theme.palette.common.white};

    &:hover {
      background: ${(props) => (props.checked ? props.theme.palette.action.active : props.theme.palette.action.hover)};
    }

    .MuiFormControlLabel-label {
      ${(props) => props.theme.typography.body2};
      color: ${(props) => (props.checked ? props.theme.palette.text.primary : props.theme.palette.text.secondary)};
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
