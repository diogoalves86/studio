import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 023 · O Instagram está removendo seguidores de alguns perfis. Veja se o seu é um deles.
// Abertura (contador de seguidores despencando) → a regra 13+ para menores de 18 (Brasil, mar/2026) → o que é
// impróprio → o perfil some para o adolescente → abril/2026: adolescentes removidos da lista → onde ver (Status da
// conta → Disponibilidade para menores de 18 anos) → dica 1: apagar ou pedir análise → dica 2: público adulto → CTA.

const T = TRECHOS;
const M = {
  removendo: em('removendo'),
  seguidores1: em('seguidores'),
  seu1: em('seu'),
  um1: em('um'),
  marco: em('março'),
  menos: em('menos'),
  treze: em('13'),
  classificacao: em('classificação'),
  eSe: em('e', T.meio),
  bebida: em('bebida'),
  cigarro: em('cigarro'),
  sugestivo: em('sugestivo'),
  palavrao: em('palavrão'),
  ele: em('ele'),
  some: em('some'),
  seguir: em('seguir'),
  ver: em('ver', em('seguir')),
  eEm: em('e', em('posts')),
  abril: em('abril'),
  removidos: em('removidos'),
  paraVer: em('para', em('seguidores', em('removidos'))),
  abre: em('abre'),
  configuracoes: em('configurações'),
  status: em('status'),
  disponibilidade: em('disponibilidade'),
  seNao: em('se', em('anos', em('disponibilidade'))),
  apaga: em('apaga'),
  pede: em('pede'),
  agora: em('agora'),
  vende: em('vende'),
  adulto: em('adulto'),
  tudo: em('tudo'),
  adolescente2: em('adolescente', em('tudo')),
  maior: em('maior'),
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

const Carimbo: React.FC<{t: number; de: number; cor: string; tamanho?: number; rot?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, tamanho = 56, rot = -8, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 9, 260);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.4, 1])), rotate: `${rot + (1 - e) * 14}deg`, ...style}}>
      <div style={{padding: `${tamanho * 0.2}px ${tamanho * 0.5}px`, border: `${tamanho * 0.1}px solid ${cor}`, borderRadius: 14, fontFamily: MONT, fontWeight: 900, fontSize: tamanho, color: cor, background: 'rgba(10,10,20,.82)', letterSpacing: 2, whiteSpace: 'nowrap', boxShadow: `0 0 40px ${cor}66`}}>{children}</div>
    </div>
  );
};

// ---------- Peças desta história ----------

const fmt = (n: number) => Math.round(n).toLocaleString('pt-BR');

// Contador de seguidores do perfil de exemplo, caindo de `de` até `ate`.
const ContadorSeguidores: React.FC<{valor: number; destaque?: boolean; style?: React.CSSProperties}> = ({valor, destaque, style}) => (
  <div style={{position: 'absolute', textAlign: 'center', ...style}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 150, lineHeight: 1, color: destaque ? COR.vermelho : COR.branco, textShadow: destaque ? '0 0 50px rgba(255,77,94,.6)' : '0 10px 30px rgba(0,0,0,.5)'}}>{fmt(valor)}</div>
    <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 40, color: COR.cinza}}>seguidores</div>
  </div>
);

const AVATARES = ['🧑', '👩', '🧒', '👦', '👧', '🧑‍🦱', '👩‍🦰', '🧑‍🦰', '👱', '👨', '👩‍🦱', '🧔'];
// Quem tem menos de 18 na lista de exemplo (índices).
const TEENS = [2, 3, 4, 7, 10];

const ListaSeguidores: React.FC<{t: number; sai: number; style?: React.CSSProperties}> = ({t, sai, style}) => (
  <div style={{position: 'absolute', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, ...style}}>
    {AVATARES.map((a, i) => {
      const teen = TEENS.includes(i);
      const k = teen ? sai : 0;
      return (
        <div key={i} style={{position: 'relative', width: 150, height: 150, borderRadius: 99, background: 'rgba(30,42,80,.95)', border: `4px solid ${teen && k > 0.1 ? COR.vermelho : 'rgba(255,255,255,.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, opacity: 1 - 0.85 * k, scale: String(1 - 0.35 * k), translate: `0px ${k * 60}px`}}>
          {a}
          {teen && <div style={{position: 'absolute', right: -8, top: -10, padding: '2px 10px', borderRadius: 10, background: COR.amarelo, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: '#1A1020'}}>-18</div>}
        </div>
      );
    })}
  </div>
);

// ---------- Abertura: o contador de seguidores despencando ----------

const A0 = M.seguidores1 - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const cai = prog(t, 0.25, A0 - 0.35, saida);
  const tremor = Math.sin(t * 80) * 10 * prog(t, M.removendo - 0.04, 0.04) * (1 - prog(t, M.removendo + 0.02, 0.15));
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <ContadorSeguidores valor={1248 - 217 * cai} destaque={cai > 0.05} style={{left: 0, right: 0, top: 520}} />
      <ListaSeguidores t={t} sai={cai} style={{left: 150, top: 820}} />
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, M.removendo - 0.05, 0.05) * (1 - prog(t, M.removendo, 0.2))})`}} />
    </AbsoluteFill>
  );
};

const Alerta: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio + 0.2) return null;
  const e = mola(t, 0, 12, 200) * (1 - prog(t, T.meio - 0.15, 0.3));
  const pulso = 0.55 + 0.45 * Math.abs(Math.sin(t * 7));
  const texto = mola(t, 0.05, 11, 220);
  return (
    <>
      <AbsoluteFill style={{pointerEvents: 'none', boxShadow: `inset 0 0 ${140 * pulso}px rgba(255,40,60,${0.7 * e})`, border: `${8 * e}px solid rgba(255,77,94,${0.8 * pulso * e})`}} />
      <div style={{position: 'absolute', left: 40, right: 40, top: 270, textAlign: 'center', opacity: texto * (1 - prog(t, T.meio - 0.15, 0.3)), scale: String(interpolate(texto, [0, 1], [1.6, 1])), zIndex: 7}}>
        <div style={{display: 'inline-block', padding: '14px 26px', borderRadius: 24, background: 'rgba(20,4,8,.88)', border: `4px solid ${COR.vermelho}`, boxShadow: `0 0 ${40 * pulso}px rgba(255,77,94,.6)`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 58, lineHeight: 1.08, color: COR.branco}}>
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>⚠️</span> O INSTAGRAM ESTÁ<br /><span style={{color: COR.vermelho}}>REMOVENDO SEGUIDORES</span>
          </div>
        </div>
      </div>
    </>
  );
};

// No peito dela: o contador caindo e a pergunta.
const PerguntaPeito: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, A0 + 0.1, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.vermelho}`}}>
          <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.vermelho}}>📉 −217</span>
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco}}>seguidores</span>
        </div>
      </div>
    </>
  );
};

// O relatório marcou 4,09–4,26 s («seu é») como artificial: nesse trecho entra "É O SEU?" em tela cheia.
const I0 = M.seu1 - 0.12;
const I1 = M.um1 + 0.02;

const ESeuCheio: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < I0 - 0.02 || t >= I1) return null;
  const e = mola(t, I0, 9, 270);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #3A2A05, #05091A 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 150, color: COR.amarelo, opacity: Math.min(1, e * 1.4), scale: String(interpolate(e, [0, 1], [2.2, 1])), rotate: `${-5 + (1 - e) * 10}deg`, textShadow: '0 0 60px rgba(255,214,10,.5)'}}>É O SEU?</div>
    </AbsoluteFill>
  );
};

// Contador de retenção: "onde conferir aparece em Ns" até "Status".
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.status + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.status + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.status - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ onde conferir aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- A regra: menores de 18 só veem conteúdo 13+ ----------

const Regra: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.eSe - 0.15);
  if (!st) return null;
  const marco = mola(t, M.marco - 0.15, 10, 240);
  const cel = mola(t, M.menos - 0.1, 12, 200);
  const selo = mola(t, M.treze - 0.1, 9, 260);
  const filme = mola(t, M.classificacao - 0.15, 11, 220);
  return (
    <AbsoluteFill style={st}>
      {marco > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: marco, scale: String(interpolate(marco, [0, 1], [1.6, 1]))}}><Pilula cor={COR.amarelo} tamanho={44} fundo="rgba(40,30,5,.92)">🇧🇷 DESDE MARÇO/2026</Pilula></div>}
      <div style={{position: 'absolute', left: 150, top: 570, width: 420, height: 600, borderRadius: 44, border: '9px solid #1B2238', background: '#0D1117', overflow: 'hidden', opacity: cel, scale: String(0.85 + 0.15 * cel)}}>
        <div style={{padding: '24px 22px 10px', fontFamily: INTER, fontWeight: 800, fontSize: 26, color: '#F2F4F8'}}>👤 Conta de adolescente</div>
        <div style={{padding: '0 22px', fontFamily: INTER, fontWeight: 600, fontSize: 22, color: COR.amarelo}}>menos de 18 anos</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: 16}}>
          {['🎮', '⚽', '🎧', '📚'].map((e) => <div key={e} style={{height: 190, borderRadius: 14, background: 'linear-gradient(165deg, #3A2E5C, #1A1430)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80}}>{e}</div>)}
        </div>
      </div>
      {selo > 0.01 && (
        <div style={{position: 'absolute', left: 620, top: 640, width: 300, height: 300, borderRadius: 40, background: COR.amarelo, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: selo, scale: String(interpolate(selo, [0, 1], [2.2, 1])), rotate: `${-6 + (1 - selo) * 12}deg`, boxShadow: '0 20px 60px rgba(0,0,0,.5)'}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 150, lineHeight: 1, color: '#1A1020'}}>13+</div>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 26, color: '#1A1020'}}>só vê conteúdo</div>
        </div>
      )}
      {filme > 0.01 && <div style={{position: 'absolute', left: 620, top: 980, width: 300, textAlign: 'center', opacity: filme, fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco}}>🎬 igual classificação de filme</div>}
      <Fonte t={t} de={M.marco} ate={M.eSe} top={1250} veiculo="Meta Brasil" titulo="Novas proteções nas Contas de Adolescente (mar/2026)" />
    </AbsoluteFill>
  );
};

// ---------- O que é impróprio ----------

const Improprios: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eSe - 0.15, M.ele - 0.15);
  if (!st) return null;
  const itens = [
    {de: M.bebida - 0.15, icone: '🍺', nome: 'VENDA DE BEBIDA'},
    {de: M.cigarro - 0.15, icone: '🚬', nome: 'CIGARRO ELETRÔNICO'},
    {de: M.sugestivo - 0.15, icone: '🔞', nome: 'CONTEÚDO SUGESTIVO'},
    {de: M.palavrao - 0.15, icone: '🤬', nome: 'PALAVRÃO'},
  ];
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.eSe} top={440} tamanho={46}>SE O PERFIL POSTA <span style={{color: COR.vermelho}}>COM FREQUÊNCIA</span></Titulo>
      <div style={{position: 'absolute', left: 110, right: 110, top: 580, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22}}>
        {itens.map((c) => {
          const e = mola(t, c.de, 9, 260);
          return (
            <div key={c.nome} style={{height: 290, borderRadius: 30, ...caixa, border: `4px solid ${COR.vermelho}88`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${(1 - e) * 10}deg`}}>
              <span style={{fontSize: 110}}>{c.icone}</span>
              <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 32, color: COR.branco, textAlign: 'center', padding: '0 10px'}}>{c.nome}</span>
            </div>
          );
        })}
      </div>
      <Fonte t={t} de={M.bebida} ate={M.ele} top={1250} veiculo="Meta" titulo="Contas de Adolescente inspiradas na classificação 13+ (out/2025)" />
    </AbsoluteFill>
  );
};

// ---------- Some para o adolescente ----------

const Some: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.ele - 0.15, M.eEm - 0.15);
  if (!st) return null;
  const cel = mola(t, M.ele - 0.1, 12, 200);
  const cinza = prog(t, M.some - 0.1, 0.5);
  const seguir = mola(t, M.seguir - 0.15, 9, 260);
  const ver = mola(t, M.ver - 0.1, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.some - 0.1} top={440} tamanho={50}>SOME PRA QUEM TEM <span style={{color: COR.amarelo}}>MENOS DE 18</span></Titulo>
      <div style={{position: 'absolute', left: 270, top: 570, width: 540, height: 640, borderRadius: 48, border: '10px solid #1B2238', background: '#0D1117', overflow: 'hidden', opacity: cel}}>
        <div style={{padding: '22px 24px 8px', fontFamily: INTER, fontWeight: 700, fontSize: 22, color: COR.amarelo}}>👤 celular de quem tem 15 anos</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '10px 24px', filter: `grayscale(${cinza})`, opacity: 1 - 0.5 * cinza}}>
          <div style={{width: 110, height: 110, borderRadius: 99, background: 'linear-gradient(135deg, #FF8A5B, #E0407E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56}}>🍻</div>
          <div style={{flex: 1}}>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#F2F4F8'}}>adega.do.ze</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 22, color: '#9AA3B5'}}>1.248 seguidores</div>
          </div>
        </div>
        <div style={{margin: '10px 24px', padding: '14px 0', borderRadius: 14, background: seguir > 0.5 ? 'rgba(255,255,255,.08)' : COR.azul, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 28, color: seguir > 0.5 ? '#6A7290' : '#fff'}}>{seguir > 0.5 ? '🚫 Não é possível seguir' : 'Seguir'}</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: '6px 24px'}}>
          {Array.from({length: 6}, (_, i) => <div key={i} style={{height: 140, borderRadius: 10, background: ver > 0.5 ? 'rgba(255,255,255,.05)' : 'linear-gradient(165deg, #FFB37A, #E0607E)', border: ver > 0.5 ? '2px dashed rgba(255,255,255,.2)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50}}>{ver > 0.5 ? '✕' : '🍺'}</div>)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Abril: adolescentes removidos da lista ----------

const Abril: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eEm - 0.15, M.paraVer - 0.15);
  if (!st) return null;
  const abril = mola(t, M.abril - 0.15, 10, 240);
  const sai = prog(t, M.removidos - 0.1, 0.8, suave);
  return (
    <AbsoluteFill style={st}>
      {abril > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: abril, scale: String(interpolate(abril, [0, 1], [1.6, 1]))}}><Pilula cor={COR.vermelho} tamanho={44} fundo="rgba(60,8,16,.95)">📢 ANÚNCIO DE ABRIL/2026</Pilula></div>}
      <ContadorSeguidores valor={1248 - 217 * sai} destaque={sai > 0.05} style={{left: 0, right: 0, top: 560}} />
      <ListaSeguidores t={t} sai={sai} style={{left: 150, top: 790}} />
      <Fonte t={t} de={M.abril} ate={M.paraVer} top={1275} veiculo="Meta" titulo="Adolescentes removidos da lista de seguidores (29/04/2026)" />
    </AbsoluteFill>
  );
};

// ---------- Onde ver: Status da conta → Disponibilidade para menores de 18 anos ----------

const ITENS_STATUS = ['Recursos', 'Remoções de conteúdo e mensagens', 'Qualificação de recomendação', 'Disponibilidade para menores de 18 anos', 'Monetização'];

const TelaStatus: React.FC<{marca: number; alerta?: boolean; style?: React.CSSProperties; children?: React.ReactNode}> = ({marca, alerta, style, children}) => (
  <div style={{position: 'absolute', width: 760, borderRadius: 40, border: '9px solid #1B2238', background: '#0D1117', padding: '26px 28px', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
    <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: '#F2F4F8', textAlign: 'center', marginBottom: 16}}>Status da Conta</div>
    {ITENS_STATUS.map((r) => {
      const alvo = r.startsWith('Disponibilidade');
      return (
        <div key={r} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 12px', borderRadius: 12, background: alvo ? `rgba(255,214,10,${0.22 * marca})` : 'transparent', border: `3px solid ${alvo && marca > 0.5 ? COR.amarelo : 'transparent'}`}}>
          <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 28, color: '#F2F4F8'}}>{r}</span>
          <span style={{fontSize: 34}}>{alvo && alerta ? '⚠️' : '✅'}</span>
        </div>
      );
    })}
    {children}
  </div>
);

const Caminho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.paraVer - 0.15, M.seNao - 0.15);
  if (!st) return null;
  const passos = [
    {de: M.abre - 0.1, texto: '☰ Menu'},
    {de: M.configuracoes - 0.1, texto: '⚙️ Configurações e atividade'},
    {de: M.status - 0.1, texto: '📍 Status da conta'},
  ];
  const tela = mola(t, M.configuracoes - 0.1, 12, 200);
  const marca = prog(t, M.disponibilidade - 0.1, 0.5, saida);
  const grande = t >= M.disponibilidade - 0.1;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 50, right: 50, top: 440, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
        {passos.map((p, i) => {
          const e = mola(t, p.de, 11, 230);
          const ultimo = i === passos.length - 1;
          return (
            <div key={p.texto} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: e, scale: String(interpolate(e, [0, 1], [1.5, 1]))}}>
              {i > 0 && <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.cinza}}>→</span>}
              <div style={{padding: '10px 18px', borderRadius: 16, background: ultimo ? 'rgba(40,30,5,.95)' : 'rgba(8,16,44,.95)', border: `3px solid ${ultimo ? COR.amarelo : COR.ciano}`, fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.branco, whiteSpace: 'nowrap'}}>{p.texto}</div>
            </div>
          );
        })}
      </div>
      <div style={{opacity: tela, scale: String(0.85 + 0.15 * tela)}}>
        <TelaStatus marca={marca} style={{left: 160, top: 580}} />
      </div>
      {grande && <Titulo t={t} de={M.disponibilidade - 0.1} top={1180} tamanho={44} cor={COR.amarelo}>DISPONIBILIDADE PARA<br />MENORES DE 18 ANOS</Titulo>}
    </AbsoluteFill>
  );
};

// ---------- Dica 1: apagar ou pedir nova análise ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.seNao - 0.15, M.agora - 0.15);
  if (!st) return null;
  const tela = mola(t, M.seNao, 12, 200);
  const apagar = mola(t, M.apaga - 0.1, 10, 240);
  const analise = mola(t, M.pede - 0.15, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.seNao} n={1} />
      <div style={{opacity: tela}}>
        <TelaStatus marca={1} alerta style={{left: 160, top: 560}}>
          <div style={{marginTop: 8, textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 20, color: COR.amarelo}}>exemplo</div>
        </TelaStatus>
      </div>
      <div style={{position: 'absolute', left: 160, right: 160, top: 1170, display: 'flex', gap: 18}}>
        <div style={{flex: 1, padding: '18px 0', borderRadius: 18, background: COR.vermelho, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.branco, opacity: apagar, scale: String(interpolate(apagar, [0, 1], [1.4, 1]))}}>🗑️ APAGAR POSTS +18</div>
        <div style={{flex: 1, padding: '18px 0', borderRadius: 18, background: COR.azul, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.branco, opacity: analise, scale: String(interpolate(analise, [0, 1], [1.4, 1]))}}>🔁 NOVA ANÁLISE</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: produto para adulto, público adulto ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.agora - 0.15, T.b - 0.1);
  if (!st) return null;
  const adulto = mola(t, M.adulto - 0.15, 10, 240);
  const bem = mola(t, M.tudo - 0.1, 9, 260);
  const teen = mola(t, M.adolescente2 - 0.15, 10, 240);
  const maior = mola(t, M.maior - 0.15, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.agora} n={2} />
      <Titulo t={t} de={M.vende - 0.1} top={570} tamanho={50}>VENDE PRODUTO <span style={{color: COR.amarelo}}>PRA ADULTO?</span></Titulo>
      {adulto > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 680, textAlign: 'center', fontSize: 130, opacity: adulto}}>🍷 🛍️ 🔞</div>}
      <Carimbo t={t} de={M.tudo - 0.1} cor={COR.verde} tamanho={60} rot={-5} style={{left: 330, top: 860, opacity: bem}}>TUDO BEM ✓</Carimbo>
      {teen > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1000, display: 'flex', justifyContent: 'center', gap: 24, opacity: teen}}>
          <div style={{padding: '18px 26px', borderRadius: 22, background: 'rgba(60,8,16,.95)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>👦 seguidor -18 ✕</div>
          <div style={{padding: '18px 26px', borderRadius: 22, background: 'rgba(5,40,20,.95)', border: `3px solid ${COR.verde}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco, opacity: maior, scale: String(interpolate(maior, [0, 1], [1.5, 1]))}}>🧑 público 18+ ✓</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Fechamento: seguir (mesmo CTA e mesmo clipe do 015) ----------

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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Meta (out/2025 e abr/2026) · Meta Brasil (mar/2026)<br />MobileSyrup</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; perfis e números são exemplos.</div>
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
      <Abertura t={t} />
      <ESeuCheio t={t} />
      <Alerta t={t} />
      <PerguntaPeito t={t} />
      <Regra t={t} />
      <Improprios t={t} />
      <Some t={t} />
      <Abril t={t} />
      <Caminho t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <CardVoz t={t} />
      <Contador t={t} />
      <CartaoFonte t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'swoosh', em: 0, volume: 0.5},
  {som: 'tique', em: 0.3, volume: 0.3},
  {som: 'tique', em: 0.55, volume: 0.3},
  {som: 'impacto', em: M.removendo - 0.05, volume: 0.65},
  {som: 'risco', em: M.removendo, volume: 0.4},
  {som: 'pop', em: A0 + 0.1, volume: 0.4},
  {som: 'impacto', em: I0, volume: 0.6},
  {som: 'pop', em: I1, volume: 0.4},
  // Contador
  ...passos(T.meio + 0.3, M.status, Math.max(1, Math.round(M.status - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.1})),
  // Regra
  {som: 'pop', em: M.marco - 0.15, volume: 0.4},
  {som: 'whoosh_in', em: M.menos - 0.1, volume: 0.4},
  {som: 'impacto', em: M.treze - 0.1, volume: 0.55},
  {som: 'ding', em: M.classificacao - 0.15, volume: 0.4},
  // Impróprios
  {som: 'impacto', em: M.bebida - 0.15, volume: 0.45},
  {som: 'impacto', em: M.cigarro - 0.15, volume: 0.45},
  {som: 'impacto', em: M.sugestivo - 0.15, volume: 0.45},
  {som: 'impacto', em: M.palavrao - 0.15, volume: 0.45},
  // Some
  {som: 'whoosh_in', em: M.ele - 0.1, volume: 0.4},
  {som: 'risco', em: M.seguir - 0.15, volume: 0.45},
  {som: 'risco', em: M.ver - 0.1, volume: 0.45},
  // Abril
  {som: 'impacto', em: M.abril - 0.15, volume: 0.55},
  {som: 'whoosh_out', em: M.removidos - 0.1, volume: 0.5},
  {som: 'tique', em: M.removidos + 0.1, volume: 0.3},
  {som: 'tique', em: M.removidos + 0.3, volume: 0.3},
  {som: 'tique', em: M.removidos + 0.5, volume: 0.3},
  // Caminho
  {som: 'tecla', em: M.abre - 0.1, volume: 0.45},
  {som: 'tecla', em: M.configuracoes - 0.1, volume: 0.45},
  {som: 'tecla', em: M.status - 0.1, volume: 0.45},
  {som: 'ding', em: M.disponibilidade - 0.1, volume: 0.5},
  // Dica 1
  {som: 'impacto', em: M.seNao, volume: 0.5},
  {som: 'pop', em: M.apaga - 0.1, volume: 0.4},
  {som: 'pop', em: M.pede - 0.15, volume: 0.4},
  // Dica 2
  {som: 'impacto', em: M.agora, volume: 0.5},
  {som: 'pop', em: M.adulto - 0.15, volume: 0.35},
  {som: 'ding', em: M.tudo - 0.1, volume: 0.5},
  {som: 'risco', em: M.adolescente2 - 0.15, volume: 0.4},
  {som: 'ding', em: M.maior - 0.15, volume: 0.5},
  // CTA
  {som: 'pop', em: T.b + 0.1, volume: 0.4},
  {som: 'swoosh', em: B1, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: B2, volume: 0.5},
];

export const CONFIG: Config = {
  palavras: PALAVRAS,
  trechos: T,
  estados: [
    // Até "seguidores" a abertura (contador despencando) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: I0, modo: 'fora'},
    {de: I1, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [I0, I1],
    [M.disponibilidade - 0.1, M.seNao - 0.15],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {removendo: COR.vermelho, removidos: COR.vermelho, abril: COR.vermelho, adolescente: COR.amarelo, verde: COR.verde},
  eventos: EVENTOS,
  Cena,
};
