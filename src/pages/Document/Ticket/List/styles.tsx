import { Box } from '@mui/material';
import styled from 'styled-components';

export const TableWrapper = styled(Box)`
  && {
    .MuiTableRow-root {
      .MuiTableCell-root {
        .MuiCheckbox-root {
          svg {
            width: 10.5rem;
            height: 10.5rem;
          }
        }
        .actions {
          display: none;
          margin-left: 16px;
        }
      }
      &:hover,
      &.checked {
        .actions {
          display: flex;
        }
      }
      &.checked {
        &:hover {
          background-color: ${(props) => props.theme.palette.action.active};
        }
        background-color: ${(props) => props.theme.palette.action.active};
        .MuiTableCell-root {
          color: ${(props) => props.theme.palette.common.black};
          svg {
            color: ${(props) => props.theme.palette.common.black};
          }
        }
      }
      td {
        &:last-child {
          width: 300px;
        }
        &:first-child {
          width: 20px;
        }
        &:nth-child(2) {
          width: 20px;
        }
      }
    }
  }
`;

export const DateColumn = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
