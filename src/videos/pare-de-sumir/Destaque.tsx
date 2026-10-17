import React from 'react';
import {AbsoluteFill, Freeze, Img, interpolate, Sequence, useVideoConfig} from 'remotion';
import {Audio, Video} from '@remotion/media';
import {Fundo, Wipe} from '../reels-avatar/Fundo';
import {maoLivre, Textura} from '../reels-avatar/Textura';
import {ARQ, clamp, COR, INTER, MONT, prog, saida, suave, useMola, useT} from './tema';

// Esqueleto do destaque (cópia de ../sexta-22h/Destaque.tsx), no padrão do guia 6:
// avatar na abertura (trecho "a") e no fechamento (trecho "b"), motion no meio, alternando entre
// tela cheia, card e motion cheio; wipe azul nas trocas de trecho; legenda dinâmica; tela final com a logo.

export type Palavra = {w: string; s: number; e: number};
export type Modo = 'cheia' | 'card' | 'fora';
// A partir de `de`, o avatar fica nesse modo. Em tela cheia, `escala` vai de [0] a [1] até o próximo estado;
// `punch` entra forte (0,3 s) com tremor curto.
export type Estado = {de: number; modo: Modo; escala?: [number, number]; punch?: boolean};
export type Som = 'whoosh_in' | 'whoosh_out' | 'swoosh' | 'impacto' | 'pop' | 'tique' | 'tecla' | 'toque' | 'ding' | 'risco';
export type Evento = {som: Som; em: number; volume: number};
export type Trechos = {a: number; meio: number; b: number; fim: number};

export type Config = {
  palavras: Palavra[];
  trechos: Trechos;
  estados: Estado[];
  // Legenda some quando a frase já está escrita na tela.
  semLegenda: [number, number][];
  corEspecial?: Record<string, string>;
  eventos: Evento[];
  Cena: React.FC;
};

export const OUTRO = 1.4;
export const duracao = (c: Config) => c.trechos.fim + OUTRO;

// Card do avatar (1080×1920): à direita, 3:4, conteúdo vai em cima e à esquerda.
export const CARD = {left: 612, top: 760, width: 420, height: 560};

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ESCALA_PADRAO: Record<Modo, [number, number]> = {cheia: [1, 1.04], card: [1, 1.02], fora: [1, 1]};

export const estadoEm = (t: number, E: Estado[]) => {
  const i = Math.max(0, E.filter((e) => t >= e.de).length - 1);
  const e = E[i];
  const ant = E[i - 1] ?? e;
  const alvoCard = (x: Estado) => (x.modo === 'card' ? 1 : 0);
  const alvoPres = (x: Estado) => (x.modo === 'fora' ? 0 : 1);
  const card = lerp(alvoCard(ant), alvoCard(e), prog(t, e.de, 0.45));
  const presenca = lerp(alvoPres(ant), alvoPres(e), prog(t, e.de, 0.3));

  const esc = e.escala ?? ESCALA_PADRAO[e.modo];
  const ate = E[i + 1]?.de ?? e.de + 4;
  const fimAnt = (ant.escala ?? ESCALA_PADRAO[ant.modo])[1];
  const base = e.punch ? interpolate(t, [e.de, e.de + 0.3], esc, {...clamp, easing: saida}) : interpolate(t, [e.de, ate], esc, clamp);
  const escala = e.punch ? base : interpolate(t, [e.de, e.de + 0.3], [fimAnt, base], {...clamp, easing: suave});
  const tremor = e.punch ? Math.sin((t - e.de) * 70) * 9 * (1 - Math.min(1, Math.max(0, t - e.de) / 0.3)) : 0;
  return {card, presenca, escala, tremor};
};

// Avatar: tela cheia (card = 0) ou card (card = 1); some com zoom + desfoque quando sai de cena.
const Camera: React.FC<{src: string; t: number; E: Estado[]}> = ({src, t, E}) => {
  const {card, presenca, escala, tremor} = estadoEm(t, E);
  if (presenca <= 0.001) return null;
  const mao = maoLivre(t);
  const sc = lerp(1, 0.52, card);
  const x0 = lerp(0, CARD.width / 2 - 540 * sc, card);
  const y0 = lerp(0, CARD.height * 0.45 - 600 * sc, card);
  return (
    <AbsoluteFill style={{opacity: presenca, scale: String(1 + 0.18 * (1 - presenca)), filter: `blur(${14 * (1 - presenca)}px)`}}>
      <div
        style={{
          position: 'absolute', overflow: 'hidden',
          left: lerp(0, CARD.left, card), top: lerp(0, CARD.top, card),
          width: lerp(1080, CARD.width, card), height: lerp(1920, CARD.height, card),
          borderRadius: 40 * card,
          boxShadow: card > 0 ? `0 30px 80px rgba(0,0,0,${0.55 * card}), 0 0 0 ${5 * card}px rgba(62,198,255,.9)` : undefined,
          rotate: `${mao.r + 2 * card}deg`,
        }}
      >
        <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transformOrigin: '0 0', translate: `${x0}px ${y0}px`, scale: String(sc)}}>
          <AbsoluteFill
            style={{
              scale: String(escala * 1.02), transformOrigin: '50% 32%',
              translate: `${tremor + mao.x}px ${-(escala - 1) * 420 * (1 - card) + mao.y}px`,
              filter: 'contrast(1.05) saturate(.9) brightness(.98)',
            }}
          >
            <Video src={src} muted objectFit="cover" style={{width: '100%', height: '100%'}} />
          </AbsoluteFill>
          <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 52%, rgba(5,10,30,.5) 72%, rgba(5,10,30,.2) 100%)', opacity: 1 - card}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Legenda dinâmica: grupos de até 3 palavras, quebra na pontuação ou em pausa > 0,25 s; palavra falada em azul.
const Legenda: React.FC<{c: Config}> = ({c}) => {
  const t = useT();
  const mola = useMola();
  const grupos = React.useMemo(() => {
    const G: Palavra[][] = [];
    for (const p of c.palavras) {
      const atual = G[G.length - 1];
      const ultima = atual?.[atual.length - 1];
      const quebra = !atual || atual.length >= 3 || /[.,?!]$/.test(ultima.w) || p.s - ultima.e > 0.25;
      if (quebra) G.push([p]);
      else atual.push(p);
    }
    return G;
  }, [c.palavras]);
  if (t >= c.trechos.fim || c.semLegenda.some(([a, b]) => t >= a && t < b)) return null;
  const i = grupos.findIndex((g, k) => t >= g[0].s && t < Math.min(grupos[k + 1]?.[0].s ?? Infinity, g[g.length - 1].e + 0.6));
  if (i < 0) return null;
  const grupo = grupos[i];
  const ativa = [...grupo].reverse().find((p) => t >= p.s);
  const {card, presenca} = estadoEm(t, c.estados);
  const topo = card > 0.5 ? 1360 : presenca > 0.5 ? 1110 : 1340;
  const limpa = (w: string) => w.replace(/[.,]$/, '').replace(/^\.com$/, 'PONTO COM').toUpperCase();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute', left: 60, right: card > 0.5 ? 60 : 60, top: topo, display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', alignItems: 'center', gap: '6px 18px',
          fontFamily: MONT, fontWeight: 900, fontSize: 76, lineHeight: 1.12, letterSpacing: -0.5,
        }}
      >
        {grupo
          .filter((p) => t >= p.s)
          .map((p) => {
            const pop = mola(t, p.s, 13, 200);
            const eAtiva = p === ativa;
            const destaque = c.corEspecial?.[p.w] ?? COR.azul;
            return (
              <span
                key={p.s}
                style={{
                  display: 'inline-block', padding: '2px 16px', borderRadius: 16, color: COR.branco,
                  background: eAtiva ? destaque : 'transparent', scale: String(0.75 + 0.25 * pop), opacity: pop,
                  textShadow: eAtiva ? 'none' : '0 4px 0 rgba(0,0,0,.45), 0 8px 30px rgba(0,0,0,.6)',
                  WebkitTextStroke: eAtiva ? undefined : '2px rgba(5,10,30,.55)',
                  boxShadow: eAtiva ? '0 10px 30px rgba(0,0,0,.35)' : undefined,
                }}
              >
                {limpa(p.w)}
              </span>
            );
          })}
      </div>
    </AbsoluteFill>
  );
};

// Sons automáticos: troca de card, punch-in, cortes de zoom, wipes e a logo da tela final.
const sonsDaCamera = (c: Config, outro: boolean): Evento[] => {
  const ev: Evento[] = [];
  c.estados.forEach((e, i) => {
    const ant = c.estados[i - 1];
    if (!ant) return;
    if (e.punch) ev.push({som: 'whoosh_in', em: e.de - 0.27, volume: 0.5}, {som: 'impacto', em: e.de, volume: 0.5});
    else if (e.modo === 'card' && ant.modo !== 'card') ev.push({som: 'whoosh_out', em: e.de - 0.2, volume: 0.5});
    else if (ant.modo === 'card' && e.modo === 'cheia') ev.push({som: 'whoosh_in', em: e.de - 0.2, volume: 0.5});
    else if (e.modo === 'fora' && ant.modo !== 'fora') ev.push({som: 'whoosh_out', em: e.de - 0.2, volume: 0.45});
    else if (ant.modo === 'fora' && e.modo !== 'fora') ev.push({som: 'whoosh_in', em: e.de - 0.2, volume: 0.45});
    else if (e.modo === 'cheia') ev.push({som: 'whoosh_in', em: e.de - 0.27, volume: 0.35});
  });
  const {meio, b, fim} = c.trechos;
  for (const corte of outro ? [meio, b, fim] : [meio, b]) ev.push({som: 'swoosh', em: corte - 0.32, volume: 0.6});
  if (outro) ev.push({som: 'impacto', em: fim + 0.08, volume: 0.5});
  return ev;
};

const GERAL = 0.8;

const EfeitosSonoros: React.FC<{c: Config; outro: boolean}> = ({c, outro}) => {
  const {fps} = useVideoConfig();
  // Sem tela final (bloco do vídeo do feed), nada toca depois do fim da fala.
  const eventos = [...sonsDaCamera(c, outro), ...c.eventos].filter((e) => outro || e.em < c.trechos.fim);
  return (
    <>
      {eventos.map((e, i) => (
        <Sequence key={i} name={`sfx · ${e.som}`} from={Math.max(0, Math.round(e.em * fps))} layout="none">
          <Audio src={ARQ.sfx(e.som)} volume={e.volume * GERAL} />
        </Sequence>
      ))}
    </>
  );
};

const Encerramento: React.FC<{fim: number}> = ({fim}) => {
  const t = useT();
  const mola = useMola();
  if (t < fim - 0.1) return null;
  const icone = mola(t, fim + 0.08, 11, 170);
  const nome = mola(t, fim + 0.22);
  const arroba = mola(t, fim + 0.36);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0E2250 0%, #000 68%)', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <Img
        src={ARQ.logo}
        style={{width: 300, height: 300, borderRadius: 72, boxShadow: '0 30px 90px rgba(46,229,157,.25), 0 0 0 3px rgba(62,198,255,.35)', scale: String(icone), rotate: `${(1 - icone) * -20}deg`}}
      />
      <div style={{marginTop: 50, fontFamily: MONT, fontWeight: 900, fontSize: 112, color: COR.branco, opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>Digo Social</div>
      <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 700, fontSize: 56, color: COR.ciano, opacity: arroba, translate: `0px ${(1 - arroba) * 30}px`}}>@digo.social</div>
    </AbsoluteFill>
  );
};

// `outro = false`: bloco do vídeo do feed (sem tela final; o avatar fica parado no último quadro durante a transição).
export const Destaque: React.FC<{c: Config; outro?: boolean}> = ({c, outro = true}) => {
  const t = useT();
  const {fps, durationInFrames} = useVideoConfig();
  const q = (s: number) => Math.round(s * fps);
  const {meio, b, fim} = c.trechos;
  const wipe = (corte: number) => interpolate(t, [corte - 0.22, corte + 0.22], [0, 1], {...clamp, easing: suave});
  const {Cena} = c;

  return (
    <AbsoluteFill style={{background: COR.marinho}}>
      {/* A narração para em trechos.fim (o feed corta o CTA do destaque 1 antes do fim do áudio). */}
      <Sequence name="Narração" durationInFrames={q(fim) + 2} layout="none">
        <Audio src={ARQ.narracao} />
      </Sequence>
      <EfeitosSonoros c={c} outro={outro} />

      {/* Fundo das cenas: o próprio clipe do avatar desfocado e escurecido (sem B-roll). */}
      <Sequence name="Fundo" durationInFrames={durationInFrames}>
        <Fundo src={ARQ.clipe('a')} />
      </Sequence>
      <Sequence name={"a · avatar abertura"} from={0} durationInFrames={q(meio)} premountFor={fps}>
        <Camera src={ARQ.clipe('a')} t={t} E={c.estados} />
      </Sequence>
      <Sequence name={"b · avatar fechamento"} from={q(b)} durationInFrames={q(fim) - q(b) + 3} premountFor={fps}>
        <Camera src={ARQ.clipe('b')} t={t} E={c.estados} />
      </Sequence>
      {!outro && (
        <Sequence name={"b · último quadro"} from={q(fim) + 3}>
          <Freeze frame={q(fim) - q(b) - 1}>
            <Camera src={ARQ.clipe('b')} t={fim} E={c.estados} />
          </Freeze>
        </Sequence>
      )}

      <Cena />
      {outro && <Encerramento fim={fim} />}
      <Legenda c={c} />
      <Textura />
      <Wipe progresso={wipe(meio)} />
      <Wipe progresso={wipe(b)} />
      {outro && <Wipe progresso={wipe(fim)} />}
    </AbsoluteFill>
  );
};
