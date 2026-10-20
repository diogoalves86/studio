import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Risco, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 016 · Faz a conta.
// Gancho (500 visualizações > 2 mil?) → o que mais pesa, segundo o Mosseri, e não é o número solto → dica 1: abrir
// "Ver insights" e achar os 4 números → dica 2: a conta (curtidas ÷ contas alcançadas) → exemplo da Ana: bolo × brigadeiro,
// 5% × 20% e 40 compartilhamentos → compara com os seus próprios posts → CTA seguir.

const T = TRECHOS;
const M = {
  quinhentos1: em('500'),
  melhor: em('melhor'),
  dois1: em('2'),
  parece1: em('parece'),
  mentira: em('mentira'),
  chefe: em('chefe'),
  adam: em('adam'),
  tempo1: em('tempo'),
  curtidas1: em('curtidas'),
  envios: em('envios'),
  mas1: em('mas'),
  solto: em('solto'),
  compara1: em('compara'),
  viram: em('viram'),
  entao1: em('então'),
  primeira: em('primeira'),
  abre: em('abre'),
  toca1: em('toca'),
  ver: em('ver'),
  ali: em('ali'),
  contas1: em('contas'),
  curtidas2: em('curtidas', em('contas')),
  compartilhamentos1: em('compartilhamentos'),
  tempo2: em('tempo', em('compartilhamentos')),
  segunda: em('segunda'),
  conta: em('conta'),
  curtidas3: em('curtidas', em('conta')),
  imagina: em('imagina'),
  ana1: em('ana'),
  chocolate: em('chocolate'),
  duas: em('duas'),
  cem1: em('cem'),
  brigadeiro1: em('brigadeiro'),
  quinhentas: em('quinhentas'),
  cem2: em('cem', em('quinhentas')),
  parece2: em('parece', em('quinhentas')),
  empate: em('empate'),
  cinco: em('cinco'),
  vinte: em('vinte'),
  quarenta: em('quarenta'),
  agradou: em('agradou'),
  brigadeiro3: em('brigadeiro', em('agradou')),
  entao3: em('então', em('agradou')),
  receita2: em('receita', em('agradou')),
  compara2: em('compara', em('receita', em('agradou'))),
  proprios: em('próprios'),
  outros: em('outros'),
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

const Chip: React.FC<{icone: string; valor: string; cor?: string; tamanho?: number; style?: React.CSSProperties}> = ({icone, valor, cor = COR.branco, tamanho = 44, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: tamanho * 0.3, padding: `${tamanho * 0.25}px ${tamanho * 0.5}px`, borderRadius: 999, background: 'rgba(8,16,44,.92)', border: '3px solid rgba(62,198,255,.35)', fontFamily: MONT, fontWeight: 900, fontSize: tamanho, color: cor, boxShadow: '0 12px 40px rgba(0,0,0,.4)', ...style}}>
    <span>{icone}</span>
    <span>{valor}</span>
  </div>
);

// ---------- Abertura: 500 > 2.000? ----------

const Contadores: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio) return null;
  const sai = prog(t, M.parece1 - 0.15, 0.25);
  const a = mola(t, M.quinhentos1, 11, 210);
  const b = mola(t, M.dois1, 11, 210);
  const maior = mola(t, M.melhor, 10, 230);
  const pisca = maior > 0.5 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 9)) : 0;
  if (sai >= 1) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, opacity: 1 - sai}}>
      <div style={{opacity: a, scale: String(0.6 + 0.4 * a)}}><Chip icone="👁" valor="500" cor={COR.verde} tamanho={58} /></div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 90, color: COR.amarelo, opacity: maior * pisca, scale: String(interpolate(maior, [0, 1], [2, 1])), textShadow: `0 0 30px ${COR.amarelo}`}}>&gt;</div>
      <div style={{opacity: b, scale: String(0.6 + 0.4 * b)}}><Chip icone="👁" valor="2.000" tamanho={58} /></div>
    </div>
  );
};

const Mentira: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.parece1 - 0.05 || t >= T.meio) return null;
  const e = mola(t, M.parece1, 10, 230);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${-5 + (1 - e) * 10}deg`}}>
      <Pilula cor={COR.amarelo} tamanho={56} fundo="rgba(40,30,5,.92)">🤯 PARECE MENTIRA?</Pilula>
    </div>
  );
};

// ---------- O que mais pesa (Mosseri) ----------

const SINAIS = [
  {icone: '⏱', nome: 'TEMPO ASSISTIDO', s: 'tempo1'},
  {icone: '❤️', nome: 'CURTIDAS', s: 'curtidas1'},
  {icone: '↗️', nome: 'ENVIOS', s: 'envios'},
] as const;

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.mas1 - 0.15);
  if (!st) return null;
  const card = mola(t, M.chefe - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 470, display: 'flex', alignItems: 'center', gap: 26, padding: 22, borderRadius: 30, ...caixa, opacity: card, translate: `0px ${(1 - card) * 40}px`}}>
        <Img src={ARQ.mosseri} style={{width: 150, height: 150, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', border: `4px solid ${COR.ciano}`}} />
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>Adam Mosseri</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.ciano}}>chefe do Instagram</div>
          <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 500, fontSize: 18, color: COR.cinza}}>Foto: Anthony Quintano · CC BY 2.0</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 760, display: 'flex', justifyContent: 'center', gap: 26}}>
        {SINAIS.map((s) => {
          const e = mola(t, M[s.s] - 0.05, 11, 220);
          return (
            <div key={s.nome} style={{width: 270, padding: '28px 10px', borderRadius: 30, ...caixa, border: `4px solid ${e > 0.5 ? COR.ciano : 'rgba(62,198,255,.2)'}`, boxShadow: e > 0.5 ? `0 0 50px rgba(62,198,255,${0.45 * e})` : caixa.boxShadow, textAlign: 'center', opacity: 0.35 + 0.65 * e, scale: String(0.85 + 0.15 * e)}}>
              <div style={{fontSize: 80}}>{s.icone}</div>
              <div style={{marginTop: 10, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.branco, lineHeight: 1.1}}>{s.nome}</div>
            </div>
          );
        })}
      </div>
      <Fonte t={t} de={M.chefe} ate={M.entao1} veiculo="Social Media Today" titulo="Instagram revela os sinais que mais pesam (2025)" />
    </AbsoluteFill>
  );
};

const NumeroSolto: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.mas1 - 0.15, M.entao1 - 0.15);
  if (!st) return null;
  const solto = mola(t, M.mas1, 11, 210);
  const interroga = mola(t, M.solto, 10, 230) * (1 - prog(t, M.compara1, 0.25));
  const fracao = prog(t, M.compara1, 0.45, saida);
  const viram = mola(t, M.viram - 0.1, 11, 220);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <Titulo t={t} de={M.mas1} top={470} tamanho={58}>NÃO É O <span style={{color: COR.vermelho}}>NÚMERO SOLTO</span></Titulo>
      <div style={{position: 'absolute', top: 690, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: solto, scale: String(0.7 + 0.3 * solto)}}>
        <div style={{position: 'relative'}}>
          <Chip icone="❤️" valor="100" tamanho={110} />
          {interroga > 0.01 && <div style={{position: 'absolute', right: -70, top: -60, fontFamily: MONT, fontWeight: 900, fontSize: 140, color: COR.amarelo, opacity: interroga, rotate: '12deg'}}>?</div>}
        </div>
        <div style={{width: 520 * fracao, height: 10, borderRadius: 99, background: COR.branco, margin: '28px 0', opacity: fracao}} />
        <div style={{opacity: viram, translate: `0px ${(1 - viram) * 30}px`}}>
          <Chip icone="👥" valor="QUEM VIU" cor={COR.ciano} tamanho={84} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Dica 1: Ver insights ----------

const NUMEROS = [
  {icone: '👥', nome: 'Contas alcançadas', valor: '2.000', s: 'contas1'},
  {icone: '❤️', nome: 'Curtidas', valor: '100', s: 'curtidas2'},
  {icone: '↗️', nome: 'Compartilhamentos', valor: '10', s: 'compartilhamentos1'},
  {icone: '⏱', nome: 'Tempo médio de visualização', valor: '4,2 s', s: 'tempo2'},
] as const;

// Tela do app recriada, sem marca: o Reels com o botão "Ver insights" e, depois do toque, o painel com os 4 números.
const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.entao1 - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const tela = mola(t, M.abre - 0.1, 12, 200);
  const painel = prog(t, M.ver + 0.25, 0.4, saida);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <div style={{position: 'absolute', left: 190, top: 560, width: 700, height: 680, borderRadius: 48, border: '10px solid #1B2238', background: '#0B1122', overflow: 'hidden', opacity: tela, scale: String(0.85 + 0.15 * tela), boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
        {/* Reels (antes do toque) */}
        <div style={{position: 'absolute', inset: 0, opacity: 1 - painel}}>
          <div style={{height: 470, background: 'linear-gradient(165deg, #FF9A62, #C2457A 55%, #4B2A7A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 150}}>🍰</div>
          <div style={{margin: '34px 40px', padding: '24px 0', borderRadius: 22, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 40, color: COR.branco, background: t >= M.ver ? COR.azul : 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.25)'}}>Ver insights</div>
        </div>
        {/* Painel de insights */}
        {painel > 0.01 && (
          <div style={{position: 'absolute', inset: 0, padding: '36px 40px', opacity: painel, translate: `0px ${(1 - painel) * 60}px`}}>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco, marginBottom: 22}}>Insights do Reels</div>
            {NUMEROS.map((n) => {
              const on = mola(t, M[n.s] - 0.05, 11, 220);
              return (
                <div key={n.nome} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 18px', marginBottom: 14, borderRadius: 20, background: on > 0.5 ? 'rgba(62,198,255,.16)' : 'rgba(255,255,255,.05)', border: `3px solid ${on > 0.5 ? COR.ciano : 'transparent'}`, opacity: 0.4 + 0.6 * on}}>
                  <span style={{fontSize: 40}}>{n.icone}</span>
                  <span style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.branco}}>{n.nome}</span>
                  <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: on > 0.5 ? COR.ciano : COR.cinza}}>{n.valor}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Toque t={t} de={M.toca1 - 0.3} toque={M.ver} x={470} y={1120} />
    </AbsoluteFill>
  );
};

// ---------- Dica 2: a conta ----------

const Formula: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, M.imagina - 0.15);
  if (!st) return null;
  const cima = mola(t, M.curtidas3, 11, 210);
  const traco = prog(t, M.curtidas3 + 0.4, 0.35, saida);
  const baixo = mola(t, M.curtidas3 + 0.9, 11, 210);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Titulo t={t} de={M.conta - 0.2} top={560} tamanho={70}>FAZ A <span style={{color: COR.ciano}}>CONTA</span></Titulo>
      <div style={{position: 'absolute', top: 720, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{opacity: cima, scale: String(0.7 + 0.3 * cima)}}><Chip icone="❤️" valor="CURTIDAS" tamanho={72} /></div>
        <div style={{width: 640 * traco, height: 10, borderRadius: 99, background: COR.branco, margin: '26px 0'}} />
        <div style={{opacity: baixo, scale: String(0.7 + 0.3 * baixo)}}><Chip icone="👥" valor="CONTAS ALCANÇADAS" cor={COR.ciano} tamanho={60} /></div>
        <div style={{marginTop: 40, fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.cinza, opacity: baixo}}>(e o mesmo com os compartilhamentos)</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Exemplo: a Ana (bolo × brigadeiro) ----------

const Reel: React.FC<{t: number; emoji: string; nome: string; entra: number; alcance: string; deAlcance: number; deCem: number; pct: string; dePct: number; vence?: boolean; style?: React.CSSProperties}> = ({t, emoji, nome, entra, alcance, deAlcance, deCem, pct, dePct, vence, style}) => {
  const mola = useMola();
  const e = mola(t, entra, 12, 200);
  if (e <= 0.01) return null;
  const a = mola(t, deAlcance, 11, 220);
  const c = mola(t, deCem, 11, 220);
  const p = mola(t, dePct, 10, 230);
  const coroa = vence ? mola(t, M.agradou, 10, 220) : 0;
  return (
    <div style={{position: 'absolute', width: 400, padding: 22, borderRadius: 36, ...caixa, border: `4px solid ${vence && p > 0.5 ? COR.verde : 'rgba(62,198,255,.3)'}`, boxShadow: vence && p > 0.5 ? '0 0 60px rgba(46,229,157,.45)' : caixa.boxShadow, opacity: e, translate: `0px ${(1 - e) * 60}px`, ...style}}>
      {coroa > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: -110, textAlign: 'center', fontSize: 110, opacity: coroa, scale: String(interpolate(coroa, [0, 1], [2, 1]))}}>👑</div>}
      <div style={{height: 160, borderRadius: 24, background: 'linear-gradient(165deg, #6B3A2E, #2B1A14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96}}>{emoji}</div>
      <div style={{marginTop: 14, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco, textAlign: 'center'}}>{nome}</div>
      <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
        <div style={{opacity: a}}><Chip icone="👥" valor={alcance} tamanho={36} /></div>
        <div style={{opacity: c}}><Chip icone="❤️" valor="100" tamanho={36} /></div>
        {p > 0.01 && <div style={{opacity: p, scale: String(interpolate(p, [0, 1], [1.8, 1]))}}><Chip icone="=" valor={pct} cor={vence ? COR.verde : COR.vermelho} tamanho={52} /></div>}
      </div>
    </div>
  );
};

const Ana: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.imagina - 0.15, M.compara2 - 0.15);
  if (!st) return null;
  const perfil = mola(t, M.imagina, 12, 200);
  const balanca = mola(t, M.empate - 0.1, 11, 210) * (1 - prog(t, M.cinco - 0.1, 0.3));
  const envios = mola(t, M.quarenta, 10, 230);
  const postit = mola(t, M.receita2 - 0.1, 10, 220);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: perfil, translate: `0px ${(1 - perfil) * -30}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '12px 28px 12px 12px', borderRadius: 999, background: 'rgba(8,16,44,.94)', border: '3px solid rgba(255,255,255,.2)'}}>
          <div style={{width: 74, height: 74, borderRadius: 99, background: '#6B3A5A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42}}>👩🏾‍🍳</div>
          <div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco}}>Doces da Ana</div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 22, color: COR.amarelo}}>exemplo</div>
          </div>
        </div>
      </div>
      <Reel t={t} emoji="🍫" nome="BOLO DE CHOCOLATE" entra={M.chocolate - 0.2} alcance="2.000" deAlcance={M.duas} deCem={M.cem1} pct="5%" dePct={M.cinco} style={{left: 90, top: 600}} />
      <Reel t={t} emoji="🍬" nome="RECEITA DE BRIGADEIRO" entra={M.brigadeiro1 - 0.2} alcance="500" deAlcance={M.quinhentas} deCem={M.cem2} pct="20%" dePct={M.vinte} vence style={{left: 590, top: 600}} />
      {balanca > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1190, display: 'flex', justifyContent: 'center', opacity: balanca}}>
          <Pilula cor={COR.amarelo} tamanho={46} fundo="rgba(40,30,5,.92)">⚖️ 100 = 100 · EMPATE?</Pilula>
        </div>
      )}
      {envios > 0.01 && (
        <div style={{position: 'absolute', left: 580, top: 1190, opacity: envios, scale: String(interpolate(envios, [0, 1], [1.8, 1])), rotate: '-4deg'}}>
          <Pilula cor={COR.verde} tamanho={40} fundo="rgba(8,40,30,.94)">↗️ 40 · 4× MAIS</Pilula>
        </div>
      )}
      {postit > 0.01 && (
        <div style={{position: 'absolute', left: 90, top: 1180, padding: '14px 22px', background: '#FFE27A', borderRadius: 6, boxShadow: '0 20px 50px rgba(0,0,0,.5)', rotate: `${-5 + (1 - postit) * -10}deg`, opacity: postit, scale: String(0.7 + 0.3 * postit)}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: '#3A2A00'}}>PRÓXIMO VÍDEO:</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: '#1A1300'}}>RECEITA ✓</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Compara com você mesmo ----------

const PONTOS = [0.32, 0.28, 0.4, 0.37, 0.52, 0.6, 0.72];

const VoceXVoce: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.compara2 - 0.15, T.b - 0.1);
  if (!st) return null;
  const linha = prog(t, M.compara2, 1.6, saida);
  const selo = mola(t, M.proprios, 10, 230);
  const outros = mola(t, M.outros - 0.1, 11, 210);
  const W = 760, H = 380;
  const pts = PONTOS.map((y, i) => `${(i / (PONTOS.length - 1)) * W},${H - y * H}`).join(' ');
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.compara2} top={440} tamanho={56}>COMPARA COM <span style={{color: COR.ciano}}>VOCÊ MESMO</span></Titulo>
      <div style={{position: 'absolute', left: 120, top: 600, width: W, height: H + 80, padding: 0}}>
        <svg width={W} height={H} style={{overflow: 'visible'}}>
          <polyline points={pts} fill="none" stroke={COR.ciano} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - linha} style={{filter: `drop-shadow(0 0 12px ${COR.ciano})`}} />
          {PONTOS.map((y, i) => (i / (PONTOS.length - 1) <= linha ? <circle key={i} cx={(i / (PONTOS.length - 1)) * W} cy={H - y * H} r={14} fill={i === PONTOS.length - 1 ? COR.verde : COR.branco} /> : null))}
        </svg>
        <div style={{marginTop: 20, fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza, textAlign: 'center'}}>seus últimos posts (curtidas ÷ alcance)</div>
      </div>
      {selo > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1110, display: 'flex', justifyContent: 'center', opacity: selo, scale: String(interpolate(selo, [0, 1], [1.8, 1])), rotate: '-4deg'}}>
          <Pilula cor={COR.verde} tamanho={50} fundo="rgba(8,40,30,.94)">VOCÊ × VOCÊ ✓</Pilula>
        </div>
      )}
      {outros > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1230, display: 'flex', justifyContent: 'center', opacity: outros}}>
          <div style={{position: 'relative', fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.cinza}}>
            VOCÊ × OS OUTROS
            <Risco t={t} de={M.outros + 0.1} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Fechamento: seguir (mesmo CTA e mesmo clipe do 015) ----------

// CTA: a Luísa volta em tela cheia depois do congelamento em «segue» e sai antes do de «toda» (mesmo clipe do 015).
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco}}>Social Media Today · Adam Mosseri, jan/2025</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>A Ana e os números são um exemplo.</div>
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
      <Contadores t={t} />
      <Mentira t={t} />
      <Mosseri t={t} />
      <NumeroSolto t={t} />
      <Dica1 t={t} />
      <Formula t={t} />
      <Ana t={t} />
      <VoceXVoce t={t} />
      <CardVoz t={t} />
      <CartaoFonte t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'pop', em: M.quinhentos1, volume: 0.45},
  {som: 'pop', em: M.dois1, volume: 0.45},
  {som: 'impacto', em: M.melhor, volume: 0.45},
  {som: 'impacto', em: M.parece1, volume: 0.5},
  // Mosseri
  {som: 'ding', em: M.chefe, volume: 0.45},
  {som: 'pop', em: M.tempo1, volume: 0.4},
  {som: 'pop', em: M.curtidas1, volume: 0.4},
  {som: 'pop', em: M.envios, volume: 0.4},
  // Número solto
  {som: 'whoosh_in', em: M.mas1 - 0.2, volume: 0.4},
  {som: 'risco', em: M.solto, volume: 0.4},
  {som: 'swoosh', em: M.compara1, volume: 0.4},
  {som: 'ding', em: M.viram, volume: 0.45},
  // Dica 1
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'whoosh_in', em: M.abre - 0.2, volume: 0.4},
  {som: 'toque', em: M.ver, volume: 0.65},
  {som: 'swoosh', em: M.ver + 0.25, volume: 0.4},
  {som: 'pop', em: M.contas1, volume: 0.35},
  {som: 'pop', em: M.curtidas2, volume: 0.35},
  {som: 'pop', em: M.compartilhamentos1, volume: 0.35},
  {som: 'pop', em: M.tempo2, volume: 0.35},
  // Dica 2
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.curtidas3, volume: 0.4},
  {som: 'risco', em: M.curtidas3 + 0.4, volume: 0.35},
  {som: 'pop', em: M.curtidas3 + 0.9, volume: 0.4},
  // Ana
  {som: 'pop', em: M.imagina, volume: 0.4},
  {som: 'whoosh_in', em: M.chocolate - 0.3, volume: 0.4},
  {som: 'pop', em: M.duas, volume: 0.35},
  {som: 'pop', em: M.cem1, volume: 0.35},
  {som: 'whoosh_in', em: M.brigadeiro1 - 0.3, volume: 0.4},
  {som: 'pop', em: M.quinhentas, volume: 0.35},
  {som: 'pop', em: M.cem2, volume: 0.35},
  {som: 'tique', em: M.empate, volume: 0.4},
  {som: 'impacto', em: M.cinco, volume: 0.45},
  {som: 'impacto', em: M.vinte, volume: 0.5},
  {som: 'ding', em: M.quarenta, volume: 0.5},
  {som: 'ding', em: M.agradou, volume: 0.45},
  {som: 'pop', em: M.receita2 - 0.1, volume: 0.45},
  // Você × você
  {som: 'swoosh', em: M.compara2, volume: 0.4},
  {som: 'ding', em: M.proprios, volume: 0.45},
  {som: 'risco', em: M.outros + 0.1, volume: 0.4},
  // CTA
  {som: 'pop', em: T.b + 0.1, volume: 0.4},
  {som: 'swoosh', em: B1, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: B2, volume: 0.5},
];

// Legenda: "2" "mil." → "2 MIL."; "500" fica em número.
const LEGENDA = PALAVRAS;

// Alternância da Luísa na abertura (ajustada pelos momentos artificiais de sincronia.md).
const A1 = M.parece1;

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: A1, modo: 'cheia', escala: [1.12, 1.16], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [M.curtidas3, M.imagina],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {'solto.': COR.vermelho},
  eventos: EVENTOS,
  Cena,
};
