import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export const ReactPlayerWrapper = styled.div`
  > div {
    width: unset !important;
    height: auto !important;
  }
`;

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return <ReactPlayerWrapper><ReactPlayer url={videoUrl} style={{ objectFit: 'contain' }} controls /></ReactPlayerWrapper>;
};
