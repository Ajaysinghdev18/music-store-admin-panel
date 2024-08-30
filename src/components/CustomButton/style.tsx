import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
  height: 2.5rem;
  &:hover {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      path {
        fill: #02c58d;
      }
    }
  }
`;
