import React from 'react';
import {Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadMontserrat} from '@remotion/google-fonts/Montserrat';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {PALAVRAS, TRECHOS} from './palavras';

export const {fontFamily: MONT} = loadMontserrat('normal', {weights: ['700', '800', '900'], subsets: ['latin', 'latin-ext']});
export const {fontFamily: INTER} = loadInter('normal', {weights: ['500', '600', '700'], subsets: ['latin', 'latin-ext']});

// Dialeto "Digo Social": azul do cenário e da logo.
export const COR = {
  marinho: '#0A1430',
  marinhoClaro: '#13214A',
  azul: '#2F7BFF',
  ciano: '#3EC6FF',
  branco: '#FFFFFF',
  cinza: '#9AA7C7',
  vermelho: '#FF4D5E',
  verde: '#2EE59D',
};

const PASTA = '001. reels-avatar';
export const ARQ = {
  narracao: staticFile(`${PASTA}/video/narracao_v2.wav`),
  // Clipes do Seedance 2 Mini reajustados no tempo para a boca acompanhar a voz natural.
  clipeGancho: staticFile(`${PASTA}/hf/sync_gancho.mp4`),
  clipeDiferenca: staticFile(`${PASTA}/hf/sync_diferenca.mp4`),
  apoioA: staticFile(`${PASTA}/hf/mini_hf_20261013_012928_b494083f-8efd-4f28-9b7d-1b6708fbe67b.mp4`),
  apoioB: staticFile(`${PASTA}/hf/mini_hf_20261013_012929_577b9617-39c4-49da-b6c8-60e17019f620.mp4`),
  // Logo oficial (cópia de ~/Documents/DigoSocial Logo Quadrada 1024x1024.png): é a foto de perfil do Digo Social.
  logo: staticFile(`${PASTA}/prints/logo.png`),
};

export const T = TRECHOS;

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const suave = Easing.inOut(Easing.cubic);
export const saida = Easing.out(Easing.cubic);

// Tempo absoluto da narração, mesmo dentro de uma <Sequence> que começa em `inicio`.
export const useT = (inicio = 0) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame / fps + inicio;
};

export const prog = (t: number, a: number, d = 0.5, easing = suave) =>
  interpolate(t, [a, a + d], [0, 1], {...clamp, easing});

export const useMola = () => {
  const {fps} = useVideoConfig();
  return (t: number, a: number, damping = 14, stiffness = 170) =>
    t < a ? 0 : spring({frame: (t - a) * fps, fps, config: {damping, stiffness}});
};

// Palavras faladas entre dois tempos, para revelar texto no ritmo da fala.
export const falado = (de: number, ate: number) => PALAVRAS.filter((p) => p.s >= de && p.s < ate);

export const Pilula: React.FC<{cor: string; fundo?: string; children: React.ReactNode; tamanho?: number; style?: React.CSSProperties}> = ({
  cor,
  fundo,
  children,
  tamanho = 40,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex', alignItems: 'center', gap: tamanho * 0.35,
      padding: `${tamanho * 0.38}px ${tamanho * 0.75}px`, borderRadius: 999,
      background: fundo ?? `${cor}26`, border: `3px solid ${cor}`, color: COR.branco,
      fontFamily: MONT, fontWeight: 800, fontSize: tamanho, letterSpacing: 1, whiteSpace: 'nowrap',
      boxShadow: `0 12px 40px rgba(0,0,0,.35)`,
      ...style,
    }}
  >
    {children}
  </div>
);
