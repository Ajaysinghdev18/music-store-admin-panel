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

export const SectionTitle = styled(Typography)``;

export const SectionBody = styled(Typography)`
  font-size: 0.8rem;
`;
