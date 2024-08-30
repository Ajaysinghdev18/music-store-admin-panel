// Dependencies
import { FormControlLabelProps, Switch } from '@mui/material';
import React, { FC } from 'react';

// Styles
import * as S from './styles';

interface ISwitchFieldProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  trueLabel?: string;
  falseLabel?: string;
}

// Export featured switch
export const SwitchField: FC<ISwitchFieldProps> = ({
  trueLabel = 'Featured',
  falseLabel = 'Not Featured',
  ...props
}) => {
  // Return featured switch
  return (
    <S.SwitchField
      labelPlacement="start"
      control={<Switch sx={{ scale: '0.8' }} />}
      label={props.checked ? trueLabel : falseLabel}
      {...props}
    />
  );
};
