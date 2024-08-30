import { Box, Card as MuiCard, Pagination as MuiPagination } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled(MuiCard)<{ padding?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.padding ? props.theme.spacing(44) : 0)};
`;

export const ArtistList = styled(Box)`
  width: 100%;
  height: 240px;
  background: ${(props) => props.theme.palette.background.default};
  border: 1px solid ${(props) => props.theme.palette.text.disabled};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing(26, 0)};
`;

export const Pagination = styled(MuiPagination)`
  && {
    margin-top: ${(props) => props.theme.spacing(36)};
    background-color: ${(props) => props.theme.palette.action.hover};
    border-radius: 0.5rem;
    padding: ${(props) => props.theme.spacing(4, 0)};

    li {
      &:first-child {
        border-right: 1px solid ${(props) => props.theme.palette.action.active};
      }

      &:last-child {
        border-left: 1px solid ${(props) => props.theme.palette.action.active};
      }
    }

    .MuiPaginationItem-root {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      ${(props) => props.theme.typography.button};
      margin: ${(props) => props.theme.spacing(0, 4)};
      color: ${(props) => props.theme.palette.text.secondary};

      &.Mui-selected {
        color: ${(props) => props.theme.palette.text.primary};
        background-color: ${(props) => props.theme.palette.action.active};
      }

      &:hover {
        color: ${(props) => props.theme.palette.text.primary};
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
