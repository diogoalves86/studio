import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Video} from '@remotion/media';

// Clipe de apoio (sem som) desfocado e escurecido: mantém o "mundo" do avatar por trás das cenas cheias.
export const Fundo: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#0A1430'}}>
      <AbsoluteFill style={{filter: 'blur(30px) brightness(.6) saturate(1.25)', scale: String(interpolate(frame, [0, durationInFrames], [1.18, 1.32]))}}>
        <Video src={src} muted loop objectFit="cover" style={{width: '100%', height: '100%'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10,20,48,.62) 0%, rgba(10,20,48,.82) 55%, rgba(6,12,32,.94) 100%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 18%, rgba(47,123,255,.28), transparent 55%)'}} />
    </AbsoluteFill>
  );
};

// Wipe azul de baixo para cima: em progresso 0,5 cobre a tela inteira (é o instante do corte).
export const Wipe: React.FC<{progresso: number}> = ({progresso}) => {
  if (progresso <= 0 || progresso >= 1) return null;
  const y = (1 - progresso * 2) * 100;
  return (
    <AbsoluteFill style={{translate: `0px ${y}%`}}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #3EC6FF 0%, #2F7BFF 12%, #2F7BFF 88%, #1B4FD1 100%)', transform: 'skewY(-6deg) scale(1.2)'}} />
    </AbsoluteFill>
  );
};
