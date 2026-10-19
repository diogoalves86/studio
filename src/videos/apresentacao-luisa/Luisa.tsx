import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Risco, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 015 · A Luísa se apresenta e explica a marca d'água.
// Abertura com ela (nome + promessa "com fonte") → pergunta (baixa de outro app e reposta?) → linha do tempo
// 2021 (menos alcance pra quem não segue) → por quê (premiar quem cria; Mosseri 2022) → o Instagram procura pistas
// e a marca d'água é a mais óbvia → 2024 (o original substitui a cópia) → dica 1 (salvar antes) → dica 2 (qualidade)
// → fontes → CTA seguir.

const T = TRECHOS;
const M = {
  luisa: em('luísa'),
  digo1: em('digo'),
  toda1: em('toda'),
  dica1: em('dica'),
  fonte: em('fonte'),
  nada: em('nada'),
  achismo: em('achismo'),
  primeira1: em('primeira'),
  baixa: em('baixa'),
  video1: em('vídeo'),
  outro1: em('outro'),
  reposta: em('reposta'),
  ne: em('né'),
  desde: em('desde'),
  ano21: em('2021'),
  menos: em('menos'),
  marca1: em('marca'),
  seus: em('seus'),
  veem: em('veem'),
  quem1: em('quem', em('veem')),
  quase: em('quase'),
  motivo: em('motivo'),
  premiar: em('premiar'),
  cria: em('cria'),
  adam: em('adam'),
  original1: em('original'),
  vale: em('vale'),
  repostado: em('repostado'),
  so: em('só', em('repostado')),
  saber: em('saber'),
  quem2: em('quem', em('certeza')),
  procura: em('procura'),
  pistas: em('pistas'),
  marca2: em('marca', em('pistas')),
  pista: em('pista', em('pistas')),
  obvia: em('óbvia'),
  outro2: em('outro', em('óbvia')),
  em2024: em('em', em('lugar')),
  ano24: em('2024'),
  encontra: em('encontra'),
  copia: em('cópia'),
  recomenda: em('recomenda'),
  original2: em('original', em('recomenda')),
  entao2: em('então', em('recomenda')),
  primeira2: em('primeira', em('recomenda')),
  salva: em('salva'),
  celular: em('celular'),
  antes: em('antes'),
  publicar: em('publicar'),
  posta: em('posta'),
  original3: em('original', em('posta')),
  segunda: em('segunda'),
  capricha: em('capricha'),
  qualidade: em('qualidade'),
  resolucao: em('resolução'),
  tela: em('tela'),
  bordas: em('bordas'),
  segue2: em('segue', T.b),
  digo2: em('digo', T.b),
  toda2: em('toda', T.b),
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

const Titulo: React.FC<{t: number; de: number; cor?: string; top?: number; tamanho?: number; children: React.ReactNode}> = ({t, de, cor = COR.branco, top = 540, tamanho = 64, children}) => {
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

// Enquanto a Luísa está fora de cena, o card de voz mostra quem fala.
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
    <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${-4 + (1 - e) * 10}deg`}}>
      <Pilula cor={COR.ciano} tamanho={54} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">DICA {n}</Pilula>
    </div>
  );
};

// Tela de vídeo vertical genérica (o "Reels" dos exemplos). `marca` mostra a marca d'água de outro app (genérica, sem marca real).
const Video: React.FC<{w: number; marca?: number; pisca?: number; pixel?: number; bordas?: number; style?: React.CSSProperties}> = ({w, marca = 0, pisca = 0, pixel = 0, bordas = 0, style}) => {
  const h = w * 16 / 9;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: w * 0.09, border: `${w * 0.04}px solid #1B2238`, background: '#000', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.55)', ...style}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: `${bordas * 22}%`, bottom: `${bordas * 22}%`, background: 'linear-gradient(165deg, #FF9A62, #C2457A 55%, #4B2A7A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: w * 0.42, filter: pixel > 0 ? `blur(${pixel * w * 0.03}px) contrast(${1 + pixel * 0.4})` : undefined}}>
        🍰
      </div>
      {pixel > 0 && <div style={{position: 'absolute', inset: 0, opacity: pixel * 0.55, backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.35) 50%, transparent 50%), linear-gradient(0deg, rgba(0,0,0,.35) 50%, transparent 50%)', backgroundSize: `${w * 0.1}px ${w * 0.1}px`}} />}
      {marca > 0 && (
        <div style={{position: 'absolute', left: w * 0.06, bottom: h * 0.06, display: 'flex', alignItems: 'center', gap: w * 0.03, padding: `${w * 0.02}px ${w * 0.04}px`, borderRadius: 99, opacity: marca, background: pisca > 0 ? `rgba(255,77,94,${0.35 + 0.5 * pisca})` : 'rgba(0,0,0,.35)', boxShadow: pisca > 0 ? `0 0 ${30 * pisca}px ${COR.vermelho}` : undefined}}>
          <div style={{width: w * 0.09, height: w * 0.09, borderRadius: w * 0.025, background: 'linear-gradient(135deg, #9AA7C7, #E8ECF6)'}} />
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: w * 0.075, color: '#fff'}}>@outroapp</span>
        </div>
      )}
    </div>
  );
};

// ---------- Abertura (Luísa em tela cheia e em card) ----------

const Nome: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio) return null;
  const e = mola(t, M.luisa, 11, 210) * (1 - prog(t, M.toda1 - 0.2, 0.25));
  const sub = mola(t, M.digo1, 12, 200);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 64, top: 300, opacity: e, translate: `${(1 - e) * -80}px 0px`}}>
      <Pilula cor={COR.ciano} tamanho={64} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">LUÍSA</Pilula>
      <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, opacity: sub, translate: `0px ${(1 - sub) * 20}px`}}>
        <Img src={ARQ.logo} style={{width: 56, height: 56, borderRadius: 99}} />
        <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.branco, textShadow: '0 4px 20px rgba(0,0,0,.7)'}}>nova cara do <b style={{color: COR.ciano}}>@digo.social</b></span>
      </div>
    </div>
  );
};

// Com a Luísa em card (à direita), a promessa entra em cima e à esquerda.
const Promessa: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.toda1, T.meio - 0.1, 30);
  if (!st) return null;
  const selo = mola(t, M.fonte, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={78} style={{position: 'absolute', left: 64, width: 560, top: 300}} pecas={[{texto: '1 DICA', s: M.toda1}, {texto: 'DE INSTAGRAM', s: M.dica1 + 0.2, cor: COR.ciano, brilho: true}, {texto: 'POR SEMANA', s: M.dica1 + 0.4}]} />
      <div style={{position: 'absolute', left: 64, top: 640, opacity: selo, scale: String(interpolate(selo, [0, 1], [1.8, 1])), rotate: `${-5 + (1 - selo) * 10}deg`, transformOrigin: 'left center'}}>
        <Pilula cor={COR.verde} tamanho={48} fundo="rgba(8,40,30,.94)">📰 COM FONTE</Pilula>
      </div>
      {t >= M.nada - 0.05 && (
        <div style={{position: 'absolute', left: 64, top: 790, opacity: mola(t, M.nada, 12, 200)}}>
          <div style={{position: 'relative', display: 'inline-block', fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.cinza}}>
            ACHISMO
            <Risco t={t} de={M.achismo} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Pergunta: baixa de outro app e reposta ----------

const Pergunta: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, T.corpo - 0.1);
  if (!st) return null;
  const app = mola(t, M.baixa - 0.1, 12, 200);
  const desce = prog(t, M.video1, 0.6, saida);
  const marca = prog(t, M.outro1, 0.3);
  const posta = mola(t, M.reposta, 12, 200);
  const ne = mola(t, M.ne, 9, 240);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={T.meio + 0.1} top={440} tamanho={56}>BAIXOU DE <span style={{color: COR.amarelo}}>OUTRO APP</span> E REPOSTOU?</Titulo>
      {/* App genérico (sem marca real) de onde o vídeo sai. */}
      <div style={{position: 'absolute', left: 120, top: 640, width: 260, padding: 26, borderRadius: 36, ...caixa, opacity: app, scale: String(0.7 + 0.3 * app), textAlign: 'center'}}>
        <div style={{width: 130, height: 130, margin: '0 auto', borderRadius: 34, background: 'linear-gradient(135deg, #9AA7C7, #E8ECF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70}}>▶️</div>
        <div style={{marginTop: 14, fontFamily: MONT, fontWeight: 900, fontSize: 32, color: COR.cinza}}>OUTRO APP</div>
      </div>
      <Video w={300} marca={marca} style={{position: 'absolute', left: 630, top: 600 + (1 - desce) * 60, opacity: desce, rotate: `${(1 - desce) * -12}deg`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <path d="M 390 760 Q 500 660 620 720" fill="none" stroke={COR.amarelo} strokeWidth={8} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, M.video1, 0.4)} strokeLinecap="round" />
      </svg>
      {posta > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1180, display: 'flex', justifyContent: 'center', opacity: posta, translate: `0px ${(1 - posta) * 40}px`}}>
          <Pilula cor={COR.azul} tamanho={38} fundo="rgba(10,30,70,.94)">📲 POSTA NO INSTAGRAM</Pilula>
        </div>
      )}
      {ne > 0.01 && <div style={{position: 'absolute', left: 200, top: 1000, fontFamily: MONT, fontWeight: 900, fontSize: 200, color: COR.amarelo, opacity: ne, scale: String(interpolate(ne, [0, 1], [2, 1])), rotate: '-10deg', textShadow: '0 10px 40px rgba(0,0,0,.5)'}}>?</div>}
    </AbsoluteFill>
  );
};

// ---------- Linha do tempo 2021 → 2022 → 2024 (costura o porquê) ----------

const ANOS = [
  {ano: '2021', de: M.ano21},
  {ano: '2022', de: M.adam},
  {ano: '2024', de: M.ano24},
];

const LinhaDoTempo: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const e = mola(t, M.desde, 14, 180) * (1 - prog(t, M.entao2 - 0.2, 0.3));
  if (t < M.desde - 0.05 || e <= 0.01) return null;
  const ativo = ANOS.filter((a) => t >= a.de).length - 1;
  const preenche = interpolate(t, [M.ano21, M.adam, M.ano24], [0, 0.5, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 140, right: 140, top: 430, height: 80, opacity: e, translate: `0px ${(1 - e) * -30}px`}}>
      <div style={{position: 'absolute', left: 40, right: 40, top: 22, height: 8, borderRadius: 99, background: 'rgba(255,255,255,.15)'}} />
      <div style={{position: 'absolute', left: 40, top: 22, height: 8, borderRadius: 99, width: `calc((100% - 80px) * ${preenche})`, background: `linear-gradient(90deg, ${COR.azul}, ${COR.ciano})`, boxShadow: `0 0 20px ${COR.ciano}`}} />
      {ANOS.map((a, i) => {
        const on = mola(t, a.de, 10, 220);
        const atual = i === ativo;
        return (
          <div key={a.ano} style={{position: 'absolute', left: `calc(40px + (100% - 80px) * ${i / 2})`, top: 0, translate: '-50% 0', textAlign: 'center'}}>
            <div style={{width: 52, height: 52, margin: '0 auto', borderRadius: 99, background: on > 0.5 ? COR.ciano : '#2A3150', border: '4px solid #0A1430', boxShadow: on > 0.5 ? `0 0 ${30 * on}px ${COR.ciano}` : undefined, scale: String(1 + 0.25 * on * (atual ? 1 : 0))}} />
            <div style={{marginTop: 6, fontFamily: MONT, fontWeight: 900, fontSize: atual ? 40 : 32, color: on > 0.5 ? COR.branco : COR.cinza}}>{a.ano}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- 2021: menos alcance pra quem não te segue ----------

const Fato: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.desde, M.motivo - 0.15);
  if (!st) return null;
  const video = mola(t, M.menos - 0.1, 12, 200) * (1 - prog(t, M.seus - 0.2, 0.3));
  const alcance = mola(t, M.seus - 0.1, 13, 190);
  const dentro = mola(t, M.veem - 0.1, 10, 220);
  const fora = prog(t, M.quase, 0.3);
  return (
    <AbsoluteFill style={st}>
      {t < M.seus && <Titulo t={t} de={M.menos} top={560} tamanho={58}>MARCA D'ÁGUA = <span style={{color: COR.vermelho}}>MENOS ALCANCE</span></Titulo>}
      {video > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 730, display: 'flex', justifyContent: 'center', opacity: video}}>
          <Video w={270} marca={prog(t, M.marca1, 0.3)} pisca={Math.abs(Math.sin(t * 6)) * prog(t, M.marca1, 0.3)} />
        </div>
      )}
      {alcance > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 590, height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: alcance, scale: String(0.8 + 0.2 * alcance)}}>
          {/* Anel de fora: quem não te segue (fica apagado). */}
          <div style={{position: 'absolute', width: 560, height: 560, borderRadius: 999, border: `6px dashed ${fora > 0.5 ? COR.vermelho : 'rgba(255,255,255,.35)'}`, background: 'rgba(255,77,94,.06)'}} />
          <div style={{position: 'absolute', top: 6, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: fora > 0.5 ? COR.vermelho : COR.cinza, textAlign: 'center', lineHeight: 1.1}}>QUEM NÃO TE SEGUE {fora > 0.5 ? '✕' : ''}</div>
          {/* Círculo de dentro: seguidores (acende). */}
          <div style={{width: 300, height: 300, borderRadius: 999, background: dentro > 0.5 ? 'radial-gradient(circle, rgba(46,229,157,.45), rgba(46,229,157,.12))' : 'rgba(255,255,255,.06)', border: `6px solid ${dentro > 0.5 ? COR.verde : 'rgba(255,255,255,.3)'}`, boxShadow: dentro > 0.5 ? `0 0 ${50 * dentro}px rgba(46,229,157,.5)` : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco, lineHeight: 1.1}}>
            SEUS<br />SEGUIDORES<br />{dentro > 0.5 ? '✓' : ''}
          </div>
        </div>
      )}
      <Fonte t={t} de={M.desde + 0.2} ate={M.motivo} veiculo="Tubefilter" titulo="Instagram deixa menos visíveis os Reels com marca d'água (2021)" />
    </AbsoluteFill>
  );
};

// ---------- O motivo: premiar quem cria ----------

const Motivo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.motivo - 0.15, M.adam - 0.15, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <Palavras t={t} tamanho={74} style={{position: 'absolute', top: 640, textAlign: 'center', color: COR.cinza}} pecas={[{texto: 'O MOTIVO?', s: M.motivo, cor: COR.cinza}]} />
      <Palavras t={t} tamanho={130} style={{position: 'absolute', top: 800, textAlign: 'center', lineHeight: 1}} pecas={[{texto: 'PREMIAR', s: M.premiar}, {texto: 'QUEM', s: M.premiar + 0.4, cor: COR.ciano, brilho: true}, {texto: 'CRIA', s: M.cria, cor: COR.ciano, brilho: true}]} />
      <div style={{position: 'absolute', top: 1110, fontSize: 120, opacity: prog(t, M.cria, 0.3), scale: String(0.6 + 0.4 * prog(t, M.cria, 0.3))}}>🏆</div>
    </AbsoluteFill>
  );
};

// ---------- 2022: Mosseri, original vale mais que repost ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.adam - 0.15, M.so - 0.15);
  if (!st) return null;
  const card = mola(t, M.adam - 0.1, 12, 200);
  const orig = prog(t, M.original1, 0.6, saida);
  const rep = prog(t, M.repostado, 0.6, saida);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 560, display: 'flex', alignItems: 'center', gap: 26, padding: 22, borderRadius: 30, ...caixa, opacity: card, translate: `0px ${(1 - card) * 40}px`}}>
        <Img src={ARQ.mosseri} style={{width: 150, height: 150, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', border: `4px solid ${COR.ciano}`}} />
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>Adam Mosseri</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.ciano}}>chefe do Instagram</div>
          <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 500, fontSize: 18, color: COR.cinza}}>Foto: Anthony Quintano · CC BY 2.0</div>
        </div>
      </div>
      {/* Barras ORIGINAL × REPOST: o original vale mais. */}
      <div style={{position: 'absolute', left: 170, right: 170, top: 800, height: 400, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 90}}>
        {[{nome: 'ORIGINAL', cor: COR.verde, h: 360 * orig, s: M.original1, icone: '✨'}, {nome: 'REPOST', cor: COR.vermelho, h: 110 * rep, s: M.repostado, icone: '🔁'}].map((b) => (
          <div key={b.nome} style={{width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: mola(t, b.s - 0.1, 12, 200)}}>
            <div style={{fontSize: 60, marginBottom: 8}}>{b.icone}</div>
            <div style={{width: '100%', height: Math.max(8, b.h), borderRadius: 20, background: `linear-gradient(180deg, ${b.cor}, ${b.cor}88)`, boxShadow: `0 0 30px ${b.cor}66`}} />
            <div style={{marginTop: 12, fontFamily: MONT, fontWeight: 900, fontSize: 38, color: b.cor}}>{b.nome}</div>
          </div>
        ))}
      </div>
      <Fonte t={t} de={M.adam} ate={M.so} veiculo="Tubefilter" titulo="Instagram muda o algoritmo para promover conteúdo original (2022)" />
    </AbsoluteFill>
  );
};

// ---------- O Instagram procura pistas; a marca d'água é a mais óbvia ----------

const Pistas: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.so - 0.15, M.em2024 - 0.15);
  if (!st) return null;
  const autor = mola(t, M.quem2 - 0.1, 10, 220);
  const busca = prog(t, M.procura, 0.2);
  const achou = prog(t, M.marca2, 0.35, saida);
  // A lupa varre o vídeo até achar a marca d'água (canto de baixo).
  const ang = (t - M.procura) * 3.2;
  const vx = 540 + 150 * Math.cos(ang) * (1 - achou) + (-95) * achou;
  const vy = 900 + 260 * Math.sin(ang * 0.8) * (1 - achou) + 380 * achou;
  const pisca = achou * Math.abs(Math.sin(t * 7));
  const pista = mola(t, M.pista, 10, 230);
  const fora = mola(t, M.outro2, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.saber - 0.2} top={560} tamanho={52}>QUEM CRIOU ESSE VÍDEO?</Titulo>
      <div style={{position: 'absolute', left: 0, right: 0, top: 680, display: 'flex', justifyContent: 'center'}}>
        <Video w={330} marca={1} pisca={pisca} />
      </div>
      {autor > 0.01 && <div style={{position: 'absolute', left: 700, top: 690, width: 110, height: 110, borderRadius: 99, background: '#2A3150', border: '4px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.amarelo, opacity: autor * (1 - achou), scale: String(0.6 + 0.4 * autor)}}>?</div>}
      {busca > 0.01 && <div style={{position: 'absolute', left: vx - 90, top: vy - 90, fontSize: 180, opacity: busca, rotate: '-15deg', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,.6))'}}>🔍</div>}
      {pista > 0.01 && (
        <div style={{position: 'absolute', left: 140, top: 1150, opacity: pista, scale: String(interpolate(pista, [0, 1], [1.8, 1])), rotate: `${-6 + (1 - pista) * 12}deg`}}>
          <Pilula cor={COR.vermelho} tamanho={50} fundo="rgba(60,10,20,.94)">🚩 PISTA</Pilula>
        </div>
      )}
      {fora > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1270, textAlign: 'center', opacity: fora, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>
          VEIO DE <span style={{color: COR.vermelho}}>OUTRO LUGAR</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 2024: o original substitui a cópia ----------

const Substitui: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.em2024 - 0.15, M.entao2 - 0.15);
  if (!st) return null;
  const cards = mola(t, M.encontra - 0.2, 12, 200);
  const copia = mola(t, M.copia, 10, 230);
  const sai = prog(t, M.recomenda, 0.6, saida);
  const sobe = prog(t, M.recomenda + 0.2, 0.6, saida);
  const ok = mola(t, M.original2, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.ano24} top={560} tamanho={56}>A CÓPIA <span style={{color: COR.vermelho}}>SAI</span>, O ORIGINAL <span style={{color: COR.verde}}>ENTRA</span></Titulo>
      <div style={{position: 'absolute', left: 0, right: 0, top: 660, height: 600, opacity: cards}}>
        {/* Cópia (com marca d'água) é arrastada para fora. */}
        <div style={{position: 'absolute', left: 150 - 700 * sai, top: 0, rotate: `${-6 - 20 * sai}deg`, opacity: 1 - sai * 0.8, textAlign: 'center'}}>
          <Video w={240} marca={1} />
          {copia > 0.01 && <div style={{marginTop: 14, opacity: copia}}><Pilula cor={COR.vermelho} tamanho={34} fundo="rgba(60,10,20,.94)">🔁 CÓPIA</Pilula></div>}
        </div>
        {/* Original sobe para o centro. */}
        <div style={{position: 'absolute', left: 670 - 260 * sobe, top: 40 - 40 * sobe, rotate: `${6 * (1 - sobe)}deg`, scale: String(1 + 0.15 * sobe), textAlign: 'center'}}>
          <Video w={240} style={{boxShadow: sobe > 0.5 ? `0 0 60px rgba(46,229,157,.6)` : undefined}} />
          <div style={{marginTop: 14}}><Pilula cor={COR.verde} tamanho={34} fundo="rgba(8,40,30,.94)">✨ ORIGINAL{ok > 0.5 ? ' ✓' : ''}</Pilula></div>
        </div>
      </div>
      <Toque t={t} de={M.recomenda - 0.5} toque={M.recomenda} x={220} y={1000} />
      <Fonte t={t} de={M.ano24} ate={M.entao2} top={1275} veiculo="Gigazine" titulo="Instagram passa a priorizar conteúdo original (2024)" />
    </AbsoluteFill>
  );
};

// ---------- Dica 1: salva antes de publicar no outro app ----------

const PASSOS = [
  {n: 1, texto: 'EDITA O VÍDEO', icone: '✂️'},
  {n: 2, texto: 'SALVA NO CELULAR', icone: '💾'},
  {n: 3, texto: 'POSTA ESSE ARQUIVO', icone: '📲'},
];

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.entao2 - 0.15, M.segunda - 0.15);
  if (!st) return null;
  const tempos = [M.primeira2 + 0.3, M.salva, M.posta];
  const destaque = t >= M.salva && t < M.posta ? 1 : t >= M.posta ? 2 : -1;
  const ok = mola(t, M.original3, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira2} n={1} />
      <div style={{position: 'absolute', left: 110, right: 110, top: 580, display: 'flex', flexDirection: 'column', gap: 26}}>
        {PASSOS.map((p, i) => {
          const e = mola(t, tempos[i], 12, 200);
          const on = destaque === i;
          return (
            <div key={p.n} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '24px 28px', borderRadius: 30, ...caixa, border: `4px solid ${on ? COR.ciano : 'rgba(62,198,255,.25)'}`, boxShadow: on ? `0 0 50px rgba(62,198,255,.45)` : caixa.boxShadow, opacity: e, translate: `${(1 - e) * 80}px 0px`, scale: String(on ? 1.04 : 1)}}>
              <div style={{width: 80, height: 80, borderRadius: 99, background: on ? COR.ciano : '#2A3150', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 42, color: on ? COR.marinho : COR.branco}}>{p.n}</div>
              <div style={{fontSize: 56}}>{p.icone}</div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: COR.branco}}>{p.texto}</div>
            </div>
          );
        })}
      </div>
      {t >= M.antes - 0.05 && t < M.posta && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1110, textAlign: 'center', opacity: mola(t, M.antes, 12, 200), fontFamily: INTER, fontWeight: 800, fontSize: 36, color: COR.amarelo}}>
          ⚠️ antes de publicar no outro app
        </div>
      )}
      {ok > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1100, display: 'flex', justifyContent: 'center', opacity: ok, scale: String(interpolate(ok, [0, 1], [1.8, 1])), rotate: `${-4 + (1 - ok) * 10}deg`}}>
          <Pilula cor={COR.verde} tamanho={52} fundo="rgba(8,40,30,.94)">✓ ARQUIVO ORIGINAL</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Dica 2: qualidade (resolução, tela cheia, sem bordas) ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, T.b - 0.1);
  if (!st) return null;
  const itens = [
    {nome: 'BOA RESOLUÇÃO', s: M.resolucao, ruim: {pixel: 1}, bom: {}},
    {nome: 'TELA CHEIA 9:16', s: M.tela, ruim: {bordas: 1}, bom: {}},
    {nome: 'SEM BORDAS', s: M.bordas, ruim: {bordas: 0.6}, bom: {}},
  ];
  const entra = mola(t, M.capricha, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Titulo t={t} de={M.capricha} top={560} tamanho={60}>CAPRICHA NA <span style={{color: COR.ciano}}>QUALIDADE</span></Titulo>
      <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', gap: 34, opacity: entra}}>
        {itens.map((it) => {
          const vira = prog(t, it.s, 0.4, saida);
          return (
            <div key={it.nome} style={{width: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
              <Video w={230} pixel={(it.ruim as {pixel?: number}).pixel ? 1 - vira : 0} bordas={(it.ruim as {bordas?: number}).bordas ? ((it.ruim as {bordas?: number}).bordas ?? 0) * (1 - vira) : 0} />
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 26, color: vira > 0.5 ? COR.verde : COR.vermelho, textAlign: 'center'}}>
                {vira > 0.5 ? '✓' : '✕'} {it.nome}
              </div>
            </div>
          );
        })}
      </div>
      <Fonte t={t} de={M.capricha} ate={T.b} veiculo="Instagram (Adam Mosseri)" titulo="Como funciona o ranking do Instagram (2023)" />
    </AbsoluteFill>
  );
};

// ---------- Fechamento: fontes + seguir ----------

const B1 = M.segue2 - 0.15;
const B2 = M.toda2 - 0.12;

const FONTES = [
  'Tubefilter · fev/2021 e abr/2022',
  'Instagram (Adam Mosseri) · mai/2023',
  'Gigazine · mai/2024',
];

const CartaoFontes: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.b, B1 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 820, padding: '34px 40px', borderRadius: 36, ...caixa, marginTop: -260}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>📰 FONTES</div>
        {FONTES.map((f, i) => (
          <div key={f} style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco, padding: '10px 0', borderTop: i ? '1px solid rgba(255,255,255,.12)' : undefined, opacity: mola(t, T.b + 0.1 + i * 0.15, 12, 220)}}>{f}</div>
        ))}
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
        <BotaoSeguir seguindo={t >= M.digo2 + 0.05} pop={mola(t, M.digo2 + 0.05, 9, 260)} />
      </div>
      <Toque t={t} de={B1 + 0.1} toque={M.digo2} x={840} y={1170} />
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
      <Oi t={t} />
      <Nome t={t} />
      <Promessa t={t} />
      <Pergunta t={t} />
      <LinhaDoTempo t={t} />
      <Fato t={t} />
      <Motivo t={t} />
      <Mosseri t={t} />
      <Pistas t={t} />
      <Substitui t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <CardVoz t={t} />
      <CartaoFontes t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'pop', em: M.luisa, volume: 0.5},
  {som: 'pop', em: M.digo1, volume: 0.35},
  {som: 'pop', em: M.toda1, volume: 0.4},
  {som: 'impacto', em: M.fonte, volume: 0.45},
  {som: 'risco', em: M.achismo, volume: 0.45},
  // Pergunta
  {som: 'pop', em: M.baixa - 0.1, volume: 0.4},
  {som: 'swoosh', em: M.video1, volume: 0.4},
  {som: 'pop', em: M.outro1, volume: 0.35},
  {som: 'pop', em: M.reposta, volume: 0.4},
  {som: 'impacto', em: M.ne, volume: 0.45},
  // 2021
  {som: 'ding', em: M.ano21, volume: 0.45},
  {som: 'impacto', em: M.menos, volume: 0.45},
  {som: 'whoosh_in', em: M.seus - 0.2, volume: 0.4},
  {som: 'ding', em: M.veem, volume: 0.4},
  {som: 'risco', em: M.quase, volume: 0.4},
  // Motivo
  {som: 'pop', em: M.motivo, volume: 0.45},
  {som: 'impacto', em: M.premiar, volume: 0.5},
  {som: 'ding', em: M.cria, volume: 0.45},
  // 2022
  {som: 'ding', em: M.adam, volume: 0.45},
  {som: 'whoosh_in', em: M.original1 - 0.1, volume: 0.35},
  {som: 'whoosh_out', em: M.repostado, volume: 0.35},
  // Pistas
  {som: 'pop', em: M.quem2, volume: 0.4},
  ...passos(M.procura, M.marca2, 6).map((s): Evento => ({som: 'tique', em: s, volume: 0.25})),
  {som: 'impacto', em: M.marca2 + 0.2, volume: 0.5},
  {som: 'risco', em: M.pista, volume: 0.4},
  // 2024
  {som: 'ding', em: M.ano24, volume: 0.45},
  {som: 'pop', em: M.copia, volume: 0.4},
  {som: 'toque', em: M.recomenda, volume: 0.6},
  {som: 'swoosh', em: M.recomenda + 0.05, volume: 0.45},
  {som: 'ding', em: M.original2, volume: 0.5},
  // Dica 1
  {som: 'impacto', em: M.primeira2, volume: 0.5},
  {som: 'pop', em: M.primeira2 + 0.3, volume: 0.35},
  {som: 'pop', em: M.salva, volume: 0.4},
  {som: 'pop', em: M.posta, volume: 0.4},
  {som: 'ding', em: M.original3, volume: 0.5},
  // Dica 2
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'ding', em: M.resolucao + 0.2, volume: 0.4},
  {som: 'ding', em: M.tela + 0.2, volume: 0.4},
  {som: 'ding', em: M.bordas + 0.2, volume: 0.4},
  // CTA
  {som: 'pop', em: T.b + 0.1, volume: 0.4},
  {som: 'swoosh', em: B1, volume: 0.4},
  {som: 'toque', em: M.digo2, volume: 0.7},
  {som: 'ding', em: M.digo2 + 0.05, volume: 0.5},
  {som: 'impacto', em: B2, volume: 0.5},
];

// Legenda: o Whisper separa "d" e "'água"; juntamos em "D'ÁGUA".
const LEGENDA = PALAVRAS.reduce<typeof PALAVRAS>((acc, p) => {
  const ant = acc[acc.length - 1];
  if (ant && ant.w === 'd' && p.w.startsWith("'")) acc[acc.length - 1] = {w: `d${p.w}`, s: ant.s, e: p.e};
  else acc.push(p);
  return acc;
}, []);

// Alternância da Luísa na abertura (ajustada pelos momentos artificiais de sincronia.md):
// 0,79–1,19 s («Eu» congelado) fica coberto pelo "OI! 👋"; 5,05–5,23 e 6,89–7,52 caem no card.
const A0 = 0.7;
const A1 = 1.25;
const A2 = M.toda1 - 0.1;

const Oi: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, A0, A1 - 0.05, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <Palavras t={t} tamanho={170} style={{textAlign: 'center'}} pecas={[{texto: 'OI!', s: A0, cor: COR.ciano, brilho: true}, {texto: '👋', s: A0 + 0.15}]} />
    </AbsoluteFill>
  );
};

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: A0, modo: 'fora'},
    {de: A1, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: A2, modo: 'card'},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [A0, A1],
    [M.toda1, T.meio],
    [M.motivo, M.adam],
    [M.primeira2, M.segunda],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {"d'água.": COR.vermelho, "d'água": COR.vermelho, achismo: COR.vermelho},
  eventos: EVENTOS,
  Cena,
};
