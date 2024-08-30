import {
  Box,
  Card as MuiCard,
  Pagination as MuiPagination,
  Table as MuiTable,
  TableCell,
  TableRow,
  darken
} from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 1rem;
`;

export const Card = styled(Box)<{ padding?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.padding ? '1.25rem 1.5rem' : 0)};
`;

export const Table = styled(MuiTable)``;

export const Cell = styled(TableCell)`
  && {
    height: 3.5rem;
    color: black;
    border-bottom: 0.0675rem solid lightgray;
    text-align: center;
    font-size: 0.8rem;
    padding: ${(props) => props.theme.spacing(16, 8, 8, 8)};
    ${(props) => props.theme.typography.body2};

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .MuiIconButton-root {
      &:hover {
        background-color: ${(props) => darken(props.theme.palette.action.hover, 0.02)};
      }

      svg {
        color: ${(props) => props.theme.palette.text.secondary};
      }
    }
    flex-direction: row;
  }
`;

export const Row = styled(TableRow)`
  && {
    border-radius: 8px;
    color: black;
    padding: 1rem;
  }
`;

export const Pagination = styled(MuiPagination)`
  && {
    margin-top: ${(props) => props.theme.spacing(36)};
    background-color: ${(props) => props.theme.palette.action.hover};
    border-radius: 50%;
    padding: ${(props) => props.theme.spacing(4, 0)};

    .MuiPaginationItem-root {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      ${(props) => props.theme.typography.button};
      margin: ${(props) => props.theme.spacing(0, 4)};
      color: ${(props) => props.theme.palette.text.secondary};

      &.Mui-selected {
        color: white;
        background-color: #2659ed;
      }
    }

    .MuiPaginationItem-previousNext {
      color: ${(props) => props.theme.palette.action.active};

      svg {
        color: ${(props) => props.theme.palette.success.main};
      }
    }
  }
`;
