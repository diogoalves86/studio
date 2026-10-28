import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 031 · Esse erro faz a pessoa passar antes de você falar a primeira palavra.
// O primeiro segundo do vídeo (apertar o REC, olhar pro celular, ajeitar o cabelo) é cara parada, e é ele que aparece
// no feed. Abertura (o feed passando o vídeo de cara parada) → o porquê → dica 1: sorrir antes do REC e falar junto →
// dica 2: cortar o comecinho → a pessoa fica → ponte: o Digo Social sugere, escreve a legenda e agenda; você só aprova →
// CTA de seguir. Sem crédito extra: o rosto, o feed, o editor e a tela do app são animação.

const T = TRECHOS;
const M = {
  pessoa: em('pessoa'),
  passar: em('passar'),
  antes: em('antes'),
  erro2: em('erro', T.meio),
  segundo: em('segundo', T.meio),
  aperta: em('aperta'),
  olha: em('olha'),
  ajeita: em('ajeita'),
  cabelo: em('cabelo'),
  sorri: em('sorri', T.meio),
  esse: em('esse', T.meio),
  parada: em('parada'),
  feed: em('feed'),
  rolando: em('rolando'),
  decide: em('decide'),
  passa: em('passa', T.meio),
  primeira: em('primeira', T.meio),
  sorrindo: em('sorrindo'),
  apertar: em('apertar'),
  fala: em('fala', em('sorrindo')),
  mesmo: em('mesmo', em('sorrindo')),
  segunda: em('segunda'),
  corta: em('corta'),
  comecinho: em('comecinho'),
  tira: em('tira'),
  video2: em('vídeo', T.meio),
  falando: em('falando', T.meio),
  pronto: em('pronto'),
  conversando: em('conversando'),
  gravar: em('gravar'),
  postar2: em('postar', em('gravar')),
  digo1: em('digo', T.meio),
  sugere: em('sugere'),
  escreve: em('escreve'),
  legenda: em('legenda'),
  agenda: em('agenda'),
  aplicativo: em('aplicativo'),
  aprova: em('aprova', em('agenda')),
  link: em('link'),
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
    <div style={{position: 'absolute', opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.4, 1])), rotate: `${rot + (1 - e) * 14}deg`, zIndex: 5, ...style}}>
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

const digitar = (t: number, de: number, ate: number, texto: string) => {
  const L = Array.from(texto);
  return L.slice(0, Math.round(interpolate(t, [de, ate], [0, L.length], clamp))).join('');
};
const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;

// ---------- O rosto ilustrado: `olhar` 0 = pro botão (pra baixo), 1 = pra quem assiste; `sorriso` 0 = cara parada,
// 1 = sorrindo; `mao` leva a mão até o cabelo ----------

const Rostinho: React.FC<{olhar: number; sorriso: number; mao?: number; w?: number}> = ({olhar, sorriso, mao = 0, w = 360}) => {
  const baixo = 1 - olhar;
  const s = sorriso;
  const olho = (cx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={108} rx={14} ry={10 - 2 * s} fill="#fff" />
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
      <path d={`M 62 ${90 + 3 * baixo - 4 * s} Q 76 ${84 + 3 * baixo - 4 * s} 90 ${90 + 3 * baixo - 4 * s}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M 110 ${90 + 3 * baixo - 4 * s} Q 124 ${84 + 3 * baixo - 4 * s} 138 ${90 + 3 * baixo - 4 * s}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      {olho(76)}
      {olho(124)}
      <path d="M 96 120 Q 100 134 106 130" stroke="#5A3220" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={66} cy={136} rx={10} ry={6} fill="#C0603F" opacity={0.45 * s} />
      <ellipse cx={134} cy={136} rx={10} ry={6} fill="#C0603F" opacity={0.45 * s} />
      <path d={`M 80 147 Q 100 ${147 + 26 * s} 120 147 Q 100 ${147 + 6 * s} 80 147 Z`} fill="#fff" stroke="#3A1E12" strokeWidth={4.5} strokeLinejoin="round" />
      {mao > 0.01 && (
        <g transform={`translate(${interpolate(mao, [0, 1], [10, 0])} ${interpolate(mao, [0, 1], [190, 0])})`}>
          <rect x={4} y={74} width={30} height={160} rx={14} fill="#7A4A2E" />
          <ellipse cx={22} cy={68} rx={22} ry={26} fill="#7A4A2E" />
          {[0, 1, 2].map((i) => <rect key={i} x={6 + i * 11} y={34 - (i === 1 ? 6 : 0)} width={10} height={30} rx={5} fill="#7A4A2E" />)}
        </g>
      )}
    </svg>
  );
};

// ---------- A tela: gravando (botão de REC) ou no feed (curtir, comentar, próximo vídeo) ----------

const Tela: React.FC<{
  t: number;
  modo: 'gravando' | 'feed';
  olhar: number;
  sorriso: number;
  mao?: number;
  rec?: boolean;
  seg?: number;
  segCor?: string;
  bolha?: number;
  rolar?: number;
  verde?: number;
  style?: React.CSSProperties;
}> = ({t, modo, olhar, sorriso, mao = 0, rec = false, seg, segCor = '#fff', bolha = 0, rolar = 0, verde = 0, style}) => {
  const w = 440, h = (w * 16) / 9;
  const brilho = verde * (0.6 + 0.4 * Math.abs(Math.sin(t * 4)));
  const pisca = Math.floor(t * 2) % 2 === 0;
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44, border: `10px solid ${verde > 0.01 ? COR.verde : '#1B2238'}`, background: '#0B0F18', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${70 * brilho}px rgba(46,229,157,${0.7 * brilho})`, ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -h * rolar, height: h * 2}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: h, background: 'linear-gradient(180deg, #2B3550, #1A2238)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden'}}>
          <Rostinho olhar={olhar} sorriso={sorriso} mao={mao} w={540} />
          {bolha > 0.01 && (
            <div style={{position: 'absolute', left: 40, top: 150, padding: '14px 22px', borderRadius: 26, borderBottomLeftRadius: 6, background: '#fff', fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.marinho, opacity: bolha, scale: String(interpolate(bolha, [0, 1], [0.5, 1])), transformOrigin: '0% 100%', boxShadow: '0 10px 30px rgba(0,0,0,.35)'}}>Oi, gente! 👋</div>
          )}
          {modo === 'feed' ? (
            <>
              <div style={{position: 'absolute', left: 18, bottom: 40, display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 40, height: 40, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22}}>🏪</div>
                <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.6)'}}>sua.lojinha</span>
              </div>
              <div style={{position: 'absolute', right: 14, bottom: 120, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center'}}>
                {['♡', '💬', '➤'].map((i) => <div key={i} style={{fontSize: 38, color: '#fff', lineHeight: 1}}>{i}</div>)}
              </div>
            </>
          ) : (
            <>
              <div style={{position: 'absolute', left: 14, top: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 99, background: 'rgba(0,0,0,.55)'}}>
                <div style={{width: 14, height: 14, borderRadius: 99, background: rec && pisca ? '#FF3B30' : 'rgba(255,59,48,.35)'}} />
                <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#fff'}}>REC</span>
              </div>
              <div style={{position: 'absolute', left: w / 2 - 10 - 44, bottom: 34, width: 88, height: 88, borderRadius: 99, border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: rec ? 34 : 66, height: rec ? 34 : 66, borderRadius: rec ? 8 : 99, background: '#FF3B30'}} />
              </div>
            </>
          )}
          {seg !== undefined && (
            <div style={{position: 'absolute', right: 14, top: 14, padding: '5px 14px', borderRadius: 99, background: 'rgba(0,0,0,.6)', fontFamily: MONT, fontWeight: 900, fontSize: 26, color: segCor}}>0:0{Math.min(9, Math.floor(seg))}</div>
          )}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: h, height: h, background: 'linear-gradient(160deg, #FF6FA3, #8A3FFC)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16}}>
          <div style={{fontSize: 150}}>🍰</div>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#fff'}}>outro vídeo</div>
        </div>
      </div>
    </div>
  );
};

const PALCO = {left: 320, top: 540};
const PALCO_D = {left: 600, top: 560};

// Dedo rolando o feed pra cima.
const DedoRola: React.FC<{t: number; de: number; x: number; y: number}> = ({t, de, x, y}) => {
  const f = prog(t, de, 0.55, suave);
  if (t < de - 0.2 || f >= 1) return null;
  const o = Math.min(prog(t, de - 0.2, 0.2), 1 - prog(t, de + 0.4, 0.15));
  return <div style={{position: 'absolute', left: x, top: y - 240 * f, fontSize: 90, opacity: o, zIndex: 6, rotate: '-10deg'}}>👆</div>;
};

// Lista à esquerda, com a linha da vez acesa.
const Passos: React.FC<{t: number; itens: {de: number; texto: string; cor: string}[]; top?: number}> = ({t, itens, top = 640}) => {
  const mola = useMola();
  const atual = itens.filter((it) => t >= it.de).length - 1;
  return (
    <div style={{position: 'absolute', left: 40, width: 540, top, display: 'flex', flexDirection: 'column', gap: 22}}>
      {itens.map((it, i) => {
        const e = mola(t, it.de, 11, 230);
        const on = i === atual;
        return (
          <div key={it.texto} style={{opacity: e * (on ? 1 : 0.6), translate: `${(1 - e) * -80}px 0px`, scale: String(on ? 1 : 0.94), transformOrigin: 'left center', padding: '16px 24px', borderRadius: 22, background: 'rgba(8,16,44,.94)', border: `4px solid ${on ? it.cor : 'rgba(255,255,255,.15)'}`, boxShadow: on ? `0 0 34px ${it.cor}55` : 'none', fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco, whiteSpace: 'nowrap'}}>
            {it.texto}
          </div>
        );
      })}
    </div>
  );
};

// ---------- O editor: a linha do tempo com o comecinho de cara parada ----------

const LT_W = 940;
const PARADA = 0.24;

const LinhaDoTempo: React.FC<{t: number; tesoura: number; cortado: number; cabeca: number; style?: React.CSSProperties}> = ({t, tesoura, cortado, cabeca, style}) => {
  const wp = LT_W * PARADA * (1 - cortado);
  const wf = LT_W * (1 - PARADA);
  const quadros = (n: number, emoji: string, fundo: string) => Array.from({length: n}, (_, i) => (
    <div key={i} style={{width: 92, height: 130, flexShrink: 0, borderRadius: 10, background: fundo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 58, border: '2px solid rgba(255,255,255,.2)'}}>{emoji}</div>
  ));
  return (
    <div style={{position: 'absolute', width: LT_W + 40, padding: 20, borderRadius: 30, ...caixa, ...style}}>
      <div style={{display: 'flex', fontFamily: INTER, fontWeight: 700, fontSize: 22, color: COR.cinza, marginBottom: 10}}>
        {['0:00', '0:01', '0:02', '0:03', '0:04'].map((s) => <div key={s} style={{width: LT_W / 5}}>{s}</div>)}
      </div>
      <div style={{position: 'relative', height: 260}}>
        <div style={{display: 'flex', height: 260}}>
          {wp > 0.5 && (
            <div style={{width: wp, overflow: 'hidden', flexShrink: 0, borderRadius: 14, background: 'rgba(255,77,94,.22)', border: `3px solid ${COR.vermelho}`, padding: 8, boxSizing: 'border-box'}}>
              <div style={{display: 'flex', gap: 6}}>{quadros(2, '😐', '#2B3550')}</div>
              <div style={{marginTop: 26, height: 4, background: 'rgba(255,255,255,.4)', borderRadius: 4}} />
              <div style={{marginTop: 16, fontFamily: MONT, fontWeight: 900, fontSize: 22, color: COR.vermelho, whiteSpace: 'nowrap'}}>CARA PARADA</div>
            </div>
          )}
          <div style={{width: wf, flexShrink: 0, overflow: 'hidden', marginLeft: 6, borderRadius: 14, background: 'rgba(62,198,255,.12)', border: `3px solid ${COR.ciano}`, padding: 8, boxSizing: 'border-box'}}>
            <div style={{display: 'flex', gap: 6}}>{quadros(8, '🙂', '#24406A')}</div>
            <div style={{marginTop: 8, height: 90, display: 'flex', alignItems: 'center', gap: 5}}>
              {Array.from({length: 62}, (_, i) => <div key={i} style={{width: 6, flexShrink: 0, borderRadius: 3, height: 14 + 70 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)), background: COR.ciano}} />)}
            </div>
          </div>
        </div>
        {/* tesoura no ponto da primeira palavra */}
        {tesoura > 0.01 && (
          <div style={{position: 'absolute', left: wp - 30, top: interpolate(tesoura, [0, 1], [-140, -60]), fontSize: 64, opacity: tesoura * (1 - cortado), rotate: '90deg'}}>✂️</div>
        )}
        {tesoura > 0.01 && cortado < 0.99 && <div style={{position: 'absolute', left: wp + 1, top: -10, bottom: -10, width: 4, background: COR.amarelo, opacity: tesoura * (1 - cortado), boxShadow: `0 0 18px ${COR.amarelo}`}} />}
        {/* cabeça de leitura */}
        <div style={{position: 'absolute', left: cabeca * (wp + wf) - 2, top: -16, bottom: -16, width: 4, background: '#fff', boxShadow: '0 0 12px #fff'}} />
      </div>
    </div>
  );
};

// ---------- Abertura: o feed passando o vídeo que começa de cara parada ----------

// Até a Luísa entrar, a abertura cobre o começo do clipe.
const A0 = M.pessoa - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <Tela t={t} modo="feed" olhar={0} sorriso={0} seg={t} segCor={COR.vermelho} rolar={prog(t, A0 - 0.45, 0.4, suave)} style={{...PALCO, top: 620}} />
      <DedoRola t={t} de={A0 - 0.45} x={640} y={1200} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>😐</span> PASSOU ANTES<br />DO SEU <span style={{color: COR.vermelho}}>“OI”</span>
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
      <Carimbo t={t} de={M.antes - 0.1} cor={COR.vermelho} tamanho={54} rot={-6} style={{left: 110, top: 1530}}>ANTES DA 1ª PALAVRA ✕</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['🙂 SORRI ANTES DO REC', '✂️ CORTA O COMECINHO'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): o que acontece no primeiro segundo ----------

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.meio, M.esse - 0.15);
  if (!st) return null;
  const rec = t >= M.aperta + 0.15;
  const olhar = t < M.sorri - 0.1 ? 0 : prog(t, M.sorri - 0.1, 0.3, suave);
  const mao = prog(t, M.ajeita - 0.1, 0.35, saida) * (1 - prog(t, M.sorri - 0.2, 0.3));
  const seg = rec ? interpolate(t, [M.aperta + 0.15, M.sorri], [0, 1.6], clamp) : 0;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={50}>O ERRO: <span style={{color: COR.vermelho}}>O 1º SEGUNDO</span></Titulo>
      <Passos t={t} itens={[
        {de: M.aperta - 0.1, texto: '👆 aperta o REC', cor: COR.vermelho},
        {de: M.olha - 0.1, texto: '👀 olha pro celular', cor: COR.vermelho},
        {de: M.ajeita - 0.1, texto: '💇🏾‍♀️ ajeita o cabelo', cor: COR.vermelho},
        {de: M.sorri - 0.15, texto: '🙂 só depois sorri', cor: COR.amarelo},
      ]} />
      <Tela t={t} modo="gravando" olhar={olhar} sorriso={prog(t, M.sorri - 0.05, 0.35, saida)} mao={mao} rec={rec} seg={seg} segCor={COR.vermelho} style={PALCO_D} />
      <Toque t={t} de={M.aperta - 0.35} toque={M.aperta} x={825} y={1270} />
      <Carimbo t={t} de={M.sorri + 0.15} cor={COR.amarelo} tamanho={46} rot={-6} style={{left: 60, top: 1110}}>TARDE DEMAIS ⏱</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): é esse segundo que aparece no feed ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.esse - 0.15, M.primeira - 0.15);
  if (!st) return null;
  const rolar = prog(t, M.passa - 0.05, 0.6, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.esse - 0.1} top={440} tamanho={50}>O QUE APARECE <span style={{color: COR.ciano}}>NO FEED</span></Titulo>
      <Tela t={t} modo="feed" olhar={0} sorriso={0} seg={interpolate(t, [M.esse, M.passa], [0, 1.4], clamp)} segCor={COR.vermelho} rolar={rolar} style={PALCO} />
      <Etiqueta t={t} de={M.parada - 0.15} cor={COR.vermelho} style={{left: 40, top: 640}}>😐 cara parada</Etiqueta>
      {t < M.passa && <Carimbo t={t} de={M.decide - 0.15} cor={COR.amarelo} tamanho={54} rot={-6} style={{left: 200, top: 1170}}>DECIDE EM 1 SEGUNDO</Carimbo>}
      <DedoRola t={t} de={M.passa - 0.05} x={640} y={1180} />
      <Etiqueta t={t} de={M.passa + 0.1} cor={COR.vermelho} style={{left: 790, top: 900}}>PRÓXIMO ⬆️</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Dica 1: começa já sorrindo e fala junto com o REC ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const rec = t >= M.apertar + 0.1;
  const bolha = mola(t, M.fala - 0.05, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <Tela t={t} modo="gravando" olhar={1} sorriso={prog(t, M.sorrindo - 0.15, 0.35, saida)} rec={rec} seg={rec ? 0 : undefined} segCor={COR.verde} bolha={bolha} style={PALCO} />
      <Toque t={t} de={M.apertar - 0.35} toque={M.apertar} x={540} y={1255} />
      <Etiqueta t={t} de={M.sorrindo - 0.1} cor={COR.verde} style={{left: 40, top: 640}}>🙂 sorri ANTES</Etiqueta>
      <Etiqueta t={t} de={M.fala - 0.1} cor={COR.verde} style={{left: 770, top: 820}}>🗣️ fala JÁ</Etiqueta>
      <Carimbo t={t} de={M.mesmo - 0.15} cor={COR.verde} tamanho={52} rot={-5} style={{left: 170, top: 1120}}>REC + 1ª PALAVRA JUNTOS</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: corta o comecinho no editor ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const tesoura = prog(t, M.corta - 0.1, 0.4, saida);
  const cortado = prog(t, M.tira, 0.6, suave);
  const cabeca = prog(t, M.video2 - 0.1, M.pronto - M.video2, (x) => x);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Titulo t={t} de={M.corta - 0.1} top={560} tamanho={56}>CORTA O <span style={{color: COR.amarelo}}>COMECINHO</span> ✂️</Titulo>
      <LinhaDoTempo t={t} tesoura={tesoura} cortado={cortado} cabeca={cabeca} style={{left: 50, top: 740}} />
      <Etiqueta t={t} de={M.tira - 0.1} cor={COR.amarelo} style={{left: 60, top: 1130}}>tudo antes da 1ª palavra</Etiqueta>
      <Carimbo t={t} de={M.falando - 0.2} cor={COR.verde} tamanho={50} rot={-5} style={{left: 250, top: 1200}}>JÁ COMEÇA FALANDO ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fecho: agora a pessoa fica ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pronto - 0.15, M.gravar - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pronto - 0.1} top={440} tamanho={50}>AGORA <span style={{color: COR.verde}}>A PESSOA FICA</span></Titulo>
      <Tela t={t} modo="feed" olhar={1} sorriso={1} seg={interpolate(t, [M.pronto, M.gravar], [0, 3], clamp)} segCor={COR.verde} bolha={mola(t, M.pronto, 10, 230)} verde={prog(t, M.conversando - 0.15, 0.3)} style={PALCO} />
      <Carimbo t={t} de={M.conversando - 0.15} cor={COR.verde} tamanho={56} rot={-6} style={{left: 250, top: 1170}}>A PESSOA FICA ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Ponte: gravar dá trabalho, postar não precisa dar ----------

const Ponte1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.gravar - 0.15, M.digo1 - 0.15);
  if (!st) return null;
  const a = mola(t, M.gravar - 0.1, 11, 220);
  const b = mola(t, M.postar2 - 0.1, 11, 220);
  const linha = (e: number, cor: string, icone: string, verbo: string, resto: string) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 26, padding: '30px 36px', borderRadius: 32, ...caixa, border: `4px solid ${cor}`, opacity: e, translate: `${(1 - e) * 120}px 0px`}}>
      <div style={{fontSize: 90}}>{icone}</div>
      <div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: cor, lineHeight: 1}}>{verbo}</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 36, color: COR.branco, marginTop: 8}}>{resto}</div>
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 640, display: 'flex', flexDirection: 'column', gap: 40}}>
        {linha(a, COR.amarelo, '🎬', 'GRAVAR', 'já dá trabalho 😮‍💨')}
        {linha(b, COR.verde, '📲', 'POSTAR', 'não precisa dar ✓')}
      </div>
    </AbsoluteFill>
  );
};

const SUGESTAO = 'Poste o Reels da peça nova na quinta, 19h.';
const LEGENDA_POST = 'Chegou peça nova! Vem ver de pertinho 👀';

const Ponte2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.digo1 - 0.15, T.b - 0.1);
  if (!st) return null;
  const logo = mola(t, M.digo1 - 0.1, 11, 190);
  const sug = mola(t, M.sugere - 0.1, 12, 200);
  const pronto = mola(t, M.escreve - 0.1, 12, 200);
  const agenda = mola(t, M.agenda - 0.1, 10, 230);
  const aprovado = t >= M.aprova + 0.12;
  const app = mola(t, M.aplicativo - 0.1, 10, 230);
  const bio = mola(t, M.link - 0.15, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: logo, scale: String(0.6 + 0.4 * logo)}}>
        <Img src={ARQ.logo} style={{width: 90, height: 90, borderRadius: 22}} />
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco}}>Digo Social</div>
        {app > 0.01 && <div style={{padding: '8px 18px', borderRadius: 16, background: 'rgba(62,198,255,.16)', border: `3px solid ${COR.ciano}`, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.ciano, opacity: app, scale: String(interpolate(app, [0, 1], [1.8, 1])), rotate: `${(1 - app) * 8}deg`}}>📲 APLICATIVO</div>}
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 570, padding: 30, ...caixa, opacity: sug * (1 - 0.4 * pronto), scale: String((0.9 + 0.1 * sug) * (1 - 0.06 * pronto))}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.ciano, letterSpacing: 2}}>💡 O DIGO SUGERE</div>
        <div style={{marginTop: 12, fontFamily: MONT, fontWeight: 800, fontSize: 40, lineHeight: 1.2, color: COR.branco}}>
          {digitar(t, M.sugere, M.escreve - 0.15, SUGESTAO)}
          {t < M.escreve - 0.15 && <Cursor t={t} />}
        </div>
      </div>
      {pronto > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 790, padding: 30, ...caixa, border: `4px solid ${COR.verde}`, opacity: pronto, translate: `0px ${(1 - pronto) * 80}px`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.verde, letterSpacing: 2}}>POST PRONTO</div>
          <div style={{marginTop: 14, display: 'flex', gap: 20, alignItems: 'center'}}>
            <div style={{position: 'relative', width: 120, height: 190, borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, #2B3550, #1A2238)', border: '3px solid #fff', flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
              <Rostinho olhar={1} sorriso={1} w={116} />
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,.6)'}}>▶</div>
            </div>
            <div style={{flex: 1}}>
              <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 30, lineHeight: 1.3, color: COR.branco, minHeight: 80}}>
                {digitar(t, M.legenda - 0.1, M.agenda - 0.2, LEGENDA_POST)}
                {t >= M.legenda - 0.1 && t < M.agenda - 0.2 && <Cursor t={t} />}
              </div>
              {agenda > 0.01 && (
                <div style={{display: 'inline-block', marginTop: 12, padding: '8px 16px', borderRadius: 14, background: 'rgba(62,198,255,.16)', border: `3px solid ${COR.ciano}`, fontFamily: MONT, fontWeight: 900, fontSize: 26, color: COR.ciano, opacity: agenda, scale: String(interpolate(agenda, [0, 1], [1.5, 1]))}}>📅 quinta, 19h</div>
              )}
            </div>
          </div>
          <div style={{marginTop: 20, padding: '20px 0', borderRadius: 20, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 34, color: aprovado ? COR.marinho : COR.branco, background: aprovado ? COR.verde : COR.azul, opacity: mola(t, M.agenda, 12, 210)}}>
            {aprovado ? 'Agendado ✓ quinta, 19h' : 'Aprovar'}
          </div>
        </div>
      )}
      <Toque t={t} de={M.agenda + 0.1} toque={M.aprova} x={540} y={1125} />
      {bio > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1200, display: 'flex', justifyContent: 'center', opacity: bio, scale: String(interpolate(bio, [0, 1], [1.7, 1])), rotate: `${-3 + (1 - bio) * 8}deg`}}>
          <Pilula cor={COR.ciano} tamanho={56} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)">🔗 LINK NA BIO</Pilula>
        </div>
      )}
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
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>⏱️ O PRIMEIRO SEGUNDO</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>🙂 Sorri antes e fala junto com o REC<br />✂️ Corta tudo antes da 1ª palavra</div>
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
      <Ponte1 t={t} />
      <Ponte2 t={t} />
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
  {som: 'tique', em: 0.2, volume: 0.35},
  {som: 'whoosh_out', em: A0 - 0.45, volume: 0.45},
  {som: 'impacto', em: M.antes - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'toque', em: M.aperta, volume: 0.6},
  {som: 'pop', em: M.olha - 0.1, volume: 0.35},
  {som: 'pop', em: M.ajeita - 0.1, volume: 0.35},
  {som: 'ding', em: M.sorri - 0.15, volume: 0.35},
  {som: 'risco', em: M.sorri + 0.15, volume: 0.45},
  {som: 'swoosh', em: M.esse - 0.15, volume: 0.4},
  {som: 'pop', em: M.parada - 0.15, volume: 0.35},
  {som: 'impacto', em: M.decide - 0.15, volume: 0.5},
  {som: 'whoosh_out', em: M.passa - 0.05, volume: 0.5},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.sorrindo - 0.1, volume: 0.4},
  {som: 'toque', em: M.apertar, volume: 0.6},
  {som: 'pop', em: M.fala - 0.05, volume: 0.45},
  {som: 'ding', em: M.mesmo - 0.15, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'whoosh_in', em: M.corta - 0.1, volume: 0.4},
  {som: 'risco', em: M.tira, volume: 0.55},
  {som: 'ding', em: M.falando - 0.2, volume: 0.5},
  // Fecho
  {som: 'pop', em: M.pronto, volume: 0.4},
  {som: 'ding', em: M.conversando - 0.15, volume: 0.55},
  // Ponte
  {som: 'swoosh', em: M.gravar - 0.15, volume: 0.4},
  {som: 'pop', em: M.postar2 - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.digo1 - 0.1, volume: 0.45},
  {som: 'tecla', em: M.sugere, volume: 0.35},
  {som: 'pop', em: M.escreve - 0.1, volume: 0.4},
  {som: 'tecla', em: M.legenda, volume: 0.35},
  {som: 'pop', em: M.agenda - 0.1, volume: 0.4},
  {som: 'toque', em: M.aprova, volume: 0.6},
  {som: 'ding', em: M.aprova + 0.12, volume: 0.55},
  {som: 'pop', em: M.aplicativo - 0.1, volume: 0.45},
  {som: 'impacto', em: M.link - 0.15, volume: 0.5},
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
    // Até "pessoa" a abertura (o feed passando o vídeo de cara parada) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.antes - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    // o selo "LINK NA BIO" já diz o que ela fala
    [M.link - 0.15, T.b],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {'parada,': COR.vermelho, 'passa.': COR.vermelho, 'sorrindo.': COR.verde, 'comecinho.': COR.amarelo, 'conversando.': COR.verde, 'aprova.': COR.verde, 'aplicativo': COR.ciano, 'link': COR.ciano, 'bio.': COR.ciano},
  eventos: EVENTOS,
  Cena,
};
