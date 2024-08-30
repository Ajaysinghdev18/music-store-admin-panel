import { FC, ReactElement } from 'react';

import { COLORS } from '../../../constants/colors';
import { Col } from './styles';

export interface IToggleProps {
  active: string;
  icon?: ReactElement;
  width?: number;
  height?: number;
  title?: string;
  children?: ReactElement;
  activeIcon?: ReactElement;
}

const Toggle: FC<IToggleProps> = ({ active, icon, activeIcon, width, height, children }) => {
  return (
    <Col
      width={width ? width : 40}
      height={height ? height : 40}
      borderRadius={'0.25rem'}
      bgcolor={active === 'active' ? COLORS.BLUE : 'transparent'}
      alignItems={'center'}
      justifyContent={'center'}
      color={active === 'active' ? COLORS.BLUE : COLORS.LIGHTBROWN}
      fontSize={'1rem'}
    >
      {active === 'active' ? (activeIcon ? activeIcon : icon) : icon}
      {children ? children : null}
    </Col>
  );
};

export default Toggle;
