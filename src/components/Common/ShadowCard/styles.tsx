import { Box, styled } from '@mui/material';

export const Container = styled(Box)`
  border-radius: 1.25rem;
  box-shadow: 0 0.475rem 0.9rem 0.125rem rgba(100, 100, 100, 0.3) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: ${(props) => props.theme.spacing(32)};
`;
