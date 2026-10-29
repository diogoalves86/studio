import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 035 · Esse erro faz quem assiste achar que você está desconfortável.
// Mão escondida (no bolso, fora do quadro, braço cruzado) deixa o corpo duro e a voz sem energia; quem assiste quer ir embora.
// Abertura (o boneco com as mãos no bolso) → o porquê (três poses, corpo duro, voz murcha, "quer ir embora" e passa)
// → dica 1: afasta o celular um palmo, do peito pra cima → dica 2: a mão conta 1, 2, 3 e a voz acompanha → a fala solta
// → ponte: o Digo Social é um site; acessa o Digo, tá no link da bio → CTA de seguir. Sem crédito extra: tudo animação.

const T = TRECHOS;
const M = {
  quem: em('quem'),
  assiste: em('assiste'),
  desconfortavel: em('desconfortável'),
  erro2: em('erro', T.meio),
  esconder: em('esconder'),
  bolso: em('bolso'),
  fora: em('fora'),
  braco: em('braço'),
  corpo: em('corpo'),
  duro: em('duro'),
  voz: em('voz', T.meio),
  perde: em('perde'),
  energia: em('energia'),
  quem2: em('quem', T.meio),
  embora: em('embora'),
  passa: em('passa'),
  primeira: em('primeira', T.meio),
  afasta: em('afasta'),
  palmo: em('palmo'),
  enquadra: em('enquadra'),
  peito: em('peito'),
  aparecer: em('aparecer'),
  segunda: em('segunda'),
  contar: em('contar'),
  um: em('um', em('contar')),
  dois: em('dois'),
  tres: em('três'),
  quando: em('quando'),
  mexe: em('mexe'),
  acompanha: em('acompanha'),
  pronto: em('pronto'),
  aparece: em('aparece', em('pronto')),
  solta: em('solta'),
  gravar: em('gravar'),
  postar2: em('postar', em('gravar')),
  digo1: em('digo', T.meio),
  site: em('site'),
  sugere: em('sugere'),
  escreve: em('escreve'),
  legenda: em('legenda'),
  agenda: em('agenda'),
  aprova: em('aprova', em('agenda')),
  acesse: em('acesse', em('aprova', em('agenda'))),
  link: em('link'),
  segue: em('segue', T.b),
  digo: em('digo', T.b),
  toda: em('toda', T.b),
};

// ---------- Peças comuns (iguais ao 031) ----------

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

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
// ---------- O rosto de frente: `olhoX` move as pupilas (−1 a 1), `lendo` baixa o olhar, `sorriso` abre a boca ----------

const RostoFrente: React.FC<{olhoX?: number; lendo?: number; sorriso?: number; w?: number}> = ({olhoX = 0, lendo = 0, sorriso = 0, w = 540}) => {
  const olhoY = 108;
  const olho = (cx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={olhoY} rx={14} ry={10 - 2 * lendo + 1.5 * sorriso} fill="#fff" />
      <circle cx={cx + 7 * olhoX} cy={olhoY - 3 * lendo + 1} r={6.5} fill="#1C1210" />
    </g>
  );
  const sob = 90 - 3 * sorriso;
  return (
    <svg width={w} height={w * 1.1} viewBox="0 0 200 220">
      <circle cx={100} cy={82} r={86} fill="#1C1210" />
      <circle cx={34} cy={66} r={34} fill="#1C1210" />
      <circle cx={166} cy={66} r={34} fill="#1C1210" />
      <path d="M 10 220 Q 20 170 100 166 Q 180 170 190 220 Z" fill={COR.azul} />
      <rect x={84} y={150} width={32} height={30} fill="#6B3F26" />
      <ellipse cx={100} cy={112} rx={58} ry={66} fill="#7A4A2E" />
      <path d={`M 62 ${sob + 2} Q 76 ${sob - 3} 90 ${sob}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M 110 ${sob} Q 124 ${sob - 3} 138 ${sob + 2}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      {olho(76)}
      {olho(124)}
      <path d="M 96 120 Q 100 134 106 130" stroke="#5A3220" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={`M ${80 - 4 * sorriso} 150 Q 100 ${150 + 14 * sorriso} ${120 + 4 * sorriso} 150`} stroke="#3A1E12" strokeWidth={5} fill={sorriso > 0.5 ? '#3A1E12' : 'none'} strokeLinecap="round" />
    </svg>
  );
};

// ---------- A onda da voz: `viva` 0 = reta, sempre no mesmo tom; 1 = sobe e desce ----------

const Onda: React.FC<{t: number; viva: number; w?: number; h?: number; cor?: string; style?: React.CSSProperties}> = ({t, viva, w = 860, h = 200, cor, style}) => {
  const N = 30;
  const c = cor ?? (viva > 0.5 ? COR.verde : COR.vermelho);
  return (
    <div style={{position: 'absolute', width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style}}>
      {Array.from({length: N}, (_, i) => {
        const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.42 + t * 1.3));
        const vivo = env * (0.45 + 0.55 * Math.abs(Math.sin(t * 7 + i * 0.9)));
        const reto = 0.16 + 0.025 * Math.sin(t * 18 + i);
        const a = reto + (vivo - reto) * viva;
        return <div key={i} style={{width: (w / N) * 0.55, height: Math.max(8, h * a), borderRadius: 99, background: c, opacity: 0.9}} />;
      })}
    </div>
  );
};

// ---------- O boneco de meio corpo: `pose` diz onde estão as mãos, `duro` endurece (cinza e parado), `conta` levanta dedos ----------

type Pose = 'bolso' | 'fora' | 'cruzado' | 'solto';
const PELE = '#7A4A2E';
const MANGA = '#1F5FD0';

const Boneco: React.FC<{t: number; pose: Pose; duro?: number; conta?: number; sorriso?: number; w?: number; style?: React.CSSProperties}> = ({t, pose, duro = 0, conta = 0, sorriso = 0, w = 420, style}) => {
  const ginga = (1 - duro) * Math.sin(t * 4.5);
  const ginga2 = (1 - duro) * Math.sin(t * 4.5 + 1.7);
  const braco = (d: string) => <path d={d} stroke={MANGA} strokeWidth={24} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  const mao = (x: number, y: number, dedos = 0) => (
    <g>
      {Array.from({length: dedos}, (_, i) => <rect key={i} x={x - 13 + i * 9} y={y - 36} width={8} height={28} rx={4} fill={PELE} stroke="#4A2A18" strokeWidth={1.5} />)}
      <circle cx={x} cy={y} r={16} fill={PELE} stroke="#4A2A18" strokeWidth={1.5} />
      <path d={`M ${x - 9} ${y - 5} L ${x + 9} ${y - 5} M ${x - 9} ${y + 1} L ${x + 9} ${y + 1}`} stroke="#4A2A18" strokeWidth={1.2} opacity={dedos ? 0 : 0.6} />
    </g>
  );
  const maoE = {x: 64 + 6 * ginga, y: 152 - 8 * Math.abs(ginga)};
  const maoD = {x: 136 - 6 * ginga2, y: 150 - 8 * Math.abs(ginga2)};
  return (
    <div style={{position: 'absolute', width: w, height: w * 1.3, filter: `grayscale(${duro}) brightness(${1 - 0.25 * duro})`, rotate: `${2 * ginga}deg`, transformOrigin: '50% 100%', ...style}}>
      <svg width={w} height={w * 1.3} viewBox="0 0 200 260" style={{position: 'absolute', left: 0, top: 0}}>
        <path d="M 14 262 L 18 128 Q 22 102 100 100 Q 178 102 182 128 L 186 262 Z" fill={COR.azul} />
        {pose === 'bolso' && (
          <>
            {braco('M 32 120 Q 20 170 32 226')}
            {braco('M 168 120 Q 180 170 168 226')}
            <rect x={18} y={220} width={30} height={22} rx={5} fill="#16306E" />
            <rect x={152} y={220} width={30} height={22} rx={5} fill="#16306E" />
          </>
        )}
        {pose === 'fora' && (
          <>
            {braco('M 32 120 L 22 275')}
            {braco('M 168 120 L 178 275')}
          </>
        )}
        {pose === 'cruzado' && (
          <>
            {braco('M 32 120 L 30 178 L 140 192')}
            {braco('M 168 120 L 170 182 L 60 198')}
          </>
        )}
        {pose === 'solto' && (
          <>
            {braco(`M 32 120 L 40 204 L ${maoE.x} ${maoE.y}`)}
            {braco(`M 168 120 L 160 204 L ${maoD.x} ${maoD.y}`)}
            {mao(maoE.x, maoE.y)}
            {mao(maoD.x, maoD.y, conta)}
          </>
        )}
      </svg>
      <div style={{position: 'absolute', left: w * 0.25, top: 0}}>
        <RostoFrente sorriso={sorriso} w={w * 0.5} />
      </div>
    </div>
  );
};

// ---------- A mão grande que conta: `n` dedos levantados ----------

const Mao: React.FC<{n: number; pop?: number; w?: number; style?: React.CSSProperties}> = ({n, pop = 1, w = 280, style}) => (
  <svg width={w} height={(w * 4) / 3} viewBox="0 0 120 160" style={{position: 'absolute', scale: String(0.9 + 0.1 * pop), ...style}}>
    {[0, 1, 2, 3].map((i) => {
      const up = i < n;
      const alto = i === 3 ? 62 : i === 0 ? 74 : 82;
      return <rect key={i} x={22 + i * 20} y={up ? 70 - alto : 52} width={17} height={up ? alto + 10 : 30} rx={8.5} fill={PELE} stroke="#4A2A18" strokeWidth={3} />;
    })}
    <rect x={18} y={66} width={86} height={84} rx={26} fill={PELE} stroke="#4A2A18" strokeWidth={3} />
    <rect x={20} y={98} width={58} height={20} rx={10} transform="rotate(-18 20 108)" fill={PELE} stroke="#4A2A18" strokeWidth={3} />
  </svg>
);

// ---------- O celular gravando: `zoom` 1,9 = só o rosto; 1 = do peito pra cima ----------

const TelaBoneco: React.FC<{t: number; pose: Pose; zoom?: number; duro?: number; conta?: number; sorriso?: number; verde?: number; w?: number; style?: React.CSSProperties}> = ({t, pose, zoom = 1, duro = 0, conta = 0, sorriso = 0, verde = 0, w = 380, style}) => {
  const h = (w * 16) / 9;
  const f = w / 440;
  const brilho = verde * (0.6 + 0.4 * Math.abs(Math.sin(t * 4)));
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44 * f, border: `${10 * f}px solid ${verde > 0.01 ? COR.verde : '#1B2238'}`, background: 'linear-gradient(180deg, #2B3550, #1A2238)', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${70 * brilho}px rgba(46,229,157,${0.7 * brilho})`, ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: h * 0.2, height: h, scale: String(zoom), transformOrigin: '50% 12%'}}>
        <Boneco t={t} pose={pose} duro={duro} conta={conta} sorriso={sorriso} w={w * 0.95} style={{left: w * 0.025 - 10 * f, top: 0}} />
      </div>
      <div style={{position: 'absolute', left: 18 * f, top: 22 * f, display: 'flex', alignItems: 'center', gap: 8 * f, fontFamily: INTER, fontWeight: 800, fontSize: 22 * f, color: '#fff'}}>
        <div style={{width: 14 * f, height: 14 * f, borderRadius: 99, background: COR.vermelho, opacity: Math.round(t * 2) % 2 ? 1 : 0.3}} /> REC
      </div>
    </div>
  );
};

const PALCO = {left: 350, top: 560};

// ---------- Abertura: o boneco com as mãos escondidas no bolso ----------

// Até a Luísa entrar, a abertura cobre o começo do clipe.
const A0 = M.assiste - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <Boneco t={t} pose="bolso" duro={0.6} w={560} style={{left: 260, top: 560, scale: String(1 + 0.06 * t)}} />
      <div style={{position: 'absolute', left: 170, top: 1180, fontFamily: MONT, fontWeight: 900, fontSize: 90, color: COR.amarelo, opacity: Math.abs(Math.sin(t * 5))}}>?</div>
      <div style={{position: 'absolute', left: 860, top: 1180, fontFamily: MONT, fontWeight: 900, fontSize: 90, color: COR.amarelo, opacity: Math.abs(Math.sin(t * 5 + 1.5))}}>?</div>
      <Etiqueta t={t} de={0.15} cor={COR.vermelho} style={{left: 330, top: 1450}}>🫣 CADÊ AS MÃOS?</Etiqueta>
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>🫣</span> MÃOS<br /><span style={{color: COR.vermelho}}>ESCONDIDAS</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Flagra: React.FC<{t: number}> = ({t}) => {
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = 1 - prog(t, T.meio - 0.15, 0.25);
  return (
    <div style={{opacity: e}}>
      <Carimbo t={t} de={M.desconfortavel - 0.1} cor={COR.vermelho} tamanho={56} rot={-6} style={{left: 210, top: 1530}}>😬 DESCONFORTO</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['📱 1 PALMO PRA TRÁS', '✋ MÃO CONTANDO'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): no bolso, fora do quadro, ou de braço cruzado ----------

const POSES: {pose: Pose; nome: string; de: keyof typeof M}[] = [
  {pose: 'bolso', nome: '👖 no bolso', de: 'bolso'},
  {pose: 'fora', nome: '✂️ fora do quadro', de: 'fora'},
  {pose: 'cruzado', nome: '🙅 braço cruzado', de: 'braco'},
];

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.corpo - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={50}>O ERRO: <span style={{color: COR.vermelho}}>ESCONDER AS MÃOS</span></Titulo>
      <div style={{position: 'absolute', left: 30, right: 30, top: 600, display: 'flex', justifyContent: 'space-between'}}>
        {POSES.map((p) => {
          const e = mola(t, M[p.de] - 0.12, 11, 220);
          return (
            <div key={p.pose} style={{width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: e, translate: `0px ${(1 - e) * 120}px`, scale: String(0.85 + 0.15 * e)}}>
              <div style={{position: 'relative', width: 300, height: 420, borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(180deg, #2B3550, #1A2238)', border: `5px solid ${COR.vermelho}`, boxShadow: '0 30px 70px rgba(0,0,0,.5)'}}>
                <Boneco t={t} pose={p.pose} w={290} style={{left: 5, top: 50}} />
              </div>
              <div style={{padding: '10px 16px', borderRadius: 16, background: 'rgba(8,16,44,.95)', border: `4px solid ${COR.vermelho}`, fontFamily: MONT, fontWeight: 900, fontSize: 26, color: COR.branco, whiteSpace: 'nowrap'}}>{p.nome}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): o corpo fica duro, a voz perde energia ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.corpo - 0.15, M.quem2 - 0.15);
  if (!st) return null;
  const duro = prog(t, M.duro - 0.1, 0.4, saida);
  const murcha = prog(t, M.perde - 0.1, 0.7, saida);
  return (
    <AbsoluteFill style={st}>
      <Boneco t={t} pose="cruzado" duro={duro} w={400} style={{left: 340, top: 450}} />
      <Etiqueta t={t} de={M.duro - 0.1} cor={COR.ciano} style={{left: 80, top: 600}}>🧊 corpo duro</Etiqueta>
      <Onda t={t} viva={1 - murcha} w={760} h={130} style={{left: 160, top: 1000, opacity: mola(t, M.voz - 0.15, 12, 200)}} />
      <Etiqueta t={t} de={M.energia - 0.1} cor={COR.vermelho} style={{left: 330, top: 1170}}>🔋 SEM ENERGIA 😐</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (3): quem assiste sente que você quer ir embora; e passa ----------

const Porque3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.quem2 - 0.15, M.primeira - 0.15);
  if (!st) return null;
  const sobe = prog(t, M.passa - 0.05, 0.45, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quem2 - 0.1} top={440} tamanho={50}>QUEM ASSISTE <span style={{color: COR.ciano}}>SENTE</span></Titulo>
      <TelaBoneco t={t} pose="cruzado" duro={1} style={{...PALCO, translate: `0px ${-1400 * sobe}px`}} />
      <Carimbo t={t} de={M.embora - 0.15} cor={COR.vermelho} tamanho={52} rot={-6} style={{left: 160, top: 1150, opacity: 1 - sobe}}>🚪 QUER IR EMBORA</Carimbo>
      {t >= M.passa - 0.1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 860, display: 'flex', justifyContent: 'center'}}>
          <Carimbo t={t} de={M.passa - 0.05} cor={COR.vermelho} tamanho={60} rot={-4} style={{position: 'relative'}}>PRÓXIMO ⬆️</Carimbo>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Dica 1: afasta o celular um palmo; do peito pra cima ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const afasta = prog(t, M.afasta - 0.05, M.palmo - M.afasta + 0.3, saida);
  const solto = t >= M.enquadra - 0.05;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <TelaBoneco t={t} pose={solto ? 'solto' : 'fora'} zoom={1.9 - 0.9 * afasta} sorriso={solto ? 0.6 : 0} verde={prog(t, M.aparecer - 0.1, 0.3)} style={{left: 350, top: 545, scale: String(1 - 0.08 * afasta)}} />
      <Etiqueta t={t} de={M.palmo - 0.1} cor={COR.amarelo} style={{left: 50, top: 700}}>↔️ 1 PALMO</Etiqueta>
      <Etiqueta t={t} de={M.peito - 0.1} cor={COR.ciano} style={{left: 760, top: 900}}>📐 peito<br />pra cima</Etiqueta>
      <Carimbo t={t} de={M.aparecer - 0.1} cor={COR.verde} tamanho={46} rot={-5} style={{left: 220, top: 1210}}>MÃO NO QUADRO ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: usa a mão pra contar; a voz acompanha ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const marcas = [M.um, M.dois, M.tres];
  const n = marcas.filter((m) => t >= m - 0.08).length;
  const pop = n ? mola(t, marcas[n - 1] - 0.08, 9, 260) : 1;
  const mao = mola(t, M.contar - 0.15, 12, 200);
  const viva = prog(t, M.mexe - 0.1, 0.6, saida);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Mao n={n} pop={pop} w={270} style={{left: 200, top: 560, opacity: mao, rotate: `${-8 + 4 * Math.sin(t * 3)}deg`}} />
      {n > 0 && <div style={{position: 'absolute', left: 560, top: 600, fontFamily: MONT, fontWeight: 900, fontSize: 260, lineHeight: 1, color: COR.amarelo, scale: String(interpolate(pop, [0, 1], [1.6, 1])), textShadow: '0 10px 40px rgba(0,0,0,.5)'}}>{n}</div>}
      <Onda t={t} viva={0.15 + 0.85 * viva} w={760} h={130} style={{left: 160, top: 960, opacity: mola(t, M.mexe - 0.15, 12, 200)}} />
      <Etiqueta t={t} de={M.mexe - 0.1} cor={COR.amarelo} style={{left: 150, top: 1115}}>✋ a mão mexe</Etiqueta>
      <Etiqueta t={t} de={M.acompanha - 0.1} cor={COR.verde} style={{left: 570, top: 1115}}>🗣️ a voz vem junto</Etiqueta>
      <Carimbo t={t} de={M.acompanha + 0.3} cor={COR.verde} tamanho={46} rot={-5} style={{left: 200, top: 1210}}>A MÃO PUXA A VOZ ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fecho: a mão aparece e a fala solta ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.pronto - 0.15, M.gravar - 0.15);
  if (!st) return null;
  const solta = prog(t, M.solta - 0.15, 0.4, saida);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pronto - 0.1} top={430} tamanho={46}>A FALA <span style={{color: COR.verde}}>SOLTA</span></Titulo>
      <TelaBoneco t={t} pose="solto" sorriso={0.4 + 0.6 * solta} verde={solta} w={300} style={{left: 390, top: 530}} />
      <Onda t={t} viva={0.5 + 0.5 * solta} cor={COR.verde} w={760} h={120} style={{left: 160, top: 1080}} />
      <Carimbo t={t} de={M.aparece - 0.1} cor={COR.verde} tamanho={44} rot={-4} style={{left: 260, top: 1220}}>MÃO À VISTA ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Ponte: gravar dá trabalho, postar não precisa dar (modelo aprovado no 031) ----------

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
  const site = mola(t, M.site - 0.1, 10, 230);
  const acessa = mola(t, M.acesse - 0.12, 10, 230);
  const bio = mola(t, M.link - 0.15, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: logo, scale: String(0.6 + 0.4 * logo)}}>
        <Img src={ARQ.logo} style={{width: 90, height: 90, borderRadius: 22}} />
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco}}>Digo Social</div>
        {site > 0.01 && <div style={{padding: '8px 18px', borderRadius: 16, background: 'rgba(62,198,255,.16)', border: `3px solid ${COR.ciano}`, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.ciano, opacity: site, scale: String(interpolate(site, [0, 1], [1.8, 1])), rotate: `${(1 - site) * 8}deg`}}>🌐 SITE</div>}
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 570, padding: 30, ...caixa, opacity: sug * (1 - 0.4 * pronto), scale: String((0.9 + 0.1 * sug) * (1 - 0.06 * pronto))}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.ciano, letterSpacing: 2}}>💡 O DIGO SUGERE</div>
        <div style={{marginTop: 12, fontFamily: MONT, fontWeight: 800, fontSize: 40, lineHeight: 1.2, color: COR.branco}}>
          {digitar(t, M.sugere, M.escreve - 0.15, SUGESTAO)}
          {t < M.escreve - 0.15 && <Cursor t={t} />}
        </div>
      </div>
      {pronto > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 790, padding: 30, ...caixa, border: `4px solid ${COR.verde}`, opacity: pronto * (1 - 0.5 * acessa), translate: `0px ${(1 - pronto) * 80}px`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.verde, letterSpacing: 2}}>POST PRONTO</div>
          <div style={{marginTop: 14, display: 'flex', gap: 20, alignItems: 'center'}}>
            <div style={{position: 'relative', width: 120, height: 190, borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, #2B3550, #1A2238)', border: '3px solid #fff', flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
              <RostoFrente sorriso={1} w={116} />
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
      {acessa > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1190, display: 'flex', justifyContent: 'center', opacity: acessa, scale: String(interpolate(acessa, [0, 1], [1.7, 1])), rotate: `${-3 + (1 - acessa) * 8}deg`, zIndex: 6}}>
          <Pilula cor={COR.verde} tamanho={56} fundo="linear-gradient(135deg, #18B37A, #2EE59D)">👉 ACESSA O DIGO</Pilula>
        </div>
      )}
      {bio > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1330, display: 'flex', justifyContent: 'center', opacity: bio, scale: String(interpolate(bio, [0, 1], [1.7, 1])), rotate: `${3 - (1 - bio) * 8}deg`, zIndex: 6}}>
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
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>✋ CORPO SOLTO NA CÂMERA</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>📱 Afasta o celular um palmo<br />✋ Usa a mão pra contar</div>
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
      <Flagra t={t} />
      <Porque1 t={t} />
      <Porque2 t={t} />
      <Porque3 t={t} />
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
  {som: 'pop', em: 0.15, volume: 0.4},
  {som: 'whoosh_out', em: A0 - 0.1, volume: 0.45},
  {som: 'impacto', em: M.desconfortavel - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.bolso - 0.12, volume: 0.4},
  {som: 'whoosh_in', em: M.fora - 0.12, volume: 0.4},
  {som: 'whoosh_in', em: M.braco - 0.12, volume: 0.4},
  {som: 'swoosh', em: M.corpo - 0.15, volume: 0.4},
  {som: 'risco', em: M.duro - 0.1, volume: 0.45},
  {som: 'pop', em: M.voz - 0.1, volume: 0.35},
  {som: 'pop', em: M.energia - 0.1, volume: 0.4},
  {som: 'swoosh', em: M.quem2 - 0.15, volume: 0.4},
  {som: 'impacto', em: M.embora - 0.15, volume: 0.5},
  {som: 'whoosh_out', em: M.passa - 0.05, volume: 0.5},
  {som: 'impacto', em: M.passa, volume: 0.45},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'whoosh_out', em: M.afasta - 0.05, volume: 0.4},
  {som: 'pop', em: M.palmo - 0.1, volume: 0.4},
  {som: 'pop', em: M.peito - 0.1, volume: 0.35},
  {som: 'ding', em: M.aparecer - 0.1, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'whoosh_in', em: M.contar - 0.15, volume: 0.4},
  {som: 'pop', em: M.um - 0.08, volume: 0.45},
  {som: 'pop', em: M.dois - 0.08, volume: 0.45},
  {som: 'pop', em: M.tres - 0.08, volume: 0.45},
  {som: 'pop', em: M.mexe - 0.1, volume: 0.35},
  {som: 'pop', em: M.acompanha - 0.1, volume: 0.35},
  {som: 'ding', em: M.acompanha + 0.3, volume: 0.5},
  // Fecho
  {som: 'pop', em: M.pronto, volume: 0.4},
  {som: 'ding', em: M.aparece - 0.1, volume: 0.55},
  // Ponte
  {som: 'swoosh', em: M.gravar - 0.15, volume: 0.4},
  {som: 'pop', em: M.postar2 - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.digo1 - 0.1, volume: 0.45},
  {som: 'pop', em: M.site - 0.1, volume: 0.45},
  {som: 'tecla', em: M.sugere, volume: 0.35},
  {som: 'pop', em: M.escreve - 0.1, volume: 0.4},
  {som: 'tecla', em: M.legenda, volume: 0.35},
  {som: 'pop', em: M.agenda - 0.1, volume: 0.4},
  {som: 'toque', em: M.aprova, volume: 0.6},
  {som: 'ding', em: M.aprova + 0.12, volume: 0.55},
  {som: 'impacto', em: M.acesse - 0.12, volume: 0.5},
  {som: 'pop', em: M.link - 0.15, volume: 0.45},
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
    // Até "assiste" a abertura (o boneco com as mãos no bolso) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.desconfortavel - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    // a mão grande e o número já mostram a contagem
    [M.um - 0.1, M.quando - 0.05],
    // os selos "ACESSA O DIGO" e "LINK NA BIO" já dizem o que ela fala
    [M.acesse - 0.15, T.b],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {'desconfortável.': COR.vermelho, 'mãos.': COR.vermelho, 'duro,': COR.vermelho, 'embora.': COR.vermelho, 'passa.': COR.vermelho, 'palmo.': COR.verde, 'aparecer.': COR.verde, 'acompanha.': COR.verde, 'solta.': COR.verde, 'aprova.': COR.verde, 'site': COR.ciano},
  eventos: EVENTOS,
  Cena,
};
