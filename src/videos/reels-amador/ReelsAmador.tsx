import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 026 · Esses três erros deixam o Reels da sua loja com cara de amador.
// A Luísa "gravando": um celular com a tela da câmera (REC, cronômetro, grade) usando a foto oficial dela, sem crédito
// extra (pedido do Diogo). Abertura (Reels amador: contraluz, tremendo, "oi gente") → não é o celular (Mosseri: vídeo
// cru = confiança) → erro 1 contraluz → de frente para a janela → erro 2 celular longe (eco) → a um braço + lapela →
// erro 3 "oi gente" → resultado primeiro → celular em pé e apoiado → CTA.

const T = TRECHOS;
const M = {
  tres1: em('três'),
  o1: em('o'),
  amador: em('amador'),
  meio1: em('não'),
  celular1: em('celular'),
  no1: em('no'),
  chefe: em('chefe'),
  inteligencia: em('inteligência'),
  cru: em('cru'),
  problema: em('problema'),
  passar: em('passar'),
  primeiro: em('primeiro'),
  escura: em('escura'),
  estoura: em('estoura'),
  vira: em('vira'),
  graca: em('graça'),
  segundo: em('segundo'),
  eco: em('eco'),
  braco: em('braço'),
  lapela: em('lapela'),
  terceiro: em('terceiro'),
  oi: em('oi'),
  espera: em('espera'),
  comeca: em('começa'),
  bolo: em('bolo'),
  cliente: em('cliente'),
  antes: em('antes'),
  processo: em('processo'),
  eGrava: em('e', em('processo')),
  apoiado: em('apoiado'),
  pronto: em('pronto', em('apoiado')),
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

// ---------- A Luísa "gravando": celular com a tela da câmera (foto oficial dela, sem crédito extra) ----------

type ModoCamera = 'contraluz' | 'luz' | 'longe' | 'perto' | 'normal';

// `mistura` vai de 0 a 1 entre o modo "antes" e o modo "depois".
const CameraLuisa: React.FC<{t: number; antes: ModoCamera; depois?: ModoCamera; mistura?: number; tremor?: number; legenda?: React.ReactNode; w?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({t, antes, depois, mistura = 0, tremor = 0, legenda, w = 440, style, children}) => {
  const h = w * 16 / 9;
  const k = w / 440;
  const m = depois ? mistura : 0;
  const val = (modo: ModoCamera) => ({
    brilho: modo === 'contraluz' ? 0.28 : modo === 'luz' ? 1.08 : 1,
    estouro: modo === 'contraluz' ? 1 : 0,
    escala: modo === 'longe' ? 0.42 : modo === 'perto' ? 1.18 : 1,
    quente: modo === 'luz' ? 1 : 0,
  });
  const a = val(antes), b = val(depois ?? antes);
  const mix = (x: number, y: number) => x + (y - x) * m;
  const brilho = mix(a.brilho, b.brilho), estouro = mix(a.estouro, b.estouro), escala = mix(a.escala, b.escala), quente = mix(a.quente, b.quente);
  const dx = Math.sin(t * 23) * 9 * tremor + Math.sin(t * 37) * 5 * tremor;
  const dy = Math.cos(t * 19) * 8 * tremor;
  const rot = Math.sin(t * 13) * 2.2 * tremor;
  const rec = Math.floor(t * 2) % 2 === 0;
  const seg = Math.floor(t % 60);
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 46 * k, border: `${10 * k}px solid #1B2238`, background: '#0B0F18', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', translate: `${dx}px ${dy}px`, rotate: `${rot}deg`, ...style}}>
      {/* fundo da sala: parede + janela (estoura na contraluz) */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #2B3550, #1A2238)'}} />
      <div style={{position: 'absolute', left: '22%', right: '22%', top: '8%', height: '46%', borderRadius: 10 * k, background: `linear-gradient(180deg, rgba(220,240,255,${0.35 + 0.65 * estouro}), rgba(255,255,255,${0.2 + 0.8 * estouro}))`, boxShadow: `0 0 ${160 * estouro * k}px ${60 * estouro * k}px rgba(255,255,255,${0.85 * estouro})`, border: `${6 * k}px solid rgba(255,255,255,.25)`}} />
      {/* a Luísa */}
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
        <Img src={ARQ.luisa} style={{width: w * escala, height: h * escala, objectFit: 'cover', objectPosition: '50% 18%', filter: `brightness(${brilho}) saturate(${0.7 + 0.4 * quente}) sepia(${0.12 * quente})`, transformOrigin: '50% 100%'}} />
      </div>
      {/* véu de luz estourada por cima (contraluz) */}
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 25%, rgba(255,255,255,${0.55 * estouro}), transparent 60%)`}} />
      {/* luz quente da janela de frente */}
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(120deg, rgba(255,214,140,${0.18 * quente}), transparent 60%)`}} />
      {/* interface de gravação */}
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)', backgroundSize: `${w / 3}px ${h / 3}px`, opacity: 0.5}} />
      <div style={{position: 'absolute', left: 16 * k, top: 18 * k, display: 'flex', alignItems: 'center', gap: 8 * k, padding: `${5 * k}px ${12 * k}px`, borderRadius: 99, background: 'rgba(0,0,0,.55)'}}>
        <div style={{width: 14 * k, height: 14 * k, borderRadius: 99, background: rec ? '#FF3B30' : 'rgba(255,59,48,.35)'}} />
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 20 * k, color: '#fff'}}>REC 00:{String(seg).padStart(2, '0')}</span>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 26 * k, display: 'flex', justifyContent: 'center'}}>
        <div style={{width: 74 * k, height: 74 * k, borderRadius: 99, border: `${6 * k}px solid #fff`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 30 * k, height: 30 * k, borderRadius: 8 * k, background: '#FF3B30'}} />
        </div>
      </div>
      {legenda && <div style={{position: 'absolute', left: 20 * k, right: 20 * k, bottom: 120 * k, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30 * k, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.8)'}}>{legenda}</div>}
      {children}
    </div>
  );
};

// Etiqueta lateral que entra quicando ao lado do celular.
const Etiqueta: React.FC<{t: number; de: number; cor: string; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), ...style}}>
      <div style={{padding: '12px 20px', borderRadius: 18, background: 'rgba(8,16,44,.95)', border: `4px solid ${cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco, whiteSpace: 'nowrap', boxShadow: `0 0 30px ${cor}55`}}>{children}</div>
    </div>
  );
};

const ERROS = [
  {n: 1, icone: '💡', nome: 'LUZ'},
  {n: 2, icone: '🎤', nome: 'SOM'},
  {n: 3, icone: '⏱️', nome: 'COMEÇO'},
];

// Marcador de retenção: os três erros acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.eGrava + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.eGrava + 0.1, 0.3));
  const marcas = [M.primeiro, M.segundo, M.terceiro];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {ERROS.map((c, i) => {
        const on = t >= marcas[i] - 0.1;
        return (
          <div key={c.n} style={{padding: '10px 20px', borderRadius: 18, background: on ? 'rgba(60,8,16,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.vermelho : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: on ? COR.branco : COR.cinza}}>
            {on ? `${c.icone} ${c.nome}` : `ERRO ${c.n}`}
          </div>
        );
      })}
    </div>
  );
};

// ---------- Abertura: o Reels amador (contraluz, tremendo, "oi gente") ----------

const A0 = M.o1 - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <CameraLuisa t={t} antes="contraluz" tremor={1} legenda="Oi gente, tudo bem? Hoje eu vou…" style={{left: 320, top: 470}} />
      <Etiqueta t={t} de={M.tres1 - 0.1} cor={COR.vermelho} style={{left: 60, top: 600}}>💡 ✕</Etiqueta>
      <Etiqueta t={t} de={M.tres1 + 0.1} cor={COR.vermelho} style={{left: 820, top: 800}}>🎤 ✕</Etiqueta>
      <Etiqueta t={t} de={M.tres1 + 0.3} cor={COR.vermelho} style={{left: 60, top: 1000}}>⏱️ ✕</Etiqueta>
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.3 * prog(t, M.tres1 - 0.05, 0.05) * (1 - prog(t, M.tres1, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>🎥</span> <span style={{color: COR.vermelho}}>3 ERROS</span> NO REELS<br />DA SUA LOJA
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
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        {ERROS.map((c) => <div key={c.n} style={{padding: '12px 20px', borderRadius: 18, background: 'rgba(60,8,16,.95)', border: `3px solid ${COR.vermelho}`, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco}}>{c.icone} ✕</div>)}
      </div>
      <Carimbo t={t} de={M.amador - 0.05} cor={COR.vermelho} tamanho={62} rot={-7} style={{left: 200, top: 1525}}>CARA DE AMADOR</Carimbo>
    </>
  );
};

// ---------- O porquê ----------

const Porque: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.primeiro - 0.15);
  if (!st) return null;
  const fase = t < M.no1 - 0.15 ? 0 : t < M.problema - 0.15 ? 1 : 2;
  const cel = mola(t, M.celular1 - 0.15, 10, 240);
  const card = mola(t, M.chefe - 0.1, 12, 200);
  const cru = mola(t, M.cru - 0.15, 10, 240);
  const passa = prog(t, M.passar - 0.1, 0.5, suave);
  return (
    <AbsoluteFill style={st}>
      {fase === 0 && (
        <>
          <Titulo t={t} de={M.meio1} top={480} tamanho={60}>NÃO É CULPA DO <span style={{color: COR.amarelo}}>CELULAR</span></Titulo>
          <div style={{position: 'absolute', left: 0, right: 0, top: 660, textAlign: 'center', fontSize: 260, opacity: cel, scale: String(interpolate(cel, [0, 1], [1.6, 1]))}}>📱</div>
          {cel > 0.01 && <Carimbo t={t} de={M.celular1} cor={COR.verde} tamanho={56} rot={-5} style={{left: 260, top: 1010}}>SEU CELULAR SERVE ✓</Carimbo>}
        </>
      )}
      {fase === 1 && (
        <>
          <div style={{position: 'absolute', left: 100, right: 100, top: 480, display: 'flex', alignItems: 'center', gap: 26, padding: 22, borderRadius: 30, ...caixa, opacity: card, translate: `0px ${(1 - card) * 40}px`}}>
            <Img src={ARQ.mosseri} style={{width: 150, height: 150, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', border: `4px solid ${COR.ciano}`}} />
            <div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>Adam Mosseri</div>
              <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.ciano}}>chefe do Instagram · fim de 2025</div>
              <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 500, fontSize: 18, color: COR.cinza}}>Foto: Anthony Quintano · CC BY 2.0</div>
            </div>
          </div>
          <Titulo t={t} de={M.inteligencia - 0.15} top={730} tamanho={44} cor={COR.cinza}>com tanta IA por aí… 🤖</Titulo>
          {cru > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 840, display: 'flex', justifyContent: 'center', opacity: cru, scale: String(interpolate(cru, [0, 1], [1.6, 1]))}}><Pilula cor={COR.verde} tamanho={52} fundo="rgba(5,40,20,.95)">VÍDEO CRU = CONFIANÇA ✓</Pilula></div>}
          <Fonte t={t} de={M.cru} ate={M.problema} top={1250} veiculo="Engadget" titulo="Chefe do Instagram: imagens sem retoque sinalizam o que é real (dez/2025)" />
        </>
      )}
      {fase === 2 && (
        <>
          <Titulo t={t} de={M.problema - 0.1} top={460} tamanho={48}>O PROBLEMA É O QUE FAZ <span style={{color: COR.vermelho}}>PASSAR</span></Titulo>
          <div style={{translate: `0px ${-passa * 500}px`, opacity: 1 - passa}}>
            <CameraLuisa t={t} antes="contraluz" tremor={0.6} style={{left: 320, top: 560}} />
          </div>
          {t >= M.passar - 0.4 && <div style={{position: 'absolute', left: 700, top: 1050 - passa * 300, fontSize: 120, opacity: 1 - prog(t, M.passar + 0.5, 0.2)}}>👆</div>}
          {passa > 0.5 && <Carimbo t={t} de={M.passar + 0.1} cor={COR.vermelho} tamanho={64} rot={-6} style={{left: 360, top: 880}}>PASSOU ✕</Carimbo>}
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Erro 1: contraluz → de frente para a janela ----------

const Erro1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.primeiro - 0.15, M.segundo - 0.15);
  if (!st) return null;
  const vira = prog(t, M.vira - 0.1, 0.7, suave);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.primeiro} top={440} tamanho={54}><span style={{color: COR.vermelho}}>ERRO 1:</span> {vira < 0.5 ? 'DE COSTAS PRA JANELA' : 'VIRA DE FRENTE ✓'}</Titulo>
      <CameraLuisa t={t} antes="contraluz" depois="luz" mistura={vira} style={{left: 320, top: 530, rotate: `${Math.sin(vira * Math.PI) * 8}deg`}} />
      <Etiqueta t={t} de={M.escura - 0.1} cor={COR.vermelho} style={{left: 40, top: 900, opacity: 1 - vira}}>😶 ESCURA ✕</Etiqueta>
      <Etiqueta t={t} de={M.estoura - 0.1} cor={COR.vermelho} style={{left: 770, top: 640, opacity: 1 - vira}}>🪟 ESTOURA ✕</Etiqueta>
      <Etiqueta t={t} de={M.graca - 0.15} cor={COR.verde} style={{left: 40, top: 700}}>☀️ LUZ DE GRAÇA</Etiqueta>
      <Etiqueta t={t} de={M.vira + 0.3} cor={COR.verde} style={{left: 790, top: 960}}>😃 ✓</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Erro 2: celular longe (eco) → a um braço + lapela ----------

const Erro2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segundo - 0.15, M.terceiro - 0.15);
  if (!st) return null;
  const perto = prog(t, M.braco - 0.15, 0.6, suave);
  const eco = mola(t, M.eco - 0.1, 10, 240) * (1 - perto);
  const lapela = mola(t, M.lapela - 0.15, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.segundo} top={440} tamanho={54}><span style={{color: COR.vermelho}}>ERRO 2:</span> {perto < 0.5 ? 'CELULAR LONGE' : 'A UM BRAÇO ✓'}</Titulo>
      <CameraLuisa t={t} antes="longe" depois="perto" mistura={perto} style={{left: 320, top: 530}}>
        {eco > 0.01 && [0, 1, 2].map((i) => {
          const r = 60 + ((t * 120 + i * 60) % 180);
          return <div key={i} style={{position: 'absolute', left: 220 - r, top: 560 - r, width: 2 * r, height: 2 * r, borderRadius: 999, border: `4px solid rgba(255,214,10,${eco * (1 - (r - 60) / 180)})`}} />;
        })}
        {lapela > 0.01 && <div style={{position: 'absolute', left: 250, top: 640, fontSize: 56, opacity: lapela, scale: String(interpolate(lapela, [0, 1], [2, 1]))}}>🎙️</div>}
      </CameraLuisa>
      <Etiqueta t={t} de={M.eco - 0.1} cor={COR.vermelho} style={{left: 40, top: 760, opacity: 1 - perto}}>〰️ ECO ✕</Etiqueta>
      <Etiqueta t={t} de={M.braco - 0.1} cor={COR.verde} style={{left: 30, top: 900}}>📏 1 BRAÇO ✓</Etiqueta>
      <Etiqueta t={t} de={M.lapela - 0.1} cor={COR.verde} style={{left: 770, top: 820}}>🎙️ LAPELA</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- Erro 3: "oi gente" → resultado primeiro ----------

const Erro3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.terceiro - 0.15, M.eGrava - 0.15);
  if (!st) return null;
  const fase2 = t >= M.comeca - 0.15;
  const passa = prog(t, M.espera - 0.1, 0.5, suave);
  const cards = [
    {de: M.bolo - 0.15, icone: '🎂', nome: 'PRONTO'},
    {de: M.cliente - 0.15, icone: '👗', nome: 'CLIENTE USANDO'},
    {de: M.antes - 0.15, icone: '↔️', nome: 'ANTES · DEPOIS'},
  ];
  const processo = mola(t, M.processo - 0.15, 10, 240);
  return (
    <AbsoluteFill style={st}>
      {!fase2 ? (
        <>
          <Titulo t={t} de={M.terceiro} top={440} tamanho={54}><span style={{color: COR.vermelho}}>ERRO 3:</span> COMEÇAR DEVAGAR</Titulo>
          <div style={{translate: `0px ${-passa * 500}px`, opacity: 1 - passa}}>
            <CameraLuisa t={t} antes="luz" legenda={t >= M.oi - 0.1 ? '“Oi, gente, tudo bem?…”' : undefined} style={{left: 320, top: 530}} />
          </div>
          {t >= M.oi && passa < 0.5 && <div style={{position: 'absolute', left: 80, top: 760, fontSize: 110, rotate: `${(t - M.oi) * 360}deg`}}>⏳</div>}
          {t >= M.espera - 0.4 && <div style={{position: 'absolute', left: 700, top: 1050 - passa * 300, fontSize: 120, opacity: 1 - prog(t, M.espera + 0.5, 0.2)}}>👆</div>}
          {passa > 0.5 && <Carimbo t={t} de={M.espera + 0.1} cor={COR.vermelho} tamanho={60} rot={-6} style={{left: 270, top: 880}}>NINGUÉM ESPERA ✕</Carimbo>}
        </>
      ) : (
        <>
          <Titulo t={t} de={M.comeca - 0.1} top={440} tamanho={58} cor={COR.verde}>RESULTADO PRIMEIRO ✓</Titulo>
          <div style={{position: 'absolute', left: 90, right: 90, top: 580, display: 'flex', flexDirection: 'column', gap: 22}}>
            {cards.map((c) => {
              const e = mola(t, c.de, 10, 240);
              return (
                <div key={c.nome} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '20px 28px', borderRadius: 28, ...caixa, border: `4px solid ${COR.verde}88`, opacity: e, translate: `${(1 - e) * 140}px 0px`}}>
                  <span style={{fontSize: 90}}>{c.icone}</span>
                  <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: COR.branco}}>{c.nome}</span>
                </div>
              );
            })}
          </div>
          {processo > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center', opacity: processo, fontFamily: MONT, fontWeight: 900, fontSize: 38, color: COR.cinza}}>…e só depois o processo →</div>}
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Fecho: celular em pé e apoiado ----------

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eGrava - 0.15, T.b - 0.1);
  if (!st) return null;
  const apoia = prog(t, M.apoiado - 0.15, 0.4, suave);
  const copo = mola(t, M.apoiado - 0.15, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.eGrava} top={440} tamanho={54}>CELULAR <span style={{color: COR.amarelo}}>EM PÉ E APOIADO</span></Titulo>
      <CameraLuisa t={t} antes="luz" tremor={1 - apoia} w={400} style={{left: 340, top: 520}} />
      {copo > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1215, textAlign: 'center', fontSize: 110, opacity: copo, translate: `0px ${(1 - copo) * 80}px`}}>☕</div>}
      <Etiqueta t={t} de={M.apoiado - 0.1} cor={COR.verde} style={{left: 40, top: 760}}>📌 SEM TREMER ✓</Etiqueta>
      <Carimbo t={t} de={M.pronto - 0.1} cor={COR.verde} tamanho={50} rot={-6} style={{left: 160, top: 1050}}>CARA DE PROFISSIONAL ✓</Carimbo>
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Engadget (dez/2025) · TechRadar<br />Social Media Today (2025)</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; dicas de gravação são prática de produção.</div>
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
      <Erro1 t={t} />
      <Erro2 t={t} />
      <Erro3 t={t} />
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
  {som: 'risco', em: M.tres1 - 0.1, volume: 0.4},
  {som: 'risco', em: M.tres1 + 0.1, volume: 0.4},
  {som: 'risco', em: M.tres1 + 0.3, volume: 0.4},
  {som: 'impacto', em: A0 - 0.1, volume: 0.55},
  {som: 'impacto', em: M.amador - 0.05, volume: 0.6},
  // Porquê
  {som: 'pop', em: M.celular1 - 0.15, volume: 0.45},
  {som: 'ding', em: M.celular1, volume: 0.45},
  {som: 'whoosh_in', em: M.no1 - 0.15, volume: 0.4},
  {som: 'ding', em: M.cru - 0.15, volume: 0.5},
  {som: 'whoosh_in', em: M.problema - 0.15, volume: 0.4},
  {som: 'swoosh', em: M.passar - 0.1, volume: 0.5},
  {som: 'risco', em: M.passar + 0.1, volume: 0.45},
  // Erro 1
  {som: 'impacto', em: M.primeiro, volume: 0.55},
  {som: 'pop', em: M.escura - 0.1, volume: 0.4},
  {som: 'pop', em: M.estoura - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.vira - 0.1, volume: 0.5},
  {som: 'ding', em: M.graca - 0.15, volume: 0.55},
  // Erro 2
  {som: 'impacto', em: M.segundo, volume: 0.55},
  {som: 'pop', em: M.eco - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.braco - 0.15, volume: 0.45},
  {som: 'ding', em: M.lapela - 0.15, volume: 0.5},
  // Erro 3
  {som: 'impacto', em: M.terceiro, volume: 0.55},
  {som: 'tique', em: M.oi, volume: 0.3},
  {som: 'tique', em: M.oi + 0.5, volume: 0.3},
  {som: 'tique', em: M.oi + 1.0, volume: 0.3},
  {som: 'tique', em: M.oi + 1.5, volume: 0.3},
  {som: 'swoosh', em: M.espera - 0.1, volume: 0.5},
  {som: 'risco', em: M.espera + 0.1, volume: 0.45},
  {som: 'ding', em: M.comeca - 0.1, volume: 0.5},
  {som: 'pop', em: M.bolo - 0.15, volume: 0.4},
  {som: 'pop', em: M.cliente - 0.15, volume: 0.4},
  {som: 'pop', em: M.antes - 0.15, volume: 0.4},
  // Fecho
  {som: 'whoosh_in', em: M.eGrava - 0.15, volume: 0.4},
  {som: 'pop', em: M.apoiado - 0.15, volume: 0.45},
  {som: 'impacto', em: M.pronto - 0.1, volume: 0.55},
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
    // Até "o Reels" a abertura (Reels amador) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.amador - 0.4, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    // O fim do clipe A (3,66–3,87 s, depois de "amador") fica artificial: sai um pouco antes do meio.
    {de: T.meio - 0.22, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {amador: COR.vermelho, erro: COR.vermelho, janela: COR.amarelo, eco: COR.vermelho, resultado: COR.verde, apoiado: COR.verde},
  eventos: EVENTOS,
  Cena,
};
