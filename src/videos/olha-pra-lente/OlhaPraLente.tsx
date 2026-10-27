import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 029 · Esse erro faz quem assiste sentir que você não está falando com ele.
// Quem grava olhando pra tela (pro próprio rosto) desvia o olhar da lente. Abertura (o olhar vai pra tela) → o porquê:
// a lente fica em cima e o olho desce; quem assiste sente que não é com ele e passa pro próximo → dica 1: marquinha do
// lado da lente → dica 2: falar com a lente como se fosse um cliente → agora é com ele → CTA. Sem crédito extra.

const T = TRECHOS;
const M = {
  voce: em('você'),
  falando: em('falando'),
  erro2: em('erro', T.meio),
  tela: em('tela', T.meio),
  rosto: em('rosto'),
  camera: em('câmera'),
  cima: em('cima'),
  baixo: em('baixo'),
  quem2: em('quem', T.meio),
  parece: em('parece'),
  outra: em('outra'),
  passa: em('passa'),
  proximo: em('próximo'),
  primeira: em('primeira'),
  marquinha: em('marquinha'),
  lente: em('lente'),
  adesivo: em('adesivo'),
  setinha: em('setinha'),
  aqui: em('aqui'),
  segunda: em('segunda'),
  lente2: em('lente', em('segunda')),
  cliente: em('cliente'),
  conversa: em('conversa'),
  pronto: em('pronto'),
  agora: em('agora'),
  sente: em('sente', em('pronto')),
  segue: em('segue', T.b),
  digo: em('digo', T.b),
  toda: em('toda', T.b),
};

// ---------- Peças comuns ----------


const Titulo: React.FC<{t: number; de: number; cor?: string; top?: number; tamanho?: number; children: React.ReactNode}> = ({t, de, cor = COR.branco, top = 440, tamanho = 60, children}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: tamanho, lineHeight: 1.08, color: cor, opacity: e, scale: String(0.7 + 0.3 * e), textShadow: '0 8px 30px rgba(0,0,0,.5)'}}>
      {children}
    </div>
  );
};

const Grade: React.FC<{t: number}> = ({t}) => {
  const o = prog(t, T.meio, 0.4) * (1 - prog(t, T.b - 0.3, 0.3));
  if (o <= 0) return null;
  return <AbsoluteFill style={{opacity: 0.22 * o, backgroundImage: 'radial-gradient(rgba(62,198,255,.9) 2px, transparent 2.5px)', backgroundSize: '54px 54px', backgroundPosition: `${(t * 8) % 54}px ${(t * 14) % 54}px`, maskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 75%)'}} />;
};

const falando = (t: number) => PALAVRAS.some((p) => t >= p.s - 0.03 && t < p.e + 0.04);

const CardVoz: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const entra = mola(t, T.meio + 0.15, 14, 180);
  const sai = prog(t, T.b - 0.35, 0.25);
  if (t < T.meio || entra * (1 - sai) <= 0.001) return null;
  const voz = falando(t) ? 1 : 0.15;
  return (
    <div style={{position: 'absolute', left: 64, right: 64, top: 262, height: 130, display: 'flex', alignItems: 'center', gap: 26, opacity: entra * (1 - sai), translate: `0px ${(1 - entra) * -60}px`, zIndex: 6}}>
      <div style={{position: 'relative', width: 124, height: 124, flexShrink: 0}}>
        <div style={{position: 'absolute', inset: -8, borderRadius: 99, border: `5px solid ${COR.ciano}`, opacity: 0.35 + 0.65 * voz, scale: String(1 + 0.06 * voz * Math.abs(Math.sin(t * 9)))}} />
        <Img src={ARQ.luisa} style={{width: 124, height: 124, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%'}} />
      </div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>Luísa</div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 28, color: COR.cinza}}>@digo.social</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 9, height: 90}}>
        {Array.from({length: 9}, (_, i) => {
          const a = 0.35 + 0.65 * Math.abs(Math.sin(t * (7 + i * 1.7) + i * 1.3));
          return <div key={i} style={{width: 11, borderRadius: 99, height: 14 + 70 * a * voz, background: i % 2 ? COR.ciano : COR.azul}} />;
        })}
      </div>
    </div>
  );
};

const SeloDica: React.FC<{t: number; de: number; n: number}> = ({t, de, n}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 230);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 430, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${-4 + (1 - e) * 10}deg`}}>
      <Pilula cor={COR.ciano} tamanho={54} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">DICA {n}</Pilula>
    </div>
  );
};

const Carimbo: React.FC<{t: number; de: number; cor: string; tamanho?: number; rot?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, tamanho = 56, rot = -8, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 9, 260);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.4, 1])), rotate: `${rot + (1 - e) * 14}deg`, ...style}}>
      <div style={{padding: `${tamanho * 0.2}px ${tamanho * 0.5}px`, border: `${tamanho * 0.1}px solid ${cor}`, borderRadius: 14, fontFamily: MONT, fontWeight: 900, fontSize: tamanho, color: cor, background: 'rgba(10,10,20,.82)', letterSpacing: 2, whiteSpace: 'nowrap', boxShadow: `0 0 40px ${cor}66`}}>{children}</div>
    </div>
  );
};

const Etiqueta: React.FC<{t: number; de: number; cor: string; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), zIndex: 4, ...style}}>
      <div style={{padding: '12px 20px', borderRadius: 18, background: 'rgba(8,16,44,.95)', border: `4px solid ${cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.branco, whiteSpace: 'nowrap', boxShadow: `0 0 30px ${cor}55`}}>{children}</div>
    </div>
  );
};

// ---------- O olhar visto de lado: cabeça, celular, lente e tela ----------

// `alvo` leva o olhar da tela (0) para a lente (1); `guia` mostra a linha tracejada até a lente; `arco` pinta o ângulo
// entre as duas; `lente` faz a lente pulsar; `cliente` põe o card da cliente fiel em cima da lente.
const OLHO = {x: 325, y: 300};
const LENTE = {x: 690, y: 150};
const TELA_P = {x: 690, y: 380};

const PerfilOlhar: React.FC<{t: number; alvo?: number; linha?: number; guia?: number; arco?: number; lente?: number; cliente?: number; style?: React.CSSProperties}> = ({t, alvo = 0, linha = 1, guia = 0, arco = 0, lente = 0, cliente = 0, style}) => {
  const ax = TELA_P.x, ay = interpolate(alvo, [0, 1], [TELA_P.y, LENTE.y]);
  const dx = ax - OLHO.x, dy = ay - OLHO.y, d = Math.hypot(dx, dy);
  const cor = alvo > 0.5 ? COR.verde : COR.vermelho;
  const fim = {x: OLHO.x + dx * linha, y: OLHO.y + dy * linha};
  const pulso = lente * (0.5 + 0.5 * Math.abs(Math.sin(t * 6)));
  // arco entre a direção da lente e a da tela, raio 130
  const r = 130;
  const ang = (p: {x: number; y: number}) => Math.atan2(p.y - OLHO.y, p.x - OLHO.x);
  const a1 = ang(LENTE), a2 = ang(TELA_P);
  const p1 = {x: OLHO.x + r * Math.cos(a1), y: OLHO.y + r * Math.sin(a1)};
  const p2 = {x: OLHO.x + r * Math.cos(a2), y: OLHO.y + r * Math.sin(a2)};
  return (
    <div style={{position: 'absolute', width: 900, height: 640, ...style}}>
      <svg width={900} height={640} viewBox="0 0 900 640" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        {/* cabeça de perfil, olhando pra direita */}
        <circle cx={205} cy={265} r={175} fill="#1C1210" />
        <circle cx={120} cy={190} r={70} fill="#1C1210" />
        <rect x={150} y={420} width={110} height={120} rx={30} fill="#6B3F26" />
        <path d="M 60 640 Q 70 520 205 510 Q 340 520 360 640 Z" fill={COR.azul} />
        <ellipse cx={250} cy={330} rx={130} ry={150} fill="#7A4A2E" />
        <path d="M 372 318 L 405 365 L 372 378 Z" fill="#7A4A2E" />
        <path d="M 340 418 Q 358 428 372 420" stroke="#3A1E12" strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 300 272 Q 325 258 352 270" stroke="#1C1210" strokeWidth={9} fill="none" strokeLinecap="round" />
        <ellipse cx={OLHO.x} cy={OLHO.y} rx={22} ry={15} fill="#fff" />
        <circle cx={OLHO.x + (dx / d) * 9} cy={OLHO.y + (dy / d) * 7} r={9} fill="#1C1210" />
        {/* celular de lado: lente em cima, tela no meio */}
        <rect x={680} y={110} width={48} height={440} rx={16} fill="#1B2238" stroke="#3A4566" strokeWidth={4} />
        <rect x={676} y={170} width={8} height={360} rx={4} fill="rgba(62,198,255,.5)" />
        {lente > 0.01 && <circle cx={LENTE.x - 4} cy={LENTE.y} r={20 + 22 * pulso} fill="none" stroke={COR.verde} strokeWidth={5} opacity={lente * (1 - 0.6 * pulso)} />}
        <circle cx={LENTE.x - 4} cy={LENTE.y} r={13} fill="#05070C" stroke={COR.ciano} strokeWidth={4} />
        <text x={752} y={LENTE.y + 12} fontFamily={MONT} fontWeight={900} fontSize={34} fill={lente > 0.01 ? COR.verde : COR.branco}>LENTE</text>
        <text x={752} y={TELA_P.y + 12} fontFamily={MONT} fontWeight={900} fontSize={34} fill={COR.branco}>TELA</text>
        {/* ângulo do erro */}
        {arco > 0.01 && <path d={`M ${OLHO.x} ${OLHO.y} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} Z`} fill={`rgba(255,77,94,${0.4 * arco})`} stroke={COR.vermelho} strokeWidth={4} opacity={arco} />}
        {/* linha-guia até a lente */}
        {guia > 0.01 && <line x1={OLHO.x} y1={OLHO.y} x2={LENTE.x - 20} y2={LENTE.y} stroke={COR.verde} strokeWidth={6} strokeDasharray="16 14" opacity={guia} />}
        {/* o olhar */}
        {linha > 0.01 && (
          <>
            <line x1={OLHO.x + 24} y1={OLHO.y} x2={fim.x - 14} y2={fim.y} stroke={cor} strokeWidth={10} strokeLinecap="round" style={{filter: `drop-shadow(0 0 12px ${cor})`}} />
            <circle cx={fim.x - 14} cy={fim.y} r={12} fill={cor} />
          </>
        )}
      </svg>
      {cliente > 0.01 && (
        <div style={{position: 'absolute', left: 440, top: -30, opacity: cliente, scale: String(interpolate(cliente, [0, 1], [0.6, 1])), transformOrigin: '80% 100%'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 22, background: 'rgba(255,255,255,.96)', boxShadow: '0 16px 40px rgba(0,0,0,.45)'}}>
            <span style={{fontSize: 46}}>👩🏽‍🦱</span>
            <div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.marinho}}>Dona Marta</div>
              <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 21, color: '#C2185B'}}>cliente fiel ❤️</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- Rostinho de frente: `olhar` 0 = olhando pra baixo (pra tela), 1 = direto pra quem assiste ----------

const Rostinho: React.FC<{olhar: number; w?: number}> = ({olhar, w = 360}) => {
  const baixo = 1 - olhar;
  const olho = (cx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={108} rx={14} ry={10} fill="#fff" />
      <circle cx={cx + 3 * baixo} cy={108 + 5 * baixo} r={6.5} fill="#1C1210" />
      <rect x={cx - 16} y={96} width={32} height={22 * 0.45 * baixo} fill="#7A4A2E" />
    </g>
  );
  return (
    <svg width={w} height={w * 1.1} viewBox="0 0 200 220">
      <circle cx={100} cy={82} r={86} fill="#1C1210" />
      <circle cx={34} cy={66} r={34} fill="#1C1210" />
      <circle cx={166} cy={66} r={34} fill="#1C1210" />
      <path d="M 10 220 Q 20 170 100 166 Q 180 170 190 220 Z" fill={COR.azul} />
      <rect x={84} y={150} width={32} height={26} fill="#6B3F26" />
      <ellipse cx={100} cy={112} rx={58} ry={66} fill="#7A4A2E" />
      <path d={`M 62 ${90 + 3 * baixo} Q 76 ${84 + 3 * baixo} 90 ${90 + 3 * baixo}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M 110 ${90 + 3 * baixo} Q 124 ${84 + 3 * baixo} 138 ${90 + 3 * baixo}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      {olho(76)}
      {olho(124)}
      <path d="M 96 120 Q 100 134 106 130" stroke="#5A3220" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={`M 80 146 Q 100 ${152 + 6 * olhar} 120 146`} stroke="#3A1E12" strokeWidth={5} fill="none" strokeLinecap="round" />
    </svg>
  );
};

// ---------- O que quem assiste vê: o Reels no feed ----------

const Feed: React.FC<{t: number; olhar: number; rolar?: number; verde?: number; style?: React.CSSProperties}> = ({t, olhar, rolar = 0, verde = 0, style}) => {
  const w = 440, h = w * 16 / 9;
  const brilho = verde * (0.6 + 0.4 * Math.abs(Math.sin(t * 4)));
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44, border: `10px solid ${verde > 0.01 ? COR.verde : '#1B2238'}`, background: '#0B0F18', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${70 * brilho}px rgba(46,229,157,${0.7 * brilho})`, ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -h * rolar, height: h * 2}}>
        {/* o vídeo de quem gravou */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: h, background: 'linear-gradient(180deg, #2B3550, #1A2238)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden'}}>
          <Rostinho olhar={olhar} w={400} />
          <div style={{position: 'absolute', left: 18, bottom: 40, display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{width: 40, height: 40, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22}}>🏪</div>
            <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.6)'}}>sua.lojinha</span>
          </div>
          <div style={{position: 'absolute', right: 14, bottom: 120, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center'}}>
            {['♡', '💬', '➤'].map((i) => <div key={i} style={{fontSize: 38, color: '#fff', lineHeight: 1}}>{i}</div>)}
          </div>
        </div>
        {/* o próximo vídeo do feed */}
        <div style={{position: 'absolute', left: 0, right: 0, top: h, height: h, background: 'linear-gradient(160deg, #FF6FA3, #8A3FFC)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16}}>
          <div style={{fontSize: 150}}>🍰</div>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#fff'}}>outro vídeo</div>
        </div>
      </div>
    </div>
  );
};

// ---------- O celular de frente: lente em cima, a Luísa na tela ----------

const CelularFrente: React.FC<{t: number; lente?: number; adesivo?: number; seta?: number; style?: React.CSSProperties}> = ({t, lente = 0, adesivo = 0, seta = 0, style}) => {
  const w = 440, h = w * 16 / 9, topo = 78;
  const pulso = lente * (0.5 + 0.5 * Math.abs(Math.sin(t * 6)));
  const rec = Math.floor(t * 2) % 2 === 0;
  const mola = (x: number) => interpolate(x, [0, 1], [2.2, 1]);
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 46, border: '10px solid #1B2238', background: '#05070C', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      {/* a tela: a Luísa se vendo */}
      <div style={{position: 'absolute', left: 0, right: 0, top: topo, bottom: 0, overflow: 'hidden', background: 'linear-gradient(180deg, #2B3550, #1A2238)'}}>
        <Img src={ARQ.luisa} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%', opacity: 0.85}} />
        <div style={{position: 'absolute', left: 14, top: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 99, background: 'rgba(0,0,0,.55)'}}>
          <div style={{width: 14, height: 14, borderRadius: 99, background: rec ? '#FF3B30' : 'rgba(255,59,48,.35)'}} />
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#fff'}}>REC</span>
        </div>
      </div>
      {/* a lente */}
      <div style={{position: 'absolute', left: w / 2 - 10 - 20, top: topo / 2 - 20, width: 40, height: 40, borderRadius: 99, background: 'radial-gradient(circle at 35% 35%, #4A5A8A, #05070C 60%)', border: `3px solid ${COR.ciano}`, boxShadow: `0 0 ${40 * pulso}px ${14 * pulso}px rgba(46,229,157,${0.7 * lente})`}} />
      {adesivo > 0.01 && <div style={{position: 'absolute', left: w / 2 + 26, top: topo / 2 - 32, fontSize: 56, lineHeight: 1, opacity: Math.min(1, adesivo * 2), scale: String(mola(adesivo)), rotate: `${-12 + (1 - adesivo) * 30}deg`}}>⭐</div>}
      {seta > 0.01 && <div style={{position: 'absolute', left: w / 2 - 128, top: topo / 2 - 30, fontSize: 56, lineHeight: 1, opacity: Math.min(1, seta * 2), translate: `${-40 * (1 - seta) + 8 * Math.sin(t * 8)}px 0px`}}>👉</div>}
    </div>
  );
};

const PALCO = {left: 320, top: 540};

// ---------- Abertura: o olhar vai pra tela, não pra lente ----------

// O clipe fica artificial em «assiste sentir que» (1,52–1,97 s): a abertura cobre até «você».
const A0 = M.voce - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <PerfilOlhar t={t} linha={prog(t, 0.15, 0.4, saida)} lente={prog(t, 0.5, 0.3)} style={{left: 90, top: 620}} />
    </AbsoluteFill>
  );
};

const Alerta: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio + 0.2) return null;
  const e = mola(t, 0, 12, 200) * (1 - prog(t, T.meio - 0.15, 0.3));
  const pulso = 0.55 + 0.45 * Math.abs(Math.sin(t * 7));
  const texto = mola(t, 0.05, 11, 220);
  return (
    <>
      <AbsoluteFill style={{pointerEvents: 'none', boxShadow: `inset 0 0 ${140 * pulso}px rgba(255,40,60,${0.7 * e})`, border: `${8 * e}px solid rgba(255,77,94,${0.8 * pulso * e})`}} />
      <div style={{position: 'absolute', left: 40, right: 40, top: 270, textAlign: 'center', opacity: texto * (1 - prog(t, T.meio - 0.15, 0.3)), scale: String(interpolate(texto, [0, 1], [1.6, 1])), zIndex: 7}}>
        <div style={{display: 'inline-block', padding: '14px 26px', borderRadius: 24, background: 'rgba(20,4,8,.88)', border: `4px solid ${COR.vermelho}`, boxShadow: `0 0 ${40 * pulso}px rgba(255,77,94,.6)`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 58, lineHeight: 1.08, color: COR.branco}}>
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>👀</span> O SEU OLHAR<br />TÁ NO <span style={{color: COR.vermelho}}>LUGAR ERRADO</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Peito: React.FC<{t: number}> = ({t}) => {
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = 1 - prog(t, T.meio - 0.15, 0.25);
  return (
    <div style={{opacity: e}}>
      <Carimbo t={t} de={M.falando - 0.1} cor={COR.vermelho} tamanho={60} rot={-6} style={{left: 190, top: 1530}}>NÃO É COM VOCÊ ✕</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['⭐ MARQUINHA NA LENTE', '💬 FALA COM UM CLIENTE'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): o olho desce pra tela ----------

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.meio, M.quem2 - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={52}>O ERRO: <span style={{color: COR.vermelho}}>OLHAR PRA TELA</span></Titulo>
      <PerfilOlhar t={t} linha={prog(t, M.tela - 0.15, 0.4, saida)} lente={prog(t, M.camera - 0.1, 0.3)} guia={prog(t, M.cima - 0.1, 0.4)} arco={prog(t, M.baixo - 0.2, 0.4)} style={{left: 90, top: 640}} />
      <Etiqueta t={t} de={M.rosto - 0.1} cor={COR.vermelho} style={{left: 640, top: 1150}}>📱 SEU ROSTO</Etiqueta>
      <Etiqueta t={t} de={M.baixo - 0.15} cor={COR.vermelho} style={{left: 60, top: 1150}}>↘️ OLHO PRA BAIXO</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): o que quem assiste sente ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.quem2 - 0.15, M.primeira - 0.15);
  if (!st) return null;
  const rolar = prog(t, M.passa - 0.05, 0.6, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quem2} top={440} tamanho={50}>O QUE <span style={{color: COR.ciano}}>QUEM ASSISTE</span> VÊ</Titulo>
      <Feed t={t} olhar={0} rolar={rolar} style={PALCO} />
      <Etiqueta t={t} de={M.parece - 0.1} cor={COR.amarelo} style={{left: 40, top: 620}}>🤔 tá falando com quem?</Etiqueta>
      {t < M.passa && <Carimbo t={t} de={M.outra - 0.1} cor={COR.vermelho} tamanho={56} rot={-7} style={{left: 230, top: 750}}>FALANDO COM QUEM?</Carimbo>}
      <Etiqueta t={t} de={M.proximo - 0.15} cor={COR.vermelho} style={{left: 790, top: 900}}>PRÓXIMO ⬆️</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Dica 1: uma marquinha do lado da lente ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <CelularFrente t={t} lente={prog(t, M.lente - 0.1, 0.3)} adesivo={prog(t, M.adesivo - 0.1, 0.35)} seta={prog(t, M.setinha - 0.1, 0.35)} style={PALCO} />
      <Etiqueta t={t} de={M.marquinha - 0.1} cor={COR.ciano} style={{left: 30, top: 760}}>⭐ MARQUINHA</Etiqueta>
      <Carimbo t={t} de={M.aqui - 0.25} cor={COR.verde} tamanho={56} rot={-5} style={{left: 250, top: 1080}}>O OLHO VAI AQUI ⬆️</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: fala com a lente como se fosse um cliente ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const alvo = prog(t, M.lente2 - 0.1, 0.6, suave);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <PerfilOlhar t={t} alvo={alvo} lente={prog(t, M.lente2 - 0.1, 0.3)} cliente={prog(t, M.cliente - 0.15, 0.35, saida)} style={{left: 90, top: 640}} />
      <Etiqueta t={t} de={M.conversa - 0.15} cor={COR.verde} style={{left: 60, top: 1150}}>💬 CONVERSA ✓</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Fecho: agora é com quem assiste ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.pronto - 0.15, T.b - 0.1);
  if (!st) return null;
  const olhar = prog(t, M.pronto, 0.5, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.agora - 0.1} top={440} tamanho={50}>AGORA <span style={{color: COR.verde}}>É COM ELE</span></Titulo>
      <Feed t={t} olhar={olhar} verde={prog(t, M.sente - 0.1, 0.3)} style={PALCO} />
      <Carimbo t={t} de={M.sente - 0.1} cor={COR.verde} tamanho={60} rot={-6} style={{left: 290, top: 750}}>É COM VOCÊ ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: seguir (mesmo CTA e mesmo clipe do 015) ----------

const B1 = M.segue + 0.2;
const B2 = M.toda - 0.2;

const CartaoResumo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.b, B1 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 820, padding: '34px 40px', borderRadius: 36, ...caixa, marginTop: -260}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>👀 OLHA PRA LENTE</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>⭐ Marquinha do lado da lente<br />💬 Fala com ela como se fosse um cliente</div>
      </div>
    </AbsoluteFill>
  );
};

const BotaoSeguir: React.FC<{seguindo: boolean; pop: number}> = ({seguindo, pop}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '24px 28px', borderRadius: 36, background: 'rgba(8,16,44,.94)', border: '3px solid rgba(62,198,255,.4)', boxShadow: '0 30px 80px rgba(0,0,0,.55)'}}>
    <Img src={ARQ.logo} style={{width: 100, height: 100, borderRadius: 99, flexShrink: 0}} />
    <div style={{flex: 1}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: COR.branco}}>digo.social</div>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>dicas pra crescer no Instagram</div>
    </div>
    <div style={{padding: '20px 30px', borderRadius: 20, fontFamily: INTER, fontWeight: 800, fontSize: 36, color: COR.branco, background: seguindo ? 'rgba(255,255,255,.14)' : COR.azul, scale: String(seguindo ? 0.9 + 0.1 * pop : 1), whiteSpace: 'nowrap'}}>
      {seguindo ? 'Seguindo ✓' : 'Seguir'}
    </div>
  </div>
);

const SeguirSobre: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < B1 - 0.05 || t >= B2) return null;
  const e = mola(t, B1, 12, 200);
  return (
    <>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1110, opacity: e, translate: `0px ${(1 - e) * 80}px`}}>
        <BotaoSeguir seguindo={t >= M.digo + 0.05} pop={mola(t, M.digo + 0.05, 9, 260)} />
      </div>
      <Toque t={t} de={B1 + 0.1} toque={M.digo} x={840} y={1170} />
    </>
  );
};

const TodaSemana: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, B2, T.fim + 0.2, 0);
  if (!st) return null;
  const e = mola(t, B2, 10, 220);
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{scale: String(interpolate(e, [0, 1], [1.6, 1])), rotate: `${-3 + (1 - e) * 8}deg`}}>
        <Pilula cor={COR.ciano} tamanho={60} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #3EC6FF)">TODA SEMANA TEM MAIS</Pilula>
      </div>
    </AbsoluteFill>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Grade t={t} />
      <Abertura t={t} />
      <Alerta t={t} />
      <Peito t={t} />
      <Porque1 t={t} />
      <Porque2 t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <Fecho t={t} />
      <CardVoz t={t} />
      <Marcador t={t} />
      <CartaoResumo t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'swoosh', em: 0, volume: 0.5},
  {som: 'whoosh_in', em: 0.15, volume: 0.45},
  {som: 'risco', em: 0.5, volume: 0.35},
  {som: 'impacto', em: M.falando - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.tela - 0.15, volume: 0.4},
  {som: 'pop', em: M.rosto - 0.1, volume: 0.35},
  {som: 'ding', em: M.camera - 0.1, volume: 0.4},
  {som: 'impacto', em: M.baixo - 0.2, volume: 0.5},
  {som: 'swoosh', em: M.quem2 - 0.15, volume: 0.4},
  {som: 'pop', em: M.parece - 0.1, volume: 0.35},
  {som: 'risco', em: M.outra - 0.1, volume: 0.5},
  {som: 'whoosh_out', em: M.passa - 0.05, volume: 0.5},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.marquinha - 0.1, volume: 0.4},
  {som: 'pop', em: M.adesivo - 0.1, volume: 0.45},
  {som: 'whoosh_in', em: M.setinha - 0.1, volume: 0.4},
  {som: 'ding', em: M.aqui - 0.25, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'swoosh', em: M.lente2 - 0.1, volume: 0.4},
  {som: 'pop', em: M.cliente - 0.15, volume: 0.45},
  {som: 'ding', em: M.conversa - 0.15, volume: 0.45},
  // Fecho
  {som: 'ding', em: M.sente - 0.1, volume: 0.55},
  // CTA
  {som: 'pop', em: T.b + 0.1, volume: 0.4},
  {som: 'swoosh', em: B1, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: B2, volume: 0.5},
];

export const CONFIG: Config = {
  palavras: PALAVRAS,
  trechos: T,
  estados: [
    // Até "você" a abertura (o olhar indo pra tela) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.falando - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {erro: COR.vermelho, tela: COR.vermelho, baixo: COR.vermelho, lente: COR.verde, cliente: COR.verde, ele: COR.verde},
  eventos: EVENTOS,
  Cena,
};
