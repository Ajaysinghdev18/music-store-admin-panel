import { Box, Grid, Select, Typography } from '@mui/material';
import styled from 'styled-components';

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

export const ImagesGallery = styled(Grid)`
  display: grid;
  grid: auto / auto auto;
  grid-gap: 8px;
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

export const CropToolBox = styled(Box)`
  height: 11rem;
  padding: 0.25rem 0 8px 0;
  display: flex;
  flex-direction: column;
`;
