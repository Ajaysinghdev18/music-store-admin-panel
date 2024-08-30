import { Box, Button, Stack } from '@mui/material';
import styled from 'styled-components';

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing(29)};
`;

export const Circle = styled(Box)`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.palette.text.secondary};
  margin-right: ${(props) => props.theme.spacing(12)};
`;

export const Category = styled(Box)<{ active: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 56px;
  margin-left: ${(props) => props.theme.spacing(-8)};
  padding-left: ${(props) => props.theme.spacing(8)};
  width: calc(100% + 16px);
  border-radius: 0.5rem;
  background-color: ${(props) => (props.active ? props.theme.palette.action.active : 'transparent')};

  ${Circle} {
    background-color: ${(props) => (props.active ? props.theme.palette.text.primary : 'transparent')};
  }
`;

export const Question = styled(Box)`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: ${(props) => props.theme.spacing(12)};
  }
`;

export const Actions = styled(Stack)`
  margin-left: auto;
  align-items: center;
`;

export const PreviewHeader = styled(Box)`
  display: flex;
  align-items: center;
`;

export const PreviewContentItem = styled(Box)`
  display: flex;
  align-items: flex-end;
  padding: ${(props) => props.theme.spacing(12, 12)};
`;

export const NewQuestionButton = styled(Button)`
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

export const NewCategoryButton = styled(Button)`
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
