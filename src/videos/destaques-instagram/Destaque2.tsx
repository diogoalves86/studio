import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check} from '../reels-avatar/Icones';
import {Celular, Marca, Onda, Palavras, Selo, Toque} from './Componentes';
import {Config, Evento} from './Destaque';
import {Cadeado} from './Icones';
import {em, PALAVRAS, TRECHOS} from './palavras_2';
import {ARQ, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// Destaque 2 · Como funciona: tour do painel no celular, um módulo por fala, fechando o ciclo.

const T = {a: TRECHOS['2a'], meio: TRECHOS['2meio'], b: TRECHOS['2b'], fim: TRECHOS.fim};
const M = {
  olha: em('olha'),
  funciona: em('funciona'),
  pratica: em('prática.'),
  segunda: em('segunda,'),
  pulso: em('pulso'),
  funcionou: em('funcionou'),
  concentrar: em('concentrar'),
  durante: em('durante'),
  radar: em('radar'),
  oportunidades: em('oportunidades'),
  esfriar: em('esfriar.'),
  ai: em('aí'),
  pergunta: em('pergunta'),
  consultor: em('consultor,'),
  recomenda: em('recomenda'),
  motivo: em('motivo'),
  rascunho: em('rascunho.'),
  vai: em('vai'),
  calendario: em('calendário,'),
  aprova: em('aprova'),
  resultado: em('resultado'),
  post: em('post'),
  aprendizado: em('aprendizado'),
  proxima: em('próxima'),
  nada: em('nada'),
  publicado: em('publicado'),
  aprovar: em('aprovar.'),
};

// Celular central, um por módulo: entra com mola e sai com zoom + desfoque.
const LARG = 480;
const Passo: React.FC<{t: number; de: number; ate: number; n: string; nome: string; src: string; y: number | [number, number]; marcas?: Marca[]; zoom?: [number, number]; foco?: [number, number]; children?: React.ReactNode}> = ({
  t, de, ate, n, nome, src, y, marcas, zoom, foco, children,
}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, de, ate, 160);
  if (!st) return null;
  const yy = Array.isArray(y) ? interpolate(t, [de, ate], y, clamp) : y;
  const z = zoom ? interpolate(t, [zoom[0], zoom[0] + 0.6], [1, zoom[1]], {...clamp, easing: saida}) : 1;
  const et = mola(t, de + 0.05, 13, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 250, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: et, scale: String(0.7 + 0.3 * et), zIndex: 2}}>
        <Pilula cor={COR.ciano} tamanho={44} fundo="rgba(8,20,52,.95)">
          <span style={{color: COR.ciano}}>{n}</span> {nome}
        </Pilula>
      </div>
      <Celular t={t} src={src} y={yy} largura={LARG} zoom={z} foco={foco} marcas={marcas} style={{left: (1080 - LARG) / 2, top: 350}}>
        {children}
      </Celular>
    </AbsoluteFill>
  );
};

// "pergunta pro Consultor… já monta o rascunho": rascunho pronto sobe por cima do chat.
const Rascunho: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const e = mola(t, M.rascunho, 13, 190);
  if (e <= 0) return null;
  return (
    <div style={{position: 'absolute', left: 18, right: 18, bottom: 60, padding: '22px 24px', borderRadius: 26, background: '#F4F7FF', boxShadow: '0 20px 50px rgba(0,0,0,.5)', translate: `0px ${(1 - e) * 300}px`, fontFamily: INTER}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 22, color: COR.verde}}>
        <Check tamanho={26} cor={COR.verde} /> RASCUNHO PRONTO
      </div>
      <div style={{marginTop: 8, fontWeight: 700, fontSize: 24, color: COR.marinho}}>Carrossel: 5 critérios antes de escolher um procedimento</div>
    </div>
  );
};

// "Vai pro calendário, você aprova": botão Aprovar no celular, o dedo toca.
const Aprovar: React.FC<{t: number}> = ({t}) => {
  const ok = t >= M.aprova + 0.06;
  const aperta = interpolate(t, [M.aprova, M.aprova + 0.08, M.aprova + 0.18], [1, 0.9, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 18, right: 18, bottom: 70, padding: 20, borderRadius: 26, background: 'rgba(16,26,60,.97)', border: '2px solid rgba(62,198,255,.4)', boxShadow: '0 20px 50px rgba(0,0,0,.5)', fontFamily: INTER}}>
      <div style={{fontWeight: 700, fontSize: 20, color: COR.cinza}}>TER, 14 DE OUT · INSTAGRAM</div>
      <div style={{marginTop: 6, fontWeight: 700, fontSize: 24, color: COR.branco}}>Carrossel: 5 critérios antes de escolher</div>
      <div style={{position: 'relative', overflow: 'hidden', marginTop: 16, height: 64, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: ok ? COR.verde : COR.azul, scale: String(aperta), fontFamily: MONT, fontWeight: 800, fontSize: 28, color: ok ? COR.marinho : COR.branco}}>
        <Onda t={t} de={M.aprova + 0.04} cor={COR.branco} tamanho={600} />
        {ok ? (<>APROVADO <Check tamanho={30} cor={COR.marinho} /></>) : 'APROVAR'}
      </div>
    </div>
  );
};

// "…volta como aprendizado pra próxima semana": o ciclo de 4 passos se fecha.
const Ciclo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.aprendizado - 0.2, T.b + 0.15);
  if (!st) return null;
  const nos: [string, string][] = [['PULSO', COR.azul], ['RADAR', COR.ciano], ['CONSULTOR', COR.verde], ['CALENDÁRIO', COR.amarelo]];
  const R = 300;
  const cx = 540;
  const cy = 800;
  const arco = prog(t, M.aprendizado, 0.9, saida);
  const centro = mola(t, M.proxima, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={14} />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={COR.ciano} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={`${arco} 1`} transform={`rotate(-90 ${cx} ${cy})`} style={{filter: 'drop-shadow(0 0 16px rgba(62,198,255,.8))'}} />
      </svg>
      {nos.map(([txt, cor], i) => {
        const ang = -Math.PI / 2 + (i * Math.PI) / 2;
        const e = mola(t, M.aprendizado - 0.2 + i * 0.12, 13, 210);
        return (
          <div key={txt} style={{position: 'absolute', left: cx + R * Math.cos(ang), top: cy + R * Math.sin(ang), translate: '-50% -50%', opacity: e, scale: String(0.5 + 0.5 * e)}}>
            <Pilula cor={cor} tamanho={38} fundo="rgba(8,18,48,.96)">{txt}</Pilula>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: cx, top: cy, translate: '-50% -50%', textAlign: 'center', opacity: centro, scale: String(0.6 + 0.4 * centro)}}>
        <Img src={ARQ.logo} style={{width: 150, height: 150, borderRadius: 36}} />
        <div style={{marginTop: 14, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>APRENDE</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.ciano}}>TODA SEMANA</div>
      </div>
    </AbsoluteFill>
  );
};

// Abertura em card: título ao lado do avatar.
const Titulo: React.FC<{t: number}> = ({t}) => {
  const fora = prog(t, T.meio - 0.25, 0.25);
  if (fora >= 1) return null;
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${14 * fora}px)`}}>
      <Palavras t={t} tamanho={104} style={{position: 'absolute', left: 50, top: 300, width: 560}}
        pecas={[{texto: 'COMO', s: M.olha + 0.05}, {texto: 'O DIGO', s: M.olha + 0.25, cor: COR.ciano, brilho: true}, {texto: 'FUNCIONA', s: M.funciona}, {texto: 'NA PRÁTICA', s: M.pratica, cor: COR.amarelo}]} />
    </AbsoluteFill>
  );
};

// Fechamento em card: cadeado e "você aprova".
const Seguranca: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.publicado + 0.35 || t > T.fim) return null;
  const c = mola(t, M.publicado + 0.35, 12, 200);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 60, top: 520, width: 520, opacity: c, translate: `${(1 - c) * -60}px 0px`}}>
        <div style={{width: 150, height: 150, borderRadius: 40, background: `${COR.verde}22`, border: `4px solid ${COR.verde}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Cadeado tamanho={96} cor={COR.verde} />
        </div>
        <div style={{marginTop: 30, fontFamily: MONT, fontWeight: 900, fontSize: 76, lineHeight: 1.02, color: COR.branco}}>NADA SAI SEM O SEU</div>
      </div>
      <Selo t={t} de={M.aprovar} cor={COR.verde} tamanho={64} rot={-5} style={{left: 70, top: 900}}>OK ✓</Selo>
    </AbsoluteFill>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Titulo t={t} />
      <Passo t={t} de={T.meio} ate={M.durante - 0.25} n="1 ·" nome="PULSO SEMANAL" src={ARQ.print('painel-pulso-full')} y={[2520, 2700]}
        marcas={[{x: 100, y: 2700, w: 940, h: 180, de: M.pulso + 0.1}, {x: 80, y: 3195, w: 1010, h: 250, de: M.funcionou, cor: COR.verde}]}
        zoom={[M.concentrar, 1.25]} foco={[585, 3320]} />
      <Passo t={t} de={M.durante - 0.2} ate={M.ai - 0.25} n="2 ·" nome="RADAR" src={ARQ.print('painel-oportunidades')} y={[200, 340]}
        marcas={[{x: 40, y: 2230, w: 1000, h: 120, de: M.oportunidades}]} zoom={[M.oportunidades + 0.2, 1.18]} foco={[585, 2290]}>
        <Selo t={t} de={M.esfriar} cor={COR.amarelo} tamanho={34} rot={6} style={{right: 20, top: 120}}>92 · AGORA</Selo>
      </Passo>
      <Passo t={t} de={M.ai - 0.2} ate={M.vai - 0.25} n="3 ·" nome="CONSULTOR" src={ARQ.print('painel-consultor')} y={0}
        marcas={[{x: 50, y: 225, w: 1070, h: 275, de: M.pergunta}, {x: 40, y: 1060, w: 1080, h: 320, de: M.motivo, cor: COR.verde}]}>
        <Rascunho t={t} />
      </Passo>
      <Passo t={t} de={M.vai - 0.2} ate={M.resultado - 0.25} n="4 ·" nome="CALENDÁRIO" src={ARQ.print('painel-calendario')} y={0}>
        <Aprovar t={t} />
      </Passo>
      {/* Ponta do dedo (≈0,48 × 0,08 do ícone) sobre o botão Aprovar do celular. */}
      <Toque t={t} de={M.aprova - 0.45} toque={M.aprova} x={478} y={1190} tamanho={130} />
      <Passo t={t} de={M.resultado - 0.2} ate={M.aprendizado - 0.25} n="5 ·" nome="RESULTADOS" src={ARQ.print('painel-resultados-full')} y={[3700, 3780]}
        marcas={[{x: 50, y: 4040, w: 1060, h: 150, de: M.post, cor: COR.verde}]} />
      <Ciclo t={t} />
      <Seguranca t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  {som: 'pop', em: M.olha + 0.05, volume: 0.45},
  {som: 'pop', em: M.funciona, volume: 0.45},
  {som: 'impacto', em: M.pratica, volume: 0.4},
  {som: 'whoosh_in', em: M.pulso - 0.3, volume: 0.4},
  {som: 'risco', em: M.pulso + 0.1, volume: 0.4},
  {som: 'risco', em: M.funcionou, volume: 0.45},
  {som: 'whoosh_in', em: M.concentrar - 0.25, volume: 0.4},
  {som: 'swoosh', em: M.durante - 0.3, volume: 0.45},
  {som: 'risco', em: M.oportunidades, volume: 0.45},
  {som: 'impacto', em: M.esfriar, volume: 0.45},
  {som: 'swoosh', em: M.ai - 0.3, volume: 0.45},
  {som: 'risco', em: M.pergunta, volume: 0.4},
  {som: 'risco', em: M.motivo, volume: 0.45},
  {som: 'whoosh_in', em: M.rascunho - 0.15, volume: 0.4},
  {som: 'ding', em: M.rascunho + 0.15, volume: 0.35},
  {som: 'swoosh', em: M.vai - 0.3, volume: 0.45},
  {som: 'toque', em: M.aprova, volume: 0.7},
  {som: 'ding', em: M.aprova + 0.08, volume: 0.4},
  {som: 'swoosh', em: M.resultado - 0.3, volume: 0.45},
  {som: 'risco', em: M.post, volume: 0.4},
  {som: 'whoosh_in', em: M.aprendizado - 0.35, volume: 0.45},
  ...[0, 1, 2, 3].map((i): Evento => ({som: 'pop', em: M.aprendizado - 0.2 + i * 0.12, volume: 0.4})),
  {som: 'ding', em: M.proxima, volume: 0.35},
  {som: 'pop', em: M.publicado + 0.35, volume: 0.45},
  {som: 'impacto', em: M.aprovar, volume: 0.5},
];

export const CONFIG_2: Config = {
  n: 2,
  palavras: PALAVRAS,
  trechos: T,
  // A abertura (2a) acelera em 0,10–0,28 e 0,90–1,03 s: fica em card. O fechamento acelera em 18,33 s: card a partir de 18,2.
  estados: [
    {de: T.a, modo: 'card'},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.07]},
    {de: M.publicado - 0.1, modo: 'card'},
  ],
  semLegenda: [
    [T.a, T.meio],
    [M.aprendizado - 0.2, T.b],
    [M.publicado - 0.1, T.fim],
  ],
  eventos: EVENTOS,
  Cena,
};
