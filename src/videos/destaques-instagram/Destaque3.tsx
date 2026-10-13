import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Check} from '../reels-avatar/Icones';
import {Palavras, Risco} from './Componentes';
import {Config, Evento} from './Destaque';
import {Grafico, Loja, Maleta} from './Icones';
import {em, PALAVRAS, TRECHOS} from './palavras_3';
import {caixa, COR, INTER, MONT, Pilula, prog, useBloco, useMola, useT} from './tema';

// Destaque 3 · Pra quem: três perfis de quem vende confiança, "dado ✓ achismo ✕" e o fechamento.

const T = {a: TRECHOS['3a'], meio: TRECHOS['3meio'], b: TRECHOS['3b'], fim: TRECHOS.fim};
const M = {
  digo: em('digo'),
  vende: em('vende'),
  confianca: em('confiança.'),
  especialista: em('especialista,'),
  advogado: em('advogado,'),
  medico: em('médico,'),
  psicologo: em('psicólogo,'),
  coach: em('coach,'),
  consultor: em('consultor.'),
  negocio: em('negócio'),
  clinica: em('clínica,'),
  salao: em('salão,'),
  academia: em('academia.'),
  social: em('social'),
  precisa: em('precisa'),
  defender: em('defender'),
  dado: em('dado,'),
  achismo: em('achismo.'),
  se: em('se'),
  venda: em('venda'),
  depende: em('depende'),
  aparecer: em('aparecer'),
  toda: em('toda'),
  autoridade: em('autoridade,'),
  digo2: em('digo', em('autoridade,')),
  voce: em('você.'),
};

const PERFIS: {nome: string; de: number; ate: number; cor: string; Icone: typeof Maleta; itens: [string, number][]}[] = [
  {nome: 'ESPECIALISTA', de: M.especialista, ate: M.negocio, cor: COR.azul, Icone: Maleta,
    itens: [['Advogado', M.advogado], ['Médico', M.medico], ['Psicólogo', M.psicologo], ['Coach', M.coach], ['Consultor', M.consultor]]},
  {nome: 'NEGÓCIO LOCAL', de: M.negocio, ate: M.social, cor: COR.ciano, Icone: Loja,
    itens: [['Clínica', M.clinica], ['Salão', M.salao], ['Academia', M.academia]]},
  {nome: 'SOCIAL MEDIA', de: M.social, ate: T.b, cor: COR.verde, Icone: Grafico, itens: []},
];

// Abertura em card: o título ao lado do avatar.
const Titulo: React.FC<{t: number}> = ({t}) => {
  const fora = prog(t, T.meio - 0.25, 0.25);
  if (fora >= 1) return null;
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${14 * fora}px)`}}>
      <Palavras t={t} tamanho={100} style={{position: 'absolute', left: 50, top: 340, width: 560}}
        pecas={[{texto: 'PRA', s: M.digo}, {texto: 'QUEM', s: M.digo + 0.2}, {texto: 'VENDE', s: M.vende}, {texto: 'CONFIANÇA', s: M.confianca, cor: COR.ciano, brilho: true}]} />
    </AbsoluteFill>
  );
};

// Progresso no topo: 3 bolinhas que acendem a cada perfil.
const Progresso: React.FC<{t: number}> = ({t}) => {
  if (t < M.especialista - 0.1 || t > T.b) return null;
  return (
    <div style={{position: 'absolute', top: 270, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22}}>
      {PERFIS.map((p) => {
        const on = prog(t, p.de, 0.3);
        return <div key={p.nome} style={{width: 80 + 60 * on, height: 16, borderRadius: 99, background: on > 0 ? p.cor : 'rgba(255,255,255,.18)', opacity: 0.35 + 0.65 * on}} />;
      })}
    </div>
  );
};

const Perfil: React.FC<{t: number; p: (typeof PERFIS)[number]}> = ({t, p}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, p.de - 0.12, p.ate - 0.25, 120);
  if (!st) return null;
  const {Icone} = p;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 360, padding: '56px 56px 60px', boxSizing: 'border-box', ...caixa, border: `4px solid ${p.cor}`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
          <div style={{width: 140, height: 140, borderRadius: 40, background: `${p.cor}26`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icone tamanho={90} cor={p.cor} />
          </div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 76, color: COR.branco}}>{p.nome}</div>
        </div>
        {p.itens.length > 0 && (
          <div style={{marginTop: 46, display: 'flex', flexWrap: 'wrap', gap: 20}}>
            {p.itens.map(([txt, s]) => {
              const e = mola(t, s - 0.05, 12, 220);
              return (
                <div key={txt} style={{opacity: e, scale: String(0.6 + 0.4 * e), translate: `0px ${(1 - e) * 30}px`}}>
                  <Pilula cor={p.cor} tamanho={60} fundo="rgba(8,18,48,.95)">{txt}</Pilula>
                </div>
              );
            })}
          </div>
        )}
        {p.itens.length === 0 && <DadoAchismo t={t} />}
      </div>
    </AbsoluteFill>
  );
};

// "defender a pauta com dado, não com achismo".
const DadoAchismo: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const d = mola(t, M.dado - 0.05, 11, 220);
  const a = mola(t, M.achismo - 0.15, 11, 220);
  const sub = mola(t, M.defender);
  return (
    <div style={{marginTop: 40}}>
      <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.cinza, opacity: sub}}>defende a pauta com</div>
      <div style={{marginTop: 24, display: 'flex', alignItems: 'center', gap: 22, opacity: d, scale: String(0.6 + 0.4 * d), transformOrigin: 'left center'}}>
        <div style={{width: 96, height: 96, borderRadius: 99, background: COR.verde, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check tamanho={64} cor={COR.marinho} /></div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 110, color: COR.verde, textShadow: '0 0 40px rgba(46,229,157,.5)'}}>DADO</div>
      </div>
      <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 22, opacity: a, transformOrigin: 'left center'}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.cinza}}>não com</div>
        <div style={{position: 'relative', fontFamily: MONT, fontWeight: 900, fontSize: 96, color: COR.branco}}>
          ACHISMO
          <Risco t={t} de={M.achismo + 0.1} espessura={14} />
        </div>
      </div>
    </div>
  );
};

// Fechamento: em card, "se a sua venda depende de…"; em tela cheia, etiquetas abaixo do rosto.
const Fechamento: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const fora1 = prog(t, M.aparecer - 0.25, 0.25);
  const sem = mola(t, M.toda, 12, 220);
  const aut = mola(t, M.autoridade, 10, 220);
  const fora2 = prog(t, M.digo2 - 0.25, 0.25);
  return (
    <AbsoluteFill>
      {t >= T.b + 0.35 && fora1 < 1 && (
        <div style={{opacity: 1 - fora1, filter: `blur(${14 * fora1}px)`}}>
          <Palavras t={t} tamanho={96} style={{position: 'absolute', left: 50, top: 380, width: 560}}
            pecas={[{texto: 'SUA', s: T.b + 0.35}, {texto: 'VENDA', s: M.venda, cor: COR.ciano, brilho: true}, {texto: 'DEPENDE', s: M.depende}, {texto: 'DE…', s: M.depende + 0.25}]} />
        </div>
      )}
      {t >= M.toda && fora2 < 1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1300, display: 'flex', justifyContent: 'center', gap: 24, opacity: 1 - fora2}}>
          <div style={{opacity: sem, scale: String(0.6 + 0.4 * sem)}}><Pilula cor={COR.ciano} tamanho={46} fundo="rgba(8,18,48,.95)">TODA SEMANA</Pilula></div>
          <div style={{opacity: aut, scale: String(0.6 + 0.4 * aut)}}><Pilula cor={COR.amarelo} tamanho={46} fundo="rgba(40,30,8,.95)">AUTORIDADE</Pilula></div>
        </div>
      )}
      {t >= M.digo2 + 0.25 && (
        <div style={{position: 'absolute', left: 50, top: 360, width: 560, display: 'flex', flexDirection: 'column', gap: 22}}>
          {PERFIS.map((p, i) => {
            const e = mola(t, M.digo2 + 0.25 + i * 0.1, 13, 210);
            const {Icone} = p;
            return (
              <div key={p.nome} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 24px', ...caixa, borderRadius: 28, border: `3px solid ${p.cor}`, opacity: e, translate: `${(1 - e) * -80}px 0px`}}>
                <Icone tamanho={62} cor={p.cor} />
                <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>{p.nome}</div>
              </div>
            );
          })}
          <div style={{marginTop: 20, fontFamily: MONT, fontWeight: 900, fontSize: 92, color: COR.ciano, opacity: mola(t, M.voce, 11, 220), textShadow: '0 0 40px rgba(62,198,255,.5)'}}>É PRA VOCÊ</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Titulo t={t} />
      <Progresso t={t} />
      {PERFIS.map((p) => (
        <Perfil key={p.nome} t={t} p={p} />
      ))}
      <Fechamento t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  {som: 'pop', em: M.digo, volume: 0.45},
  {som: 'pop', em: M.vende, volume: 0.45},
  {som: 'impacto', em: M.confianca, volume: 0.45},
  ...PERFIS.map((p): Evento => ({som: 'whoosh_in', em: p.de - 0.4, volume: 0.45})),
  ...PERFIS.flatMap((p) => p.itens.map(([, s]): Evento => ({som: 'pop', em: s - 0.05, volume: 0.45}))),
  {som: 'ding', em: M.dado - 0.05, volume: 0.4},
  {som: 'risco', em: M.achismo + 0.1, volume: 0.5},
  {som: 'impacto', em: M.achismo + 0.12, volume: 0.35},
  {som: 'pop', em: T.b + 0.35, volume: 0.45},
  {som: 'pop', em: M.toda, volume: 0.45},
  ...[0, 1, 2].map((i): Evento => ({som: 'pop', em: M.digo2 + 0.25 + i * 0.1, volume: 0.4})),
  {som: 'impacto', em: M.voce, volume: 0.45},
];

export const CONFIG_3: Config = {
  n: 3,
  palavras: PALAVRAS,
  trechos: T,
  // 3a acelera em 0,48–1,18 s: abertura em card. 3b congela no "Se" (14,47) e acelera em 18,36: card nesses pontos.
  estados: [
    {de: T.a, modo: 'card'},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'card'},
    {de: M.aparecer - 0.1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: M.autoridade, modo: 'cheia', escala: [1.08, 1.2], punch: true},
    {de: M.digo2 - 0.2, modo: 'card'},
  ],
  semLegenda: [
    [T.a, T.meio],
    [M.dado - 0.1, T.b],
    [M.se - 0.1, M.aparecer - 0.1],
    [M.digo2 - 0.2, T.fim],
  ],
  corEspecial: {'achismo.': COR.vermelho, 'dado,': COR.verde},
  eventos: EVENTOS,
  Cena,
};
