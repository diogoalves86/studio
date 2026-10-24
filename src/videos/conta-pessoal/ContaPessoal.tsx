import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 024 · Seu perfil pode estar no shadowban, e a sua conta não deixa você ver.
// Abertura (SHADOWBAN + Status trancado) → o item do Status que mostra o shadowban → só aparece em conta profissional
// (pessoal × profissional) → a boa notícia: grátis, 2 min, dá pra desfazer → o caminho animado (Configurações e
// atividade → Tipo de conta e ferramentas → Mudar para conta profissional → Empresa) → aviso: profissional é pública →
// bônus: estatísticas e o Status completo → CTA.

const T = TRECHOS;
const M = {
  shadowban1: em('shadowban'),
  e1: em('e'),
  conta1: em('conta'),
  ver: em('ver'),
  tela: em('tela'),
  status: em('status'),
  item: em('item'),
  recomendado: em('recomendado'),
  profissional1: em('profissional'),
  pessoal1: em('pessoal'),
  lojinha1: em('lojinha'),
  boa: em('boa'),
  graca: em('graça'),
  minutos: em('minutos'),
  desfazer: em('desfazer'),
  abre: em('abre'),
  configuracoes: em('configurações'),
  tipo: em('tipo'),
  toca: em('toca'),
  mudar2: em('mudar', em('toca')),
  lojinha2: em('lojinha', em('mudar', em('toca'))),
  empresa: em('empresa'),
  aviso: em('aviso'),
  publica: em('pública'),
  fechado: em('fechado'),
  eQuebra: em('e', em('dá', em('fechado'))),
  estatisticas: em('estatísticas'),
  viram: em('viram'),
  seguem: em('seguem'),
  voltar: em('voltar'),
  conferir: em('conferir'),
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

// "SHADOWBAN" escrito grande, com tremida de glitch (pedido do Diogo: a palavra aparece sempre que ela fala).
const PalavraShadowban: React.FC<{t: number; de: number; tamanho?: number; style?: React.CSSProperties}> = ({t, de, tamanho = 150, style}) => {
  const mola = useMola();
  const e = mola(t, de, 9, 260);
  if (e <= 0.01) return null;
  const glitch = (1 - prog(t, de + 0.05, 0.35)) * 1;
  const dx = Math.sin(t * 90) * 14 * glitch;
  const base: React.CSSProperties = {position: 'absolute', inset: 0, fontFamily: MONT, fontWeight: 900, fontSize: tamanho, letterSpacing: 4, textAlign: 'center', whiteSpace: 'nowrap'};
  return (
    <div style={{position: 'absolute', left: 0, right: 0, height: tamanho * 1.2, opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.2, 1])), ...style}}>
      <div style={{...base, color: COR.ciano, translate: `${-dx - 6 * glitch}px 0px`, opacity: 0.8 * glitch}}>SHADOWBAN</div>
      <div style={{...base, color: COR.vermelho, translate: `${dx + 6 * glitch}px 0px`, opacity: 0.8 * glitch}}>SHADOWBAN</div>
      <div style={{...base, color: COR.branco, textShadow: `0 0 40px rgba(255,77,94,.7), 0 10px 30px rgba(0,0,0,.6)`}}>SHADOWBAN</div>
    </div>
  );
};

// ---------- Tela animada do Status da conta (pessoal × profissional) ----------

const ITENS_PRO = ['Recursos', 'Remoções de conteúdo e mensagens', 'Qualificação de recomendação', 'Disponibilidade para menores de 18 anos', 'Monetização'];
const ITENS_PESSOAL = ['Recursos', 'Remoções de conteúdo e mensagens'];

const Status: React.FC<{w: number; tipo: 'pessoal' | 'pro'; marca?: number; style?: React.CSSProperties}> = ({w, tipo, marca = 0, style}) => {
  const k = w / 760;
  const itens = tipo === 'pro' ? ITENS_PRO : ITENS_PESSOAL;
  return (
    <div style={{position: 'absolute', width: w, borderRadius: 40 * k, border: `${9 * k}px solid #1B2238`, background: '#0D1117', padding: `${24 * k}px ${26 * k}px`, boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32 * k, color: '#F2F4F8', textAlign: 'center', marginBottom: 14 * k}}>Status da Conta</div>
      {itens.map((r) => {
        const alvo = r.startsWith('Qualificação');
        return (
          <div key={r} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${14 * k}px ${12 * k}px`, borderRadius: 12 * k, background: alvo ? `rgba(255,214,10,${0.22 * marca})` : 'transparent', border: `${3 * k}px solid ${alvo && marca > 0.5 ? COR.amarelo : 'transparent'}`}}>
            <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 27 * k, color: '#F2F4F8'}}>{r}</span>
            <span style={{fontSize: 32 * k}}>✅</span>
          </div>
        );
      })}
      {tipo === 'pessoal' && (
        <div style={{marginTop: 10 * k, padding: `${18 * k}px`, borderRadius: 14 * k, border: `${3 * k}px dashed rgba(255,77,94,.7)`, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 26 * k, color: COR.vermelho}}>🔒 Qualificação de recomendação<br />não aparece</div>
      )}
    </div>
  );
};

// ---------- Abertura: SHADOWBAN + Status trancado ----------

const A0 = M.e1 - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const tela = mola(t, 0.05, 12, 220);
  const tremor = Math.sin(t * 80) * 10 * prog(t, M.shadowban1 - 0.04, 0.04) * (1 - prog(t, M.shadowban1 + 0.02, 0.15));
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{opacity: tela, filter: 'blur(7px)'}}>
        <Status w={700} tipo="pro" style={{left: 190, top: 500}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontSize: 200, opacity: tela}}>🔒</div>
      <PalavraShadowban t={t} de={M.shadowban1 - 0.08} tamanho={112} style={{top: 900}} />
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, M.shadowban1 - 0.05, 0.05) * (1 - prog(t, M.shadowban1, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>🙈</span> <span style={{color: COR.vermelho}}>SHADOWBAN</span> QUE<br />VOCÊ NÃO CONSEGUE VER
          </div>
        </div>
      </div>
    </>
  );
};

const Peito: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, M.conta1 - 0.1, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.vermelho}`}}>
          <span style={{fontSize: 50}}>👤</span>
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 38, color: COR.branco}}>conta <span style={{color: COR.vermelho}}>pessoal</span></span>
        </div>
      </div>
      <Carimbo t={t} de={M.ver - 0.1} cor={COR.vermelho} tamanho={66} rot={-7} style={{left: 250, top: 1530}}>VOCÊ NÃO VÊ 🙈</Carimbo>
    </>
  );
};

// Contador de retenção: "a solução aparece em Ns" até "A boa notícia".
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.boa + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.boa + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.boa - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ a solução aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- O item do shadowban e quem consegue ver ----------

const Item: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.profissional1 - 0.2);
  if (!st) return null;
  const tela = mola(t, M.tela - 0.1, 12, 200);
  const marca = prog(t, M.item - 0.1, 0.5, saida);
  const rotulo = mola(t, M.recomendado - 0.15, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.status - 0.1} top={440} tamanho={50}>A TELA DO SHADOWBAN: <span style={{color: COR.amarelo}}>STATUS DA CONTA</span></Titulo>
      <div style={{opacity: tela, scale: String(0.85 + 0.15 * tela)}}>
        <Status w={760} tipo="pro" marca={marca} style={{left: 160, top: 590}} />
      </div>
      {rotulo > 0.01 && <Carimbo t={t} de={M.recomendado - 0.15} cor={COR.amarelo} tamanho={46} rot={-5} style={{left: 250, top: 1110}}>← ESTE ITEM = SHADOWBAN</Carimbo>}
      <Fonte t={t} de={M.recomendado} ate={M.profissional1} top={1250} veiculo="TechCrunch" titulo="Contas profissionais veem se o conteúdo pode ser recomendado (2022)" />
    </AbsoluteFill>
  );
};

const Comparacao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.profissional1 - 0.2, M.boa - 0.15);
  if (!st) return null;
  const pro = mola(t, M.profissional1 - 0.15, 12, 210);
  const pes = mola(t, M.pessoal1 - 0.15, 12, 210);
  const loja = mola(t, M.lojinha1 - 0.15, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 60, top: 450, width: 460, textAlign: 'center', opacity: pes}}>
        <Pilula cor={COR.vermelho} tamanho={34} fundo="rgba(60,8,16,.95)">👤 CONTA PESSOAL</Pilula>
      </div>
      <div style={{position: 'absolute', left: 560, top: 450, width: 460, textAlign: 'center', opacity: pro}}>
        <Pilula cor={COR.verde} tamanho={34} fundo="rgba(5,40,20,.95)">💼 CONTA PROFISSIONAL</Pilula>
      </div>
      <div style={{opacity: pes, translate: `${(1 - pes) * -80}px 0px`}}><Status w={460} tipo="pessoal" style={{left: 60, top: 540}} /></div>
      <div style={{opacity: pro, translate: `${(1 - pro) * 80}px 0px`}}><Status w={460} tipo="pro" marca={1} style={{left: 560, top: 540}} /></div>
      {loja > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1110, display: 'flex', justifyContent: 'center', opacity: loja, scale: String(interpolate(loja, [0, 1], [1.5, 1]))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 26px', borderRadius: 24, ...caixa, border: `3px solid ${COR.vermelho}88`}}>
            <span style={{fontSize: 56}}>🏪</span>
            <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco}}>muita lojinha ainda está aqui ←</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- A boa notícia: grátis, 2 min, dá pra desfazer ----------

const BoaNoticia: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.boa - 0.15, M.abre - 0.15);
  if (!st) return null;
  const selos = [
    {de: M.graca - 0.15, icone: '💸', texto: 'GRÁTIS'},
    {de: M.minutos - 0.15, icone: '⏱️', texto: '2 MINUTOS'},
    {de: M.desfazer - 0.15, icone: '↩️', texto: 'DÁ PRA DESFAZER'},
  ];
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.boa - 0.1} top={460} tamanho={64} cor={COR.verde}>A BOA NOTÍCIA ✓</Titulo>
      <div style={{position: 'absolute', left: 150, right: 150, top: 620, display: 'flex', flexDirection: 'column', gap: 26}}>
        {selos.map((s) => {
          const e = mola(t, s.de, 9, 260);
          return (
            <div key={s.texto} style={{display: 'flex', alignItems: 'center', gap: 26, padding: '22px 30px', borderRadius: 28, ...caixa, border: `4px solid ${COR.verde}88`, opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [1.5, 1]))}}>
              <span style={{fontSize: 90}}>{s.icone}</span>
              <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.branco}}>{s.texto}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- O caminho para mudar ----------

const LinhaMenu: React.FC<{icone: string; texto: string; ativo?: number}> = ({icone, texto, ativo = 0}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', borderRadius: 14, background: `rgba(255,214,10,${0.22 * ativo})`, border: `3px solid ${ativo > 0.5 ? COR.amarelo : 'transparent'}`}}>
    <span style={{fontSize: 38}}>{icone}</span>
    <span style={{flex: 1, fontFamily: INTER, fontWeight: 500, fontSize: 30, color: '#F2F4F8'}}>{texto}</span>
    <span style={{fontFamily: INTER, fontSize: 34, color: '#9AA3B5'}}>›</span>
  </div>
);

const Caminho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.abre - 0.15, M.aviso - 0.2);
  if (!st) return null;
  const tela = t < M.toca ? 0 : t < M.lojinha2 - 0.2 ? 1 : 2;
  const cel = mola(t, M.abre, 12, 200);
  const passos = [
    {de: M.configuracoes - 0.1, texto: '⚙️ Configurações e atividade'},
    {de: M.tipo - 0.1, texto: 'Tipo de conta e ferramentas'},
    {de: M.mudar2 - 0.1, texto: '💼 Mudar para conta profissional'},
  ];
  const empresa = mola(t, M.empresa - 0.15, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 50, right: 50, top: 430, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>
        {passos.map((p, i) => {
          const e = mola(t, p.de, 11, 230);
          const ultimo = i === passos.length - 1;
          return (
            <div key={p.texto} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: e, scale: String(interpolate(e, [0, 1], [1.5, 1]))}}>
              {i > 0 && <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.cinza}}>→</span>}
              <div style={{padding: '9px 16px', borderRadius: 14, background: ultimo ? 'rgba(40,30,5,.95)' : 'rgba(8,16,44,.95)', border: `3px solid ${ultimo ? COR.amarelo : COR.ciano}`, fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.branco, whiteSpace: 'nowrap'}}>{p.texto}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 160, top: 600, width: 760, height: 600, borderRadius: 40, border: '9px solid #1B2238', background: '#0D1117', padding: '22px 22px', overflow: 'hidden', opacity: cel, boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
        {tela === 0 && (
          <>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: '#F2F4F8', textAlign: 'center', marginBottom: 12}}>Configurações e atividade</div>
            <LinhaMenu icone="🔔" texto="Notificações" />
            <LinhaMenu icone="🔒" texto="Privacidade da conta" />
            <LinhaMenu icone="📊" texto="Tipo de conta e ferramentas" ativo={prog(t, M.tipo - 0.1, 0.3)} />
            <LinhaMenu icone="❓" texto="Ajuda" />
          </>
        )}
        {tela === 1 && (
          <>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: '#F2F4F8', textAlign: 'center', marginBottom: 12}}>Tipo de conta e ferramentas</div>
            <div style={{margin: '40px 10px', padding: '26px 0', borderRadius: 18, background: COR.azul, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 34, color: '#fff', outline: `4px solid rgba(255,214,10,${prog(t, M.mudar2 - 0.1, 0.3)})`}}>Mudar para conta profissional</div>
          </>
        )}
        {tela === 2 && (
          <>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: '#F2F4F8', textAlign: 'center', marginBottom: 24}}>Qual descreve você?</div>
            {[['🎨', 'Criador', 'artistas e influenciadores'], ['🏪', 'Empresa', 'lojas e prestadores de serviço']].map(([i, n, d]) => {
              const sel = n === 'Empresa' && empresa > 0.5;
              return (
                <div key={n} style={{display: 'flex', alignItems: 'center', gap: 20, margin: '14px 6px', padding: '22px 22px', borderRadius: 18, background: sel ? 'rgba(62,198,255,.15)' : 'rgba(255,255,255,.05)', border: `4px solid ${sel ? COR.ciano : 'rgba(255,255,255,.12)'}`}}>
                  <span style={{fontSize: 56}}>{i}</span>
                  <div style={{flex: 1}}>
                    <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: '#F2F4F8'}}>{n}</div>
                    <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 24, color: '#9AA3B5'}}>{d}</div>
                  </div>
                  <span style={{fontSize: 40}}>{sel ? '🔘' : '⚪'}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
      {tela === 1 && <Toque t={t} de={M.toca - 0.1} toque={M.mudar2} x={540} y={760} />}
      {tela === 2 && <Toque t={t} de={M.empresa - 0.6} toque={M.empresa - 0.15} x={540} y={930} />}
      <Fonte t={t} de={M.configuracoes} ate={M.aviso} top={1250} veiculo="Tecnoblog" titulo="Instagram profissional: como mudar e o que acontece" />
    </AbsoluteFill>
  );
};

// ---------- O aviso: conta profissional é pública ----------

const Aviso: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.aviso - 0.2, M.eQuebra - 0.15);
  if (!st) return null;
  const pub = mola(t, M.publica - 0.15, 9, 260);
  const fechado = mola(t, M.fechado - 0.15, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.aviso - 0.15} top={460} tamanho={64} cor={COR.amarelo}>⚠️ SÓ UM AVISO</Titulo>
      <div style={{position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontSize: 200, opacity: pub, scale: String(interpolate(pub, [0, 1], [1.6, 1]))}}>🔓</div>
      <Carimbo t={t} de={M.publica - 0.15} cor={COR.amarelo} tamanho={56} rot={-4} style={{left: 160, top: 900}}>PROFISSIONAL = PÚBLICA</Carimbo>
      {fechado > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1070, display: 'flex', justifyContent: 'center', opacity: fechado}}><Pilula cor={COR.vermelho} tamanho={38} fundo="rgba(60,8,16,.95)">🔒 perfil fechado ✕</Pilula></div>}
    </AbsoluteFill>
  );
};

// ---------- Bônus: estatísticas, e agora o Status mostra o item ----------

const Bonus: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eQuebra - 0.15, T.b - 0.1);
  if (!st) return null;
  const painel = mola(t, M.estatisticas - 0.15, 12, 200);
  const alcance = prog(t, M.viram - 0.1, 0.8, saida);
  const nao = mola(t, M.seguem - 0.2, 10, 240);
  const volta = t >= M.voltar - 0.15;
  const ok = mola(t, M.conferir - 0.1, 9, 260);
  return (
    <AbsoluteFill style={st}>
      {!volta ? (
        <>
          <Titulo t={t} de={M.eQuebra} top={460} tamanho={54}>DE QUEBRA: <span style={{color: COR.ciano}}>ESTATÍSTICAS 📊</span></Titulo>
          <div style={{position: 'absolute', left: 160, right: 160, top: 620, padding: 34, borderRadius: 32, ...caixa, opacity: painel, scale: String(0.85 + 0.15 * painel)}}>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza}}>Contas alcançadas</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 110, color: COR.branco}}>{Math.round(1240 * alcance).toLocaleString('pt-BR')}</div>
            <div style={{height: 26, borderRadius: 99, background: 'rgba(255,255,255,.1)', overflow: 'hidden', marginTop: 10}}>
              <div style={{width: `${68 * nao}%`, height: '100%', background: `linear-gradient(90deg, ${COR.azul}, ${COR.ciano})`}} />
            </div>
            <div style={{marginTop: 12, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.ciano, opacity: nao}}>68% não te seguem</div>
            <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 600, fontSize: 20, color: COR.amarelo}}>exemplo</div>
          </div>
        </>
      ) : (
        <>
          <Titulo t={t} de={M.voltar - 0.15} top={460} tamanho={54}>VOLTA NO <span style={{color: COR.amarelo}}>STATUS DA CONTA</span></Titulo>
          <Status w={760} tipo="pro" marca={1} style={{left: 160, top: 590}} />
          <Carimbo t={t} de={M.conferir - 0.1} cor={COR.verde} tamanho={50} rot={-5} style={{left: 300, top: 1160, opacity: ok}}>AGORA VOCÊ VÊ ✓</Carimbo>
        </>
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>TechCrunch (dez/2022) · Social Samosa<br />Tecnoblog · guia de 2026</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; números são exemplos.</div>
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
      <Alerta t={t} />
      <Peito t={t} />
      <Item t={t} />
      <Comparacao t={t} />
      <BoaNoticia t={t} />
      <Caminho t={t} />
      <Aviso t={t} />
      <Bonus t={t} />
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
  {som: 'pop', em: 0.1, volume: 0.35},
  {som: 'impacto', em: M.shadowban1 - 0.08, volume: 0.7},
  {som: 'risco', em: M.shadowban1, volume: 0.4},
  {som: 'pop', em: M.conta1 - 0.1, volume: 0.4},
  {som: 'impacto', em: M.ver - 0.1, volume: 0.55},
  // Contador
  ...passos(T.meio + 0.3, M.boa, Math.max(1, Math.round(M.boa - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.1})),
  // Item
  {som: 'whoosh_in', em: M.tela - 0.1, volume: 0.4},
  {som: 'ding', em: M.item - 0.1, volume: 0.45},
  {som: 'pop', em: M.recomendado - 0.15, volume: 0.4},
  // Comparação
  {som: 'whoosh_in', em: M.profissional1 - 0.15, volume: 0.45},
  {som: 'risco', em: M.pessoal1 - 0.15, volume: 0.45},
  {som: 'pop', em: M.lojinha1 - 0.15, volume: 0.4},
  // Boa notícia
  {som: 'ding', em: M.boa - 0.1, volume: 0.5},
  {som: 'pop', em: M.graca - 0.15, volume: 0.45},
  {som: 'pop', em: M.minutos - 0.15, volume: 0.45},
  {som: 'pop', em: M.desfazer - 0.15, volume: 0.45},
  // Caminho
  {som: 'tecla', em: M.configuracoes - 0.1, volume: 0.45},
  {som: 'tecla', em: M.tipo - 0.1, volume: 0.45},
  {som: 'toque', em: M.mudar2, volume: 0.6},
  {som: 'whoosh_in', em: M.lojinha2 - 0.2, volume: 0.35},
  {som: 'toque', em: M.empresa - 0.15, volume: 0.6},
  {som: 'ding', em: M.empresa, volume: 0.5},
  // Aviso
  {som: 'impacto', em: M.aviso - 0.15, volume: 0.55},
  {som: 'pop', em: M.publica - 0.15, volume: 0.45},
  {som: 'risco', em: M.fechado - 0.15, volume: 0.45},
  // Bônus
  {som: 'whoosh_in', em: M.eQuebra - 0.15, volume: 0.4},
  {som: 'tique', em: M.viram - 0.1, volume: 0.3},
  {som: 'tique', em: M.viram + 0.2, volume: 0.3},
  {som: 'tique', em: M.viram + 0.4, volume: 0.3},
  {som: 'ding', em: M.seguem - 0.2, volume: 0.45},
  {som: 'whoosh_in', em: M.voltar - 0.15, volume: 0.4},
  {som: 'ding', em: M.conferir - 0.1, volume: 0.55},
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
    // Até "e a sua conta" a abertura (SHADOWBAN + Status trancado) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.ver - 0.5, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    // O fim do clipe A (3,86–4,01 s, depois de "ver") fica artificial: sai um pouco antes do meio.
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {shadowban: COR.vermelho, pessoal: COR.vermelho, profissional: COR.verde, empresa: COR.ciano, pública: COR.amarelo},
  eventos: EVENTOS,
  Cena,
};
