import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, suave, useBloco, useMola, useT} from './tema';

// 022 · Essas quatro coisas te dão shadowban, e você pode estar fazendo uma agora.
// Abertura (4 cartas viradas + "4" + SHADOWBAN) → a lista oficial do que o Instagram não recomenda → 1 sorteio →
// 2 isca de engajamento (e o "comenta EU QUERO" que pode) → 3 repost demais (10+ em 30 dias) → 4 link caça-clique →
// o que fazer: Status da conta, editar/apagar, 30 dias abaixo de 10 → CTA. Telas animadas (sem prints).

const T = TRECHOS;
const M = {
  quatro1: em('quatro'),
  shadow1: em('shadow'),
  voce: em('você'),
  agora: em('agora'),
  lista1: em('lista'),
  recomenda1: em('recomenda'),
  quatro2: em('quatro', T.meio),
  primeira: em('primeira'),
  sorteio1: em('sorteio'),
  post1: em('post'),
  recomendado: em('recomendado'),
  segunda: em('segunda'),
  isca: em('isca'),
  marca: em('marca'),
  ganhar: em('ganhar'),
  pedir: em('pedir'),
  comentar: em('comentar'),
  pode: em('pode', T.meio),
  terceira: em('terceira'),
  reposte1: em('reposte'),
  posta: em('posta'),
  dez1: em('dez'),
  dias1: em('dias'),
  inteiro: em('inteiro'),
  recomendacao3: em('recomendação', em('inteiro')),
  quarta: em('quarta'),
  link1: em('link', em('quarta')),
  site: em('site'),
  clique: em('clique'),
  eAi: em('e', em('instagram', em('clique'))),
  status: em('status'),
  marcado: em('marcado'),
  edita: em('edita'),
  apaga: em('apaga'),
  eSe2: em('e', em('post', em('apaga'))),
  depois: em('depois'),
  dez2: em('10'),
  volta: em('volta'),
  segue: em('segue', T.b),
  digo: em('digo', T.b),
  toda: em('toda', T.b),
};

// ---------- Peças comuns ----------

const Fonte: React.FC<{t: number; de: number; ate: number; icone?: string; veiculo: string; titulo: string; top?: number}> = ({t, de, ate, icone = '📰', veiculo, titulo, top = 1250}) => {
  const mola = useMola();
  const e = mola(t, de, 13, 200) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 30}px`, zIndex: 5}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, maxWidth: 960, padding: '12px 24px', borderRadius: 16, background: 'rgba(240,244,255,.95)', boxShadow: '0 12px 40px rgba(0,0,0,.45)'}}>
        <span style={{fontSize: 30}}>{icone}</span>
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.marinho, whiteSpace: 'nowrap'}}>Fonte: {veiculo}</span>
        <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 24, color: '#4A5578', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>· {titulo}</span>
      </div>
    </div>
  );
};

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

// "SHADOWBAN" escrito grande, com tremida de glitch (pedido do Diogo: a palavra aparece sempre que ela fala).
const PalavraShadowban: React.FC<{t: number; de: number; tamanho?: number; style?: React.CSSProperties}> = ({t, de, tamanho = 150, style}) => {
  const mola = useMola();
  const e = mola(t, de, 9, 260);
  if (e <= 0.01) return null;
  const glitch = (1 - prog(t, de + 0.05, 0.35)) * 1;
  const dx = Math.sin(t * 90) * 14 * glitch;
  const base: React.CSSProperties = {position: 'absolute', inset: 0, fontFamily: MONT, fontWeight: 900, fontSize: tamanho, letterSpacing: 4, textAlign: 'center', whiteSpace: 'nowrap'};
  return (
    <div style={{position: 'absolute', left: 0, right: 0, height: tamanho * 1.2, opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.2, 1])), ...style}}>
      <div style={{...base, color: COR.ciano, translate: `${-dx - 6 * glitch}px 0px`, opacity: 0.8 * glitch}}>SHADOWBAN</div>
      <div style={{...base, color: COR.vermelho, translate: `${dx + 6 * glitch}px 0px`, opacity: 0.8 * glitch}}>SHADOWBAN</div>
      <div style={{...base, color: COR.branco, textShadow: `0 0 40px rgba(255,77,94,.7), 0 10px 30px rgba(0,0,0,.6)`}}>SHADOWBAN</div>
    </div>
  );
};

// ---------- As quatro causas ----------

const CAUSAS = [
  {n: 1, icone: '🎁', nome: 'SORTEIO'},
  {n: 2, icone: '🎣', nome: 'ISCA DE ENGAJAMENTO'},
  {n: 3, icone: '🔁', nome: 'REPOST DEMAIS'},
  {n: 4, icone: '🔗', nome: 'LINK CAÇA-CLIQUE'},
];

// Carta da causa: começa virada ("?") e vira na palavra.
const Carta: React.FC<{t: number; de: number; n: number; w?: number; style?: React.CSSProperties}> = ({t, de, n, w = 300, style}) => {
  const giro = prog(t, de - 0.1, 0.35, suave);
  const frente = giro >= 0.5;
  const c = CAUSAS[n - 1];
  const k = w / 300;
  return (
    <div style={{position: 'absolute', width: w, height: w * 1.3, transform: `perspective(1200px) rotateY(${(frente ? 1 - giro : giro) * 180}deg)`, ...style}}>
      <div style={{width: '100%', height: '100%', borderRadius: 28 * k, background: frente ? 'linear-gradient(165deg, #2A0A14, #4A0F1E)' : 'linear-gradient(165deg, #1B2A55, #0E1630)', border: `${5 * k}px solid ${frente ? COR.vermelho : COR.ciano}`, boxShadow: frente ? `0 0 ${40 * k}px rgba(255,77,94,.5)` : '0 20px 50px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 * k, textAlign: 'center', padding: 16 * k}}>
        {frente ? (
          <>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40 * k, color: COR.vermelho}}>{c.n}</div>
            <div style={{fontSize: 110 * k}}>{c.icone}</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30 * k, lineHeight: 1.1, color: COR.branco}}>{c.nome}</div>
          </>
        ) : (
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 150 * k, color: COR.ciano}}>?</div>
        )}
      </div>
    </div>
  );
};

// Marcador de retenção: as quatro causas acendem conforme ela fala (no lugar do contador).
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.eAi + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.eAi + 0.1, 0.3));
  const marcas = [M.sorteio1, M.isca, M.reposte1, M.link1];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {CAUSAS.map((c, i) => {
        const on = t >= marcas[i] - 0.1;
        return (
          <div key={c.n} style={{width: 120, padding: '10px 0', borderRadius: 18, textAlign: 'center', background: on ? 'rgba(60,8,16,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.vermelho : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: on ? COR.branco : COR.cinza}}>
            {on ? `${c.icone} ${c.n}` : `? ${c.n}`}
          </div>
        );
      })}
    </div>
  );
};

// ---------- Abertura: 4 cartas viradas + SHADOWBAN ----------

// O relatório marcou 2,32–2,46 s («e») como artificial: a Luísa só entra em "você".
const A0 = M.voce - 0.03;

const Abertura: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const quatro = mola(t, M.quatro1 - 0.05, 9, 260);
  const tremor = Math.sin(t * 80) * 10 * prog(t, M.shadow1 - 0.04, 0.04) * (1 - prog(t, M.shadow1 + 0.02, 0.15));
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 22}}>
        {[0, 1, 2, 3].map((i) => {
          const e = mola(t, 0.03 + i * 0.08, 12, 230);
          return (
            <div key={i} style={{width: 210, height: 280, borderRadius: 22, background: 'linear-gradient(165deg, #1B2A55, #0E1630)', border: `4px solid ${COR.ciano}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 120, color: COR.ciano, opacity: e, translate: `0px ${(1 - e) * 80}px`, rotate: `${(i - 1.5) * 4}deg`}}>?</div>
          );
        })}
      </div>
      {quatro > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 230, color: COR.vermelho, opacity: quatro * (1 - prog(t, M.shadow1 - 0.15, 0.15)), scale: String(interpolate(quatro, [0, 1], [2.2, 1])), textShadow: '0 0 60px rgba(255,77,94,.6)'}}>4</div>}
      <PalavraShadowban t={t} de={M.shadow1 - 0.08} tamanho={112} style={{top: 860}} />
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, M.shadow1 - 0.05, 0.05) * (1 - prog(t, M.shadow1, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>⚠️</span> <span style={{color: COR.vermelho}}>4 COISAS</span> QUE TE<br />DÃO <span style={{color: COR.vermelho}}>SHADOWBAN</span>
          </div>
        </div>
      </div>
    </>
  );
};

// No peito dela: as quatro cartas viradas e a pergunta.
const CartasPeito: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, A0 + 0.1, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        {[1, 2, 3, 4].map((n) => <div key={n} style={{width: 90, height: 118, borderRadius: 14, background: 'linear-gradient(165deg, #1B2A55, #0E1630)', border: `3px solid ${COR.ciano}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 56, color: COR.ciano}}>?</div>)}
      </div>
      <Carimbo t={t} de={M.agora - 0.05} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 200, top: 1540}}>VOCÊ FAZ ALGUMA?</Carimbo>
    </>
  );
};

// ---------- A lista oficial ----------

const Lista: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.primeira - 0.15);
  if (!st) return null;
  const doc = mola(t, M.lista1 - 0.1, 12, 200);
  const desenrola = prog(t, M.lista1, 0.8, suave);
  const nao = mola(t, M.recomenda1 - 0.1, 9, 260);
  const quatro = mola(t, M.quatro2 - 0.1, 10, 240);
  const linhas = 9;
  const destacadas = [1, 3, 5, 7];
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.lista1 - 0.1} top={440} tamanho={52}>A LISTA <span style={{color: COR.amarelo}}>OFICIAL</span> DO INSTAGRAM</Titulo>
      <div style={{position: 'absolute', left: 190, right: 190, top: 560, height: 640 * desenrola, overflow: 'hidden', borderRadius: 24, background: '#F2F4F8', boxShadow: '0 30px 80px rgba(0,0,0,.5)', opacity: doc}}>
        <div style={{padding: '26px 30px'}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.marinho}}>DIRETRIZES DE RECOMENDAÇÃO</div>
          <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 20, color: '#6A7290', marginBottom: 16}}>o que o Instagram não recomenda pra quem não te segue</div>
          {Array.from({length: linhas}, (_, i) => {
            const d = destacadas.indexOf(i);
            const on = d >= 0 && quatro > 0.01;
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, height: 50}}>
                <div style={{width: 14, height: 14, borderRadius: 99, background: on ? COR.vermelho : '#C5CAD8'}} />
                <div style={{flex: 1, height: 16, borderRadius: 8, background: on ? `rgba(255,77,94,${0.35 + 0.4 * quatro})` : '#D8DCE6', filter: on ? 'none' : 'blur(1px)'}} />
                {on && <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 26, color: COR.vermelho, opacity: quatro}}>{d + 1}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <Carimbo t={t} de={M.recomenda1 - 0.1} cor={COR.vermelho} tamanho={56} rot={-8} style={{left: 380, top: 1060, opacity: nao}}>NÃO RECOMENDA ✕</Carimbo>
      <Fonte t={t} de={M.lista1} ate={M.primeira} top={1250} veiculo="Central de Ajuda do Instagram" titulo="Diretrizes de recomendação" />
    </AbsoluteFill>
  );
};

// ---------- Causa 1: sorteio ----------

const CausaSorteio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const post = mola(t, M.post1 - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <Carta t={t} de={M.sorteio1} n={1} w={260} style={{left: 90, top: 470}} />
      <Titulo t={t} de={M.sorteio1 - 0.1} top={560} tamanho={84} cor={COR.vermelho}><span style={{marginLeft: 290}}>SORTEIO</span></Titulo>
      <div style={{position: 'absolute', left: 230, right: 230, top: 840, padding: 20, borderRadius: 26, ...caixa, opacity: post, translate: `0px ${(1 - post) * 60}px`, textAlign: 'center'}}>
        <div style={{height: 200, borderRadius: 18, background: 'linear-gradient(165deg, #FFB37A, #E0607E 55%, #7A3E9A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110}}>🎁</div>
        <div style={{marginTop: 12, fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.branco}}>SORTEIO de um kit! 🎉</div>
      </div>
      <Carimbo t={t} de={M.recomendado - 0.1} cor={COR.vermelho} tamanho={46} rot={-6} style={{left: 250, top: 1150}}>NÃO É RECOMENDADO ✕</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Causa 2: isca de engajamento (e o que pode) ----------

const CausaIsca: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, M.terceira - 0.15);
  if (!st) return null;
  const isca = mola(t, M.marca - 0.15, 12, 210);
  const xis = mola(t, M.ganhar, 9, 260);
  const pode = t >= M.pedir - 0.15;
  const eq = mola(t, M.comentar - 0.1, 12, 210);
  const ok = mola(t, M.pode - 0.1, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Carta t={t} de={M.isca} n={2} w={260} style={{left: 90, top: 470}} />
      <Titulo t={t} de={M.isca - 0.1} top={540} tamanho={62} cor={COR.vermelho}><span style={{display: 'inline-block', marginLeft: 300, lineHeight: 1.05}}>ISCA DE<br />ENGAJAMENTO</span></Titulo>
      {!pode ? (
        <div style={{position: 'absolute', left: 150, right: 150, top: 900, padding: '24px 28px', borderRadius: 26, ...caixa, border: `4px solid ${xis > 0.5 ? COR.vermelho : 'rgba(255,255,255,.15)'}`, opacity: isca, translate: `0px ${(1 - isca) * 60}px`}}>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>legenda do post</div>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 40, color: COR.branco, textDecoration: xis > 0.5 ? 'line-through' : 'none'}}>Marca 3 amigos pra ganhar 👇</div>
          {xis > 0.01 && <div style={{position: 'absolute', right: -30, top: -40, fontSize: 110, opacity: xis, scale: String(interpolate(xis, [0, 1], [2.2, 1]))}}>❌</div>}
        </div>
      ) : (
        <>
          <div style={{position: 'absolute', left: 150, right: 150, top: 880, padding: '22px 26px', borderRadius: 26, ...caixa, border: `4px solid ${ok > 0.5 ? COR.verde : 'rgba(255,255,255,.15)'}`, opacity: eq}}>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>💬 cliente comentou</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.branco}}>EU QUERO</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>→ recebe o link no Direct</div>
          </div>
          <Carimbo t={t} de={M.pode - 0.1} cor={COR.verde} tamanho={60} rot={-6} style={{left: 360, top: 1140}}>PODE ✓</Carimbo>
          <Fonte t={t} de={M.pedir} ate={M.terceira} top={1250} veiculo="Social Media Today" titulo="Instagram esclarece: pedir uma palavra no comentário pode" />
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Causa 3: repost demais ----------

const CausaRepost: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.terceira - 0.15, M.quarta - 0.15);
  if (!st) return null;
  const cal = mola(t, M.posta - 0.15, 12, 200);
  const marcas = prog(t, M.dez1 - 0.1, M.dias1 - M.dez1 + 0.2);
  const fora = prog(t, M.inteiro - 0.1, 0.5);
  const dias = [2, 4, 5, 8, 11, 13, 17, 20, 24, 27];
  return (
    <AbsoluteFill style={st}>
      <Carta t={t} de={M.reposte1} n={3} w={260} style={{left: 90, top: 470}} />
      <Titulo t={t} de={M.reposte1 - 0.1} top={560} tamanho={70} cor={COR.vermelho}><span style={{display: 'inline-block', marginLeft: 300, lineHeight: 1.05}}>REPOST<br />DEMAIS</span></Titulo>
      <div style={{position: 'absolute', left: 170, right: 170, top: 860, padding: 18, borderRadius: 24, ...caixa, opacity: cal * (1 - 0.5 * fora), filter: `grayscale(${fora})`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco, marginBottom: 10, textAlign: 'center'}}>30 DIAS</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6}}>
          {Array.from({length: 30}, (_, i) => {
            const idx = dias.indexOf(i);
            const on = idx >= 0 && marcas > idx / dias.length;
            return <div key={i} style={{height: 50, borderRadius: 8, background: on ? 'rgba(255,77,94,.35)' : 'rgba(255,255,255,.07)', border: on ? `2px solid ${COR.vermelho}` : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26}}>{on ? '🔁' : ''}</div>;
          })}
        </div>
      </div>
      {marcas > 0.95 && fora < 0.05 && <div style={{position: 'absolute', left: 0, right: 0, top: 1110, display: 'flex', justifyContent: 'center'}}><Pilula cor={COR.vermelho} tamanho={34} fundo="rgba(60,8,16,.95)">10 OU MAIS EM 30 DIAS</Pilula></div>}
      <Carimbo t={t} de={M.recomendacao3 - 0.1} cor={COR.vermelho} tamanho={48} rot={-6} style={{left: 160, top: 1120}}>PERFIL INTEIRO FORA ✕</Carimbo>
      <Fonte t={t} de={M.dez1} ate={M.quarta} top={1260} veiculo="Instagram para criadores" titulo="Recomendações e originalidade" />
    </AbsoluteFill>
  );
};

// ---------- Causa 4: link caça-clique ----------

const CausaLink: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.quarta - 0.15, M.eAi - 0.15);
  if (!st) return null;
  const link = mola(t, M.site - 0.15, 12, 210);
  const xis = mola(t, M.clique - 0.05, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Carta t={t} de={M.link1} n={4} w={260} style={{left: 90, top: 470}} />
      <Titulo t={t} de={M.link1 - 0.1} top={540} tamanho={68} cor={COR.vermelho}><span style={{display: 'inline-block', marginLeft: 300, lineHeight: 1.05}}>LINK<br />CAÇA-CLIQUE</span></Titulo>
      <div style={{position: 'absolute', left: 150, right: 150, top: 920, padding: '24px 28px', borderRadius: 26, ...caixa, opacity: link, scale: String(0.85 + 0.15 * link)}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 36, color: '#4C8DFF'}}>🔗 site-que-vive-de-clique.com</div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza, marginTop: 6}}>quase todo o tráfego vem do Instagram</div>
        {xis > 0.01 && <div style={{position: 'absolute', right: -30, top: -40, fontSize: 110, opacity: xis, scale: String(interpolate(xis, [0, 1], [2.2, 1]))}}>❌</div>}
      </div>
    </AbsoluteFill>
  );
};

// ---------- O que fazer: Status da conta, editar/apagar, 30 dias ----------

const Fazer: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eAi - 0.15, T.b - 0.1);
  if (!st) return null;
  const tela = mola(t, M.status - 0.15, 12, 200);
  const marcado = mola(t, M.marcado - 0.1, 10, 240);
  const editar = mola(t, M.edita - 0.1, 10, 240);
  const apagar = mola(t, M.apaga - 0.1, 10, 240);
  const fase2 = t >= M.eSe2 - 0.15;
  const cont = prog(t, M.depois - 0.1, M.dez2 - M.depois + 0.3);
  const n = Math.max(0, Math.round(30 * (1 - cont)));
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.eAi} top={440} tamanho={60}>E AÍ, <span style={{color: COR.verde}}>O QUE FAZER?</span></Titulo>
      {!fase2 ? (
        <div style={{position: 'absolute', left: 170, right: 170, top: 570, borderRadius: 34, border: '8px solid #1B2238', background: '#0D1117', padding: '24px 26px', opacity: tela, scale: String(0.85 + 0.15 * tela)}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#F2F4F8', textAlign: 'center', marginBottom: 18}}>Status da Conta</div>
          {['Recursos', 'Remoções de conteúdo', 'Qualificação de recomendação', 'Monetização'].map((r) => {
            const alvo = r.startsWith('Qualificação');
            return (
              <div key={r} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 10px', borderRadius: 12, background: alvo && marcado > 0.5 ? 'rgba(255,214,10,.2)' : 'transparent', border: alvo && marcado > 0.5 ? `3px solid ${COR.amarelo}` : '3px solid transparent'}}>
                <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 28, color: '#F2F4F8'}}>{r}</span>
                <span style={{fontSize: 34}}>{alvo ? '⚠️' : '✅'}</span>
              </div>
            );
          })}
          {marcado > 0.01 && (
            <div style={{display: 'flex', gap: 14, marginTop: 18, opacity: marcado}}>
              <div style={{flex: 1, padding: '14px 0', borderRadius: 14, background: COR.azul, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.branco, opacity: 0.35 + 0.65 * editar, scale: String(0.9 + 0.1 * editar)}}>✏️ EDITAR</div>
              <div style={{flex: 1, padding: '14px 0', borderRadius: 14, background: COR.vermelho, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.branco, opacity: 0.35 + 0.65 * apagar, scale: String(0.9 + 0.1 * apagar)}}>🗑️ APAGAR</div>
            </div>
          )}
          {marcado > 0.01 && <div style={{marginTop: 10, textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 20, color: COR.amarelo}}>exemplo</div>}
        </div>
      ) : (
        <>
          <Titulo t={t} de={M.eSe2} top={600} tamanho={46} cor={COR.cinza}>FOI REPOST? <span style={{color: COR.branco}}>PARA DE REPOSTAR</span></Titulo>
          <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center'}}>
            <div style={{display: 'inline-block', padding: '24px 60px', borderRadius: 34, ...caixa, border: `4px solid ${n === 0 ? COR.verde : COR.ciano}`}}>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 150, lineHeight: 1, color: n === 0 ? COR.verde : COR.branco}}>{n}</div>
              <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.cinza}}>dias abaixo de 10 reposts</div>
            </div>
          </div>
          <Carimbo t={t} de={M.volta - 0.1} cor={COR.verde} tamanho={46} rot={-5} style={{left: 140, top: 1110}}>VOLTA A SER RECOMENDADO ✓</Carimbo>
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Fechamento: seguir (mesmo CTA e mesmo clipe do 015) ----------

const B1 = M.segue + 0.2;
const B2 = M.toda - 0.2;

const CartaoFonte: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.b, B1 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 820, padding: '34px 40px', borderRadius: 36, ...caixa, marginTop: -260}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>📰 FONTE</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Central de Ajuda do Instagram · Instagram para criadores<br />Social Media Today</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; posts e perfis são exemplos.</div>
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
      <CartasPeito t={t} />
      <Lista t={t} />
      <CausaSorteio t={t} />
      <CausaIsca t={t} />
      <CausaRepost t={t} />
      <CausaLink t={t} />
      <Fazer t={t} />
      <CardVoz t={t} />
      <Marcador t={t} />
      <CartaoFonte t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'pop', em: 0.03, volume: 0.35},
  {som: 'pop', em: 0.19, volume: 0.35},
  {som: 'impacto', em: M.quatro1 - 0.05, volume: 0.6},
  {som: 'impacto', em: M.shadow1 - 0.08, volume: 0.7},
  {som: 'risco', em: M.shadow1, volume: 0.4},
  {som: 'impacto', em: M.agora - 0.05, volume: 0.55},
  // Lista
  {som: 'whoosh_in', em: M.lista1 - 0.1, volume: 0.4},
  {som: 'impacto', em: M.recomenda1 - 0.1, volume: 0.5},
  {som: 'ding', em: M.quatro2 - 0.1, volume: 0.45},
  // Causas
  {som: 'swoosh', em: M.sorteio1 - 0.1, volume: 0.5},
  {som: 'impacto', em: M.sorteio1, volume: 0.55},
  {som: 'pop', em: M.post1 - 0.1, volume: 0.35},
  {som: 'risco', em: M.recomendado - 0.1, volume: 0.45},
  {som: 'swoosh', em: M.isca - 0.1, volume: 0.5},
  {som: 'impacto', em: M.isca, volume: 0.55},
  {som: 'pop', em: M.marca - 0.15, volume: 0.35},
  {som: 'risco', em: M.ganhar, volume: 0.45},
  {som: 'pop', em: M.comentar - 0.1, volume: 0.35},
  {som: 'ding', em: M.pode - 0.1, volume: 0.5},
  {som: 'swoosh', em: M.reposte1 - 0.1, volume: 0.5},
  {som: 'impacto', em: M.reposte1, volume: 0.55},
  {som: 'tique', em: M.dez1, volume: 0.3},
  {som: 'tique', em: M.dez1 + 0.4, volume: 0.3},
  {som: 'tique', em: M.dez1 + 0.8, volume: 0.3},
  {som: 'tique', em: M.dez1 + 1.2, volume: 0.3},
  {som: 'risco', em: M.recomendacao3 - 0.1, volume: 0.45},
  {som: 'swoosh', em: M.link1 - 0.1, volume: 0.5},
  {som: 'impacto', em: M.link1, volume: 0.55},
  {som: 'risco', em: M.clique - 0.05, volume: 0.45},
  // O que fazer
  {som: 'whoosh_in', em: M.eAi - 0.15, volume: 0.45},
  {som: 'pop', em: M.status - 0.15, volume: 0.4},
  {som: 'ding', em: M.marcado - 0.1, volume: 0.45},
  {som: 'pop', em: M.edita - 0.1, volume: 0.4},
  {som: 'pop', em: M.apaga - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.eSe2 - 0.15, volume: 0.4},
  {som: 'tique', em: M.depois, volume: 0.3},
  {som: 'tique', em: M.depois + 0.4, volume: 0.3},
  {som: 'tique', em: M.depois + 0.8, volume: 0.3},
  {som: 'tique', em: M.depois + 1.2, volume: 0.3},
  {som: 'ding', em: M.volta - 0.1, volume: 0.55},
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
    // Até "e você" a abertura (4 cartas + SHADOWBAN) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.agora - 0.4, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {shadow: COR.vermelho, ban: COR.vermelho, sorteio: COR.vermelho, isca: COR.vermelho, reposte: COR.vermelho, link: COR.vermelho, pode: COR.verde},
  eventos: EVENTOS,
  Cena,
};
