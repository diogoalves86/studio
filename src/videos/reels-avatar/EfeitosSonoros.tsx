import React from 'react';
import {Sequence, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {Plano, PLANOS_DIFERENCA, PLANOS_GANCHO} from './camera';
import {M} from './marcas';
import {falado, T} from './tema';

// Efeitos sonoros sintetizados localmente (projetos/001. reels-avatar/sfx/). Todos sincronizados com o que acontece na tela.

type Som = 'whoosh_in' | 'whoosh_out' | 'swoosh' | 'impacto' | 'pop' | 'tique' | 'tecla' | 'toque' | 'ding' | 'risco';
type Evento = {som: Som; em: number; volume: number};

// Volume geral dos efeitos: abaixo da voz, sem estourar o pico.
const GERAL = 0.8;

const sfx = (som: Som) => staticFile(`001. reels-avatar/sfx/${som}.wav`);

// O pico do whoosh fica ~0,3 s depois do início: começa antes para estourar junto com o zoom.
const zooms = (planos: Plano[]): Evento[] =>
  planos.slice(1).flatMap((p, i): Evento[] => {
    const antes = planos[i].escala[1];
    if (p.punch) return [{som: 'whoosh_in', em: p.de - 0.27, volume: 0.55}, {som: 'impacto', em: p.de, volume: 0.5}];
    return [{som: p.escala[0] > antes ? 'whoosh_in' : 'whoosh_out', em: p.de - 0.27, volume: 0.55}];
  });

const passoRelogio = (M.assunto - M.demora) / 6;

// Os zooms da câmera só soam quando o avatar está em tela cheia (as trocas de card têm som próprio abaixo).

const EVENTOS: Evento[] = [
  // Câmera: zoom de entrada, afastamento e punch-in
  ...zooms(PLANOS_GANCHO).filter((e) => e.em > M.pelo && e.em < M.demora - 0.5),
  ...zooms(PLANOS_DIFERENCA).filter((e) => e.em > M.paraChamar),
  // Wipes azuis nas trocas de cena e no final
  ...[T.exemplo, T.diferenca, T.segredo, T.fim].map((c): Evento => ({som: 'swoosh', em: c - 0.32, volume: 0.6})),
  // 1. Gancho: texto da abertura, celular com o feed passando direto, cronômetro
  {som: 'pop', em: M.sabe, volume: 0.5},
  {som: 'pop', em: M.muita, volume: 0.5},
  {som: 'whoosh_in', em: M.passa - 0.3, volume: 0.45},
  {som: 'swoosh', em: M.passa - 0.05, volume: 0.35},
  {som: 'impacto', em: M.direto, volume: 0.45},
  {som: 'whoosh_out', em: M.pelo - 0.3, volume: 0.5},
  {som: 'whoosh_out', em: M.demora - 0.45, volume: 0.45},
  ...[1, 2, 3, 4, 5, 6].map((k): Evento => ({som: 'tique', em: M.demora + k * passoRelogio, volume: 0.6})),
  {som: 'impacto', em: M.demais, volume: 0.4},
  {som: 'pop', em: M.assunto, volume: 0.5},
  // 2. Exemplo: título, cartões, digitação, "PULOU!", arrasto, marca-texto
  {som: 'pop', em: M.olha, volume: 0.5},
  {som: 'pop', em: M.esseExemplo, volume: 0.5},
  {som: 'whoosh_in', em: M.emVez - 0.2, volume: 0.45},
  ...falado(M.oi - 0.01, M.experimenta).map((p): Evento => ({som: 'tecla', em: p.s, volume: 0.7})),
  {som: 'impacto', em: M.instagram.s + 0.05, volume: 0.45},
  {som: 'whoosh_out', em: M.instagram.e - 0.2, volume: 0.5},
  {som: 'whoosh_in', em: M.experimenta - 0.2, volume: 0.45},
  ...falado(M.voce - 0.01, T.diferenca).map((p): Evento => ({som: 'tecla', em: p.s, volume: 0.7})),
  {som: 'risco', em: M.esse, volume: 0.35},
  {som: 'ding', em: M.percebeu.s, volume: 0.35},
  // 3. Diferença: abertura com os dois exemplos, card do avatar, retenção, "não precisa inventar" e o risco
  {som: 'pop', em: M.percebe, volume: 0.5},
  {som: 'whoosh_in', em: M.percebe - 0.1, volume: 0.4},
  {som: 'pop', em: M.diferenca, volume: 0.5},
  {som: 'whoosh_out', em: M.no - 0.3, volume: 0.5},
  {som: 'whoosh_out', em: M.aPessoa - 0.55, volume: 0.45},
  {som: 'pop', em: M.motivo, volume: 0.5},
  {som: 'ding', em: M.continuar, volume: 0.3},
  {som: 'pop', em: M.naoPrecisa, volume: 0.5},
  {som: 'impacto', em: M.inventar, volume: 0.35},
  {som: 'pop', em: M.frase, volume: 0.5},
  {som: 'whoosh_in', em: M.paraChamar - 0.45, volume: 0.5},
  {som: 'risco', em: M.naoFinal, volume: 0.5},
  // 4. Segredo, gráfico e CTA
  {som: 'impacto', em: M.segredo, volume: 0.55},
  {som: 'pop', em: M.mostrar, volume: 0.45},
  {som: 'impacto', em: M.problema, volume: 0.45},
  {som: 'whoosh_in', em: M.quer - 0.5, volume: 0.45},
  {som: 'whoosh_in', em: M.crescer - 0.2, volume: 0.4},
  {som: 'whoosh_in', em: M.segue - 0.3, volume: 0.45},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.08, volume: 0.45},
  ...[0, 1, 2].map((i): Evento => ({som: 'pop', em: M.dicas + i * 0.14, volume: 0.45})),
  // Encerramento: logo entrando
  {som: 'impacto', em: T.fim + 0.08, volume: 0.5},
];

export const EfeitosSonoros: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <>
      {EVENTOS.map((e, i) => (
        <Sequence key={i} name={`sfx · ${e.som}`} from={Math.max(0, Math.round(e.em * fps))} layout="none">
          <Audio src={sfx(e.som)} volume={e.volume * GERAL} />
        </Sequence>
      ))}
    </>
  );
};
