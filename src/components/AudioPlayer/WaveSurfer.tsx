import { Box } from '@mui/material';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
// @ts-ignore
import WaveSurferJS from 'wavesurfer.js';

export interface WaveSurferOptions {
  audioRate?: number;
  audioContext?: object;
  audioScriptProcessor?: object;
  autoCenter?: boolean;
  backend?: string;
  backgroundColor?: string;
  barGap?: number;
  barHeight?: number;
  barMinHeight?: number;
  barRadius?: number;
  barWidth?: number;
  closeAudioContext?: boolean;
  container?: string | HTMLElement;
  cursorColor?: string;
  cursorWidth?: number;
  drawingContextAttributes?: object;
  fillParent?: boolean;
  forceDecode?: boolean;
  height?: number;
  hideScrollbar?: boolean;
  hideCursor?: boolean;
  interact?: boolean;
  loopSelection?: boolean;
  maxCanvasWidth?: number;
  mediaControls?: boolean;
  mediaType?: string;
  minPxPerSec?: number;
  normalize?: boolean;
  partialRender?: boolean;
  pixelRatio?: number;
  plugins?: any[];
  progressColor?: string;
  regionsMinLength?: number;
  removeMediaElementOnDestroy?: boolean;
  renderer?: any;
  responsive?: boolean;
  scrollParent?: boolean;
  skipLength?: number;
  waveColor?: string;
  xhr?: any;
}

interface IWaveSurferProps {
  className?: string;
  src: string;
  options?: WaveSurferOptions;
  autoPlay?: boolean;
  onInit?: (wavesurfer: any) => void;
  onReady?: (wavesurfer: any) => void;
  onProcess?: (duration: number) => void;
  onSeek?: (duration: number) => void;
}

const defaultOptions: WaveSurferOptions = {
  barGap: 8,
  barWidth: 3,
  barRadius: 1.5,
  cursorWidth: 0,
  height: 168,
  responsive: true,
  waveColor: 'cyan',
  progressColor: 'magenta'
};

export const WaveSurfer: FC<IWaveSurferProps> = memo(
  ({ className = '', src, options, autoPlay = false, onInit, onReady, onProcess, onSeek }) => {
    const [surfer, setSurfer] = useState<any>();

    const id = useMemo(() => `waveform-${Math.floor(Math.random() * 100000)}`, []);

    useEffect(() => {
      const waveOptions = {
        barGap: 8,
        barWidth: 3,
        height: 168
      };

      const wavesurfer = WaveSurferJS.create({
        container: `#${id}`,
        ...defaultOptions,
        ...options,
        ...waveOptions
      });

      setSurfer(wavesurfer);
      if (onInit) {
        onInit(wavesurfer);
      }

      return () => wavesurfer.destroy();
    }, [id, options, onInit]);

    useEffect(() => {
      if (!surfer) return;

      surfer.load(src);
    }, [surfer, src]);

    useEffect(() => {
      if (!surfer) return;

      const wavesurfer: any = surfer;
      const _onReady = () => {
        if (autoPlay) {
          wavesurfer.play();
        }
        if (onReady) {
          onReady(wavesurfer);
        }
      };
      wavesurfer.on('ready', _onReady);
      return () => wavesurfer.un('ready', _onReady);
    }, [surfer, autoPlay, onReady]);

    useEffect(() => {
      if (!surfer || !onProcess) return;

      const wavesurfer: any = surfer;
      const _onProcess = () => {
        onProcess(wavesurfer.getCurrentTime());
      };
      wavesurfer.on('audioprocess', _onProcess);
      return () => wavesurfer.un('audioprocess', _onProcess);
    }, [surfer, onProcess]);

    useEffect(() => {
      if (!surfer || !onSeek) return;

      const wavesurfer: any = surfer;
      const _onSeek = () => {
        onSeek(wavesurfer.getCurrentTime());
      };
      wavesurfer.on('seek', _onSeek);
      return () => wavesurfer.un('seek', _onSeek);
    }, [surfer, onSeek]);

    return useMemo(() => <Box id={id} className={className} />, [id, className]);
  }
);
