import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 013 · Medo de postar e flopar? Usa o Reels de teste.
// Argumento: o próprio Instagram admite o medo (Meta, dez/2024) → o Reels de teste vai primeiro só pra quem não
// te segue → COMO PUBLICAR (tutorial animado, destaque do vídeo) → o que você vê em 24 h → por que importa (quem não
// te segue é quem faz crescer) → dica 1 (testa a abertura) → dica 2 (tempo assistido e envios; teste com teste).

const T = TRECHOS;
const M = {
  flopar: em('flopar'),
  proprio: em('próprio'),
  quando: em('quando'),
  admitiu: em('admitiu'),
  muita: em('muita'),
  nervosa: em('nervosa'),
  medo2: em('medo', em('muita')),
  agradar: em('agradar'),
  segue1: em('segue', em('agradar') - 0.3),
  saida2: em('saída', em('segue', em('agradar') - 0.3)),
  chama: em('chama'),
  reels1: em('reels', em('chama')),
  teste1: em('teste', em('chama')),
  aparece: em('aparece'),
  so: em('só', em('aparece')),
  nao1: em('não', em('aparece')),
  nem: em('nem', em('aparece')),
  perfil1: em('perfil'),
  so2: em('só', em('perfil')),
  detalhe: em('detalhe'),
  libera: em('libera'),
  duzentos: em('200'),
  seguidores: em('seguidores', em('200') - 0.1),
  confere: em('confere'),
  ferramentas: em('ferramentas'),
  pra: em('pra', em('conta', em('ferramentas'))),
  facil: em('fácil'),
  toca1: em('toca'),
  mais1: em('mais', em('toca')),
  escolhe: em('escolhe'),
  monta: em('monta'),
  normal: em('normal'),
  ultima: em('última'),
  antes: em('antes'),
  liga: em('liga'),
  teste2: em('teste', em('liga')),
  se: em('se', em('liga')),
  sozinho: em('sozinho'),
  bem1: em('bem', em('sozinho')),
  compartilha: em('compartilha'),
  em24: em('em', em('compartilha')),
  horas: em('horas'),
  abre: em('abre'),
  rascunhos: em('rascunhos'),
  visualizacoes: em('visualizações'),
  curtidas: em('curtidas'),
  comentarios: em('comentários'),
  compartilhamentos: em('compartilhamentos'),
  foi1: em('foi', em('compartilhamentos')),
  toca2: em('toca', em('compartilhamentos')),
  todos: em('todos'),
  foi2: em('foi', em('todos')),
  mal: em('mal'),
  quem2: em('quem', em('mal')),
  feed: em('feed'),
  repara: em('repara'),
  justamente: em('justamente'),
  crescer: em('crescer'),
  dica1: em('dica'),
  testa: em('testa'),
  abertura: em('abertura'),
  grava: em('grava'),
  dois: em('dois'),
  diferentes: em('diferentes'),
  posta2: em('posta', em('diferentes')),
  segurou: em('segurou'),
  dica2: em('dica', em('segurou')),
  curtida: em('curtida'),
  tempo: em('tempo'),
  assistido: em('assistido'),
  quantas: em('quantas'),
  mandaram: em('mandaram'),
  compara: em('compara'),
  manda: em('manda', T.b - 0.3),
  postar2: em('postar', T.b),
  segue2: em('segue', T.b),
  digo: em('digo'),
  toda: em('toda'),
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

const Titulo: React.FC<{t: number; de: number; cor?: string; top?: number; tamanho?: number; children: React.ReactNode}> = ({t, de, cor = COR.branco, top = 430, tamanho = 64, children}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: tamanho, color: cor, opacity: e, scale: String(0.7 + 0.3 * e), textShadow: '0 8px 30px rgba(0,0,0,.5)'}}>
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
        <Img src={ARQ.avatar} style={{width: 124, height: 124, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 18%'}} />
      </div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>Digo</div>
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
    <div style={{position: 'absolute', left: 0, right: 0, top: 425, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${-4 + (1 - e) * 10}deg`}}>
      <Pilula cor={COR.ciano} tamanho={54} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">DICA {n}</Pilula>
    </div>
  );
};

const SeloMosseri: React.FC<{t: number; de: number; ate: number; top?: number}> = ({t, de, ate, top = 520}) => {
  const mola = useMola();
  const e = mola(t, de, 13, 200) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', opacity: e}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 26px 10px 10px', borderRadius: 999, background: 'rgba(8,16,40,.9)', border: '2px solid rgba(255,255,255,.2)'}}>
        <Img src={ARQ.mosseri} style={{width: 70, height: 70, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%'}} />
        <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza}}>segundo <b style={{color: COR.branco}}>Adam Mosseri</b>, chefe do Instagram</span>
      </div>
    </div>
  );
};

const Interruptor: React.FC<{on: number; escala?: number}> = ({on, escala = 1}) => (
  <div style={{width: 76 * escala, height: 44 * escala, borderRadius: 99, background: on > 0.5 ? COR.azul : '#3A4260', position: 'relative', flexShrink: 0, boxShadow: on > 0.5 ? `0 0 ${24 * on}px ${COR.azul}` : undefined}}>
    <div style={{position: 'absolute', top: 4 * escala, left: (4 + 32 * on) * escala, width: 36 * escala, height: 36 * escala, borderRadius: 99, background: '#fff'}} />
  </div>
);

// ---------- Abertura ----------

const Gancho: React.FC<{t: number}> = ({t}) => {
  if (t >= T.meio + 0.1) return null;
  const sai = prog(t, T.meio - 0.15, 0.25);
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: 240, padding: '14px 10px', borderRadius: 26, background: 'rgba(5,10,30,.62)', border: '3px solid rgba(62,198,255,.6)', opacity: 1 - sai, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46, lineHeight: 1.08, color: COR.branco}}>
      MEDO DE <span style={{color: COR.vermelho}}>FLOPAR?</span> 🙈
    </div>
  );
};

// Cobre os momentos artificiais de A (1,40–1,62 «posta com medo», 2,28–2,81 «flopar, né? O»).
const A1 = 1.38;
const A2 = 2.84;
const A3 = 5.27;

const GanchoMotion: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, A1, A2 - 0.05, 0);
  if (!st) return null;
  const dedo = interpolate(t, [A1, A2], [0, 1], clamp);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <Palavras t={t} tamanho={120} style={{position: 'absolute', top: 470, textAlign: 'center'}} pecas={[{texto: 'MEDO DE', s: A1}, {texto: 'FLOPAR? 🙈', s: M.flopar, cor: COR.vermelho, brilho: true}]} />
      <div style={{position: 'absolute', top: 800, width: 560, padding: 30, borderRadius: 34, ...caixa, opacity: mola(t, A1 + 0.1, 12, 200)}}>
        <div style={{height: 260, borderRadius: 20, background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120}}>🍫</div>
        <div style={{marginTop: 20, padding: '18px 0', borderRadius: 16, textAlign: 'center', background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 34, color: '#fff'}}>Compartilhar</div>
      </div>
      {/* O dedo chega perto do botão e recua (hesitação). */}
      <div style={{position: 'absolute', left: 600, top: 1090 + 60 * Math.sin(dedo * Math.PI * 2.5) + 40 * dedo, fontSize: 110, rotate: '-10deg', opacity: prog(t, A1 + 0.2, 0.2)}}>👆</div>
    </AbsoluteFill>
  );
};

// ---------- 1. O próprio Instagram admitiu ----------

const Admitiu: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.saida2 - 0.15);
  if (!st) return null;
  const recorte = mola(t, M.admitiu - 0.1, 11, 190);
  const traducao = mola(t, M.muita, 12, 200);
  const rascunhos = mola(t, M.medo2 - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quando} tamanho={50}>O PRÓPRIO INSTAGRAM <span style={{color: COR.ciano}}>ADMITIU</span></Titulo>
      {recorte > 0.01 && (
        <div style={{position: 'absolute', left: 110, right: 110, top: 540, padding: '34px 40px', background: '#F3EFE6', borderRadius: 6, boxShadow: '0 30px 80px rgba(0,0,0,.6)', rotate: `${-2.5 + (1 - recorte) * -8}deg`, scale: String(0.7 + 0.3 * recorte), opacity: recorte, clipPath: 'polygon(0 2%, 4% 0, 12% 2%, 22% 0, 35% 2%, 50% 0, 63% 2%, 78% 0, 90% 2%, 100% 0, 100% 98%, 92% 100%, 80% 98%, 66% 100%, 52% 98%, 38% 100%, 24% 98%, 10% 100%, 0 98%)'}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#8A7F6A', letterSpacing: 3}}>META · NEWSROOM · DEZ/2024</div>
          <div style={{marginTop: 14, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 46, lineHeight: 1.2, color: '#1A1A1A'}}>
            “creators… feel <span style={{background: 'rgba(255,210,94,.7)', padding: '0 6px'}}>nervous about posting</span> too much”
          </div>
          <div style={{marginTop: 18, fontFamily: INTER, fontWeight: 700, fontSize: 30, color: '#4A4030', opacity: traducao}}>
            criadores ficam nervosos de postar demais, com medo de não agradar quem já segue
          </div>
        </div>
      )}
      {rascunhos > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1040, display: 'flex', justifyContent: 'center', gap: 18, opacity: rascunhos}}>
          {['🍫', '🧁', '🎂', '🍰'].map((e, i) => {
            const k = mola(t, M.medo2 + i * 0.12, 12, 220);
            return (
              <div key={i} style={{width: 120, height: 170, borderRadius: 18, background: 'linear-gradient(170deg, #3A3F5C, #1E2238)', border: '3px dashed rgba(255,255,255,.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, scale: String(0.6 + 0.4 * k), opacity: k, rotate: `${(i - 1.5) * 4}deg`}}>
                <div style={{fontSize: 56, filter: 'grayscale(.6)'}}>{e}</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 16, color: COR.cinza}}>rascunho</div>
              </div>
            );
          })}
          <div style={{alignSelf: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.vermelho, marginLeft: 10, lineHeight: 1.1}}>NUNCA<br />POSTADOS 🙈</div>
        </div>
      )}
      <Fonte t={t} de={M.admitiu} ate={M.saida2} veiculo="Meta (newsroom oficial)" titulo="Trial reels, dez/2024" />
    </AbsoluteFill>
  );
};

// ---------- 2. A saída: Reels de teste vai primeiro pra quem não te segue ----------

const Rosto: React.FC<{emoji: string; cor: string; tam?: number; style?: React.CSSProperties}> = ({emoji, cor, tam = 80, style}) => (
  <div style={{width: tam, height: tam, borderRadius: 99, background: cor, border: '3px solid rgba(255,255,255,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: tam * 0.5, ...style}}>{emoji}</div>
);

const NOVOS = [
  {e: '👩', c: '#3A6B5A'}, {e: '🧔', c: '#5A4A3A'}, {e: '👱‍♀️', c: '#3A5A6B'}, {e: '🧑', c: '#4A3A6B'}, {e: '👩‍🦱', c: '#6B3A5A'}, {e: '🧑‍🦰', c: '#3A4A6B'},
];

const Saida: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.saida2 - 0.15, M.so2 - 0.15);
  if (!st) return null;
  const selo = mola(t, M.reels1 - 0.1, 10, 230);
  const fluxo = mola(t, M.aparece, 12, 200) * (1 - prog(t, M.nem - 0.1, 0.25));
  const voa = prog(t, M.aparece + 0.1, 0.8, saida);
  const bloqueio = mola(t, M.nao1, 10, 230);
  const grade = mola(t, M.nem, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: selo, scale: String(interpolate(selo, [0, 1], [1.8, 1])), rotate: `${-3 + (1 - selo) * 10}deg`}}>
        <Pilula cor={COR.ciano} tamanho={64} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">🧪 REELS DE TESTE</Pilula>
      </div>
      {fluxo > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 580, height: 620, opacity: fluxo}}>
          <div style={{position: 'absolute', left: 430, top: 0, width: 220, height: 360, borderRadius: 30, border: '8px solid #1B2238', background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90}}>
            🍫
            <div style={{position: 'absolute', top: 10, right: 10, padding: '2px 10px', borderRadius: 10, background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 18, color: '#fff'}}>🧪</div>
          </div>
          {/* Pra quem NÃO segue (esquerda, recebe o vídeo) */}
          <div style={{position: 'absolute', left: 50, top: 380, width: 400, padding: 20, borderRadius: 28, ...caixa, border: `4px solid ${COR.verde}`}}>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
              {NOVOS.map((n, i) => <Rosto key={i} emoji={n.e} cor={n.c} tam={64} style={{opacity: prog(t, M.aparece + 0.3 + i * 0.08, 0.2)}} />)}
            </div>
            <div style={{marginTop: 12, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.verde}}>🆕 QUEM NÃO TE SEGUE ✓</div>
          </div>
          {/* Seguidores (direita, ficam de fora) */}
          <div style={{position: 'absolute', left: 630, top: 380, width: 400, padding: 20, borderRadius: 28, ...caixa, border: `4px solid ${bloqueio > 0.5 ? COR.vermelho : 'rgba(255,255,255,.2)'}`, opacity: 0.5 + 0.5 * bloqueio}}>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', filter: `grayscale(${bloqueio})`}}>
              {NOVOS.map((n, i) => <Rosto key={i} emoji={n.e} cor="#2A3150" tam={64} />)}
            </div>
            <div style={{marginTop: 12, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.vermelho}}>🤝 SEGUIDORES 🚫</div>
          </div>
          {/* O vídeo voando pro grupo da esquerda */}
          {voa > 0 && voa < 1 && <div style={{position: 'absolute', left: 520 - 300 * voa, top: 180 + 260 * voa - Math.sin(voa * Math.PI) * 120, fontSize: 70}}>🎬</div>}
          <svg width={1080} height={620} style={{position: 'absolute', left: 0, top: 0}}>
            <path d="M 500 360 Q 380 380 260 390" fill="none" stroke={COR.verde} strokeWidth={8} strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - prog(t, M.aparece, 0.5)} strokeLinecap="round" />
          </svg>
        </div>
      )}
      {grade > 0.01 && (
        <div style={{position: 'absolute', left: 190, right: 190, top: 600, padding: 24, borderRadius: 30, ...caixa, opacity: grade, scale: String(0.8 + 0.2 * grade)}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.branco, marginBottom: 14}}>👤 docesdaana · grade do perfil</div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8}}>
            <div style={{aspectRatio: '3 / 4', borderRadius: 10, border: `4px dashed ${COR.ciano}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(62,198,255,.08)', opacity: 0.6 + 0.4 * Math.abs(Math.sin(t * 4))}}>
              <div style={{fontSize: 46}}>🧪</div>
              <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 18, color: COR.ciano}}>em teste</div>
            </div>
            {['🧁', '🎂', '🍰', '🍩', '🍪'].map((e) => (
              <div key={e} style={{aspectRatio: '3 / 4', borderRadius: 10, background: 'linear-gradient(170deg, #5A3A2E, #2B1A14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56}}>{e}</div>
            ))}
          </div>
          <div style={{marginTop: 14, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.cinza}}>NEM NO SEU PERFIL ELE FICA</div>
        </div>
      )}
      <Fonte t={t} de={M.aparece} ate={M.so2} veiculo="Instagram for Creators" titulo="Trial reels (blog oficial)" />
    </AbsoluteFill>
  );
};

// ---------- 2b. Só um detalhe: libera com 200 seguidores (tela real do app, recriada do print do Diogo) ----------

const ItemFerramenta: React.FC<{icone: string; nome: string; sub?: string; apagado?: boolean; brilho?: number}> = ({icone, nome, sub, apagado, brilho = 0}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '14px 20px', borderRadius: 14, background: brilho ? `rgba(62,198,255,${0.2 * brilho})` : 'transparent', boxShadow: brilho ? `0 0 0 ${3 * brilho}px ${COR.ciano}, 0 0 ${40 * brilho}px ${COR.ciano}88` : undefined}}>
    <span style={{fontSize: 30, opacity: apagado ? 0.45 : 1}}>{icone}</span>
    <div style={{flex: 1}}>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: apagado ? '#7C8499' : '#fff'}}>{nome}</div>
      {sub && <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 21, color: brilho > 0.5 ? COR.ciano : '#7C8499', marginTop: 2}}>{sub}</div>}
    </div>
    {!apagado && <span style={{fontSize: 24, color: '#7C8499'}}>›</span>}
  </div>
);

const Ferramentas: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.so2 - 0.15, M.pra - 0.15);
  if (!st) return null;
  const cel = mola(t, M.so2, 12, 190);
  const rola = interpolate(t, [M.libera - 0.2, M.duzentos - 0.1], [0, 1], {...clamp, easing: saida});
  const brilho = prog(t, M.duzentos - 0.1, 0.3);
  const selo = mola(t, M.seguidores, 10, 230);
  const caminho = mola(t, M.confere - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 425, display: 'flex', justifyContent: 'center', opacity: caminho, translate: `0px ${(1 - caminho) * -30}px`}}>
        <Pilula cor={COR.amarelo} tamanho={34} fundo="rgba(40,30,5,.94)">⚙️ Configurações → Tipo e ferramentas da conta</Pilula>
      </div>
      <div style={{position: 'absolute', left: CEL.left, top: CEL.top, width: CEL.w, height: CEL.h, borderRadius: 54, border: '12px solid #05070F', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 3px rgba(255,255,255,.15)', overflow: 'hidden', background: '#0F1216', opacity: cel, scale: String(0.8 + 0.2 * cel)}}>
        <div style={{position: 'absolute', left: '50%', top: 12, translate: '-50% 0px', width: 120, height: 28, borderRadius: 99, background: '#000', zIndex: 2}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 104, paddingTop: 54, boxSizing: 'border-box', background: '#0F1216', borderBottom: '1px solid rgba(255,255,255,.08)', textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 25, color: '#fff', zIndex: 1}}>‹&nbsp;&nbsp;Tipo e ferramentas da conta</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 110, translate: `0px ${-250 * rola}px`}}>
          <div style={{padding: '10px 20px', fontFamily: INTER, fontWeight: 700, fontSize: 21, color: '#9AA0AE'}}>Suas ferramentas principais</div>
          <ItemFerramenta icone="📊" nome="Insights" />
          <ItemFerramenta icone="🗓️" nome="Conteúdo programado" />
          <ItemFerramenta icone="📡" nome="Live" />
          <ItemFerramenta icone="🤝" nome="Conteúdo de marca" />
          <div style={{height: 8, background: '#1C2026', margin: '6px 0'}} />
          <div style={{padding: '10px 20px', fontFamily: INTER, fontWeight: 700, fontSize: 21, color: '#9AA0AE'}}>Suas ferramentas profissionais</div>
          <ItemFerramenta icone="📈" nome="Ferramentas para anúncios" />
          <ItemFerramenta icone="💰" nome="Monetização" />
          <div style={{height: 8, background: '#1C2026', margin: '6px 0'}} />
          <div style={{padding: '10px 20px', fontFamily: INTER, fontWeight: 700, fontSize: 21, color: '#9AA0AE'}}>Tenha acesso a mais ferramentas</div>
          <div style={{padding: '0 10px'}}>
            <ItemFerramenta icone="▶️" nome="Reels de teste" sub="Quando você alcançar 200 seguidores" apagado brilho={brilho} />
          </div>
          <ItemFerramenta icone="💬" nome="Canais" sub="Quando você alcançar 1.000 seguidores" apagado />
        </div>
      </div>
      {selo > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center', opacity: selo, scale: String(interpolate(selo, [0, 1], [1.7, 1])), rotate: `${-3 + (1 - selo) * 8}deg`, zIndex: 4}}>
          <Pilula cor={COR.ciano} tamanho={52} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">🔓 LIBERA COM 200 SEGUIDORES</Pilula>
        </div>
      )}
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: cel * (1 - prog(t, M.confere - 0.2, 0.2))}}>
        <Pilula cor={COR.cinza} tamanho={28} fundo="rgba(8,16,40,.9)">📱 tela do próprio app (out/2026)</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 3. COMO PUBLICAR: tutorial animado (destaque do vídeo) ----------

const PASSOS = [
  {n: 1, rotulo: '＋ Reels', de: M.toca1},
  {n: 2, rotulo: 'Avançar', de: M.monta},
  {n: 3, rotulo: '🧪 Teste', de: M.liga},
  {n: 4, rotulo: 'Compartilhar', de: M.compartilha},
];

const Trilha: React.FC<{t: number}> = ({t}) => (
  <div style={{position: 'absolute', left: 40, right: 40, top: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 3}}>
    {PASSOS.map((p, i) => {
      const ativo = t >= p.de;
      const feito = PASSOS[i + 1] ? t >= PASSOS[i + 1].de : t >= M.compartilha + 0.4;
      return (
        <React.Fragment key={p.n}>
          {i > 0 && <div style={{width: 26, height: 4, borderRadius: 9, background: ativo ? COR.ciano : 'rgba(255,255,255,.2)'}} />}
          <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 99, background: ativo ? (feito ? 'rgba(46,229,157,.18)' : COR.azul) : 'rgba(255,255,255,.08)', border: `3px solid ${feito ? COR.verde : ativo ? COR.ciano : 'rgba(255,255,255,.15)'}`, scale: String(ativo && !feito ? 1.08 : 1)}}>
            <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 26, color: feito ? COR.verde : COR.branco}}>{feito ? '✓' : p.n}</span>
            <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 22, color: ativo ? COR.branco : COR.cinza, whiteSpace: 'nowrap'}}>{p.rotulo}</span>
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

// Telas do app recriadas (sem marca). Coordenadas dentro do celular: 540 × 830.
const CEL = {left: 270, top: 505, w: 540, h: 830};

const Desliza: React.FC<{t: number; de: number; ate: number; children: React.ReactNode}> = ({t, de, ate, children}) => {
  if (t < de - 0.05 || t > ate + 0.3) return null;
  const entra = prog(t, de, 0.3, saida);
  const sai = prog(t, ate, 0.3, saida);
  return <div style={{position: 'absolute', inset: 0, translate: `${(1 - entra) * 540 - sai * 540}px 0px`}}>{children}</div>;
};

const BarraApp: React.FC<{destaque?: number}> = ({destaque = 0}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 80, background: '#0B0F1E', borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 34}}>
    <span>🏠</span><span>🔍</span>
    <span style={{width: 56, height: 56, borderRadius: 16, border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, color: '#fff', fontFamily: INTER, fontWeight: 700, boxShadow: destaque ? `0 0 ${30 * destaque}px ${COR.ciano}` : undefined, background: destaque > 0.5 ? COR.azul : 'transparent'}}>＋</span>
    <span>▶️</span><span>👤</span>
  </div>
);

const TelaInicio: React.FC<{t: number}> = ({t}) => {
  const menu = prog(t, M.mais1 + 0.1, 0.3, saida);
  const reels = t >= M.escolhe + 0.25;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0B0F1E'}}>
      <div style={{position: 'absolute', left: 20, top: 50, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: '#fff'}}>Início</div>
      <div style={{position: 'absolute', left: 20, right: 20, top: 110, height: 520, borderRadius: 18, background: 'linear-gradient(170deg, #3A4A6B, #1E2640)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, opacity: 0.6}}>🖼️</div>
      <BarraApp destaque={t >= M.toca1 && t < M.mais1 + 0.3 ? 1 : 0} />
      {menu > 0 && (
        <>
          <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${0.5 * menu})`}} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 330, borderRadius: '28px 28px 0 0', background: '#1A2038', translate: `0px ${(1 - menu) * 330}px`, padding: '26px 30px', boxSizing: 'border-box'}}>
            <div style={{width: 60, height: 6, borderRadius: 9, background: 'rgba(255,255,255,.3)', margin: '0 auto 20px'}} />
            {[{i: '🖼️', n: 'Post'}, {i: '⭕', n: 'Story'}, {i: '🎬', n: 'Reels'}].map((o) => (
              <div key={o.n} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '14px 16px', borderRadius: 16, marginBottom: 6, background: o.n === 'Reels' && reels ? COR.azul : 'transparent', fontFamily: INTER, fontWeight: 700, fontSize: 30, color: '#fff'}}>
                <span style={{fontSize: 34}}>{o.i}</span>{o.n}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TelaEdicao: React.FC<{t: number}> = ({t}) => (
  <div style={{position: 'absolute', inset: 0, background: '#000'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 40, height: 560, background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 150}}>🍫</div>
    <div style={{position: 'absolute', left: 20, right: 20, top: 620, height: 60, borderRadius: 10, background: '#1A2038', overflow: 'hidden', display: 'flex', gap: 3, padding: 4, boxSizing: 'border-box'}}>
      {Array.from({length: 8}, (_, i) => <div key={i} style={{flex: 1, borderRadius: 4, background: i % 2 ? '#7A4A34' : '#5A3424'}} />)}
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 20 + 400 * prog(t, M.monta, 1.2), width: 4, background: '#fff'}} />
    </div>
    <div style={{position: 'absolute', left: 20, top: 700, display: 'flex', gap: 14, fontSize: 32}}>🎵 ✂️ Aa ✨</div>
    <div style={{position: 'absolute', right: 20, bottom: 30, padding: '14px 26px', borderRadius: 14, background: t >= M.normal + 0.15 ? COR.ciano : COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 28, color: '#fff'}}>Avançar →</div>
  </div>
);

const LinhaAjuste: React.FC<{icone: string; texto: string; children?: React.ReactNode; destaque?: number}> = ({icone, texto, children, destaque = 0}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,.08)', background: destaque ? `rgba(62,198,255,${0.18 * destaque})` : 'transparent', borderRadius: destaque ? 12 : 0}}>
    <span style={{fontSize: 28}}>{icone}</span>
    <span style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 24, color: '#fff', lineHeight: 1.15}}>{texto}</span>
    {children}
  </div>
);

const TelaLegenda: React.FC<{t: number}> = ({t}) => {
  const teste = prog(t, M.teste2 - 0.1, 0.25, saida);
  const auto = prog(t, M.sozinho, 0.25, saida);
  const publicado = t >= M.compartilha + 0.35;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0B0F1E'}}>
      <div style={{position: 'absolute', left: 20, top: 46, fontFamily: INTER, fontWeight: 800, fontSize: 28, color: '#fff'}}>← Novo Reels</div>
      <div style={{position: 'absolute', left: 20, right: 20, top: 100, display: 'flex', gap: 14}}>
        <div style={{width: 110, height: 160, borderRadius: 12, background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50}}>🍫</div>
        <div style={{flex: 1, fontFamily: INTER, fontWeight: 500, fontSize: 22, color: '#8A93AD', paddingTop: 8}}>Escreva uma legenda...</div>
      </div>
      <div style={{position: 'absolute', left: 14, right: 14, top: 290}}>
        <LinhaAjuste icone="🧪" texto="Teste: mostrar primeiro só pra quem não te segue" destaque={t >= M.liga - 0.3 && t < M.se ? 1 : 0}><Interruptor on={teste} /></LinhaAjuste>
        <div style={{opacity: 0.35 + 0.65 * teste}}>
          <LinhaAjuste icone="🔁" texto="Compartilhar com todos automaticamente se for bem" destaque={t >= M.se && t < M.compartilha - 0.2 ? 1 : 0}><Interruptor on={auto} /></LinhaAjuste>
        </div>
        <LinhaAjuste icone="👥" texto="Marcar pessoas" />
        <LinhaAjuste icone="📍" texto="Adicionar local" />
      </div>
      <div style={{position: 'absolute', left: 20, right: 20, bottom: 30, padding: '18px 0', borderRadius: 14, textAlign: 'center', background: publicado ? COR.verde : COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 30, color: publicado ? COR.marinho : '#fff'}}>
        {publicado ? '✓ Publicado como teste' : 'Compartilhar'}
      </div>
    </div>
  );
};

const ComoPublicar: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pra - 0.15, M.em24 - 0.15);
  if (!st) return null;
  const cel = mola(t, M.pra, 12, 190);
  // Câmera: zoom no interruptor "Teste" (ponto dentro do celular).
  const zoom = interpolate(t, [M.liga - 0.35, M.liga + 0.1, M.se - 0.1, M.se + 0.3], [1, 1.75, 1.75, 1], {...clamp, easing: saida});
  const foco = {x: CEL.left + CEL.w - 60, y: CEL.top + 330};
  const etiqueta = mola(t, M.teste2 + 0.1, 11, 220) * (1 - prog(t, M.se - 0.1, 0.25));
  const publicado = mola(t, M.compartilha + 0.35, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Trilha t={t} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 500, height: 840, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, top: -500, transformOrigin: `${foco.x}px ${foco.y}px`, scale: String(zoom)}}>
          <div style={{position: 'absolute', left: CEL.left, top: CEL.top, width: CEL.w, height: CEL.h, borderRadius: 54, border: '12px solid #05070F', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 3px rgba(255,255,255,.15), 0 0 80px rgba(47,123,255,.25)', overflow: 'hidden', background: '#0B0F1E', opacity: cel, scale: String(0.8 + 0.2 * cel)}}>
            <Desliza t={t} de={M.pra} ate={M.monta - 0.1}><TelaInicio t={t} /></Desliza>
            <Desliza t={t} de={M.monta - 0.1} ate={M.ultima - 0.1}><TelaEdicao t={t} /></Desliza>
            <Desliza t={t} de={M.ultima - 0.1} ate={99}><TelaLegenda t={t} /></Desliza>
            <div style={{position: 'absolute', left: '50%', top: 12, translate: '-50% 0px', width: 120, height: 28, borderRadius: 99, background: '#000'}} />
          </div>
          {/* Dedo: ＋ → Reels → Avançar → Teste → automático → Compartilhar */}
          <Toque t={t} de={M.toca1 - 0.25} toque={M.mais1} x={CEL.left + CEL.w / 2 - 50} y={CEL.top + CEL.h - 90} tamanho={110} />
          <Toque t={t} de={M.escolhe - 0.1} toque={M.escolhe + 0.25} x={CEL.left + 120} y={CEL.top + CEL.h - 120} tamanho={110} />
          <Toque t={t} de={M.normal - 0.35} toque={M.normal + 0.15} x={CEL.left + CEL.w - 150} y={CEL.top + CEL.h - 70} tamanho={110} />
          <Toque t={t} de={M.liga - 0.2} toque={M.teste2 - 0.1} x={CEL.left + CEL.w - 110} y={CEL.top + 300} tamanho={90} />
          <Toque t={t} de={M.sozinho - 0.45} toque={M.sozinho} x={CEL.left + CEL.w - 110} y={CEL.top + 390} tamanho={100} />
          <Toque t={t} de={M.compartilha - 0.45} toque={M.compartilha} x={CEL.left + CEL.w / 2 - 40} y={CEL.top + CEL.h - 70} tamanho={110} />
        </div>
      </div>
      {etiqueta > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center', opacity: etiqueta, scale: String(interpolate(etiqueta, [0, 1], [1.6, 1])), rotate: `${-3 + (1 - etiqueta) * 8}deg`, zIndex: 4}}>
          <Pilula cor={COR.ciano} tamanho={44} fundo="rgba(10,30,70,.95)">SÓ QUEM NÃO TE SEGUE VÊ PRIMEIRO</Pilula>
        </div>
      )}
      {publicado > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center', opacity: publicado, scale: String(interpolate(publicado, [0, 1], [1.6, 1])), zIndex: 4}}>
          <Pilula cor={COR.verde} tamanho={46} fundo="rgba(5,40,25,.95)">✓ PRONTO! PUBLICADO COMO TESTE</Pilula>
        </div>
      )}
      <Fonte t={t} de={M.liga} ate={M.compartilha - 0.2} veiculo="Meta (newsroom oficial)" titulo="interruptor “Trial” antes de postar" top={1250} />
      {t >= M.liga && t < M.compartilha - 0.2 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1318, textAlign: 'center', fontFamily: INTER, fontWeight: 600, fontSize: 20, color: 'rgba(255,255,255,.6)', opacity: prog(t, M.liga + 0.2, 0.3)}}>precisa de conta profissional e pública com 200+ seguidores</div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 4. Em 24 h: abre o teste no perfil e vê os números ----------

const METRICAS = [
  {de: M.visualizacoes, icone: '👁️', nome: 'visualizações', valor: 3240},
  {de: M.curtidas, icone: '❤️', nome: 'curtidas', valor: 180},
  {de: M.comentarios, icone: '💬', nome: 'comentários', valor: 22},
  {de: M.compartilhamentos, icone: '↗️', nome: 'compartilham.', valor: 95},
];

const Resultado: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.em24 - 0.15, M.foi1 - 0.15);
  if (!st) return null;
  const relogio = mola(t, M.em24, 11, 200) * (1 - prog(t, M.abre - 0.1, 0.25));
  const giro = interpolate(t, [M.em24, M.abre], [0, 360 * 2], clamp);
  const perfil = mola(t, M.abre, 12, 200) * (1 - prog(t, M.visualizacoes - 0.15, 0.25));
  const aba = t >= M.rascunhos - 0.1;
  const painel = mola(t, M.visualizacoes - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      {relogio > 0.01 && (
        <AbsoluteFill style={{alignItems: 'center', opacity: relogio}}>
          <div style={{position: 'absolute', top: 520, width: 420, height: 420, borderRadius: 999, border: `14px solid ${COR.ciano}`, background: 'rgba(8,16,44,.9)', scale: String(0.7 + 0.3 * relogio)}}>
            <div style={{position: 'absolute', left: '50%', top: '50%', width: 10, height: 160, background: '#fff', borderRadius: 9, transformOrigin: '50% 100%', translate: '-50% -100%', rotate: `${giro}deg`}} />
            <div style={{position: 'absolute', left: '50%', top: '50%', width: 30, height: 30, borderRadius: 99, background: COR.ciano, translate: '-50% -50%'}} />
          </div>
          <div style={{position: 'absolute', top: 980, fontFamily: MONT, fontWeight: 900, fontSize: 96, color: COR.branco}}>24 <span style={{color: COR.ciano}}>HORAS</span></div>
        </AbsoluteFill>
      )}
      {perfil > 0.01 && (
        <div style={{position: 'absolute', left: 170, right: 170, top: 520, padding: 26, borderRadius: 30, ...caixa, opacity: perfil, scale: String(0.8 + 0.2 * perfil)}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.branco}}>👤 docesdaana</div>
          <div style={{display: 'flex', gap: 10, marginTop: 18}}>
            {['▦ Posts', '📝 Rascunhos', '🧪 Testes'].map((a) => (
              <div key={a} style={{flex: 1, padding: '12px 0', borderRadius: 12, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#fff', background: a.includes('Testes') && aba ? COR.azul : 'rgba(255,255,255,.08)'}}>{a}</div>
            ))}
          </div>
          <div style={{marginTop: 18, height: 300, borderRadius: 16, background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, position: 'relative'}}>
            🍫
            <div style={{position: 'absolute', top: 12, left: 12, padding: '4px 12px', borderRadius: 10, background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#fff'}}>🧪 teste · 24 h</div>
          </div>
        </div>
      )}
      {painel > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 500, opacity: painel}}>
          <Titulo t={t} de={M.visualizacoes - 0.1} top={-70} tamanho={52}>📊 O RESULTADO DO TESTE</Titulo>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20}}>
            {METRICAS.map((m) => {
              const e = mola(t, m.de, 11, 220);
              const v = Math.round(interpolate(t, [m.de, m.de + 0.7], [0, m.valor], {...clamp, easing: saida}));
              return (
                <div key={m.nome} style={{height: 230, borderRadius: 30, ...caixa, border: `4px solid ${e > 0.5 ? COR.ciano : 'rgba(255,255,255,.15)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.3 + 0.7 * e, scale: String(0.85 + 0.15 * e)}}>
                  <div style={{fontSize: 60}}>{m.icone}</div>
                  <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>{v.toLocaleString('pt-BR')}</div>
                  <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>{m.nome}</div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 22, display: 'flex', justifyContent: 'center', opacity: mola(t, M.compartilhamentos + 0.4, 12, 200)}}>
            <Pilula cor={COR.amarelo} tamanho={32} fundo="rgba(40,30,5,.92)">📈 comparado com os seus testes anteriores</Pilula>
          </div>
        </div>
      )}
      <Fonte t={t} de={M.abre} ate={M.foi1} veiculo="Meta (newsroom oficial)" titulo="métricas em ~24 h, comparação com testes anteriores" />
    </AbsoluteFill>
  );
};

// ---------- 5. Foi bem? Compartilha com todos. Foi mal? Ninguém que te segue viu ----------

const Decisao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.foi1 - 0.15, M.repara - 0.2);
  if (!st) return null;
  const bem = mola(t, M.foi1, 12, 200);
  const ok = t >= M.todos + 0.1;
  const mal = mola(t, M.foi2, 12, 200);
  const dorme = mola(t, M.quem2, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 70, right: 70, top: 470, padding: 30, borderRadius: 30, ...caixa, border: `4px solid ${COR.verde}`, opacity: bem, translate: `${(1 - bem) * -80}px 0px`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: COR.verde}}>✅ FOI BEM?</div>
        <div style={{marginTop: 18, padding: '20px 0', borderRadius: 16, textAlign: 'center', background: ok ? COR.verde : COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 34, color: ok ? COR.marinho : '#fff', scale: String(ok ? 1 : 1 + 0.04 * Math.sin(t * 8))}}>
          {ok ? '✓ No feed de todo mundo' : 'Compartilhar com todos'}
        </div>
      </div>
      <Toque t={t} de={M.toca2 - 0.2} toque={M.todos + 0.05} x={640} y={650} tamanho={110} />
      {mal > 0.01 && (
        <div style={{position: 'absolute', left: 70, right: 70, top: 830, padding: 30, borderRadius: 30, ...caixa, border: `4px solid ${COR.vermelho}`, opacity: mal, translate: `${(1 - mal) * 80}px 0px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: COR.vermelho}}>😬 FOI MAL?</div>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.cinza}}>👁️ 210 · ↗️ 2</div>
          </div>
          <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 14, opacity: dorme}}>
            {NOVOS.slice(0, 5).map((n, i) => <Rosto key={i} emoji="😴" cor="#2A3150" tam={70} />)}
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco, lineHeight: 1.1}}>SEUS SEGUIDORES<br /><span style={{color: COR.ciano}}>NEM VIRAM</span></div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 6. Quem não te segue é quem faz você crescer ----------

const Crescer: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.repara - 0.2, M.dica1 - 0.15);
  if (!st) return null;
  const linha = prog(t, M.justamente - 0.2, 1.4, saida);
  const seta = mola(t, M.crescer, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={78} style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center'}} pecas={[{texto: 'QUEM NÃO TE SEGUE', s: M.repara + 0.3, cor: COR.ciano}, {texto: 'FAZ VOCÊ CRESCER', s: M.crescer - 0.3}]} />
      <svg width={1080} height={520} style={{position: 'absolute', left: 0, top: 700}}>
        <path d="M 120 460 L 320 400 L 500 380 L 660 260 L 820 180 L 960 60" pathLength={1} fill="none" stroke={COR.verde} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} style={{filter: `drop-shadow(0 0 16px ${COR.verde})`}} />
        {[[320, 400], [500, 380], [660, 260], [820, 180]].map(([x, y], i) => (
          <text key={i} x={x - 26} y={y - 30} fontSize={52} opacity={linha > (i + 1) / 5 ? 1 : 0}>🆕</text>
        ))}
      </svg>
      <div style={{position: 'absolute', left: 820, top: 640, fontSize: 130, opacity: seta, scale: String(seta)}}>📈</div>
    </AbsoluteFill>
  );
};

// ---------- 7. Dica 1: testa a abertura (A × B) ----------

const Versao: React.FC<{t: number; x: number; letra: string; emoji: string; queda: number; vence: boolean; de: number}> = ({t, x, letra, emoji, queda, vence, de}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  const k = prog(t, M.posta2, 2.2);
  const ret = Math.round(100 - queda * k);
  const coroa = vence ? mola(t, M.segurou, 9, 240) : 0;
  return (
    <div style={{position: 'absolute', left: x, top: 560, width: 400, opacity: e, scale: String(0.75 + 0.25 * e)}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco, textAlign: 'center'}}>ABERTURA {letra}</div>
      <div style={{marginTop: 12, height: 440, borderRadius: 36, border: `10px solid ${vence && coroa > 0.5 ? COR.verde : '#1B2238'}`, background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', position: 'relative', overflow: 'hidden', boxShadow: vence && coroa > 0.5 ? `0 0 60px ${COR.verde}88` : '0 30px 80px rgba(0,0,0,.5)'}}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 130}}>{emoji}</div>
        <div style={{position: 'absolute', top: 12, left: 12, padding: '4px 12px', borderRadius: 10, background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#fff'}}>🧪 teste</div>
      </div>
      <div style={{marginTop: 16, fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>quem continuou assistindo</div>
      <div style={{marginTop: 8, height: 30, borderRadius: 99, background: 'rgba(255,255,255,.1)', overflow: 'hidden'}}>
        <div style={{width: `${ret}%`, height: '100%', borderRadius: 99, background: vence ? COR.verde : COR.vermelho}} />
      </div>
      <div style={{marginTop: 6, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: vence ? COR.verde : COR.vermelho, fontVariantNumeric: 'tabular-nums'}}>{ret}%</div>
      {coroa > 0.01 && <div style={{position: 'absolute', right: -10, top: 30, fontSize: 100, scale: String(coroa), rotate: `${12 * (1 - coroa)}deg`}}>🏆</div>}
    </div>
  );
};

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.dica1 - 0.15, M.dica2 - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.dica1} n={1} />
      <Versao t={t} x={80} letra="A" emoji="🍫" queda={62} vence={false} de={M.dois - 0.1} />
      <Versao t={t} x={600} letra="B" emoji="😱" queda={28} vence de={M.diferentes - 0.1} />
    </AbsoluteFill>
  );
};

// ---------- 8. Dica 2: não olha só a curtida ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica2 - 0.15, T.b - 0.1);
  if (!st) return null;
  const encolhe = prog(t, M.curtida, 0.6, saida);
  const tempo = prog(t, M.tempo - 0.1, 0.7, saida);
  const envios = prog(t, M.mandaram - 0.1, 0.7, saida);
  const sinais = (1 - prog(t, M.compara - 0.15, 0.25));
  const balanca = mola(t, M.compara - 0.05, 11, 210);
  const barras = [
    {icone: '❤️', nome: 'CURTIDA', v: 0.8 - 0.45 * encolhe, cor: COR.cinza},
    {icone: '⏱️', nome: 'TEMPO ASSISTIDO', v: 0.35 + 0.6 * tempo, cor: COR.ciano},
    {icone: '↗️', nome: 'ENVIOS', v: 0.3 + 0.65 * envios, cor: COR.verde},
  ];
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.dica2} n={2} />
      {sinais > 0.01 && (
        <div style={{opacity: sinais}}>
          <SeloMosseri t={t} de={M.tempo - 0.4} ate={M.compara} />
          <div style={{position: 'absolute', left: 100, right: 100, top: 640}}>
            {barras.map((b) => (
              <div key={b.nome} style={{marginBottom: 34}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: MONT, fontWeight: 900, fontSize: 38, color: COR.branco}}>
                  <span style={{fontSize: 44}}>{b.icone}</span>{b.nome}
                  {b.nome === 'CURTIDA' && encolhe > 0.5 && <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>(não olha só ela)</span>}
                </div>
                <div style={{marginTop: 10, height: 44, borderRadius: 99, background: 'rgba(255,255,255,.08)', overflow: 'hidden'}}>
                  <div style={{width: `${b.v * 100}%`, height: '100%', borderRadius: 99, background: b.cor, boxShadow: b.cor !== COR.cinza ? `0 0 24px ${b.cor}` : undefined}} />
                </div>
              </div>
            ))}
          </div>
          <Fonte t={t} de={M.tempo} ate={M.compara} veiculo="Social Media Today" titulo="sinais de ranking do Instagram em 2025" />
        </div>
      )}
      {balanca > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 600, opacity: balanca, scale: String(0.7 + 0.3 * balanca)}}>
          <Palavras t={t} tamanho={80} style={{textAlign: 'center'}} pecas={[{texto: 'COMPARA', s: M.compara}, {texto: 'TESTE COM TESTE', s: M.compara + 0.35, cor: COR.ciano, brilho: true}]} />
          <div style={{marginTop: 50, display: 'flex', justifyContent: 'center', gap: 60, fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco}}>
            <div style={{padding: '20px 34px', borderRadius: 30, ...caixa, border: `4px solid ${COR.verde}`}}>🧪 × 🧪 <span style={{color: COR.verde}}>✓</span></div>
            <div style={{padding: '20px 34px', borderRadius: 30, ...caixa, border: `4px solid ${COR.vermelho}`, opacity: 0.8}}>🧪 × 📌 <span style={{color: COR.vermelho}}>✗</span></div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Fechamento: CTA duplo ----------

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

// Alternância do CTA (ajustada pelos momentos artificiais de sincronia.md).
const B1 = M.manda + 0.3;
const B2 = M.postar2 + 0.35;
const B3 = M.digo;
const B4 = M.toda - 0.12;

const Enviar: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.b, B1 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <Pilula cor={COR.ciano} tamanho={90} fundo="rgba(10,30,70,.94)">↗️ MANDA</Pilula>
    </AbsoluteFill>
  );
};

const MedoDePostar: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < B1 || t >= B2) return null;
  const e = mola(t, B1, 12, 200);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * -40}px`}}>
      <Pilula cor={COR.amarelo} tamanho={44} fundo="rgba(40,30,5,.9)">PRA QUEM TEM MEDO DE POSTAR 🙈</Pilula>
    </div>
  );
};

const Segue: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, B2, B3 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={120} style={{textAlign: 'center', marginTop: -380}} pecas={[{texto: 'E SEGUE', s: B2}, {texto: 'O DIGO', s: M.segue2 + 0.05, cor: COR.ciano, brilho: true}]} />
    </AbsoluteFill>
  );
};

const SeguirSobre: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < B2 - 0.05 || t >= B4) return null;
  const e = mola(t, B2, 12, 200);
  return (
    <>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1110, opacity: e, translate: `0px ${(1 - e) * 80}px`}}>
        <BotaoSeguir seguindo={t >= M.digo + 0.05} pop={mola(t, M.digo + 0.05, 9, 260)} />
      </div>
      <Toque t={t} de={B2 + 0.1} toque={M.digo} x={840} y={1170} />
    </>
  );
};

const TodaSemana: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, B4, T.fim + 0.2, 0);
  if (!st) return null;
  const e = mola(t, B4, 10, 220);
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
      <Gancho t={t} />
      <GanchoMotion t={t} />
      <Admitiu t={t} />
      <Saida t={t} />
      <Ferramentas t={t} />
      <ComoPublicar t={t} />
      <Resultado t={t} />
      <Decisao t={t} />
      <Crescer t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <CardVoz t={t} />
      <Enviar t={t} />
      <MedoDePostar t={t} />
      <Segue t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'swoosh', em: A1, volume: 0.4},
  {som: 'impacto', em: M.flopar, volume: 0.45},
  // Admitiu
  {som: 'pop', em: M.quando, volume: 0.4},
  {som: 'whoosh_in', em: M.admitiu - 0.15, volume: 0.45},
  {som: 'risco', em: M.nervosa, volume: 0.35},
  ...passos(M.medo2, M.medo2 + 0.48, 4).map((s): Evento => ({som: 'pop', em: s, volume: 0.3})),
  // Saída
  {som: 'impacto', em: M.reels1 - 0.1, volume: 0.5},
  {som: 'swoosh', em: M.aparece + 0.1, volume: 0.45},
  {som: 'ding', em: M.so, volume: 0.4},
  {som: 'risco', em: M.nao1, volume: 0.4},
  {som: 'whoosh_in', em: M.nem - 0.1, volume: 0.4},
  // 200 seguidores
  {som: 'whoosh_in', em: M.so2 - 0.15, volume: 0.45},
  {som: 'swoosh', em: M.libera - 0.2, volume: 0.35},
  {som: 'ding', em: M.duzentos - 0.1, volume: 0.5},
  {som: 'impacto', em: M.seguidores, volume: 0.5},
  {som: 'pop', em: M.confere - 0.1, volume: 0.4},
  // Tutorial
  {som: 'impacto', em: M.pra, volume: 0.45},
  {som: 'toque', em: M.mais1, volume: 0.6},
  {som: 'swoosh', em: M.mais1 + 0.1, volume: 0.35},
  {som: 'toque', em: M.escolhe + 0.25, volume: 0.6},
  {som: 'swoosh', em: M.monta - 0.1, volume: 0.4},
  {som: 'toque', em: M.normal + 0.15, volume: 0.6},
  {som: 'swoosh', em: M.ultima - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.liga - 0.35, volume: 0.45},
  {som: 'toque', em: M.teste2 - 0.1, volume: 0.65},
  {som: 'ding', em: M.teste2 + 0.1, volume: 0.5},
  {som: 'whoosh_out', em: M.se, volume: 0.35},
  {som: 'toque', em: M.sozinho, volume: 0.55},
  {som: 'toque', em: M.compartilha, volume: 0.6},
  {som: 'impacto', em: M.compartilha + 0.35, volume: 0.5},
  // Resultado
  {som: 'whoosh_in', em: M.em24 - 0.15, volume: 0.45},
  ...passos(M.em24, M.abre, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.3})),
  {som: 'pop', em: M.abre, volume: 0.4},
  {som: 'pop', em: M.rascunhos - 0.1, volume: 0.4},
  {som: 'pop', em: M.visualizacoes, volume: 0.4},
  {som: 'pop', em: M.curtidas, volume: 0.4},
  {som: 'pop', em: M.comentarios, volume: 0.4},
  {som: 'pop', em: M.compartilhamentos, volume: 0.4},
  {som: 'ding', em: M.compartilhamentos + 0.4, volume: 0.45},
  // Decisão
  {som: 'pop', em: M.foi1, volume: 0.45},
  {som: 'toque', em: M.todos + 0.05, volume: 0.6},
  {som: 'ding', em: M.todos + 0.1, volume: 0.5},
  {som: 'pop', em: M.foi2, volume: 0.45},
  {som: 'swoosh', em: M.quem2, volume: 0.35},
  // Crescer
  {som: 'whoosh_in', em: M.repara - 0.2, volume: 0.45},
  {som: 'impacto', em: M.crescer, volume: 0.5},
  // Dica 1
  {som: 'impacto', em: M.dica1, volume: 0.5},
  {som: 'pop', em: M.dois - 0.1, volume: 0.4},
  {som: 'pop', em: M.diferentes - 0.1, volume: 0.4},
  ...passos(M.posta2, M.posta2 + 2.2, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.25})),
  {som: 'ding', em: M.segurou, volume: 0.55},
  // Dica 2
  {som: 'impacto', em: M.dica2, volume: 0.5},
  {som: 'whoosh_out', em: M.curtida, volume: 0.35},
  {som: 'ding', em: M.tempo, volume: 0.4},
  {som: 'ding', em: M.mandaram, volume: 0.45},
  {som: 'swoosh', em: M.compara - 0.1, volume: 0.45},
  // CTA
  {som: 'pop', em: T.b + 0.05, volume: 0.5},
  {som: 'pop', em: B1, volume: 0.4},
  {som: 'swoosh', em: B2, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: B4, volume: 0.5},
];

// Legenda: "deixe" → "deixa", "1." → "1", sem o "Tchau, tchau" que o Whisper inventou no silêncio final.
const LEGENDA = PALAVRAS.filter((p) => !/^tchau/i.test(p.w)).map((p) => (p.w === 'deixe' ? {...p, w: 'deixa'} : p.w === '1.' ? {...p, w: '1:'} : p.w === '2.' ? {...p, w: '2:'} : p));

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: A1, modo: 'fora'},
    {de: A2, modo: 'cheia', escala: [1.07, 1.1], punch: true},
    {de: A3, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.05]},
    {de: B2, modo: 'fora'},
    {de: B3, modo: 'cheia', escala: [1.05, 1.08], punch: true},
    {de: B4, modo: 'fora'},
  ],
  semLegenda: [
    [A1, A2],
    [M.pra, M.em24],
    [T.b, B1],
    [B2, T.fim],
  ],
  corEspecial: {},
  eventos: EVENTOS,
  Cena,
};
