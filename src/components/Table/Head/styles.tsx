import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import styled from 'styled-components';

export const Head = styled(TableHead)`
  margin-bottom: ${(props) => props.theme.spacing(8)};
  box-shadow: 0 0.4375rem 0.875rem 0.125rem rgba(100, 100, 100, 0.3) !important;
  border-radius: 2rem;
`;

export const Row = styled(TableRow)``;

export const Cell = styled(TableCell)`
  ${(props) => props.theme.typography.overline};
  color: black;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  padding: ${(props) => props.theme.spacing(16, 24)};
  .MuiCheckbox-root {
    opacity: 1;
    color: ${(props) => props.theme.palette.text.disabled};
  }
`;

export const SortLabel = styled(TableSortLabel)`
  && {
    font-size: 0.75rem;
    font-weight: 600;
    color: black;

    .MuiTableSortLabel-icon {
      opacity: 1;
    }

    .MuiTableSortLabel-icon {
      opacity: 1;
      width: 0.625rem;
      height: 0.3125rem;
    }
    flex-direction: row;
  }
`;
