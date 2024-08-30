import { Box, Dialog, alpha } from '@mui/material';
import styled from 'styled-components';

export const PreviewDialog = styled(Dialog)`
  && {
    .MuiPaper-root {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

export const Content = styled(Box)`
  border-radius: 1rem;
  min-height: 46.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => alpha(props.theme.palette.common.black, 0.8)};
`;

export const Song = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 100%;
  padding-top: ${(props) => props.theme.spacing(97)};
`;

export const Summary = styled(Box)`
  position: relative;
  height: 23.25rem;
  z-index: 1;
  padding: 0 0 3.75rem 11rem;
  background-color: ${(props) => props.theme.palette.common.black};

  &::before {
    position: absolute;
    top: 6rem;
    right: 6.375rem;
    width: 25.5rem;
    height: 25.5rem;
    content: '';
    border-radius: 50%;
    z-index: -2;
    background-image: linear-gradient(to right, yellow, cyan);
  }

  &::after {
    position: absolute;
    top: -1.7rem;
    right: 10rem;
    width: 18rem;
    height: 18rem;
    content: '';
    border-radius: 50%;
    z-index: 1;
    background-image: linear-gradient(to right, cyan, magenta);
  }

  .audio-player {
    position: absolute;
    top: 2.9rem;
    margin-left: ${(props) => props.theme.spacing(362)};
    width: calc(100% - 22.625rem - 26.25rem);
    z-index: 0;
  }
`;

export const SongName = styled.h2`
  font-family: 'GemunuLibre';
  color: lime;
  font-size: 3.3rem;
  line-height: 4.375rem;
  font-weight: bold;
  margin-top: ${(props) => props.theme.spacing(44)};
  padding-bottom: ${(props) => props.theme.spacing(16)};
  border-bottom: 0.0675rem solid ${(props) => props.theme.palette.common.white};
`;

export const Backdrop = styled(Box)`
  backdrop-filter: blur(1.875rem);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const Thumbnail = styled.img`
  position: absolute;
  right: 8.875rem;
  bottom: 0;
  z-index: 2;
  max-width: 30rem;
`;

export const Category = styled.span`
  font-family: 'Segoe UI';
  color: white;
`;

export const Statement = styled.p`
  font-family: 'Segoe UI';
  color: ${(props) => props.theme.palette.common.white};
  font-size: 1.5rem;
  line-height: 2rem;
  margin: ${(props) => props.theme.spacing(0)};
`;

export const Information = styled(Box)`
  width: 100%;
  padding-left: ${(props) => props.theme.spacing(454)};
  padding-top: ${(props) => props.theme.spacing(40)};
`;

export const Sign = styled.img`
  margin-left: ${(props) => props.theme.spacing(478)};
  margin-top: ${(props) => props.theme.spacing(20)};
`;

export const Label = styled.h3`
  font-family: 'Segoe UI';
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.375rem;
  color: ${(props) => props.theme.palette.common.white};
  margin: 0;
  padding-bottom: ${(props) => props.theme.spacing(12)};
  border-bottom: 0.0675rem solid ${(props) => props.theme.palette.common.white};
`;

export const Event = styled(Box)`
  background-image: url('/images/event-ticket-bg.png');
  background-repeat: no-repeat;
  max-width: 70rem;
  width: 100%;
  height: 17.5rem;
  font-family: Teko;
  position: relative;
  color: ${(props) => props.theme.palette.common.white};
`;

export const EventName = styled.h2`
  font-size: 4.875rem;
  line-height: 4rem;
  width: 39%;
  margin: 0.625rem 0 0 21%;
`;

export const EventDate = styled.span`
  font-size: 1.5rem;
  line-height: 1.25rem;
  margin: auto 0 0 21%;
  border-bottom: 0.9rem;
  position: absolute;
  bottom: ${(props) => props.theme.spacing(15)};
`;

export const EventLocation = styled.span`
  writing-mode: vertical-lr;
  position: absolute;
  font-size: 1.375rem;
  line-height: 1.875rem;
  bottom: 0;
  left: 62.2%;
  transform: rotate(180deg);
  white-space: nowrap;
  height: 17.375rem;
  overflow: hidden;
`;

export const EventThumbnail = styled.img`
  max-width: 230.0675rem;
  max-height: 230.0675rem;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 6.2%;
  top: 8.25%;
`;
