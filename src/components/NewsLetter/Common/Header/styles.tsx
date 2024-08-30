import { Box, InputBase, Menu, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styled from 'styled-components';

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(8, 16, 8, 0)};
`;

export const MobileHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(4, 8, 4, 0)};
`;

export const CustomInput = styled(InputBase)`
  && {
    border-radius: 8px;
    height: 3rem;
    width: 100%;
    // padding: ${(props) => props.theme.spacing(4, 12)};
    background-color: ${(props) => props.theme.palette.action.hover};
    ${(props) => props.theme.typography.button};

    .MuiInputAdornment-root {
      width: 40px;
      height: 40px;
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

export const SearchResult = styled(Box)`
  display: none;
  margin: ${(props) => props.theme.spacing(0, 4)};
  border-top: 0.0675rem solid ${(props) => props.theme.palette.text.disabled};
  background-color: ${(props) => props.theme.palette.common.white};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: ${(props) => props.theme.spacing(12, 8)};

  .MuiTypography-root {
    & + .MuiTypography-root {
      margin-top: ${(props) => props.theme.spacing(12)};
    }
  }
`;

export const SaveMenu = styled(Menu)`
  ul {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  li {
    border-radius: 0.25rem;
    font-size: 1.125rem;
    font-family: SansSerif, serif;
  }
`;

export const ToggleLabel = styled.span`
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const Toggle = styled(ToggleButton)`
  && {
    border: none;
    width: 50px;
    height: 2.25rem;
    border-radius: 0.25rem !important;
    color: ${(props) => props.theme.palette.action.active};

    &:hover {
      background-color: ${(props) => props.theme.palette.action.hover};

      ${ToggleLabel} {
        color: ${(props) => props.theme.palette.text.primary};
      }
    }

    &.Mui-selected {
      background-color: ${(props) => props.theme.palette.action.active};

      ${ToggleLabel} {
        color: ${(props) => props.theme.palette.text.primary};
      }
    }
  }
`;

export const ToggleGroup = styled(ToggleButtonGroup)`
  && {
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.action.hover};
    padding: ${(props) => props.theme.spacing(6)};

    ${Toggle} + ${Toggle} {
      margin-left: ${(props) => props.theme.spacing(4)} !important;
    }
  }
`;

export const Row = styled(Box)<{ height?: string; width?: string; justifyContent?: string }>`
  && {
    justifycontent: ${(props) => (props.justifyContent ? props.justifyContent : 'space-evenly')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    display: flex;
    width: ${(props) => (props.width ? props.width : '100%')};
  }
`;

export const Container = styled(Box)`
  height: 4rem;
  display: flex;
  align-items: center;
  padding-right: 1rem;
  padding-left: 8px;
`;

export const CustomSliderBox = styled(Box)`
  display: flex;
  width: 268px;
  padding: 0.25rem;
  margin-left: 8px;
  background-color: #f2f6fc;
  align-items: center;
  border-radius: 8px;
  border: 0.0675rem solid ${(props) => props.theme.palette.action.hover};
`;

export const Col = styled(Box)`
  display: flex;
  flex-direction: column;
  z-index: 1300;
`;

export const YLine = styled(Box)`
  width: 0.125rem;
  background-color: #d3e3fd;
`;
