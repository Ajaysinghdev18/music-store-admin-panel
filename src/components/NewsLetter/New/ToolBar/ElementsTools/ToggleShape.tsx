import { FC, ReactElement } from 'react';

import { ShapeBox } from './style';

export interface IToggleShapeProps {
  active?: string;
  icon?: ReactElement;
  activeIcon?: ReactElement;
  value: number;
  onClick: (number) => void;
}

const ToggleShape: FC<IToggleShapeProps> = ({ active, icon, value, onClick, activeIcon }) => {
  const height = value < 6 ? 24 : 72;
  return (
    <ShapeBox width={72} height={height} active={active} onClick={() => onClick(value)}>
      {active === 'active' && activeIcon}
      {active === 'inactive' && icon}
    </ShapeBox>
  );
};

export default ToggleShape;
