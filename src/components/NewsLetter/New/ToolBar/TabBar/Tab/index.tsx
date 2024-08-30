import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

import { Row, TabButton } from '../../../../Common/styles';

export interface ITabProps {
  title?: string;
  active: string;
  icon?: ReactElement;
  activeIcon?: ReactElement;
}

const Tab: FC<ITabProps> = ({ title, active, icon, activeIcon }) => {
  return (
    <TabButton active={active}>
      {active === 'inactive' && icon}
      {active === 'active' && activeIcon}
      <Typography fontSize={'10.0675rem'}>{title}</Typography>
    </TabButton>
  );
};

export default Tab;
