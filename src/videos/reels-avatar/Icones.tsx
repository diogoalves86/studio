import React from 'react';

type P = {cor?: string; tamanho?: number; style?: React.CSSProperties};

export const Check: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style}>
    <path d="M4 12.5l5 5L20 6.5" fill="none" stroke={cor} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Xis: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style}>
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke={cor} strokeWidth={3.4} strokeLinecap="round" />
  </svg>
);

export const Relogio: React.FC<P & {angulo?: number}> = ({cor = '#fff', tamanho = 40, angulo = 0, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style}>
    <circle cx="12" cy="13" r="8.5" fill="none" stroke={cor} strokeWidth={2.4} />
    <path d="M9.5 2.5h5" stroke={cor} strokeWidth={2.4} strokeLinecap="round" />
    <line x1="12" y1="13" x2="12" y2="7.5" stroke={cor} strokeWidth={2.4} strokeLinecap="round" transform={`rotate(${angulo} 12 13)`} />
  </svg>
);

export const Olho: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" fill="none" stroke={cor} strokeWidth={2.2} />
    <circle cx="12" cy="12" r="3.2" fill={cor} />
  </svg>
);

export const Play: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style}>
    <path d="M8 5.5v13l10.5-6.5z" fill={cor} />
  </svg>
);

export const Seta: React.FC<P> = ({cor = '#fff', tamanho = 40, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" style={style}>
    <path d="M5 19L19 5M19 5h-9M19 5v9" fill="none" stroke={cor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Dedo que toca a tela (gesto de rolar e de seguir).
export const Dedo: React.FC<P> = ({cor = '#fff', tamanho = 120, style}) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 64 64" style={style}>
    <path
      d="M26 30V10a5 5 0 0110 0v16l12.5 3.2a5 5 0 013.7 5.6L50 50a10 10 0 01-9.9 8.6H30.5a10 10 0 01-7.4-3.3L12.6 43.6a4.6 4.6 0 016.5-6.5L26 43z"
      fill={cor}
      stroke="rgba(10,20,48,.55)"
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  </svg>
);
