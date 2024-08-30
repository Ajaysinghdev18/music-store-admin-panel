import { Box, Button,  Pagination as MuiPagination,  Card as MuiCard, TableHead, Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled(MuiCard)<{ padding?: boolean }>`
  width: 100%;
  padding: 24px;
`;

export const ToolBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
  > button {
    padding: 0 10px;
    height: 24px;
    font-weight: 500;
    > span {
      padding-right: 3px;
      svg {
        width: 10.5rem;
        height: 10.5rem;
      }
    }
  }
`;

export const KYCDataGroup = styled(Box)`
  border-bottom: 1px solid #e1e1e1;
`;

export const SectionTitle = styled(Typography)`
  font-size: 24px;
  color: #707070;
  margin: 24px 0 70px 0;
`;

export const SectionFiled = styled(Typography)`
  font-size: 20px;
  width: 376px;
  color: #707070;
`;

export const SectionRow = styled(Box)`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 13px;
  margin-top: 16px;
`;

export const SectionBody = styled(Typography)`
  font-size: 20px;
  line-height: 27px;
  color: #707070;
`;

export const SectionAction = styled(Box)`
  border-left: 1px solid #d3e3fd;
  padding-left: 0.5rem;
  margin-left: 27px;
`;

export const SectionButton = styled('button')<{ status?: string }>`
  border: none;
  height: 2rem;
  color: ${(props) => (props.status ? 'white' : '#30419B')};
  border-radius: 0.5rem;
  // padding: 0 5px 0 21px;
  font-size: 16px;
  font-family: Poppins;
  cursor: pointer;
  margin-right: 0.5rem;
  background: ${(props) =>
    (props.status === 'under-verification' && props.theme.palette.warning.main) ||
    (props.status === 'verified' && props.theme.palette.success.main) ||
    (props.status === 'rejected' && props.theme.palette.error.main) ||
    '#EAEBF5'};
`;

export const Row = styled(Box)`
  display: flex;
  align-items: center;
`;

export const SectionHead = styled(Typography)`
  font-size: 0.75rem;
  color: #707070;
`;

export const TableHeader = styled(TableHead)`
  border-bottom: 1px solid ${(props) => props.theme.palette.text.disabled};
`;

export const StatusBox = styled(Box)<{ status }>`
  width: fit-content;
  color: white;
  background-color: ${(props) => (props.status === 'approved' ? '#02c58d' : '#FC5454')};
  padding: 5px 10px;
  border-radius: 4px;
  margin-left: auto;
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