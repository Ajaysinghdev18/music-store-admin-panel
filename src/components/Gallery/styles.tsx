import { Box, Card as MuiCard, Pagination as MuiPagination } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-right: 1rem;
`;

export const Card = styled(MuiCard)<{ padding?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.padding ? props.theme.spacing(44) : 0)};
`;

export const ArtistList = styled(Box)`
  border-radius: 1.25rem;
  box-shadow: 0 0.4375rem 0.875rem 0.125rem rgba(100, 100, 100, 0.3) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing(48, 12)};
`;

export const Pagination = styled(MuiPagination)`
  && {
    margin-top: ${(props) => props.theme.spacing(36)};
    background-color: ${(props) => props.theme.palette.action.hover};
    border-radius: 8px;
    padding: ${(props) => props.theme.spacing(4, 0)};

    .MuiPaginationItem-root {
      width: 40px;
      height: 40px;
      border-radius: 0.25rem;
      ${(props) => props.theme.typography.button};
      margin: ${(props) => props.theme.spacing(0, 4)};
      color: ${(props) => props.theme.palette.text.black};

      &.Mui-selected {
        color: ${(props) => props.theme.palette.text.primary};
        background-color: ${(props) => props.theme.palette.action.active};
      }

      &:hover {
        color: ${(props) => props.theme.palette.text.primary};
      }
    }

    .MuiPaginationItem-previousNext {
      color: ${(props) => props.theme.palette.action.black};

      svg {
        color: ${(props) => props.theme.palette.black};
      }
    }
  }
`;
