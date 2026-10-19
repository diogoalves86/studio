import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 012 · Story não é pra crescer, é pra vender pra quem já te segue.
// Argumento: dor (posta e ninguém compra) → mecanismo (Story só chega em quem segue; a ordem é uma aposta de
// toque/curtida/resposta → sem interação você cai na fila) → por que vale consertar (público mais quente, 62% Ipsos)
// → dica 1 (todo Story pede um toque) → dica 2 (quem tocou recebe direct) → o ciclo bom (volta pro começo da fila).

const T = TRECHOS;
const M = {
  ninguem: em('ninguém'),
  problema: em('problema'),
  o: em('o', em('né')),
  produto: em('produto'),
  indo: em('indo'),
  fim: em('fim'),
  fila: em('fila'),
  funciona: em('funciona'),
  nova: em('nova'),
  proprio: em('próprio'),
  chefe: em('chefe'),
  caminho: em('caminho'),
  reels: em('reels'),
  story2: em('story', em('reels')),
  segue: em('segue'),
  nem: em('nem'),
  ordem: em('ordem'),
  aposta: em('aposta'),
  preve: em('prevê'),
  tocar: em('tocar'),
  curtir: em('curtir'),
  responder: em('responder'),
  ninguem2: em('ninguém', 10),
  hoje: em('hoje'),
  amanha: em('amanhã', 20),
  so: em('só'),
  quente: em('quente'),
  pesquisa: em('pesquisa'),
  ipsos: em('ipsos'),
  n62: em('62'),
  interessados: em('interessados'),
  stories: em('stories'),
  entao: em('então'),
  virar: em('virar'),
  dica1: em('dica'),
  toque: em('toque'),
  enquete: em('enquete'),
  caixinha: em('caixinha'),
  reage: em('reage'),
  foguinho: em('foguinho'),
  tipo: em('tipo'),
  ninho: em('ninho'),
  brigadeiro: em('brigadeiro'),
  dica2: em('dica', em('brigadeiro')),
  tocou: em('tocou'),
  direct: em('direct'),
  votou: em('votou'),
  manda1: em('manda'),
  voce: em('você', em('manda')),
  conversa: em('conversa'),
  venda: em('venda'),
  ainda: em('ainda', em('venda')),
  comeco: em('começo'),
  fila2: em('fila', em('começo')),
  manda2: em('manda', T.b - 0.2),
  posta: em('posta', T.b),
  nada: em('nada'),
  segue2: em('segue', T.b),
  digo: em('digo'),
  toda: em('toda'),
};

// Selo de fonte (autoridade).
const Fonte: React.FC<{t: number; de: number; ate: number; icone?: string; veiculo: string; titulo: string; top?: number}> = ({t, de, ate, icone = '📰', veiculo, titulo, top = 1250}) => {
  const mola = useMola();
  const e = mola(t, de, 13, 200) * (1 - prog(t, ate - 0.2, 0.2));
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 30}px`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, maxWidth: 960, padding: '12px 24px', borderRadius: 16, background: 'rgba(240,244,255,.95)', boxShadow: '0 12px 40px rgba(0,0,0,.45)'}}>
        <span style={{fontSize: 30}}>{icone}</span>
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.marinho, whiteSpace: 'nowrap'}}>Fonte: {veiculo}</span>
        <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 24, color: '#4A5578', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>· {titulo}</span>
      </div>
    </div>
  );
};

const Titulo: React.FC<{t: number; de: number; cor?: string; top?: number; children: React.ReactNode}> = ({t, de, cor = COR.branco, top = 430, children}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 64, color: cor, opacity: e, scale: String(0.7 + 0.3 * e), textShadow: '0 8px 30px rgba(0,0,0,.5)'}}>
      {children}
    </div>
  );
};

// ---------- Barra de Stories (padrão do app, sem marca) ----------

type Conta = {nome: string; emoji: string; cor: string; voce?: boolean};
const CONTAS: Conta[] = [
  {nome: 'docesdaana', emoji: '🍫', cor: '#7A3E6E', voce: true},
  {nome: 'ju.martins', emoji: '👩', cor: '#3A4A6B'},
  {nome: 'cafe.da.bia', emoji: '☕', cor: '#5A4A3A'},
  {nome: 'pet.do.leo', emoji: '🐶', cor: '#3A6B5A'},
  {nome: 'loja.tati', emoji: '👗', cor: '#6B3A5A'},
  {nome: 'rafa.fit', emoji: '💪', cor: '#4A3A6B'},
  {nome: 'mari.arte', emoji: '🎨', cor: '#3A5A6B'},
  {nome: 'bia.bolos', emoji: '🧁', cor: '#6B5A3A'},
];

const ANEL = 'conic-gradient(#FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)';

const Bolinha: React.FC<{c: Conta; brilho?: number; apagada?: number}> = ({c, brilho = 0, apagada = 0}) => (
  <div style={{width: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 1 - 0.55 * apagada}}>
    <div style={{width: 134, height: 134, borderRadius: 99, padding: 6, boxSizing: 'border-box', background: c.voce ? ANEL : 'conic-gradient(#8A93AD, #8A93AD)', boxShadow: brilho > 0 ? `0 0 ${50 * brilho}px ${COR.ciano}, 0 0 0 ${6 * brilho}px ${COR.ciano}` : undefined}}>
      <div style={{width: '100%', height: '100%', borderRadius: 99, background: c.cor, border: '5px solid #0B1226', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60}}>{c.emoji}</div>
    </div>
    <div style={{fontFamily: INTER, fontWeight: c.voce ? 800 : 600, fontSize: 21, color: c.voce ? COR.branco : COR.cinza, whiteSpace: 'nowrap'}}>{c.voce ? 'você' : c.nome}</div>
  </div>
);

// `pos[i]`: posição (em vagas, pode ser fracionária) de CONTAS[i]; `salto[i]`: altura do pulo em px.
const Barra: React.FC<{pos: number[]; salto?: number[]; brilho?: number; apagadas?: number; top: number; e: number}> = ({pos, salto = [], brilho = 0, apagadas = 0, top, e}) => (
  <div style={{position: 'absolute', left: 40, right: 40, top, height: 300, borderRadius: 40, background: 'rgba(11,18,38,.96)', border: '3px solid rgba(255,255,255,.12)', boxShadow: '0 30px 80px rgba(0,0,0,.55)', overflow: 'hidden', opacity: e, scale: String(0.85 + 0.15 * e)}}>
    <div style={{position: 'absolute', left: 30, top: 18, fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.branco}}>Stories</div>
    {pos.map((p, i) => (
      <div key={i} style={{position: 'absolute', left: 22 + p * 165, top: 70 - (salto[i] ?? 0), zIndex: CONTAS[i].voce ? 2 : 1}}>
        <Bolinha c={CONTAS[i]} brilho={CONTAS[i].voce ? brilho : 0} apagada={CONTAS[i].voce ? 0 : apagadas} />
      </div>
    ))}
  </div>
);

// ---------- Abertura ----------

const Gancho: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio + 0.1) return null;
  const sai = prog(t, T.meio - 0.15, 0.25);
  const zero = mola(t, M.problema, 10, 230);
  const treme = t > M.problema && t < M.problema + 0.4 ? Math.sin(t * 80) * 8 * (1 - (t - M.problema) / 0.4) : 0;
  return (
    <>
      <div style={{position: 'absolute', left: 70, right: 70, top: 240, padding: '14px 10px', borderRadius: 26, background: 'rgba(5,10,30,.62)', border: '3px solid rgba(62,198,255,.6)', opacity: 1 - sai, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 44, lineHeight: 1.08, color: COR.branco}}>
        POSTA STORY TODO DIA<br />
        <span style={{color: COR.ciano}}>E NINGUÉM COMPRA?</span>
      </div>
      {zero > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1380, display: 'flex', justifyContent: 'center', opacity: zero * (1 - sai), translate: `${treme}px 0px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 34px', borderRadius: 26, background: 'rgba(8,16,44,.94)', border: `3px solid ${COR.vermelho}`, scale: String(0.7 + 0.3 * zero)}}>
            <span style={{fontSize: 50}}>🛍️</span>
            <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 38, color: COR.cinza}}>Vendas hoje:</span>
            <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.vermelho}}>0</span>
          </div>
        </div>
      )}
    </>
  );
};

// Cobre os momentos artificiais de A (2,58–2,72 «O» e 3,03–3,20 «não é o»).
const ProblemaNao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.o - 0.02, T.meio - 0.05, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={104} style={{textAlign: 'center', marginTop: -60}} pecas={[{texto: 'O PROBLEMA', s: M.o}, {texto: 'NÃO É O SEU', s: M.problema + 0.3}, {texto: 'PRODUTO 🧁', s: M.produto, cor: COR.ciano, brilho: true}]} />
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

// ---------- 1. O seu Story vai pro fim da fila ----------

const FimDaFila: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.funciona - 0.12);
  if (!st) return null;
  const k = prog(t, M.indo, 0.9, saida);
  const pos = CONTAS.map((_, i) => (i === 0 ? 7.3 * k : i - k));
  const fim = mola(t, M.fim, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={T.meio + 0.05}>O SEU STORY TÁ INDO</Titulo>
      <Barra pos={pos} salto={[Math.sin(k * Math.PI) * 30]} top={620} e={mola(t, T.meio, 12, 200)} />
      {fim > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1000, display: 'flex', justifyContent: 'center', rotate: `${-4 + (1 - fim) * 10}deg`, scale: String(interpolate(fim, [0, 1], [1.8, 1])), opacity: fim}}>
          <Pilula cor={COR.vermelho} tamanho={70} fundo="rgba(60,10,20,.94)">PRO FIM DA FILA ⏬</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 2. Story quase não chega em gente nova ----------

const GenteNova: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.funciona - 0.1, M.proprio - 0.25);
  if (!st) return null;
  const anel = mola(t, M.funciona, 11, 200);
  const x = mola(t, M.nova, 10, 240);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 470, width: 300, height: 300, borderRadius: 999, padding: 14, boxSizing: 'border-box', background: ANEL, scale: String(anel), rotate: `${(t * 40) % 360}deg`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 999, background: '#7A3E6E', border: '10px solid #0B1226', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, rotate: `${-(t * 40) % 360}deg`}}>🍫</div>
      </div>
      <Palavras t={t} tamanho={84} style={{position: 'absolute', top: 820, textAlign: 'center'}} pecas={[{texto: 'QUASE NÃO CHEGA', s: M.funciona + 0.4}]} />
      <div style={{position: 'absolute', top: 930, display: 'flex', alignItems: 'center', gap: 20, opacity: x, scale: String(interpolate(x, [0, 1], [1.6, 1]))}}>
        <Pilula cor={COR.vermelho} tamanho={64} fundo="rgba(60,10,20,.94)">🚫 EM GENTE NOVA</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 3. O chefe do Instagram (foto + nome = credibilidade) ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.proprio - 0.2, M.caminho - 0.15);
  if (!st) return null;
  const foto = mola(t, M.proprio - 0.15, 11, 160);
  const nome = mola(t, M.chefe, 13, 200);
  const giro = (t * 40) % 360;
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 450, width: 440, height: 440, borderRadius: 999, background: `conic-gradient(from ${giro}deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)`, padding: 14, boxSizing: 'border-box', scale: String(foto), rotate: `${(1 - foto) * -30}deg`, boxShadow: '0 30px 90px rgba(214,41,118,.45)'}}>
        <Img src={ARQ.mosseri} style={{width: '100%', height: '100%', borderRadius: 999, objectFit: 'cover', objectPosition: '50% 22%', border: `10px solid ${COR.marinho}`, boxSizing: 'border-box'}} />
      </div>
      <div style={{position: 'absolute', top: 920, textAlign: 'center', opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 88, color: COR.branco}}>Adam Mosseri</div>
        <div style={{marginTop: 4, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.ciano}}>chefe do Instagram</div>
      </div>
      <div style={{position: 'absolute', top: 1200, fontFamily: INTER, fontWeight: 500, fontSize: 20, color: 'rgba(255,255,255,.55)', opacity: nome}}>Foto: Anthony Quintano · CC BY 2.0</div>
    </AbsoluteFill>
  );
};

const SeloMosseri: React.FC<{t: number; de: number; ate: number}> = ({t, de, ate}) => {
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

// ---------- 4. Reels → gente nova · Story → quem já te segue ----------

const Caminho: React.FC<{t: number; de: number; alvo: number; top: number; de1: string; para: string; cor: string}> = ({t, de, alvo, top, de1, para, cor}) => {
  const mola = useMola();
  const a = mola(t, de, 12, 200);
  const seta = prog(t, de + 0.15, 0.4, saida);
  const b = mola(t, alvo, 12, 220);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{width: 380, padding: '30px 0', borderRadius: 30, ...caixa, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco, opacity: a, scale: String(0.7 + 0.3 * a)}}>{de1}</div>
      <div style={{flex: 1, height: 12, margin: '0 14px', borderRadius: 99, background: `linear-gradient(90deg, ${cor} ${seta * 100}%, transparent ${seta * 100}%)`, position: 'relative'}}>
        <div style={{position: 'absolute', right: -8, top: -22, fontSize: 48, color: cor, opacity: seta > 0.9 ? 1 : 0, lineHeight: 1}}>▶</div>
      </div>
      <div style={{width: 380, padding: '30px 0', borderRadius: 30, background: `${cor}26`, border: `4px solid ${cor}`, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco, opacity: b, scale: String(0.6 + 0.4 * b), boxShadow: `0 0 40px ${cor}55`}}>{para}</div>
    </div>
  );
};

const Caminhos: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.caminho - 0.15, M.nem - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <SeloMosseri t={t} de={M.caminho - 0.15} ate={M.nem + 0.2} />
      <Caminho t={t} de={M.caminho} alvo={M.reels} top={590} de1="▶️ REELS" para="🆕 GENTE NOVA" cor={COR.ciano} />
      <Caminho t={t} de={M.story2} alvo={M.segue - 0.3} top={860} de1="⭕ STORY" para="🤝 QUEM JÁ TE SEGUE" cor={COR.amarelo} />
      <Fonte t={t} de={M.caminho + 0.3} ate={M.nem + 0.2} veiculo="Social Media Today" titulo="Mosseri e os fatores de ranking dos Stories" />
    </AbsoluteFill>
  );
};

// ---------- 5. A ordem é uma aposta: tocar, curtir, responder ----------

const EMBARALHA = [3, 0, 5, 1, 4, 2];

const Ordem: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.nem - 0.15, M.ninguem2 - 0.15);
  if (!st) return null;
  const k = prog(t, M.ordem, 0.8, saida);
  const contas = CONTAS.slice(0, 6);
  const pos = contas.map((_, i) => interpolate(k, [0, 1], [i, EMBARALHA[i]]));
  const salto = contas.map((_, i) => Math.sin(k * Math.PI) * (i % 2 ? 40 : -10));
  const aposta = mola(t, M.aposta, 11, 220);
  const sinais = [
    {de: M.tocar, icone: '👆', texto: 'TOCAR'},
    {de: M.curtir, icone: '❤️', texto: 'CURTIR'},
    {de: M.responder, icone: '💬', texto: 'RESPONDER'},
  ];
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.nem}>E NEM PRA <span style={{color: COR.ciano}}>TODOS</span></Titulo>
      <Barra pos={pos} salto={salto} top={560} e={mola(t, M.nem, 12, 200)} />
      {aposta > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 890, display: 'flex', justifyContent: 'center', opacity: aposta * (1 - prog(t, M.preve, 0.3)), scale: String(0.6 + 0.4 * aposta)}}>
          <Pilula cor={COR.amarelo} tamanho={52} fundo="rgba(40,30,5,.92)">🎲 A ORDEM É UMA APOSTA</Pilula>
        </div>
      )}
      <div style={{position: 'absolute', left: 60, right: 60, top: 900, display: 'flex', gap: 24, justifyContent: 'center', opacity: prog(t, M.preve, 0.3)}}>
        {sinais.map((s) => {
          const e = mola(t, s.de, 10, 230);
          return (
            <div key={s.texto} style={{flex: 1, height: 250, borderRadius: 30, ...caixa, border: `4px solid ${e > 0.5 ? COR.ciano : 'rgba(255,255,255,.15)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, scale: String(0.85 + 0.15 * e), boxShadow: e > 0.5 ? `0 0 50px ${COR.ciano}66` : caixa.boxShadow}}>
              <div style={{fontSize: 90, opacity: 0.3 + 0.7 * e}}>{s.icone}</div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 32, color: e > 0.5 ? COR.branco : COR.cinza}}>{s.texto}</div>
            </div>
          );
        })}
      </div>
      <Fonte t={t} de={M.preve} ate={M.ninguem2} veiculo="Instagram (blog oficial)" titulo="Instagram Ranking Explained" top={1200} />
    </AbsoluteFill>
  );
};

// ---------- 6. O ciclo ruim: ninguém responde → você cai na fila ----------

const DIAS = [
  {dia: 'ONTEM', pos: '3º', views: 480, resp: '💬 0 respostas'},
  {dia: 'HOJE', pos: '9º', views: 210, resp: ''},
  {dia: 'AMANHÃ', pos: '17º', views: 90, resp: ''},
];

const CicloRuim: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.ninguem2 - 0.15, M.so - 0.15);
  if (!st) return null;
  const des = [M.ninguem2, M.hoje, M.amanha];
  const linha = prog(t, M.hoje, M.amanha + 0.5 - M.hoje, saida);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.ninguem2} cor={COR.vermelho}>O CICLO RUIM</Titulo>
      <svg width={1080} height={600} style={{position: 'absolute', left: 0, top: 560}}>
        <path d="M 200 120 L 540 260 L 880 400" pathLength={1} fill="none" stroke={COR.vermelho} strokeWidth={10} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} opacity={0.7} />
      </svg>
      {DIAS.map((d, i) => {
        const e = mola(t, des[i], 11, 220);
        const v = Math.round(interpolate(t, [des[i], des[i] + 0.5], [i ? DIAS[i - 1].views : 600, d.views], clamp));
        return (
          <div key={d.dia} style={{position: 'absolute', left: 50 + i * 340, top: 600 + i * 140, width: 300, padding: '22px 0', borderRadius: 30, ...caixa, border: `4px solid ${i ? COR.vermelho : 'rgba(255,255,255,.2)'}`, textAlign: 'center', opacity: e, scale: String(0.6 + 0.4 * e), translate: `0px ${(1 - e) * 60}px`}}>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 28, color: COR.cinza, letterSpacing: 3}}>{d.dia}</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 90, color: i ? COR.vermelho : COR.branco, lineHeight: 1.1}}>{d.pos}</div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.cinza}}>na fila</div>
            <div style={{marginTop: 8, fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>👀 {v}</div>
            {d.resp && <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 700, fontSize: 22, color: COR.vermelho}}>{d.resp}</div>}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- 7. Por que vale consertar: o público mais quente ----------

const Quente: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.so - 0.15, M.pesquisa - 0.15);
  if (!st) return null;
  const nivel = prog(t, M.so + 0.2, M.quente + 0.4 - M.so, saida);
  const fogo = mola(t, M.quente, 9, 240);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 170, top: 480, width: 130, height: 640, borderRadius: 99, background: 'rgba(255,255,255,.1)', border: '5px solid rgba(255,255,255,.3)', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${nivel * 100}%`, background: `linear-gradient(0deg, ${COR.amarelo}, #FA7E1E, ${COR.vermelho})`}} />
      </div>
      <div style={{position: 'absolute', left: 155, top: 380, fontSize: 130, scale: String(fogo), opacity: fogo}}>🔥</div>
      <div style={{position: 'absolute', left: 380, right: 60, top: 640}}>
        <Palavras t={t} tamanho={76} style={{textAlign: 'left'}} pecas={[{texto: 'O PÚBLICO', s: M.so + 0.3}, {texto: 'MAIS QUENTE', s: M.quente - 0.1, cor: '#FA7E1E', brilho: true}]} />
        <div style={{marginTop: 30, opacity: mola(t, M.quente + 0.3, 12, 200)}}>
          <Pilula cor={COR.amarelo} tamanho={40} fundo="rgba(40,30,5,.92)">🤝 QUEM JÁ TE SEGUE</Pilula>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 8. A pesquisa: 62% ----------

const Pesquisa: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pesquisa - 0.15, M.entao - 0.15);
  if (!st) return null;
  const pct = Math.round(interpolate(t, [M.n62 - 0.4, M.n62 + 0.5], [0, 62], {...clamp, easing: saida}));
  const num = mola(t, M.n62 - 0.4, 12, 200);
  const anel = prog(t, M.n62 - 0.4, 0.9, saida) * 0.62;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pesquisa}>📊 PESQUISA <span style={{color: COR.ciano}}>IPSOS</span></Titulo>
      <div style={{position: 'absolute', left: 290, top: 540, width: 500, height: 500, borderRadius: 999, background: `conic-gradient(${COR.ciano} ${anel * 360}deg, rgba(255,255,255,.08) 0deg)`, padding: 34, boxSizing: 'border-box', opacity: num, scale: String(0.7 + 0.3 * num)}}>
        <div style={{width: '100%', height: '100%', borderRadius: 999, background: COR.marinho, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 170, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>
          {pct}<span style={{fontSize: 90, color: COR.ciano}}>%</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: 1070, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46, lineHeight: 1.15, color: COR.branco, opacity: mola(t, M.interessados - 0.1, 12, 200)}}>
        MAIS INTERESSADOS NA MARCA <span style={{color: COR.ciano}}>DEPOIS DE VER NOS STORIES</span>
      </div>
      <Fonte t={t} de={M.ipsos} ate={M.entao} icone="📊" veiculo="Ipsos para Facebook IQ" titulo="pesquisa em 12 países" top={1220} />
    </AbsoluteFill>
  );
};

// ---------- 9. Dica 1: todo Story pede um toque ----------

const SeloDica: React.FC<{t: number; de: number; n: number}> = ({t, de, n}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 230);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 425, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.8, 1])), rotate: `${-4 + (1 - e) * 10}deg`}}>
      <Pilula cor={COR.ciano} tamanho={54} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8)">DICA {n}</Pilula>
    </div>
  );
};

const TelaStory: React.FC<{e: number; children?: React.ReactNode}> = ({e, children}) => (
  <div style={{position: 'absolute', left: 300, top: 540, width: 480, height: 760, borderRadius: 48, border: '10px solid #1B2238', overflow: 'hidden', background: 'linear-gradient(170deg, #9C5A3C, #3B1E14)', boxShadow: '0 40px 100px rgba(0,0,0,.6)', opacity: e, scale: String(0.75 + 0.25 * e)}}>
    <div style={{position: 'absolute', left: 16, right: 16, top: 16, height: 6, borderRadius: 9, background: 'rgba(255,255,255,.35)'}}><div style={{width: '45%', height: '100%', borderRadius: 9, background: '#fff'}} /></div>
    <div style={{position: 'absolute', left: 18, top: 36, display: 'flex', alignItems: 'center', gap: 10}}>
      <div style={{width: 50, height: 50, borderRadius: 99, background: '#7A3E6E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28}}>🍫</div>
      <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 22, color: '#fff'}}>docesdaana</span>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', fontSize: 150, opacity: 0.9}}>🧁</div>
    {children}
  </div>
);

const Figurinha: React.FC<{t: number; de: number; ate: number; top: number; children: React.ReactNode; rot?: number}> = ({t, de, ate, top, children, rot = -3}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240) * (1 - prog(t, ate, 0.25));
  if (e <= 0.01) return null;
  return <div style={{position: 'absolute', left: 30, right: 30, top, opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), rotate: `${rot + (1 - e) * 10}deg`}}>{children}</div>;
};

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.entao - 0.15, M.dica2 - 0.15);
  if (!st) return null;
  const virar = mola(t, M.entao, 11, 210) * (1 - prog(t, M.dica1 - 0.2, 0.2));
  const tela = mola(t, M.dica1, 12, 200);
  const ninho = interpolate(t, [M.ninho, M.brigadeiro + 0.9], [0, 48], clamp);
  const brig = interpolate(t, [M.ninho, M.brigadeiro + 0.9], [0, 52], clamp);
  const toque = mola(t, M.toque - 0.1, 11, 220);
  return (
    <AbsoluteFill style={st}>
      {virar > 0.01 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: virar}}>
          <Palavras t={t} tamanho={110} style={{textAlign: 'center', marginTop: -120}} pecas={[{texto: 'PRA VIRAR', s: M.entao}, {texto: 'O JOGO', s: M.virar, cor: COR.ciano, brilho: true}]} />
        </AbsoluteFill>
      )}
      {tela > 0.01 && <SeloDica t={t} de={M.dica1} n={1} />}
      {tela > 0.01 && (
        <TelaStory e={tela}>
          <Figurinha t={t} de={M.enquete} ate={M.tipo} top={310}>
            <div style={{padding: '12px 16px', borderRadius: 18, background: '#fff', textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#222'}}>📊 ENQUETE<div style={{display: 'flex', gap: 8, marginTop: 8}}><div style={{flex: 1, padding: 8, borderRadius: 10, background: '#EEE'}}>SIM</div><div style={{flex: 1, padding: 8, borderRadius: 10, background: '#EEE'}}>NÃO</div></div></div>
          </Figurinha>
          <Figurinha t={t} de={M.caixinha} ate={M.tipo} top={460} rot={3}>
            <div style={{borderRadius: 18, overflow: 'hidden', textAlign: 'center', fontFamily: INTER, fontWeight: 800}}>
              <div style={{padding: '10px 0', background: '#962FBF', color: '#fff', fontSize: 22}}>Me faz uma pergunta</div>
              <div style={{padding: '12px 0', background: '#fff', color: '#999', fontSize: 20}}>Digite algo...</div>
            </div>
          </Figurinha>
          <Figurinha t={t} de={M.reage} ate={M.tipo} top={590}>
            <div style={{padding: '12px 18px', borderRadius: 18, background: '#fff', fontFamily: INTER, fontWeight: 800, fontSize: 22, color: '#222'}}>
              REAGE COM 🔥
              <div style={{marginTop: 8, height: 10, borderRadius: 9, background: 'linear-gradient(90deg, #FA7E1E, #D62976)', width: `${prog(t, M.foguinho, 0.5) * 100}%`}} />
            </div>
          </Figurinha>
          <Figurinha t={t} de={M.tipo} ate={99} top={330} rot={-2}>
            <div style={{padding: 18, borderRadius: 22, background: '#fff', fontFamily: INTER, fontWeight: 800, color: '#222'}}>
              <div style={{textAlign: 'center', fontSize: 30, marginBottom: 12}}>Qual sai amanhã?</div>
              {[{n: '🥥 NINHO', v: ninho}, {n: '🍫 BRIGADEIRO', v: brig}].map((o) => (
                <div key={o.n} style={{position: 'relative', marginTop: 10, height: 58, borderRadius: 14, background: '#EEE', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${o.v}%`, background: 'linear-gradient(90deg, #FA7E1E, #D62976)', opacity: 0.85}} />
                  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: 24}}>
                    <span>{o.n}</span>
                    <span style={{fontVariantNumeric: 'tabular-nums'}}>{Math.round(o.v)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Figurinha>
        </TelaStory>
      )}
      <Toque t={t} de={M.brigadeiro - 0.3} toque={M.brigadeiro + 0.1} x={620} y={1010} tamanho={120} />
      {toque > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1230, display: 'flex', justifyContent: 'center', opacity: toque * (1 - prog(t, M.tipo - 0.2, 0.2)), scale: String(0.6 + 0.4 * toque)}}>
          <Pilula cor={COR.ciano} tamanho={44} fundo="rgba(10,30,70,.94)">👆 TODO STORY PEDE UM TOQUE</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 10. Dica 2: quem tocou recebe direct ----------

const VOTOS = [
  {c: CONTAS[1], voto: '🍫'},
  {c: CONTAS[3], voto: '🥥'},
  {c: CONTAS[4], voto: '🍫'},
  {c: CONTAS[6], voto: '🍫'},
];

const Balao: React.FC<{t: number; de: number; meu?: boolean; children: React.ReactNode}> = ({t, de, meu, children}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 220);
  if (e <= 0.01) return null;
  return (
    <div style={{display: 'flex', justifyContent: meu ? 'flex-end' : 'flex-start', marginTop: 18, opacity: e, translate: `${(1 - e) * (meu ? 60 : -60)}px 0px`, scale: String(0.8 + 0.2 * e)}}>
      <div style={{maxWidth: 560, padding: '18px 26px', borderRadius: 34, fontFamily: INTER, fontWeight: 600, fontSize: 34, color: '#fff', background: meu ? 'linear-gradient(135deg, #7B3FE4, #3F6BFF)' : '#2A3150'}}>{children}</div>
    </div>
  );
};

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica2 - 0.15, M.ainda - 0.15);
  if (!st) return null;
  const lista = mola(t, M.dica2, 12, 200) * (1 - prog(t, M.direct - 0.05, 0.25));
  const dm = mola(t, M.direct, 12, 200);
  const venda = mola(t, M.venda - 0.05, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.dica2} n={2} />
      {lista > 0.01 && (
        <div style={{position: 'absolute', left: 120, right: 120, top: 560, padding: 30, ...caixa, opacity: lista, scale: String(0.8 + 0.2 * lista)}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.cinza, marginBottom: 10}}>📊 Votos da enquete</div>
          {VOTOS.map((v, i) => (
            <div key={v.c.nome} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '14px 10px', borderRadius: 20, background: i === 0 && t > M.tocou + 0.2 ? 'rgba(62,198,255,.2)' : 'transparent', opacity: mola(t, M.dica2 + 0.15 * i, 12, 220)}}>
              <div style={{width: 76, height: 76, borderRadius: 99, background: v.c.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40}}>{v.c.emoji}</div>
              <div style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco}}>{v.c.nome}</div>
              <div style={{fontSize: 44}}>{v.voto}</div>
              <div style={{padding: '8px 18px', borderRadius: 14, background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#fff'}}>Mensagem</div>
            </div>
          ))}
        </div>
      )}
      <Toque t={t} de={M.tocou - 0.3} toque={M.tocou + 0.25} x={800} y={700} tamanho={120} />
      {dm > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 540, padding: '24px 30px 34px', ...caixa, opacity: dm, scale: String(0.8 + 0.2 * dm)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 18, borderBottom: '2px solid rgba(255,255,255,.12)'}}>
            <div style={{width: 70, height: 70, borderRadius: 99, background: CONTAS[1].cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38}}>{CONTAS[1].emoji}</div>
            <div>
              <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>ju.martins</div>
              <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 22, color: COR.cinza}}>votou 🍫 na sua enquete</div>
            </div>
          </div>
          <Balao t={t} de={M.manda1} meu>Separei um brigadeiro pra você 😉</Balao>
          <Balao t={t} de={M.voce + 0.45}>Quero 2!! 😍 Passo aí amanhã</Balao>
        </div>
      )}
      {venda > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1060, display: 'flex', justifyContent: 'center', gap: 20, opacity: venda, scale: String(interpolate(venda, [0, 1], [1.6, 1])), rotate: `${-3 + (1 - venda) * 8}deg`}}>
          <Pilula cor={COR.verde} tamanho={46} fundo="rgba(5,40,25,.94)">🛍️ PEDIDO: 2 BRIGADEIROS</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 11. O ciclo bom: a conversa te devolve pro começo da fila ----------

const CicloBom: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.ainda - 0.15, T.b - 0.1);
  if (!st) return null;
  const k = prog(t, M.comeco - 0.2, 0.7, saida);
  const pos = CONTAS.slice(0, 6).map((_, i) => (i === 0 ? interpolate(k, [0, 1], [5, 0]) : i - 1 + k));
  const salto = [Math.sin(k * Math.PI) * 90];
  const primeiro = mola(t, M.fila2, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.ainda - 0.1} cor={COR.verde}>O CICLO BOM</Titulo>
      <Barra pos={pos} salto={salto} brilho={prog(t, M.comeco + 0.3, 0.3)} apagadas={k} top={620} e={mola(t, M.ainda, 12, 200)} />
      {primeiro > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1000, display: 'flex', justifyContent: 'center', opacity: primeiro, scale: String(interpolate(primeiro, [0, 1], [1.7, 1])), rotate: `${-3 + (1 - primeiro) * 8}deg`}}>
          <Pilula cor={COR.verde} tamanho={60} fundo="rgba(5,40,25,.94)">✓ 1º DA FILA AMANHÃ</Pilula>
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
// B: 47,96–48,27 «Manda» → motion; 50,28–50,58 «E segue o» → "E SEGUE O DIGO" + botão; «Toda» em diante → tela final.
const B1 = M.manda2 + 0.3;
const B2 = M.nada + 0.25;
const B3 = M.digo;
const B4 = M.toda - 0.04;

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

const NaoVende: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < B1 || t >= B2) return null;
  const e = mola(t, M.posta - 0.1, 12, 200);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * -40}px`}}>
      <Pilula cor={COR.vermelho} tamanho={44} fundo="rgba(60,10,20,.9)">PRA QUEM POSTA E NÃO VENDE 🛍️✗</Pilula>
    </div>
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
      <ProblemaNao t={t} />
      <FimDaFila t={t} />
      <GenteNova t={t} />
      <Mosseri t={t} />
      <Caminhos t={t} />
      <Ordem t={t} />
      <CicloRuim t={t} />
      <Quente t={t} />
      <Pesquisa t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <CicloBom t={t} />
      <CardVoz t={t} />
      <Enviar t={t} />
      <NaoVende t={t} />
      <Segue t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'impacto', em: M.ninguem, volume: 0.45},
  {som: 'swoosh', em: M.o - 0.02, volume: 0.45},
  {som: 'ding', em: M.produto, volume: 0.4},
  // Fim da fila
  {som: 'pop', em: T.meio + 0.05, volume: 0.4},
  {som: 'whoosh_out', em: M.indo, volume: 0.5},
  {som: 'impacto', em: M.fim, volume: 0.5},
  // Gente nova
  {som: 'pop', em: M.funciona, volume: 0.4},
  {som: 'risco', em: M.nova, volume: 0.45},
  // Mosseri e caminhos
  {som: 'whoosh_in', em: M.proprio - 0.2, volume: 0.45},
  {som: 'ding', em: M.chefe, volume: 0.4},
  {som: 'pop', em: M.caminho, volume: 0.4},
  {som: 'swoosh', em: M.caminho + 0.15, volume: 0.35},
  {som: 'ding', em: M.reels, volume: 0.4},
  {som: 'pop', em: M.story2, volume: 0.4},
  {som: 'swoosh', em: M.story2 + 0.15, volume: 0.35},
  {som: 'ding', em: M.segue - 0.3, volume: 0.4},
  // Ordem
  {som: 'impacto', em: M.nem, volume: 0.45},
  {som: 'swoosh', em: M.ordem, volume: 0.45},
  {som: 'pop', em: M.aposta, volume: 0.4},
  {som: 'toque', em: M.tocar, volume: 0.5},
  {som: 'pop', em: M.curtir, volume: 0.45},
  {som: 'ding', em: M.responder, volume: 0.45},
  // Ciclo ruim
  {som: 'impacto', em: M.ninguem2, volume: 0.45},
  {som: 'whoosh_out', em: M.hoje, volume: 0.4},
  {som: 'whoosh_out', em: M.amanha, volume: 0.45},
  // Quente e pesquisa
  {som: 'whoosh_in', em: M.so - 0.2, volume: 0.4},
  {som: 'impacto', em: M.quente, volume: 0.45},
  {som: 'pop', em: M.pesquisa, volume: 0.4},
  ...passos(M.n62 - 0.4, M.n62 + 0.5, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.3})),
  {som: 'ding', em: M.n62 + 0.5, volume: 0.5},
  // Dica 1
  {som: 'swoosh', em: M.entao, volume: 0.4},
  {som: 'impacto', em: M.dica1, volume: 0.5},
  {som: 'pop', em: M.enquete, volume: 0.45},
  {som: 'pop', em: M.caixinha, volume: 0.45},
  {som: 'pop', em: M.reage, volume: 0.45},
  {som: 'swoosh', em: M.tipo, volume: 0.4},
  {som: 'toque', em: M.brigadeiro + 0.1, volume: 0.6},
  // Dica 2
  {som: 'impacto', em: M.dica2, volume: 0.5},
  {som: 'toque', em: M.tocou + 0.25, volume: 0.6},
  {som: 'whoosh_in', em: M.direct - 0.1, volume: 0.4},
  {som: 'tecla', em: M.manda1, volume: 0.45},
  {som: 'pop', em: M.voce + 0.45, volume: 0.5},
  {som: 'ding', em: M.venda, volume: 0.55},
  // Ciclo bom
  {som: 'swoosh', em: M.comeco - 0.2, volume: 0.45},
  {som: 'ding', em: M.comeco + 0.4, volume: 0.5},
  {som: 'impacto', em: M.fila2, volume: 0.45},
  // CTA
  {som: 'pop', em: T.b + 0.05, volume: 0.5},
  {som: 'pop', em: M.posta - 0.1, volume: 0.4},
  {som: 'swoosh', em: B2, volume: 0.4},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: B4, volume: 0.5},
];

// Legenda: "62" + "%" viram "62%"; o Whisper ouviu "esse aparelho" no lugar de "separei um".
const LEGENDA = PALAVRAS.reduce<typeof PALAVRAS>((L, p, i) => {
  if (p.w.startsWith('%') && L.length) {
    L[L.length - 1] = {...L[L.length - 1], w: L[L.length - 1].w + p.w, e: p.e};
    return L;
  }
  const ant = PALAVRAS[i - 1]?.w;
  if (p.w === 'esse' && PALAVRAS[i + 1]?.w === 'aparelho') return [...L, {...p, w: 'separei'}];
  if (p.w === 'aparelho' && ant === 'esse') return [...L, {...p, w: 'um'}];
  if (p.w === '-la') {
    L[L.length - 1] = {...L[L.length - 1], w: 'ver', e: L[L.length - 1].e};
    return [...L, {...p, w: 'ela'}];
  }
  return [...L, p];
}, []);

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: M.ninguem, modo: 'cheia', escala: [1.07, 1.1], punch: true},
    {de: M.o - 0.02, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.05]},
    {de: B2, modo: 'fora'},
    {de: B3, modo: 'cheia', escala: [1.05, 1.08], punch: true},
    {de: B4, modo: 'fora'},
  ],
  semLegenda: [
    [M.o - 0.02, T.meio],
    [T.b, B1],
    [B2, T.fim],
  ],
  corEspecial: {},
  eventos: EVENTOS,
  Cena,
};
