import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {Config, Destaque, OUTRO} from './Destaque';
import {CONFIG_1} from './Destaque1';
import {CONFIG_2} from './Destaque2';
import {CONFIG_3} from './Destaque3';
import {CONFIG_4} from './Destaque4';
import {em as em1, PALAVRAS as P1} from './palavras_1';
import {ARQ, clamp, COR, saida, suave} from './tema';

// Vídeo único para o feed (fixado no perfil): os 4 destaques em sequência, com um só CTA no final.
// O destaque 1 termina em "Você revisa, aprova e publica." (sai "Testa sete dias grátis. Link na bio.",
// que o destaque 4 já diz). Entre os blocos: zoom + desfoque na pausa entre as falas, com whoosh.

const publica = P1.find((p) => p.s === em1('publica.'))!;

// Bloco 1 cortado logo depois de "publica.": o resto da config continua valendo, só o fim muda.
const BLOCOS: Config[] = [
  {...CONFIG_1, trechos: {...CONFIG_1.trechos, fim: publica.e + 0.15}},
  CONFIG_2,
  CONFIG_3,
  CONFIG_4,
];

const RESPIRO = 0.3; // silêncio extra entre o fim de uma fala e o começo da próxima (além dos ~0,13 s do áudio)
const SAI = 0.5; // duração da saída (zoom + desfoque) do bloco que termina
const ENTRA = 0.35; // duração da entrada do próximo bloco

const inicios = BLOCOS.reduce<number[]>((acc, c, i) => [...acc, i === 0 ? 0 : acc[i - 1] + BLOCOS[i - 1].trechos.fim + RESPIRO], []);
const ultimo = BLOCOS.length - 1;
export const FEED_DURACAO = inicios[ultimo] + BLOCOS[ultimo].trechos.fim + OUTRO;

export const FeedCompleto: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const q = (s: number) => Math.round(s * fps);

  return (
    <AbsoluteFill style={{background: COR.marinho}}>
      {BLOCOS.map((c, i) => {
        const de = inicios[i];
        const final = i === ultimo;
        const dur = final ? c.trechos.fim + OUTRO : c.trechos.fim + SAI;
        const local = t - de;
        const entra = i === 0 ? 1 : interpolate(local, [0, ENTRA], [0, 1], {...clamp, easing: saida});
        const sai = final ? 0 : interpolate(local, [c.trechos.fim, c.trechos.fim + SAI], [0, 1], {...clamp, easing: suave});
        return (
          <Sequence key={c.n} name={`Bloco ${c.n}`} from={q(de)} durationInFrames={q(dur)} premountFor={fps}>
            <AbsoluteFill
              style={{
                opacity: entra * (1 - sai),
                scale: String((0.9 + 0.1 * entra) * (1 + 0.12 * sai)),
                filter: `blur(${16 * (1 - entra) + 18 * sai}px)`,
              }}
            >
              <Destaque c={c} outro={final} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
      {inicios.slice(1).map((s, i) => (
        <Sequence key={i} name="sfx · transição" from={q(s - 0.45)} layout="none">
          <Audio src={ARQ.sfx('whoosh_in')} volume={0.4} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
