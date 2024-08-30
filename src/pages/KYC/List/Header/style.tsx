import { ButtonBase } from '@mui/material';
import styled from 'styled-components';

export const CustomButton = styled(ButtonBase)<{ active }>`
  width: 240px;
  height: 40px;
  font-weight: 500;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? '#D3E3FD' : 'transparent')};
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;
