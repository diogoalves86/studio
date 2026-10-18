import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check} from '../reels-avatar/Icones';
import {contar, Palavras, Risco, Selo, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 008 · Reels de dica: hashtag não aumenta o alcance (Mosseri; limite de 5 por post), mas ajuda na busca, e a busca
// lê legenda, bio e nome. Dicas: palavra do cliente na legenda; 5 hashtags com método; testar a hashtag na busca.
// Pedido do Diogo: fonte na tela em cada afirmação e as cenas de busca dentro de um app de busca "de verdade".

const T = TRECHOS;
const M = {
  trinta: em('30'),
  ne: em('né'),
  so: em('só'),
  quem: em('quem'),
  chefe: em('chefe'),
  hashtag: em('hashtag'),
  alcance: em('alcance'),
  tanto: em('tanto'),
  limite: em('limite'),
  cinco: em('5'),
  mas: em('mas'),
  inutil: em('inútil'),
  diz: em('diz'),
  aparecer: em('aparecer'),
  busca: em('busca'),
  le: em('lê'),
  legenda: em('legenda'),
  bio: em('bio'),
  nome: em('nome'),
  dica1: em('dica'),
  palavra: em('palavra'),
  curitiba: em('curitiba'),
  dica2: em('dica', em('curitiba')),
  metodo: em('método'),
  produto: em('produto'),
  nicho: em('nicho'),
  cidade: em('cidade'),
  publico: em('público'),
  marca: em('marca'),
  testa: em('testa'),
  pesquisa: em('pesquisa'),
  gigante: em('gigante'),
  nada: em('nada'),
  troca: em('troca'),
  alcance2: em('alcance', em('troca')),
  gancho: em('gancho'),
  conteudo: em('conteúdo'),
  hashtag3: em('hashtag', em('conteúdo')),
  procura: em('procura'),
  manda: em('manda', em('achar')),
  cola: em('cola'),
  segue: em('segue'),
  digo: em('digo'),
  toda: em('toda'),
};

// Momentos artificiais (sincronia.md): A 1,97–2,62 «Só… não é isso que» → motion desde «Só»;
// B 42,87–43,11 «segue o Digo» → botão Seguir em tela cheia; começo e fim de B ficam sob os wipes.
const SAI_1 = M.so - 0.05;
const SAI_B = M.segue - 0.25;
const VOLTA_B = M.toda - 0.1;

const digitar = (t: number, de: number, ate: number, texto: string) => texto.slice(0, Math.round(interpolate(t, [de, ate], [0, texto.length], clamp)));
const Cursor: React.FC<{t: number; cor?: string}> = ({t, cor = COR.branco}) => <span style={{color: cor, opacity: Math.round(t * 4) % 2 ? 1 : 0}}>|</span>;

// Selo de fonte no rodapé do conteúdo (autoridade): "📰 Fonte: veículo · título".
const Fonte: React.FC<{t: number; de: number; ate: number; veiculo: string; titulo: string; top?: number}> = ({t, de, ate, veiculo, titulo, top = 1240}) => {
  const mola = useMola();
  const e = mola(t, de, 13, 200) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 30}px`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, maxWidth: 940, padding: '12px 24px', borderRadius: 16, background: 'rgba(240,244,255,.95)', boxShadow: '0 12px 40px rgba(0,0,0,.45)'}}>
        <span style={{fontSize: 30}}>📰</span>
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.marinho, whiteSpace: 'nowrap'}}>Fonte: {veiculo}</span>
        <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 24, color: '#4A5578', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>· {titulo}</span>
      </div>
    </div>
  );
};

// ---------- Celular com a tela de busca do app (sem marca: só o padrão visual da busca) ----------

const ABAS = ['Para você', 'Contas', 'Áudio', 'Tags', 'Lugares'];

const Celular: React.FC<{x?: number; y?: number; w?: number; h?: number; e?: number; children: React.ReactNode}> = ({x = 250, y = 540, w = 580, h = 760, e = 1, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 60, border: '12px solid #1B2238', background: '#000', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.65), 0 0 0 2px rgba(255,255,255,.08)', scale: String(0.85 + 0.15 * e), opacity: e}}>
    <div style={{position: 'absolute', left: '50%', top: 10, width: 140, height: 30, borderRadius: 99, background: '#000', translate: '-50% 0', zIndex: 5}} />
    {children}
  </div>
);

const BarraBusca: React.FC<{t: number; texto: string; foco?: boolean; aba?: number}> = ({t, texto, foco, aba = 0}) => (
  <div style={{padding: '56px 22px 0'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, height: 66, padding: '0 22px', borderRadius: 18, background: '#262626', border: foco ? '2px solid rgba(255,255,255,.35)' : '2px solid transparent'}}>
      <span style={{fontSize: 30, filter: 'grayscale(1) brightness(1.6)'}}>🔍</span>
      <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 30, color: texto ? '#fff' : '#8E8E8E'}}>
        {texto || 'Pesquisar'}
        {foco && <Cursor t={t} cor="#3797F0" />}
      </span>
    </div>
    <div style={{display: 'flex', gap: 26, marginTop: 20, fontFamily: INTER, fontWeight: 700, fontSize: 24, color: '#8E8E8E', borderBottom: '1px solid #262626'}}>
      {ABAS.map((a, i) => (
        <div key={a} style={{paddingBottom: 12, color: i === aba ? '#fff' : '#8E8E8E', borderBottom: i === aba ? '3px solid #fff' : '3px solid transparent'}}>{a}</div>
      ))}
    </div>
  </div>
);

const Conta: React.FC<{nome: string; sub: string; cor: string; emoji: string; destaque?: number; style?: React.CSSProperties}> = ({nome, sub, cor, emoji, destaque = 0, style}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '14px 22px', borderRadius: 18, background: `rgba(46,229,157,${0.18 * destaque})`, boxShadow: destaque > 0 ? `0 0 ${40 * destaque}px rgba(46,229,157,.5)` : undefined, ...style}}>
    <div style={{width: 76, height: 76, borderRadius: 99, padding: 4, background: destaque > 0.5 ? 'conic-gradient(#FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)' : 'transparent', boxSizing: 'border-box', flexShrink: 0}}>
      <div style={{width: '100%', height: '100%', borderRadius: 99, background: cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '3px solid #000', boxSizing: 'border-box'}}>{emoji}</div>
    </div>
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: '#fff'}}>{nome}</div>
      <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 22, color: '#A8A8A8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{sub}</div>
    </div>
    {destaque > 0.5 && <Check tamanho={40} cor={COR.verde} />}
  </div>
);

// Teclado simplificado; a tecla da letra digitada acende.
const LINHAS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const Teclado: React.FC<{tecla?: string}> = ({tecla}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 8px 22px', background: '#1C1C1E', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
    {LINHAS.map((l) => (
      <div key={l} style={{display: 'flex', gap: 6}}>
        {l.split('').map((c) => (
          <div key={c} style={{width: 46, height: 58, borderRadius: 8, background: c === tecla ? '#fff' : '#3A3A3C', color: c === tecla ? '#000' : '#fff', fontFamily: INTER, fontWeight: 600, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', scale: c === tecla ? '1.15' : '1'}}>{c}</div>
        ))}
      </div>
    ))}
  </div>
);

// ---------- Abertura ----------

const GanchoTopo: React.FC<{t: number}> = ({t}) => {
  if (t >= SAI_1 + 0.1) return null;
  const pulso = 1 + 0.015 * Math.sin(t * 6);
  const sai = prog(t, SAI_1 - 0.15, 0.25);
  return (
    <div style={{position: 'absolute', left: 110, right: 110, top: 240, padding: '14px 10px', borderRadius: 26, background: 'rgba(5,10,30,.62)', border: `3px solid ${COR.amarelo}`, scale: String(pulso * (1 - 0.1 * sai)), opacity: 1 - sai, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 52, lineHeight: 1.08, color: COR.branco, textShadow: '0 4px 0 rgba(0,0,0,.5)'}}>
      HASHTAG NÃO FAZ <span style={{color: COR.amarelo}}>MILAGRE</span>
    </div>
  );
};

const TAGS = ['#reels', '#instagram', '#viral', '#explore', '#doces', '#love', '#fyp', '#instagood', '#foco', '#sucesso', '#tbt', '#moda', '#follow', '#like4like', '#food', '#happy', '#photooftheday', '#brasil', '#sp', '#amor', '#top', '#trend', '#bomdia', '#vibes', '#style', '#beauty', '#loja', '#promo', '#novidade', '#dicas'];

// Chuva de hashtags pelas laterais (fora do rosto) enquanto ele fala "trinta hashtags".
const Chuva: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.trinta - 0.05 || t >= SAI_1 + 0.1) return null;
  const n = contar(t, M.trinta, M.ne, 0, 30);
  const e = mola(t, M.trinta, 11, 220);
  return (
    <>
      {TAGS.map((tag, i) => {
        const de = M.trinta + (i % 15) * 0.07;
        const k = prog(t, de, 1.2, suave);
        if (k <= 0) return null;
        const esq = i % 2 === 0;
        const x = esq ? 20 + (i % 3) * 60 : 830 + (i % 3) * 50;
        return <div key={tag} style={{position: 'absolute', left: x, top: 380 + 900 * k + (i % 4) * 40, fontFamily: MONT, fontWeight: 800, fontSize: 30, color: i % 3 ? COR.ciano : COR.amarelo, opacity: Math.sin(Math.min(1, k) * Math.PI) * 0.95, rotate: `${(i % 5) * 6 - 12}deg`}}>{tag}</div>;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1370, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.6 + 0.4 * e)}}>
        <Pilula cor={COR.amarelo} tamanho={64} fundo="rgba(40,30,5,.92)">#{n}</Pilula>
      </div>
    </>
  );
};

// "Só que não é isso que faz ele chegar em mais gente": as tags quicam e se amontoam; o alcance não sai do lugar.
const Amontoado: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_1, T.meio - 0.05, 0);
  if (!st) return null;
  const tenta = interpolate(t, [SAI_1 + 0.6, SAI_1 + 1.0, SAI_1 + 1.4], [0, 0.35, 0], clamp);
  const ang = -120 + 240 * (0.12 + tenta);
  const igual = mola(t, SAI_1 + 1.3, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 240, top: 420, width: 600, height: 330}}>
        <svg width={600} height={330} viewBox="0 0 600 330">
          <path d="M 40 300 A 260 260 0 0 1 560 300" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={34} strokeLinecap="round" />
          <path d="M 40 300 A 260 260 0 0 1 560 300" pathLength={1} fill="none" stroke={COR.verde} strokeWidth={34} strokeLinecap="round" strokeDasharray={`${0.12 + tenta} 1`} />
        </svg>
        <div style={{position: 'absolute', left: 300 - 6, top: 300 - 230, width: 12, height: 230, borderRadius: 6, background: COR.branco, transformOrigin: '50% 100%', rotate: `${ang}deg`, boxShadow: '0 0 20px rgba(255,255,255,.6)'}} />
        <div style={{position: 'absolute', left: 300 - 26, top: 300 - 26, width: 52, height: 52, borderRadius: 99, background: COR.branco}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.cinza, letterSpacing: 4}}>ALCANCE</div>
      </div>
      {TAGS.map((tag, i) => {
        const de = SAI_1 + (i % 10) * 0.05;
        const k = prog(t, de, 0.75, saida);
        const quique = Math.abs(Math.sin(k * Math.PI * 2)) * (1 - k) * 80;
        const col = i % 6;
        const lin = Math.floor(i / 6);
        const x = 90 + col * 150 + (lin % 2) * 40;
        const yFinal = 1200 - lin * 52;
        return <div key={tag} style={{position: 'absolute', left: x, top: interpolate(k, [0, 1], [300, yFinal]) - quique, fontFamily: MONT, fontWeight: 800, fontSize: 30, color: i % 3 ? COR.ciano : COR.amarelo, rotate: `${((i * 37) % 30) - 15}deg`, opacity: 0.9}}>{tag}</div>;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center', opacity: igual, scale: String(0.6 + 0.4 * igual)}}>
        <Pilula cor={COR.vermelho} tamanho={56} fundo="rgba(60,10,20,.92)">👀 ALCANCE: IGUAL</Pilula>
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

// ---------- Meio: evidência ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.tanto - 0.12);
  if (!st) return null;
  const foto = mola(t, M.quem, 11, 160);
  const nome = mola(t, M.chefe, 13, 200);
  const citacao = mola(t, M.hashtag, 11, 200);
  const giro = (t * 40) % 360;
  const tam = interpolate(citacao, [0, 1], [440, 300]);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: interpolate(citacao, [0, 1], [460, 430]), width: tam, height: tam, borderRadius: 999, background: `conic-gradient(from ${giro}deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)`, padding: 12, boxSizing: 'border-box', scale: String(foto), rotate: `${(1 - foto) * -30}deg`, boxShadow: '0 30px 90px rgba(214,41,118,.45)'}}>
        <Img src={ARQ.mosseri} style={{width: '100%', height: '100%', borderRadius: 999, objectFit: 'cover', objectPosition: '50% 22%', border: `8px solid ${COR.marinho}`, boxSizing: 'border-box', rotate: `${(1 - foto) * 30}deg`}} />
      </div>
      <div style={{position: 'absolute', top: interpolate(citacao, [0, 1], [930, 750]), textAlign: 'center', opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: interpolate(citacao, [0, 1], [84, 60]), color: COR.branco}}>{digitar(t, M.chefe - 0.1, M.chefe + 0.5, 'Adam Mosseri')}</div>
        <div style={{marginTop: 4, fontFamily: INTER, fontWeight: 700, fontSize: 36, color: COR.ciano}}>chefe do Instagram</div>
      </div>
      {citacao > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 920, padding: '34px 40px', ...caixa, opacity: citacao, scale: String(0.8 + 0.2 * citacao)}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 110, lineHeight: 0.6, color: COR.amarelo}}>“</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 54, lineHeight: 1.15, color: COR.branco}}>
            Hashtag <span style={{color: COR.vermelho}}>não aumenta</span> o alcance.
          </div>
        </div>
      )}
      <div style={{position: 'absolute', top: 1200, fontFamily: INTER, fontWeight: 500, fontSize: 20, color: 'rgba(255,255,255,.55)', opacity: nome * (1 - citacao)}}>Foto: Anthony Quintano · CC BY 2.0</div>
      <Fonte t={t} de={M.alcance} ate={M.tanto} veiculo="Hootsuite" titulo="Mosseri: hashtags não afetam o alcance" />
    </AbsoluteFill>
  );
};

// "Tanto que agora o limite é de 5 por post": placar mecânico #30 → 5 e tags que se desfazem em partículas.
const Limite: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.tanto - 0.12, M.mas - 0.1);
  if (!st) return null;
  const n = contar(t, M.limite, M.cinco + 0.1, 30, 5);
  const slots = mola(t, M.cinco + 0.1, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={58} style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'LIMITE NOVO', s: M.tanto, cor: COR.amarelo, brilho: true}]} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', gap: 16}}>
        {['#', ...String(n).split('')].map((c, i) => (
          <div key={i} style={{width: 170, height: 230, borderRadius: 24, background: 'linear-gradient(180deg, #1B2546 50%, #141C38 50%)', border: '3px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 170, color: n <= 5 && i > 0 ? COR.verde : COR.branco, boxShadow: '0 20px 50px rgba(0,0,0,.5)', position: 'relative'}}>
            {c}
            <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 3, background: 'rgba(0,0,0,.6)'}} />
          </div>
        ))}
      </div>
      {TAGS.slice(0, 25).map((tag, i) => {
        const k = prog(t, M.limite + i * 0.03, 0.6, saida);
        if (k <= 0 || k >= 1) return null;
        const a = i * 1.7;
        return <div key={tag} style={{position: 'absolute', left: 540 + Math.cos(a) * (200 + 300 * k) - 60, top: 680 + Math.sin(a) * (120 + 260 * k), fontFamily: MONT, fontWeight: 800, fontSize: 26, color: COR.cinza, opacity: 1 - k, filter: `blur(${6 * k}px)`, scale: String(1 - 0.5 * k)}}>{tag}</div>;
      })}
      <div style={{position: 'absolute', left: 100, right: 100, top: 880, display: 'flex', gap: 14, justifyContent: 'center', opacity: slots}}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{width: 150, height: 90, borderRadius: 18, border: `4px dashed ${COR.verde}`, background: 'rgba(46,229,157,.08)', scale: String(mola(t, M.cinco + 0.1 + i * 0.08, 10, 240)), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.verde}}>#</div>
        ))}
      </div>
      <Selo t={t} de={M.cinco + 0.2} cor={COR.verde} tamanho={44} rot={-4} style={{left: 270, top: 1030}}>MÁXIMO 5 POR POST</Selo>
      <Fonte t={t} de={M.limite} ate={M.mas} veiculo="Social Media Today" titulo="Instagram limita o uso de hashtags (anúncio @creators)" />
    </AbsoluteFill>
  );
};

// "Mas ela não é inútil. Ela diz do que o seu post fala": carimbo "INÚTIL?" riscado por um marca-texto verde.
const Inutil: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.mas - 0.1, M.aparecer - 0.15);
  if (!st) return null;
  const carimbo = mola(t, M.inutil - 0.1, 9, 260);
  const marca = prog(t, M.diz - 0.1, 0.6, saida);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', scale: String(interpolate(carimbo, [0, 1], [2.4, 1])), opacity: Math.min(1, carimbo * 1.4), rotate: '-8deg'}}>
        <div style={{position: 'relative', padding: '24px 50px', border: `10px solid ${COR.vermelho}`, borderRadius: 26, fontFamily: MONT, fontWeight: 900, fontSize: 130, color: COR.vermelho, letterSpacing: 4}}>
          INÚTIL?
          {t >= M.diz - 0.1 && <Risco t={t} de={M.diz - 0.1} cor={COR.verde} espessura={22} />}
        </div>
      </div>
      <div style={{position: 'absolute', left: 120, right: 120, top: 900, height: 120, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 18, height: 90, width: `${marca * 100}%`, background: 'rgba(46,229,157,.55)', borderRadius: 10, rotate: '-1.5deg'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 66, color: COR.branco, clipPath: `inset(0 ${100 - marca * 100}% 0 0)`}}>SERVE PRA BUSCA</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1060, display: 'flex', justifyContent: 'center', opacity: mola(t, M.diz + 0.3, 12, 200)}}>
        <Pilula cor={COR.ciano} tamanho={38} fundo="rgba(10,30,70,.94)">🏷️ DIZ DO QUE O POST FALA</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: a busca lê mais coisa (perfil dentro do app, com raio-x) ----------

const Raiox: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.aparecer - 0.15, M.dica1 - 0.12);
  if (!st) return null;
  const tel = mola(t, M.aparecer - 0.1, 13, 180);
  const perfil = mola(t, M.le, 12, 190);
  const areas = [
    {de: M.legenda, nome: 'LEGENDA', y: 566, h: 76},
    {de: M.bio, nome: 'BIO', y: 350, h: 80},
    {de: M.nome, nome: 'NOME', y: 300, h: 46},
  ];
  const alvo = t >= M.nome ? 2 : t >= M.bio ? 1 : t >= M.legenda ? 0 : -1;
  const lupaY = alvo >= 0 ? areas[alvo].y + areas[alvo].h / 2 : 400;
  return (
    <AbsoluteFill style={st}>
      <Celular h={690} e={tel}>
        <BarraBusca t={t} texto={t >= M.busca ? digitar(t, M.busca, M.busca + 0.4, 'brigadeiro') : ''} foco={t < M.le} aba={1} />
        {/* Perfil encontrado (aparece em «lê mais coisa») */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 160, bottom: 0, background: '#000', opacity: perfil, translate: `0px ${(1 - perfil) * 120}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '20px 26px'}}>
            <div style={{width: 110, height: 110, borderRadius: 99, padding: 5, background: 'conic-gradient(#FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)', boxSizing: 'border-box'}}>
              <div style={{width: '100%', height: '100%', borderRadius: 99, background: '#7A3E6E', border: '4px solid #000', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50}}>🍫</div>
            </div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: '#fff'}}>docesdaana</div>
          </div>
          <div style={{padding: '0 26px', fontFamily: INTER, fontWeight: 700, fontSize: 28, color: '#fff'}}>Doces da Ana · Brigadeiro gourmet</div>
          <div style={{padding: '8px 26px', fontFamily: INTER, fontWeight: 500, fontSize: 26, lineHeight: 1.35, color: '#E0E0E0'}}>🍫 Brigadeiro gourmet em Curitiba<br />🎉 Encomendas pra festa infantil</div>
          <div style={{margin: '16px 26px 0', height: 120, borderRadius: 14, background: 'linear-gradient(135deg, #5B2E1E, #A0522D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60}}>🍫🍫🍫</div>
          <div style={{padding: '12px 26px', fontFamily: INTER, fontWeight: 500, fontSize: 24, lineHeight: 1.35, color: '#E0E0E0'}}><b>docesdaana</b> Brigadeiro gourmet pra festa infantil em Curitiba 🎂</div>
        </div>
        {areas.map((a, i) => {
          const on = prog(t, a.de, 0.3);
          if (on <= 0) return null;
          return (
            <div key={a.nome} style={{position: 'absolute', left: 12, right: 12, top: a.y, height: a.h, borderRadius: 14, border: `4px solid ${COR.verde}`, background: `rgba(46,229,157,${0.16 * on})`, opacity: on, boxShadow: alvo === i ? '0 0 30px rgba(46,229,157,.7)' : undefined}}>
              <div style={{position: 'absolute', right: 10, top: -22, padding: '4px 14px', borderRadius: 8, background: COR.verde, fontFamily: MONT, fontWeight: 900, fontSize: 22, color: COR.marinho}}>{a.nome} ✓</div>
            </div>
          );
        })}
      </Celular>
      {alvo >= 0 && <div style={{position: 'absolute', left: 830, top: 540 + lupaY - 60, fontSize: 110, transition: 'none', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,.6))'}}>🔍</div>}
      <Fonte t={t} de={M.le} ate={M.dica1} veiculo="Instagram (blog oficial, 2021) via Hootsuite" titulo="Como funciona a busca" />
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 1 (busca ao vivo) ----------

const BUSCA = 'brigadeiro gourmet curitiba';

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica1 - 0.12, M.dica2 - 0.12);
  if (!st) return null;
  const tel = mola(t, M.dica1 + 0.2, 13, 190);
  const texto = digitar(t, M.palavra, M.curitiba + 0.35, BUSCA);
  const ultima = texto.slice(-1);
  const sobe = prog(t, M.curitiba + 0.15, 0.7, saida);
  const contas = [
    {nome: 'brigadeiro.receitas', sub: 'Receitas · 1,2 mi seguidores', cor: '#5B2E1E', emoji: '📖'},
    {nome: 'gourmet.br', sub: 'Gastronomia · 840 mil', cor: '#264653', emoji: '🍽️'},
    {nome: 'curitibafood', sub: 'Curitiba · 95 mil', cor: '#2A9D8F', emoji: '🌲'},
    {nome: 'docesdaana', sub: 'Brigadeiro gourmet em Curitiba', cor: '#7A3E6E', emoji: '🍫'},
  ];
  const ordem = (i: number) => (i === 3 ? interpolate(sobe, [0, 1], [3, 0]) : i + sobe);
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica1} cor={COR.ciano} tamanho={56} rot={-4} style={{left: 70, top: 430}}>DICA 1</Selo>
      <Celular y={540} h={780} e={tel}>
        <BarraBusca t={t} texto={texto} foco aba={1} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 200, height: 360}}>
          {texto.length > 8 &&
            contas.map((c, i) => (
              <div key={c.nome} style={{position: 'absolute', left: 6, right: 6, top: ordem(i) * 92, opacity: mola(t, M.palavra + 0.6 + i * 0.1, 13, 200)}}>
                <Conta {...c} destaque={i === 3 ? sobe : 0} />
              </div>
            ))}
        </div>
        <Teclado tecla={t < M.curitiba + 0.35 && t >= M.palavra ? ultima : undefined} />
      </Celular>
      {sobe > 0.6 && (
        <div style={{position: 'absolute', left: 560, top: 440, scale: String(0.7 + 0.3 * mola(t, M.curitiba + 0.6, 10, 230))}}>
          <Pilula cor={COR.verde} tamanho={44} fundo="rgba(10,40,40,.94)">1º NA BUSCA ✓</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 2 (método das 5, cartas distribuídas) ----------

const CARTAS = [
  {de: 'produto', icone: '🍫', rotulo: 'PRODUTO', tag: '#brigadeirogourmet', cor: '#A0522D'},
  {de: 'nicho', icone: '🎂', rotulo: 'NICHO', tag: '#docesfinos', cor: '#C2378A'},
  {de: 'cidade', icone: '📍', rotulo: 'CIDADE', tag: '#docescuritiba', cor: '#2A9D8F'},
  {de: 'publico', icone: '🎉', rotulo: 'PÚBLICO', tag: '#festainfantil', cor: '#E9C46A'},
  {de: 'marca', icone: '⭐', rotulo: 'MARCA', tag: '#docesdaana', cor: '#3A86FF'},
] as const;

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica2 - 0.12, M.testa - 0.12);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica2} cor={COR.ciano} tamanho={56} rot={-4} style={{left: 70, top: 430}}>DICA 2</Selo>
      <Palavras t={t} tamanho={56} style={{position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: '5 HASHTAGS', s: M.dica2 + 0.6}, {texto: 'COM MÉTODO', s: M.metodo, cor: COR.amarelo, brilho: true}]} />
      {CARTAS.map((c, i) => {
        const distribui = prog(t, M.metodo + i * 0.08, 0.5, saida);
        const vira = prog(t, M[c.de], 0.35, suave);
        const col = i < 3 ? i : i - 3;
        const x0 = 540 - 110;
        const x1 = i < 3 ? 90 + col * 310 : 245 + col * 310;
        const y1 = i < 3 ? 670 : 980;
        const frente = vira > 0.5;
        return (
          <div key={c.tag} style={{position: 'absolute', left: interpolate(distribui, [0, 1], [x0, x1]), top: interpolate(distribui, [0, 1], [1300, y1]), width: 280, height: 280, opacity: distribui > 0 ? 1 : 0, rotate: `${interpolate(distribui, [0, 1], [-25, (i - 2) * 2])}deg`, transform: `perspective(900px) rotateY(${vira * 180}deg)`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: frente ? `linear-gradient(160deg, ${c.cor}, #0A1430)` : 'repeating-linear-gradient(45deg, #1B2546 0 16px, #24305A 16px 32px)', border: `4px solid ${frente ? c.cor : 'rgba(255,255,255,.2)'}`, boxShadow: '0 20px 50px rgba(0,0,0,.5)', transform: frente ? 'rotateY(180deg)' : undefined, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, boxSizing: 'border-box'}}>
              {frente ? (
                <>
                  <div style={{fontSize: 74}}>{c.icone}</div>
                  <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 24, color: COR.branco, letterSpacing: 3}}>{c.rotulo}</div>
                  <div style={{fontFamily: MONT, fontWeight: 900, fontSize: c.tag.length > 15 ? 22 : 27, color: COR.branco}}>{c.tag}</div>
                </>
              ) : (
                <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 90, color: 'rgba(255,255,255,.35)'}}>#</div>
              )}
            </div>
          </div>
        );
      })}
      <Fonte t={t} de={M.produto} ate={M.testa} veiculo="My Mobile India" titulo="Instagram orienta tags específicas, não genéricas" top={1268} />
    </AbsoluteFill>
  );
};

// ---------- Meio: o teste (busca na aba Tags) ----------

const Teste: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.testa - 0.12, M.alcance2 - 0.1);
  if (!st) return null;
  const tel = mola(t, M.testa, 13, 190);
  const trocou = t >= M.troca + 0.15;
  const texto = trocou ? digitar(t, M.troca + 0.15, M.troca + 0.5, '#docescuritiba') : digitar(t, M.pesquisa, M.pesquisa + 0.4, '#doces');
  const rola = interpolate(t, [M.gigante - 0.2, M.troca], [0, 1], clamp);
  const gigantes = ['2,3 mi', '1,8 mi', '950 mil', '3,1 mi', '1,2 mi', '780 mil'];
  const pequenos = ['1,2 mil', '860', '2,4 mil', '640', '1,9 mil', '3 mil'];
  const nada = mola(t, M.nada, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={58} style={{position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'TESTA ANTES', s: M.testa, cor: COR.amarelo, brilho: true}]} />
      <Celular y={540} h={760} e={tel}>
        <BarraBusca t={t} texto={texto} foco={t < M.gigante || (trocou && t < M.troca + 0.6)} aba={3} />
        {texto.length > 2 && (
          <div style={{padding: '18px 26px 0'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <div style={{width: 76, height: 76, borderRadius: 99, border: '2px solid #555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#fff'}}>#</div>
              <div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: '#fff'}}>{trocou ? '#docescuritiba' : '#doces'}</div>
                <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 24, color: '#A8A8A8'}}>{trocou ? '12 mil posts' : '48 mi posts'}</div>
              </div>
            </div>
          </div>
        )}
        <div style={{position: 'absolute', left: 0, right: 0, top: 300, bottom: 0, overflow: 'hidden'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, translate: `0px ${trocou ? 0 : -rola * 260}px`}}>
            {(trocou ? pequenos : [...gigantes, ...gigantes]).map((s, i) => (
              <div key={i} style={{position: 'relative', height: 180, background: trocou ? ['#7A3E6E', '#A0522D', '#5B2E1E'][i % 3] : ['#3A3F58', '#2F3550', '#454B66'][i % 3]}}>
                <div style={{position: 'absolute', left: 8, bottom: 8, padding: '3px 10px', borderRadius: 8, background: 'rgba(0,0,0,.65)', fontFamily: INTER, fontWeight: 800, fontSize: 18, color: trocou ? COR.verde : '#fff'}}>👤 {s}</div>
                {trocou && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50}}>🍫</div>}
              </div>
            ))}
          </div>
        </div>
      </Celular>
      {t >= M.gigante && !trocou && (
        <div style={{position: 'absolute', left: 60, top: 980, rotate: '-6deg', scale: String(0.6 + 0.4 * mola(t, M.gigante, 10, 230))}}>
          <Pilula cor={COR.vermelho} tamanho={34} fundo="rgba(60,10,20,.94)">✗ SÓ PERFIL GIGANTE</Pilula>
        </div>
      )}
      {nada > 0.01 && !trocou && (
        <div style={{position: 'absolute', left: 620, top: 1080, rotate: '5deg', opacity: nada, scale: String(0.6 + 0.4 * nada)}}>
          <Pilula cor={COR.vermelho} tamanho={34} fundo="rgba(60,10,20,.94)">✗ NADA A VER</Pilula>
        </div>
      )}
      <Selo t={t} de={M.troca} cor={COR.amarelo} tamanho={60} rot={-8} style={{left: 360, top: 1180}}>TROCA ↻</Selo>
    </AbsoluteFill>
  );
};

// ---------- Meio: fecho do argumento + fontes ----------

const Engrenagem: React.FC<{t: number; de: number; icone: string; nome: string; x: number; sentido: 1 | -1}> = ({t, de, icone, nome, x, sentido}) => {
  const mola = useMola();
  const e = mola(t, de, 11, 200);
  return (
    <div style={{position: 'absolute', left: x, top: 450, width: 300, textAlign: 'center', opacity: e, scale: String(0.6 + 0.4 * e)}}>
      <div style={{position: 'relative', width: 240, height: 240, margin: '0 auto'}}>
        <svg width={240} height={240} viewBox="0 0 100 100" style={{position: 'absolute', inset: 0, rotate: `${sentido * t * 60}deg`}}>
          {Array.from({length: 10}, (_, i) => <rect key={i} x={45} y={2} width={10} height={16} rx={2} fill={COR.azul} transform={`rotate(${i * 36} 50 50)`} />)}
          <circle cx={50} cy={50} r={36} fill="#1B2546" stroke={COR.azul} strokeWidth={5} />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80}}>{icone}</div>
      </div>
      <div style={{marginTop: 10, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>{nome}</div>
    </div>
  );
};

const FONTES = [
  ['Hootsuite', 'Mosseri: hashtags não afetam o alcance'],
  ['Social Media Today', 'Instagram limita a 5 hashtags por post'],
  ['Instagram (blog, 2021) via Hootsuite', 'Como funciona a busca'],
  ['My Mobile India', 'Prefira tags específicas'],
] as const;

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.alcance2 - 0.1, T.b - 0.1);
  if (!st) return null;
  const busca = mola(t, M.procura - 0.2, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <Engrenagem t={t} de={M.gancho} icone="⏱️" nome="GANCHO" x={150} sentido={1} />
      <Engrenagem t={t} de={M.conteudo} icone="↗️" nome="ENVIO" x={630} sentido={-1} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center', opacity: busca, scale: String(0.6 + 0.4 * busca)}}>
        <Pilula cor={COR.verde} tamanho={46} fundo="rgba(10,40,40,.94)">🔍 QUEM PROCURA, TE ACHA</Pilula>
      </div>
      <div style={{position: 'absolute', left: 100, right: 100, top: 920, padding: '22px 28px', borderRadius: 24, background: 'rgba(240,244,255,.95)', opacity: mola(t, M.hashtag3 - 0.2, 13, 200)}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 26, color: COR.marinho, letterSpacing: 3}}>📰 FONTES</div>
        {FONTES.map(([v, tit], i) => {
          const e = mola(t, M.hashtag3 + i * 0.15, 13, 210);
          return (
            <div key={v} style={{marginTop: 8, fontFamily: INTER, fontSize: 22, color: COR.marinho, opacity: e, translate: `${(1 - e) * 60}px 0px`}}>
              <b>{v}</b> · {tit}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: CTA duplo ----------

const EnviarTrinta: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.manda - 0.05 || t >= SAI_B + 0.1) return null;
  const e = mola(t, M.manda, 10, 230);
  const n = mola(t, M.cola, 11, 220);
  const pulso = 1 + 0.07 * Math.abs(Math.sin((t - M.manda) * 9));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: e, scale: String((0.6 + 0.4 * e) * pulso)}}>
        <Pilula cor={COR.verde} tamanho={66} fundo="rgba(10,40,40,.94)">↗️ ENVIAR</Pilula>
      </div>
      {n > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1300, display: 'flex', justifyContent: 'center', opacity: n, scale: String(0.6 + 0.4 * n)}}>
          <div style={{position: 'relative'}}>
            <Pilula cor={COR.amarelo} tamanho={50} fundo="rgba(40,30,5,.92)">#30 HASHTAGS</Pilula>
            <Risco t={t} de={M.cola + 0.4} espessura={10} />
          </div>
        </div>
      )}
    </>
  );
};

const BotaoSeguir: React.FC<{seguindo: boolean; pop: number}> = ({seguindo, pop}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '28px 32px', borderRadius: 40, background: 'rgba(8,16,44,.94)', border: '3px solid rgba(62,198,255,.4)', boxShadow: '0 30px 80px rgba(0,0,0,.55)'}}>
    <Img src={ARQ.logo} style={{width: 116, height: 116, borderRadius: 99, flexShrink: 0}} />
    <div style={{flex: 1}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>digo.social</div>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 28, color: COR.cinza}}>dicas pra crescer no Instagram</div>
    </div>
    <div style={{padding: '22px 34px', borderRadius: 22, fontFamily: INTER, fontWeight: 800, fontSize: 40, color: COR.branco, background: seguindo ? 'rgba(255,255,255,.14)' : COR.azul, scale: String(seguindo ? 0.9 + 0.1 * pop : 1), whiteSpace: 'nowrap'}}>
      {seguindo ? 'Seguindo ✓' : 'Seguir'}
    </div>
  </div>
);

const SeguirCheio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_B, VOLTA_B - 0.02, 0);
  if (!st) return null;
  const botao = mola(t, SAI_B + 0.05, 12, 200);
  const seguindo = t >= M.digo;
  const pop = mola(t, M.digo, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={96} style={{position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'E SEGUE', s: SAI_B + 0.05}, {texto: 'O DIGO', s: M.digo - 0.1, cor: COR.ciano, brilho: true}]} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 800, opacity: botao, translate: `0px ${(1 - botao) * 100}px`, scale: String(0.9 + 0.1 * botao)}}>
        <BotaoSeguir seguindo={seguindo} pop={pop} />
      </div>
      <Toque t={t} de={SAI_B + 0.05} toque={M.digo} x={820} y={880} />
    </AbsoluteFill>
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
      <GanchoTopo t={t} />
      <Chuva t={t} />
      <Amontoado t={t} />
      <Mosseri t={t} />
      <Limite t={t} />
      <Inutil t={t} />
      <Raiox t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <Teste t={t} />
      <Fecho t={t} />
      <CardVoz t={t} />
      <EnviarTrinta t={t} />
      <SeguirCheio t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'impacto', em: 0.02, volume: 0.45},
  ...passos(M.trinta, M.ne, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  ...passos(SAI_1 + 0.3, SAI_1 + 0.9, 5).map((s): Evento => ({som: 'pop', em: s, volume: 0.3})),
  {som: 'risco', em: SAI_1 + 1.3, volume: 0.45},
  // Evidência
  {som: 'whoosh_in', em: M.quem - 0.3, volume: 0.5},
  ...passos(M.chefe - 0.1, M.chefe + 0.5, 6).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  {som: 'impacto', em: M.hashtag, volume: 0.5},
  {som: 'pop', em: M.alcance, volume: 0.4},
  {som: 'whoosh_in', em: M.tanto - 0.3, volume: 0.45},
  ...passos(M.limite, M.cinco + 0.1, 10).map((s): Evento => ({som: 'tique', em: s, volume: 0.4})),
  {som: 'impacto', em: M.cinco + 0.2, volume: 0.5},
  {som: 'impacto', em: M.inutil - 0.1, volume: 0.6},
  {som: 'risco', em: M.diz - 0.1, volume: 0.5},
  // Busca
  {som: 'whoosh_in', em: M.aparecer - 0.3, volume: 0.45},
  ...passos(M.busca, M.busca + 0.4, 4).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  {som: 'swoosh', em: M.le, volume: 0.45},
  {som: 'ding', em: M.legenda, volume: 0.4},
  {som: 'ding', em: M.bio, volume: 0.4},
  {som: 'ding', em: M.nome, volume: 0.4},
  // Dica 1
  {som: 'impacto', em: M.dica1, volume: 0.5},
  ...passos(M.palavra, M.curitiba + 0.35, 16).map((s): Evento => ({som: 'tecla', em: s, volume: 0.55})),
  {som: 'swoosh', em: M.curitiba + 0.15, volume: 0.5},
  {som: 'ding', em: M.curitiba + 0.6, volume: 0.5},
  // Dica 2
  {som: 'impacto', em: M.dica2, volume: 0.5},
  ...passos(M.metodo, M.metodo + 0.4, 5).map((s): Evento => ({som: 'swoosh', em: s, volume: 0.3})),
  {som: 'pop', em: M.produto, volume: 0.45},
  {som: 'pop', em: M.nicho, volume: 0.45},
  {som: 'pop', em: M.cidade, volume: 0.45},
  {som: 'pop', em: M.publico, volume: 0.45},
  {som: 'pop', em: M.marca, volume: 0.45},
  // Teste
  {som: 'whoosh_in', em: M.testa - 0.3, volume: 0.45},
  ...passos(M.pesquisa, M.pesquisa + 0.4, 5).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  ...passos(M.gigante - 0.2, M.troca, 5).map((s): Evento => ({som: 'swoosh', em: s, volume: 0.25})),
  {som: 'risco', em: M.nada, volume: 0.4},
  {som: 'impacto', em: M.troca, volume: 0.5},
  ...passos(M.troca + 0.15, M.troca + 0.5, 6).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  // Fecho
  {som: 'whoosh_in', em: M.alcance2 - 0.3, volume: 0.45},
  {som: 'pop', em: M.gancho, volume: 0.45},
  {som: 'pop', em: M.conteudo, volume: 0.45},
  ...passos(M.hashtag3, M.hashtag3 + 0.45, 4).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'ding', em: M.procura - 0.2, volume: 0.45},
  // CTA
  {som: 'pop', em: M.manda, volume: 0.5},
  {som: 'risco', em: M.cola + 0.4, volume: 0.45},
  {som: 'swoosh', em: SAI_B, volume: 0.45},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: M.toda, volume: 0.5},
];

// Legenda: "dica 1." vira "dica 1:".
const LEGENDA = PALAVRAS.map((p) => (/^\d\.$/.test(p.w) ? {...p, w: p.w.replace('.', ':')} : p));

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: M.ne, modo: 'cheia', escala: [1.09, 1.13], punch: true},
    {de: SAI_1, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.05]},
    {de: SAI_B, modo: 'fora'},
    {de: VOLTA_B, modo: 'cheia', escala: [1.1, 1.16], punch: true},
  ],
  semLegenda: [
    [SAI_1, T.meio],
    [M.dica1 - 0.12, M.dica1 + 0.45],
    [M.dica2 - 0.12, M.dica2 + 0.45],
    [M.manda - 0.05, T.fim],
  ],
  corEspecial: {'alcance.': COR.vermelho, 'busca.': COR.verde, 'troca.': COR.amarelo},
  eventos: EVENTOS,
  Cena,
};
