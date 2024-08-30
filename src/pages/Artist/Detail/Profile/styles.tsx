import { Box, Card } from '@mui/material';
import styled from 'styled-components';

export const ProfileList = styled(Box)`
  padding: ${(props) => props.theme.spacing(16, 0)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled(Card)`
  display: flex;
  padding: 0;
  justify-content: space-between;
  align-items: center;
`;
