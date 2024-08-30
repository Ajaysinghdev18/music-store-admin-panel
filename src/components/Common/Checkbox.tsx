import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { FC } from 'react';

import { CheckIcon } from '../../assets/icons';

export const CheckBoxContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const CheckBoxLabel = styled(Typography)`
  margin-left: 0.5rem;
`;

export const CheckOutline = styled(Box)`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.125rem solid gray;
  border-radius: 0.1875rem;
`;

interface CheckBoxProps {
  label?: string;
  checked?: boolean;
  onChange: (_: boolean) => void;
}

const CheckBox: FC<CheckBoxProps> = ({ checked, onChange, label }) => {
  return (
    <CheckBoxContainer onClick={() => onChange(!checked)}>
      <CheckOutline sx={{ borderColor: checked ? 'black' : 'grey' }}>{checked && <CheckIcon />}</CheckOutline>
      {label && <CheckBoxLabel>{label}</CheckBoxLabel>}
    </CheckBoxContainer>
  );
};

export default CheckBox;
