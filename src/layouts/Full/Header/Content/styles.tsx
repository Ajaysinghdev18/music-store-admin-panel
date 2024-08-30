import { Box, InputBase, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styled from 'styled-components';

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(16, 0)};
`;

export const MobileHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(4, 8, 4, 0)};
`;

export const SearchInput = styled(InputBase)`
  && {
    height: 36px;
    width: 100%;
    padding: ${(props) => props.theme.spacing(4, 12, 4, 20)};
    background-color: ${(props) => props.theme.palette.bluegray};
    ${(props) => props.theme.typography.button};
    border-radius: 18px;
    box-shadow: 0 7px 14px 2px rgba(100, 100, 100, 0.3) !important;

    input::placeholder {
      color: ${(props) => props.theme.palette.ablack};
    }

    .MuiInputAdornment-root {
      width: 36px;
      height: 36px;
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

export const SearchResult = styled(Box)`
  position: absolute;
  display: none;
  width: 420px;
  z-index: 5;
  margin: ${(props) => props.theme.spacing(0, 4)};
  border-top: 1px solid ${(props) => props.theme.palette.text.disabled};
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

export const SearchInputWrapper = styled(Box)`
  width: 420px;
  z-index: 1;

  &:hover {
    // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    // background-color: ${(props) => props.theme.palette.common.white};

    ${SearchInput} {
      background-color: ${(props) => props.theme.palette.common.white};
    }

    ${SearchResult} {
      display: block;
    }
  }
`;

export const SearchContainer = styled(Box)`
  width: 420px;
`;

export const ToggleLabel = styled.span`
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const Toggle = styled(ToggleButton)`
  && {
    border: none;
    width: 50px;
    height: 36px;
    border-radius: 4px !important;
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
