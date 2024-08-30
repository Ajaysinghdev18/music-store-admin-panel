// Dependencies
import { Collapse, useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ArrowRightMIcon } from '../../../../assets/icons';
// Constants
import { ROUTES } from '../../../../constants';
import { ISidebarItem } from '../../../../constants';
// Styles
import * as S from './styles';

export interface SidebarItemProps {
  menuIdx: number;
  item?: ISidebarItem;
  isCollapsed?: boolean;
  subMenuIdx?: number;
  setSubMenuIdx: (subMenuIdx: number) => void;
  isChild?: boolean;
}

// Create sidebar item
const SidebarItem: FC<SidebarItemProps> = ({ menuIdx, item, subMenuIdx, setSubMenuIdx, isChild, isCollapsed }) => {
  // States
  const [expanded, setExpanded] = useState<boolean>(false);
  // Get navigate from hook
  const navigate = useNavigate();

  // Get pathname from hook
  const { pathname } = useLocation();

  // Mobile
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Check parent item
  const isParent = useMemo(
    () => Boolean(item?.children?.some((child) => child.path && pathname.includes(child.path))),
    [item?.children, pathname]
  );

  // Check active
  const isActive = useMemo(() => {
    if (item?.path && item?.path !== ROUTES.HOME) {
      return pathname.includes(item?.path) || isParent;
    } else {
      return pathname === item?.path || isParent;
    }
  }, [isParent, pathname, item?.path]);

  // Click handler
  const handleClick = (index: number, item?: ISidebarItem) => () => {
    setExpanded(!expanded);
    if (item?.path) {
      navigate(item?.path);
    }
    if (isTablet || !isCollapsed) {
      if (item?.children) {
        setSubMenuIdx(index);
      } else if (item?.label == 'Main Menu') {
        setSubMenuIdx(-1);
      }
    }
  };

  // On isParent changed
  useEffect(() => {
    setExpanded(isParent);
  }, [isParent]);
  // Return sidebar item
  return (
    <>
      <S.Item
        key="home"
        active={isActive ? true : undefined}
        isCollapsed={isCollapsed}
        child={isChild ? true : undefined}
        onClick={handleClick(menuIdx, item)}
      >
        <S.Icon>{isActive ? item?.icon.active : item?.icon.default}</S.Icon>
        <S.Label isCollapsed={isCollapsed}>{item?.label}</S.Label>
        {isTablet && item?.children && (
          <S.Icon ml="auto">
            <ArrowRightMIcon />
          </S.Icon>
        )}
        {isActive && isCollapsed && !isChild && !item?.children && (
          <>
            <S.WingUpBack>
              <S.WingUp />
            </S.WingUpBack>
            <S.WingDownBack>
              <S.WingDown />
            </S.WingDownBack>
          </>
        )}
      </S.Item>
      {!isTablet && isCollapsed && item?.children && (
        <S.StyledCollapse in={expanded} timeout="auto" unmountOnExit>
          <S.Children>
            {item?.children.slice(1, item?.children.length).map((child, index) => (
              <SidebarItem
                key={index}
                menuIdx={index}
                item={child}
                subMenuIdx={subMenuIdx}
                setSubMenuIdx={setSubMenuIdx}
                isChild
                isCollapsed={isCollapsed}
              />
            ))}
          </S.Children>
        </S.StyledCollapse>
      )}
    </>
  );
};

// Export  sidebar item
export default SidebarItem;
