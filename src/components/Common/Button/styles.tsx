import { Button, styled } from '@mui/material';

import { COLORS } from '../../../constants/colors';

export const RoundedButton = styled(Button)<{ background?: string; textColor?: string; widthSize?: string }>`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  width: ${(props) => props.widthSize || 'fit-content'};
  text-align: center;
  background-color: ${(props) => props.background || COLORS.BLUELIGHT};
  color: ${(props) => props.textColor || 'white'};
  border-radius: 2rem;
  border: none;
  padding: 0.5rem 2rem;
  &:hover {
    background-color: ${(props) => props.background || COLORS.BLUELIGHT};
    color: ${(props) => props.textColor || 'white'};
  }
`;

export const OutlineRoundedButton = styled(Button)<{ background?: string }>`
  cursor: pointer;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  border: 0.0675rem solid ${(props) => props.background || COLORS.BLUELIGHT};
  background-color: transparent;
  color: ${(props) => props.background || COLORS.BLUELIGHT};
  border-radius: 2rem;
  &:hover {
    border: 0.0675rem solid ${(props) => props.background || COLORS.BLUELIGHT};
    background-color: transparent;
    color: ${(props) => props.background || COLORS.BLUELIGHT};
  }
`;
