import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {ARQ} from './tema';

// Capa do destaque único (1080×1920). O Instagram recorta um círculo no centro: tudo que importa fica em ~700 px.
// v = 'logo' (logo com aurora e brilho), 'rosto' (foto do avatar no anel da marca) ou 'icone' (logo sobre o gradiente).

const AVATAR = staticFile('002. destaques-instagram/prints/avatar-ref.png');
const GRADIENTE = 'linear-gradient(135deg, #2F7BFF 0%, #1FB5E8 50%, #2EE59D 100%)';

// Manchas de luz desfocadas nas cores da logo, atrás do círculo.
const Aurora: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: 120, top: 560, width: 620, height: 620, borderRadius: 999, background: '#2F7BFF', filter: 'blur(140px)', opacity: 0.55}} />
    <div style={{position: 'absolute', left: 420, top: 820, width: 560, height: 560, borderRadius: 999, background: '#2EE59D', filter: 'blur(150px)', opacity: 0.35}} />
    <div style={{position: 'absolute', left: 380, top: 480, width: 420, height: 420, borderRadius: 999, background: '#1FB5E8', filter: 'blur(130px)', opacity: 0.4}} />
  </>
);

// Pontinhos de luz fixos (semente fixa: sempre a mesma imagem).
const Brilhos: React.FC = () => {
  const pts = Array.from({length: 26}, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = 380 + ((i * 53) % 170);
    return {x: 540 + r * Math.cos(a), y: 960 + r * Math.sin(a), s: 3 + (i % 4) * 2, o: 0.25 + ((i * 7) % 10) / 20};
  });
  return (
    <>
      {pts.map((p, i) => (
        <div key={i} style={{position: 'absolute', left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: 99, background: '#BFF3FF', opacity: p.o, boxShadow: '0 0 12px #3EC6FF'}} />
      ))}
    </>
  );
};

const Anel: React.FC<{tamanho: number; espessura: number; children: React.ReactNode; fundo?: string}> = ({tamanho, espessura, children, fundo}) => (
  <div style={{position: 'absolute', left: 540 - tamanho / 2, top: 960 - tamanho / 2, width: tamanho, height: tamanho, borderRadius: 999, padding: espessura, boxSizing: 'border-box', background: GRADIENTE, boxShadow: '0 0 90px rgba(31,181,232,.45), 0 0 220px rgba(47,123,255,.25)'}}>
    <div style={{width: '100%', height: '100%', borderRadius: 999, overflow: 'hidden', background: fundo ?? '#0A1430', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
  </div>
);

export const CapaUnica: React.FC<{v: 'logo' | 'rosto' | 'icone'}> = ({v}) => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0E2250 0%, #050A1C 55%, #000 100%)', overflow: 'hidden'}}>
    <Aurora />
    <Brilhos />
    {v === 'logo' && (
      <Anel tamanho={720} espessura={10} fundo="radial-gradient(circle at 45% 35%, #16285E 0%, #0A1430 55%, #050A1C 100%)">
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', inset: -60, borderRadius: 999, background: 'radial-gradient(circle, rgba(46,229,157,.35), rgba(47,123,255,.12) 55%, transparent 72%)'}} />
          <Img src={ARQ.logo} style={{position: 'relative', width: 430, height: 430, borderRadius: 100, boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 0 2px rgba(62,198,255,.35)'}} />
        </div>
      </Anel>
    )}
    {v === 'rosto' && (
      <>
        <Anel tamanho={720} espessura={12}>
          <Img src={AVATAR} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%', scale: '1.35', translate: '0px 120px', filter: 'contrast(1.05) saturate(1.05)'}} />
        </Anel>
        <Img src={ARQ.logo} style={{position: 'absolute', left: 540 + 190, top: 960 + 170, width: 150, height: 150, borderRadius: 38, boxShadow: '0 12px 40px rgba(0,0,0,.6), 0 0 0 5px #0A1430'}} />
      </>
    )}
    {v === 'icone' && (
      <Anel tamanho={720} espessura={0} fundo={GRADIENTE}>
        <Img src={ARQ.logo} style={{width: 470, height: 470, borderRadius: 110, boxShadow: '0 40px 90px rgba(5,10,30,.55)'}} />
      </Anel>
    )}
  </AbsoluteFill>
);
