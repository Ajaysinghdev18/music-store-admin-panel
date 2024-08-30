import { Box, Slider, styled } from '@mui/material';
import { lightGreen } from '@mui/material/colors';
import React, { FC } from 'react';

import { COLORS } from '../../constants/colors';

export interface ICustomSliderProps {
  width: number;
  value?: number;
}

const PrettoSlider = styled(Slider)({
  height: 4,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: COLORS.BLUE
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: COLORS.BLUE,
    border: 'none',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'lightgray'
  }
});

const CustomSlider: FC<ICustomSliderProps> = ({ width }) => {
  return (
    <Box
      sx={{
        width: width,
        display: 'flex',
        alignItems: 'center',
        paddingX: '0.5rem'
      }}
    >
      <PrettoSlider />
    </Box>
  );
};

export default CustomSlider;
