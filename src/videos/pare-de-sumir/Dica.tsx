import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check} from '../reels-avatar/Icones';
import {contar, Palavras, Risco, Selo, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 005 · Reels de dica: "Você posta e some, né?" → como o Instagram decide quem vê o post (teste com pouca gente,
// quem conversa com você te vê mais) → dica 1: responder com pergunta → dica 2: comentar no nicho → seguir o perfil.
// Sem vender o Digo Social: a logo só aparece no CTA e na tela final.

const T = TRECHOS;
const depois = (w: string, ref: number) => em(w, ref);
const M = {
  posta: em('posta'),
  some: em('some'),
  ne: em('né'),
  tambem: em('também'),
  esquece: em('esquece'),
  funciona: em('funciona'),
  o: depois('o', em('assim')),
  pouca: em('pouca'),
  interagem: em('interagem'),
  mostra2: depois('mostra', em('interagem')),
  maisGente: depois('mais', em('interagem')),
  etem: depois('e', depois('gente', em('interagem'))),
  quanto: em('quanto'),
  conversa: em('conversa'),
  mostra3: depois('mostra', em('quanto')),
  pessoa: em('pessoa'),
  entao: depois('então', em('pessoa')),
  dica1: em('dica'),
  responde: em('responde'),
  responde2: depois('responde', em('responde')),
  pergunta: em('pergunta'),
  vira: em('vira'),
  quem: em('quem'),
  volta: em('volta'),
  dica2: depois('dica', em('feed')),
  comenta: em('comenta'),
  nicho: em('nicho'),
  comentario: depois('comentário', em('nicho')),
  verdade: em('verdade'),
  coracao: em('coraçãozinho'),
  clica: em('clica'),
  perfil: em('perfil'),
  se: depois('se', em('perfil')),
  ajudou: em('ajudou'),
  segue: em('segue'),
  digo: em('digo'),
  toda: em('toda'),
};

// Momentos artificiais (sincronia.md): 0,00–0,47 «Você» (boca congelada) → motion até pouco antes de «posta»;
// 3,21–3,47 «também» → motion cheio; 34,01–35,46 «Digo Social… semana tem mais» → motion cheio até o fim.
const ENTRA_A = M.posta - 0.28;
const SAI_1 = M.tambem - 0.02;
const SAI_B = M.digo + 0.08;

const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;
const digitar = (t: number, de: number, ate: number, texto: string) => texto.slice(0, Math.round(interpolate(t, [de, ate], [0, texto.length], clamp)));

// ---------- Abertura ----------

const Publicando: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, 0, ENTRA_A - 0.05, 0);
  if (!st) return null;
  const ok = mola(t, 0.12, 11, 220);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 520, ...caixa, padding: 0, overflow: 'hidden', marginTop: -120}}>
        <div style={{height: 420, background: 'linear-gradient(135deg, #7A3E6E, #C2678A)'}} />
        <div style={{padding: 26, display: 'flex', justifyContent: 'center'}}>
          <div style={{padding: '18px 40px', borderRadius: 20, fontFamily: INTER, fontWeight: 800, fontSize: 36, color: COR.marinho, background: COR.verde, scale: String(0.7 + 0.3 * ok)}}>Publicado ✓</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Notificações de comentário chegando enquanto ele "some".
const SemResposta: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.some - 0.05 || t >= SAI_1) return null;
  const e = mola(t, M.some, 12, 210);
  const n = contar(t, M.some, M.ne + 0.3, 1, 3);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 268, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * -50}px`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 30px', borderRadius: 24, background: 'rgba(5,10,30,.85)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 700, fontSize: 36, color: COR.branco}}>
        💬 <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{n}</span> comentários sem resposta
      </div>
    </div>
  );
};

const TambemEsquece: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, SAI_1, M.esquece - 0.05);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={110} style={{textAlign: 'center', marginTop: -100}} pecas={[{texto: 'O INSTAGRAM', s: SAI_1}]} />
      <Palavras t={t} tamanho={140} style={{textAlign: 'center'}} pecas={[{texto: 'TAMBÉM…', s: M.tambem, cor: COR.ciano, brilho: true}]} />
    </AbsoluteFill>
  );
};

const Esquece: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.esquece - 0.05 || t >= T.meio) return null;
  const e = mola(t, M.esquece, 11, 220);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.6 + 0.4 * e)}}>
      <Pilula cor={COR.vermelho} tamanho={70} fundo="rgba(60,10,20,.92)">ESQUECE DE VOCÊ</Pilula>
    </div>
  );
};

// ---------- Meio: card de voz (foto oficial + onda) no lugar do avatar ----------

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

// ---------- Meio: como o Instagram decide ----------

const CORES = ['#E9C46A', '#E76F51', '#2A9D8F', '#3A86FF', '#C2378A'];
const REACOES = ['❤️', '💬', '↗️', '❤️', '💬'];
const CX = 540;
const CY = 860;

// "O Instagram mostra seu post primeiro pra pouca gente. Se essas pessoas interagem, ele mostra pra mais gente."
const Alcance: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.etem - 0.1);
  if (!st) return null;
  const titulo = mola(t, M.funciona, 13, 190);
  const post = mola(t, M.o, 12, 200);
  const ondas = [
    {de: M.mostra2, n: 50, r: 330},
    {de: M.maisGente, n: 500, r: 440},
  ];
  const alcance = t >= M.maisGente ? 500 : t >= M.mostra2 ? 50 : t >= M.pouca ? 5 : 0;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 62, color: COR.branco, opacity: titulo, translate: `0px ${(1 - titulo) * 30}px`}}>
        COMO O INSTAGRAM <span style={{color: COR.ciano}}>DECIDE</span>
      </div>
      {ondas.map((o) => {
        const k = prog(t, o.de, 0.7, saida);
        if (k <= 0) return null;
        return <div key={o.n} style={{position: 'absolute', left: CX - o.r * k, top: CY - o.r * k, width: 2 * o.r * k, height: 2 * o.r * k, borderRadius: 999, border: `4px dashed ${COR.ciano}`, opacity: 0.9 - 0.4 * k}} />;
      })}
      {CORES.map((c, i) => {
        const e = mola(t, M.pouca + i * 0.07, 12, 220);
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / CORES.length;
        const x = CX + Math.cos(ang) * 210;
        const y = CY + Math.sin(ang) * 210;
        const r = mola(t, M.interagem + i * 0.08, 10, 240);
        return (
          <React.Fragment key={c}>
            <div style={{position: 'absolute', left: x - 42, top: y - 42, width: 84, height: 84, borderRadius: 99, background: c, border: '5px solid rgba(255,255,255,.85)', scale: String(e), boxShadow: `0 0 30px ${c}`}} />
            {r > 0.01 && <div style={{position: 'absolute', left: x - 30 + Math.cos(ang) * 70 * r, top: y - 30 + Math.sin(ang) * 70 * r, fontSize: 52, opacity: r, scale: String(r)}}>{REACOES[i]}</div>}
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: CX - 110, top: CY - 110, width: 220, height: 220, borderRadius: 30, background: 'linear-gradient(135deg, #7A3E6E, #C2678A)', border: '5px solid #fff', boxShadow: '0 20px 60px rgba(0,0,0,.5)', scale: String(post), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 44, color: COR.branco}}>
        SEU POST
      </div>
      {alcance > 0 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1170, display: 'flex', justifyContent: 'center'}}>
          <Pilula cor={alcance >= 500 ? COR.verde : COR.ciano} tamanho={50} fundo="rgba(10,30,70,.92)">
            👀 {alcance} PESSOAS
          </Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// "E tem mais: quanto mais alguém conversa com você..."
const Conversa: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.etem - 0.1, M.mostra3 - 0.1);
  if (!st) return null;
  const linha = interpolate(t, [M.conversa, M.mostra3 - 0.3], [4, 22], {...clamp, easing: saida});
  const pessoas = mola(t, M.quanto, 12, 200);
  const baloes = Array.from({length: 4}, (_, i) => ({de: M.conversa + i * 0.25, ida: i % 2 === 0}));
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.etem} cor={COR.amarelo} tamanho={56} rot={-4} style={{left: 300, top: 450}}>E TEM MAIS</Selo>
      <div style={{position: 'absolute', left: 230, right: 230, top: 860 - linha / 2, height: linha, borderRadius: 99, background: `linear-gradient(90deg, ${COR.azul}, ${COR.verde})`, opacity: pessoas, boxShadow: `0 0 ${linha * 2}px ${COR.ciano}`}} />
      {[
        {x: 130, nome: 'VOCÊ', cor: COR.azul},
        {x: 750, nome: 'SEGUIDOR', cor: COR.verde},
      ].map((p) => (
        <div key={p.nome} style={{position: 'absolute', left: p.x, top: 760, width: 200, textAlign: 'center', opacity: pessoas, scale: String(0.6 + 0.4 * pessoas)}}>
          <div style={{width: 200, height: 200, borderRadius: 999, background: p.cor, border: '6px solid #fff', boxShadow: `0 0 40px ${p.cor}`}} />
          <div style={{marginTop: 18, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>{p.nome}</div>
        </div>
      ))}
      {baloes.map((b, i) => {
        const k = prog(t, b.de, 0.55, saida);
        if (k <= 0 || k >= 1) return null;
        const x = b.ida ? interpolate(k, [0, 1], [330, 690]) : interpolate(k, [0, 1], [690, 330]);
        return <div key={i} style={{position: 'absolute', left: x - 40, top: 720 - Math.sin(k * Math.PI) * 120, fontSize: 70}}>💬</div>;
      })}
    </AbsoluteFill>
  );
};

// "...mais o Instagram mostra os seus posts pra essa pessoa."
const FeedTopo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.mostra3 - 0.1, M.entao - 0.1);
  if (!st) return null;
  const sobe = prog(t, M.mostra3 + 0.2, 0.8, saida);
  const posts = [
    {nome: 'outro.perfil', cor: '#3A3F58', seu: false},
    {nome: 'mais.um', cor: '#2F3550', seu: false},
    {nome: 'você', cor: '#C2378A', seu: true},
  ];
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.cinza, letterSpacing: 3}}>FEED DO SEGUIDOR</div>
      <div style={{position: 'absolute', left: 200, right: 200, top: 530, height: 700, ...caixa, overflow: 'hidden'}}>
        {posts.map((p, i) => {
          const y0 = i * 225;
          const y = p.seu ? interpolate(sobe, [0, 1], [y0, 0]) : y0 + (i < 2 ? 225 * sobe : 0);
          return (
            <div key={p.nome} style={{position: 'absolute', left: 24, right: 24, top: 24 + y, height: 200, borderRadius: 24, background: p.cor, border: p.seu ? `5px solid ${COR.ciano}` : undefined, display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', boxSizing: 'border-box', boxShadow: p.seu ? `0 0 40px rgba(62,198,255,${0.6 * sobe})` : undefined}}>
              <div style={{width: 80, height: 80, borderRadius: 99, background: p.seu ? COR.azul : 'rgba(255,255,255,.2)'}} />
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}>{p.seu ? 'SEU POST' : p.nome}</div>
              {p.seu && sobe > 0.9 && <div style={{marginLeft: 'auto', fontSize: 52}}>⬆️</div>}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 1 ----------

const Comentario: React.FC<{nome: string; cor: string; texto: React.ReactNode; e?: number; resposta?: boolean; style?: React.CSSProperties}> = ({nome, cor, texto, e = 1, resposta, style}) => (
  <div style={{display: 'flex', gap: 18, marginLeft: resposta ? 70 : 0, opacity: e, translate: `0px ${(1 - e) * 30}px`, ...style}}>
    <div style={{width: 72, height: 72, borderRadius: 99, background: cor, flexShrink: 0}} />
    <div style={{fontFamily: INTER, fontSize: 40, lineHeight: 1.3, color: COR.branco}}>
      <span style={{fontWeight: 800}}>{nome}</span> <span style={{fontWeight: 500}}>{texto}</span>
    </div>
  </div>
);

const PERGUNTA = 'Obrigado! Qual você mais gostou?';

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica1 - 0.15, M.dica2 - 0.15);
  if (!st) return null;
  const primeiro = mola(t, M.responde, 12, 200);
  const semResp = t >= M.responde && t < M.responde2;
  const extra = [mola(t, M.vira, 12, 210), mola(t, M.vira + 0.3, 12, 210)];
  const total = t < M.responde2 ? 1 : t < M.vira ? 2 : contar(t, M.vira, M.vira + 0.6, 2, 4);
  const feed = mola(t, M.volta, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica1} cor={COR.ciano} tamanho={64} rot={-4} style={{left: 90, top: 440}}>DICA 1</Selo>
      <div style={{position: 'absolute', left: 80, right: 80, top: 580, padding: 36, ...caixa, display: 'flex', flexDirection: 'column', gap: 26}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza}}>
          <span>Comentários</span>
          <span style={{fontFamily: MONT, fontWeight: 900, color: COR.branco}}>💬 {total}</span>
        </div>
        <Comentario nome="ana.lu" cor="#E76F51" texto="Amei! 😍" e={primeiro} />
        {semResp && <div style={{marginLeft: 82, fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.vermelho}}>⏳ sem resposta</div>}
        {t >= M.responde2 && (
          <Comentario resposta nome="você" cor={COR.azul} texto={<>{digitar(t, M.responde2, M.pergunta + 0.3, PERGUNTA)}{t < M.pergunta + 0.3 && <Cursor t={t} />}</>} />
        )}
        {t >= M.vira - 0.05 && <Comentario nome="ana.lu" cor="#E76F51" texto="O vestido azul! Tem no M?" e={extra[0]} />}
        {t >= M.vira + 0.25 && <Comentario resposta nome="você" cor={COR.azul} texto="Tem sim! Te chamo no direct 💙" e={extra[1]} />}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1210, display: 'flex', justifyContent: 'center', opacity: feed, scale: String(0.6 + 0.4 * feed)}}>
        <Pilula cor={COR.verde} tamanho={46} fundo="rgba(10,40,40,.92)">ELA VOLTA A TE VER NO FEED ✓</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 2 ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica2 - 0.15, M.se - 0.1);
  if (!st) return null;
  const post = mola(t, M.comenta, 12, 200);
  const util = mola(t, M.comentario, 12, 200);
  const coracao = mola(t, M.coracao - 0.1, 12, 200);
  const novo = mola(t, M.perfil + 0.1, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica2} cor={COR.ciano} tamanho={64} rot={-4} style={{left: 90, top: 440}}>DICA 2</Selo>
      <div style={{position: 'absolute', left: 80, right: 80, top: 580, padding: 30, ...caixa, opacity: post, translate: `0px ${(1 - post) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <div style={{width: 70, height: 70, borderRadius: 99, background: 'linear-gradient(135deg,#C2378A,#F2994A)'}} />
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco}}>perfil.do.seu.nicho</div>
        </div>
        <div style={{marginTop: 20, height: 130, borderRadius: 22, background: 'linear-gradient(135deg, #1D2B5C, #36508F)'}} />
        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 22}}>
          <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 16, opacity: coracao}}>
            <Comentario nome="alguém" cor="#555C7A" texto="❤️" style={{flex: 1}} />
            {t >= M.coracao && <div style={{position: 'absolute', left: 80, width: 300, top: 0, height: 44}}><Risco t={t} de={M.coracao + 0.15} espessura={8} /></div>}
            {t >= M.coracao + 0.3 && <div style={{fontSize: 44, color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>✗</div>}
          </div>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: 16, opacity: util, translate: `0px ${(1 - util) * 30}px`}}>
            <Comentario nome="@sua.marca" cor={COR.azul} texto="Dica boa! Testei o antes e depois aqui e o pessoal salvou muito 👏" style={{flex: 1}} />
            {t >= M.verdade && <Check tamanho={52} cor={COR.verde} />}
          </div>
        </div>
      </div>
      <Toque t={t} de={M.clica - 0.3} toque={M.clica} x={300} y={990} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1210, display: 'flex', justifyContent: 'center', opacity: novo, scale: String(0.6 + 0.4 * novo)}}>
        <Pilula cor={COR.verde} tamanho={56} fundo="rgba(10,40,40,.92)">+1 SEGUIDOR</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// "Se essa dica te ajudou..."
const DicaSalva: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.se - 0.1, T.b - 0.1);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontSize: 200, marginTop: -160}}>💾</div>
      <Palavras t={t} tamanho={110} style={{textAlign: 'center', marginTop: 20}} pecas={[{texto: 'TE AJUDOU?', s: M.ajudou, cor: COR.ciano, brilho: true}]} />
    </AbsoluteFill>
  );
};

// ---------- Fechamento: "Segue o Digo Social" em tela cheia; o resto em motion (boca acelerada no clipe B) ----------

const BotaoSeguir: React.FC<{t: number; seguindo: boolean; pop: number; tamanho?: number}> = ({seguindo, pop, tamanho = 1}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 22 * tamanho, padding: `${26 * tamanho}px ${30 * tamanho}px`, borderRadius: 36 * tamanho, background: 'rgba(8,16,44,.92)', border: '3px solid rgba(62,198,255,.4)', boxShadow: '0 30px 80px rgba(0,0,0,.55)'}}>
    <Img src={ARQ.logo} style={{width: 104 * tamanho, height: 104 * tamanho, borderRadius: 99, flexShrink: 0}} />
    <div style={{flex: 1}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42 * tamanho, color: COR.branco}}>digo.social</div>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26 * tamanho, color: COR.cinza}}>dicas pra crescer no Instagram</div>
    </div>
    <div style={{padding: `${20 * tamanho}px ${30 * tamanho}px`, borderRadius: 20 * tamanho, fontFamily: INTER, fontWeight: 800, fontSize: 36 * tamanho, color: COR.branco, background: seguindo ? 'rgba(255,255,255,.14)' : COR.azul, scale: String(seguindo ? 0.9 + 0.1 * pop : 1), whiteSpace: 'nowrap'}}>
      {seguindo ? 'Seguindo ✓' : 'Seguir'}
    </div>
  </div>
);

const Seguir: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.segue - 0.05 || t >= SAI_B + 0.1) return null;
  const e = mola(t, M.segue, 12, 200);
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: 1110, opacity: e, translate: `0px ${(1 - e) * 80}px`}}>
      <BotaoSeguir t={t} seguindo={false} pop={0} />
    </div>
  );
};

const SeguindoCheio: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < SAI_B - 0.05) return null;
  const e = mola(t, SAI_B, 13, 190);
  const seguindo = t >= SAI_B + 0.25;
  const pop = mola(t, SAI_B + 0.25, 9, 260);
  return (
    <AbsoluteFill style={{opacity: e}}>
      <div style={{position: 'absolute', left: 50, right: 50, top: 620, scale: String(0.85 + 0.15 * e)}}>
        <BotaoSeguir t={t} seguindo={seguindo} pop={pop} tamanho={1.12} />
      </div>
      <Toque t={t} de={SAI_B} toque={SAI_B + 0.2} x={850} y={700} />
      <Palavras t={t} tamanho={96} style={{position: 'absolute', top: 920, left: 0, right: 0, textAlign: 'center'}}
        pecas={[{texto: 'TODA SEMANA', s: M.toda}, {texto: 'TEM MAIS', s: M.toda + 0.45, cor: COR.ciano, brilho: true}]} />
    </AbsoluteFill>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Publicando t={t} />
      <SemResposta t={t} />
      <TambemEsquece t={t} />
      <Esquece t={t} />
      <Alcance t={t} />
      <Conversa t={t} />
      <FeedTopo t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <DicaSalva t={t} />
      <CardVoz t={t} />
      <Seguir t={t} />
      <SeguindoCheio t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'ding', em: 0.12, volume: 0.45},
  ...passos(M.some, M.ne + 0.3, 3).map((s): Evento => ({som: 'pop', em: s, volume: 0.4})),
  {som: 'impacto', em: M.esquece, volume: 0.45},
  // Como o Instagram decide
  {som: 'pop', em: M.o, volume: 0.5},
  ...passos(M.pouca, M.pouca + 0.35, 5).map((s): Evento => ({som: 'tique', em: s, volume: 0.4})),
  ...passos(M.interagem, M.interagem + 0.4, 5).map((s): Evento => ({som: 'pop', em: s, volume: 0.4})),
  {som: 'swoosh', em: M.mostra2, volume: 0.45},
  {som: 'swoosh', em: M.maisGente, volume: 0.5},
  {som: 'impacto', em: M.etem, volume: 0.45},
  ...passos(M.conversa, M.conversa + 1, 4).map((s): Evento => ({som: 'pop', em: s, volume: 0.4})),
  {som: 'whoosh_in', em: M.mostra3 - 0.3, volume: 0.45},
  {som: 'ding', em: M.mostra3 + 0.9, volume: 0.4},
  // Dica 1
  {som: 'impacto', em: M.dica1, volume: 0.5},
  {som: 'pop', em: M.responde, volume: 0.45},
  ...passos(M.responde2, M.pergunta + 0.3, 8).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'pop', em: M.vira, volume: 0.45},
  {som: 'pop', em: M.vira + 0.3, volume: 0.45},
  {som: 'ding', em: M.volta, volume: 0.45},
  // Dica 2
  {som: 'impacto', em: M.dica2, volume: 0.5},
  {som: 'pop', em: M.comenta, volume: 0.45},
  {som: 'pop', em: M.comentario, volume: 0.45},
  {som: 'risco', em: M.coracao + 0.15, volume: 0.45},
  {som: 'toque', em: M.clica, volume: 0.7},
  {som: 'ding', em: M.perfil + 0.1, volume: 0.5},
  {som: 'whoosh_in', em: M.se - 0.3, volume: 0.45},
  // Fechamento
  {som: 'pop', em: M.segue, volume: 0.5},
  {som: 'toque', em: SAI_B + 0.2, volume: 0.7},
  {som: 'ding', em: SAI_B + 0.25, volume: 0.5},
  {som: 'impacto', em: M.toda, volume: 0.45},
];

// Legenda: "dica 1." e "dica 2." viram "1:" e "2:" (o roteiro fala "dica um: responde…").
const CORRIGE: Record<string, string> = {'1.': '1:', '2.': '2:'};
const LEGENDA = PALAVRAS.map((p) => ({...p, w: CORRIGE[p.w] ?? p.w}));

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'fora'},
    {de: ENTRA_A, modo: 'cheia', escala: [1.02, 1.06]},
    {de: M.ne, modo: 'cheia', escala: [1.08, 1.12], punch: true},
    {de: SAI_1, modo: 'fora'},
    {de: M.esquece, modo: 'cheia', escala: [1.06, 1.1], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.06]},
    {de: SAI_B, modo: 'fora'},
  ],
  semLegenda: [
    [0, ENTRA_A],
    [SAI_1, T.meio],
    [M.dica1 - 0.15, M.dica1 + 0.5],
    [M.dica2 - 0.15, M.dica2 + 0.5],
    [M.se - 0.1, T.b],
    [M.segue - 0.05, T.fim],
  ],
  corEspecial: {'coraçãozinho.': COR.vermelho},
  eventos: EVENTOS,
  Cena,
};
