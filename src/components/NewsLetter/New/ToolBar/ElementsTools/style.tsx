import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const ShapeBox = styled(Box)<{ active?: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  border: 0.0675rem solid ${(props) => (props.active === 'active' ? '#02C58D' : 'transparent')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  //&& {
  &:hover {
    background-color: #c1d5f7;
  }
  //}
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
