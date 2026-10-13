import React from 'react';
import {Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadMontserrat} from '@remotion/google-fonts/Montserrat';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';

export const {fontFamily: MONT} = loadMontserrat('normal', {weights: ['700', '800', '900'], subsets: ['latin', 'latin-ext']});
export const {fontFamily: INTER} = loadInter('normal', {weights: ['500', '600', '700'], subsets: ['latin', 'latin-ext']});

// Dialeto "Digo Social": azul do cenário e da logo (mesmo do 001. reels-avatar).
export const COR = {
  marinho: '#0A1430',
  marinhoClaro: '#13214A',
  azul: '#2F7BFF',
  ciano: '#3EC6FF',
  branco: '#FFFFFF',
  cinza: '#9AA7C7',
  vermelho: '#FF4D5E',
  verde: '#2EE59D',
  amarelo: '#FFD25E',
};

const PASTA = '002. destaques-instagram';
const NARRACAO = {1: 'narracao_1_oque', 2: 'narracao_2_como', 3: 'narracao_3_praquem', 4: 'narracao_4_teste'} as const;
export type Num = 1 | 2 | 3 | 4;

export const ARQ = {
  narracao: (n: Num) => staticFile(`${PASTA}/video/${NARRACAO[n]}.wav`),
  // Clipes do Seedance 2 Mini já sincronizados com a voz natural (tools/sincronizar_avatar.py).
  clipe: (n: Num, lado: 'a' | 'b') => staticFile(`${PASTA}/hf/sync_${n}${lado}.mp4`),
  print: (nome: string) => staticFile(`${PASTA}/prints/bruto/${nome}.png`),
  sfx: (som: string) => staticFile(`${PASTA}/sfx/${som}.wav`),
  // Logo oficial (cópia de ~/Documents/DigoSocial Logo Quadrada 1024x1024.png).
  logo: staticFile(`${PASTA}/prints/logo.png`),
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const suave = Easing.inOut(Easing.cubic);
export const saida = Easing.out(Easing.cubic);

// Tempo da narração em segundos (as cenas ficam no nível de cima, fora de <Sequence>).
export const useT = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame / fps;
};

export const prog = (t: number, a: number, d = 0.5, easing = suave) => interpolate(t, [a, a + d], [0, 1], {...clamp, easing});

export const useMola = () => {
  const {fps} = useVideoConfig();
  return (t: number, a: number, damping = 14, stiffness = 170) => (t < a ? 0 : spring({frame: (t - a) * fps, fps, config: {damping, stiffness}}));
};

// Entrada com mola e saída com zoom + desfoque (padrão do guia 6). Devolve o estilo do bloco, ou null fora da janela.
export const useBloco = () => {
  const mola = useMola();
  return (t: number, de: number, ate: number, dy = 60): React.CSSProperties | null => {
    if (t < de - 0.05 || t > ate + 0.3) return null;
    const e = mola(t, de, 15, 170);
    const s = prog(t, ate, 0.28, saida);
    return {
      opacity: e * (1 - s),
      translate: `0px ${(1 - e) * dy}px`,
      scale: String((0.88 + 0.12 * e) * (1 + 0.2 * s)),
      filter: `blur(${10 * (1 - e) + 15 * s}px)`,
    };
  };
};

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

// Cartão escuro padrão das cenas.
export const caixa: React.CSSProperties = {
  borderRadius: 40, background: 'linear-gradient(180deg, rgba(25,42,92,.97), rgba(14,24,58,.97))',
  border: '3px solid rgba(62,198,255,.35)', boxShadow: '0 40px 90px rgba(0,0,0,.55)',
};
