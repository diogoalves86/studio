import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Risco, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 011 · O que as campanhas de Lula e Flávio Bolsonaro fazem no Instagram e como um negócio pode copiar.
// NEUTRALIDADE: os dois blocos usam o mesmo layout, a mesma cor (cinza/azul do Digo, nada de vermelho, verde ou
// amarelo perto dos nomes), a mesma estrutura (o que faz → ponto forte) e nenhuma comparação de quem é melhor.
// Depois de cada bloco, "No seu negócio": a tática traduzida para quem tem loja.

const T = TRECHOS;
const M = {
  lula: em('lula'),
  flavio: em('flávio'),
  jeito: em('jeito'),
  comeca: em('começa'),
  gravar: em('gravar'),
  engajamento: em('engajamento'),
  nao: em('não', em('subiu')),
  chamou: em('chamou'),
  deputados: em('deputados'),
  influenciadores: em('influenciadores'),
  neg1: em('no', em('junto')),
  grava: em('grava', em('junto')),
  deixe: em('deixe'),
  reposta: em('reposta'),
  marcou: em('marcou'),
  pede: em('pede'),
  curtinho: em('curtinho'),
  amou: em('amou'),
  agora: em('agora'),
  mostrar: em('mostrar'),
  falar: em('falar'),
  personagem: em('personagem'),
  planejou: em('planejou'),
  noventa: em('90'),
  digital: em('digital'),
  neg2: em('no', em('digital')),
  bastidores: em('bastidores'),
  voz: em('voz'),
  energia: em('energia'),
  dois: em('dois'),
  levaram: em('levaram'),
  whatsapp: em('whatsapp'),
  cinco: em('5'),
  porque: em('porque'),
  neg3: em('no', em('segue', em('porque'))),
  canal: em('canal'),
  levam: em('levam'),
  algoritmo: em('algoritmo'),
  manda: em('manda'),
  precisa: em('precisa'),
  segue: em('segue', em('aparecer')),
  digo: em('digo'),
  toda: em('toda'),
};

// Momentos artificiais (sincronia.md): A 3,26–3,45 «jeito que dá» → motion desde «jeito»;
// B 47,39–47,69 · 48,59–48,86 · 49,36–49,50 · 50,94–51,09 · 52,19–fim → o avatar só fica cheio em
// «pra quem tem negócio» e «segue o Digo Social»; o resto vira motion e a tela final.
const SAI_A = M.jeito + 0.08;
const B1 = M.manda + 0.2;
const B2 = M.precisa - 0.13;
const B3 = M.segue - 0.33;
const B4 = M.toda - 0.04;

const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;

// Selo de fonte (autoridade).
const Fonte: React.FC<{t: number; de: number; ate: number; veiculo: string; titulo: string; top?: number}> = ({t, de, ate, veiculo, titulo, top = 1250}) => {
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

// Cartão neutro de campanha: idêntico para os dois (só o nome muda).
const CartaoCampanha: React.FC<{nome: string; e: number; style?: React.CSSProperties}> = ({nome, e, style}) => (
  <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center', width: 270, boxSizing: 'border-box', padding: '16px 0', borderRadius: 24, background: 'rgba(30,38,64,.94)', border: '3px solid rgba(154,167,199,.7)', boxShadow: '0 16px 40px rgba(0,0,0,.45)', opacity: e, scale: String(0.7 + 0.3 * e), ...style}}>
    <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 22, color: COR.cinza, letterSpacing: 4}}>CAMPANHA</div>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.branco}}>{nome}</div>
  </div>
);

const PontoForte: React.FC<{t: number; de: number; ate: number; texto: string}> = ({t, de, ate, texto}) => {
  const mola = useMola();
  const e = mola(t, de, 11, 220) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.6 + 0.4 * e)}}>
      <Pilula cor={COR.ciano} tamanho={38} fundo="rgba(10,30,70,.94)">💪 PONTO FORTE: {texto}</Pilula>
    </div>
  );
};

const NoSeuNegocio: React.FC<{t: number; de: number}> = ({t, de}) => {
  const mola = useMola();
  const e = mola(t, de, 11, 210);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 430, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.5, 1])), rotate: `${-3 + (1 - e) * 6}deg`}}>
      <Pilula cor={COR.azul} tamanho={50} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">🛍️ NO SEU NEGÓCIO</Pilula>
    </div>
  );
};

const Rosto: React.FC<{emoji: string; cor: string; tam?: number; style?: React.CSSProperties}> = ({emoji, cor, tam = 90, style}) => (
  <div style={{width: tam, height: tam, borderRadius: 99, background: cor, border: '4px solid rgba(255,255,255,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: tam * 0.5, boxShadow: '0 10px 30px rgba(0,0,0,.4)', ...style}}>{emoji}</div>
);

// Celular simples gravando (selfie), com o ponto REC piscando.
const CelularGravando: React.FC<{t: number; e: number; x: number; y: number; w?: number; h?: number; rotulo: string; emoji: string}> = ({t, e, x, y, w = 300, h = 520, rotulo, emoji}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 44, border: '10px solid #1B2238', background: 'linear-gradient(170deg, #2A3354, #0A1430)', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,.6)', opacity: e, scale: String(0.7 + 0.3 * e)}}>
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: w * 0.42}}>{emoji}</div>
    <div style={{position: 'absolute', left: 16, top: 18, display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 10, background: 'rgba(0,0,0,.55)', fontFamily: INTER, fontWeight: 800, fontSize: 20, color: '#fff'}}>
      <span style={{width: 14, height: 14, borderRadius: 99, background: '#FF3B30', opacity: Math.round(t * 2.5) % 2 ? 1 : 0.25}} /> REC
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 22, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.6)'}}>{rotulo}</div>
  </div>
);

// ---------- Abertura ----------

const Gancho: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= SAI_A + 0.1) return null;
  const sai = prog(t, SAI_A - 0.15, 0.25);
  const l = mola(t, M.lula, 12, 210);
  const f = mola(t, M.flavio, 12, 210);
  return (
    <>
      <div style={{position: 'absolute', left: 80, right: 80, top: 240, padding: '14px 10px', borderRadius: 26, background: 'rgba(5,10,30,.62)', border: '3px solid rgba(154,167,199,.8)', opacity: 1 - sai, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, lineHeight: 1.08, color: COR.branco, whiteSpace: 'nowrap'}}>
        O QUE DÁ PRA COPIAR <span style={{color: COR.ciano}}>DOS DOIS</span>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1360, display: 'flex', justifyContent: 'center', gap: 30, opacity: 1 - sai}}>
        <CartaoCampanha nome="LULA" e={l} />
        <CartaoCampanha nome="FLÁVIO" e={f} />
      </div>
    </>
  );
};

const CopiaNegocio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_A, T.meio - 0.05, 0);
  if (!st) return null;
  const loja = mola(t, SAI_A + 0.2, 10, 220);
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontSize: 200, scale: String(loja), marginTop: -200}}>🛍️</div>
      <Palavras t={t} tamanho={92} style={{textAlign: 'center', marginTop: 30}} pecas={[{texto: 'DÁ PRA COPIAR', s: SAI_A}, {texto: 'NO SEU NEGÓCIO', s: SAI_A + 0.35, cor: COR.ciano, brilho: true}]} />
    </AbsoluteFill>
  );
};

// ---------- Meio: fundo e card de voz ----------

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

// ---------- Bloco Lula (mesma estrutura do bloco Flávio) ----------

const VOZES = [
  {emoji: '👩', cor: '#3A4A6B', r: 'deputada'},
  {emoji: '🧑', cor: '#4A3A6B', r: 'deputado'},
  {emoji: '👱‍♀️', cor: '#3A5A6B', r: 'influenciadora'},
  {emoji: '🧔', cor: '#5A4A3A', r: 'influenciador'},
  {emoji: '👩‍🦱', cor: '#3A6B5A', r: 'jovem'},
  {emoji: '🧑‍🦰', cor: '#6B3A5A', r: 'jovem'},
];

const BlocoLula: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.neg1 - 0.1);
  if (!st) return null;
  const cartao = mola(t, M.comeca, 12, 200);
  const selfie = mola(t, M.gravar - 0.1, 12, 200) * (1 - prog(t, M.nao - 0.1, 0.3));
  const sobe = prog(t, M.engajamento, 0.7, saida) * (1 - prog(t, M.nao - 0.1, 0.3));
  const rede = prog(t, M.nao, 0.3);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 430, display: 'flex', justifyContent: 'center'}}>
        <CartaoCampanha nome="LULA" e={cartao} />
      </div>
      <CelularGravando t={t} e={selfie} x={200} y={600} rotulo="VÍDEO SELFIE" emoji="🤳" />
      {sobe > 0.01 && (
        <div style={{position: 'absolute', left: 560, top: 640, width: 320, opacity: sobe}}>
          <svg width={320} height={260} viewBox="0 0 320 260">
            <path d="M 10 240 L 90 200 L 170 170 L 250 90 L 310 30" pathLength={1} fill="none" stroke={COR.ciano} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - sobe} style={{filter: `drop-shadow(0 0 12px ${COR.ciano})`}} />
          </svg>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco, textAlign: 'center'}}>↑ ENGAJAMENTO</div>
        </div>
      )}
      {rede > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 600, height: 500, opacity: rede}}>
          <Rosto emoji="🎙️" cor="#1E2640" tam={130} style={{position: 'absolute', left: 475, top: 170}} />
          {VOZES.map((v, i) => {
            const ang = (i / VOZES.length) * Math.PI * 2 - Math.PI / 2;
            const e = mola(t, M.chamou + i * 0.12, 12, 220);
            const x = 540 + Math.cos(ang) * 260 * e;
            const y = 235 + Math.sin(ang) * 200 * e;
            return (
              <React.Fragment key={i}>
                <svg width={1080} height={500} style={{position: 'absolute', left: 0, top: 0}}>
                  <line x1={540} y1={235} x2={x} y2={y} stroke="rgba(62,198,255,.6)" strokeWidth={4} strokeDasharray="8 8" opacity={e} />
                </svg>
                <Rosto emoji={v.emoji} cor={v.cor} tam={96} style={{position: 'absolute', left: x - 48, top: y - 48, opacity: e}} />
              </React.Fragment>
            );
          })}
        </div>
      )}
      <PontoForte t={t} de={M.influenciadores + 0.3} ate={M.neg1} texto="SELFIE + REDE DE VOZES" />
      <Fonte t={t} de={M.engajamento} ate={M.nao} veiculo="Poder360" titulo="Engajamento sobe após vídeos selfie" />
      <Fonte t={t} de={M.chamou} ate={M.neg1} veiculo="O Tempo / Agência Pública" titulo="Força-tarefa de jovens parlamentares e influenciadores" />
    </AbsoluteFill>
  );
};

// ---------- No seu negócio 1: grave você mesmo + deixe o cliente falar por você ----------
// (versão realista da "rede de vozes" para a lojinha: repostar o story de quem marcou e pedir um depoimento curto)

const Negocio1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.neg1 - 0.1, M.agora - 0.1);
  if (!st) return null;
  const tel = mola(t, M.grava - 0.1, 12, 200);
  const cliente = mola(t, M.deixe - 0.1, 12, 200);
  const story = mola(t, M.reposta - 0.1, 12, 200);
  const repostado = t >= M.marcou + 0.25;
  const depo = mola(t, M.pede - 0.1, 12, 200);
  const estrelas = Math.round(interpolate(t, [M.curtinho, M.amou + 0.2], [0, 5], clamp));
  return (
    <AbsoluteFill style={st}>
      <NoSeuNegocio t={t} de={M.neg1} />
      <CelularGravando t={t} e={tel * (1 - 0.6 * cliente)} x={interpolate(cliente, [0, 1], [390, -40])} y={590} w={300} h={500} rotulo="VOCÊ, SEM PRODUÇÃO" emoji="🍫" />
      {cliente > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 565, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco, opacity: cliente}}>
          O CLIENTE <span style={{color: COR.ciano}}>FALA POR VOCÊ</span>
        </div>
      )}
      {story > 0.01 && (
        <div style={{position: 'absolute', left: 150, top: 630, width: 360, height: 560, borderRadius: 40, border: '10px solid #1B2238', overflow: 'hidden', background: 'linear-gradient(170deg, #C2678A, #5B2E1E)', boxShadow: '0 30px 80px rgba(0,0,0,.6)', opacity: story, scale: String(0.7 + 0.3 * story), rotate: `${-4 + (1 - story) * -10}deg`}}>
          <div style={{position: 'absolute', left: 14, right: 14, top: 14, height: 5, borderRadius: 9, background: 'rgba(255,255,255,.4)'}}><div style={{width: '60%', height: '100%', borderRadius: 9, background: '#fff'}} /></div>
          <div style={{position: 'absolute', left: 18, top: 32, display: 'flex', alignItems: 'center', gap: 10}}>
            <Rosto emoji="👩" cor="#E76F51" tam={48} />
            <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 22, color: '#fff'}}>ju.martins</span>
          </div>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 130}}>🍫</div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 340, padding: '10px 14px', borderRadius: 14, background: '#fff', textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#C2378A', rotate: '-4deg'}}>@docesdaana amei!! 😍</div>
          <div style={{position: 'absolute', left: 20, right: 20, bottom: 22, padding: '14px 0', borderRadius: 14, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 22, color: repostado ? COR.marinho : '#fff', background: repostado ? COR.ciano : 'rgba(0,0,0,.55)'}}>
            {repostado ? 'No seu story ✓' : '↻ Adicionar ao seu story'}
          </div>
        </div>
      )}
      <Toque t={t} de={M.reposta + 0.3} toque={M.marcou + 0.2} x={300} y={1120} tamanho={120} />
      {depo > 0.01 && (
        <div style={{position: 'absolute', left: 560, top: 700, width: 400, padding: 24, borderRadius: 30, ...caixa, border: `4px solid ${COR.ciano}`, opacity: depo, scale: String(0.7 + 0.3 * depo), translate: `${(1 - depo) * 100}px 0px`}}>
          <div style={{height: 220, borderRadius: 20, background: 'linear-gradient(150deg, #3A4A6B, #1E2640)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            <div style={{fontSize: 90}}>👩</div>
            <div style={{position: 'absolute', width: 80, height: 80, borderRadius: 99, background: 'rgba(255,255,255,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: COR.marinho}}>▶</div>
            <div style={{position: 'absolute', right: 10, bottom: 8, padding: '2px 10px', borderRadius: 8, background: 'rgba(0,0,0,.6)', fontFamily: INTER, fontWeight: 700, fontSize: 18, color: '#fff'}}>0:12</div>
          </div>
          <div style={{marginTop: 14, fontFamily: INTER, fontWeight: 700, fontSize: 26, color: COR.branco}}>"Melhor brigadeiro da cidade!"</div>
          <div style={{marginTop: 8, fontSize: 34, letterSpacing: 4, color: '#FFD25E'}}>{'★'.repeat(estrelas)}<span style={{color: 'rgba(255,255,255,.2)'}}>{'★'.repeat(5 - estrelas)}</span></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Bloco Flávio (mesma estrutura do bloco Lula) ----------

const BlocoFlavio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.agora - 0.1, M.neg2 - 0.1);
  if (!st) return null;
  const cartao = mola(t, M.agora, 12, 200);
  const jeito = mola(t, M.mostrar - 0.1, 12, 200) * (1 - prog(t, M.planejou - 0.1, 0.3));
  const mascara = prog(t, M.personagem, 0.3);
  const barra = prog(t, M.planejou, 0.3);
  const pct = Math.round(interpolate(t, [M.noventa - 0.3, M.noventa + 0.4], [0, 90], clamp));
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 430, display: 'flex', justifyContent: 'center'}}>
        <CartaoCampanha nome="FLÁVIO" e={cartao} />
      </div>
      {jeito > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 600, height: 480, opacity: jeito}}>
          <Rosto emoji="🗣️" cor="#1E2640" tam={200} style={{position: 'absolute', left: 440, top: 40}} />
          <div style={{position: 'absolute', left: 300, right: 300, top: 270, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 80}}>
            {Array.from({length: 16}, (_, i) => <div key={i} style={{width: 12, borderRadius: 99, background: COR.ciano, height: 16 + 60 * Math.abs(Math.sin(t * (6 + i) + i))}} />)}
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 370, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>O JEITO DE FALAR</div>
          {mascara > 0.01 && (
            <div style={{position: 'absolute', left: 760, top: 60, fontSize: 110, opacity: mascara}}>
              🎭
              <div style={{position: 'absolute', left: 0, top: 0, width: 130, height: 130}}><Risco t={t} de={M.personagem + 0.1} espessura={10} /></div>
            </div>
          )}
        </div>
      )}
      {barra > 0.01 && (
        <div style={{position: 'absolute', left: 120, right: 120, top: 680, padding: 40, ...caixa, opacity: barra}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.cinza}}>📱 CAMPANHA NO DIGITAL</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 96, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>{pct}%</div>
          </div>
          <div style={{marginTop: 22, height: 50, borderRadius: 99, background: 'rgba(255,255,255,.1)', overflow: 'hidden'}}>
            <div style={{width: `${pct}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${COR.azul}, ${COR.ciano})`}} />
          </div>
          <div style={{marginTop: 12, fontFamily: INTER, fontWeight: 600, fontSize: 24, color: COR.cinza}}>plano declarado na pré-campanha</div>
        </div>
      )}
      <PontoForte t={t} de={M.digital} ate={M.neg2} texto="AUTENTICIDADE + FOCO NO DIGITAL" />
      <Fonte t={t} de={M.mostrar} ate={M.planejou} veiculo="Revista Oeste" titulo="Coordenação de redes da campanha" />
      <Fonte t={t} de={M.planejou} ate={M.neg2} veiculo="Gazeta do Povo" titulo="Prioridade da campanha nas redes" />
    </AbsoluteFill>
  );
};

// ---------- No seu negócio 2: o seu jeito, bastidores, onde o cliente está ----------

const Negocio2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.neg2 - 0.1, M.dois - 0.5);
  if (!st) return null;
  const itens = [
    {de: M.neg2 + 0.6, icone: '😄', texto: 'O SEU JEITO'},
    {de: M.bastidores, icone: '🎬', texto: 'BASTIDORES'},
    {de: M.voz, icone: '🎙️', texto: 'A SUA VOZ'},
  ];
  const onde = mola(t, M.energia, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <NoSeuNegocio t={t} de={M.neg2} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 580, display: 'flex', gap: 22, justifyContent: 'center'}}>
        {itens.map((it) => {
          const e = mola(t, it.de, 11, 220);
          return (
            <div key={it.texto} style={{flex: 1, height: 260, borderRadius: 30, ...caixa, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: e, scale: String(0.6 + 0.4 * e), translate: `0px ${(1 - e) * 60}px`}}>
              <div style={{fontSize: 90}}>{it.icone}</div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.branco, textAlign: 'center'}}>{it.texto}</div>
            </div>
          );
        })}
      </div>
      {onde > 0.01 && (
        <div style={{position: 'absolute', left: 140, right: 140, top: 900, padding: '26px 30px', borderRadius: 28, ...caixa, border: `4px solid ${COR.ciano}`, display: 'flex', alignItems: 'center', gap: 24, opacity: onde, scale: String(0.7 + 0.3 * onde)}}>
          <div style={{fontSize: 70}}>📍</div>
          <div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco}}>ENERGIA ONDE O CLIENTE ESTÁ</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>se ele está no Instagram, é lá que você aparece</div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Em comum: canais de WhatsApp (os dois, lado a lado, iguais) ----------

const Canal: React.FC<{t: number; de: number; nome: string; ate: number; x: number}> = ({t, de, nome, ate, x}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  const n = interpolate(t, [M.levaram, M.cinco], [0, ate], clamp);
  const txt = n >= 1 ? `${n.toFixed(1).replace('.', ',')} mi+` : `${Math.round(n * 1000)} mil`;
  return (
    <div style={{position: 'absolute', left: x, top: 600, width: 400, padding: 28, borderRadius: 30, ...caixa, textAlign: 'center', opacity: e, scale: String(0.7 + 0.3 * e)}}>
      <div style={{fontSize: 70}}>📣</div>
      <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 22, color: COR.cinza, letterSpacing: 3}}>CANAL DA CAMPANHA</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>{nome}</div>
      <div style={{marginTop: 10, fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.ciano, fontVariantNumeric: 'tabular-nums'}}>{txt}</div>
    </div>
  );
};

const EmComum: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dois - 0.5, M.neg3 - 0.1);
  if (!st) return null;
  const titulo = mola(t, M.dois - 0.3, 12, 200);
  const soma = mola(t, M.cinco + 0.1, 10, 230) * (1 - prog(t, M.porque - 0.1, 0.3));
  const bloqueio = mola(t, M.porque, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 56, color: COR.branco, opacity: titulo}}>
        OS DOIS FAZEM <span style={{color: COR.ciano}}>IGUAL</span>
      </div>
      <div style={{opacity: 1 - 0.7 * bloqueio}}>
        <Canal t={t} de={M.levaram} nome="LULA" ate={4.2} x={100} />
        <Canal t={t} de={M.levaram + 0.15} nome="FLÁVIO" ate={1} x={580} />
      </div>
      {soma > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 960, display: 'flex', justifyContent: 'center', opacity: soma, scale: String(interpolate(soma, [0, 1], [1.6, 1]))}}>
          <Pilula cor={COR.ciano} tamanho={60} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">JUNTOS: 5 MI+ PESSOAS</Pilula>
        </div>
      )}
      {bloqueio > 0.01 && (
        <div style={{position: 'absolute', left: 140, right: 140, top: 900, padding: '24px 28px', borderRadius: 26, background: 'rgba(240,244,255,.96)', display: 'flex', alignItems: 'center', gap: 20, opacity: bloqueio, scale: String(0.7 + 0.3 * bloqueio)}}>
          <div style={{fontSize: 70}}>⛔</div>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.marinho}}>O Instagram não recomenda post político pra quem não segue</div>
        </div>
      )}
      <Fonte t={t} de={M.whatsapp} ate={M.porque} veiculo="Congresso em Foco / Diario de Pernambuco" titulo="Canais de WhatsApp das campanhas" />
      <Fonte t={t} de={M.porque} ate={M.neg3} veiculo="Engadget / Canaltech" titulo="Política da Meta para conteúdo político" />
    </AbsoluteFill>
  );
};

// ---------- No seu negócio 3: canal de transmissão ----------

const Negocio3: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.neg3 - 0.1, T.b - 0.1);
  if (!st) return null;
  const canal = mola(t, M.canal - 0.1, 12, 200);
  const inscritos = Math.round(interpolate(t, [M.levam, M.algoritmo], [0, 312], clamp));
  const ok = mola(t, M.algoritmo, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <NoSeuNegocio t={t} de={M.neg3} />
      <div style={{position: 'absolute', left: 90, top: 640, width: 260, textAlign: 'center', opacity: canal}}>
        <div style={{width: 160, height: 160, margin: '0 auto', borderRadius: 99, padding: 6, background: 'conic-gradient(#FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 99, background: '#7A3E6E', border: '5px solid #0A1430', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70}}>🍫</div>
        </div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 700, fontSize: 26, color: COR.branco}}>seguidores</div>
      </div>
      {Array.from({length: 8}, (_, i) => {
        const k = prog(t, M.levam + i * 0.18, 0.7, saida);
        if (k <= 0 || k >= 1) return null;
        return <div key={i} style={{position: 'absolute', left: 300 + 380 * k, top: 700 - Math.sin(k * Math.PI) * 120 + (i % 3) * 20, fontSize: 50}}>🙂</div>;
      })}
      <div style={{position: 'absolute', left: 600, top: 600, width: 400, padding: 26, borderRadius: 30, ...caixa, border: `4px solid ${COR.ciano}`, textAlign: 'center', opacity: canal, scale: String(0.7 + 0.3 * canal)}}>
        <div style={{fontSize: 60}}>📣</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 32, color: COR.branco}}>Doces da Ana · Novidades</div>
        <div style={{marginTop: 8, fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>canal de transmissão</div>
        <div style={{marginTop: 10, fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.ciano, fontVariantNumeric: 'tabular-nums'}}>{inscritos}</div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 22, color: COR.cinza}}>inscritos</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1060, display: 'flex', justifyContent: 'center', opacity: ok, scale: String(0.6 + 0.4 * ok)}}>
        <Pilula cor={COR.ciano} tamanho={44} fundo="rgba(10,30,70,.94)">✓ SEM DEPENDER SÓ DO ALGORITMO</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: CTA duplo (alternando com o avatar onde a boca está natural) ----------

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

const Aparecer: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, B2, B3 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={110} style={{textAlign: 'center', marginTop: -100}} pecas={[{texto: 'PRA QUEM PRECISA', s: B2}, {texto: 'APARECER', s: B2 + 0.25, cor: COR.ciano, brilho: true}]} />
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
  if (t < B3 - 0.05 || t >= B4) return null;
  const e = mola(t, B3, 12, 200);
  return (
    <>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1110, opacity: e, translate: `0px ${(1 - e) * 80}px`}}>
        <BotaoSeguir seguindo={t >= M.digo + 0.05} pop={mola(t, M.digo + 0.05, 9, 260)} />
      </div>
      <Toque t={t} de={B3} toque={M.digo} x={840} y={1170} />
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
      <CopiaNegocio t={t} />
      <BlocoLula t={t} />
      <Negocio1 t={t} />
      <BlocoFlavio t={t} />
      <Negocio2 t={t} />
      <EmComum t={t} />
      <Negocio3 t={t} />
      <CardVoz t={t} />
      <Enviar t={t} />
      <Aparecer t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

// Sons idênticos para os dois blocos de campanha (mesmo tipo e volume nos mesmos pontos da estrutura).
const EVENTOS: Evento[] = [
  {som: 'pop', em: M.lula, volume: 0.4},
  {som: 'pop', em: M.flavio, volume: 0.4},
  {som: 'swoosh', em: SAI_A, volume: 0.5},
  {som: 'impacto', em: SAI_A + 0.35, volume: 0.45},
  // Bloco Lula
  {som: 'impacto', em: M.comeca, volume: 0.45},
  {som: 'pop', em: M.gravar - 0.1, volume: 0.45},
  {som: 'ding', em: M.engajamento, volume: 0.4},
  ...passos(M.chamou, M.chamou + 0.72, 6).map((s): Evento => ({som: 'pop', em: s, volume: 0.35})),
  {som: 'ding', em: M.influenciadores + 0.3, volume: 0.4},
  // Negócio 1
  {som: 'whoosh_in', em: M.neg1 - 0.3, volume: 0.45},
  {som: 'impacto', em: M.neg1, volume: 0.45},
  {som: 'pop', em: M.grava, volume: 0.4},
  {som: 'swoosh', em: M.deixe - 0.1, volume: 0.4},
  {som: 'pop', em: M.reposta - 0.1, volume: 0.45},
  {som: 'toque', em: M.marcou + 0.2, volume: 0.6},
  {som: 'ding', em: M.marcou + 0.25, volume: 0.45},
  {som: 'pop', em: M.pede - 0.1, volume: 0.45},
  ...passos(M.curtinho, M.amou + 0.2, 5).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  // Bloco Flávio
  {som: 'impacto', em: M.agora, volume: 0.45},
  {som: 'pop', em: M.mostrar - 0.1, volume: 0.45},
  {som: 'risco', em: M.personagem + 0.1, volume: 0.4},
  ...passos(M.noventa - 0.3, M.noventa + 0.4, 6).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'ding', em: M.digital, volume: 0.4},
  // Negócio 2
  {som: 'whoosh_in', em: M.neg2 - 0.3, volume: 0.45},
  {som: 'impacto', em: M.neg2, volume: 0.45},
  {som: 'pop', em: M.neg2 + 0.6, volume: 0.4},
  {som: 'pop', em: M.bastidores, volume: 0.4},
  {som: 'pop', em: M.voz, volume: 0.4},
  {som: 'ding', em: M.energia, volume: 0.4},
  // Em comum
  {som: 'whoosh_in', em: M.dois - 0.6, volume: 0.45},
  {som: 'pop', em: M.levaram, volume: 0.4},
  {som: 'pop', em: M.levaram + 0.15, volume: 0.4},
  ...passos(M.levaram, M.cinco, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.3})),
  {som: 'impacto', em: M.cinco + 0.1, volume: 0.5},
  {som: 'risco', em: M.porque, volume: 0.4},
  // Negócio 3
  {som: 'whoosh_in', em: M.neg3 - 0.3, volume: 0.45},
  {som: 'impacto', em: M.neg3, volume: 0.45},
  {som: 'pop', em: M.canal - 0.1, volume: 0.45},
  ...passos(M.levam, M.levam + 1.3, 8).map((s): Evento => ({som: 'pop', em: s, volume: 0.25})),
  {som: 'ding', em: M.algoritmo, volume: 0.45},
  // CTA
  {som: 'pop', em: T.b + 0.05, volume: 0.5},
  {som: 'swoosh', em: B2, volume: 0.45},
  {som: 'pop', em: B3, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: B4, volume: 0.5},
];

// Legenda: "90" + "%" viram "90%"; "levam" e "deixe" (Whisper) viram "leva" e "deixa".
const LEGENDA = PALAVRAS.reduce<typeof PALAVRAS>((L, p) => {
  if (p.w.startsWith('%') && L.length) {
    L[L.length - 1] = {...L[L.length - 1], w: L[L.length - 1].w + p.w, e: p.e};
    return L;
  }
  L.push(p.w === 'levam' ? {...p, w: 'leva'} : p.w === 'deixe' ? {...p, w: 'deixa'} : p);
  return L;
}, []);

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: M.lula, modo: 'cheia', escala: [1.06, 1.1], punch: true},
    {de: SAI_A, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.05]},
    {de: B2, modo: 'fora'},
    {de: B3, modo: 'cheia', escala: [1.04, 1.07]},
    {de: B4, modo: 'fora'},
  ],
  semLegenda: [
    [M.lula - 0.1, M.flavio + 0.6],
    [SAI_A, T.meio],
    [T.b, B1],
    [B2, T.fim],
  ],
  corEspecial: {},
  eventos: EVENTOS,
  Cena,
};
