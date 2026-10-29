import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 036 · Esse erro faz quem assiste achar que você está de mau humor.
// Na câmera o rosto parado parece sério: a tela achata a expressão, e cara séria vira cara fechada.
// Abertura (o rosto fechado com a nuvem de chuva) → o porquê (a prensa da tela, "na sua cabeça × na tela", cara fechada e passa)
// → dica 1: sorri um segundo antes de começar (3, 2, 1, REC) → dica 2: a sobrancelha sobe nas palavras importantes → cara de conversa
// → ponte: o Digo Social é um site; acessa o Digo, tá no link da bio → CTA de seguir. Sem crédito extra: tudo animação.

const T = TRECHOS;
const M = {
  quem: em('quem'),
  assiste: em('assiste'),
  mau: em('mau'),
  humor: em('humor'),
  erro2: em('erro', T.meio),
  parada: em('parada'),
  camera: em('câmera'),
  achata: em('achata'),
  expressao: em('expressão'),
  rosto: em('rosto'),
  neutro: em('neutro'),
  tela: em('tela'),
  serio: em('sério'),
  seria: em('séria'),
  quem2: em('quem', T.meio),
  fechada: em('fechada'),
  passa: em('passa'),
  primeira: em('primeira', T.meio),
  sorri: em('sorri'),
  um: em('um', em('sorri')),
  segundo: em('segundo'),
  antes: em('antes'),
  comecar: em('começar'),
  falar: em('falar'),
  abre: em('abre'),
  leve: em('leve'),
  segunda: em('segunda'),
  levanta: em('levanta'),
  sobrancelha: em('sobrancelha'),
  palavras: em('palavras'),
  importantes: em('importantes'),
  rosto2: em('rosto', em('importantes')),
  acompanha: em('acompanha'),
  diz: em('diz'),
  pronto: em('pronto'),
  mesma: em('mesma'),
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


// ---------- O rosto de frente: `sorriso` −1 (boca para baixo) a 1 (sorriso aberto), `sobr` levanta as sobrancelhas, `bravo` franze ----------

const Rosto: React.FC<{sorriso?: number; sobr?: number; bravo?: number; w?: number}> = ({sorriso = 0, sobr = 0, bravo = 0, w = 540}) => {
  const olhoY = 108;
  const s = Math.max(0, sorriso);
  const olho = (cx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={olhoY} rx={14} ry={Math.max(4, 10 + 1.5 * s + 2.5 * sobr - 3 * bravo)} fill="#fff" />
      <circle cx={cx} cy={olhoY + 1} r={6.5} fill="#1C1210" />
    </g>
  );
  const b = 90 - 3 * s - 12 * sobr + 3 * bravo;
  const dentro = 8 * bravo - 4 * sobr;
  return (
    <svg width={w} height={w * 1.1} viewBox="0 0 200 220">
      <circle cx={100} cy={82} r={86} fill="#1C1210" />
      <circle cx={34} cy={66} r={34} fill="#1C1210" />
      <circle cx={166} cy={66} r={34} fill="#1C1210" />
      <path d="M 10 220 Q 20 170 100 166 Q 180 170 190 220 Z" fill={COR.azul} />
      <rect x={84} y={150} width={32} height={30} fill="#6B3F26" />
      <ellipse cx={100} cy={112} rx={58} ry={66} fill="#7A4A2E" />
      <path d={`M 62 ${b + 2} Q 76 ${b - 4} 90 ${b + dentro}`} stroke="#1C1210" strokeWidth={5.5} fill="none" strokeLinecap="round" />
      <path d={`M 110 ${b + dentro} Q 124 ${b - 4} 138 ${b + 2}`} stroke="#1C1210" strokeWidth={5.5} fill="none" strokeLinecap="round" />
      {olho(76)}
      {olho(124)}
      <path d="M 96 120 Q 100 134 106 130" stroke="#5A3220" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={`M ${82 - 4 * s} 150 Q 100 ${150 + 16 * sorriso} ${118 + 4 * s} 150`} stroke="#3A1E12" strokeWidth={5} fill={sorriso > 0.5 ? '#3A1E12' : 'none'} strokeLinecap="round" />
    </svg>
  );
};

// ---------- A nuvem de chuva (cara fechada) e o sol (cara aberta) ----------

const Nuvem: React.FC<{t: number; w?: number; style?: React.CSSProperties}> = ({t, w = 260, style}) => (
  <svg width={w} height={w * 0.75} viewBox="0 0 160 120" style={{position: 'absolute', ...style}}>
    {[0, 1, 2, 3, 4].map((i) => {
      const y = 62 + ((t * 70 + i * 23) % 50);
      return <path key={i} d={`M ${36 + i * 22} ${y} l -4 12`} stroke={COR.ciano} strokeWidth={5} strokeLinecap="round" opacity={1 - (y - 62) / 50} />;
    })}
    <g fill="#5B6478">
      <circle cx={52} cy={44} r={24} />
      <circle cx={86} cy={34} r={30} />
      <circle cx={116} cy={48} r={20} />
      <rect x={30} y={44} width={106} height={24} rx={12} />
    </g>
  </svg>
);

const Sol: React.FC<{t: number; w?: number; style?: React.CSSProperties}> = ({t, w = 200, style}) => (
  <svg width={w} height={w} viewBox="0 0 100 100" style={{position: 'absolute', ...style}}>
    <g style={{transformOrigin: '50px 50px', rotate: `${t * 30}deg`}}>
      {Array.from({length: 10}, (_, i) => <rect key={i} x={47} y={4} width={6} height={16} rx={3} fill={COR.amarelo} transform={`rotate(${i * 36} 50 50)`} />)}
    </g>
    <circle cx={50} cy={50} r={24} fill={COR.amarelo} />
  </svg>
);

// ---------- O celular gravando o rosto ----------

const TelaRosto: React.FC<{t: number; sorriso?: number; sobr?: number; bravo?: number; nuvem?: number; sol?: number; verde?: number; rec?: boolean; w?: number; style?: React.CSSProperties}> = ({t, sorriso = 0, sobr = 0, bravo = 0, nuvem = 0, sol = 0, verde = 0, rec = true, w = 380, style}) => {
  const h = (w * 16) / 9;
  const f = w / 440;
  const brilho = verde * (0.6 + 0.4 * Math.abs(Math.sin(t * 4)));
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44 * f, border: `${10 * f}px solid ${verde > 0.01 ? COR.verde : '#1B2238'}`, background: 'linear-gradient(180deg, #2B3550, #1A2238)', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${70 * brilho}px rgba(46,229,157,${0.7 * brilho})`, ...style}}>
      <div style={{position: 'absolute', left: w * 0.06, top: h * 0.3}}>
        <Rosto sorriso={sorriso} sobr={sobr} bravo={bravo} w={w * 0.88} />
      </div>
      {nuvem > 0.01 && <Nuvem t={t} w={w * 0.55} style={{left: w * 0.24, top: h * 0.1, opacity: nuvem}} />}
      {sol > 0.01 && <Sol t={t} w={w * 0.4} style={{left: w * 0.56, top: h * 0.08, opacity: sol, scale: String(0.5 + 0.5 * sol)}} />}
      <div style={{position: 'absolute', left: 18 * f, top: 22 * f, display: 'flex', alignItems: 'center', gap: 8 * f, fontFamily: INTER, fontWeight: 800, fontSize: 22 * f, color: '#fff'}}>
        <div style={{width: 14 * f, height: 14 * f, borderRadius: 99, background: rec ? COR.vermelho : '#8A93A8', opacity: rec ? (Math.round(t * 2) % 2 ? 1 : 0.3) : 1}} /> {rec ? 'REC' : 'PRONTA'}
      </div>
    </div>
  );
};

const PALCO = {left: 350, top: 560};

// ---------- Abertura: o rosto fechado com a nuvem de chuva ----------

// A abertura cobre o clipe até "mau humor": antes disso a boca da Luísa sai artificial (ver sincronia.md).
const A0 = M.mau - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 240, top: 640, scale: String(1 + 0.06 * t)}}>
        <Rosto bravo={1} sorriso={-0.7} w={600} />
      </div>
      <Nuvem t={t} w={340} style={{left: 370, top: 400, translate: `${12 * Math.sin(t * 2)}px 0px`}} />
      <Etiqueta t={t} de={0.15} cor={COR.vermelho} style={{left: 375, top: 1450}}>😐 TÁ BRAVO?</Etiqueta>
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>😐</span> CARA<br /><span style={{color: COR.vermelho}}>FECHADA</span>
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
      <Carimbo t={t} de={M.humor - 0.1} cor={COR.vermelho} tamanho={56} rot={-6} style={{left: 250, top: 1530}}>😠 MAU HUMOR</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['🙂 SORRI ANTES', '🤨 SOBRANCELHA NO IMPORTANTE'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): a cara parada; a câmera achata a expressão ----------

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.rosto - 0.15);
  if (!st) return null;
  const rosto = mola(t, M.parada - 0.15, 12, 200);
  const achata = prog(t, M.achata - 0.1, 0.45, saida);
  const prensa = mola(t, M.camera - 0.15, 12, 200);
  const H = 506;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={50}>O ERRO: <span style={{color: COR.vermelho}}>CARA PARADA</span></Titulo>
      <div style={{position: 'absolute', left: 310, top: 580, height: H, opacity: rosto, scale: `${1 + 0.08 * achata} ${1 - 0.32 * achata}`, transformOrigin: '50% 100%'}}>
        <Rosto sorriso={0.25 * (1 - achata)} w={460} />
      </div>
      <div style={{position: 'absolute', left: 230, width: 620, top: 520 + 0.32 * H * achata - (1 - prensa) * 400, height: 56, borderRadius: 16, background: 'linear-gradient(180deg, #3A4560, #1B2238)', border: '4px solid #8A93A8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.branco, opacity: prensa, boxShadow: '0 20px 40px rgba(0,0,0,.5)'}}>📱 A TELA</div>
      <Etiqueta t={t} de={M.expressao - 0.1} cor={COR.vermelho} style={{left: 330, top: 1130}}>📉 EXPRESSÃO −50%</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): na sua cabeça é neutro; na tela parece sério ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.rosto - 0.15, M.seria - 0.25);
  if (!st) return null;
  const a = mola(t, M.rosto - 0.12, 11, 220);
  const b = mola(t, M.tela - 0.12, 11, 220);
  const bravo = prog(t, M.serio - 0.15, 0.35, saida);
  const card = (e: number, cor: string, nome: string, rosto: React.ReactNode) => (
    <div style={{width: 470, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: e, translate: `0px ${(1 - e) * 120}px`, scale: String(0.85 + 0.15 * e)}}>
      <div style={{position: 'relative', width: 450, height: 520, borderRadius: 34, overflow: 'hidden', background: 'linear-gradient(180deg, #2B3550, #1A2238)', border: `5px solid ${cor}`, boxShadow: '0 30px 70px rgba(0,0,0,.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>{rosto}</div>
      <div style={{padding: '10px 18px', borderRadius: 16, background: 'rgba(8,16,44,.95)', border: `4px solid ${cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco, whiteSpace: 'nowrap'}}>{nome}</div>
    </div>
  );
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 50, right: 50, top: 470, display: 'flex', justifyContent: 'space-between'}}>
        {card(a, COR.ciano, '😶 NA SUA CABEÇA', <Rosto sorriso={0.3} w={420} />)}
        {card(b, COR.vermelho, '😠 NA TELA', (
          <div style={{scale: `1.06 ${1 - 0.2 * bravo}`, transformOrigin: '50% 100%'}}>
            <Rosto sorriso={-0.5 * bravo} bravo={bravo} w={420} />
          </div>
        ))}
      </div>
      <Etiqueta t={t} de={M.neutro - 0.1} cor={COR.ciano} style={{left: 175, top: 1130}}>neutro</Etiqueta>
      <Etiqueta t={t} de={M.serio - 0.1} cor={COR.vermelho} style={{left: 690, top: 1130}}>sério</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (3): cara séria é cara fechada; e passa ----------

const Porque3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.seria - 0.25, M.primeira - 0.15);
  if (!st) return null;
  const sobe = prog(t, M.passa - 0.05, 0.45, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quem2 - 0.1} top={440} tamanho={50}>QUEM ASSISTE <span style={{color: COR.vermelho}}>VÊ</span></Titulo>
      <TelaRosto t={t} bravo={1} sorriso={-0.6} nuvem={mola(t, M.fechada - 0.2, 12, 200)} style={{...PALCO, translate: `0px ${-1400 * sobe}px`}} />
      <Carimbo t={t} de={M.fechada - 0.1} cor={COR.vermelho} tamanho={52} rot={-6} style={{left: 150, top: 1150, opacity: 1 - sobe}}>🌧️ CARA FECHADA</Carimbo>
      {t >= M.passa - 0.1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 860, display: 'flex', justifyContent: 'center'}}>
          <Carimbo t={t} de={M.passa - 0.05} cor={COR.vermelho} tamanho={60} rot={-4} style={{position: 'relative'}}>PRÓXIMO ⬆️</Carimbo>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Dica 1: sorri um segundo antes de começar a falar (3, 2, 1, REC) ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const sorri = prog(t, M.sorri - 0.1, 0.5, saida);
  const marcas = [M.sorri, M.um, M.antes];
  const n = marcas.filter((m) => t >= m - 0.08).length;
  const gravando = t >= M.comecar - 0.05;
  const pop = gravando ? mola(t, M.comecar - 0.05, 9, 260) : n ? mola(t, marcas[n - 1] - 0.08, 9, 260) : 0;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <TelaRosto t={t} sorriso={sorri} bravo={1 - sorri} rec={gravando} verde={prog(t, M.leve - 0.1, 0.3)} sol={mola(t, M.abre - 0.1, 12, 200)} style={{left: 280, top: 560}} />
      {n > 0 && (
        <div style={{position: 'absolute', left: 720, top: 640, width: 300, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: gravando ? 96 : 240, lineHeight: 1, color: gravando ? COR.vermelho : COR.amarelo, scale: String(interpolate(pop, [0, 1], [1.6, 1])), textShadow: '0 10px 40px rgba(0,0,0,.5)'}}>
          {gravando ? '● REC' : 4 - n}
        </div>
      )}
      <Etiqueta t={t} de={M.segundo - 0.1} cor={COR.amarelo} style={{left: 740, top: 940}}>⏱️ 1 seg<br />antes</Etiqueta>
      <Carimbo t={t} de={M.leve - 0.1} cor={COR.verde} tamanho={46} rot={-5} style={{left: 220, top: 1230}}>JÁ ABRE LEVE ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: a sobrancelha sobe nas palavras importantes ----------

const pulso = (t: number, m: number) => prog(t, m - 0.1, 0.12) * (1 - prog(t, m + 0.35, 0.2));

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const batidas = [M.sobrancelha, M.importantes - 0.05, M.importantes + 0.35, M.acompanha];
  const sobr = Math.max(...batidas.map((m) => pulso(t, m)));
  const frase = mola(t, M.palavras - 0.15, 12, 200);
  const acende = (m: number) => t >= m - 0.1;
  const palavra = (texto: string, m: number) => (
    <span style={{color: acende(m) ? COR.amarelo : COR.branco, display: 'inline-block', scale: String(acende(m) ? 1 + 0.15 * pulso(t, m) : 1)}}>{texto}</span>
  );
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <div style={{position: 'absolute', left: 330, top: 530, opacity: mola(t, M.segunda - 0.1, 12, 200)}}>
        <Rosto sorriso={0.45} sobr={sobr} w={420} />
      </div>
      <Etiqueta t={t} de={M.sobrancelha - 0.1} cor={COR.amarelo} style={{left: 760, top: 600, opacity: 0.4 + 0.6 * sobr}}>🤨 sobe!</Etiqueta>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1010, padding: '22px 30px', ...caixa, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.branco, opacity: frase, translate: `0px ${(1 - frase) * 60}px`}}>
        Isso {palavra('MUDA', M.importantes - 0.05)} o seu{' '}{palavra('VÍDEO', M.importantes + 0.35)}
      </div>
      <Carimbo t={t} de={M.acompanha - 0.1} cor={COR.verde} tamanho={44} rot={-5} style={{left: 180, top: 1200}}>O ROSTO ACOMPANHA ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fecho: a mesma fala, com cara de quem quer conversar ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pronto - 0.15, M.gravar - 0.15);
  if (!st) return null;
  const abre = prog(t, M.conversar - 0.2, 0.4, saida);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.mesma - 0.1} top={430} tamanho={46}>A MESMA FALA, <span style={{color: COR.verde}}>OUTRA CARA</span></Titulo>
      <TelaRosto t={t} sorriso={0.5 + 0.5 * abre} sobr={0.4 * abre} sol={mola(t, M.mesma, 12, 200)} verde={abre} w={300} style={{left: 390, top: 540}} />
      <Carimbo t={t} de={M.conversar - 0.1} cor={COR.verde} tamanho={44} rot={-4} style={{left: 170, top: 1150}}>😊 CARA DE CONVERSA ✓</Carimbo>
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
              <Rosto sorriso={1} w={116} />
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
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>🙂 CARA ABERTA NA CÂMERA</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>🙂 Sorri antes de começar<br />🤨 Sobrancelha no importante</div>
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
  {som: 'impacto', em: M.humor - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.camera - 0.15, volume: 0.4},
  {som: 'impacto', em: M.achata - 0.05, volume: 0.45},
  {som: 'pop', em: M.expressao - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.rosto - 0.12, volume: 0.4},
  {som: 'whoosh_in', em: M.tela - 0.12, volume: 0.4},
  {som: 'risco', em: M.serio - 0.1, volume: 0.45},
  {som: 'swoosh', em: M.seria - 0.25, volume: 0.4},
  {som: 'impacto', em: M.fechada - 0.15, volume: 0.5},
  {som: 'whoosh_out', em: M.passa - 0.05, volume: 0.5},
  {som: 'impacto', em: M.passa, volume: 0.45},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.sorri - 0.08, volume: 0.45},
  {som: 'pop', em: M.um - 0.08, volume: 0.45},
  {som: 'pop', em: M.antes - 0.08, volume: 0.45},
  {som: 'toque', em: M.comecar - 0.05, volume: 0.55},
  {som: 'ding', em: M.leve - 0.1, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.sobrancelha - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.palavras - 0.15, volume: 0.4},
  {som: 'pop', em: M.importantes - 0.1, volume: 0.45},
  {som: 'pop', em: M.importantes + 0.3, volume: 0.45},
  {som: 'ding', em: M.acompanha - 0.1, volume: 0.5},
  // Fecho
  {som: 'pop', em: M.pronto, volume: 0.4},
  {som: 'ding', em: M.conversar - 0.1, volume: 0.55},
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
    // Até "mau humor" a abertura (o rosto fechado com a nuvem) cobre o trecho artificial do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.14, 1.22], punch: true},
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
  corEspecial: {'humor.': COR.vermelho, 'parada.': COR.vermelho, 'sério.': COR.vermelho, 'fechada.': COR.vermelho, 'passa.': COR.vermelho, 'leve.': COR.verde, 'importantes.': COR.verde, 'diz.': COR.verde, 'conversar.': COR.verde, 'aprova.': COR.verde, 'site': COR.ciano},
  eventos: EVENTOS,
  Cena,
};
