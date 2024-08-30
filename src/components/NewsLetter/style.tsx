import { Box, Card as MuiCard, Pagination as MuiPagination, Typography } from '@mui/material';
import styled from 'styled-components';

export const Template = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 0.0675rem solid #e1e1e1;
  border-radius: 8px;
`;

export const TemplateHeader = styled(Box)`
  height: 4.5rem;
  width: 100%;
  display: flex;
  padding: 0.75rem 0.25rem 0.875rem 1rem;
  justify-content: space-between;
  position: relative;
  align-items: center;
`;

export const TemplateBody = styled(Box)`
  height: 188px;
  width: 100%;
  background-color: gray;
`;

export const TemplateFooter = styled(Box)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const TemplateActions = styled(Box)`
  display: flex;
  margin-left: auto;
`;

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  //height: 100vh;
  align-items: center;
`;

export const Card = styled(MuiCard)`
  width: 100%;
  padding: 1.5rem;
  align-items: center;
`;

export const Pagination = styled(MuiPagination)`
  && {
    margin-top: ${(props) => props.theme.spacing(36)};
    background-color: ${(props) => props.theme.palette.action.hover};
    border-radius: 50%;
    padding: ${(props) => props.theme.spacing(4, 0)};

    li {
      &:first-child {
        border-right: 0.0675rem solid ${(props) => props.theme.palette.action.active};
      }

      &:last-child {
        border-left: 0.0675rem solid ${(props) => props.theme.palette.action.active};
      }
    }

    .MuiPaginationItem-root {
      width: 40px;
      height: 40px;
      border-radius: 0.25rem;
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

export const SectionTitle = styled(Typography)``;

export const SectionBody = styled(Typography)`
  font-size: 0.8rem;
`;
