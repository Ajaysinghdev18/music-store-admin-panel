import { Box } from '@mui/material';
import styled from 'styled-components';

export const Chart = styled(Box)`
  height: 400px;
  .MuiCardHeader-content {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;
