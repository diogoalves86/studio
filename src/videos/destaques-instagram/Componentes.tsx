import React from 'react';
import {Img, interpolate} from 'remotion';
import {Dedo} from '../reels-avatar/Icones';
import {clamp, COR, MONT, Pilula, prog, saida, suave, useMola} from './tema';

// Peças de motion reaproveitadas pelas 4 cenas.

export type Marca = {x: number; y: number; w: number; h: number; de: number; cor?: string};

// Celular com um print do painel (1170 px de largura). `y` é a rolagem em px do print; `foco` + `zoom`
// aproximam um ponto do print; `marcas` são marca-textos que se desenham da esquerda para a direita.
export const Celular: React.FC<{
  t: number;
  src: string;
  y: number;
  largura?: number;
  zoom?: number;
  foco?: [number, number];
  marcas?: Marca[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({t, src, y, largura = 560, zoom = 1, foco = [585, 0], marcas = [], style, children}) => {
  const borda = largura * 0.032;
  const dentroL = largura - 2 * borda;
  const altura = largura * 2.04;
  const k = dentroL / 1170;
  return (
    <div style={{position: 'absolute', width: largura, height: altura, borderRadius: largura * 0.14, padding: borda, boxSizing: 'border-box', background: '#05070F', boxShadow: '0 50px 120px rgba(0,0,0,.65), 0 0 0 3px rgba(255,255,255,.18), 0 0 80px rgba(47,123,255,.25)', ...style}}>
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: largura * 0.115, overflow: 'hidden', background: '#0B1226'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: dentroL, transformOrigin: `${foco[0] * k}px ${(foco[1] - y) * k}px`, scale: String(zoom)}}>
          <div style={{position: 'absolute', left: 0, top: -y * k, width: dentroL}}>
            <Img src={src} style={{width: dentroL, display: 'block'}} />
            {marcas.map((m, i) => {
              const p = prog(t, m.de, 0.4, saida);
              if (p <= 0) return null;
              const cor = m.cor ?? COR.ciano;
              return (
                <div key={i} style={{position: 'absolute', left: m.x * k, top: m.y * k, width: m.w * k * p, height: m.h * k, borderRadius: 10 * k, background: `${cor}40`, boxShadow: `0 0 0 ${4 * k}px ${cor}, 0 0 ${40 * k}px ${cor}`}} />
              );
            })}
          </div>
        </div>
        {children}
        {/* Ilha do topo */}
        <div style={{position: 'absolute', left: '50%', top: largura * 0.025, translate: '-50% 0px', width: largura * 0.28, height: largura * 0.06, borderRadius: 99, background: '#000'}} />
      </div>
    </div>
  );
};

// Texto que entra palavra por palavra no ritmo da fala.
export type Peca = {texto: string; s: number; cor?: string; brilho?: boolean};
export const Palavras: React.FC<{t: number; pecas: Peca[]; tamanho: number; style?: React.CSSProperties}> = ({t, pecas, tamanho, style}) => {
  const mola = useMola();
  return (
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: tamanho, lineHeight: 1.04, ...style}}>
      {pecas.map((p, i) => {
        const m = mola(t, p.s, 12, 220);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block', margin: `0 ${tamanho * 0.12}px`, color: p.cor ?? COR.branco, opacity: m,
              scale: String(0.6 + 0.4 * m), translate: `0px ${(1 - m) * 40}px`,
              textShadow: p.brilho ? `0 0 40px ${p.cor ?? COR.ciano}88` : '0 6px 30px rgba(0,0,0,.5)',
            }}
          >
            {p.texto}
          </span>
        );
      })}
    </div>
  );
};

// Selo que entra grande, gira um pouco e assenta (carimbo).
export const Selo: React.FC<{t: number; de: number; cor: string; tamanho?: number; rot?: number; fundo?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({
  t, de, cor, tamanho = 56, rot = -6, fundo, children, style,
}) => {
  const mola = useMola();
  const s = mola(t, de, 10, 230);
  if (s <= 0) return null;
  return (
    <div style={{position: 'absolute', rotate: `${rot + (1 - s) * 12}deg`, scale: String(interpolate(s, [0, 1], [2, 1])), opacity: Math.min(1, s * 1.5), ...style}}>
      <Pilula cor={cor} tamanho={tamanho} fundo={fundo ?? 'rgba(8,16,40,.94)'} style={{border: `5px solid ${cor}`}}>
        {children}
      </Pilula>
    </div>
  );
};

// Risco que atravessa um texto (cor vermelha por padrão).
export const Risco: React.FC<{t: number; de: number; cor?: string; espessura?: number}> = ({t, de, cor = COR.vermelho, espessura = 12}) => {
  const p = prog(t, de, 0.25, saida);
  return <div style={{position: 'absolute', left: -10, top: '52%', height: espessura, width: `calc(${p * 100}% + ${20 * p}px)`, borderRadius: 99, background: cor, rotate: '-4deg', boxShadow: `0 0 20px ${cor}`}} />;
};

// Dedo que vem de baixo, toca em `toque` e sai.
export const Toque: React.FC<{t: number; de: number; toque: number; x: number; y: number; tamanho?: number}> = ({t, de, toque, x, y, tamanho = 150}) => {
  const o = interpolate(t, [de, de + 0.12, toque + 0.4, toque + 0.6], [0, 1, 1, 0], clamp);
  if (o <= 0) return null;
  const yy = interpolate(t, [de, toque], [y + 380, y], {...clamp, easing: saida});
  const aperta = interpolate(t, [toque, toque + 0.08, toque + 0.18], [1, 0.88, 1], clamp);
  return <Dedo tamanho={tamanho} style={{position: 'absolute', left: x, top: yy, opacity: o, scale: String(aperta)}} />;
};

// Onda do toque (círculo que expande).
export const Onda: React.FC<{t: number; de: number; cor?: string; tamanho?: number}> = ({t, de, cor = COR.azul, tamanho = 900}) => {
  const p = prog(t, de, 0.5, saida);
  if (p <= 0 || p >= 1) return null;
  return <div style={{position: 'absolute', left: '50%', top: '50%', width: tamanho, height: tamanho, borderRadius: 999, translate: '-50% -50%', scale: String(p), opacity: 0.35 * (1 - p), background: cor}} />;
};

// Valor animado de a até b entre dois tempos.
export const contar = (t: number, de: number, ate: number, a: number, b: number) => Math.round(interpolate(t, [de, ate], [a, b], {...clamp, easing: suave}));
