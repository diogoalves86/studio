import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Selo, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 009 · Reels de dica: o perfil transforma visita em seguidor. Abertura "Para tudo e abre o seu perfil agora…",
// três dúvidas de quem chega (o que faz, é pra mim, o que ganho), dica 1 (bio em uma linha, com a recomendação
// oficial do Instagram), dica 2 (fixar 3 posts) e o funil Reels → perfil → seguidor. Tudo dentro do perfil do app.

const T = TRECHOS;
const M = {
  abre: em('abre'),
  finge: em('finge'),
  estranho: em('estranho'),
  voce: em('você'),
  hein: em('hein'),
  quem: em('quem'),
  tres: em('três'),
  faz: em('faz'),
  ela: em('ela', em('faz')),
  ganha: em('ganha'),
  dica1: em('dica'),
  bio: em('bio'),
  apaixonada: em('apaixonada'),
  escreve: em('escreve'),
  brigadeiro: em('brigadeiro'),
  festa: em('festa'),
  direct: em('direct'),
  proprio: em('próprio'),
  cidade: em('cidade'),
  aparece: em('aparece'),
  dica2: em('dica', em('busca')),
  fixa: em('fixa'),
  fixar: em('fixar'),
  tres3: em('três', em('fixar')),
  resultado: em('resultado'),
  ensina: em('ensina'),
  prova: em('prova'),
  reels: em('rios'),
  perfil2: em('perfil', em('visita')),
  seguidor: em('seguidor'),
  manda: em('manda'),
  perfilB: em('perfil', em('arrumar')),
  eB: em('e', em('hoje')),
  segue: em('segue'),
  digo: em('digo'),
  toda: em('toda'),
};

// Momentos artificiais (sincronia.md), abertura: 0–0,67 «Para tudo e abre», 1,41–1,62 «Finge», 2,68–2,95 «Você»;
// fechamento: 41,47–42,63 «perfil · E · segue». A alternância abaixo deixa o avatar cheio só onde a boca está natural.
const CHEIA_1 = M.abre + 0.16;
const SAI_1 = M.finge - 0.22;
const CARD_1 = M.finge + 0.05;
const SAI_2 = M.voce - 0.21;
const SAI_B = M.perfilB + 0.1;
const VOLTA_B = M.segue + 0.2;

const letras = (s: string) => Array.from(s);
const digitar = (t: number, de: number, ate: number, texto: string) => {
  const L = letras(texto);
  return L.slice(0, Math.round(interpolate(t, [de, ate], [0, L.length], clamp))).join('');
};
const apagar = (t: number, de: number, ate: number, texto: string) => {
  const L = letras(texto);
  return L.slice(0, Math.round(interpolate(t, [de, ate], [L.length, 0], clamp))).join('');
};
const Cursor: React.FC<{t: number}> = ({t}) => <span style={{color: '#3797F0', opacity: Math.round(t * 4) % 2 ? 1 : 0}}>|</span>;

// Selo de fonte no rodapé do conteúdo (autoridade).
const Fonte: React.FC<{t: number; de: number; ate: number; veiculo: string; titulo: string; top?: number}> = ({t, de, ate, veiculo, titulo, top = 1255}) => {
  const mola = useMola();
  const e = mola(t, de, 13, 200) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 30}px`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, maxWidth: 960, padding: '12px 24px', borderRadius: 16, background: 'rgba(240,244,255,.95)', boxShadow: '0 12px 40px rgba(0,0,0,.45)'}}>
        <span style={{fontSize: 30}}>📰</span>
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.marinho, whiteSpace: 'nowrap'}}>Fonte: {veiculo}</span>
        <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 24, color: '#4A5578', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>· {titulo}</span>
      </div>
    </div>
  );
};

// ---------- Celular com a tela de perfil no padrão do app (sem marca) ----------

const IG = 'conic-gradient(#FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)';

type PostGrade = {cor: string; emoji: string};
const GRADE_BOA: PostGrade[] = [
  {cor: '#5B2E1E', emoji: '🍫'}, {cor: '#7A3E6E', emoji: '🎂'}, {cor: '#A0522D', emoji: '📦'},
  {cor: '#2A9D8F', emoji: '🎉'}, {cor: '#C2378A', emoji: '💬'}, {cor: '#264653', emoji: '🏆'},
  {cor: '#E9C46A', emoji: '📚'}, {cor: '#3A86FF', emoji: '⭐'}, {cor: '#8338EC', emoji: '🍬'},
];
const GRADE_FRACA: PostGrade[] = [
  {cor: '#555C7A', emoji: '☕'}, {cor: '#6B5B4B', emoji: '🐶'}, {cor: '#4A5568', emoji: '🌅'},
  {cor: '#5A4A6B', emoji: '🍕'}, {cor: '#3F5A4A', emoji: '🤳'}, {cor: '#6B4A4A', emoji: '🎵'},
];
// Fixados (índices da grade boa) e o rótulo de cada um.
const FIXADOS = [{i: 5, rotulo: '🏆 RESULTADO', de: 'resultado'}, {i: 6, rotulo: '📚 ENSINA', de: 'ensina'}, {i: 4, rotulo: '💬 PROVA', de: 'prova'}] as const;

type Tela = {
  nome: string;
  usuario: string;
  bio: React.ReactNode;
  grade: PostGrade[];
  seguindo?: number;
  rolagem?: number;
  pin?: number[]; // progresso (0–1) de cada fixado subindo
  rotulos?: number[]; // opacidade dos rótulos dos fixados
  bioFoco?: number;
};

const LADO = 182;

const TelaPerfil: React.FC<Tela> = ({nome, usuario, bio, grade, seguindo = 0, rolagem = 0, pin, rotulos, bioFoco = 0}) => {
  // Posição de cada post: antes na ordem natural; com «pin», os fixados sobem para a 1ª linha.
  const pos = grade.map((_, i) => i);
  let alvo = pos;
  if (pin) {
    const fix: number[] = FIXADOS.map((f) => f.i);
    const resto = pos.filter((i) => !fix.includes(i));
    alvo = pos.map((i) => (fix.includes(i) ? fix.indexOf(i) : 3 + resto.indexOf(i)));
  }
  return (
    <div style={{position: 'absolute', inset: 0, background: '#000', translate: `0px ${-rolagem}px`}}>
      <div style={{padding: '56px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: '#fff'}}>{usuario} ˅</div>
        <div style={{fontSize: 30, color: '#fff'}}>☰</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 30, padding: '22px 24px 0'}}>
        <div style={{width: 128, height: 128, borderRadius: 99, padding: 5, background: IG, boxSizing: 'border-box', flexShrink: 0}}>
          <div style={{width: '100%', height: '100%', borderRadius: 99, background: grade[0].cor, border: '4px solid #000', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56}}>{grade[0].emoji}</div>
        </div>
        {[['48', 'posts'], [seguindo > 0.5 ? '1.205' : '1.204', 'seguidores'], ['310', 'seguindo']].map(([n, l]) => (
          <div key={l} style={{textAlign: 'center', flex: 1}}>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#fff'}}>{n}</div>
            <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 20, color: '#E0E0E0'}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{padding: '18px 24px 0', fontFamily: INTER, fontWeight: 700, fontSize: 26, color: '#fff'}}>{nome}</div>
      <div style={{margin: '6px 14px 0', padding: '6px 10px', minHeight: 72, borderRadius: 12, fontFamily: INTER, fontWeight: 500, fontSize: 24, lineHeight: 1.4, color: '#E0E0E0', background: `rgba(55,151,240,${0.18 * bioFoco})`, border: bioFoco > 0.01 ? `3px solid rgba(55,151,240,${bioFoco})` : '3px solid transparent'}}>{bio}</div>
      <div style={{display: 'flex', gap: 10, padding: '14px 24px 0'}}>
        <div style={{flex: 1, height: 58, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 24, color: '#fff', background: seguindo > 0.5 ? '#262626' : '#0095F6', scale: String(1 + 0.08 * Math.sin(Math.min(1, seguindo) * Math.PI))}}>{seguindo > 0.5 ? 'Seguindo ✓' : 'Seguir'}</div>
        <div style={{flex: 1, height: 58, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 24, color: '#fff', background: '#262626'}}>Mensagem</div>
      </div>
      <div style={{position: 'relative', marginTop: 22, height: LADO * Math.ceil(grade.length / 3)}}>
        {grade.map((p, i) => {
          const fixIdx = pin ? FIXADOS.findIndex((f) => f.i === i) : -1;
          const k = pin ? (fixIdx >= 0 ? pin[fixIdx] : Math.max(...pin)) : 0;
          const de = pos[i];
          const para = alvo[i];
          const x = interpolate(k, [0, 1], [(de % 3) * (LADO + 3), (para % 3) * (LADO + 3)]);
          const y = interpolate(k, [0, 1], [Math.floor(de / 3) * (LADO + 3), Math.floor(para / 3) * (LADO + 3)]);
          const fixado = fixIdx >= 0 && k > 0.95;
          return (
            <div key={i} style={{position: 'absolute', left: x, top: y, width: LADO, height: LADO, background: `linear-gradient(150deg, ${p.cor}, #111)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70, zIndex: fixIdx >= 0 ? 2 : 1, boxShadow: fixIdx >= 0 && k > 0 && k < 1 ? '0 20px 40px rgba(0,0,0,.6)' : undefined, scale: fixIdx >= 0 ? String(1 + 0.08 * Math.sin(k * Math.PI)) : '1'}}>
              {p.emoji}
              {fixado && <div style={{position: 'absolute', right: 8, top: 6, fontSize: 30}}>📌</div>}
              {fixIdx >= 0 && rotulos && rotulos[fixIdx] > 0.01 && (
                <div style={{position: 'absolute', left: 6, right: 6, bottom: 8, padding: '4px 0', borderRadius: 8, background: 'rgba(0,0,0,.75)', textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 18, color: COR.amarelo, opacity: rotulos[fixIdx]}}>{FIXADOS[fixIdx].rotulo}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Celular: React.FC<{x: number; y: number; w?: number; h?: number; e?: number; rot?: number; children: React.ReactNode}> = ({x, y, w = 580, h = 760, e = 1, rot = 0, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 60, border: '12px solid #1B2238', background: '#000', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.65), 0 0 0 2px rgba(255,255,255,.08)', scale: String(0.6 + 0.4 * e), opacity: Math.min(1, e * 1.5), rotate: `${rot}deg`}}>
    <div style={{position: 'absolute', left: '50%', top: 10, width: 140, height: 30, borderRadius: 99, background: '#000', translate: '-50% 0', zIndex: 5}} />
    {children}
  </div>
);

const BIO_FRACA = 'apaixonada por doces 💕✨ | vida | amor';
const BIO_L1 = '🍫 Brigadeiro gourmet pra festa em Curitiba';
const BIO_L2 = '📦 Encomendas pelo direct';

// ---------- Abertura ----------

const ParaTudo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, 0, CHEIA_1 - 0.03, 0);
  if (!st) return null;
  const e = mola(t, 0.02, 8, 260);
  const tremor = Math.sin(t * 70) * 10 * (1 - Math.min(1, t / 0.4));
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontSize: 220, scale: String(e), rotate: `${(1 - e) * -30}deg`, translate: `${tremor}px -120px`}}>✋</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 124, color: COR.branco, scale: String(interpolate(e, [0, 1], [2.2, 1])), opacity: e, translate: `${tremor}px -60px`, textShadow: '0 12px 50px rgba(0,0,0,.6)'}}>
        PARA <span style={{color: COR.amarelo}}>TUDO</span>
      </div>
    </AbsoluteFill>
  );
};

const AbreAgora: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < CHEIA_1 - 0.05 || t >= SAI_1 + 0.05) return null;
  const e = mola(t, CHEIA_1, 11, 220);
  const pulso = 1 + 0.08 * Math.abs(Math.sin(t * 9));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1360, display: 'flex', justifyContent: 'center', opacity: e, scale: String((0.6 + 0.4 * e) * pulso)}}>
      <Pilula cor={COR.amarelo} tamanho={56} fundo="rgba(40,30,5,.94)">📱 ABRE AGORA</Pilula>
    </div>
  );
};

// O celular entra girando com um perfil "de estranho"; depois vai pro centro com o cursor hesitando no Seguir.
const Estranho: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < SAI_1 - 0.05 || t >= T.meio + 0.2) return null;
  const entra = mola(t, SAI_1, 12, 170);
  const centro = prog(t, SAI_2, 0.45, saida);
  const sai = prog(t, T.meio - 0.2, 0.3);
  const x = interpolate(centro, [0, 1], [40, 250]);
  const w = interpolate(centro, [0, 1], [520, 580]);
  const h = interpolate(centro, [0, 1], [700, 760]);
  const cursorX = 250 + 60 + Math.sin(t * 5) * 40;
  const hesita = t >= SAI_2 + 0.3;
  const seguiria = mola(t, M.voce + 0.15, 10, 220);
  return (
    <AbsoluteFill style={{opacity: 1 - sai}}>
      <Selo t={t} de={M.estranho - 0.2} cor={COR.vermelho} tamanho={40} rot={-5} style={{left: 50, top: 440, opacity: 1 - centro}}>PERFIL DE UM ESTRANHO</Selo>
      <Celular x={x} y={560} w={w} h={h} e={entra} rot={(1 - entra) * -70}>
        <TelaPerfil nome="Ana" usuario="ana_doces_oficial2" bio={<>{BIO_FRACA}</>} grade={GRADE_FRACA} />
      </Celular>
      {hesita && <div style={{position: 'absolute', left: cursorX, top: 560 + 395 + Math.cos(t * 4) * 12, fontSize: 70, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.6))'}}>👆</div>}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1170, display: 'flex', justifyContent: 'center', opacity: seguiria, scale: String(interpolate(seguiria, [0, 1], [1.8, 1])), rotate: `${-4 + (1 - seguiria) * 8}deg`}}>
        <Pilula cor={COR.amarelo} tamanho={72} fundo="rgba(40,30,5,.94)">VOCÊ SEGUIRIA?</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: fundo de pontos e card de voz ----------

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
    <div style={{position: 'absolute', left: 64, right: 64, top: 262, height: 130, display: 'flex', alignItems: 'center', gap: 26, opacity: entra * (1 - sai), translate: `0px ${(1 - entra) * -60}px`}}>
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

// ---------- Meio: o perfil (um só celular que muda ao longo da explicação) ----------

const Balao: React.FC<{t: number; de: number; ok: number; texto: string; okTexto: string; x: number; y: number; lado: -1 | 1}> = ({t, de, ok, texto, okTexto, x, y, lado}) => {
  const mola = useMola();
  const e = mola(t, de, 11, 220);
  const virou = t >= ok;
  const pop = mola(t, ok, 9, 260);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: e, scale: String((0.5 + 0.5 * e) * (virou ? 0.9 + 0.1 * pop : 1)), rotate: `${lado * 4}deg`}}>
      <div style={{padding: '16px 24px', borderRadius: 26, background: virou ? COR.verde : 'rgba(240,244,255,.97)', fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.marinho, whiteSpace: 'nowrap', boxShadow: '0 16px 40px rgba(0,0,0,.45)'}}>
        {virou ? `✓ ${okTexto}` : `❓ ${texto}`}
      </div>
    </div>
  );
};

const PerfilMeio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.reels - 0.1);
  if (!st) return null;
  const tel = mola(t, T.meio + 0.1, 13, 180);
  const bioFoco = prog(t, M.dica1, 0.4) * (1 - prog(t, M.dica2 - 0.2, 0.3));
  // Bio: fraca → apagada → nova digitada.
  let bio: React.ReactNode = BIO_FRACA;
  if (t >= M.apaixonada + 0.4) bio = <>{apagar(t, M.apaixonada + 0.4, M.escreve, BIO_FRACA)}<Cursor t={t} /></>;
  if (t >= M.escreve) {
    const l1 = digitar(t, M.escreve, M.festa + 0.5, BIO_L1);
    const l2 = digitar(t, M.festa + 0.5, M.direct + 0.3, BIO_L2);
    const grifo = prog(t, M.proprio, 0.5);
    const g = (s: string) => <span style={{background: `rgba(46,229,157,${0.45 * grifo})`, borderRadius: 6, padding: '0 3px', color: grifo > 0.5 ? '#fff' : undefined}}>{s}</span>;
    bio =
      grifo > 0.01 ? (
        <>
          🍫 {g('Brigadeiro gourmet')} pra festa em {g('Curitiba')}
          <br />
          {BIO_L2}
        </>
      ) : (
        <>
          {l1}
          {l2 ? <br /> : null}
          {l2}
          {t < M.direct + 0.3 && <Cursor t={t} />}
        </>
      );
  }
  const rolagem = interpolate(t, [M.dica2, M.dica2 + 0.5], [0, 250], {...clamp, easing: suave});
  const pin = FIXADOS.map((_, k) => prog(t, M.fixa + 0.3 + k * 0.25, 0.6, saida));
  const rotulos = FIXADOS.map((f) => prog(t, M[f.de], 0.3));
  const visitante = mola(t, M.quem, 12, 200) * (1 - prog(t, M.dica1 - 0.3, 0.3));
  const timer = Math.max(0, 3 - Math.floor((t - M.quem) / 1.2));
  const balaoSai = 1 - prog(t, M.direct + 0.8, 0.4);
  const busca = mola(t, M.aparece - 0.1, 12, 210) * (1 - prog(t, M.dica2 - 0.2, 0.25));
  const contador = mola(t, M.tres3, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Celular x={250} y={540} h={690} e={tel}>
        <TelaPerfil nome="Doces da Ana" usuario="docesdaana" bio={bio} grade={GRADE_BOA} rolagem={rolagem} pin={t >= M.fixa ? pin : undefined} rotulos={rotulos} bioFoco={bioFoco} />
      </Celular>
      {visitante > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: visitante}}>
          <Pilula cor={COR.vermelho} tamanho={40} fundo="rgba(60,10,20,.92)">👀 VISITANTE · ⏱️ {timer}s</Pilula>
        </div>
      )}
      <div style={{opacity: balaoSai}}>
        <Balao t={t} de={M.faz} ok={M.brigadeiro} texto="O QUE FAZ?" okTexto="BRIGADEIRO" x={20} y={700} lado={-1} />
        <Balao t={t} de={M.ela} ok={M.festa} texto="É PRA MIM?" okTexto="PRA FESTA" x={700} y={850} lado={1} />
        <Balao t={t} de={M.ganha} ok={M.direct} texto="O QUE EU GANHO?" okTexto="ENCOMENDA" x={20} y={1010} lado={-1} />
      </div>
      <Selo t={t} de={M.dica1} cor={COR.ciano} tamanho={56} rot={-4} style={{left: 60, top: 430, opacity: 1 - prog(t, M.aparece - 0.35, 0.2)}}>DICA 1 · BIO</Selo>
      {busca > 0.01 && (
        <div style={{position: 'absolute', left: 140, right: 140, top: 440, padding: '14px 20px', borderRadius: 20, background: '#262626', display: 'flex', alignItems: 'center', gap: 14, opacity: busca, translate: `0px ${(1 - busca) * 40}px`, boxShadow: '0 20px 50px rgba(0,0,0,.6)'}}>
          <span style={{fontSize: 30, filter: 'grayscale(1) brightness(1.6)'}}>🔍</span>
          <span style={{flex: 1, fontFamily: INTER, fontWeight: 600, fontSize: 24, color: '#fff', whiteSpace: 'nowrap'}}>{digitar(t, M.aparece - 0.1, M.aparece + 0.5, 'brigadeiro curitiba')}</span>
          {t >= M.aparece + 0.55 && <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 22, color: COR.verde, whiteSpace: 'nowrap'}}>✓ achou</span>}
        </div>
      )}
      <Selo t={t} de={M.dica2} cor={COR.ciano} tamanho={56} rot={-4} style={{left: 60, top: 430}}>DICA 2 · FIXADOS</Selo>
      {contador > 0.01 && (
        <div style={{position: 'absolute', left: 820, top: 445, opacity: contador, scale: String(0.6 + 0.4 * contador)}}>
          <Pilula cor={COR.amarelo} tamanho={40} fundo="rgba(40,30,5,.94)">📌 3/3</Pilula>
        </div>
      )}
      <Fonte t={t} de={M.proprio} ate={M.dica2} veiculo="Instagram (blog oficial)" titulo="Como funciona a busca: bio com palavras e cidade" />
      <Fonte t={t} de={M.fixar} ate={M.reels} veiculo="TechCrunch / TechRadar" titulo="Instagram deixa fixar até 3 posts no perfil (jun/2022)" />
    </AbsoluteFill>
  );
};

// ---------- Meio: funil Reels → perfil → seguidor ----------

const Funil: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.reels - 0.1, T.b - 0.1);
  if (!st) return null;
  const etapas = [
    {de: M.reels, icone: '▶️', nome: 'REELS', sub: 'traz a visita', cor: COR.azul},
    {de: M.perfil2, icone: '👤', nome: 'PERFIL', sub: 'convence', cor: COR.ciano},
    {de: M.seguidor, icone: '➕', nome: 'SEGUIDOR', sub: 'fica', cor: COR.verde},
  ];
  const fontes = mola(t, M.perfil2 + 0.4, 13, 200);
  return (
    <AbsoluteFill style={st}>
      {etapas.map((e, i) => {
        const on = mola(t, e.de, 11, 210);
        const seta = prog(t, e.de - 0.2, 0.4, saida);
        return (
          <React.Fragment key={e.nome}>
            {i > 0 && <div style={{position: 'absolute', left: 530, top: 440 + i * 190 - 34, width: 20, height: 40 * seta, borderRadius: 10, background: e.cor, boxShadow: `0 0 20px ${e.cor}`}} />}
            <div style={{position: 'absolute', left: 170 + i * 30, right: 170 + i * 30, top: 440 + i * 190, height: 150, padding: '0 36px', boxSizing: 'border-box', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 26, ...caixa, border: `4px solid ${e.cor}`, opacity: on, scale: String(0.7 + 0.3 * on), boxShadow: `0 0 ${40 * on}px ${e.cor}55`}}>
              <div style={{fontSize: 70}}>{e.icone}</div>
              <div>
                <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>{e.nome}</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: e.cor}}>{e.sub}</div>
              </div>
              {i === 2 && t >= M.seguidor + 0.2 && (
                <div style={{marginLeft: 'auto', padding: '14px 22px', borderRadius: 14, background: '#262626', fontFamily: INTER, fontWeight: 800, fontSize: 26, color: '#fff', scale: String(0.8 + 0.2 * mola(t, M.seguidor + 0.2, 9, 260))}}>Seguindo ✓</div>
              )}
            </div>
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: 110, right: 110, top: 1030, padding: '20px 26px', borderRadius: 22, background: 'rgba(240,244,255,.95)', opacity: fontes, translate: `0px ${(1 - fontes) * 30}px`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 24, color: COR.marinho, letterSpacing: 3}}>📰 FONTES</div>
        <div style={{marginTop: 6, fontFamily: INTER, fontSize: 22, color: COR.marinho}}><b>Instagram (blog oficial)</b> · Como funciona a busca</div>
        <div style={{marginTop: 4, fontFamily: INTER, fontSize: 22, color: COR.marinho}}><b>TechCrunch / TechRadar</b> · Fixar até 3 posts (2022)</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: CTA duplo ----------

const Enviar: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.manda - 0.05 || t >= SAI_B + 0.1) return null;
  const e = mola(t, M.manda, 10, 230);
  const pulso = 1 + 0.07 * Math.abs(Math.sin((t - M.manda) * 9));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: e, scale: String((0.6 + 0.4 * e) * pulso)}}>
      <Pilula cor={COR.verde} tamanho={66} fundo="rgba(10,40,40,.94)">↗️ ENVIAR</Pilula>
    </div>
  );
};

const ArrumaHoje: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, SAI_B, VOLTA_B - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={100} style={{textAlign: 'center', marginTop: -160}} pecas={[{texto: 'ARRUMA O PERFIL', s: SAI_B}, {texto: 'HOJE ↗️', s: SAI_B + 0.3, cor: COR.amarelo, brilho: true}]} />
      <Palavras t={t} tamanho={86} style={{textAlign: 'center', marginTop: 40}} pecas={[{texto: 'E SEGUE…', s: M.eB, cor: COR.ciano}]} />
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
  if (t < VOLTA_B - 0.05 || t >= M.toda) return null;
  const e = mola(t, VOLTA_B, 12, 200);
  const sai = prog(t, M.toda - 0.2, 0.2);
  return (
    <>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1110, opacity: e * (1 - sai), translate: `0px ${(1 - e) * 80}px`}}>
        <BotaoSeguir seguindo={t >= M.digo + 0.05} pop={mola(t, M.digo + 0.05, 9, 260)} />
      </div>
      <Toque t={t} de={VOLTA_B} toque={M.digo} x={840} y={1170} />
    </>
  );
};

const TodaSemana: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.toda - 0.05 || t > T.fim + 0.2) return null;
  const e = mola(t, M.toda, 10, 220);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), rotate: `${-3 + (1 - e) * 8}deg`}}>
      <Pilula cor={COR.ciano} tamanho={66} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)">TODA SEMANA TEM MAIS</Pilula>
    </div>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Grade t={t} />
      <ParaTudo t={t} />
      <AbreAgora t={t} />
      <Estranho t={t} />
      <PerfilMeio t={t} />
      <Funil t={t} />
      <CardVoz t={t} />
      <Enviar t={t} />
      <ArrumaHoje t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'impacto', em: 0.02, volume: 0.6},
  {som: 'pop', em: CHEIA_1, volume: 0.45},
  {som: 'swoosh', em: SAI_1, volume: 0.55},
  {som: 'pop', em: M.estranho - 0.2, volume: 0.45},
  {som: 'impacto', em: M.voce + 0.15, volume: 0.5},
  // Meio
  {som: 'pop', em: M.quem, volume: 0.45},
  ...passos(M.quem, M.quem + 3.6, 3).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'pop', em: M.faz, volume: 0.45},
  {som: 'pop', em: M.ela, volume: 0.45},
  {som: 'pop', em: M.ganha, volume: 0.45},
  {som: 'impacto', em: M.dica1, volume: 0.5},
  ...passos(M.apaixonada + 0.4, M.escreve, 6).map((s): Evento => ({som: 'tecla', em: s, volume: 0.45})),
  ...passos(M.escreve, M.direct + 0.3, 14).map((s): Evento => ({som: 'tecla', em: s, volume: 0.55})),
  {som: 'ding', em: M.brigadeiro, volume: 0.4},
  {som: 'ding', em: M.festa, volume: 0.4},
  {som: 'ding', em: M.direct, volume: 0.45},
  {som: 'risco', em: M.proprio, volume: 0.4},
  ...passos(M.aparece - 0.1, M.aparece + 0.5, 5).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  {som: 'ding', em: M.aparece + 0.55, volume: 0.45},
  {som: 'impacto', em: M.dica2, volume: 0.5},
  {som: 'swoosh', em: M.dica2, volume: 0.35},
  ...FIXADOS.map((_, k): Evento => ({som: 'pop', em: M.fixa + 0.3 + k * 0.25, volume: 0.45})),
  {som: 'ding', em: M.tres3, volume: 0.45},
  {som: 'pop', em: M.resultado, volume: 0.4},
  {som: 'pop', em: M.ensina, volume: 0.4},
  {som: 'pop', em: M.prova, volume: 0.4},
  {som: 'whoosh_in', em: M.reels - 0.3, volume: 0.45},
  {som: 'pop', em: M.reels, volume: 0.45},
  {som: 'pop', em: M.perfil2, volume: 0.45},
  {som: 'toque', em: M.seguidor + 0.2, volume: 0.6},
  {som: 'ding', em: M.seguidor + 0.25, volume: 0.45},
  // CTA
  {som: 'pop', em: M.manda, volume: 0.5},
  {som: 'swoosh', em: SAI_B, volume: 0.45},
  {som: 'pop', em: M.eB, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: M.toda, volume: 0.5},
];

// Legenda: o Whisper ouviu "Rios" no lugar de "Reels"; "dica 1." vira "dica 1:".
const LEGENDA = PALAVRAS.map((p) => (p.w === 'Rios' ? {...p, w: 'Reels'} : /^\d\.$/.test(p.w) ? {...p, w: p.w.replace('.', ':')} : p));

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'fora'},
    {de: CHEIA_1, modo: 'cheia', escala: [1.04, 1.08], punch: true},
    {de: SAI_1, modo: 'fora'},
    {de: CARD_1, modo: 'card'},
    {de: SAI_2, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.05]},
    {de: SAI_B, modo: 'fora'},
    {de: VOLTA_B, modo: 'cheia', escala: [1.03, 1.06]},
    {de: M.toda, modo: 'cheia', escala: [1.1, 1.16], punch: true},
  ],
  semLegenda: [
    [0, CHEIA_1],
    [SAI_2, T.meio],
    [M.dica1 - 0.1, M.dica1 + 0.45],
    [M.dica2 - 0.1, M.dica2 + 0.45],
    [SAI_B, VOLTA_B],
    [VOLTA_B, T.fim],
  ],
  corEspecial: {'seguidor.': COR.verde, 'cidade.': COR.verde},
  eventos: EVENTOS,
  Cena,
};
