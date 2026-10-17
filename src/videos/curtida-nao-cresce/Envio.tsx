import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check} from '../reels-avatar/Icones';
import {contar, Palavras, Risco, Selo, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 006 · Reels de dica: curtida não faz o perfil crescer, envio faz. Argumento em 5 passos:
// premissa (crescer = chegar em quem não te segue) → evidência (Adam Mosseri, jan/2025) → por que faz sentido
// (curtir é um toque, mandar é recomendar) → a pergunta muda → 2 dicas + como medir. CTA duplo: mandar + seguir.

const T = TRECHOS;
const dica2 = em('dica', em('canva'));
const M = {
  comemora: em('comemora'),
  curtida: em('curtida'),
  ne: em('né'),
  so: em('só'),
  faz: em('faz'),
  perfil: em('perfil'),
  crescer: em('crescer'),
  quem: em('quem'),
  ve: em('vê'),
  crescer2: em('crescer', em('vê')),
  chegar: em('chegar'),
  conhece: em('conhece'),
  e: em('e', em('conhece')),
  chefe: em('chefe'),
  explicou: em('explicou'),
  pra: em('pra', em('explicou')),
  curtida2: em('curtida', em('explicou')),
  mas: em('mas'),
  pesa2: em('pesa', em('mas')),
  envio: em('envio'),
  quando: em('quando'),
  manda: em('manda'),
  amigo: em('amigo'),
  sentido: em('sentido'),
  curtir: em('curtir'),
  toque: em('toque'),
  mandar: em('mandar'),
  recomendar: em('recomendar'),
  cada: em('cada'),
  pessoa: em('pessoa'),
  nova: em('nova'),
  entao: em('então'),
  pergunta: em('pergunta'),
  quantas: em('quantas'),
  vai: em('vai'),
  pra2: em('pra', em('ter')),
  mandaria: em('mandaria'),
  dica1: em('dica'),
  pensa2: em('pensa', em('dica')),
  amiga: em('amiga'),
  socio: em('sócio'),
  dica2,
  aposta: em('aposta', dica2),
  lista: em('lista'),
  passo: em('passo'),
  erro: em('erro'),
  estatisticas: em('estatísticas'),
  compart: em('compartilhamentos'),
  nao: em('não', em('compartilhamentos')),
  manda2: em('manda', em('compartilhamentos')),
  esse: em('esse', em('compartilhamentos')),
  segue: em('segue', em('compartilhamentos')),
  social: em('social'),
  toda: em('toda'),
};

// Momentos artificiais (sincronia.md):
// A: 0,14–0,41 «Você» (boca quase parada) → motion até «comemora»; 1,98–2,96 «que não é ela… crescer» → motion desde «Só».
// B: 43,14–44,84 «esse vídeo… Digo Social» → motion de «esse» até pouco antes de «Toda».
const ENTRA_A = M.comemora - 0.07;
const SAI_1 = M.so;
const SAI_B = M.esse + 0.02;
const VOLTA_B = M.toda - 0.45;

const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;
const formata = (n: number) => n.toLocaleString('pt-BR');

// Gradiente do Instagram, usado nos anéis de perfil.
const IG = 'conic-gradient(from 210deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)';

const Avatar: React.FC<{tamanho: number; cor?: string; emoji?: string; anel?: boolean; aceso?: number; style?: React.CSSProperties}> = ({tamanho, cor = COR.marinhoClaro, emoji, anel, aceso = 1, style}) => (
  <div style={{width: tamanho, height: tamanho, borderRadius: 999, padding: anel ? tamanho * 0.06 : 0, background: anel ? IG : undefined, boxSizing: 'border-box', filter: `grayscale(${1 - aceso}) brightness(${0.5 + 0.5 * aceso})`, ...style}}>
    <div style={{width: '100%', height: '100%', borderRadius: 999, background: cor, border: anel ? `${tamanho * 0.04}px solid ${COR.marinho}` : undefined, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: tamanho * 0.5}}>
      {emoji}
    </div>
  </div>
);

// ---------- Abertura ----------

// Corações explodindo do centro (cobre a boca parada no começo do clipe A).
const CORACOES = Array.from({length: 18}, (_, i) => ({ang: (i / 18) * Math.PI * 2 + (i % 3) * 0.2, dist: 260 + (i % 4) * 90, atraso: (i % 6) * 0.03, tam: 60 + (i % 3) * 26}));

const Explosao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, 0, ENTRA_A - 0.04, 0);
  if (!st) return null;
  const centro = mola(t, 0.02, 8, 260);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center', justifyContent: 'center'}}>
      {CORACOES.map((c, i) => {
        const k = prog(t, 0.04 + c.atraso, 0.5, saida);
        return <div key={i} style={{position: 'absolute', left: 540 - c.tam / 2 + Math.cos(c.ang) * c.dist * k, top: 860 - c.tam / 2 + Math.sin(c.ang) * c.dist * k, fontSize: c.tam, opacity: k * (1 - prog(t, 0.35, 0.15)), rotate: `${(i % 2 ? 1 : -1) * 25 * k}deg`}}>❤️</div>;
      })}
      <div style={{fontSize: 260, scale: String(centro), marginTop: -200, filter: 'drop-shadow(0 0 60px rgba(255,77,94,.8))'}}>❤️</div>
    </AbsoluteFill>
  );
};

// Contador de curtidas no topo enquanto ele comemora; corações sobem pelas laterais.
const Curtidas: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < ENTRA_A - 0.05 || t >= SAI_1 + 0.1) return null;
  const e = mola(t, ENTRA_A, 12, 210);
  const n = contar(t, ENTRA_A, M.ne + 0.1, 87, 342);
  const pulso = 1 + 0.08 * Math.abs(Math.sin(t * 14));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 268, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * -60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 40px', borderRadius: 30, background: 'rgba(5,10,30,.82)', border: `3px solid ${COR.vermelho}`, boxShadow: '0 16px 50px rgba(0,0,0,.5)'}}>
          <span style={{fontSize: 60, scale: String(pulso)}}>❤️</span>
          <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 70, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>{formata(n)}</span>
        </div>
      </div>
      {Array.from({length: 8}, (_, i) => {
        const de = ENTRA_A + i * 0.16;
        const k = prog(t, de, 1.1, suave);
        if (k <= 0 || k >= 1) return null;
        const x = i % 2 ? 900 + (i % 3) * 30 : 60 + (i % 3) * 30;
        return <div key={i} style={{position: 'absolute', left: x, top: 1250 - 700 * k, fontSize: 56, opacity: Math.sin(k * Math.PI), rotate: `${Math.sin(k * 6 + i) * 15}deg`}}>❤️</div>;
      })}
    </>
  );
};

// "Só que não é ela que faz seu perfil crescer": motion cheio (cobre a boca acelerada).
const NaoEhEla: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_1, T.meio - 0.05);
  if (!st) return null;
  const card = mola(t, M.perfil, 12, 200);
  const linha = prog(t, M.crescer, 0.6, saida);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={92} style={{position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'SÓ QUE', s: SAI_1}, {texto: 'NÃO É ELA', s: SAI_1 + 0.3, cor: COR.vermelho, brilho: true}]} />
      <div style={{position: 'absolute', left: 130, right: 130, top: 540, padding: 40, ...caixa, opacity: card, translate: `0px ${(1 - card) * 70}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
          <Avatar tamanho={120} anel cor={COR.azul} emoji="🛍️" />
          <div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza}}>seguidores</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 84, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>1.204</div>
          </div>
        </div>
        <svg width={740} height={200} viewBox="0 0 740 200" style={{marginTop: 20}}>
          <line x1={0} y1={190} x2={740} y2={190} stroke="rgba(255,255,255,.15)" strokeWidth={3} />
          <path d="M 10 120 L 130 118 L 250 121 L 370 119 L 490 120 L 610 118 L 730 120" pathLength={1} fill="none" stroke={COR.vermelho} strokeWidth={10} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} />
        </svg>
        <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.vermelho, opacity: linha}}>parado há 3 meses</div>
      </div>
      <Palavras t={t} tamanho={70} style={{position: 'absolute', top: 1090, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'QUE FAZ SEU PERFIL', s: M.faz}, {texto: 'CRESCER', s: M.crescer, cor: COR.verde, brilho: true}]} />
    </AbsoluteFill>
  );
};

// ---------- Meio: fundo de pontos e card de voz ----------

// Grade de pontos que deriva devagar atrás das cenas do meio (profundidade).
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

// ---------- Meio: premissa ----------

// Pontos do "público que ainda não te conhece", espalhados num círculo grande.
const MULTIDAO = Array.from({length: 70}, (_, i) => {
  const r = 100 + ((i * 37) % 200);
  const a = i * 2.39996;
  return {x: Math.cos(a) * r, y: Math.sin(a) * r * 0.92, atraso: (i % 10) * 0.02};
});

const Publicos: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.e - 0.08);
  if (!st) return null;
  const peq = mola(t, M.quem, 12, 200);
  const grande = mola(t, M.crescer2, 14, 150);
  const seta = prog(t, M.chegar, 0.6, saida);
  const acende = prog(t, M.conhece, 0.5);
  const GX = 620;
  const GY = 860;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: GX - 330, top: GY - 330, width: 660, height: 660, borderRadius: 999, border: '4px dashed rgba(154,167,199,.5)', background: 'radial-gradient(circle, rgba(19,33,74,.6), rgba(10,20,48,.2))', scale: String(grande), opacity: grande}} />
      {MULTIDAO.map((p, i) => {
        const e = mola(t, M.crescer2 + 0.1 + p.atraso, 14, 200);
        const luz = prog(t, M.conhece + p.atraso * 2, 0.3);
        return <div key={i} style={{position: 'absolute', left: GX + p.x - 13, top: GY + p.y - 13, width: 26, height: 26, borderRadius: 99, background: luz > 0 ? `rgba(46,229,157,${0.25 + 0.6 * luz * (i % 3 === 0 ? 1 : 0.3)})` : 'rgba(154,167,199,.35)', scale: String(e)}} />;
      })}
      <div style={{position: 'absolute', left: GX - 260, top: GY + 345, width: 520, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 38, lineHeight: 1.15, color: COR.cinza, opacity: grande}}>
        QUEM AINDA <span style={{color: acende > 0.5 ? COR.verde : COR.cinza}}>NÃO TE CONHECE</span>
      </div>
      <div style={{position: 'absolute', left: 70, top: 440, width: 280, textAlign: 'center', opacity: peq, scale: String(0.5 + 0.5 * peq)}}>
        <div style={{width: 220, height: 220, margin: '0 auto', borderRadius: 999, background: `radial-gradient(circle, ${COR.azul}, #1B4FB8)`, boxShadow: `0 0 60px ${COR.azul}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90}}>👥</div>
        <div style={{marginTop: 12, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>SEGUIDORES</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.ciano, opacity: mola(t, M.ve, 12, 200)}}>já te veem 👀</div>
      </div>
      {seta > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M 300 700 Q 340 820 440 830" pathLength={1} fill="none" stroke={COR.verde} strokeWidth={12} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - seta} style={{filter: `drop-shadow(0 0 12px ${COR.verde})`}} />
          {seta > 0.95 && <path d="M 418 802 L 448 830 L 410 850" fill="none" stroke={COR.verde} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      )}
      {seta > 0.3 && (
        <div style={{position: 'absolute', left: 90, top: 860, rotate: '-8deg', opacity: seta}}>
          <Pilula cor={COR.verde} tamanho={40} fundo="rgba(10,40,40,.92)">CRESCER</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Meio: evidência (foto e nome dão credibilidade) ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.e - 0.08, M.pra - 0.12);
  if (!st) return null;
  const foto = mola(t, M.e, 11, 160);
  const nome = mola(t, M.chefe, 13, 200);
  const data = mola(t, M.explicou, 11, 220);
  const giro = (t * 40) % 360;
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 470, width: 470, height: 470, borderRadius: 999, background: `conic-gradient(from ${giro}deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)`, padding: 14, boxSizing: 'border-box', scale: String(foto), rotate: `${(1 - foto) * -30}deg`, boxShadow: '0 30px 90px rgba(214,41,118,.45)'}}>
        <Img src={ARQ.mosseri} style={{width: '100%', height: '100%', borderRadius: 999, objectFit: 'cover', objectPosition: '50% 22%', border: `10px solid ${COR.marinho}`, boxSizing: 'border-box', rotate: `${-(1 - foto) * -30}deg`}} />
      </div>
      <div style={{position: 'absolute', top: 980, textAlign: 'center', opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 88, color: COR.branco}}>Adam Mosseri</div>
        <div style={{marginTop: 4, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.ciano}}>chefe do Instagram</div>
      </div>
      <div style={{position: 'absolute', top: 1180, opacity: data, scale: String(0.6 + 0.4 * data)}}>
        <Pilula cor={COR.amarelo} tamanho={36} fundo="rgba(40,30,5,.9)">🎙️ EXPLICOU EM JAN/2025</Pilula>
      </div>
      <div style={{position: 'absolute', top: 1268, fontFamily: INTER, fontWeight: 500, fontSize: 20, color: 'rgba(255,255,255,.55)', opacity: nome}}>Foto: Anthony Quintano · CC BY 2.0</div>
    </AbsoluteFill>
  );
};

// Selo pequeno com a foto, para a balança continuar "assinada" pelo Mosseri.
const SeloFonte: React.FC<{t: number; de: number; ate: number}> = ({t, de, ate}) => {
  const mola = useMola();
  const e = mola(t, de, 13, 200) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center', opacity: e}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 26px 10px 10px', borderRadius: 999, background: 'rgba(8,16,40,.9)', border: '2px solid rgba(255,255,255,.2)'}}>
        <Img src={ARQ.mosseri} style={{width: 58, height: 58, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%'}} />
        <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.cinza}}>segundo <b style={{color: COR.branco}}>Adam Mosseri</b></span>
      </div>
    </div>
  );
};

// "Pra quem te segue, a curtida pesa um pouco mais. Mas pra chegar em quem não te segue, o que pesa mais é o envio."
const Balanca: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pra - 0.12, M.quando - 0.1);
  if (!st) return null;
  const base = mola(t, M.pra, 13, 180);
  const coracao = mola(t, M.curtida2, 9, 220);
  const envio = mola(t, M.envio, 8, 200);
  // Inclinação: um pouco para a esquerda (curtida), depois bem para a direita (envio).
  const ang = interpolate(coracao, [0, 1], [0, -5]) + interpolate(envio, [0, 1], [0, 19]);
  const destaque = prog(t, M.mas, 0.4);
  const rad = (ang * Math.PI) / 180;
  const L = 330;
  const prato = (lado: -1 | 1) => ({x: 540 + lado * L * Math.cos(rad), y: 830 + lado * L * Math.sin(rad)});
  const esq = prato(-1);
  const dir = prato(1);
  const Prato: React.FC<{p: {x: number; y: number}; titulo: string; cor: string; aceso: number; children?: React.ReactNode}> = ({p, titulo, cor, aceso, children}) => (
    <div style={{position: 'absolute', left: p.x - 170, top: p.y, width: 340, textAlign: 'center'}}>
      <div style={{width: 4, height: 90, margin: '0 auto', background: 'rgba(255,255,255,.5)'}} />
      <div style={{position: 'relative', height: 150, borderRadius: '0 0 170px 170px', background: `linear-gradient(180deg, ${cor}55, ${cor}22)`, border: `5px solid ${cor}`, borderTop: 'none', boxShadow: aceso > 0 ? `0 0 ${50 * aceso}px ${cor}` : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </div>
      <div style={{marginTop: 16, fontFamily: MONT, fontWeight: 900, fontSize: 32, lineHeight: 1.15, color: COR.branco}}>{titulo}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{...st, opacity: Number(st.opacity) * base}}>
      <SeloFonte t={t} de={M.pra} ate={M.quando} />
      <div style={{position: 'absolute', left: 520, top: 830, width: 40, height: 400, borderRadius: 20, background: 'linear-gradient(180deg, #C9D4F2, #6C7BA8)'}} />
      <div style={{position: 'absolute', left: 440, top: 1210, width: 200, height: 30, borderRadius: 15, background: '#6C7BA8'}} />
      <div style={{position: 'absolute', left: 540 - L - 20, top: 818, width: 2 * L + 40, height: 24, borderRadius: 12, background: 'linear-gradient(90deg, #C9D4F2, #FFFFFF, #C9D4F2)', rotate: `${ang}deg`, boxShadow: '0 10px 30px rgba(0,0,0,.4)'}} />
      <div style={{position: 'absolute', left: 515, top: 805, width: 50, height: 50, borderRadius: 99, background: COR.branco}} />
      <Prato p={esq} titulo="QUEM JÁ TE SEGUE" cor={COR.azul} aceso={coracao * (1 - destaque * 0.6)}>
        <div style={{fontSize: 100, scale: String(coracao), translate: `0px ${(1 - coracao) * -300}px`}}>❤️</div>
      </Prato>
      <Prato p={dir} titulo="QUEM AINDA NÃO TE SEGUE" cor={COR.verde} aceso={envio}>
        <div style={{fontSize: 120, scale: String(envio), translate: `0px ${(1 - envio) * -400}px`}}>↗️</div>
      </Prato>
      {coracao > 0.5 && (
        <div style={{position: 'absolute', left: esq.x - 120, top: esq.y - 90, opacity: 1 - destaque * 0.5}}>
          <Pilula cor={COR.azul} tamanho={30}>CURTIDA</Pilula>
        </div>
      )}
      {envio > 0.5 && (
        <div style={{position: 'absolute', left: dir.x - 110, top: dir.y - 100, scale: String(envio)}}>
          <Pilula cor={COR.verde} tamanho={36} fundo="rgba(10,40,40,.92)">ENVIO</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// "É quando alguém manda o seu post pra um amigo."
const Direct: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.quando - 0.1, M.sentido - 0.25);
  if (!st) return null;
  const marcada = t >= M.manda + 0.2;
  const enviado = mola(t, M.amigo, 11, 220);
  const aviao = prog(t, M.amigo - 0.1, 0.7, saida);
  const contatos = [
    {nome: 'Ana', cor: '#E76F51', emoji: '👩'},
    {nome: 'Bia', cor: '#2A9D8F', emoji: '👩‍🦱'},
    {nome: 'Carlos', cor: '#3A86FF', emoji: '🧔'},
  ];
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 450, padding: 34, ...caixa}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{width: 130, height: 130, borderRadius: 22, background: 'linear-gradient(135deg, #7A3E6E, #C2678A)', flexShrink: 0}} />
          <div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>Seu post</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 28, color: COR.cinza}}>Enviar para…</div>
          </div>
        </div>
        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 16}}>
          {contatos.map((c, i) => {
            const sel = i === 0 && marcada;
            return (
              <div key={c.nome} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '14px 18px', borderRadius: 22, background: sel ? 'rgba(46,229,157,.14)' : 'rgba(255,255,255,.05)', border: sel ? `3px solid ${COR.verde}` : '3px solid transparent'}}>
                <Avatar tamanho={72} cor={c.cor} emoji={c.emoji} />
                <div style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 36, color: COR.branco}}>{c.nome}</div>
                <div style={{width: 46, height: 46, borderRadius: 99, border: `4px solid ${sel ? COR.verde : 'rgba(255,255,255,.35)'}`, background: sel ? COR.verde : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {sel && <Check tamanho={30} cor={COR.marinho} />}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 24, padding: '22px 0', borderRadius: 22, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 36, color: enviado > 0.5 ? COR.marinho : COR.branco, background: enviado > 0.5 ? COR.verde : COR.azul}}>
          {enviado > 0.5 ? 'Enviado ✓' : 'Enviar'}
        </div>
      </div>
      <Toque t={t} de={M.manda - 0.25} toque={M.manda + 0.15} x={830} y={760} />
      {aviao > 0 && aviao < 1 && <div style={{position: 'absolute', left: 540 + 420 * aviao, top: 1150 - 700 * aviao, fontSize: 90, rotate: '-20deg', opacity: 1 - aviao * 0.6}}>✈️</div>}
    </AbsoluteFill>
  );
};

// ---------- Meio: por que faz sentido ----------

const ToqueRecomenda: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.sentido - 0.25, M.cada - 0.1);
  if (!st) return null;
  const topo = mola(t, M.curtir, 12, 200);
  const batida = interpolate(t, [M.toque, M.toque + 0.08, M.toque + 0.2], [1, 1.35, 1], clamp);
  const baixo = mola(t, M.mandar, 12, 200);
  const balao = mola(t, M.mandar + 0.25, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={64} style={{position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'FAZ SENTIDO', s: M.sentido - 0.2, cor: COR.amarelo}]} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 560, height: 300, padding: 36, boxSizing: 'border-box', ...caixa, display: 'flex', alignItems: 'center', gap: 36, opacity: topo, translate: `${(1 - topo) * -200}px 0px`}}>
        <div style={{fontSize: 130, scale: String(batida)}}>❤️</div>
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco}}>CURTIR</div>
          <div style={{marginTop: 8, display: 'inline-flex', opacity: mola(t, M.toque, 12, 220)}}>
            <Pilula cor={COR.cinza} tamanho={32}>= 1 TOQUE</Pilula>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 890, padding: 36, boxSizing: 'border-box', ...caixa, border: `4px solid ${COR.verde}`, opacity: baixo, translate: `${(1 - baixo) * 200}px 0px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
          <div style={{fontSize: 110}}>↗️</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco}}>MANDAR</div>
        </div>
        <div style={{marginTop: 18, display: 'inline-block', padding: '20px 28px', borderRadius: '30px 30px 30px 8px', background: COR.azul, fontFamily: INTER, fontWeight: 700, fontSize: 36, color: COR.branco, opacity: balao, scale: String(0.7 + 0.3 * balao), transformOrigin: '0% 100%'}}>
          Olha isso, é a sua cara! 👀
        </div>
      </div>
      <Selo t={t} de={M.recomendar} cor={COR.verde} tamanho={50} rot={6} style={{left: 300, top: 1150}}>= RECOMENDAÇÃO</Selo>
      <Toque t={t} de={M.curtir} toque={M.toque} x={150} y={680} tamanho={130} />
    </AbsoluteFill>
  );
};

// "E cada envio leva o seu post direto pra uma pessoa nova": o post viaja e acende perfis novos em cadeia.
const NOS = [
  {x: 220, y: 760},
  {x: 800, y: 700},
  {x: 640, y: 1080},
  {x: 900, y: 1130},
];

const PessoaNova: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.cada - 0.1, M.entao - 0.1);
  if (!st) return null;
  const saltos = [
    {de: M.cada + 0.1, a: 0, b: 1},
    {de: M.nova + 0.25, a: 1, b: 2},
    {de: M.nova + 0.45, a: 1, b: 3},
  ];
  const acesoEm = [M.cada - 0.1, M.pessoa, M.nova + 0.7, M.nova + 0.9];
  const novas = t >= M.nova + 0.9 ? 3 : t >= M.nova + 0.7 ? 2 : t >= M.pessoa ? 1 : 0;
  return (
    <AbsoluteFill style={st}>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {saltos.map((s, i) => {
          const k = prog(t, s.de, 0.8, saida);
          const A = NOS[s.a];
          const B = NOS[s.b];
          const cx = (A.x + B.x) / 2;
          const cy = Math.min(A.y, B.y) - 160;
          return <path key={i} d={`M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`} pathLength={1} fill="none" stroke={COR.verde} strokeWidth={8} strokeDasharray="0.025 0.02" strokeDashoffset={-t * 0.15} opacity={0.8 * k} strokeLinecap="round" />;
        })}
      </svg>
      {saltos.map((s, i) => {
        const k = prog(t, s.de, 0.8, saida);
        if (k <= 0 || k >= 1) return null;
        const A = NOS[s.a];
        const B = NOS[s.b];
        const cx = (A.x + B.x) / 2;
        const cy = Math.min(A.y, B.y) - 160;
        const x = (1 - k) ** 2 * A.x + 2 * (1 - k) * k * cx + k ** 2 * B.x;
        const y = (1 - k) ** 2 * A.y + 2 * (1 - k) * k * cy + k ** 2 * B.y;
        return <div key={i} style={{position: 'absolute', left: x - 40, top: y - 40, width: 80, height: 80, borderRadius: 14, background: 'linear-gradient(135deg, #7A3E6E, #C2678A)', border: '4px solid #fff', boxShadow: '0 0 30px rgba(194,103,138,.8)'}} />;
      })}
      {NOS.map((n, i) => {
        const aceso = prog(t, acesoEm[i], 0.3);
        const e = mola(t, i === 0 ? M.cada - 0.1 : M.cada + 0.05 * i, 13, 200);
        return (
          <div key={i} style={{position: 'absolute', left: n.x - 75, top: n.y - 75, textAlign: 'center', scale: String(e * (1 + 0.15 * Math.sin(Math.min(1, aceso) * Math.PI)))}}>
            <Avatar tamanho={150} anel={aceso > 0.5} cor={i === 0 ? COR.azul : '#2A3354'} emoji={i === 0 ? '🛍️' : '🙂'} aceso={i === 0 ? 1 : 0.3 + 0.7 * aceso} />
            {i === 0 && <div style={{marginTop: 8, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.branco}}>VOCÊ</div>}
          </div>
        );
      })}
      {novas > 0 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1240, display: 'flex', justifyContent: 'center', scale: String(0.8 + 0.2 * mola(t, M.pessoa, 9, 260))}}>
          <Pilula cor={COR.verde} tamanho={52} fundo="rgba(10,40,40,.92)">+{novas} {novas > 1 ? 'PESSOAS NOVAS' : 'PESSOA NOVA'}</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Meio: a pergunta muda ----------

const Pergunta: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.entao - 0.1, M.dica1 - 0.12);
  if (!st) return null;
  const velha = mola(t, M.quantas, 12, 200);
  const sai = prog(t, M.pra2 - 0.1, 0.35);
  const nova = mola(t, M.pra2, 10, 200);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={58} style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'ANTES DE POSTAR', s: M.entao, cor: COR.cinza}]} />
      <Palavras t={t} tamanho={96} style={{position: 'absolute', top: 530, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'A PERGUNTA', s: M.pergunta - 0.1}, {texto: 'MUDA', s: M.pergunta + 0.3, cor: COR.amarelo, brilho: true}]} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', opacity: velha * (1 - 0.6 * sai), scale: String((0.7 + 0.3 * velha) * (1 - 0.15 * sai)), translate: `0px ${-60 * sai}px`}}>
        <div style={{position: 'relative', padding: '26px 40px', borderRadius: 28, background: 'rgba(60,10,20,.8)', border: `4px solid ${COR.vermelho}`, fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco}}>
          ❤️ QUANTAS CURTIDAS?
          {t >= M.vai && <Risco t={t} de={M.vai} espessura={14} />}
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 950, padding: '40px 30px', borderRadius: 36, textAlign: 'center', background: 'linear-gradient(135deg, rgba(47,123,255,.25), rgba(46,229,157,.25))', border: `5px solid ${COR.verde}`, boxShadow: `0 0 ${60 * nova}px rgba(46,229,157,.5)`, opacity: nova, scale: String(0.7 + 0.3 * nova)}}>
        <div style={{fontSize: 90}}>↗️</div>
        <Palavras t={t} tamanho={74} style={{textAlign: 'center'}} pecas={[{texto: 'PRA QUEM', s: M.pra2}, {texto: 'ALGUÉM MANDARIA?', s: M.mandaria - 0.2, cor: COR.verde, brilho: true}]} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 1 ----------

const Pessoa: React.FC<{t: number; de: number; emoji: string; cor: string; texto: string; y: number; lado: -1 | 1}> = ({t, de, emoji, cor, texto, y, lado}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  const chip = mola(t, de + 0.45, 11, 220);
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: y, padding: 30, ...caixa, display: 'flex', alignItems: 'center', gap: 28, opacity: e, translate: `${(1 - e) * 200 * lado}px 0px`, rotate: `${lado * 1.5}deg`}}>
      <Avatar tamanho={130} cor={cor} emoji={emoji} anel />
      <div style={{flex: 1}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, lineHeight: 1.15, color: COR.branco}}>{texto}</div>
        <div style={{marginTop: 12, display: 'inline-flex', opacity: chip, scale: String(0.6 + 0.4 * chip), transformOrigin: '0% 50%'}}>
          <Pilula cor={COR.verde} tamanho={28} fundo="rgba(10,40,40,.92)">↗️ MANDA PRA ELA</Pilula>
        </div>
      </div>
    </div>
  );
};

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.dica1 - 0.12, M.dica2 - 0.12);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica1} cor={COR.ciano} tamanho={64} rot={-4} style={{left: 90, top: 440}}>DICA 1</Selo>
      <Palavras t={t} tamanho={66} style={{position: 'absolute', top: 580, left: 90, right: 60}} pecas={[{texto: 'PENSA NUMA', s: M.pensa2}, {texto: 'PESSOA', s: M.pensa2 + 0.5, cor: COR.ciano, brilho: true}]} />
      <Pessoa t={t} de={M.amiga} emoji="👩‍💻" cor="#C2378A" texto="a amiga que vive no Canva" y={720} lado={-1} />
      <Pessoa t={t} de={M.socio} emoji="🧔" cor="#2A9D8F" texto="o sócio que nunca posta" y={980} lado={1} />
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 2 ----------

const Formato: React.FC<{t: number; de: number; icone: string; titulo: string; envios: number; y: number}> = ({t, de, icone, titulo, envios, y}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 210);
  const n = contar(t, de + 0.2, de + 1.4, 0, envios);
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: y, height: 150, padding: '0 36px', boxSizing: 'border-box', ...caixa, display: 'flex', alignItems: 'center', gap: 26, opacity: e, scale: String(0.85 + 0.15 * e), translate: `0px ${(1 - e) * 80}px`}}>
      <div style={{fontSize: 70}}>{icone}</div>
      <div style={{flex: 1, fontFamily: MONT, fontWeight: 900, fontSize: titulo.length > 16 ? 40 : 50, lineHeight: 1.1, color: COR.branco}}>{titulo}</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: COR.verde, fontVariantNumeric: 'tabular-nums'}}>↗️ {n}</div>
    </div>
  );
};

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.dica2 - 0.12, M.estatisticas - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica2} cor={COR.ciano} tamanho={64} rot={-4} style={{left: 90, top: 440}}>DICA 2</Selo>
      <Palavras t={t} tamanho={58} style={{position: 'absolute', top: 580, left: 90, right: 60}} pecas={[{texto: 'APOSTA NO QUE', s: M.aposta}, {texto: 'SE MANDA', s: M.aposta + 0.45, cor: COR.verde, brilho: true}]} />
      <Formato t={t} de={M.lista} icone="📝" titulo="LISTA CURTA" envios={48} y={700} />
      <Formato t={t} de={M.passo} icone="👣" titulo="PASSO A PASSO" envios={63} y={880} />
      <Formato t={t} de={M.erro} icone="⚠️" titulo="O ERRO QUE TODO MUNDO COMETE" envios={91} y={1060} />
    </AbsoluteFill>
  );
};

// "E nas estatísticas do post, olha os compartilhamentos, não só as curtidas."
const Estatisticas: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.estatisticas - 0.15, T.b - 0.1);
  if (!st) return null;
  const foco = mola(t, M.compart, 11, 200);
  const apaga = prog(t, M.nao, 0.4);
  const linhas = [
    {icone: '❤️', nome: 'Curtidas', n: 120, foco: false},
    {icone: '💬', nome: 'Comentários', n: 14, foco: false},
    {icone: '💾', nome: 'Salvamentos', n: 22, foco: false},
    {icone: '↗️', nome: 'Compartilhamentos', n: 38, foco: true},
  ];
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 450, padding: 40, ...caixa}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.ciano, letterSpacing: 2}}>📊 ESTATÍSTICAS DO POST</div>
        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 16}}>
          {linhas.map((l, i) => {
            const e = mola(t, M.estatisticas + 0.08 * i, 13, 200);
            const destaque = l.foco ? foco : 0;
            const opac = l.foco ? 1 : 1 - 0.55 * Math.max(foco, apaga);
            return (
              <div key={l.nome} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '20px 24px', borderRadius: 22, background: l.foco ? `rgba(46,229,157,${0.08 + 0.18 * destaque})` : 'rgba(255,255,255,.05)', border: l.foco ? `4px solid rgba(46,229,157,${destaque})` : '4px solid transparent', opacity: e * opac, scale: String(1 + 0.06 * destaque), translate: `${(1 - e) * 80}px 0px`, boxShadow: l.foco ? `0 0 ${50 * destaque}px rgba(46,229,157,.45)` : undefined}}>
                <div style={{fontSize: 52}}>{l.icone}</div>
                <div style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 38, color: COR.branco}}>{l.nome}</div>
                <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: l.foco && destaque > 0.5 ? COR.verde : COR.branco, fontVariantNumeric: 'tabular-nums'}}>{l.n}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Selo t={t} de={M.compart + 0.3} cor={COR.verde} tamanho={46} rot={-5} style={{left: 300, top: 1180}}>OLHA ESSE NÚMERO</Selo>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: CTA duplo ----------

const EnviarPulsa: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.manda2 - 0.05 || t >= SAI_B + 0.1) return null;
  const e = mola(t, M.manda2, 10, 230);
  const pulso = 1 + 0.07 * Math.abs(Math.sin((t - M.manda2) * 9));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: e, scale: String((0.6 + 0.4 * e) * pulso)}}>
      <Pilula cor={COR.verde} tamanho={70} fundo="rgba(10,40,40,.94)">↗️ ENVIAR</Pilula>
    </div>
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

// Motion cheio no meio do CTA (boca acelerada no clipe B): "manda pra quem precisa" → "Seguir" → "Seguindo ✓".
const CtaCheio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_B, VOLTA_B - 0.02, 0);
  if (!st) return null;
  const aviao = prog(t, SAI_B + 0.1, 0.9, saida);
  const botao = mola(t, M.segue - 0.15, 12, 200);
  const seguindo = t >= M.social;
  const pop = mola(t, M.social, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={92} style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'MANDA PRA', s: SAI_B}, {texto: 'QUEM PRECISA', s: SAI_B + 0.3, cor: COR.verde, brilho: true}]} />
      {aviao < 1 && <div style={{position: 'absolute', left: 120 + 760 * aviao, top: 820 - 220 * Math.sin(aviao * Math.PI), fontSize: 120, rotate: '-15deg', opacity: 1 - aviao * 0.4}}>✈️</div>}
      <div style={{position: 'absolute', left: 60, right: 60, top: 1000, opacity: botao, translate: `0px ${(1 - botao) * 100}px`, scale: String(0.9 + 0.1 * botao)}}>
        <BotaoSeguir seguindo={seguindo} pop={pop} />
      </div>
      <Toque t={t} de={M.segue} toque={M.social} x={820} y={1080} />
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
      <Explosao t={t} />
      <Curtidas t={t} />
      <NaoEhEla t={t} />
      <Publicos t={t} />
      <Mosseri t={t} />
      <Balanca t={t} />
      <Direct t={t} />
      <ToqueRecomenda t={t} />
      <PessoaNova t={t} />
      <Pergunta t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <Estatisticas t={t} />
      <CardVoz t={t} />
      <EnviarPulsa t={t} />
      <CtaCheio t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'impacto', em: 0.02, volume: 0.5},
  ...passos(0.06, 0.4, 4).map((s): Evento => ({som: 'pop', em: s, volume: 0.35})),
  ...passos(ENTRA_A, M.ne + 0.1, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'impacto', em: M.so + 0.3, volume: 0.5},
  {som: 'pop', em: M.perfil, volume: 0.45},
  {som: 'risco', em: M.crescer, volume: 0.35},
  // Premissa
  {som: 'pop', em: M.quem, volume: 0.5},
  ...passos(M.crescer2 + 0.1, M.crescer2 + 0.4, 4).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'swoosh', em: M.chegar, volume: 0.5},
  {som: 'ding', em: M.conhece, volume: 0.4},
  // Evidência
  {som: 'whoosh_in', em: M.e - 0.3, volume: 0.5},
  {som: 'impacto', em: M.e + 0.05, volume: 0.45},
  {som: 'pop', em: M.chefe, volume: 0.45},
  {som: 'ding', em: M.explicou, volume: 0.4},
  {som: 'whoosh_in', em: M.pra - 0.3, volume: 0.45},
  {som: 'pop', em: M.curtida2, volume: 0.5},
  {som: 'impacto', em: M.envio + 0.05, volume: 0.6},
  {som: 'whoosh_in', em: M.quando - 0.3, volume: 0.45},
  {som: 'toque', em: M.manda + 0.15, volume: 0.7},
  {som: 'swoosh', em: M.amigo, volume: 0.5},
  {som: 'ding', em: M.amigo + 0.05, volume: 0.45},
  // Por que faz sentido
  {som: 'pop', em: M.curtir, volume: 0.45},
  {som: 'toque', em: M.toque, volume: 0.7},
  {som: 'pop', em: M.mandar, volume: 0.45},
  {som: 'impacto', em: M.recomendar, volume: 0.5},
  {som: 'swoosh', em: M.cada + 0.1, volume: 0.5},
  {som: 'ding', em: M.pessoa, volume: 0.5},
  {som: 'swoosh', em: M.nova + 0.25, volume: 0.4},
  {som: 'pop', em: M.nova + 0.7, volume: 0.4},
  {som: 'pop', em: M.nova + 0.9, volume: 0.4},
  // A pergunta muda
  {som: 'impacto', em: M.pergunta + 0.3, volume: 0.45},
  {som: 'pop', em: M.quantas, volume: 0.45},
  {som: 'risco', em: M.vai, volume: 0.5},
  {som: 'whoosh_in', em: M.pra2 - 0.25, volume: 0.45},
  {som: 'ding', em: M.mandaria, volume: 0.5},
  // Dicas
  {som: 'impacto', em: M.dica1, volume: 0.5},
  {som: 'swoosh', em: M.amiga, volume: 0.45},
  {som: 'pop', em: M.amiga + 0.45, volume: 0.4},
  {som: 'swoosh', em: M.socio, volume: 0.45},
  {som: 'pop', em: M.socio + 0.45, volume: 0.4},
  {som: 'impacto', em: M.dica2, volume: 0.5},
  {som: 'pop', em: M.lista, volume: 0.45},
  {som: 'pop', em: M.passo, volume: 0.45},
  {som: 'pop', em: M.erro, volume: 0.45},
  {som: 'whoosh_in', em: M.estatisticas - 0.35, volume: 0.45},
  ...passos(M.estatisticas, M.estatisticas + 0.3, 4).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'ding', em: M.compart, volume: 0.5},
  {som: 'impacto', em: M.compart + 0.3, volume: 0.4},
  // CTA
  {som: 'pop', em: M.manda2, volume: 0.5},
  {som: 'swoosh', em: SAI_B + 0.1, volume: 0.5},
  {som: 'pop', em: M.segue - 0.15, volume: 0.45},
  {som: 'toque', em: M.social, volume: 0.7},
  {som: 'ding', em: M.social + 0.05, volume: 0.5},
  {som: 'impacto', em: M.toda, volume: 0.5},
];

// Legenda no texto do roteiro: o Whisper ouviu "comemora a curtida", "nunca aposta" e "dica 1."
const CORRIGE: Record<string, string> = {'1.': '1:', '2.': '2:'};
const aMais = em('a', M.comemora);
const aposta1 = em('aposta');
const LEGENDA = PALAVRAS.filter((p) => !(p.w === 'a' && p.s === aMais)).map((p) => ({...p, w: p.s === aposta1 ? 'posta.' : CORRIGE[p.w] ?? p.w}));

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'fora'},
    {de: ENTRA_A, modo: 'cheia', escala: [1.02, 1.07]},
    {de: M.ne, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: SAI_1, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.05]},
    {de: SAI_B, modo: 'fora'},
    {de: VOLTA_B, modo: 'cheia', escala: [1.04, 1.07]},
    {de: M.toda, modo: 'cheia', escala: [1.1, 1.16], punch: true},
  ],
  semLegenda: [
    [0, ENTRA_A],
    [SAI_1, T.meio],
    [M.quantas - 0.1, M.dica1 - 0.1],
    [M.dica1 - 0.12, M.dica1 + 0.45],
    [M.dica2 - 0.12, M.dica2 + 0.45],
    [M.manda2 - 0.05, T.fim],
  ],
  corEspecial: {'envio.': COR.verde, 'recomendar.': COR.verde, 'compartilhamentos.': COR.verde},
  eventos: EVENTOS,
  Cena,
};
