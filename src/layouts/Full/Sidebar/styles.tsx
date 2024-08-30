import { Box, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DrawerBar = styled(Drawer)`
  .MuiPaper-root {
    background-color: black !important;
    border-right: none;
    border-radius: 0 16px 16px 0;
  }
`;

export const Sidebar = styled(Box)<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(12, 8)};
  width: ${(props) => (props.active ? '260px' : '72px')};
  min-width: ${(props) => (props.active ? '260px' : '72px')};
  background-color: ${(props) => props.theme.palette.background.black};
  //transition: all ease-in 0.5s;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Brand = styled(Box)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.active ? 'space-between' : 'left')};
  padding: ${(props) => props.theme.spacing(12, 8)};
  margin-bottom: ${(props) => props.theme.spacing(24)};
`;

export const Logo = styled(Link)<{ active?: boolean }>`
  margin-left: ${(props) => props.theme.spacing(16)};
  width: ${(props) => (props.active ? '102px' : '0px')};
  overflow: hidden;
  //transition: all ease-in 0.5s;
  display: flex;

  img {
    height: 40px;
  }

  svg {
    height: 40px;
  }
`;

export const Bottom = styled(Box)<{ active?: boolean }>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  border-top: solid 1px ${(props) => props.theme.palette.text.disabled};
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(12, 0)};
`;
