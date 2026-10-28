import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 033 · Esse erro faz quem assiste perceber que você está lendo.
// Texto decorado ou teleprompter deixa a voz reta e o olho correndo; quem assiste sente um recado lido.
// Abertura (o rosto lendo o teleprompter) → o porquê (folha decorada, voz reta, olho correndo, recado lido e passa)
// → dica 1: tópicos em vez de texto → dica 2: conta pra uma amiga, a voz sobe e desce → conversa, não leitura
// → ponte: o Digo Social é um site; acessa o Digo, tá no link da bio → CTA de seguir. Sem crédito extra: tudo animação.

const T = TRECHOS;
const M = {
  assiste: em('assiste'),
  perceber: em('perceber'),
  lendo: em('lendo'),
  erro2: em('erro', T.meio),
  decorar: em('decorar'),
  palavra: em('palavra', T.meio),
  teleprompter: em('teleprompter'),
  voz: em('voz', T.meio),
  reta: em('reta'),
  tom: em('tom'),
  olho: em('olho', T.meio),
  corre: em('corre'),
  quem2: em('quem', T.meio),
  recado: em('recado'),
  lido: em('lido'),
  conversa: em('conversa'),
  passa: em('passa'),
  primeira: em('primeira', T.meio),
  troca: em('troca'),
  topicos: em('tópicos'),
  tres: em('três'),
  ideia: em('ideia'),
  resto: em('resto'),
  jeito: em('jeito'),
  segunda: em('segunda'),
  amiga: em('amiga'),
  pessoa: em('pessoa'),
  voz2: em('voz', em('pessoa')),
  sobe: em('sobe'),
  desce: em('desce'),
  sozinha: em('sozinha'),
  pronto: em('pronto'),
  ler2: em('ler', em('pronto')),
  conversar: em('conversar'),
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

// Olhar de quem lê: vai devagar da esquerda pra direita e volta rápido pro começo da linha.
const leitura = (t: number) => {
  const s = (t * 1.5) % 1;
  return s < 0.85 ? -1 + (2 * s) / 0.85 : 1 - (2 * (s - 0.85)) / 0.15;
};

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

// ---------- A folha decorada: as linhas vão sendo marcadas, palavra por palavra ----------

const LARG_LINHA = [0.95, 0.88, 0.92, 0.7, 0.96, 0.84, 0.9, 0.6, 0.93, 0.8];

const Folha: React.FC<{marca?: number; riscada?: number; w?: number; h?: number; style?: React.CSSProperties}> = ({marca = 0, riscada = 0, w = 400, h = 540, style}) => (
  <div style={{position: 'absolute', width: w, height: h, borderRadius: 18, background: '#F4F1EA', boxShadow: '0 30px 70px rgba(0,0,0,.5)', padding: 30, boxSizing: 'border-box', ...style}}>
    <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#5B6475', marginBottom: 20}}>📄 roteiro.txt</div>
    {LARG_LINHA.map((l, i) => {
      const m = clamp01(marca * LARG_LINHA.length - i);
      return (
        <div key={i} style={{position: 'relative', height: 16, width: `${l * 100}%`, borderRadius: 8, background: '#C9CDD6', marginBottom: (h - 120) / LARG_LINHA.length - 16}}>
          <div style={{position: 'absolute', inset: -4, width: `${m * 100}%`, borderRadius: 8, background: 'rgba(255,210,94,.85)'}} />
        </div>
      );
    })}
    {riscada > 0.01 && (
      <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}} viewBox={`0 0 ${w} ${h}`}>
        <line x1={30} y1={30} x2={30 + (w - 60) * riscada} y2={30 + (h - 60) * riscada} stroke={COR.vermelho} strokeWidth={14} strokeLinecap="round" />
        <line x1={w - 30} y1={30} x2={w - 30 - (w - 60) * clamp01(riscada * 2 - 1)} y2={30 + (h - 60) * clamp01(riscada * 2 - 1)} stroke={COR.vermelho} strokeWidth={14} strokeLinecap="round" />
      </svg>
    )}
  </div>
);

// ---------- O teleprompter: o texto sobe sem parar ----------

const TEXTO_TP = ['Oi, gente! Hoje eu vou', 'falar sobre um assunto', 'muito importante para', 'o seu negócio crescer', 'nas redes sociais e', 'vender todos os dias.'];

const Teleprompter: React.FC<{t: number; w?: number; h?: number; style?: React.CSSProperties}> = ({t, w = 420, h = 520, style}) => {
  const lh = 58;
  const desl = (t * 70) % (TEXTO_TP.length * lh);
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 26, background: '#05070D', border: '6px solid #1B2238', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.55)', ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: h * 0.12 - desl}}>
        {[...TEXTO_TP, ...TEXTO_TP, ...TEXTO_TP].map((l, i) => (
          <div key={i} style={{height: lh, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: (w / 420) * 32, lineHeight: `${lh}px`, color: '#fff'}}>{l}</div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: h / 2 - 34, height: 68, borderTop: `3px solid ${COR.amarelo}`, borderBottom: `3px solid ${COR.amarelo}`, opacity: 0.6}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #05070D 0%, transparent 25%, transparent 75%, #05070D 100%)'}} />
    </div>
  );
};

// ---------- A tela do vídeo no feed ----------

const TelaRosto: React.FC<{t: number; olhoX?: number; lendo?: number; sorriso?: number; verde?: number; w?: number; style?: React.CSSProperties}> = ({t, olhoX = 0, lendo = 0, sorriso = 0, verde = 0, w = 400, style}) => {
  const h = (w * 16) / 9;
  const f = w / 440;
  const brilho = verde * (0.6 + 0.4 * Math.abs(Math.sin(t * 4)));
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44 * f, border: `${10 * f}px solid ${verde > 0.01 ? COR.verde : '#1B2238'}`, background: 'linear-gradient(180deg, #2B3550, #1A2238)', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${70 * brilho}px rgba(46,229,157,${0.7 * brilho})`, ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center'}}>
        <RostoFrente olhoX={olhoX} lendo={lendo} sorriso={sorriso} w={540 * f} />
      </div>
      <div style={{position: 'absolute', left: 18 * f, bottom: 26 * f, fontFamily: INTER, fontWeight: 800, fontSize: 24 * f, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.6)'}}>@sua.loja</div>
    </div>
  );
};

const PALCO = {left: 340, top: 560};

// ---------- Abertura: o rosto lendo o teleprompter ----------

// Até a Luísa entrar, a abertura cobre o começo do clipe.
const A0 = M.assiste - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <Teleprompter t={t} w={760} h={340} style={{left: 160, top: 500}} />
      <div style={{position: 'absolute', left: 300, top: 880, scale: String(1 + 0.05 * t)}}>
        <RostoFrente olhoX={leitura(t)} lendo={1} w={480} />
      </div>
      <Etiqueta t={t} de={0.15} cor={COR.vermelho} style={{left: 420, top: 1450}}>📜 LENDO…</Etiqueta>
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>📜</span> VOZ DE<br /><span style={{color: COR.vermelho}}>QUEM LÊ</span>
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
      <Carimbo t={t} de={M.lendo - 0.1} cor={COR.vermelho} tamanho={56} rot={-6} style={{left: 190, top: 1530}}>👀 ESTÁ LENDO!</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['📝 TÓPICOS', '🗣️ FALA COM UMA AMIGA'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): decorar palavra por palavra, ou ler no teleprompter ----------

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.voz - 0.15);
  if (!st) return null;
  const marca = prog(t, M.palavra - 0.1, M.teleprompter - M.palavra + 0.2);
  const tp = mola(t, M.teleprompter - 0.15, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={50}>O ERRO: <span style={{color: COR.vermelho}}>TEXTO DECORADO</span></Titulo>
      <Folha marca={marca} style={{left: 90, top: 590, rotate: '-3deg', opacity: mola(t, M.decorar - 0.15, 12, 200)}} />
      <Teleprompter t={t} style={{left: 570, top: 610, opacity: tp, translate: `${(1 - tp) * 200}px 0px`}} />
      <Etiqueta t={t} de={M.palavra - 0.1} cor={COR.amarelo} style={{left: 80, top: 1170}}>📝 palavra por palavra</Etiqueta>
      <Etiqueta t={t} de={M.teleprompter - 0.1} cor={COR.amarelo} style={{left: 640, top: 1170}}>📜 teleprompter</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): a voz reta e o olho correndo ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.voz - 0.15, M.quem2 - 0.15);
  if (!st) return null;
  const rosto = mola(t, M.olho - 0.15, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <Onda t={t} viva={0} w={860} h={180} style={{left: 110, top: 470}} />
      <Etiqueta t={t} de={M.reta - 0.1} cor={COR.vermelho} style={{left: 110, top: 680}}>📏 voz reta</Etiqueta>
      <Etiqueta t={t} de={M.tom - 0.1} cor={COR.vermelho} style={{left: 600, top: 680}}>😐 mesmo tom</Etiqueta>
      <div style={{position: 'absolute', left: 340, top: 770, opacity: rosto, scale: String(0.8 + 0.2 * rosto)}}>
        <RostoFrente olhoX={t >= M.olho - 0.1 ? leitura(t) : 0} lendo={1} w={400} />
      </div>
      <Etiqueta t={t} de={M.corre - 0.1} cor={COR.amarelo} style={{left: 360, top: 1225}}>⬅️ olho correndo ➡️</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (3): recado lido, não uma conversa; e passa ----------

const Porque3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.quem2 - 0.15, M.primeira - 0.15);
  if (!st) return null;
  const sobe = prog(t, M.passa - 0.05, 0.45, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quem2 - 0.1} top={440} tamanho={50}>QUEM ASSISTE <span style={{color: COR.ciano}}>SENTE</span></Titulo>
      <TelaRosto t={t} olhoX={leitura(t)} lendo={1} style={{...PALCO, translate: `0px ${-1400 * sobe}px`}} />
      <Carimbo t={t} de={M.recado - 0.15} cor={COR.vermelho} tamanho={52} rot={-6} style={{left: 200, top: 1150, opacity: 1 - sobe}}>📜 RECADO LIDO</Carimbo>
      {t >= M.conversa - 0.15 && <Etiqueta t={t} de={M.conversa - 0.15} cor={COR.vermelho} style={{left: 590, top: 600, opacity: 1 - sobe}}>❌ não é conversa</Etiqueta>}
      {t >= M.passa - 0.1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 860, display: 'flex', justifyContent: 'center'}}>
          <Carimbo t={t} de={M.passa - 0.05} cor={COR.vermelho} tamanho={60} rot={-4} style={{position: 'relative'}}>PRÓXIMO ⬆️</Carimbo>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Dica 1: troca o texto por tópicos ----------

const TOPICOS = ['1 · o erro', '2 · o porquê', '3 · a dica'];

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const risca = prog(t, M.troca - 0.05, 0.5, saida);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <Folha marca={1} riscada={risca} w={360} h={500} style={{left: 80, top: 600, rotate: '-3deg', opacity: 1 - 0.45 * risca, scale: String(1 - 0.1 * risca)}} />
      {TOPICOS.map((tx, i) => {
        const e = mola(t, (i === 0 ? M.topicos : M.tres) - 0.1 + i * 0.3, 11, 220);
        return (
          <div key={tx} style={{position: 'absolute', left: 500, top: 600 + i * 170, width: 500, padding: '26px 30px', borderRadius: 26, ...caixa, border: `4px solid ${COR.verde}`, opacity: e, translate: `${(1 - e) * 160}px 0px`, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>
            {tx}
          </div>
        );
      })}
      <Etiqueta t={t} de={M.ideia - 0.1} cor={COR.ciano} style={{left: 560, top: 1110}}>🔑 uma por ideia</Etiqueta>
      <Etiqueta t={t} de={M.resto - 0.1} cor={COR.amarelo} style={{left: 90, top: 1125}}>💬 o resto, do seu jeito</Etiqueta>
      <Carimbo t={t} de={M.jeito - 0.1} cor={COR.verde} tamanho={46} rot={-5} style={{left: 170, top: 1205}}>TÓPICOS, NÃO TEXTO ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: conta como se fosse pra uma amiga ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const amiga = mola(t, M.amiga - 0.15, 11, 210);
  const viva = prog(t, M.sobe - 0.1, 0.6, saida);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <div style={{position: 'absolute', left: 120, right: 120, top: 590, display: 'flex', alignItems: 'center', gap: 26, padding: '26px 30px', borderRadius: 32, ...caixa, border: `4px solid ${COR.ciano}`, opacity: amiga, scale: String(0.8 + 0.2 * amiga)}}>
        <div style={{fontSize: 100}}>👩🏾</div>
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.ciano}}>sua amiga</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco, marginTop: 6}}>“me conta, como foi?” 💬</div>
        </div>
      </div>
      <Etiqueta t={t} de={M.pessoa - 0.1} cor={COR.amarelo} style={{left: 330, top: 820}}>☝️ uma pessoa só</Etiqueta>
      <Onda t={t} viva={viva} w={860} h={200} style={{left: 110, top: 900, opacity: mola(t, M.voz2 - 0.15, 12, 200)}} />
      <Etiqueta t={t} de={M.sobe - 0.1} cor={COR.verde} style={{left: 140, top: 1110}}>⬆️ sobe</Etiqueta>
      <Etiqueta t={t} de={M.desce - 0.1} cor={COR.verde} style={{left: 760, top: 1110}}>⬇️ desce</Etiqueta>
      <Carimbo t={t} de={M.sozinha - 0.15} cor={COR.verde} tamanho={50} rot={-5} style={{left: 280, top: 1200}}>🗣️ VOZ VIVA ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fecho: para de ler e começa a conversar ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.pronto - 0.15, M.gravar - 0.15);
  if (!st) return null;
  const conversa = prog(t, M.conversar - 0.15, 0.4, saida);
  const parou = prog(t, M.ler2 - 0.1, 0.3);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pronto - 0.1} top={430} tamanho={46}>AGORA É <span style={{color: COR.verde}}>CONVERSA</span></Titulo>
      <TelaRosto t={t} olhoX={parou > 0.5 ? 0 : leitura(t)} lendo={1 - parou} sorriso={conversa} verde={conversa} w={300} style={{left: 390, top: 530}} />
      <Onda t={t} viva={conversa} w={760} h={120} style={{left: 160, top: 1080}} />
      <Carimbo t={t} de={M.conversar - 0.15} cor={COR.verde} tamanho={44} rot={-4} style={{left: 150, top: 1220}}>CONVERSA, NÃO LEITURA ✓</Carimbo>
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
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>🗣️ PRA NÃO SOAR LIDO</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>📝 Tópicos, não texto<br />👩🏾 Fala como se fosse pra uma amiga</div>
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
  {som: 'impacto', em: M.lendo - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.decorar - 0.15, volume: 0.4},
  {som: 'tique', em: M.palavra - 0.1, volume: 0.35},
  {som: 'whoosh_in', em: M.teleprompter - 0.15, volume: 0.4},
  {som: 'swoosh', em: M.voz - 0.15, volume: 0.4},
  {som: 'pop', em: M.reta - 0.1, volume: 0.4},
  {som: 'pop', em: M.tom - 0.1, volume: 0.4},
  {som: 'pop', em: M.corre - 0.1, volume: 0.35},
  {som: 'swoosh', em: M.quem2 - 0.15, volume: 0.4},
  {som: 'risco', em: M.recado - 0.15, volume: 0.5},
  {som: 'pop', em: M.conversa - 0.15, volume: 0.35},
  {som: 'whoosh_out', em: M.passa - 0.05, volume: 0.5},
  {som: 'impacto', em: M.passa, volume: 0.45},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'risco', em: M.troca - 0.05, volume: 0.45},
  {som: 'pop', em: M.topicos - 0.1, volume: 0.4},
  {som: 'pop', em: M.tres - 0.1 + 0.3, volume: 0.4},
  {som: 'pop', em: M.tres - 0.1 + 0.6, volume: 0.4},
  {som: 'pop', em: M.resto - 0.1, volume: 0.35},
  {som: 'ding', em: M.jeito - 0.1, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'whoosh_in', em: M.amiga - 0.15, volume: 0.4},
  {som: 'pop', em: M.pessoa - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.sobe - 0.1, volume: 0.4},
  {som: 'pop', em: M.desce - 0.1, volume: 0.35},
  {som: 'ding', em: M.sozinha - 0.15, volume: 0.5},
  // Fecho
  {som: 'pop', em: M.pronto, volume: 0.4},
  {som: 'ding', em: M.conversar - 0.15, volume: 0.55},
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
    // Até "assiste" a abertura (o rosto lendo o teleprompter) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.lendo - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    // os selos "ACESSA O DIGO" e "LINK NA BIO" já dizem o que ela fala
    [M.acesse - 0.15, T.b],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {'lendo.': COR.vermelho, 'reta,': COR.vermelho, 'passa.': COR.vermelho, 'tópicos.': COR.verde, 'amiga.': COR.verde, 'sozinha.': COR.verde, 'conversar.': COR.verde, 'aprova.': COR.verde, 'site': COR.ciano},
  eventos: EVENTOS,
  Cena,
};
