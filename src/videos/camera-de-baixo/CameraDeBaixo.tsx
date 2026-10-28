import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 032 · Esse erro faz você olhar quem assiste de cima pra baixo.
// Celular na altura do peito filma de baixo pra cima: aparece queixo, nariz e teto, e o olhar fica "de cima".
// Abertura (o rosto visto de baixo) → o porquê (a pessoa de lado, o cone da câmera subindo) → dica 1: lente na altura
// dos olhos, com a pilha de livros → dica 2: se errar, erra pra cima → de igual pra igual → ponte: o Digo Social
// sugere, escreve a legenda e agenda; baixa o Digo, tá no link da bio → CTA de seguir. Sem crédito extra: tudo animação.

const T = TRECHOS;
const M = {
  olhar: em('olhar'),
  cima: em('cima'),
  baixo: em('baixo'),
  erro2: em('erro', T.meio),
  celular: em('celular', T.meio),
  embaixo: em('embaixo'),
  peito: em('peito'),
  camera: em('câmera', T.meio),
  pega: em('pega'),
  aparece: em('aparece'),
  queixo: em('queixo'),
  nariz: em('nariz'),
  teto: em('teto'),
  quem2: em('quem', T.meio),
  olhando: em('olhando'),
  arrogancia: em('arrogância'),
  primeira: em('primeira', T.meio),
  sobe: em('sobe'),
  altura2: em('altura', em('sobe')),
  olhos: em('olhos'),
  tripe: em('tripé'),
  pilha: em('pilha'),
  segunda: em('segunda'),
  erra: em('erra'),
  acima: em('acima'),
  leve: em('leve'),
  aberto: em('aberto'),
  pronto: em('pronto'),
  conversa: em('conversa'),
  igual: em('igual'),
  gravar: em('gravar'),
  postar2: em('postar', em('gravar')),
  digo1: em('digo', T.meio),
  sugere: em('sugere'),
  escreve: em('escreve'),
  legenda: em('legenda'),
  agenda: em('agenda'),
  aplicativo: em('aplicativo'),
  aprova: em('aprova', em('agenda')),
  baixa: em('baixe', em('aprova', em('agenda'))),
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

// ---------- O rosto visto pela câmera: `baixo` 1 = câmera de baixo pra cima (queixo, narinas, olhar de cima),
// `cima` 1 = lente um pouco acima dos olhos (rosto leve, olhar aberto); os dois em 0 = na altura dos olhos ----------

const RostoAngulo: React.FC<{baixo: number; cima?: number; w?: number}> = ({baixo: k, cima: u = 0, w = 540}) => {
  const olhoY = 108 - 10 * k + 3 * u;
  const sobr = 92 - 12 * k - 4 * u;
  const olho = (cx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={olhoY} rx={14} ry={10 - 3 * k + 2 * u} fill="#fff" />
      <circle cx={cx} cy={olhoY + 4 * k - 2 * u} r={6.5} fill="#1C1210" />
      <rect x={cx - 16} y={olhoY - 12} width={32} height={10 * k} fill="#7A4A2E" />
    </g>
  );
  return (
    <svg width={w} height={w * 1.1} viewBox="0 0 200 220">
      <g transform={`translate(0 ${10 * k}) scale(1 ${1 - 0.04 * k})`}>
        <circle cx={100} cy={82 + 6 * k} r={86} fill="#1C1210" />
        <circle cx={34} cy={66 + 8 * k} r={34} fill="#1C1210" />
        <circle cx={166} cy={66 + 8 * k} r={34} fill="#1C1210" />
      </g>
      <path d="M 10 220 Q 20 170 100 166 Q 180 170 190 220 Z" fill={COR.azul} />
      <rect x={84 - 12 * k} y={150} width={32 + 24 * k} height={30} fill="#6B3F26" />
      {/* parte de baixo do queixo, que só aparece quando a câmera está embaixo */}
      <ellipse cx={100} cy={166} rx={44 + 8 * k} ry={0.1 + 20 * k} fill="#5E361F" />
      <ellipse cx={100} cy={112 + 4 * k} rx={58} ry={66 - 4 * u} fill="#7A4A2E" />
      <ellipse cx={100} cy={70} rx={40} ry={18} fill="#fff" opacity={0.12 * u} />
      <path d={`M 62 ${sobr + 4 * k} Q 76 ${sobr - 2} 90 ${sobr}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M 110 ${sobr} Q 124 ${sobr - 2} 138 ${sobr + 4 * k}`} stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
      {olho(76)}
      {olho(124)}
      <path d={`M 96 ${120 - 2 * k} Q 100 ${134 - 2 * k} 106 ${130 - 2 * k}`} stroke="#5A3220" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={92} cy={133} rx={5} ry={3.5} fill="#2A140B" opacity={k} />
      <ellipse cx={108} cy={133} rx={5} ry={3.5} fill="#2A140B" opacity={k} />
      <path d={`M 80 ${150 + 2 * k} Q 100 ${150 - 5 * k + 10 * u} 120 ${150 + 2 * k}`} stroke="#3A1E12" strokeWidth={5} fill="none" strokeLinecap="round" />
    </svg>
  );
};

// ---------- A tela gravando: o teto com a lâmpada aparece quando a câmera está embaixo ----------

const TelaAngulo: React.FC<{t: number; baixo: number; cima?: number; rec?: boolean; verde?: number; w?: number; style?: React.CSSProperties}> = ({t, baixo, cima = 0, rec = true, verde = 0, w = 440, style}) => {
  const h = (w * 16) / 9;
  const brilho = verde * (0.6 + 0.4 * Math.abs(Math.sin(t * 4)));
  const pisca = Math.floor(t * 2) % 2 === 0;
  const f = w / 440;
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44 * f, border: `${10 * f}px solid ${verde > 0.01 ? COR.verde : '#1B2238'}`, background: '#0B0F18', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${70 * brilho}px rgba(46,229,157,${0.7 * brilho})`, ...style}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #2B3550, #1A2238)'}} />
      {/* teto e lâmpada */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 230 * f, opacity: baixo, background: 'linear-gradient(180deg, #4A5578, #2B3550)'}}>
        <div style={{position: 'absolute', left: w / 2 - 50 * f, top: 70 * f, width: 100 * f, height: 26 * f, borderRadius: 99, background: '#FFF6D8', boxShadow: `0 0 ${60 * f}px ${24 * f}px rgba(255,240,190,.55)`}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', translate: `0px ${baixo * 30 * f}px`, scale: String(1 + 0.08 * baixo), transformOrigin: '50% 100%'}}>
        <RostoAngulo baixo={baixo} cima={cima} w={540 * f} />
      </div>
      <div style={{position: 'absolute', left: 14 * f, top: 14 * f, display: 'flex', alignItems: 'center', gap: 8 * f, padding: `${5 * f}px ${12 * f}px`, borderRadius: 99, background: 'rgba(0,0,0,.55)'}}>
        <div style={{width: 14 * f, height: 14 * f, borderRadius: 99, background: rec && pisca ? '#FF3B30' : 'rgba(255,59,48,.35)'}} />
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 20 * f, color: '#fff'}}>REC</span>
      </div>
    </div>
  );
};

// ---------- A pessoa de lado: o celular, o cone da lente, a linha dos olhos e a pilha de livros ----------

const OLHO = {x: 236, y: 168};
const PISO = 690;

// `alto` 0 = celular no peito, 1 = na altura dos olhos, >1 = um pouco acima.
const yCelular = (alto: number) => interpolate(alto, [0, 1, 1.4], [440, OLHO.y, OLHO.y - 40], {extrapolateRight: 'clamp'});

const Lateral: React.FC<{t: number; alto: number; cone: number; linha?: number; livros?: number; corCone?: string; style?: React.CSSProperties}> = ({t, alto, cone, linha = 0, livros = 0, corCone = COR.vermelho, style}) => {
  const cx = 430;
  const cy = yCelular(alto);
  const ang = Math.atan2(OLHO.y + 20 - cy, 190 - cx);
  const L = 300;
  const a1 = ang - 0.3, a2 = ang + 0.3;
  const base = cy + 50;
  const nLivros = Math.max(0, Math.floor((PISO - base) / 44));
  const coresLivro = ['#E8505B', '#2F7BFF', '#F5B83D', '#2EE59D', '#8A3FFC', '#FF8A3D', '#3EC6FF', '#E8505B', '#2F7BFF', '#F5B83D', '#2EE59D', '#8A3FFC'];
  const pulso = 0.75 + 0.25 * Math.abs(Math.sin(t * 5));
  return (
    <svg width={540} height={720} viewBox="0 0 540 720" style={{position: 'absolute', overflow: 'visible', ...style}}>
      <line x1={20} y1={PISO} x2={530} y2={PISO} stroke="rgba(255,255,255,.25)" strokeWidth={4} />
      {/* corpo */}
      <rect x={110} y={250} width={150} height={PISO - 250} rx={60} fill={COR.azul} />
      <rect x={168} y={210} width={36} height={50} fill="#6B3F26" />
      {/* cabeça de perfil, olhando pra direita */}
      <circle cx={186} cy={160} r={74} fill="#7A4A2E" />
      <path d="M 112 160 A 74 74 0 0 1 250 120 Q 200 110 170 140 Q 150 170 130 220 Q 112 200 112 160 Z" fill="#1C1210" />
      <circle cx={92} cy={150} r={40} fill="#1C1210" />
      <path d="M 258 158 L 272 182 L 256 186" stroke="#5A3220" strokeWidth={5} fill="#7A4A2E" strokeLinejoin="round" />
      <ellipse cx={OLHO.x} cy={OLHO.y - 10} rx={9} ry={7} fill="#fff" />
      <circle cx={OLHO.x + 3} cy={OLHO.y - 10} r={4.5} fill="#1C1210" />
      <path d="M 236 206 Q 248 210 256 204" stroke="#3A1E12" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* linha dos olhos */}
      {linha > 0.01 && (
        <g opacity={linha}>
          <line x1={OLHO.x + 20} y1={OLHO.y - 10} x2={OLHO.x + 20 + 280 * linha} y2={OLHO.y - 10} stroke={COR.verde} strokeWidth={5} strokeDasharray="14 10" />
          <text x={OLHO.x + 34} y={OLHO.y - 26} textAnchor="start" fontFamily="Montserrat" fontWeight={900} fontSize={26} fill={COR.verde}>OLHOS</text>
        </g>
      )}
      {/* cone da lente */}
      {cone > 0.01 && (
        <polygon
          points={`${cx - 8},${cy} ${cx - 8 + L * Math.cos(a1)},${cy + L * Math.sin(a1)} ${cx - 8 + L * Math.cos(a2)},${cy + L * Math.sin(a2)}`}
          fill={corCone}
          opacity={0.28 * cone * pulso}
        />
      )}
      {/* pilha de livros */}
      {Array.from({length: nLivros}, (_, i) => {
        const e = clamp01(livros * nLivros - i);
        return <rect key={i} x={cx - 50 + (i % 2) * 8} y={PISO - 44 * (i + 1) - (1 - e) * 60} width={100} height={40} rx={6} fill={coresLivro[i]} opacity={e} />;
      })}
      {/* braço segurando (some quando os livros seguram o celular) */}
      <path d={`M 230 300 Q 330 ${(300 + cy) / 2 + 40} ${cx - 16} ${cy + 20}`} stroke="#7A4A2E" strokeWidth={30} fill="none" strokeLinecap="round" opacity={1 - livros} />
      {/* celular de lado */}
      <rect x={cx - 12} y={cy - 48} width={24} height={98} rx={8} fill="#0B0F18" stroke="#fff" strokeWidth={4} />
      <circle cx={cx - 12} cy={cy - 30} r={6} fill={corCone} />
    </svg>
  );
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const PALCO = {left: 320, top: 540};
const PALCO_D = {left: 600, top: 560};

// ---------- Abertura: o rosto visto de baixo pra cima ----------

// Até a Luísa entrar, a abertura cobre o começo do clipe.
const A0 = M.olhar - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <TelaAngulo t={t} baixo={1} style={{...PALCO, top: 640, scale: String(1 + 0.05 * t)}} />
      <Etiqueta t={t} de={0.15} cor={COR.vermelho} style={{left: 330, top: 1450}}>📐 DE BAIXO PRA CIMA</Etiqueta>
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>📱</span> CÂMERA<br /><span style={{color: COR.vermelho}}>LÁ EMBAIXO</span>
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
      <Carimbo t={t} de={M.cima - 0.1} cor={COR.vermelho} tamanho={54} rot={-6} style={{left: 120, top: 1530}}>😒 DE CIMA PRA BAIXO</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['📱 LENTE NOS OLHOS', '⬆️ ERRA PRA CIMA'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): o celular no peito filma de baixo pra cima ----------

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.meio, M.aparece - 0.15);
  if (!st) return null;
  const cone = prog(t, M.camera - 0.1, 0.35, saida);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={50}>O ERRO: <span style={{color: COR.vermelho}}>CELULAR LÁ EMBAIXO</span></Titulo>
      <Lateral t={t} alto={0} cone={cone} style={{left: 270, top: 560}} />
      <Etiqueta t={t} de={M.peito - 0.1} cor={COR.amarelo} style={{left: 730, top: 960}}>📱 altura do peito</Etiqueta>
      <Carimbo t={t} de={M.pega - 0.1} cor={COR.vermelho} tamanho={50} rot={-6} style={{left: 200, top: 1150}}>⬆️ DE BAIXO PRA CIMA</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): o que aparece no vídeo ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.aparece - 0.15, M.primeira - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.aparece - 0.1} top={440} tamanho={50}>O QUE <span style={{color: COR.ciano}}>APARECE</span></Titulo>
      <TelaAngulo t={t} baixo={1} style={PALCO} />
      <Etiqueta t={t} de={M.queixo - 0.1} cor={COR.vermelho} style={{left: 40, top: 1130}}>QUEIXO ➜</Etiqueta>
      <Etiqueta t={t} de={M.nariz - 0.1} cor={COR.vermelho} style={{left: 790, top: 1000}}>⬅ NARIZ</Etiqueta>
      <Etiqueta t={t} de={M.teto - 0.1} cor={COR.vermelho} style={{left: 790, top: 600}}>⬅ TETO 💡</Etiqueta>
      {t >= M.quem2 - 0.15 && <Etiqueta t={t} de={M.olhando - 0.15} cor={COR.amarelo} style={{left: 40, top: 760}}>👀 olhando de cima</Etiqueta>}
      <Carimbo t={t} de={M.arrogancia - 0.15} cor={COR.vermelho} tamanho={52} rot={-6} style={{left: 160, top: 1170}}>😒 PARECE ARROGÂNCIA</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 1: sobe o celular até a linha dos olhos; a pilha de livros segura ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const alto = prog(t, M.sobe - 0.05, 0.7, suave);
  const linha = prog(t, M.altura2 - 0.1, 0.5, saida);
  const livros = prog(t, M.pilha - 0.1, 0.8, saida);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <Lateral t={t} alto={alto} cone={1} linha={linha} livros={livros} corCone={alto > 0.9 ? COR.verde : COR.amarelo} style={{left: 20, top: 580, scale: '0.95'}} />
      <TelaAngulo t={t} baixo={1 - alto} verde={prog(t, M.olhos - 0.1, 0.3)} w={400} style={{left: 640, top: 600}} />
      {t < M.pilha - 0.1 && <Etiqueta t={t} de={M.tripe - 0.15} cor={COR.amarelo} style={{left: 60, top: 560}}>sem tripé? 🤔</Etiqueta>}
      <Etiqueta t={t} de={M.pilha - 0.1} cor={COR.verde} style={{left: 60, top: 560}}>📚 pilha de livros</Etiqueta>
      <Carimbo t={t} de={M.olhos - 0.15} cor={COR.verde} tamanho={44} rot={-5} style={{left: 110, top: 1190}}>LENTE NA ALTURA DOS OLHOS ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: se for errar, erra pra cima ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const sobe = prog(t, M.erra - 0.05, 0.6, suave);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Lateral t={t} alto={1 + 0.4 * sobe} cone={1} linha={1} livros={1} corCone={COR.verde} style={{left: 20, top: 580, scale: '0.95'}} />
      <TelaAngulo t={t} baixo={0} cima={sobe} verde={prog(t, M.leve - 0.1, 0.3)} w={400} style={{left: 640, top: 600}} />
      <Etiqueta t={t} de={M.acima - 0.1} cor={COR.amarelo} style={{left: 60, top: 560}}>⬆️ um pouquinho acima</Etiqueta>
      <Etiqueta t={t} de={M.leve - 0.1} cor={COR.verde} style={{left: 720, top: 530}}>😌 rosto leve</Etiqueta>
      <Carimbo t={t} de={M.aberto - 0.15} cor={COR.verde} tamanho={48} rot={-5} style={{left: 200, top: 1190}}>👀 OLHAR ABERTO ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fecho: de igual pra igual ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pronto - 0.15, M.gravar - 0.15);
  if (!st) return null;
  const linha = prog(t, M.conversa - 0.1, 0.5, saida);
  const W = 330;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pronto - 0.1} top={430} tamanho={46}>AGORA É <span style={{color: COR.verde}}>OLHO NO OLHO</span></Titulo>
      <TelaAngulo t={t} baixo={0} cima={0.4} verde={prog(t, M.igual - 0.15, 0.3)} w={W} style={{left: 170, top: 610}} />
      <TelaAngulo t={t} baixo={0} cima={0.4} rec={false} verde={prog(t, M.igual - 0.15, 0.3)} w={W} style={{left: 580, top: 610, opacity: mola(t, M.conversa - 0.15, 12, 200)}} />
      <div style={{position: 'absolute', left: 300, top: 610 + 330, width: 480 * linha, height: 6, background: `repeating-linear-gradient(90deg, ${COR.verde} 0 18px, transparent 18px 30px)`, zIndex: 5}} />
      <Etiqueta t={t} de={M.pronto} cor={COR.ciano} style={{left: 255, top: 535}}>você</Etiqueta>
      <Etiqueta t={t} de={M.conversa - 0.1} cor={COR.ciano} style={{left: 625, top: 535}}>quem assiste</Etiqueta>
      <Carimbo t={t} de={M.igual - 0.15} cor={COR.verde} tamanho={46} rot={-4} style={{left: 200, top: 1215}}>DE IGUAL PRA IGUAL ✓</Carimbo>
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
  const app = mola(t, M.aplicativo - 0.1, 10, 230);
  const baixa = mola(t, M.baixa - 0.12, 10, 230);
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
        <div style={{position: 'absolute', left: 90, right: 90, top: 790, padding: 30, ...caixa, border: `4px solid ${COR.verde}`, opacity: pronto * (1 - 0.5 * baixa), translate: `0px ${(1 - pronto) * 80}px`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.verde, letterSpacing: 2}}>POST PRONTO</div>
          <div style={{marginTop: 14, display: 'flex', gap: 20, alignItems: 'center'}}>
            <div style={{position: 'relative', width: 120, height: 190, borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, #2B3550, #1A2238)', border: '3px solid #fff', flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
              <RostoAngulo baixo={0} cima={0.4} w={116} />
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
      {baixa > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1190, display: 'flex', justifyContent: 'center', opacity: baixa, scale: String(interpolate(baixa, [0, 1], [1.7, 1])), rotate: `${-3 + (1 - baixa) * 8}deg`, zIndex: 6}}>
          <Pilula cor={COR.verde} tamanho={56} fundo="linear-gradient(135deg, #18B37A, #2EE59D)">⬇️ BAIXA O DIGO</Pilula>
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
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>📐 A ALTURA DA CÂMERA</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>📱 Lente na altura dos olhos<br />⬆️ Se for errar, erra pra cima</div>
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
  {som: 'pop', em: 0.15, volume: 0.4},
  {som: 'whoosh_out', em: A0 - 0.1, volume: 0.45},
  {som: 'impacto', em: M.cima - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'pop', em: M.peito - 0.1, volume: 0.35},
  {som: 'whoosh_in', em: M.camera - 0.1, volume: 0.4},
  {som: 'impacto', em: M.pega - 0.1, volume: 0.5},
  {som: 'swoosh', em: M.aparece - 0.15, volume: 0.4},
  {som: 'pop', em: M.queixo - 0.1, volume: 0.4},
  {som: 'pop', em: M.nariz - 0.1, volume: 0.4},
  {som: 'pop', em: M.teto - 0.1, volume: 0.4},
  {som: 'pop', em: M.olhando - 0.15, volume: 0.35},
  {som: 'risco', em: M.arrogancia - 0.15, volume: 0.5},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'whoosh_in', em: M.sobe - 0.05, volume: 0.45},
  {som: 'tique', em: M.altura2 - 0.1, volume: 0.35},
  {som: 'ding', em: M.olhos - 0.15, volume: 0.5},
  {som: 'pop', em: M.tripe - 0.15, volume: 0.35},
  {som: 'pop', em: M.pilha - 0.1, volume: 0.45},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'whoosh_in', em: M.erra - 0.05, volume: 0.4},
  {som: 'pop', em: M.acima - 0.1, volume: 0.4},
  {som: 'pop', em: M.leve - 0.1, volume: 0.4},
  {som: 'ding', em: M.aberto - 0.15, volume: 0.5},
  // Fecho
  {som: 'pop', em: M.pronto, volume: 0.4},
  {som: 'swoosh', em: M.conversa - 0.1, volume: 0.35},
  {som: 'ding', em: M.igual - 0.15, volume: 0.55},
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
  {som: 'impacto', em: M.baixa - 0.12, volume: 0.5},
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
    // Até "olhar" a abertura (o rosto visto de baixo) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.cima - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    // os selos "BAIXA O DIGO" e "LINK NA BIO" já dizem o que ela fala
    [M.baixa - 0.15, T.b],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {'embaixo.': COR.vermelho, 'arrogância.': COR.vermelho, 'olhos.': COR.verde, 'cima.': COR.amarelo, 'aberto.': COR.verde, 'igual.': COR.verde, 'aprova.': COR.verde, 'aplicativo': COR.ciano},
  eventos: EVENTOS,
  Cena,
};
