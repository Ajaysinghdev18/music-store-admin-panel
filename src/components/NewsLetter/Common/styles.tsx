import { Box, Checkbox, Grid, IconButton, InputBase, Menu, MenuItem, Select, Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  width: 1rem;
  //width: auto;
  height: 100%;
  padding: 0.75rem;
  border-radius: 1.25rem;
  background-color: #d3e3fd;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const Row = styled(Box)`
  display: flex;
`;

export const Col = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const CustomPropsInput = styled(InputBase)`
  border-bottom: 0.0675rem solid white;
  font-size: 0.8rem;
  padding-left: 0.3125rem;
`;

export const CheckBox = styled(Checkbox)`
  && {
    &:hover {
      background-color: ${(props) => props.theme.palette.success};
    }
  }
`;

export const CustomSelect = styled(Select)`
  background-color: #f2f6fc;
  width: 100%;
  font-size: 1rem;
  color: #707070;
  && {
    height: 3rem;
    border-radius: 8px;
    border: none;
    &:hover {
      background-color: transparent;
      border-color: #02c58d !important;
      border: 0.125rem solid;
    }
  }

  fieldset {
    border-color: transparent !important;
  }
`;

export const SectionTitle = styled(Typography)`
  font-size: 0.8rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  line-height: 1rem;
  && {
    color: #707070;
  }
`;

export const SectionBody = styled(Typography)`
  font-size: 10.0675rem;
`;

export const ToggleButtonGroup = styled(Box)`
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 0.375rem;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f6fc;
  border-radius: 8px;
`;

export const TabButton = styled(Box)<{ active: string }>`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
  border-radius: 1.25rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  color: ${(props) => (props.active === 'active' ? '#02C58D' : '#707070')};
  background-color: ${(props) => (props.active === 'active' ? '#d3e3fd' : 'transparent')};
  &:hover {
    background-color: #d3e3fd;
  }
`;

export const TransformBox = styled(Box)`
  display: flex;
  height: 7.375rem;
  padding-top: 0.25rem;
  padding-bottom: 8px;
  justify-content: space-between;
`;

export const ImagesGallery = styled(Grid)`
  display: grid;
  grid: auto / auto auto;
  grid-gap: 8px;
  //height: 30.8rem;/
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  height: 0;
  margin-bottom: 8px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const GalleryItem = styled(Box)`
  width: 108px;
  height: 108px;
  border-radius: 1rem;
  background-color: #dadce0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 0.0675rem solid transparent;

  > svg {
    width: 4.5rem;
    height: 4.5rem;

    rect {
      fill: #707070;
    }

    circle {
      fill: #707070;
    }

    path {
      fill: #707070;
    }
  }

  .MuiButtonBase-root {
    display: none;
  }

  &:hover {
    border: 0.0675rem solid #02c58d;
    .MuiButtonBase-root {
      display: flex;
    }
  }
`;

export const MoreImageActionButton = styled(IconButton)`
  position: absolute;
  background-color: #b4bfc4;
  border-radius: 50%;
  top: 0.1875rem;
  right: 0.1875rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    background-color: white;
    display: flex;
  }

  svg {
    height: 2.625rem;
    width: 2.625rem;
  }

  &:hover {
    background-color: white;
  }
`;

export const MoreActionButton = styled(IconButton)`
  position: absolute;
  padding: 0;
  background-color: transparent;
  border-radius: 50%;
  right: 0.1875rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    display: flex;
  }

  svg {
    height: 2.625rem;
    width: 2.625rem;
  }

  &:hover {
    background-color: #b4bfc4;
  }
`;

export const DragMediaBox = styled(Box)`
  padding: 3rem 0;
  border: 0.0675rem dashed #02c58d;
  border-radius: 1.5rem;
  background-color: #f2f6fc;
  font-size: 0.625rem;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;

  p {
    font-size: 0.625rem;
  }
`;

export const ActionMenu = styled(Menu)`
  ul {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    width: 240px;

    li {
      padding-top: 0.625rem;
      padding-bottom: 0.625rem;
      svg {
        color: black;
      }
    }

    p {
      font-size: 0.625rem;
      text-align: center;
      padding-bottom: 0.75rem;
    }
  }
`;

export const InputForm = styled(MenuItem)`
  border: 0.0675rem solid transparent;
  border-radius: 8px;
  &:hover {
    border-color: #02c58d;
  }
`;

export const StyledTag = styled(Box)<{ field: number }>`
  position: absolute;
  border-radius: 1.25rem 0 0 1.25rem;
  width: 80px;
  height: 80px;
  background-color: ${(props) => (props.field === -1 ? 'transparent' : '#d3e3fd')};
  margin-top: ${(props) => props.field * 80 - 80}px;
  z-index: 5;
  transition: ease-in-out 0.1s;
`;

export const CoverBox = styled(Box)<{ field: number; pos: string }>`
  background-color: #F6F8FC;
  width: 1.25rem;
  height: 1.25rem;
  z-index: 10;
  margin-top: ${(props) => props.field * 80 - (props.pos === 'up' ? 100 : 0)}px;
  position: absolute;
  margin-left: 60px;
  border-bottom-right-radius: ${(props) => (props.pos === 'up' ? 40 : 0)}px;
  border-Top-right-radius: ${(props) => (props.pos === 'up' ? 0 : 40)}px;
  transition: ease-in-out 0.1s;
}
`;

export const YTag = styled(Box)<{ field: number; coe: number }>`
  background-color: #d3e3fd;
  z-index: 4;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: ${(props) => props.field * 80 - 100 * props.coe}px;
  position: absolute;
  margin-left: 60px;
  transition: ease-in-out 0.1s;
`;

export const AppearanceBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
  padding-bottom: 8px;
`;
