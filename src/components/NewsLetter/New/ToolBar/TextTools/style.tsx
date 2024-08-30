import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const TextToolBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0 8px 0;
  justify-content: space-between;
  height: 13.75rem;
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
