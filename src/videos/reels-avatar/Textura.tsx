import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// Textura de câmera real por cima de tudo: grão de filme que muda a cada quadro e vinheta leve.
// Tira o aspecto "plástico" do vídeo gerado e une avatar e motion no mesmo material.
export const Textura: React.FC<{grao?: number}> = ({grao = 0.09}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: grao, mixBlendMode: 'overlay'}}>
        <filter id={`grao-${frame % 12}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 12} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grao-${frame % 12})`} />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 85% 70% at 50% 42%, transparent 55%, rgba(0,0,0,.38) 100%)'}} />
    </AbsoluteFill>
  );
};

// Oscilação sutil de câmera na mão (px e graus), sem padrão repetido evidente.
export const maoLivre = (t: number) => ({
  x: 3.2 * Math.sin(t * 1.3) + 1.6 * Math.sin(t * 3.1 + 1),
  y: 2.6 * Math.sin(t * 1.1 + 2) + 1.2 * Math.sin(t * 2.7),
  r: 0.14 * Math.sin(t * 0.9 + 0.5),
});
