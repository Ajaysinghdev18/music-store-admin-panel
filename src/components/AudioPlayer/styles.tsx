import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';

export const AudioPlayer = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const PlayButton = styled(IconButton)`
  && {
    width: 3.5635rem;
    height: 3.5635rem;
    border: 0.0675rem solid ${(props) => props.theme.palette.common.white};
    background-color: ${(props) => props.theme.palette.common.black};
    margin-left: 0.1875rem;
    svg {
      color: cyan;
    }
  }
`;

export const WaveSurfer = styled(Box)`
  margin-left: auto;
  flex: 1;
`;
