import React from 'react';

// Ícones extras dos destaques (os básicos vêm de ../reels-avatar/Icones).
type P = {cor?: string; tamanho?: number; style?: React.CSSProperties};
const svg = (tamanho: number, style: React.CSSProperties | undefined, filhos: React.ReactNode) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style} fill="none" strokeLinecap="round" strokeLinejoin="round">
    {filhos}
  </svg>
);

export const Maleta: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) =>
  svg(tamanho, style, (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" stroke={cor} strokeWidth={2.2} />
      <path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 12.5h18" stroke={cor} strokeWidth={2.2} />
    </>
  ));

export const Loja: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) =>
  svg(tamanho, style, (
    <>
      <path d="M4 9.5V20h16V9.5M3 9.5l1.6-5h14.8l1.6 5a3 3 0 01-5.5 1.6A3 3 0 0112 12.5a3 3 0 01-3.5-1.4A3 3 0 013 9.5z" stroke={cor} strokeWidth={2.1} />
      <path d="M10 20v-5h4v5" stroke={cor} strokeWidth={2.1} />
    </>
  ));

export const Grafico: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) =>
  svg(tamanho, style, (
    <>
      <path d="M4 20V4M4 20h16" stroke={cor} strokeWidth={2.2} />
      <path d="M7.5 15l4-4.5 3 3L20 7" stroke={cor} strokeWidth={2.4} />
    </>
  ));

export const Cadeado: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) =>
  svg(tamanho, style, (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke={cor} strokeWidth={2.2} />
      <path d="M8 10.5V8a4 4 0 018 0v2.5" stroke={cor} strokeWidth={2.2} />
    </>
  ));

export const Cartao: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) =>
  svg(tamanho, style, (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke={cor} strokeWidth={2.2} />
      <path d="M3 10h18M7 15h4" stroke={cor} strokeWidth={2.2} />
    </>
  ));
