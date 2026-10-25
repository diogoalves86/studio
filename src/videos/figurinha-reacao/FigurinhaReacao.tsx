import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 027 · Tem uma figurinha nos Stories que te entrega a lista de quem quer comprar.
// Nossa versão (honesta) de um vídeo de referência do Diogo: telas do app recriadas em animação, nada do original.
// Abertura (toques no 😍 viram nomes) → a figurinha de reação (bandeja → personalizar → toque → nomes) → passo 1: Stories
// que pede o toque → passo 2: "Reações de figurinhas" → passo 3: chama no Direct → aviso: não esconder a figurinha → CTA.

const T = TRECHOS;
const M = {
  que1: em('que'),
  lista1: em('lista'),
  comprar: em('comprar'),
  reacao: em('reação'),
  emoji: em('emoji'),
  toca1: em('toca'),
  reagir: em('reagir'),
  nome: em('nome'),
  entao: em('então'),
  produto: em('produto'),
  toca2: em('toca', em('escreve')),
  coloca: em('coloca', em('escreve')),
  grande: em('grande'),
  depois: em('depois'),
  abre: em('abre'),
  reacoes: em('reações'),
  nome2: em('nome', em('reações')),
  essa: em('essa'),
  clientes: em('clientes'),
  chama: em('chama'),
  prometeu: em('prometeu'),
  so: em('só', em('prometeu')),
  debaixo: em('debaixo'),
  reage: em('reage'),
  querer: em('querer'),
  lista3: em('lista', em('querer')),
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

// ---------- Telas animadas do Stories (recriadas; nada do vídeo de referência entra) ----------

const Celular: React.FC<{w?: number; style?: React.CSSProperties; children?: React.ReactNode; fundo?: string}> = ({w = 440, style, children, fundo = '#0D1117'}) => {
  const k = w / 440;
  return (
    <div style={{position: 'absolute', width: w, height: w * 16 / 9, borderRadius: 46 * k, border: `${10 * k}px solid #1B2238`, background: fundo, overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      {children}
    </div>
  );
};

// Figurinha de reação: círculo branco com o emoji (como a do app).
const FigReacao: React.FC<{tam: number; pulso?: number; style?: React.CSSProperties}> = ({tam, pulso = 0, style}) => (
  <div style={{position: 'absolute', width: tam, height: tam, borderRadius: 999, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: tam * 0.62, boxShadow: '0 10px 30px rgba(0,0,0,.35)', scale: String(1 + 0.12 * pulso), ...style}}>😍</div>
);

// Corações saindo do toque.
const Explosao: React.FC<{t: number; de: number; x: number; y: number; n?: number}> = ({t, de, x, y, n = 7}) => {
  const p = prog(t, de, 0.9, saida);
  if (t < de || p >= 1) return null;
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        const r = 40 + 130 * p;
        return <div key={i} style={{position: 'absolute', left: x + Math.cos(ang) * r - 22, top: y + Math.sin(ang) * r - 22 - 60 * p, fontSize: 44, opacity: 1 - p}}>😍</div>;
      })}
    </>
  );
};

// O Stories da lojinha. `texto`, `produto` e `fig` de 0 a 1 controlam a montagem.
const Stories: React.FC<{t: number; produto?: number; texto?: number; fig?: number; figTam?: number; figPos?: {x: number; y: number}; figPulso?: number; w?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({t, produto = 1, texto = 1, fig = 1, figTam = 150, figPos = {x: 250, y: 470}, figPulso = 0, w = 440, style, children}) => {
  const k = w / 440;
  const chars = '"Toca no ❤️ se você quer o desconto"';
  const n = Math.round(chars.length * texto);
  return (
    <Celular w={w} style={style} fundo="linear-gradient(170deg, #FFD7C2, #F49BB2 50%, #9B6BD1)">
      <div style={{position: 'absolute', left: 16 * k, right: 16 * k, top: 14 * k, height: 4 * k, borderRadius: 4, background: 'rgba(255,255,255,.4)'}}><div style={{width: `${(t * 9) % 100}%`, height: '100%', background: '#fff', borderRadius: 4}} /></div>
      <div style={{position: 'absolute', left: 18 * k, top: 30 * k, display: 'flex', alignItems: 'center', gap: 10 * k}}>
        <div style={{width: 44 * k, height: 44 * k, borderRadius: 99, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 * k}}>🏪</div>
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 22 * k, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.4)'}}>sua.lojinha</span>
      </div>
      {produto > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 150 * k, textAlign: 'center', fontSize: 190 * k, opacity: produto, scale: String(0.7 + 0.3 * produto)}}>🧴</div>}
      {produto > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 360 * k, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 30 * k, color: '#fff', opacity: produto, textShadow: '0 2px 8px rgba(0,0,0,.35)'}}>KIT SKINCARE</div>}
      {texto > 0.01 && <div style={{position: 'absolute', left: 30 * k, right: 30 * k, top: 610 * k, textAlign: 'center'}}><span style={{padding: `${6 * k}px ${10 * k}px`, borderRadius: 10 * k, background: '#fff', fontFamily: INTER, fontWeight: 900, fontSize: 26 * k, color: '#111', lineHeight: 1.6, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{chars.slice(0, n)}</span></div>}
      {fig > 0.01 && <FigReacao tam={figTam * k * fig} pulso={figPulso} style={{left: (figPos.x - (figTam * fig) / 2) * k, top: (figPos.y - (figTam * fig) / 2) * k}} />}
      {children}
    </Celular>
  );
};

const NOMES = ['mari.compras', 'joao.silva22', 'bia_lima', 'carla.santos'];

// Marcador de retenção: PASSO 1 · 2 · 3 no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.entao - 0.2 || t >= M.so + 0.4) return null;
  const e = mola(t, M.entao - 0.2, 13, 200) * (1 - prog(t, M.so + 0.1, 0.3));
  const marcas = [M.entao, M.depois, M.essa];
  const nomes = ['POSTA', 'ABRE A LISTA', 'CHAMA NO DIRECT'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 12, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 18px', borderRadius: 18, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{i + 1} {n}</div>;
      })}
    </div>
  );
};

// ---------- Abertura: toques no 😍 viram uma lista ----------

const A0 = M.que1 - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const toques = [0.15, 0.45, 0.75];
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <Stories t={t} figTam={210} figPos={{x: 220, y: 500}} figPulso={Math.abs(Math.sin(t * 9))} style={{left: 120, top: 470}} />
      {toques.map((d, i) => <Explosao key={i} t={t} de={d} x={340} y={950} />)}
      <div style={{position: 'absolute', left: 600, top: 620, display: 'flex', flexDirection: 'column', gap: 14}}>
        {NOMES.slice(0, 3).map((n, i) => {
          const e = prog(t, toques[i] + 0.2, 0.25, saida);
          return <div key={n} style={{opacity: e, translate: `${(1 - e) * -120}px 0px`, padding: '12px 18px', borderRadius: 16, background: 'rgba(5,40,20,.95)', border: `3px solid ${COR.verde}`, fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.branco}}>😍 {n}</div>;
        })}
      </div>
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
      <AbsoluteFill style={{pointerEvents: 'none', boxShadow: `inset 0 0 ${140 * pulso}px rgba(62,198,255,${0.45 * e})`, border: `${8 * e}px solid rgba(62,198,255,${0.7 * pulso * e})`}} />
      <div style={{position: 'absolute', left: 40, right: 40, top: 270, textAlign: 'center', opacity: texto * (1 - prog(t, T.meio - 0.15, 0.3)), scale: String(interpolate(texto, [0, 1], [1.6, 1])), zIndex: 7}}>
        <div style={{display: 'inline-block', padding: '14px 26px', borderRadius: 24, background: 'rgba(4,12,30,.9)', border: `4px solid ${COR.ciano}`, boxShadow: `0 0 ${40 * pulso}px rgba(62,198,255,.6)`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 58, lineHeight: 1.08, color: COR.branco}}>
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>😍</span> A LISTA DE QUEM<br /><span style={{color: COR.verde}}>QUER COMPRAR</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Peito: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, M.lista1 - 0.15, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 26px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.verde}`}}>
          <span style={{fontSize: 48}}>😍</span>
          <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.cinza}}>→</span>
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco}}>📋 lista de nomes</span>
        </div>
      </div>
      <Carimbo t={t} de={M.comprar - 0.1} cor={COR.verde} tamanho={56} rot={-6} style={{left: 200, top: 1530}}>QUEM QUER COMPRAR ✓</Carimbo>
    </>
  );
};

// ---------- O que é: a figurinha de reação ----------

const OQue: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.entao - 0.15);
  if (!st) return null;
  const fase = t < M.emoji - 0.15 ? 0 : t < M.toca1 - 0.2 ? 1 : 2;
  const destaque = prog(t, M.reacao - 0.15, 0.35);
  const sel = mola(t, M.emoji + 0.3, 9, 260);
  const nomes = t >= M.nome - 0.2;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={T.meio} top={440} tamanho={56}>A <span style={{color: COR.amarelo}}>FIGURINHA DE REAÇÃO</span></Titulo>
      {fase === 0 && (
        <Celular style={{left: 320, top: 560}}>
          <div style={{padding: '24px 18px 8px', fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#9AA3B5', textAlign: 'center'}}>Figurinhas</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, padding: 16, justifyContent: 'center'}}>
            {['📍 LOCALIZAÇÃO', '@ MENÇÃO', '🎵 MÚSICA', '🖼️ FOTO', 'GIF', '📊 ENQUETE', '❓ PERGUNTAS', '😍 REAÇÃO', '⏰ CONTAGEM', '🔗 LINK'].map((s) => {
              const alvo = s.includes('REAÇÃO');
              return <div key={s} style={{padding: '10px 14px', borderRadius: 12, background: alvo ? `rgba(255,214,10,${0.3 * destaque})` : 'rgba(255,255,255,.08)', border: `3px solid ${alvo && destaque > 0.5 ? COR.amarelo : 'transparent'}`, fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#F2F4F8', scale: String(alvo ? 1 + 0.2 * destaque : 1)}}>{s}</div>;
            })}
          </div>
          {destaque > 0.5 && <Toque t={t} de={M.reacao - 0.4} toque={M.reacao} x={220} y={300} />}
        </Celular>
      )}
      {fase === 1 && (
        <Celular style={{left: 320, top: 560}}>
          <div style={{padding: '40px 20px 10px', fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#F2F4F8', textAlign: 'center'}}>Personalize suas figurinhas de reação</div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 30}}>
            {['😍', '🔥', '😂', '👏', '😮'].map((e, i) => <div key={e} style={{width: 66, height: 66, borderRadius: 99, background: i === 0 && sel > 0.5 ? '#fff' : 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, outline: i === 0 && sel > 0.5 ? `4px solid ${COR.amarelo}` : 'none'}}>{e}</div>)}
          </div>
          <FigReacao tam={200 * sel} style={{left: 220 - 100 * sel, top: 380 - 100 * sel}} />
        </Celular>
      )}
      {fase === 2 && (
        <>
          <Stories t={t} figTam={170} figPulso={Math.abs(Math.sin(t * 8)) * (t < M.reagir + 0.6 ? 1 : 0)} style={{left: 120, top: 560}} />
          <Toque t={t} de={M.toca1 - 0.4} toque={M.toca1} x={370} y={1000} />
          <Explosao t={t} de={M.toca1} x={370} y={1000} />
          {nomes && (
            <div style={{position: 'absolute', left: 600, top: 680, display: 'flex', flexDirection: 'column', gap: 14}}>
              {NOMES.slice(0, 3).map((n, i) => {
                const e = mola(t, M.nome - 0.2 + i * 0.25, 11, 230);
                return <div key={n} style={{opacity: e, translate: `${(1 - e) * -100}px 0px`, padding: '12px 18px', borderRadius: 16, background: 'rgba(5,40,20,.95)', border: `3px solid ${COR.verde}`, fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.branco}}>😍 {n}</div>;
              })}
            </div>
          )}
        </>
      )}
      <Fonte t={t} de={M.reacao} ate={M.toca1} top={1470} veiculo="Canaltech" titulo="Instagram testa figurinhas interativas para reações" />
    </AbsoluteFill>
  );
};

// ---------- Passo 1: o Stories que pede o toque ----------

const Passo1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.entao - 0.15, M.depois - 0.15);
  if (!st) return null;
  const produto = prog(t, M.produto - 0.15, 0.4, saida);
  const texto = prog(t, M.toca2 - 0.1, 1.4);
  const fig = prog(t, M.coloca - 0.1, 0.4, saida);
  const grande = interpolate(prog(t, M.grande - 0.15, 0.5, saida), [0, 1], [110, 190]);
  return (
    <AbsoluteFill style={st}>
      <SeloPasso t={t} de={M.entao} n={1} texto="POSTA O PRODUTO" />
      <Stories t={t} produto={produto} texto={texto} fig={fig} figTam={grande} figPos={{x: 300, y: 470}} figPulso={Math.abs(Math.sin(t * 6)) * fig} style={{left: 320, top: 560}} />
      {t >= M.grande - 0.15 && <Etiqueta t={t} de={M.grande - 0.15} cor={COR.amarelo} style={{left: 60, top: 920}}>😍 BEM GRANDE</Etiqueta>}
      {t >= M.toca2 && <Etiqueta t={t} de={M.toca2} cor={COR.ciano} style={{left: 740, top: 1180}}>✍️ PEDE O TOQUE</Etiqueta>}
    </AbsoluteFill>
  );
};

const SeloPasso: React.FC<{t: number; de: number; n: number; texto: string}> = ({t, de, n, texto}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 230);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${-3 + (1 - e) * 10}deg`}}>
      <Pilula cor={COR.verde} tamanho={44} fundo="linear-gradient(135deg, #1E9E5A, #3BD17E)">PASSO {n}: {texto}</Pilula>
    </div>
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

// ---------- Passo 2: a lista de quem viu → "Reações de figurinhas" ----------

const Passo2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.depois - 0.15, M.essa - 0.15);
  if (!st) return null;
  const tela = mola(t, M.abre - 0.1, 12, 200);
  const secao = prog(t, M.reacoes - 0.15, 0.4, saida);
  return (
    <AbsoluteFill style={st}>
      <SeloPasso t={t} de={M.depois} n={2} texto="ABRE QUEM VIU" />
      <Celular style={{left: 320, top: 560, opacity: tela}}>
        <div style={{padding: '26px 20px 10px', fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#F2F4F8', textAlign: 'center'}}>👁️ Atividade</div>
        <div style={{margin: '10px 16px', padding: 14, borderRadius: 14, background: `rgba(255,214,10,${0.18 * secao})`, border: `3px solid ${secao > 0.5 ? COR.amarelo : 'transparent'}`}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#F2F4F8', marginBottom: 10}}>Reações de figurinhas</div>
          {NOMES.map((n, i) => {
            const e = mola(t, M.nome2 - 0.3 + i * 0.15, 11, 230);
            return (
              <div key={n} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', opacity: Math.max(0.25, e)}}>
                <div style={{width: 44, height: 44, borderRadius: 99, background: 'linear-gradient(135deg, #3A4A7A, #22305A)'}} />
                <span style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 22, color: '#F2F4F8'}}>{n}</span>
                <span style={{fontSize: 26}}>😍</span>
              </div>
            );
          })}
        </div>
        <div style={{margin: '6px 16px', fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#6A7290'}}>Visualizações</div>
        {[0, 1, 2].map((i) => <div key={i} style={{margin: '8px 16px', height: 40, borderRadius: 10, background: 'rgba(255,255,255,.05)'}} />)}
      </Celular>
      {secao > 0.5 && <Etiqueta t={t} de={M.reacoes} cor={COR.amarelo} style={{left: 40, top: 760}}>📋 OS NOMES</Etiqueta>}
    </AbsoluteFill>
  );
};

// ---------- Passo 3: chama no Direct ----------

const Passo3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.essa - 0.15, M.so - 0.15);
  if (!st) return null;
  const titulo = mola(t, M.clientes - 0.15, 10, 240);
  const dm = t >= M.chama - 0.15;
  return (
    <AbsoluteFill style={st}>
      <SeloPasso t={t} de={M.essa} n={3} texto="CHAMA NO DIRECT" />
      {!dm && (
        <div style={{position: 'absolute', left: 180, right: 180, top: 600, padding: 28, borderRadius: 30, ...caixa, border: `4px solid ${COR.verde}88`, opacity: titulo, scale: String(0.85 + 0.15 * titulo)}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 38, color: COR.verde, marginBottom: 16}}>📋 CLIENTES INTERESSADOS</div>
          {NOMES.map((n) => <div key={n} style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco, padding: '8px 0'}}>✓ {n}</div>)}
        </div>
      )}
      {dm && (
        <div style={{position: 'absolute', left: 120, right: 120, top: 600, display: 'flex', flexDirection: 'column', gap: 18}}>
          {NOMES.slice(0, 3).map((n, i) => {
            const e = mola(t, M.chama - 0.1 + i * 0.35, 11, 220);
            return (
              <div key={n} style={{alignSelf: 'flex-end', maxWidth: 760, padding: '18px 24px', borderRadius: 30, background: '#3B82F6', fontFamily: INTER, fontWeight: 700, fontSize: 32, color: '#fff', opacity: e, translate: `${(1 - e) * 120}px 0px`, boxShadow: '0 16px 40px rgba(0,0,0,.4)'}}>
                Oi, {n.split(/[._]/)[0]}! Aqui está o seu desconto 🎁 <span style={{fontSize: 22, opacity: 0.8}}>✓✓</span>
              </div>
            );
          })}
        </div>
      )}
      {dm && <Carimbo t={t} de={M.prometeu - 0.1} cor={COR.verde} tamanho={56} rot={-6} style={{left: 330, top: 1130}}>VENDA ✓</Carimbo>}
    </AbsoluteFill>
  );
};

// ---------- O aviso: o "hack" escondido ----------

const Aviso: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.so - 0.15, T.b - 0.1);
  if (!st) return null;
  const cobre = prog(t, M.debaixo - 0.15, 0.6, suave);
  const toques = [M.reage - 0.1, M.reage + 0.25, M.querer];
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.so} top={440} tamanho={56}>⚠️ <span style={{color: COR.vermelho}}>NÃO ESCONDE</span> A FIGURINHA</Titulo>
      <Celular style={{left: 320, top: 560}} fundo="#0D1117">
        <FigReacao tam={380} style={{left: 30, top: 200}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: 'linear-gradient(170deg, #FFD7C2, #F49BB2 50%, #9B6BD1)', opacity: 0.25 + 0.75 * cobre, translate: `0px ${(1 - cobre) * 700}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 180}}>🧴</div>
        {cobre > 0.5 && <div style={{position: 'absolute', left: 30, top: 200, width: 380, height: 380, borderRadius: 999, border: '5px dashed rgba(255,77,94,.9)'}} />}
      </Celular>
      {toques.map((d, i) => <Explosao key={i} t={t} de={d} x={[430, 650, 520][i]} y={[820, 980, 1100][i]} n={5} />)}
      {t >= M.reage - 0.3 && <Etiqueta t={t} de={M.reage - 0.2} cor={COR.vermelho} style={{left: 30, top: 900}}>👆 SEM QUERER</Etiqueta>}
      <Carimbo t={t} de={M.lista3 - 0.1} cor={COR.vermelho} tamanho={64} rot={-7} style={{left: 280, top: 1100}}>LISTA FALSA ✕</Carimbo>
      <Fonte t={t} de={M.so} ate={M.lista3} top={1470} veiculo="Central de Ajuda do Instagram" titulo="Isca de engajamento não é recomendada" />
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Canaltech · Central de Ajuda do Instagram</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; perfis, produto e nomes são exemplos.</div>
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
      <OQue t={t} />
      <Passo1 t={t} />
      <Passo2 t={t} />
      <Passo3 t={t} />
      <Aviso t={t} />
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
  {som: 'toque', em: 0.15, volume: 0.5},
  {som: 'toque', em: 0.45, volume: 0.5},
  {som: 'toque', em: 0.75, volume: 0.5},
  {som: 'pop', em: 0.35, volume: 0.35},
  {som: 'pop', em: 0.65, volume: 0.35},
  {som: 'pop', em: 0.95, volume: 0.35},
  {som: 'pop', em: M.lista1 - 0.15, volume: 0.4},
  {som: 'ding', em: M.comprar - 0.1, volume: 0.55},
  // O que é
  {som: 'whoosh_in', em: T.meio, volume: 0.4},
  {som: 'toque', em: M.reacao, volume: 0.55},
  {som: 'pop', em: M.emoji + 0.3, volume: 0.45},
  {som: 'toque', em: M.toca1, volume: 0.6},
  {som: 'pop', em: M.toca1 + 0.05, volume: 0.45},
  {som: 'ding', em: M.nome - 0.2, volume: 0.45},
  // Passo 1
  {som: 'impacto', em: M.entao, volume: 0.5},
  {som: 'pop', em: M.produto - 0.15, volume: 0.4},
  {som: 'tecla', em: M.toca2, volume: 0.4},
  {som: 'tecla', em: M.toca2 + 0.4, volume: 0.4},
  {som: 'tecla', em: M.toca2 + 0.8, volume: 0.4},
  {som: 'pop', em: M.coloca - 0.1, volume: 0.45},
  {som: 'whoosh_in', em: M.grande - 0.15, volume: 0.4},
  // Passo 2
  {som: 'impacto', em: M.depois, volume: 0.5},
  {som: 'ding', em: M.reacoes - 0.15, volume: 0.5},
  // Passo 3
  {som: 'impacto', em: M.essa, volume: 0.5},
  {som: 'pop', em: M.chama - 0.1, volume: 0.4},
  {som: 'pop', em: M.chama + 0.25, volume: 0.4},
  {som: 'pop', em: M.chama + 0.6, volume: 0.4},
  {som: 'ding', em: M.prometeu - 0.1, volume: 0.55},
  // Aviso
  {som: 'impacto', em: M.so, volume: 0.55},
  {som: 'whoosh_in', em: M.debaixo - 0.15, volume: 0.45},
  {som: 'toque', em: M.reage - 0.1, volume: 0.5},
  {som: 'toque', em: M.reage + 0.25, volume: 0.5},
  {som: 'risco', em: M.lista3 - 0.1, volume: 0.5},
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
    // Até "que te entrega" a abertura (toques viram nomes) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.comprar - 0.5, modo: 'cheia', escala: [1.2, 1.24], punch: true},
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
  corEspecial: {lista: COR.verde, comprar: COR.verde, reação: COR.amarelo, coração: COR.vermelho, interessados: COR.verde, esconde: COR.vermelho},
  eventos: EVENTOS,
  Cena,
};
