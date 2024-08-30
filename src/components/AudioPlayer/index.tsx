import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PauseIcon, PlayIcon } from '../../assets/icons';
import { WaveSurfer } from './WaveSurfer';
import * as S from './styles';

interface IAudioPlayerProps {
  src: string;
}

export const AudioPlayer: FC<IAudioPlayerProps> = ({ src }) => {
  const [duration, setDuration] = useState<number>(0);
  const [waveWidth, setWaveWidth] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  const wavesurferRef = useRef<any>();
  const wavesurfer = useRef<any>();

  const pixelPerSecond = useMemo(() => {
    if (duration) {
      return waveWidth / duration;
    } else {
      return 10;
    }
  }, [waveWidth, duration]);

  const handleSeek = useCallback(
    (e) => {
      let offset = e.clientX + wavesurferRef.current.scrollLeft;
      let el = e.target;
      while (el) {
        offset -= el.offsetLeft;
        el = el.offsetParent;
      }
      const time = offset / pixelPerSecond;
      wavesurfer.current.seekTo(time / wavesurfer.current.getDuration());
      wavesurfer.current.play();
      setPlaying(true);
    },
    [pixelPerSecond]
  );

  const handleTogglePlay = useCallback(() => {
    if (wavesurfer.current) {
      if (playing) {
        wavesurfer?.current.pause();
      } else {
        wavesurfer?.current.play();
      }
      setPlaying(!playing);
    }
  }, [playing]);

  const handleWaveReady = (wave: any) => {
    wavesurfer.current = wave;
    setDuration(wave.getDuration());
  };

  const waveSurferElement = useMemo(() => <WaveSurfer src={src} onReady={handleWaveReady} />, [src]);

  useEffect(() => {
    setWaveWidth(wavesurferRef.current.clientWidth);
    window.onresize = () => setWaveWidth(wavesurferRef.current.clientWidth);

    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <S.AudioPlayer className="audio-player" onClick={(e) => e.stopPropagation()}>
      <S.PlayButton onClick={handleTogglePlay} disabled={!wavesurfer.current}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </S.PlayButton>
      <S.WaveSurfer onClick={handleSeek} ref={wavesurferRef}>
        {src && waveSurferElement}
      </S.WaveSurfer>
    </S.AudioPlayer>
  );
};
