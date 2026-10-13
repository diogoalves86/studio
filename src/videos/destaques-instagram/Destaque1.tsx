import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check, Seta, Xis} from '../reels-avatar/Icones';
import {Celular, contar, Palavras, Risco, Selo} from './Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras_1';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// Destaque 1 · O que é: a dor ("o que eu posto agora?") → o Digo como consultor → print do painel → CTA.

const T = {a: TRECHOS['1a'], meio: TRECHOS['1meio'], b: TRECHOS['1b'], fim: TRECHOS.fim};
const depois = (w: string, ref: number) => em(w, ref);
const M = {
  a: em('a'),
  pergunta: em('pergunta.'),
  agora: em('agora?'),
  concorrente: em('concorrente'),
  crescendo: em('crescendo.'),
  tenta: em('tenta'),
  ia: em('ia.'),
  recebe: em('recebe'),
  legenda: em('legenda'),
  pauta: em('pauta'),
  fraca: em('fraca.'),
  digo: em('digo'),
  aplicativo: em('aplicativo'),
  consultor: em('consultor'),
  redes: em('redes'),
  ia2: depois('ia.', em('consultor')),
  ele: em('ele'),
  posts: em('posts,'),
  comentarios: em('comentários'),
  concorrentes: em('concorrentes'),
  diz: em('diz'),
  postar: em('postar'),
  porque: em('porquê.'),
  revisa: em('revisa,'),
  aprova: em('aprova'),
  publica: em('publica.'),
  testa: em('testa'),
  gratis: em('grátis.'),
  link: em('link'),
};
// Pontos em que o clipe congela esperando a voz (sincronia.md): o avatar só volta à tela cheia depois deles.
const VOLTA_PERGUNTA = em('que') - 0.05; // congela em «O», logo antes
const VOLTA_LINK = M.link + 0.3; // congela no começo de «Link»

// 0,84–2,0: notificações cobrem o trecho lento do clipe (0,84–0,97).
const Notificacoes: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.a - 0.06, VOLTA_PERGUNTA);
  if (!st) return null;
  const msgs = ['E hoje, posta o quê? 🤔', 'Ainda sem pauta pra amanhã', 'Concorrente postou 3x hoje'];
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={92} style={{position: 'absolute', top: 270, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'TODA', s: M.a - 0.06}, {texto: 'SEMANA', s: M.a - 0.06, cor: COR.ciano, brilho: true}]} />
      <Celular t={t} src={ARQ.print('painel-calendario')} y={0} largura={500} style={{left: 290, top: 470, filter: 'brightness(.55)'}}>
        {msgs.map((m, i) => {
          const e = mola(t, M.a + i * 0.2, 13, 200);
          return (
            <div key={i} style={{position: 'absolute', left: 22, right: 22, top: 120 + i * 130, padding: '20px 24px', borderRadius: 26, background: 'rgba(240,244,255,.95)', fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.marinho, opacity: e, translate: `0px ${(1 - e) * -60}px`, boxShadow: '0 16px 40px rgba(0,0,0,.4)'}}>
              <div style={{fontSize: 20, color: '#5B6785', marginBottom: 6}}>Instagram · agora</div>
              {m}
            </div>
          );
        })}
      </Celular>
    </AbsoluteFill>
  );
};

// "Você vê concorrente crescendo": perfil do concorrente com seguidores subindo e gráfico.
const Concorrente: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.meio + 0.05, M.tenta - 0.25);
  if (!st) return null;
  const n = contar(t, M.concorrente, M.tenta - 0.3, 8420, 12930);
  const linha = prog(t, M.crescendo - 0.2, 0.7, saida);
  const caminho = 'M 20 300 C 120 290, 180 310, 260 260 S 400 230, 470 180 S 600 120, 700 30';
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 330, height: 820, padding: 54, boxSizing: 'border-box', ...caixa}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
          <div style={{width: 130, height: 130, borderRadius: 99, background: 'linear-gradient(135deg,#C2378A,#F2994A)', padding: 6}}>
            <div style={{width: '100%', height: '100%', borderRadius: 99, background: '#2A2F45', border: '5px solid #13214A', boxSizing: 'border-box'}} />
          </div>
          <div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: COR.branco}}>@concorrente</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 32, color: COR.cinza}}>postando todo dia</div>
          </div>
        </div>
        <div style={{marginTop: 50, fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.cinza, letterSpacing: 2}}>SEGUIDORES</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 140, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>{n.toLocaleString('pt-BR')}</div>
          <Seta tamanho={90} cor={COR.verde} style={{opacity: linha}} />
        </div>
        <svg width={760} height={330} viewBox="0 0 720 330" style={{marginTop: 10}}>
          <path d={caminho} pathLength={1} fill="none" stroke={COR.verde} strokeWidth={12} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} style={{filter: 'drop-shadow(0 0 14px rgba(46,229,157,.7))'}} />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// "Tenta uma IA. E recebe…": chat genérico digitando uma legenda cheia de emoji.
const ChatIA: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.tenta - 0.1, M.legenda - 0.2);
  if (!st) return null;
  const resposta = '✨ Transforme sua rotina! 🚀 Conteúdo que inspira, conecta e transforma 💙 #foco #sucesso';
  const n = Math.round(interpolate(t, [M.recebe - 0.1, M.legenda - 0.2], [0, resposta.length], clamp));
  const p = mola(t, M.tenta - 0.1);
  const r = mola(t, M.ia + 0.1);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 330, height: 820, padding: 46, boxSizing: 'border-box', ...caixa, background: 'rgba(28,32,44,.97)', border: '3px solid rgba(255,255,255,.12)'}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.cinza}}>Assistente de IA genérico</div>
        <div style={{marginTop: 40, marginLeft: 'auto', width: 'fit-content', maxWidth: 640, padding: '26px 32px', borderRadius: 32, background: COR.azul, fontFamily: INTER, fontWeight: 600, fontSize: 40, color: COR.branco, opacity: p, translate: `0px ${(1 - p) * 30}px`}}>
          Me dá uma legenda pro post de hoje
        </div>
        <div style={{marginTop: 34, maxWidth: 720, padding: '28px 32px', borderRadius: 32, background: 'rgba(255,255,255,.08)', fontFamily: INTER, fontWeight: 600, fontSize: 42, lineHeight: 1.35, color: COR.branco, opacity: r, minHeight: 260}}>
          {resposta.slice(0, n)}
          <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// "legenda bonita pra uma pauta fraca": ✓ verde × ✕ vermelho com risco em "fraca".
const BonitaFraca: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.legenda - 0.15, M.digo - 0.3);
  if (!st) return null;
  const c1 = bloco(t, M.legenda, 99) ?? {};
  const c2 = bloco(t, M.pauta, 99) ?? {opacity: 0};
  const linha = (cor: string): React.CSSProperties => ({display: 'flex', alignItems: 'center', gap: 30, padding: '44px 46px', ...caixa, border: `4px solid ${cor}`});
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 380, display: 'flex', flexDirection: 'column', gap: 56}}>
        <div style={{...linha(COR.verde), ...c1}}>
          <div style={{width: 110, height: 110, borderRadius: 99, background: `${COR.verde}26`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check tamanho={74} cor={COR.verde} /></div>
          <div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.cinza}}>a IA te dá</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 80, color: COR.branco}}>LEGENDA BONITA</div>
          </div>
        </div>
        <div style={{...linha(COR.vermelho), ...c2}}>
          <div style={{width: 110, height: 110, borderRadius: 99, background: `${COR.vermelho}26`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Xis tamanho={70} cor={COR.vermelho} /></div>
          <div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.cinza}}>mas a pauta é</div>
            <div style={{position: 'relative', display: 'inline-block', fontFamily: MONT, fontWeight: 900, fontSize: 80, color: COR.branco}}>
              PAUTA FRACA
              <Risco t={t} de={M.fraca} />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// "O Digo Social é um aplicativo…": logo oficial com brilho.
const Logo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.digo - 0.15, M.consultor - 0.3);
  if (!st) return null;
  const l = mola(t, M.digo - 0.15, 11, 170);
  const app = mola(t, M.aplicativo, 12, 220);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 360, width: 520, height: 520, borderRadius: 999, background: 'radial-gradient(circle, rgba(46,229,157,.35), rgba(47,123,255,.15) 50%, transparent 70%)', scale: String(0.6 + 0.6 * l)}} />
      <Img src={ARQ.logo} style={{position: 'absolute', top: 420, width: 400, height: 400, borderRadius: 90, scale: String(l), rotate: `${(1 - l) * -25}deg`, boxShadow: '0 30px 90px rgba(46,229,157,.3), 0 0 0 3px rgba(62,198,255,.4)'}} />
      <div style={{position: 'absolute', top: 880, fontFamily: MONT, fontWeight: 900, fontSize: 120, color: COR.branco, opacity: l}}>Digo Social</div>
      <div style={{position: 'absolute', top: 1040, opacity: app, scale: String(0.6 + 0.4 * app)}}>
        <Pilula cor={COR.ciano} tamanho={44} fundo="rgba(10,30,70,.92)">APLICATIVO</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// "consultor de redes sociais com IA": tipografia grande com marca-texto.
const Consultor: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.consultor - 0.12, M.ele - 0.25);
  if (!st) return null;
  const mk = prog(t, M.consultor + 0.1, 0.35, saida);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 380, left: 70, right: 70, textAlign: 'center'}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 48, color: COR.cinza}}>funciona como um</div>
        <div style={{position: 'relative', display: 'inline-block', marginTop: 20, padding: '0 24px'}}>
          <div style={{position: 'absolute', left: 0, top: '18%', height: '72%', width: `${mk * 100}%`, borderRadius: 18, background: `${COR.ciano}55`, boxShadow: `0 0 40px ${COR.ciano}88`}} />
          <div style={{position: 'relative', fontFamily: MONT, fontWeight: 900, fontSize: 138, color: COR.branco}}>CONSULTOR</div>
        </div>
        <Palavras t={t} tamanho={88} style={{marginTop: 10}} pecas={[{texto: 'DE REDES', s: M.redes}, {texto: 'SOCIAIS', s: M.redes + 0.2}]} />
        <Palavras t={t} tamanho={150} style={{marginTop: 20}} pecas={[{texto: 'COM IA', s: M.ia2, cor: COR.ciano, brilho: true}]} />
      </div>
    </AbsoluteFill>
  );
};

// "Ele lê seus posts, comentários e concorrentes": 3 fontes entram e se ligam à logo.
const Le: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.ele - 0.1, M.diz - 0.1);
  if (!st) return null;
  // [texto, palavra, cor, ponta direita da etiqueta em px]
  const fontes: [string, number, string, number][] = [
    ['POSTS', M.posts, COR.azul, 335],
    ['COMENTÁRIOS', M.comentarios, COR.ciano, 545],
    ['CONCORRENTES', M.concorrentes, COR.verde, 585],
  ];
  const l = mola(t, M.ele - 0.1);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 84, color: COR.branco, opacity: l}}>
        O DIGO <span style={{color: COR.ciano}}>LÊ</span>
      </div>
      {fontes.map(([txt, s, cor, x0], i) => {
        const e = mola(t, s, 13, 200);
        const y = 520 + i * 170;
        const fio = prog(t, s + 0.1, 0.4, saida);
        return (
          <React.Fragment key={txt}>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d={`M ${x0} ${y + 48} C 720 ${y + 48}, 700 1100, 790 1100`} pathLength={1} fill="none" stroke={cor} strokeWidth={8} strokeDasharray="1 1" strokeDashoffset={1 - fio} style={{filter: `drop-shadow(0 0 10px ${cor})`}} />
            </svg>
            <div style={{position: 'absolute', left: 70, top: y, opacity: e, translate: `${(1 - e) * -80}px 0px`}}>
              <Pilula cor={cor} tamanho={46} fundo="rgba(10,24,60,.94)">{txt}</Pilula>
            </div>
          </React.Fragment>
        );
      })}
      <Img src={ARQ.logo} style={{position: 'absolute', left: 760, top: 1000, width: 200, height: 200, borderRadius: 48, opacity: l, boxShadow: '0 0 60px rgba(46,229,157,.45)'}} />
    </AbsoluteFill>
  );
};

// "te diz o que postar essa semana, e por quê": print do painel Hoje, marca-texto na Leitura do Consultor.
const PrintHoje: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.diz - 0.1, T.b + 0.2);
  if (!st) return null;
  const y = interpolate(t, [M.diz - 0.1, M.porque], [2980, 3080], {...clamp, easing: saida});
  const zoom = interpolate(t, [M.postar, M.postar + 0.6], [1, 1.22], {...clamp, easing: saida});
  return (
    <AbsoluteFill style={st}>
      <Celular t={t} src={ARQ.print('painel-hoje-full')} y={y} largura={520} zoom={zoom} foco={[450, 3400]} style={{left: 280, top: 250}}
        marcas={[{x: 40, y: 3350, w: 900, h: 100, de: M.postar}]} />
      <Selo t={t} de={M.porque} cor={COR.amarelo} tamanho={60} style={{left: 120, top: 1080}}>E POR QUÊ</Selo>
    </AbsoluteFill>
  );
};

// Fechamento em card: "revisa ✓ aprova ✓ publica ✓" e o selo dos 7 dias.
const Checks: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const fora = prog(t, M.testa - 0.2, 0.25);
  if (t < M.aprova - 0.05 || fora >= 1) return null;
  // Entram depois que o card assenta (0,45 s), para o texto nunca passar sobre o rosto ainda grande.
  const itens: [string, number][] = [['REVISA', M.aprova - 0.05], ['APROVA', M.aprova + 0.12], ['PUBLICA', M.publica]];
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${14 * fora}px)`}}>
      <div style={{position: 'absolute', left: 64, top: 700, display: 'flex', flexDirection: 'column', gap: 30}}>
        {itens.map(([txt, s]) => {
          const e = mola(t, s, 12, 210);
          return (
            <div key={txt} style={{display: 'flex', alignItems: 'center', gap: 22, opacity: e, translate: `${(1 - e) * -70}px 0px`}}>
              <div style={{width: 84, height: 84, borderRadius: 99, background: COR.verde, display: 'flex', alignItems: 'center', justifyContent: 'center', scale: String(0.5 + 0.5 * e)}}><Check tamanho={58} cor={COR.marinho} /></div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 76, color: COR.branco}}>{txt}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Gratis: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const fora = prog(t, VOLTA_LINK - 0.25, 0.25);
  if (t < M.testa - 0.05 || fora >= 1) return null;
  const e = mola(t, M.testa, 10, 200);
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${14 * fora}px)`}}>
      <div style={{position: 'absolute', left: 50, top: 640, width: 560, textAlign: 'center', scale: String(interpolate(e, [0, 1], [1.8, 1])), opacity: e, rotate: `${-5 + (1 - e) * 10}deg`}}>
        <div style={{padding: '40px 20px', borderRadius: 48, background: 'linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)', boxShadow: '0 30px 90px rgba(47,123,255,.5)'}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 200, lineHeight: 0.9, color: COR.branco}}>7</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco}}>DIAS GRÁTIS</div>
        </div>
        <div style={{marginTop: 26, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.cinza, opacity: mola(t, M.gratis)}}>link na bio ↓</div>
      </div>
    </AbsoluteFill>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Notificacoes t={t} />
      <Concorrente t={t} />
      <ChatIA t={t} />
      <BonitaFraca t={t} />
      <Logo t={t} />
      <Consultor t={t} />
      <Le t={t} />
      <PrintHoje t={t} />
      <Checks t={t} />
      <Gratis t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'pop', em: M.a, volume: 0.45},
  {som: 'pop', em: M.a + 0.2, volume: 0.45},
  {som: 'pop', em: M.a + 0.4, volume: 0.45},
  ...passos(M.concorrente, M.tenta - 0.3, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.45})),
  {som: 'whoosh_in', em: M.crescendo - 0.2, volume: 0.4},
  {som: 'whoosh_in', em: M.tenta - 0.35, volume: 0.45},
  ...passos(M.recebe, M.legenda - 0.3, 9).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'whoosh_in', em: M.legenda - 0.4, volume: 0.45},
  {som: 'ding', em: M.legenda, volume: 0.3},
  {som: 'pop', em: M.pauta, volume: 0.5},
  {som: 'risco', em: M.fraca, volume: 0.5},
  {som: 'whoosh_in', em: M.digo - 0.4, volume: 0.45},
  {som: 'impacto', em: M.digo - 0.05, volume: 0.5},
  {som: 'pop', em: M.aplicativo, volume: 0.5},
  {som: 'whoosh_in', em: M.consultor - 0.4, volume: 0.45},
  {som: 'risco', em: M.consultor + 0.1, volume: 0.45},
  {som: 'impacto', em: M.ia2, volume: 0.4},
  {som: 'whoosh_in', em: M.ele - 0.35, volume: 0.45},
  {som: 'pop', em: M.posts, volume: 0.5},
  {som: 'pop', em: M.comentarios, volume: 0.5},
  {som: 'pop', em: M.concorrentes, volume: 0.5},
  {som: 'whoosh_in', em: M.diz - 0.35, volume: 0.45},
  {som: 'risco', em: M.postar, volume: 0.45},
  {som: 'impacto', em: M.porque, volume: 0.45},
  {som: 'ding', em: M.aprova - 0.05, volume: 0.3},
  {som: 'ding', em: M.aprova + 0.12, volume: 0.3},
  {som: 'ding', em: M.publica, volume: 0.35},
  {som: 'impacto', em: M.testa, volume: 0.5},
];

export const CONFIG_1: Config = {
  n: 1,
  palavras: PALAVRAS,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.04]},
    {de: M.a - 0.06, modo: 'fora'},
    {de: VOLTA_PERGUNTA, modo: 'cheia', escala: [1.06, 1.09]},
    {de: M.agora, modo: 'cheia', escala: [1.09, 1.22], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1, 1.04]},
    {de: M.aprova - 0.45, modo: 'card'},
    {de: VOLTA_LINK, modo: 'cheia', escala: [1.1, 1.22], punch: true},
  ],
  semLegenda: [
    [M.a - 0.06, VOLTA_PERGUNTA],
    [M.legenda - 0.15, M.digo - 0.3],
    [M.consultor - 0.12, M.ele - 0.2],
    [M.aprova - 0.45, M.link],
  ],
  corEspecial: {'fraca.': COR.vermelho, 'agora?': COR.azul},
  eventos: EVENTOS,
  Cena,
};
