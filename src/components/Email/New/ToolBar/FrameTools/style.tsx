import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const TransformBox = styled(Box)`
  height: 10.75rem;
  display: flex;
  justify-content: space-between;
  padding-top: 0.25rem;
  padding-bottom: 8px;
`;

export const ScapeBox = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #f2f6fc;
  width: 3rem;
  height: 5.75rem;
  padding: 0.25rem;
  justify-content: space-between;
  border-radius: 8px;
`;

export const SectionTitle = styled(Typography)`
  font-size: 0.8rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  line-height: 1rem;
  && {
    color: #707070;
  }
`;
