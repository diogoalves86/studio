import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 028 · Esse erro faz o Instagram esconder o texto mais importante do seu vídeo.
// A Luísa numa tela de Reels com a interface do Instagram por cima (foto oficial, sem crédito extra). Abertura (50% OFF
// some atrás da interface) → a parte de baixo e o lado direito ficam cobertos (zona de perigo) → dica 1: texto no meio
// (área segura) → dica 2: olhos na linha de cima → dica 3: produto perto e no centro → o cliente lê → CTA.

const T = TRECHOS;
const M = {
  esconder: em('esconder'),
  o2: em('o', em('esconder')),
  importante: em('importante'),
  erro2: em('erro', T.meio),
  baixo: em('baixo'),
  nome: em('nome'),
  legenda: em('legenda'),
  musica: em('música'),
  direito: em('direito'),
  botoes: em('botões'),
  cinquenta: em('50'),
  ninguem: em('ninguém'),
  viu: em('viu'),
  primeira: em('primeira'),
  escreve: em('escreve'),
  faixa: em('faixa'),
  dentro: em('dentro'),
  segunda: em('segunda'),
  olhos: em('olhos'),
  linha: em('linha'),
  legenda2: em('legenda', em('olhos')),
  terceira: em('terceira'),
  produto: em('produto'),
  perto: em('perto'),
  canto: em('canto'),
  pronto: em('pronto'),
  cliente: em('cliente'),
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

// ---------- A tela do Reels com a Luísa e a interface do Instagram por cima ----------

// Tudo de 0 a 1: `ui` (interface inteira) ou peça por peça; `zonas` pinta a área coberta de vermelho; `seguro` acende a
// faixa verde do centro; `off` leva o "50% OFF" da borda de baixo (0) para o centro (1); `rosto` sobe o rosto até a
// linha de cima; `produto` traz o produto do canto de baixo (0) para perto da câmera, no centro (1).
type Ui = {nome?: number; legenda?: number; musica?: number; botoes?: number};
const ReelsTela: React.FC<{t: number; ui?: Ui; zonas?: number; seguro?: number; off?: number; offVis?: number; rosto?: number; linha?: number; produto?: number; prodVis?: number; style?: React.CSSProperties}> = ({t, ui = {}, zonas = 0, seguro = 0, off = 0, offVis = 1, rosto = 0, linha = 0, produto = 0, prodVis = 0, style}) => {
  const w = 460, h = w * 16 / 9;
  const nome = ui.nome ?? 0, legenda = ui.legenda ?? 0, musica = ui.musica ?? 0, botoes = ui.botoes ?? 0;
  const offY = interpolate(off, [0, 1], [h * 0.84, h * 0.53]);
  const prodX = interpolate(produto, [0, 1], [40, -42]);
  const prodY = interpolate(produto, [0, 1], [h * 0.8, h * 0.27]);
  const prodS = interpolate(produto, [0, 1], [0.55, 1.2]);
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 44, border: '10px solid #1B2238', background: '#0B0F18', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #2B3550, #1A2238)'}} />
      <Img src={ARQ.luisa} style={{position: 'absolute', left: 0, top: interpolate(rosto, [0, 1], [h * 0.12, -h * 0.02]), width: w, height: h * 1.05, objectFit: 'cover', objectPosition: '50% 12%'}} />
      {/* linha de cima (olhos) */}
      {linha > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: h / 3, height: 4, background: COR.amarelo, opacity: linha, boxShadow: `0 0 16px ${COR.amarelo}`}} />}
      {/* zonas cobertas */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: h * 0.35, background: `rgba(255,40,60,${0.35 * zonas})`, borderTop: zonas > 0.01 ? `4px dashed rgba(255,77,94,${zonas})` : 'none'}} />
      <div style={{position: 'absolute', right: 0, top: h * 0.14, width: w * 0.16, height: h * 0.51, background: `rgba(255,40,60,${0.3 * zonas})`, borderLeft: zonas > 0.01 ? `4px dashed rgba(255,77,94,${zonas})` : 'none'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: h * 0.14, background: `rgba(255,40,60,${0.25 * zonas})`}} />
      {/* área segura */}
      {seguro > 0.01 && <div style={{position: 'absolute', left: w * 0.06, right: w * 0.17, top: h * 0.14, height: h * 0.51, borderRadius: 18, border: `5px solid rgba(59,209,126,${seguro})`, background: `rgba(59,209,126,${0.14 * seguro})`}} />}
      {/* o texto da promoção */}
      <div style={{position: 'absolute', left: 0, right: w * 0.12, top: offY, textAlign: 'center', opacity: offVis}}>
        <span style={{display: 'inline-block', padding: '8px 16px', borderRadius: 14, background: '#FFD60A', fontFamily: MONT, fontWeight: 900, fontSize: 52, color: '#1A1020', rotate: '-3deg', boxShadow: '0 8px 20px rgba(0,0,0,.35)'}}>50% OFF</span>
      </div>
      {/* o produto */}
      {prodVis > 0.01 && <div style={{position: 'absolute', left: prodX, top: prodY, fontSize: 150 * prodS, opacity: prodVis, lineHeight: 1}}>🧴</div>}
      {/* interface do Reels */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: h * 0.3, background: `linear-gradient(0deg, rgba(0,0,0,${0.75 * Math.max(nome, legenda, musica)}), transparent)`}} />
      <div style={{position: 'absolute', left: 18, bottom: 132, display: 'flex', alignItems: 'center', gap: 10, opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>
        <div style={{width: 44, height: 44, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24}}>🏪</div>
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#fff'}}>sua.lojinha</span>
        <span style={{padding: '4px 12px', borderRadius: 8, border: '2px solid #fff', fontFamily: INTER, fontWeight: 800, fontSize: 18, color: '#fff'}}>Seguir</span>
      </div>
      <div style={{position: 'absolute', left: 18, right: 90, bottom: 74, fontFamily: INTER, fontWeight: 600, fontSize: 21, color: '#fff', opacity: legenda, translate: `0px ${(1 - legenda) * 40}px`}}>Promoção de hoje! Corre que é só até sexta ✨ … mais</div>
      <div style={{position: 'absolute', left: 18, bottom: 30, fontFamily: INTER, fontWeight: 600, fontSize: 20, color: '#fff', opacity: musica, translate: `0px ${(1 - musica) * 40}px`}}>♪ sua.lojinha · áudio original</div>
      <div style={{position: 'absolute', right: 14, bottom: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: botoes, translate: `${(1 - botoes) * 60}px 0px`}}>
        {[['♡', '1.204'], ['💬', '86'], ['➤', '312'], ['⌑', '']].map(([i, n]) => (
          <div key={i} style={{textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 18, color: '#fff'}}><div style={{fontSize: 40, lineHeight: 1}}>{i}</div>{n}</div>
        ))}
      </div>
    </div>
  );
};

const TELA = {left: 310, top: 530};

// ---------- Abertura: o 50% OFF some atrás da interface ----------

const A0 = M.o2 - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const cobre = prog(t, 0.3, 0.6, saida);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <ReelsTela t={t} ui={{nome: cobre, legenda: cobre, musica: cobre, botoes: cobre}} offVis={1 - 0.75 * prog(t, 0.6, 0.4)} style={TELA} />
      <Carimbo t={t} de={M.esconder - 0.1} cor={COR.vermelho} tamanho={70} rot={-8} style={{left: 280, top: 1150}}>ESCONDIDO ✕</Carimbo>
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>🙈</span> O INSTAGRAM <span style={{color: COR.vermelho}}>ESCONDE</span><br />O SEU TEXTO
          </div>
        </div>
      </div>
    </>
  );
};

const Peito: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, A0 + 0.1, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 24px', borderRadius: 24, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.vermelho}`}}>
          <span style={{padding: '4px 12px', borderRadius: 10, background: '#FFD60A', fontFamily: MONT, fontWeight: 900, fontSize: 34, color: '#1A1020', opacity: 0.45}}>50% OFF</span>
          <span style={{fontSize: 44}}>🙈</span>
        </div>
      </div>
      <Carimbo t={t} de={M.importante - 0.1} cor={COR.vermelho} tamanho={56} rot={-6} style={{left: 200, top: 1530}}>O MAIS IMPORTANTE ✕</Carimbo>
    </>
  );
};

// Marcador de retenção: as três dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda, M.terceira];
  const nomes = ['✍️ TEXTO NO MEIO', '👀 OLHOS EM CIMA', '🧴 PRODUTO NO CENTRO'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 10, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 14px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 21, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê: a interface cobre a borda ----------

const Porque: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.meio, M.primeira - 0.15);
  if (!st) return null;
  const ui = {
    nome: prog(t, M.nome - 0.15, 0.35, saida),
    legenda: prog(t, M.legenda - 0.15, 0.35, saida),
    musica: prog(t, M.musica - 0.15, 0.35, saida),
    botoes: prog(t, M.botoes - 0.15, 0.35, saida),
  };
  const zonas = prog(t, M.baixo - 0.15, 0.4) * 0.6 + prog(t, M.direito - 0.15, 0.4) * 0.4;
  const pulso = t >= M.cinquenta - 0.1 && t < M.ninguem ? Math.abs(Math.sin((t - M.cinquenta) * 8)) : 0;
  const some = prog(t, M.ninguem - 0.1, 0.4);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={52}>O ERRO: <span style={{color: COR.vermelho}}>TEXTO NA BORDA</span></Titulo>
      <ReelsTela t={t} ui={ui} zonas={zonas} offVis={1 - 0.8 * some} style={{...TELA, scale: String(1 + 0.03 * pulso)}} />
      <Etiqueta t={t} de={M.baixo - 0.1} cor={COR.vermelho} style={{left: 30, top: 1120}}>⬇️ ZONA DE PERIGO</Etiqueta>
      <Etiqueta t={t} de={M.direito - 0.1} cor={COR.vermelho} style={{left: 780, top: 760}}>➡️ BOTÕES</Etiqueta>
      <Carimbo t={t} de={M.viu - 0.1} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 300, top: 1000}}>NINGUÉM VIU ✕</Carimbo>
      <Fonte t={t} de={M.baixo} ate={M.primeira} top={1470} veiculo="guias de área segura do Reels" titulo="a parte de baixo e o lado direito ficam cobertos" />
    </AbsoluteFill>
  );
};

const Etiqueta: React.FC<{t: number; de: number; cor: string; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), ...style}}>
      <div style={{padding: '12px 20px', borderRadius: 18, background: 'rgba(8,16,44,.95)', border: `4px solid ${cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.branco, whiteSpace: 'nowrap', boxShadow: `0 0 30px ${cor}55`}}>{children}</div>
    </div>
  );
};

const UI_TODA = {nome: 1, legenda: 1, musica: 1, botoes: 1};

// ---------- Dica 1: texto no meio ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const off = prog(t, M.escreve - 0.1, 0.7, suave);
  const seguro = prog(t, M.faixa - 0.15, 0.4);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <ReelsTela t={t} ui={UI_TODA} zonas={0.35} seguro={seguro} off={off} rosto={1} style={TELA} />
      <Etiqueta t={t} de={M.faixa - 0.1} cor={COR.verde} style={{left: 30, top: 760}}>✅ ÁREA SEGURA</Etiqueta>
      <Etiqueta t={t} de={M.dentro - 0.2} cor={COR.verde} style={{left: 790, top: 980}}>👀 ✓</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: olhos na linha de cima ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.segunda - 0.15, M.terceira - 0.15);
  if (!st) return null;
  const linha = prog(t, M.linha - 0.15, 0.4);
  const rosto = prog(t, M.olhos - 0.1, 0.8, suave);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <ReelsTela t={t} ui={UI_TODA} off={1} offVis={rosto} linha={linha} rosto={rosto} style={TELA} />
      <Etiqueta t={t} de={M.linha - 0.1} cor={COR.amarelo} style={{left: 30, top: 760}}>👀 LINHA DE CIMA</Etiqueta>
      <Etiqueta t={t} de={M.legenda2 - 0.2} cor={COR.verde} style={{left: 760, top: 1100}}>ROSTO LIVRE ✓</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Dica 3: produto perto e no centro ----------

const Dica3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.terceira - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const vis = prog(t, M.produto - 0.2, 0.3);
  const centro = prog(t, M.perto - 0.1, 0.7, suave);
  const canto = t >= M.canto - 0.15;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.terceira} n={3} />
      <ReelsTela t={t} ui={UI_TODA} off={1} rosto={1} produto={centro} prodVis={vis} style={TELA} />
      <Etiqueta t={t} de={M.perto - 0.1} cor={COR.verde} style={{left: 20, top: 1060}}>🧴 PERTO ✓</Etiqueta>
      {canto && <Etiqueta t={t} de={M.canto - 0.15} cor={COR.vermelho} style={{left: 760, top: 1180}}>CANTO ✕</Etiqueta>}
    </AbsoluteFill>
  );
};

// ---------- Fecho: tudo legível ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.pronto - 0.15, T.b - 0.1);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pronto} top={440} tamanho={44}>O QUE VOCÊ ESCREVE, <span style={{color: COR.verde}}>O CLIENTE LÊ</span></Titulo>
      <ReelsTela t={t} ui={UI_TODA} off={1} rosto={1} produto={1} prodVis={1} seguro={0.6} style={TELA} />
      <Carimbo t={t} de={M.cliente - 0.2} cor={COR.verde} tamanho={60} rot={-6} style={{left: 300, top: 1150}}>O CLIENTE LÊ ✓</Carimbo>
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Guias de área segura do Reels<br />(1clickreport, revid.ai)</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>A Meta não publica medida oficial; telas são ilustrativas.</div>
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
      <Porque t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <Dica3 t={t} />
      <Fecho t={t} />
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
  {som: 'swoosh', em: 0, volume: 0.5},
  {som: 'whoosh_in', em: 0.3, volume: 0.45},
  {som: 'impacto', em: M.esconder - 0.1, volume: 0.65},
  {som: 'risco', em: M.esconder, volume: 0.4},
  {som: 'impacto', em: M.importante - 0.1, volume: 0.55},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'impacto', em: M.baixo - 0.15, volume: 0.5},
  {som: 'pop', em: M.nome - 0.15, volume: 0.35},
  {som: 'pop', em: M.legenda - 0.15, volume: 0.35},
  {som: 'pop', em: M.musica - 0.15, volume: 0.35},
  {som: 'whoosh_in', em: M.botoes - 0.15, volume: 0.4},
  {som: 'ding', em: M.cinquenta - 0.1, volume: 0.45},
  {som: 'risco', em: M.viu - 0.1, volume: 0.5},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'swoosh', em: M.escreve - 0.1, volume: 0.45},
  {som: 'ding', em: M.faixa - 0.15, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.linha - 0.15, volume: 0.4},
  {som: 'whoosh_in', em: M.olhos - 0.1, volume: 0.4},
  {som: 'ding', em: M.legenda2 - 0.2, volume: 0.45},
  {som: 'impacto', em: M.terceira, volume: 0.5},
  {som: 'whoosh_in', em: M.perto - 0.1, volume: 0.45},
  {som: 'risco', em: M.canto - 0.15, volume: 0.4},
  // Fecho
  {som: 'ding', em: M.cliente - 0.2, volume: 0.55},
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
    // Até "o texto" a abertura (50% OFF some atrás da interface) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.importante - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    // O fim do clipe A (3,98–4,13 s, depois de "vídeo") fica artificial: sai um pouco antes do meio.
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
  corEspecial: {esconder: COR.vermelho, borda: COR.vermelho, baixo: COR.vermelho, meio: COR.verde, cima: COR.amarelo, centro: COR.verde},
  eventos: EVENTOS,
  Cena,
};
