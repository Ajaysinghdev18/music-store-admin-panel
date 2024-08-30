import { Avatar, Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { BellIcon, MenuMobileIcon, SettingsIcon } from '../../../assets/icons';
import {
  AUTH_ROUTES,
  FAQ,
  REACT_APP_ENVIRONMENT,
  ROUTES,
  SIDEBARADMIN_LIST,
  SIDEBARARTIST_LIST
} from '../../../constants';
import { getAccount } from '../../../store/selectors';
import SidebarItem from './Item';
import * as S from './styles';

interface SidebarProps {
  window?: () => Window;
  isCollapsed: boolean;
  setCollapse: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setCollapse }: SidebarProps) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [subMenuIdx, setSubMenuIdx] = useState<number>(-1);
  const sideBarRoles = {
    admin: SIDEBARADMIN_LIST,
    artist: SIDEBARARTIST_LIST
  };
  // Get account from store
  const account = useSelector(getAccount);

  if (isTablet) {
    // Render in mobile
    return (
      <S.DrawerBar open={isCollapsed} variant="temporary" onClose={() => setCollapse(false)}>
        <S.Sidebar active={isCollapsed ? true : undefined}>
          <S.Brand active={isTablet ? true : undefined}>
            <S.Logo active={isCollapsed ? true : undefined} to={ROUTES.HOME}>
              {/*{REACT_APP_ENVIRONMENT === 'demo' ? <img src="/images/new-logo.png" alt="demo-logo" /> : <Logo />}*/}
              <img src="/images/new-logo.png" alt="new-logo" />
            </S.Logo>
            <IconButton
              sx={{
                display: isTablet ? 'flex' : 'none',
                color: 'white'
              }}
              onClick={() => setCollapse(false)}
            >
              <MenuMobileIcon />
            </IconButton>
          </S.Brand>
          {isTablet && subMenuIdx > -1
            ? sideBarRoles[account?.role][subMenuIdx].children?.map((item, index) => (
                <SidebarItem
                  key={index}
                  menuIdx={index}
                  item={item}
                  subMenuIdx={subMenuIdx}
                  setSubMenuIdx={setSubMenuIdx}
                  isCollapsed={isCollapsed}
                />
              ))
            : sideBarRoles[account?.role].map((item, index) => (
                <SidebarItem
                  key={index}
                  menuIdx={index}
                  item={item}
                  subMenuIdx={subMenuIdx}
                  setSubMenuIdx={setSubMenuIdx}
                  isCollapsed={isCollapsed}
                />
              ))}
        </S.Sidebar>
        <Box
          sx={(theme) => ({
            padding: theme.spacing(12, 28)
          })}
        >
          <S.Bottom active={isTablet ? true : undefined}>
            <IconButton>
              <Avatar src="/images/avatar.png" />
            </IconButton>
            <Stack direction="row">
              <IconButton>
                <BellIcon />
              </IconButton>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Stack>
          </S.Bottom>
        </Box>
      </S.DrawerBar>
    );
  } else {
    // Render in desktop
    return (
      <S.Sidebar active={isCollapsed ? true : undefined}>
        <S.Brand>
          {/*<IconButton sx={{ color: 'white' }} onClick={() => setCollapse(!isCollapsed)}>*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
          <S.Logo to={ROUTES.HOME} active={isCollapsed ? true : undefined}>
            <img src="/images/new-logo.png" alt="new-logo" width="150%" />
            {/*{REACT_APP_ENVIRONMENT === 'demo' ? <img src="/images/demo-logo.png" alt="demo-logo" /> : <Logo />}*/}
          </S.Logo>
        </S.Brand>
        {!isCollapsed && subMenuIdx > -1
          ? sideBarRoles[account?.role][subMenuIdx]?.children?.map((item, index) => (
              <SidebarItem
                key={index}
                menuIdx={index}
                item={item}
                subMenuIdx={subMenuIdx}
                setSubMenuIdx={setSubMenuIdx}
                isCollapsed={isCollapsed}
              />
            ))
          : sideBarRoles[account?.role].map((item, index) => (
              <SidebarItem
                key={index}
                menuIdx={index}
                item={item}
                subMenuIdx={subMenuIdx}
                setSubMenuIdx={setSubMenuIdx}
                isCollapsed={isCollapsed}
              />
            ))}
      </S.Sidebar>
    );
  }
};

export default Sidebar;
