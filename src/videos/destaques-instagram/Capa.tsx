import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import {ARQ, COR, MONT} from './tema';

// Capas dos destaques (1080×1920). O Instagram recorta um círculo no centro: o ícone fica dentro de ~600 px.

const Ciclo: React.FC = () => (
  <svg width={340} height={340} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12a8 8 0 01-13.7 5.6M4 12a8 8 0 0113.7-5.6" />
    <path d="M18 2.8v4h-4M6 21.2v-4h4" />
    <circle cx="12" cy="12" r="2.4" fill="#fff" stroke="none" />
  </svg>
);

const Pessoas: React.FC = () => (
  <svg width={360} height={360} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.8 20c.6-3.6 3.1-5.6 6.2-5.6s5.6 2 6.2 5.6" />
    <circle cx="17" cy="9" r="2.6" />
    <path d="M16.4 14.4c2.6.1 4.3 1.9 4.8 4.8" />
  </svg>
);

const Sete: React.FC = () => (
  <div style={{textAlign: 'center', fontFamily: MONT, fontWeight: 900, color: COR.branco, lineHeight: 0.85}}>
    <div style={{fontSize: 330}}>7</div>
    <div style={{fontSize: 74, letterSpacing: 4}}>DIAS</div>
  </div>
);

export const Capa: React.FC<{n: 1 | 2 | 3 | 4}> = ({n}) => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #13214A 0%, #0A1430 45%, #000 100%)', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{width: 640, height: 640, borderRadius: 999, padding: 14, background: 'linear-gradient(135deg, #2F7BFF, #1FB5E8 50%, #2EE59D)', boxShadow: '0 0 120px rgba(31,181,232,.35)'}}>
      <div style={{width: '100%', height: '100%', borderRadius: 999, background: 'radial-gradient(circle at 40% 30%, #1B3170, #0A1430 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {n === 1 && <Img src={ARQ.logo} style={{width: 380, height: 380, borderRadius: 90}} />}
        {n === 2 && <Ciclo />}
        {n === 3 && <Pessoas />}
        {n === 4 && <Sete />}
      </div>
    </div>
  </AbsoluteFill>
);
