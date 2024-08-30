// Dependencies
import { useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';

import DesktopHeader from './Content/desktop';
import { MobileHeader } from './Content/mobile';

// Interfaces
interface IHeaderProps {
  isCollapsed: boolean;
  setCollapse: (isCollapsed: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ isCollapsed, setCollapse }) => {
  // States
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const header = useMemo(() => {
    if (isTablet) return <MobileHeader setCollapse={setCollapse} />;
    return <DesktopHeader isMobile={isTablet} isCollapsed={isCollapsed} setCollapse={setCollapse} />;
  }, [isTablet]);

  return <>{header}</>;
};

export default Header;
