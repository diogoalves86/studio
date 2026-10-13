import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Palavra, PALAVRAS} from './palavras';
import {cartao} from './camera';
import {M} from './marcas';
import {COR, MONT, T, useMola, useT} from './tema';

// Grupos de até 3 palavras; quebra na pontuação ou numa pausa maior que 0,35 s.
const GRUPOS: Palavra[][] = [];
for (const p of PALAVRAS) {
  const atual = GRUPOS[GRUPOS.length - 1];
  const ultima = atual?.[atual.length - 1];
  const quebra = !atual || atual.length >= 3 || /[.,?!]$/.test(ultima.w) || p.s - ultima.e > 0.25;
  if (quebra) GRUPOS.push([p]);
  else atual.push(p);
}

// Quando a fala já está escrita na tela (cartões e tipografia), a legenda some para não repetir.
const OCULTA: [number, number][] = [
  [T.gancho, M.pelo - 0.05],
  [M.demora - 0.2, T.exemplo],
  [T.diferenca, M.no - 0.05],
  [T.exemplo, M.emVez],
  [M.oi - 0.05, M.experimenta],
  [M.voce - 0.05, T.diferenca],
  [M.segredo - 0.05, M.quer],
];

// Na câmera a legenda fica entre o queixo e a logo; nas cenas cheias, desce para baixo do conteúdo.
const NA_CAMERA: [number, number][] = [
  [T.gancho, T.exemplo],
  [T.diferenca, T.segredo],
];

// Palavras que ganham cor própria em vez do azul.
const COR_ESPECIAL: Record<string, string> = {'assunto.': COR.vermelho};

const dentro = (t: number, faixas: [number, number][]) => faixas.some(([a, b]) => t >= a && t < b);
const limpa = (w: string) => w.replace(/[.,]$/, '').toUpperCase();

export const Legenda: React.FC = () => {
  const t = useT();
  const mola = useMola();
  if (dentro(t, OCULTA)) return null;

  const i = GRUPOS.findIndex((g, k) => t >= g[0].s && t < Math.min(GRUPOS[k + 1]?.[0].s ?? Infinity, g[g.length - 1].e + 0.6));
  if (i < 0) return null;
  const grupo = GRUPOS[i];
  const ativa = [...grupo].reverse().find((p) => t >= p.s);
  const topo = cartao(t) > 0.5 ? 1360 : dentro(t, NA_CAMERA) ? 1110 : 1330;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute', left: 60, right: 60, top: topo, display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', alignItems: 'center', gap: '6px 18px',
          fontFamily: MONT, fontWeight: 900, fontSize: 76, lineHeight: 1.12, letterSpacing: -0.5,
        }}
      >
        {grupo
          .filter((p) => t >= p.s)
          .map((p) => {
            const pop = mola(t, p.s, 13, 200);
            const eAtiva = p === ativa;
            const destaque = COR_ESPECIAL[p.w] ?? COR.azul;
            return (
              <span
                key={p.s}
                style={{
                  display: 'inline-block', padding: '2px 16px', borderRadius: 16,
                  color: COR.branco,
                  background: eAtiva ? destaque : 'transparent',
                  scale: String(0.75 + 0.25 * pop),
                  opacity: pop,
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
