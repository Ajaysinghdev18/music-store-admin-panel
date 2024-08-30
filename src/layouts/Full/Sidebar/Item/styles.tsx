import { Box, ButtonBase, Collapse, Stack, Typography } from '@mui/material';
import styled from 'styled-components';

export const Icon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: ${(props) => props.theme.spacing(8)};
  flex-shrink: 0;
`;

export const Label = styled(Box)<{ isCollapsed?: boolean }>`
  text-transform: none;
  width: ${(props) => (props.isCollapsed ? '200px' : '0px')};
  overflow: hidden;
  text-align: left;
  z-index: 2;
`;

export const Item = styled(Box)<{ active?: boolean; child?: boolean; isCollapsed?: boolean }>`
  && {
    margin-top: ${(props) => (props.child ? '8px' : '0px')};
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    width: ${(props) => (props.isCollapsed ? (props.child ? '228px' : '252px') : '56px')};
    border-radius: 21px 0 0 21px;
    padding: ${(props) => props.theme.spacing(12, 16)};
    justify-content: flex-start;
    color: ${(props) => props.theme.palette.bluegray};
    background-color: ${(props) => (props.active ? props.theme.palette.bluegray.main : 'transparent')};

    ${Icon} {
      color: ${(props) => (props.active ? props.theme.palette.text.primary : 'white')};
    }

    ${Label} {
      color: ${(props) => (props.active ? props.theme.palette.text.primary : 'white')};
    }
  }
`;

export const Children = styled(Stack)`
  && {
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const WingUp = styled(Box)`
  width: 8rem;
  height: 2rem;
  background-color: rgb(22, 23, 25);
  clip-path: ellipse(100% 100% at 0% 0%);
  z-index: 1;
`;

export const WingUpBack = styled(Box)`
  position: absolute;
  right: 0;
  top: -2rem;
  background-color: ${(props) => props.theme.palette.bluegray.main};
`;

export const WingDown = styled(Box)`
  width: 8rem;
  height: 2rem;
  background-color: rgb(22, 23, 25);
  clip-path: ellipse(100% 100% at 0% 100%);
  z-index: 1;
`;

export const WingDownBack = styled(Box)`
  position: absolute;
  right: 0;
  bottom: -2rem;
  background-color: ${(props) => props.theme.palette.bluegray.main};
`;

export const StyledCollapse = styled(Collapse)`
  && {
    min-height: fit-content !important;
    height: fit-content !important;
    transition: height 1s ease-in-out;
  }
`;
