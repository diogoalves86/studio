import React from 'react';
import {AbsoluteFill, interpolateColors} from 'remotion';
import {Fundo} from './Fundo';
import {Check, Olho, Xis} from './Icones';
import {M} from './marcas';
import {ARQ, COR, INTER, MONT, Pilula, prog, saida, T, useMola, useT} from './tema';

// Trecho 3 (a diferença): abre em motion com os dois exemplos lado a lado, o avatar entra em "No segundo exemplo",
// vira card em "a pessoa já tem um motivo…" e volta à tela cheia em "para chamar a atenção, não".

const Mini: React.FC<{tipo: 'ruim' | 'bom'; m: number}> = ({tipo, m}) => {
  const ruim = tipo === 'ruim';
  const cor = ruim ? COR.vermelho : COR.verde;
  return (
    <div
      style={{
        width: 450, height: 560, borderRadius: 36, padding: 34, boxSizing: 'border-box', position: 'relative',
        background: 'linear-gradient(180deg, rgba(25,42,92,.97), rgba(16,28,64,.97))', border: `3px solid ${cor}88`,
        boxShadow: '0 30px 70px rgba(0,0,0,.5)', opacity: m, translate: `0px ${(1 - m) * 300}px`, rotate: `${(ruim ? -3 : 3) * m}deg`,
      }}
    >
      <Pilula cor={cor} tamanho={28}>
        {ruim ? <Xis tamanho={30} cor={cor} /> : <Check tamanho={30} cor={cor} />}
        {ruim ? 'COMUM' : 'CERTO'}
      </Pilula>
      <div style={{marginTop: 30, fontFamily: MONT, fontWeight: 800, fontSize: 40, lineHeight: 1.22, color: COR.branco}}>
        {ruim ? '“Oi pessoal, tudo bem? Hoje eu vim trazer…”' : '“Você está cometendo esse erro no Instagram…”'}
      </div>
      <div style={{position: 'absolute', left: 34, right: 34, bottom: 34}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: cor, marginBottom: 12}}>
          <Olho tamanho={40} cor={cor} />
          {ruim ? '23%' : '87%'}
        </div>
        <div style={{height: 20, borderRadius: 10, background: 'rgba(255,255,255,.12)'}}>
          <div style={{width: ruim ? '23%' : '87%', height: '100%', borderRadius: 10, background: cor, boxShadow: `0 0 20px ${cor}`}} />
        </div>
      </div>
    </div>
  );
};

const Abertura: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const sai = prog(t, M.no - 0.22, 0.3, saida);
  const l1 = mola(t, M.percebe, 12, 220);
  const l2 = mola(t, M.diferenca, 12, 220);
  if (t > M.no + 0.1) return null;
  return (
    <AbsoluteFill style={{opacity: 1 - sai, scale: String(1 + 0.25 * sai), filter: `blur(${16 * sai}px)`}}>
      <Fundo src={ARQ.apoioB} />
      <div style={{position: 'absolute', top: 290, left: 0, right: 0, textAlign: 'center', fontFamily: MONT, fontWeight: 900, lineHeight: 1.04}}>
        <div style={{fontSize: 112, color: COR.branco, opacity: l1, scale: String(0.7 + 0.3 * l1)}}>PERCEBE A</div>
        <div style={{fontSize: 140, color: COR.ciano, opacity: l2, scale: String(0.7 + 0.3 * l2), textShadow: '0 0 40px rgba(62,198,255,.5)'}}>DIFERENÇA?</div>
      </div>
      <div style={{position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40}}>
        <Mini tipo="ruim" m={mola(t, M.percebe + 0.1, 14, 170)} />
        <Mini tipo="bom" m={mola(t, M.percebe + 0.3, 14, 170)} />
      </div>
    </AbsoluteFill>
  );
};

// Conteúdo ao lado do card do avatar: em cima o título, à esquerda o detalhe.
const LadoDoCard: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const ini = M.aPessoa - 0.32;
  const fim = M.paraChamar - 0.2;
  if (t < ini || t > fim + 0.3) return null;
  const saiTudo = prog(t, fim, 0.3, saida);
  // Parte A: "um motivo pra continuar assistindo"
  const a1 = mola(t, M.motivo, 12, 210);
  const a2 = mola(t, M.continuar);
  const ret = prog(t, M.motivo, 1.2, saida) * 87;
  const troca = prog(t, M.naoPrecisa - 0.18, 0.25, saida);
  // Parte B: "não precisa inventar uma frase absurda"
  const b1 = mola(t, M.naoPrecisa, 12, 210);
  const b2 = mola(t, M.inventar, 12, 210);
  const b3 = mola(t, M.frase, 9, 240);
  const balanca = Math.sin(Math.max(0, t - M.absurda) * 16) * 6 * (1 - prog(t, M.absurda, 0.7));
  const corRet = interpolateColors(ret, [0, 50, 87], [COR.vermelho, '#FFB547', COR.verde]);

  return (
    <AbsoluteFill style={{opacity: 1 - saiTudo, fontFamily: MONT}}>
      {t < M.naoPrecisa + 0.1 && (
        <AbsoluteFill style={{opacity: 1 - troca, filter: `blur(${12 * troca}px)`}}>
          <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontWeight: 900, lineHeight: 1.05}}>
            <div style={{fontSize: 120, color: COR.verde, opacity: a1, scale: String(0.6 + 0.4 * a1), textShadow: '0 0 40px rgba(46,229,157,.45)'}}>
              UM MOTIVO
            </div>
            <div style={{fontSize: 72, color: COR.branco, opacity: a2, translate: `0px ${(1 - a2) * 30}px`}}>PRA CONTINUAR</div>
          </div>
          <div style={{position: 'absolute', left: 64, top: 820, width: 500, opacity: a1, translate: `${(1 - a1) * -60}px 0px`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: INTER, fontWeight: 700, fontSize: 34, letterSpacing: 3, color: COR.cinza}}>
              <Olho tamanho={46} cor={COR.ciano} />
              RETENÇÃO
            </div>
            <div style={{fontWeight: 900, fontSize: 150, color: corRet, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1}}>{Math.round(ret)}%</div>
            <div style={{height: 28, borderRadius: 14, background: 'rgba(255,255,255,.12)'}}>
              <div style={{width: `${ret}%`, height: '100%', borderRadius: 14, background: corRet, boxShadow: `0 0 24px ${corRet}`}} />
            </div>
          </div>
        </AbsoluteFill>
      )}
      {t >= M.naoPrecisa - 0.05 && (
        <AbsoluteFill>
          <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontWeight: 900, lineHeight: 1.05}}>
            <div style={{fontSize: 120, color: COR.branco, opacity: b1, scale: String(0.6 + 0.4 * b1)}}>NÃO PRECISA</div>
            <div style={{fontSize: 110, color: COR.vermelho, opacity: b2, scale: String(0.6 + 0.4 * b2), textShadow: '0 0 36px rgba(255,77,94,.5)'}}>INVENTAR</div>
          </div>
          <div style={{position: 'absolute', left: 64, top: 900, opacity: b3, scale: String(0.6 + 0.4 * b3), rotate: `${-4 + balanca}deg`, transformOrigin: 'left center'}}>
            <Pilula cor={COR.vermelho} tamanho={50} fundo="rgba(60,10,20,.92)">FRASE ABSURDA ?!</Pilula>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// De volta à tela cheia: a etiqueta "frase absurda" fica na faixa de baixo e leva o risco em "não".
const FAIXA: React.CSSProperties = {position: 'absolute', left: 0, right: 0, top: 1372, display: 'flex', justifyContent: 'center'};

const Risco: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const a = mola(t, M.paraChamar, 14, 190);
  const risco = prog(t, M.naoFinal, 0.25);
  if (t < M.paraChamar) return null;
  return (
    <div style={FAIXA}>
      <div style={{position: 'relative', opacity: a * (1 - 0.45 * risco), translate: `0px ${(1 - a) * 40}px`}}>
        <Pilula cor={COR.vermelho} tamanho={40} fundo="rgba(48,10,20,.85)">FRASE ABSURDA ?!</Pilula>
        <div
          style={{
            position: 'absolute', left: -14, top: '50%', height: 10, borderRadius: 5, background: COR.vermelho,
            width: risco > 0 ? `calc(${risco * 100}% + ${risco * 28}px)` : 0, rotate: '-4deg', boxShadow: '0 0 18px rgba(255,77,94,.8)',
          }}
        />
      </div>
    </div>
  );
};

export const CenaDiferenca: React.FC = () => {
  const t = useT(T.diferenca);
  return (
    <AbsoluteFill>
      <LadoDoCard t={t} />
      <Risco t={t} />
      <Abertura t={t} />
    </AbsoluteFill>
  );
};
