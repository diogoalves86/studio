import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check, Dedo, Seta} from './Icones';
import {M} from './marcas';
import {ARQ, clamp, COR, INTER, MONT, Pilula, prog, saida, T, useMola, useT} from './tema';

// Trecho 4: o segredo, o crescimento e o CTA. Cena toda animada.

const Segredo: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const s1 = mola(t, M.segredo, 12, 200);
  const s2 = mola(t, M.mostrar);
  const s3 = mola(t, M.problema, 11, 180);
  const faixa = prog(t, M.logo, 0.45);
  const cabeca = interpolate(t, [M.logo, M.resolver], [0, 1], {...clamp, easing: saida});
  const pulso = 1 + 0.06 * Math.sin(Math.max(0, t - M.resolver) * 9) * (1 - prog(t, M.resolver, 0.6));
  const fora = prog(t, M.quer - 0.3, 0.25);
  if (t > M.quer) return null;

  return (
    <AbsoluteFill style={{opacity: 1 - fora, scale: String(1 + 0.18 * fora), filter: `blur(${14 * fora}px)`, fontFamily: MONT, textAlign: 'center'}}>
      <div style={{position: 'absolute', top: 320, left: 0, right: 0, fontWeight: 900, fontSize: 132, color: COR.branco, letterSpacing: 2, opacity: s1, scale: String(0.7 + 0.3 * s1)}}>
        O SEGREDO
      </div>
      <div style={{position: 'absolute', top: 490, left: 0, right: 0, fontWeight: 700, fontSize: 60, color: COR.cinza, opacity: s2, translate: `0px ${(1 - s2) * 40}px`}}>
        é mostrar logo de cara
      </div>
      <div style={{position: 'absolute', top: 570, left: 0, right: 0, opacity: s3, scale: String(0.6 + 0.4 * s3)}}>
        <span style={{fontWeight: 700, fontSize: 62, color: COR.branco, marginRight: 18}}>o</span>
        <span style={{fontWeight: 900, fontSize: 138, color: COR.ciano, textShadow: '0 0 50px rgba(62,198,255,.55)'}}>PROBLEMA</span>
      </div>

      {/* Linha do tempo do vídeo: os primeiros 3 s acendem. */}
      <div style={{position: 'absolute', top: 930, left: 90, right: 90, opacity: Math.min(1, faixa * 3)}}>
        <div style={{position: 'relative', height: 90}}>
          <div style={{position: 'absolute', left: 0, bottom: 0, scale: String(pulso), transformOrigin: 'left bottom'}}>
            <Pilula cor={COR.ciano} tamanho={34} fundo="rgba(10,40,70,.9)">PRIMEIROS 3s</Pilula>
          </div>
        </div>
        <div style={{position: 'relative', height: 36, marginTop: 18, borderRadius: 18, background: 'rgba(255,255,255,.12)', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${20 * faixa}%`, background: COR.ciano, boxShadow: '0 0 30px rgba(62,198,255,.9)'}} />
        </div>
        <div style={{position: 'absolute', top: 99, left: `calc(${20 * cabeca}% - 16px)`, width: 32, height: 54, borderRadius: 10, background: COR.branco, boxShadow: '0 4px 14px rgba(0,0,0,.4)'}} />
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20, fontFamily: INTER, fontWeight: 600, fontSize: 32, color: COR.cinza}}>
          <span>0s</span>
          <span>15s</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Crescimento: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const entra = mola(t, M.quer - 0.25, 16, 160);
  const titulo = mola(t, M.conteudos);
  const linha = t < M.crescer ? 0.5 * prog(t, M.conteudos, M.crescer - M.conteudos) : 0.5 + 0.5 * prog(t, M.crescer, 0.55, saida);
  const cresce = mola(t, M.crescer, 12, 180);
  const fora = prog(t, M.segue - 0.22, 0.2);
  if (t < M.quer - 0.25 || t > M.segue) return null;

  const caminho = 'M 30 400 C 120 380, 170 410, 250 370 S 380 360, 440 330 S 520 300, 560 290 C 640 240, 700 120, 790 40';
  return (
    <div
      style={{
        position: 'absolute', left: 70, right: 70, top: 330, height: 820, borderRadius: 44, padding: 50, boxSizing: 'border-box',
        background: 'linear-gradient(180deg, rgba(25,42,92,.96), rgba(16,28,64,.96))', border: '3px solid rgba(62,198,255,.35)',
        boxShadow: '0 40px 90px rgba(0,0,0,.55)',
        opacity: entra * (1 - fora), scale: String((0.85 + 0.15 * entra) * (1 + 0.15 * fora)), filter: `blur(${12 * (1 - entra) + 14 * fora}px)`,
      }}
    >
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco, opacity: titulo, translate: `0px ${(1 - titulo) * 30}px`}}>
        CONTEÚDOS <span style={{color: COR.ciano}}>MELHORES</span>
      </div>
      <svg width={840} height={480} viewBox="0 0 820 440" style={{marginTop: 60}}>
        {[80, 180, 280, 380].map((y) => (
          <line key={y} x1={0} x2={820} y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeWidth={2} />
        ))}
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2EE59D" stopOpacity={0.35} />
            <stop offset="1" stopColor="#2EE59D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={`${caminho} L 790 440 L 30 440 Z`} fill="url(#area)" opacity={linha} />
        <path d={caminho} pathLength={1} fill="none" stroke={COR.verde} strokeWidth={10} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} />
        <circle cx={790} cy={40} r={18 * cresce} fill={COR.verde} />
      </svg>
      <div style={{position: 'absolute', right: 50, top: 170, opacity: cresce, scale: String(0.6 + 0.4 * cresce), transformOrigin: 'right center'}}>
        <Pilula cor={COR.verde} tamanho={42} fundo="rgba(10,50,40,.9)">
          <Seta tamanho={44} cor={COR.verde} />CRESCER
        </Pilula>
      </div>
    </div>
  );
};

const TOPICOS = ['GANCHOS', 'ROTEIRO', 'CRESCIMENTO'];

const Perfil: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const entra = mola(t, M.segue, 15, 170);
  const dedoO = interpolate(t, [M.segue + 0.1, M.segue + 0.2, M.digo + 0.35, M.digo + 0.55], [0, 1, 1, 0], clamp);
  const dedoY = interpolate(t, [M.segue + 0.1, M.digo], [1250, 905], {...clamp, easing: saida});
  const aperta = interpolate(t, [M.digo, M.digo + 0.08, M.digo + 0.18], [1, 0.9, 1], clamp);
  const onda = prog(t, M.digo + 0.04, 0.5, saida);
  const seguindo = t >= M.digo + 0.08;
  const empurra = interpolate(t, [M.segue, T.fim], [1, 1.04], clamp);
  if (t < M.segue) return null;

  return (
    <AbsoluteFill style={{scale: String(empurra)}}>
      <div
        style={{
          position: 'absolute', left: 80, right: 80, top: 330, borderRadius: 48, padding: '56px 56px 60px',
          background: '#FFFFFF', boxShadow: '0 40px 100px rgba(0,0,0,.55)', textAlign: 'center',
          opacity: entra, translate: `0px ${(1 - entra) * 260}px`, scale: String(0.88 + 0.12 * entra), filter: `blur(${12 * (1 - entra)}px)`,
        }}
      >
        <div style={{width: 236, height: 236, margin: '0 auto', borderRadius: 999, padding: 8, background: 'linear-gradient(135deg, #2F7BFF, #1FB5E8 50%, #2EE59D)'}}>
          <Img src={ARQ.logo} style={{width: '100%', height: '100%', borderRadius: 999, border: '6px solid #fff', boxSizing: 'border-box', objectFit: 'cover', background: '#000'}} />
        </div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 70, color: COR.marinho, marginTop: 30}}>Digo Social</div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 40, color: '#5B6785', marginTop: 4}}>@digo.social</div>
        <div
          style={{
            position: 'relative', overflow: 'hidden', marginTop: 44, height: 112, borderRadius: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
            background: seguindo ? '#EEF1F7' : COR.azul, scale: String(aperta),
            fontFamily: MONT, fontWeight: 800, fontSize: 48, color: seguindo ? COR.marinho : COR.branco,
          }}
        >
          <div
            style={{
              position: 'absolute', left: '50%', top: '50%', width: 900, height: 900, borderRadius: 999,
              translate: '-50% -50%', scale: String(onda), opacity: 0.35 * (1 - onda), background: COR.azul,
            }}
          />
          {seguindo ? (
            <>
              Seguindo <Check tamanho={46} cor={COR.marinho} />
            </>
          ) : (
            'Seguir'
          )}
        </div>
      </div>
      <Dedo tamanho={150} style={{position: 'absolute', left: 560, top: dedoY, opacity: dedoO, scale: String(aperta)}} />

      <div style={{position: 'absolute', top: 1110, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18}}>
        {TOPICOS.map((txt, i) => {
          const c = mola(t, M.dicas + i * 0.14);
          return (
            <Pilula key={txt} cor={COR.ciano} tamanho={34} fundo="rgba(10,30,70,.9)" style={{opacity: c, translate: `0px ${(1 - c) * 50}px`}}>
              {txt}
            </Pilula>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const CenaSegredo: React.FC = () => {
  const t = useT(T.segredo);
  return (
    <AbsoluteFill>
      <Segredo t={t} />
      <Crescimento t={t} />
      <Perfil t={t} />
    </AbsoluteFill>
  );
};
