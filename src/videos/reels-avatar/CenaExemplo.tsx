import React from 'react';
import {AbsoluteFill, interpolate, interpolateColors} from 'remotion';
import {Dedo, Olho, Check, Xis} from './Icones';
import {M} from './marcas';
import {Palavra} from './palavras';
import {clamp, COR, falado, INTER, MONT, Pilula, prog, saida, T, useMola, useT} from './tema';

// Trecho 2: o exemplo. Não existe clipe do avatar aqui; a cena é toda animada.

const TEXTO_RUIM = falado(M.oi - 0.01, M.experimenta);
const TEXTO_BOM = falado(M.voce - 0.01, T.diferenca);
const MARCADAS: Record<string, [number, number]> = {esse: [M.esse, 0.18], erro: [M.erro, 0.22]};

const Texto: React.FC<{t: number; palavras: Palavra[]; marcar?: boolean}> = ({t, palavras, marcar}) => {
  const ditas = palavras.filter((p) => t >= p.s);
  const cursor = Math.floor(t * 2.4) % 2 === 0 || (ditas.length > 0 && ditas.length < palavras.length);
  return (
    <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 62, lineHeight: 1.22, color: COR.branco, letterSpacing: -0.5}}>
      {ditas.map((p, i) => {
        const marca = marcar ? MARCADAS[p.w] : undefined;
        const m = marca ? prog(t, marca[0], marca[1]) : 0;
        let w = p.w.replace(/^Instagram[.,]$/, 'Instagram…');
        if (i === 0) w = `“${w.charAt(0).toUpperCase()}${w.slice(1)}`;
        if (i === palavras.length - 1) w = `${w}”`;
        return (
          <span
            key={p.s}
            style={{
              display: 'inline', padding: marca ? '0 4px' : undefined,
              backgroundImage: marca ? 'linear-gradient(transparent 52%, rgba(62,198,255,.6) 52%, rgba(62,198,255,.6) 94%, transparent 94%)' : undefined,
              backgroundSize: `${m * 100}% 100%`, backgroundRepeat: 'no-repeat',
            }}
          >
            {w}{' '}
          </span>
        );
      })}
      <span style={{display: 'inline-block', width: 6, height: 58, marginLeft: 2, verticalAlign: '-8px', background: COR.ciano, opacity: cursor ? 1 : 0}} />
    </div>
  );
};

const Retencao: React.FC<{valor: number}> = ({valor}) => {
  const cor = interpolateColors(valor, [20, 55, 85], [COR.vermelho, '#FFB547', COR.verde]);
  return (
    <div style={{position: 'absolute', left: 50, right: 50, bottom: 46}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: INTER, fontWeight: 700, fontSize: 32, letterSpacing: 3, color: COR.cinza}}>
          <Olho tamanho={40} cor={valor > 60 ? COR.ciano : COR.cinza} />
          RETENÇÃO
        </div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: cor, fontVariantNumeric: 'tabular-nums'}}>{Math.round(valor)}%</div>
      </div>
      <div style={{height: 26, borderRadius: 13, background: 'rgba(255,255,255,.12)', overflow: 'hidden'}}>
        <div style={{width: `${valor}%`, height: '100%', borderRadius: 13, background: cor, boxShadow: `0 0 24px ${cor}`}} />
      </div>
    </div>
  );
};

const Cartao: React.FC<{tipo: 'ruim' | 'bom'; children: React.ReactNode; style: React.CSSProperties}> = ({tipo, children, style}) => (
  <div
    style={{
      position: 'absolute', left: 70, right: 70, top: 450, height: 800, borderRadius: 44,
      background: 'linear-gradient(180deg, rgba(25,42,92,.96), rgba(16,28,64,.96))',
      border: `3px solid ${tipo === 'ruim' ? 'rgba(255,77,94,.55)' : 'rgba(46,229,157,.55)'}`,
      boxShadow: '0 40px 90px rgba(0,0,0,.55)', padding: 50, boxSizing: 'border-box',
      ...style,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40}}>
      {tipo === 'ruim' ? (
        <Pilula cor={COR.vermelho} tamanho={36}><Xis tamanho={38} cor={COR.vermelho} />JEITO COMUM</Pilula>
      ) : (
        <Pilula cor={COR.verde} tamanho={36}><Check tamanho={38} cor={COR.verde} />JEITO CERTO</Pilula>
      )}
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 60, height: 60, borderRadius: 99, background: 'linear-gradient(135deg, #3EC6FF, #2F7BFF)'}} />
        <div>
          <div style={{width: 150, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.5)', marginBottom: 10}} />
          <div style={{width: 100, height: 12, borderRadius: 6, background: 'rgba(255,255,255,.25)'}} />
        </div>
      </div>
    </div>
    {children}
  </div>
);

export const CenaExemplo: React.FC = () => {
  const t = useT(T.exemplo);
  const mola = useMola();

  // Título "Olha só, esse exemplo" no centro; em 9,3 s sobe e vira o rótulo da cena.
  const sobe = prog(t, M.emVez - 0.25, 0.5);
  const l1 = mola(t, M.olha);
  const l2 = mola(t, M.esseExemplo);

  // Cartão 1: entra em "Em vez de", a retenção cai enquanto o "oi pessoal" é dito, e o polegar pula o vídeo.
  const fimRuim = M.instagram.e;
  const e1 = mola(t, M.emVez, 16, 160);
  const sai1 = prog(t, M.experimenta - 0.36, 0.34, saida);
  const ret1 = interpolate(t, [M.oi, fimRuim], [100, 23], clamp);
  const carimbo = mola(t, M.instagram.s + 0.05, 10, 240);
  const dedoY = interpolate(t, [fimRuim - 0.1, M.experimenta - 0.15], [1300, 640], {...clamp, easing: saida});
  const dedoO = interpolate(t, [fimRuim - 0.1, fimRuim, M.experimenta - 0.2, M.experimenta - 0.05], [0, 1, 1, 0], clamp);

  // Cartão 2: entra em "Experimenta"; texto em "Você"; marca-texto em "esse erro"; retenção sobe e trava em 87%.
  // A saída é o wipe azul da troca de cena.
  const e2 = mola(t, M.experimenta, 16, 160);
  const ret2 = interpolate(t, [M.voce, M.percebeu.e], [23, 87], clamp);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: interpolate(sobe, [0, 1], [690, 240]),
          textAlign: 'center', fontFamily: MONT, fontWeight: 900, lineHeight: 1.02,
          scale: String(interpolate(sobe, [0, 1], [1, 0.36])), transformOrigin: 'center top',
          opacity: 1 - prog(t, T.diferenca - 0.3, 0.3),
        }}
      >
        <div style={{fontSize: 150, color: COR.branco, opacity: l1, translate: `0px ${(1 - l1) * 60}px`}}>OLHA SÓ,</div>
        <div style={{fontSize: 150, color: COR.ciano, opacity: l2, translate: `0px ${(1 - l2) * 60}px`, textShadow: '0 0 40px rgba(62,198,255,.45)'}}>
          ESSE EXEMPLO
        </div>
      </div>

      {t >= M.emVez && t < M.experimenta && (
        <Cartao
          tipo="ruim"
          style={{
            opacity: e1, translate: `0px ${(1 - e1) * 700 - sai1 * 1700}px`,
            rotate: `${-7 * sai1}deg`,
          }}
        >
          <Texto t={t} palavras={TEXTO_RUIM} />
          <Retencao valor={ret1} />
          <div
            style={{
              position: 'absolute', left: '50%', top: 440, translate: '-50% 0px', rotate: '-10deg',
              scale: String(interpolate(carimbo, [0, 1], [2.2, 1])), opacity: carimbo,
              padding: '14px 40px', borderRadius: 18, border: `6px solid ${COR.vermelho}`, background: 'rgba(255,77,94,.16)',
              fontFamily: MONT, fontWeight: 900, fontSize: 84, color: COR.vermelho, letterSpacing: 4,
            }}
          >
            PULOU!
          </div>
        </Cartao>
      )}
      <Dedo tamanho={150} style={{position: 'absolute', left: 470, top: dedoY, opacity: dedoO}} />

      {t >= M.experimenta && (
        <Cartao
          tipo="bom"
          style={{
            opacity: e2, translate: `0px ${(1 - e2) * 900}px`,
          }}
        >
          <Texto t={t} palavras={TEXTO_BOM} marcar />
          <Retencao valor={ret2} />
        </Cartao>
      )}
    </AbsoluteFill>
  );
};
