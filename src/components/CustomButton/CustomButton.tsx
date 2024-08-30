import React, { FC, ReactElement } from 'react';

import { COLORS } from '../../constants/colors';
import { Row } from '../Email/Common/styles';
import { StyledButton } from './style';

enum ButtonTypes {
  'submit'
}
export interface ICustomButtonProps {
  title?: string;
  icon?: ReactElement;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  start?: boolean;
  width?: number;
  height?: number;
  format?: boolean;
  onClick?: any;
  activeIcon?: any;
  type?: string;
  disabled?: boolean;
}

const CustomButton: FC<ICustomButtonProps> = ({
  title,
  icon,
  variant,
  start,
  width,
  height,
  format,
  onClick,
  activeIcon,
  disabled = false
}) => {
  return (
    <Row>
      <StyledButton
        type="submit"
        disabled={disabled}
        variant={variant}
        startIcon={start && !format && icon}
        endIcon={!start && !format && (activeIcon ? activeIcon : icon)}
        sx={{
          color: variant === 'outlined' ? COLORS.BLUE : COLORS.BLUEWHITE,
          backgroundColor: variant === 'outlined' ? 'transparent' : COLORS.BLUE,
          boxShadow: 'none',
          fontWeight: '400',
          border: 'SemiBold',
          borderRadius: variant === 'contained' ? '8px' : 'none',
          textTransform: 'capitalize',
          fontSize: '1rem',
          width: width,
          padding: '0px !important',
          height: height
        }}
        onClick={onClick}
      >
        {format && (
          <Row
            sx={{
              position: 'absolute !important',
              zIndex: '10',
              marginRight: '180px'
            }}
          >
            {icon}
          </Row>
        )}
        {title}
      </StyledButton>
    </Row>
  );
};

export default CustomButton;
