import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio, Video} from '@remotion/media';
import {CenaDiferenca} from './CenaDiferenca';
import {CenaExemplo} from './CenaExemplo';
import {CenaGancho} from './CenaGancho';
import {CenaSegredo} from './CenaSegredo';
import {Encerramento, OUTRO} from './Encerramento';
import {Fundo, Wipe} from './Fundo';
import {Legenda} from './Legenda';
import {CARD, camera, cartao, PLANOS_DIFERENCA, PLANOS_GANCHO} from './camera';
import {EfeitosSonoros} from './EfeitosSonoros';
import {maoLivre, Textura} from './Textura';
import {ARQ, clamp, COR, suave, T} from './tema';

// 001. reels-avatar: Reels de ~43 s com a voz natural dos áudios separados em todo o vídeo.
// Trechos 1 e 3: clipes do Seedance 2 Mini reajustados no tempo para a boca acompanhar a voz; onde o movimento
// fica artificial, o avatar vira card ou sai de cena para motion graphics. Trechos 2 e 4: cenas animadas.

export const REELS_DURACAO = T.fim + OUTRO;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Avatar: tela cheia (card = 0) ou card no canto (card = 1). Com zoom, o quadro sobe para o queixo ficar acima da legenda.
const Camera: React.FC<{src: string; t: number; escala: number; tremor: number; card: number}> = ({src, t, escala, tremor, card}) => {
  const mao = maoLivre(t);
  // No card, o quadro inteiro encolhe para 0,52 e o rosto (≈540, 600) fica no centro do card.
  const sc = lerp(1, 0.52, card);
  const x0 = lerp(0, CARD.width / 2 - 540 * sc, card);
  const y0 = lerp(0, CARD.height * 0.45 - 600 * sc, card);
  return (
    <div
      style={{
        position: 'absolute', overflow: 'hidden',
        left: lerp(0, CARD.left, card), top: lerp(0, CARD.top, card),
        width: lerp(1080, CARD.width, card), height: lerp(1920, CARD.height, card),
        borderRadius: 40 * card, boxShadow: card > 0 ? `0 30px 80px rgba(0,0,0,${0.55 * card}), 0 0 0 ${5 * card}px rgba(62,198,255,.9)` : undefined,
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
  );
};

export const ReelsAvatar: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = frame / fps;
  const q = (s: number) => Math.round(s * fps);

  const c1 = camera(t, PLANOS_GANCHO, T.exemplo);
  const c3 = camera(t, PLANOS_DIFERENCA, T.segredo);
  const card = cartao(t);

  const wipe = (corte: number) => interpolate(t, [corte - 0.22, corte + 0.22], [0, 1], {...clamp, easing: suave});

  return (
    <AbsoluteFill style={{background: COR.marinho}}>
      <Audio src={ARQ.narracao} />
      <EfeitosSonoros />

      <Sequence name="1 · Gancho (motion → câmera → card)" from={q(T.gancho)} durationInFrames={q(T.exemplo) - q(T.gancho)} premountFor={fps}>
        <Fundo src={ARQ.apoioB} />
        <Camera src={ARQ.clipeGancho} t={t} escala={c1.escala} tremor={c1.tremor} card={card} />
        <CenaGancho />
      </Sequence>

      <Sequence name="2 · Exemplo (cena)" from={q(T.exemplo)} durationInFrames={q(T.diferenca) - q(T.exemplo)} premountFor={fps}>
        <Fundo src={ARQ.apoioA} />
        <CenaExemplo />
      </Sequence>

      <Sequence name="3 · Diferença (motion → câmera → card → câmera)" from={q(T.diferenca)} durationInFrames={q(T.segredo) - q(T.diferenca)} premountFor={fps}>
        <Fundo src={ARQ.apoioA} />
        <Camera src={ARQ.clipeDiferenca} t={t} escala={c3.escala} tremor={c3.tremor} card={card} />
        <CenaDiferenca />
      </Sequence>

      <Sequence name="4 · Segredo + CTA (cena)" from={q(T.segredo)} durationInFrames={durationInFrames - q(T.segredo)} premountFor={fps}>
        <Fundo src={ARQ.apoioB} />
        <CenaSegredo />
      </Sequence>

      <Sequence name="5 · Encerramento" from={q(T.fim - 0.1)} premountFor={fps}>
        <Encerramento />
      </Sequence>

      <Legenda />
      <Textura />
      <Wipe progresso={wipe(T.exemplo)} />
      <Wipe progresso={wipe(T.diferenca)} />
      <Wipe progresso={wipe(T.segredo)} />
      <Wipe progresso={wipe(T.fim)} />
    </AbsoluteFill>
  );
};
