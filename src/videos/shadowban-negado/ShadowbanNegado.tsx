import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 025 · O Instagram negou o shadowban por anos. Depois criou uma tela que mostra ele.
// Abertura (manchete "shadowban não existe" + NEGADO) → linha do tempo 2020 (Mosseri: "not a thing") → 2021 (blog
// oficial: admitiu e prometeu avisar) → 2022 (a promessa vira o Status da conta) → quem está certo? os dois, um pouco
// (balança) → SHADOWBAN → pra conferir (Status, Qualificação de recomendação) → CTA.

const T = TRECHOS;
const M = {
  negou: em('negou'),
  shadowban1: em('shadowban'),
  depois1: em('depois'),
  criou: em('criou'),
  mostra1: em('mostra'),
  ano2020: em('2020'),
  chefe: em('chefe'),
  disse: em('disse'),
  shadowban2: em('shadowban', T.meio),
  umAno: em('um', em('existe')),
  blog: em('blog'),
  tom: em('tom'),
  admitiu: em('admitiu'),
  prometeu: em('prometeu'),
  avisar: em('avisar'),
  eEm: em('e', em('regras')),
  ano2022: em('2022'),
  promessa: em('promessa'),
  tela2: em('tela', T.meio),
  status1: em('status'),
  recomendado2: em('recomendado', em('status')),
  entao: em('então'),
  dois: em('dois'),
  segue2: em('segue', em('pouco')),
  razao: em('razão'),
  parar: em('parar'),
  chama: em('chama'),
  shadowban3: em('shadowban', em('chama')),
  paraConferir: em('para', em('chama')),
  configuracoes: em('configurações'),
  status2: em('status', em('configurações')),
  qualificacao: em('qualificação'),
  verde: em('verde'),
  problema: em('problema'),
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

// ---------- Peças desta história ----------

// Manchete estilo jornal com a frase do Mosseri.
const Manchete: React.FC<{w: number; riscada?: number; style?: React.CSSProperties}> = ({w, riscada = 0, style}) => {
  const k = w / 860;
  return (
    <div style={{position: 'absolute', width: w, padding: `${30 * k}px ${36 * k}px`, borderRadius: 18 * k, background: '#F4F1E8', boxShadow: '0 30px 80px rgba(0,0,0,.55)', rotate: '-2deg', ...style}}>
      <div style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 26 * k, letterSpacing: 4 * k, color: '#6A6457', borderBottom: `${3 * k}px solid #1A1714`, paddingBottom: 8 * k}}>REDES SOCIAIS · 2020</div>
      <div style={{position: 'relative', marginTop: 16 * k, fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 70 * k, lineHeight: 1.05, color: '#1A1714'}}>
        Chefe do Instagram: “shadowban não existe”
        {riscada > 0.01 && <div style={{position: 'absolute', left: -10 * k, top: '48%', height: 12 * k, width: `${(100 + 4) * riscada}%`, background: COR.vermelho, borderRadius: 6 * k, rotate: '-4deg'}} />}
      </div>
      <div style={{marginTop: 14 * k, fontFamily: 'Georgia, serif', fontSize: 26 * k, color: '#4A453B'}}>Adam Mosseri respondeu numa sessão de perguntas…</div>
    </div>
  );
};

// Tela animada do Status da conta (mesma do 020–024).
const ITENS = ['Recursos', 'Remoções de conteúdo e mensagens', 'Qualificação de recomendação', 'Disponibilidade para menores de 18 anos', 'Monetização'];
const Status: React.FC<{w: number; marca?: number; pulso?: number; style?: React.CSSProperties}> = ({w, marca = 0, pulso = 0, style}) => {
  const k = w / 760;
  return (
    <div style={{position: 'absolute', width: w, borderRadius: 40 * k, border: `${9 * k}px solid #1B2238`, background: '#0D1117', padding: `${24 * k}px ${26 * k}px`, boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32 * k, color: '#F2F4F8', textAlign: 'center', marginBottom: 14 * k}}>Status da Conta</div>
      {ITENS.map((r) => {
        const alvo = r.startsWith('Qualificação');
        return (
          <div key={r} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${14 * k}px ${12 * k}px`, borderRadius: 12 * k, background: alvo ? `rgba(255,214,10,${0.22 * marca})` : 'transparent', border: `${3 * k}px solid ${alvo && marca > 0.5 ? COR.amarelo : 'transparent'}`}}>
            <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 27 * k, color: '#F2F4F8'}}>{r}</span>
            <span style={{fontSize: 32 * k, scale: String(alvo ? 1 + 0.35 * pulso : 1), display: 'inline-block', filter: alvo && pulso > 0.01 ? `drop-shadow(0 0 ${14 * pulso}px ${COR.verde})` : 'none'}}>✅</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Abertura: a manchete "shadowban não existe" + NEGADO ----------

// O relatório marcou 2,97–3,17 s («Depois,») como artificial: a Luísa só entra em "criou".
const A0 = M.criou - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const e = mola(t, 0.03, 12, 220);
  const tremor = Math.sin(t * 80) * 10 * prog(t, M.negou - 0.04, 0.04) * (1 - prog(t, M.negou + 0.02, 0.15));
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{opacity: e, scale: String(0.85 + 0.15 * e)}}>
        <Manchete w={860} style={{left: 110, top: 600}} />
      </div>
      <Carimbo t={t} de={M.negou - 0.05} cor={COR.vermelho} tamanho={96} rot={-10} style={{left: 300, top: 1040}}>NEGADO</Carimbo>
      <PalavraShadowban t={t} de={M.shadowban1 - 0.08} tamanho={112} style={{top: 1260}} />
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, M.negou - 0.05, 0.05) * (1 - prog(t, M.negou, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>🤔</span> O INSTAGRAM <span style={{color: COR.vermelho}}>NEGOU</span>…<br />E DEPOIS <span style={{color: COR.verde}}>MOSTROU</span>
          </div>
        </div>
      </div>
    </>
  );
};

// No peito dela: a manchete riscada e a tela que "desmente".
const Peito: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, A0 + 0.05, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1335, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 26px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.verde}`}}>
          <span style={{fontSize: 50}}>📱</span>
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 36, color: COR.branco}}>Status da conta</span>
          <span style={{fontSize: 40}}>✅</span>
        </div>
      </div>
      <Carimbo t={t} de={M.mostra1 - 0.1} cor={COR.verde} tamanho={60} rot={-7} style={{left: 230, top: 1525}}>A PROVA EXISTE ✓</Carimbo>
    </>
  );
};

// ---------- Linha do tempo 2020 → 2021 → 2022 (retenção no topo do meio) ----------

const LinhaTempo: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio || t >= M.entao + 0.3) return null;
  const e = mola(t, T.meio, 13, 200) * (1 - prog(t, M.entao - 0.1, 0.3));
  const marcos = [
    {de: M.ano2020 - 0.1, ano: '2020', rotulo: 'NEGOU', cor: COR.vermelho},
    {de: M.umAno - 0.1, ano: '2021', rotulo: 'ADMITIU', cor: COR.amarelo},
    {de: M.ano2022 - 0.1, ano: '2022', rotulo: 'MOSTROU', cor: COR.verde},
  ];
  const ativo = marcos.filter((m) => t >= m.de).length;
  return (
    <div style={{position: 'absolute', left: 110, right: 110, top: 420, height: 130, opacity: e, zIndex: 5}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 34, height: 8, borderRadius: 99, background: 'rgba(255,255,255,.15)'}} />
      <div style={{position: 'absolute', left: 60, top: 34, height: 8, borderRadius: 99, width: `${Math.max(0, (ativo - 1) / 2) * 100 * 0.86}%`, background: `linear-gradient(90deg, ${COR.vermelho}, ${COR.amarelo}, ${COR.verde})`}} />
      <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between'}}>
        {marcos.map((m) => {
          const on = mola(t, m.de, 9, 260);
          return (
            <div key={m.ano} style={{width: 140, textAlign: 'center'}}>
              <div style={{width: 76, height: 76, margin: '0 auto', borderRadius: 99, background: on > 0.5 ? m.cor : '#1B2238', border: `4px solid ${on > 0.5 ? m.cor : 'rgba(255,255,255,.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 22, color: on > 0.5 ? '#0B1122' : COR.cinza, scale: String(1 + 0.25 * on * (1 - prog(t, m.de + 0.3, 0.3)))}}>{m.ano}</div>
              <div style={{marginTop: 6, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on > 0.5 ? m.cor : COR.cinza, opacity: 0.4 + 0.6 * on}}>{m.rotulo}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------- 2020: "shadowban não existe" ----------

const Ano2020: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.umAno - 0.15);
  if (!st) return null;
  const card = mola(t, M.chefe - 0.1, 12, 200);
  const balao = mola(t, M.disse - 0.1, 11, 220);
  const fala = t >= M.shadowban2 - 0.15;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 600, display: 'flex', alignItems: 'center', gap: 26, padding: 22, borderRadius: 30, ...caixa, opacity: card, translate: `0px ${(1 - card) * 40}px`}}>
        <Img src={ARQ.mosseri} style={{width: 150, height: 150, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', border: `4px solid ${COR.ciano}`}} />
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>Adam Mosseri</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.ciano}}>chefe do Instagram</div>
          <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 500, fontSize: 18, color: COR.cinza}}>Foto: Anthony Quintano · CC BY 2.0</div>
        </div>
      </div>
      {balao > 0.01 && (
        <div style={{position: 'absolute', left: 170, right: 170, top: 830, padding: '24px 30px', borderRadius: 30, background: '#F2F4F8', opacity: balao, scale: String(0.8 + 0.2 * balao), boxShadow: '0 20px 60px rgba(0,0,0,.5)'}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 44, color: '#111', fontStyle: 'italic'}}>“Shadowbanning is not a thing.”</div>
          {fala && <div style={{marginTop: 8, fontFamily: MONT, fontWeight: 900, fontSize: 42, color: COR.vermelho}}>= SHADOWBAN NÃO EXISTE</div>}
        </div>
      )}
      <Fonte t={t} de={M.disse} ate={M.umAno} top={1250} veiculo="The Art Newspaper" titulo="O que está por trás do shadowban do Instagram (2020)" />
    </AbsoluteFill>
  );
};

// ---------- 2021: o blog oficial — admitiu e prometeu ----------

const Ano2021: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.umAno - 0.15, M.eEm - 0.15);
  if (!st) return null;
  const pagina = mola(t, M.blog - 0.15, 12, 200);
  const tom = mola(t, M.tom - 0.1, 9, 260);
  const adm = prog(t, M.admitiu - 0.05, 0.5, saida);
  const pro = prog(t, M.prometeu - 0.05, 0.5, saida);
  const selo = mola(t, M.avisar - 0.1, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 120, right: 120, top: 600, borderRadius: 26, background: '#FFFFFF', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.55)', opacity: pagina, translate: `0px ${(1 - pagina) * 60}px`}}>
        <div style={{padding: '14px 22px', background: '#EEF0F4', fontFamily: INTER, fontWeight: 600, fontSize: 22, color: '#6A7290'}}>🔒 about.instagram.com · blog oficial</div>
        <div style={{padding: '24px 28px'}}>
          <div style={{fontFamily: INTER, fontWeight: 900, fontSize: 40, lineHeight: 1.1, color: '#111'}}>Shedding More Light on How Instagram Works</div>
          <div style={{marginTop: 8, fontFamily: INTER, fontWeight: 600, fontSize: 22, color: '#6A7290'}}>Adam Mosseri · 8 de junho de 2021</div>
          <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14}}>
            <div style={{position: 'relative', fontFamily: INTER, fontWeight: 700, fontSize: 30, color: '#222'}}>
              <span style={{background: `linear-gradient(90deg, rgba(255,214,10,.55) ${adm * 100}%, transparent ${adm * 100}%)`}}>✍️ Admitiu: não explicava direito o que pode ser recomendado</span>
            </div>
            <div style={{position: 'relative', fontFamily: INTER, fontWeight: 700, fontSize: 30, color: '#222'}}>
              <span style={{background: `linear-gradient(90deg, rgba(62,198,255,.45) ${pro * 100}%, transparent ${pro * 100}%)`}}>🤝 Prometeu: avisar quando um post for contra as regras</span>
            </div>
          </div>
        </div>
      </div>
      {tom > 0.01 && <Carimbo t={t} de={M.tom - 0.1} cor={COR.amarelo} tamanho={50} rot={-6} style={{left: 560, top: 540}}>MUDOU O TOM</Carimbo>}
      {selo > 0.01 && <Carimbo t={t} de={M.avisar - 0.1} cor={COR.ciano} tamanho={60} rot={-5} style={{left: 330, top: 1110}}>PROMESSA</Carimbo>}
      <Fonte t={t} de={M.blog} ate={M.eEm} top={1250} veiculo="Blog oficial do Instagram" titulo="Shedding more light on how Instagram works (2021)" />
    </AbsoluteFill>
  );
};

// ---------- 2022: a promessa virou a tela ----------

const Ano2022: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eEm - 0.15, M.entao - 0.15);
  if (!st) return null;
  const promessa = mola(t, M.promessa - 0.1, 10, 240);
  const vira = prog(t, M.tela2 - 0.15, 0.4, suave);
  const marca = prog(t, M.recomendado2 - 0.1, 0.5, saida);
  return (
    <AbsoluteFill style={st}>
      {vira < 0.99 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: promessa * (1 - vira), scale: String((0.8 + 0.2 * promessa) * (1 - 0.5 * vira))}}><Pilula cor={COR.ciano} tamanho={60} fundo="rgba(8,30,50,.95)">🤝 PROMESSA</Pilula></div>}
      {vira > 0.01 && (
        <div style={{opacity: vira, scale: String(0.6 + 0.4 * vira)}}>
          <Status w={760} marca={marca} style={{left: 160, top: 600}} />
        </div>
      )}
      <Carimbo t={t} de={M.status1 - 0.05} cor={COR.verde} tamanho={56} rot={-6} style={{left: 300, top: 1110}}>CUMPRIDA ✓</Carimbo>
      <Fonte t={t} de={M.tela2} ate={M.entao} top={1250} veiculo="TechCrunch" titulo="Instagram mostra se o conteúdo pode ser recomendado (2022)" />
    </AbsoluteFill>
  );
};

// ---------- Quem está certo? Os dois, um pouco ----------

const Balanca: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.entao - 0.15, M.paraConferir - 0.15);
  if (!st) return null;
  const dois = mola(t, M.dois - 0.1, 9, 260);
  const esq = mola(t, M.segue2 - 0.15, 11, 220);
  const razao = mola(t, M.razao - 0.1, 9, 260);
  const dir = mola(t, M.parar - 0.15, 11, 220);
  const slam = t >= M.shadowban3 - 0.15;
  const incl = interpolate(esq - dir, [-1, 1], [8, -8]);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.entao} top={440} tamanho={60}>QUEM ESTÁ <span style={{color: COR.amarelo}}>CERTO?</span></Titulo>
      {dois > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 540, display: 'flex', justifyContent: 'center', opacity: dois, scale: String(interpolate(dois, [0, 1], [1.6, 1]))}}><Pilula cor={COR.amarelo} tamanho={40} fundo="rgba(40,30,5,.92)">⚖️ OS DOIS, UM POUCO</Pilula></div>}
      <div style={{position: 'absolute', left: 540 - 3, top: 690, width: 6, height: 300, background: 'rgba(255,255,255,.35)', borderRadius: 3}} />
      <div style={{position: 'absolute', left: 100, right: 100, top: 690, height: 8, background: 'rgba(255,255,255,.45)', borderRadius: 4, rotate: `${incl}deg`}} />
      <div style={{position: 'absolute', left: 90, top: 730 - incl * 12, width: 420, padding: 22, borderRadius: 26, ...caixa, border: `4px solid ${COR.verde}88`, textAlign: 'center', opacity: esq, scale: String(0.85 + 0.15 * esq)}}>
        <div style={{fontSize: 80}}>👥</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 32, color: COR.branco}}>SEGUIDORES CONTINUAM VENDO ✓</div>
        {razao > 0.01 && <div style={{marginTop: 8, fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.verde, opacity: razao}}>nisso ele tem razão</div>}
      </div>
      <div style={{position: 'absolute', left: 570, top: 730 + incl * 12, width: 420, padding: 22, borderRadius: 26, ...caixa, border: `4px solid ${COR.vermelho}88`, textAlign: 'center', opacity: dir, scale: String(0.85 + 0.15 * dir)}}>
        <div style={{fontSize: 80}}>🆕</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 32, color: COR.branco}}>GENTE NOVA PODE NÃO TE VER ✕</div>
      </div>
      {slam && (
        <>
          <AbsoluteFill style={{background: `rgba(5,9,26,${0.85 * prog(t, M.shadowban3 - 0.15, 0.15)})`}} />
          <AbsoluteFill style={{background: `rgba(255,40,60,${0.3 * (1 - prog(t, M.shadowban3, 0.25))})`}} />
          <Titulo t={t} de={M.chama - 0.1} top={720} tamanho={46} cor={COR.cinza}>ISSO É O QUE TODO MUNDO CHAMA DE:</Titulo>
          <PalavraShadowban t={t} de={M.shadowban3 - 0.08} tamanho={112} style={{top: 830}} />
        </>
      )}
      <Fonte t={t} de={M.segue2} ate={M.chama} top={1250} veiculo="Instagram para criadores" titulo="Seguidores continuam vendo; a recomendação pode ser cortada" />
    </AbsoluteFill>
  );
};

// ---------- Pra conferir ----------

const Conferir: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.paraConferir - 0.15, T.b - 0.1);
  if (!st) return null;
  const passos = [
    {de: M.configuracoes - 0.1, texto: '⚙️ Configurações e atividade'},
    {de: M.status2 - 0.1, texto: '📍 Status da conta'},
  ];
  const tela = mola(t, M.status2 - 0.1, 12, 200);
  const marca = prog(t, M.qualificacao - 0.1, 0.5, saida);
  const verde = mola(t, M.verde - 0.1, 9, 260);
  const pulso = verde * Math.abs(Math.sin((t - M.verde) * 7));
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
        <Status w={760} marca={marca} pulso={pulso} style={{left: 160, top: 560}} />
      </div>
      <Carimbo t={t} de={M.problema - 0.1} cor={COR.verde} tamanho={38} rot={-4} style={{left: 140, top: 1120}}>VERDE = O PROBLEMA É OUTRO</Carimbo>
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>The Art Newspaper (2020) · blog do Instagram (2021)<br />TechCrunch (2022) · Instagram para criadores</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; a manchete é ilustrativa.</div>
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
      <Ano2020 t={t} />
      <Ano2021 t={t} />
      <Ano2022 t={t} />
      <Balanca t={t} />
      <Conferir t={t} />
      <LinhaTempo t={t} />
      <CardVoz t={t} />
      <CartaoFonte t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'swoosh', em: 0, volume: 0.5},
  {som: 'impacto', em: M.negou - 0.05, volume: 0.7},
  {som: 'risco', em: M.negou, volume: 0.4},
  {som: 'impacto', em: M.shadowban1 - 0.08, volume: 0.5},
  {som: 'whoosh_in', em: A0 - 0.1, volume: 0.45},
  {som: 'ding', em: M.mostra1 - 0.1, volume: 0.55},
  // Linha do tempo
  {som: 'impacto', em: M.ano2020 - 0.1, volume: 0.5},
  {som: 'impacto', em: M.umAno - 0.1, volume: 0.5},
  {som: 'impacto', em: M.ano2022 - 0.1, volume: 0.5},
  // 2020
  {som: 'pop', em: M.chefe - 0.1, volume: 0.4},
  {som: 'pop', em: M.disse - 0.1, volume: 0.45},
  {som: 'risco', em: M.shadowban2 - 0.15, volume: 0.45},
  // 2021
  {som: 'whoosh_in', em: M.blog - 0.15, volume: 0.4},
  {som: 'impacto', em: M.tom - 0.1, volume: 0.45},
  {som: 'tecla', em: M.admitiu - 0.05, volume: 0.4},
  {som: 'tecla', em: M.prometeu - 0.05, volume: 0.4},
  {som: 'ding', em: M.avisar - 0.1, volume: 0.45},
  // 2022
  {som: 'pop', em: M.promessa - 0.1, volume: 0.4},
  {som: 'swoosh', em: M.tela2 - 0.15, volume: 0.5},
  {som: 'ding', em: M.status1 - 0.05, volume: 0.55},
  // Balança
  {som: 'whoosh_in', em: M.entao - 0.15, volume: 0.4},
  {som: 'pop', em: M.dois - 0.1, volume: 0.45},
  {som: 'ding', em: M.segue2 - 0.15, volume: 0.4},
  {som: 'risco', em: M.parar - 0.15, volume: 0.45},
  {som: 'impacto', em: M.shadowban3 - 0.08, volume: 0.7},
  {som: 'swoosh', em: M.shadowban3 - 0.05, volume: 0.45},
  // Conferir
  {som: 'tecla', em: M.configuracoes - 0.1, volume: 0.45},
  {som: 'tecla', em: M.status2 - 0.1, volume: 0.45},
  {som: 'pop', em: M.qualificacao - 0.1, volume: 0.4},
  {som: 'ding', em: M.verde - 0.1, volume: 0.55},
  {som: 'impacto', em: M.problema - 0.1, volume: 0.45},
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
    // Até "criou" a abertura (manchete + NEGADO + SHADOWBAN) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.mostra1 - 0.4, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    // O fim do clipe A (4,91–5,03 s) fica artificial: sai um pouco antes do meio.
    {de: T.meio - 0.13, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [M.shadowban3 - 0.15, M.paraConferir - 0.15],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {negou: COR.vermelho, shadowban: COR.vermelho, existe: COR.vermelho, prometeu: COR.ciano, verde: COR.verde},
  eventos: EVENTOS,
  Cena,
};
