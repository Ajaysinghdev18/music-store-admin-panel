// Dependencies
import { Typography } from '@mui/material';
import { FC } from 'react';
import * as React from 'react';
import ReactDropzone from 'react-dropzone';

import { AudioPlayer } from '../AudioPlayer';
import { ObjectRender } from '../ObjectRender';
// import ReactPlayer from 'react-player';
import { VideoPlayer } from '../VideoPlayer';
// Styles
import * as S from './styles';

// Interfaces
interface IDropzoneProps {
  label: string;
  accept: string[];
  disabled?: boolean;
  onDrop: (files) => void;
  preview?: any;
  audioSrc?: string;
  videoSrc?: string;
  objectSrc?: string;
}

// Export dropzone
export const Dropzone: FC<IDropzoneProps> = ({
  objectSrc,
  videoSrc,
  label,
  accept,
  disabled,
  onDrop,
  preview,
  audioSrc
}) => {
  const handleDrop = (acceptedFiles) => {
    onDrop(acceptedFiles);
  };
  return (
    <ReactDropzone onDrop={handleDrop} disabled={disabled}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <S.Dropzone {...getRootProps()} active={audioSrc ? true : isDragActive} disabled={disabled}>
          <input {...getInputProps()} accept={accept.join(', ')} />
          {preview ? (
            <img src={preview} width={'100%'} height={'100%'} alt={'preview'} />
          ) : audioSrc ? (
            <AudioPlayer src={audioSrc} />
          ) : videoSrc ? (
            <VideoPlayer videoUrl={videoSrc} />
          ) : objectSrc ? (
            <ObjectRender objectUrl={objectSrc} />
          ) : (
            <Typography variant="subtitle" textAlign="center" color="text.secondary">
              {label}
              <br />({accept.join(', ').toUpperCase()})
            </Typography>
          )}
        </S.Dropzone>
      )}
    </ReactDropzone>
  );
};
