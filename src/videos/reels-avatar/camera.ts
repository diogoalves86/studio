import {interpolate} from 'remotion';
import {M} from './marcas';
import {clamp, saida, suave, T} from './tema';

// Plano de câmera: cada entrada vale a partir de `de` e chega deslizando (0,3 s) do plano anterior; `punch` entra mais forte, com tremor curto.
export type Plano = {de: number; escala: [number, number]; punch?: boolean};

// O avatar só fica em tela cheia onde o movimento do clipe está natural. Os trechos em que o reajuste de tempo
// congela ou acelera demais a boca ficam cobertos por motion graphics (tela cheia) ou com o avatar em card.
export const PLANOS_GANCHO: Plano[] = [
  {de: T.gancho, escala: [1, 1.03]},
  {de: M.pelo, escala: [1, 1.05]},
  {de: M.porque, escala: [1.14, 1.17]},
  {de: M.demora - 0.2, escala: [1.08, 1.1]},
];

export const PLANOS_DIFERENCA: Plano[] = [
  {de: T.diferenca, escala: [1, 1.02]},
  {de: M.no, escala: [1, 1.05]},
  {de: M.aPessoa - 0.32, escala: [1.08, 1.1]},
  {de: M.paraChamar, escala: [1.12, 1.14]},
  {de: M.naoFinal, escala: [1.14, 1.24], punch: true},
];

// Motion em tela cheia por cima do avatar: [início, fim] (o fim é quando o avatar reaparece).
export const MOTION_CHEIO: [number, number][] = [
  [T.gancho, M.pelo],
  [T.diferenca, M.no],
];

// Avatar em card no canto: [início, fim] das transições (0,45 s cada).
export const EM_CARD: [number, number][] = [
  [M.demora - 0.2, T.exemplo + 1],
  [M.aPessoa - 0.32, M.paraChamar - 0.2],
];

// 0 = tela cheia, 1 = card.
export const cartao = (t: number) =>
  Math.max(
    ...EM_CARD.map(([a, b]) =>
      Math.min(
        interpolate(t, [a, a + 0.45], [0, 1], {...clamp, easing: suave}),
        interpolate(t, [b, b + 0.45], [1, 0], {...clamp, easing: suave}),
      ),
    ),
  );

// Retângulo do card (1080×1920): canto inferior direito, 3:4.
export const CARD = {left: 612, top: 760, width: 420, height: 560};

export const camera = (t: number, planos: Plano[], fim: number) => {
  const i = Math.max(0, planos.filter((p) => t >= p.de).length - 1);
  const p = planos[i];
  const ate = planos[i + 1]?.de ?? fim;
  const base = p.punch
    ? interpolate(t, [p.de, p.de + 0.3], p.escala, {...clamp, easing: saida})
    : interpolate(t, [p.de, ate], p.escala, clamp);
  const anterior = planos[i - 1];
  const vindo = anterior && !p.punch ? interpolate(p.de, [anterior.de, p.de], anterior.escala, clamp) : base;
  const escala = interpolate(t, [p.de, p.de + 0.3], [vindo, base], {...clamp, easing: suave});
  const tremor = p.punch ? Math.sin((t - p.de) * 70) * 9 * (1 - Math.min(1, Math.max(0, t - p.de) / 0.3)) : 0;
  return {escala, tremor};
};
