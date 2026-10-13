import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Fundo} from './Fundo';
import {Play} from './Icones';
import {M} from './marcas';
import {ARQ, clamp, COR, INTER, MONT, Pilula, prog, saida, T, useMola, useT} from './tema';

// Trecho 1 (gancho): abre em motion ("Sabe por que muita gente passa direto"), o avatar entra em "pelo seu vídeo"
// e em "demora" vira card ao lado do cronômetro.

const CORES_FEED = [
  ['#3A2CB8', '#C2378A'],
  ['#0F7C8C', '#2F7BFF'],
  ['#D9663A', '#8A2BE2'],
  ['#1E8F5A', '#2F7BFF'],
  ['#B5304A', '#F2994A'],
];

// Celular com o feed rolando rápido para cima: o vídeo "passando direto".
const Celular: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const entra = mola(t, M.passa - 0.1, 15, 170);
  const rolar = Math.max(0, t - M.passa) * 2900;
  const selo = mola(t, M.direto, 10, 230);
  const ALT = 640;
  return (
    <div style={{position: 'absolute', left: '50%', top: 640, translate: `-50% ${(1 - entra) * 700}px`, opacity: entra, rotate: `${(1 - entra) * 8}deg`}}>
      <div style={{position: 'relative', width: 440, height: 800, borderRadius: 64, padding: 14, background: '#05070F', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 3px rgba(255,255,255,.18)'}}>
        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 52, overflow: 'hidden', background: '#0B1226'}}>
          {CORES_FEED.concat(CORES_FEED).map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute', left: 0, right: 0, top: i * ALT - (rolar % (ALT * CORES_FEED.length)), height: ALT - 10,
                background: `linear-gradient(160deg, ${c[0]}, ${c[1]})`, filter: `blur(${Math.min(6, rolar / 900)}px)`,
              }}
            >
              <div style={{position: 'absolute', left: '50%', top: '42%', translate: '-50% -50%', width: 110, height: 110, borderRadius: 99, background: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Play tamanho={64} />
              </div>
              <div style={{position: 'absolute', left: 30, right: 120, bottom: 80, height: 18, borderRadius: 9, background: 'rgba(255,255,255,.8)'}} />
              <div style={{position: 'absolute', left: 30, right: 200, bottom: 48, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.5)'}} />
            </div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: '50%', top: 330, translate: '-50% 0px', rotate: '-6deg', scale: String(interpolate(selo, [0, 1], [2, 1])), opacity: selo}}>
        <Pilula cor={COR.vermelho} tamanho={56} fundo="rgba(60,10,20,.92)" style={{border: `5px solid ${COR.vermelho}`}}>
          PASSA DIRETO
        </Pilula>
      </div>
    </div>
  );
};

const Abertura: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const sai = prog(t, M.pelo - 0.22, 0.3, saida);
  if (t > M.pelo + 0.1) return null;
  const palavra = (texto: string, s: number, cor: string = COR.branco) => {
    const m = mola(t, s, 12, 220);
    return (
      <span style={{display: 'inline-block', color: cor, opacity: m, scale: String(0.6 + 0.4 * m), translate: `0px ${(1 - m) * 40}px`, margin: '0 14px'}}>
        {texto}
      </span>
    );
  };
  return (
    <AbsoluteFill style={{opacity: 1 - sai, scale: String(1 + 0.25 * sai), filter: `blur(${16 * sai}px)`}}>
      <Fundo src={ARQ.apoioA} />
      <div style={{position: 'absolute', top: 280, left: 40, right: 40, textAlign: 'center', fontFamily: MONT, fontWeight: 900, lineHeight: 1.05}}>
        <div style={{fontSize: 104, whiteSpace: 'nowrap'}}>
          {palavra('SABE', M.sabe)}
          {palavra('POR', M.por)}
          {palavra('QUE', M.por + 0.2)}
        </div>
        <div style={{fontSize: 118, whiteSpace: 'nowrap', textShadow: '0 0 40px rgba(62,198,255,.45)'}}>
          {palavra('MUITA', M.muita, COR.ciano)}
          {palavra('GENTE', M.gente, COR.ciano)}
        </div>
      </div>
      <Celular t={t} />
    </AbsoluteFill>
  );
};

// "demora demais pra chegar no assunto": cronômetro grande em cima e texto à esquerda do card do avatar.
const Cronometro: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const entra = mola(t, M.demora - 0.1, 15, 170);
  const p = interpolate(t, [M.demora, M.assunto], [0, 1], clamp);
  const seg = Math.min(7, 1 + Math.floor(p * 6.999));
  const cor = p > 0.6 ? COR.vermelho : COR.ciano;
  const R = 160;
  const C = 2 * Math.PI * R;
  const l1 = mola(t, M.demora);
  const l2 = mola(t, M.demais, 10, 220);
  const l3 = mola(t, M.chegar - 0.16);
  const l4 = mola(t, M.assunto, 10, 220);
  if (t < M.demora - 0.2) return null;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: '50%', top: 260, translate: '-50% 0px', width: 420, height: 420, opacity: entra, scale: String(0.7 + 0.3 * entra)}}>
        <svg width={420} height={420} viewBox="0 0 420 420" style={{position: 'absolute', inset: 0, rotate: '-90deg'}}>
          <circle cx={210} cy={210} r={R} fill="rgba(10,20,48,.85)" stroke="rgba(255,255,255,.12)" strokeWidth={26} />
          <circle cx={210} cy={210} r={R} fill="none" stroke={cor} strokeWidth={26} strokeLinecap="round" strokeDasharray={`${C * p} ${C}`} style={{filter: `drop-shadow(0 0 18px ${cor})`}} />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 120, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>
          0:0{seg}
        </div>
      </div>
      <div style={{position: 'absolute', left: 64, top: 800, width: 520, fontFamily: MONT, fontWeight: 900, lineHeight: 1.0}}>
        <div style={{fontSize: 100, color: COR.branco, opacity: l1, translate: `${(1 - l1) * -60}px 0px`}}>DEMORA</div>
        <div style={{fontSize: 100, color: COR.vermelho, opacity: l2, scale: String(0.7 + 0.3 * l2), transformOrigin: 'left center', textShadow: '0 0 30px rgba(255,77,94,.5)'}}>DEMAIS</div>
        <div style={{marginTop: 26, fontFamily: INTER, fontWeight: 700, fontSize: 44, color: COR.cinza, opacity: l3}}>pra chegar no</div>
        <div style={{marginTop: 10, display: 'inline-block', padding: '6px 20px', borderRadius: 16, background: COR.vermelho, fontSize: 76, color: COR.branco, opacity: l4, scale: String(0.6 + 0.4 * l4), transformOrigin: 'left center'}}>
          ASSUNTO
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const CenaGancho: React.FC = () => {
  const t = useT(T.gancho);
  return (
    <AbsoluteFill>
      <Cronometro t={t} />
      <Abertura t={t} />
    </AbsoluteFill>
  );
};
