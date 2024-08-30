import { Box, FormControlLabelProps } from '@mui/material';
import React, { FC } from 'react';

import * as S from './styles';

interface ITextInputProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name?: string;
  disabled?: boolean;
  value?: string;
  error?: boolean;
  helperText?: string | boolean;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
  onChange?: (e) => void;
  minRows?: number;
  type?: string;
}

export const TextInput: FC<ITextInputProps> = ({
  name,
  disabled,
  value,
  error,
  helperText,
  onChange,
  label,
  placeholder,
  multiline,
  minRows,
  type
}) => {
  return (
    <Box>
      <Box fontSize="0.875rem" fontWeight="500">
        {label || ''}
      </Box>
      <S.TextInput
        type={type}
        disabled={disabled}
        multiline={multiline}
        minRows={minRows}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        error={error}
        multiple={multiline}
      />
      {error && <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{helperText}</Box>}
    </Box>
  );
};
