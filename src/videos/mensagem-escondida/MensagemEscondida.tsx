import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, suave, useBloco, useMola, useT} from './tema';

// 021 · Tem cliente te mandando mensagem agora, e o Instagram está escondendo de você.
// Abertura (mensagens de clientes sugadas para a pasta trancada) → quem não te segue cai em "Solicitações" → parece spam
// vai para "Solicitações ocultas" → sem notificação, o cliente compra de outro → o caminho animado (Direct →
// Solicitações → Solicitações ocultas) → dica 1: abrir 1× por semana e aceitar → dica 2: aba Geral → CTA.
// Telas animadas no estilo do app (pedido do Diogo: sem prints), com os nomes em português pesquisados em 22/10/2026.

const T = TRECHOS;
const M = {
  agora: em('agora'),
  escondendo: em('escondendo'),
  quando: em('quando'),
  mensagem1: em('mensagem', T.meio),
  naoCai: em('não', em('ela')),
  vai: em('vai'),
  solicitacoes1: em('solicitações'),
  eSe: em('e', em('solicitações')),
  spam: em('spam'),
  escondida: em('escondida'),
  solicitacoes2: em('solicitações', em('escondida')),
  ocultas1: em('ocultas'),
  essa: em('essa'),
  notificacao: em('notificação'),
  sabendo: em('sabendo'),
  ouSeja: em('ou'),
  ignorou: em('ignorou'),
  outro: em('outro'),
  compra: em('compra'),
  paraVer: em('para', em('outro')),
  abre: em('abre'),
  direct: em('direct'),
  toca: em('toca'),
  solicitacoes3: em('solicitações', em('toca')),
  solicitacoes4: em('solicitações', em('depois')),
  ocultas2: em('ocultas', em('depois')),
  primeira: em('primeira'),
  semana: em('semana'),
  quando2: em('quando', em('responde')),
  aceita: em('aceita'),
  conversa: em('conversa'),
  principal2: em('principal', em('conversa')),
  segunda: em('segunda'),
  perfil: em('perfil'),
  profissional: em('profissional'),
  geral: em('geral'),
  dias: em('dias'),
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

// ---------- Telas animadas no estilo do Direct (tema escuro do app, nomes em português pesquisados em 22/10/2026) ----------

type Conversa = {avatar: string; nome: string; texto: string; destaque?: string; novo?: boolean};

const LinhaConversa: React.FC<{c: Conversa; k: number; style?: React.CSSProperties}> = ({c, k, style}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18 * k, padding: `${14 * k}px ${22 * k}px`, background: c.destaque ? `${c.destaque}22` : 'transparent', borderLeft: c.destaque ? `${5 * k}px solid ${c.destaque}` : `${5 * k}px solid transparent`, ...style}}>
    <div style={{width: 74 * k, height: 74 * k, borderRadius: 99, background: 'linear-gradient(135deg, #3A4A7A, #22305A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 * k, flexShrink: 0}}>{c.avatar}</div>
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28 * k, color: '#F2F4F8'}}>{c.nome}</div>
      <div style={{fontFamily: INTER, fontWeight: c.novo ? 700 : 500, fontSize: 25 * k, color: c.novo ? '#F2F4F8' : '#9AA3B5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{c.texto}</div>
    </div>
    {c.novo && <div style={{width: 16 * k, height: 16 * k, borderRadius: 99, background: '#3B82F6'}} />}
  </div>
);

// Celular com uma tela do Direct. `w` define a escala; `titulo` é o cabeçalho; `link` é o texto azul no canto.
const TelaDirect: React.FC<{w: number; h: number; titulo: string; voltar?: boolean; link?: React.ReactNode; abas?: React.ReactNode; conversas: Conversa[]; rodape?: React.ReactNode; style?: React.CSSProperties; children?: React.ReactNode}> = ({w, h, titulo, voltar, link, abas, conversas, rodape, style, children}) => {
  const k = w / 600;
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 50 * k, border: `${10 * k}px solid #1B2238`, background: '#0D1117', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16 * k, padding: `${30 * k}px ${24 * k}px ${16 * k}px`}}>
        {voltar && <span style={{fontFamily: INTER, fontWeight: 500, fontSize: 40 * k, color: '#F2F4F8'}}>‹</span>}
        <div style={{flex: 1, fontFamily: INTER, fontWeight: 800, fontSize: 34 * k, color: '#F2F4F8'}}>{titulo}</div>
        {link}
      </div>
      {abas}
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {conversas.map((c) => <LinhaConversa key={c.nome + c.texto} c={c} k={k} />)}
      </div>
      {rodape}
      {children}
    </div>
  );
};

const LinkAzul: React.FC<{k: number; children: React.ReactNode; ativo?: number}> = ({k, children, ativo = 0}) => (
  <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 27 * k, color: '#4C8DFF', padding: `${6 * k}px ${12 * k}px`, borderRadius: 12 * k, background: `rgba(255,214,10,${0.3 * ativo})`, outline: ativo > 0.01 ? `${3 * k}px solid rgba(255,214,10,${ativo})` : 'none'}}>{children}</span>
);

const CLIENTES: Conversa[] = [
  {avatar: '🙋‍♀️', nome: 'mari.compras', texto: 'Tem no tamanho M?', novo: true},
  {avatar: '🧔', nome: 'joao.silva22', texto: 'Quanto custa o kit?', novo: true},
  {avatar: '👩‍🦱', nome: 'bia_lima', texto: 'Faz entrega no meu bairro?', novo: true},
];
const AMIGOS: Conversa[] = [
  {avatar: '😎', nome: 'Primo Lucas', texto: 'kkkkk viu isso?'},
  {avatar: '👵', nome: 'Mãe', texto: 'Almoço domingo?'},
];

// ---------- Abertura: mensagens de clientes sugadas para a pasta trancada ----------

const A0 = M.agora - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const suga = prog(t, A0 - 0.6, 0.45, suave);
  const tremor = Math.sin(t * 80) * 10 * prog(t, A0 - 0.15, 0.04) * (1 - prog(t, A0 - 0.1, 0.15));
  const mola = useMola();
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      {CLIENTES.map((c, i) => {
        const e = mola(t, 0.05 + i * 0.18, 12, 220);
        const x0 = [110, 260, 150][i], y0 = [560, 760, 960][i];
        const x = x0 + (330 - x0) * suga, y = y0 + (1330 - y0) * suga;
        return (
          <div key={c.nome} style={{position: 'absolute', left: x, top: y, opacity: e * (1 - suga), scale: String((0.8 + 0.2 * e) * (1 - 0.8 * suga)), rotate: `${suga * 30 * (i - 1)}deg`}}>
            <div style={{padding: '22px 30px', borderRadius: 36, background: '#262D3D', fontFamily: INTER, fontWeight: 700, fontSize: 40, color: '#F2F4F8', boxShadow: '0 20px 50px rgba(0,0,0,.5)', whiteSpace: 'nowrap'}}>
              <div style={{fontSize: 24, color: '#9AA3B5', marginBottom: 4}}>{c.avatar} {c.nome}</div>{c.texto}
            </div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1300, textAlign: 'center', fontSize: 170, scale: String(1 + 0.25 * Math.sin(suga * Math.PI))}}>🔒</div>
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, A0 - 0.15, 0.05) * (1 - prog(t, A0 - 0.1, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>📩</span> MENSAGEM DE <span style={{color: COR.vermelho}}>CLIENTE</span><br /><span style={{color: COR.vermelho}}>ESCONDIDA</span> DE VOCÊ
          </div>
        </div>
      </div>
    </>
  );
};

// No peito dela: a pasta trancada com as mensagens; em "escondendo", o carimbo.
const PastaTrancada: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = mola(t, A0 + 0.1, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 28px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.vermelho}`}}>
          <span style={{fontSize: 54}}>🔒</span>
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 38, color: COR.branco}}>3 mensagens de clientes</span>
        </div>
      </div>
      <Carimbo t={t} de={M.escondendo - 0.05} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 190, top: 1530}}>ESCONDIDO DE VOCÊ</Carimbo>
    </>
  );
};

// Contador de retenção: "a pasta aparece em Ns" até "Pra ver".
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.paraVer + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.paraVer + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.paraVer - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ o caminho aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- Quem não te segue: não cai na Principal, vai para Solicitações ----------

const Caixa: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.eSe - 0.15);
  if (!st) return null;
  const cel = mola(t, M.quando - 0.1, 12, 200);
  const bolha = mola(t, M.mensagem1 - 0.1, 11, 220);
  const desvia = prog(t, M.vai - 0.1, 0.6, suave);
  const naoCai = mola(t, M.naoCai - 0.1, 9, 260);
  const sol = mola(t, M.solicitacoes1 - 0.2, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quando} top={440} tamanho={46}>QUEM <span style={{color: COR.amarelo}}>NÃO TE SEGUE</span> TE MANDA MENSAGEM</Titulo>
      <div style={{opacity: cel}}>
        <TelaDirect w={520} h={640} titulo="sua.lojinha ⌄" link={<LinkAzul k={520 / 600} ativo={sol}>Solicitações (1)</LinkAzul>} conversas={AMIGOS}
          abas={<div style={{display: 'flex', gap: 20, padding: '6px 22px 14px', fontFamily: INTER, fontWeight: 800, fontSize: 26, color: '#F2F4F8'}}><span style={{borderBottom: '3px solid #F2F4F8', paddingBottom: 6}}>Principal</span><span style={{color: '#9AA3B5'}}>Geral</span></div>}
          style={{left: 280, top: 560}}>
          {naoCai > 0.01 && <div style={{position: 'absolute', left: 30, top: 128, fontSize: 50, opacity: naoCai, scale: String(interpolate(naoCai, [0, 1], [2, 1]))}}>❌</div>}
        </TelaDirect>
      </div>
      {bolha > 0.01 && (
        <div style={{position: 'absolute', left: 120 + 520 * desvia, top: 1240 - 620 * desvia, opacity: bolha * (1 - prog(t, M.solicitacoes1 + 0.1, 0.25)), scale: String((0.8 + 0.2 * bolha) * (1 - 0.6 * desvia))}}>
          <div style={{padding: '18px 26px', borderRadius: 32, background: '#3B82F6', fontFamily: INTER, fontWeight: 700, fontSize: 36, color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 20px 50px rgba(0,0,0,.5)'}}>🙋‍♀️ Tem no tamanho M?</div>
        </div>
      )}
      {sol > 0.01 && <Carimbo t={t} de={M.solicitacoes1 - 0.1} cor={COR.amarelo} tamanho={50} rot={-5} style={{left: 300, top: 1215}}>VAI PRA "SOLICITAÇÕES"</Carimbo>}
    </AbsoluteFill>
  );
};

// ---------- Parece spam → Solicitações ocultas ----------

const Spam: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eSe - 0.15, M.essa - 0.15);
  if (!st) return null;
  const cel = mola(t, M.eSe, 12, 200);
  const tag = mola(t, M.spam - 0.1, 9, 260);
  const desce = prog(t, M.escondida - 0.3, 0.6, suave);
  const nome = t >= M.ocultas1 - 0.35;
  const k = 520 / 600;
  return (
    <AbsoluteFill style={st}>
      {!nome && <Titulo t={t} de={M.eSe} top={440} tamanho={46}>SE PARECER <span style={{color: COR.vermelho}}>SPAM</span>…</Titulo>}
      <div style={{opacity: cel * (nome ? 0.35 : 1)}}>
        <TelaDirect w={520} h={640} titulo="Solicitações" voltar conversas={[]} style={{left: 280, top: 560}}
          rodape={<div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><LinkAzul k={k} ativo={desce}>🔒 Solicitações ocultas</LinkAzul></div>}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 110 + 380 * desce, opacity: 1 - 0.8 * desce, scale: String(1 - 0.4 * desce)}}>
            <LinhaConversa c={{avatar: '🙋‍♀️', nome: 'mari.compras', texto: 'Tem no tamanho M?', novo: true, destaque: tag > 0.5 ? COR.vermelho : undefined}} k={k} />
            {tag > 0.01 && <div style={{position: 'absolute', right: 20, top: 18, padding: '6px 14px', borderRadius: 10, background: COR.vermelho, fontFamily: INTER, fontWeight: 900, fontSize: 24, color: '#fff', opacity: tag, scale: String(interpolate(tag, [0, 1], [2, 1]))}}>SPAM?</div>}
          </div>
        </TelaDirect>
      </div>
      {nome && (
        <>
          <AbsoluteFill style={{background: `rgba(255,40,60,${0.3 * (1 - prog(t, M.ocultas1 - 0.3, 0.25))})`}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontSize: 150}}>🔒</div>
          <Titulo t={t} de={M.solicitacoes2 - 0.15} top={830} tamanho={88}>SOLICITAÇÕES</Titulo>
          <Titulo t={t} de={M.ocultas1 - 0.1} top={940} tamanho={88} cor={COR.vermelho}>OCULTAS</Titulo>
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Sem notificação → o cliente compra de outro ----------

const Perda: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.essa - 0.15, M.paraVer - 0.15);
  if (!st) return null;
  const sino = mola(t, M.notificacao - 0.15, 10, 240);
  const nemSabe = mola(t, M.sabendo - 0.2, 11, 220);
  const ignorou = mola(t, M.ignorou - 0.1, 11, 220);
  const outro = mola(t, M.compra - 0.2, 10, 240);
  const fase2 = t >= M.ouSeja - 0.15;
  return (
    <AbsoluteFill style={st}>
      {!fase2 ? (
        <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center', fontSize: 220, opacity: sino, scale: String(interpolate(sino, [0, 1], [1.6, 1])), rotate: `${Math.sin(t * 20) * 6 * (1 - prog(t, M.notificacao + 0.3, 0.4))}deg`}}>🔕</div>
          <Titulo t={t} de={M.notificacao - 0.15} top={820} tamanho={56}>SEM <span style={{color: COR.vermelho}}>NOTIFICAÇÃO</span></Titulo>
          {nemSabe > 0.01 && <Titulo t={t} de={M.sabendo - 0.2} top={930} tamanho={42} cor={COR.cinza}>e quem mandou nem fica sabendo</Titulo>}
        </>
      ) : (
        <>
          <div style={{position: 'absolute', left: 110, top: 560, opacity: ignorou, translate: `${(1 - ignorou) * -80}px 0px`}}>
            <div style={{padding: '22px 30px', borderRadius: 36, background: '#262D3D', fontFamily: INTER, fontWeight: 700, fontSize: 40, color: '#F2F4F8', whiteSpace: 'nowrap'}}>
              <div style={{fontSize: 24, color: '#9AA3B5', marginBottom: 4}}>🙋‍♀️ mari.compras</div>Oi?? 😕 me ignorou...
            </div>
          </div>
          {outro > 0.01 && (
            <>
              <div style={{position: 'absolute', left: 440, top: 780, fontSize: 110, opacity: outro, rotate: '25deg'}}>➡️</div>
              <div style={{position: 'absolute', left: 560, top: 880, width: 380, padding: 26, borderRadius: 30, ...caixa, textAlign: 'center', opacity: outro, scale: String(0.8 + 0.2 * outro)}}>
                <div style={{fontSize: 110}}>🏬</div>
                <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco}}>LOJA DO LADO</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 26, color: COR.verde}}>respondeu em 2 min ✓</div>
              </div>
              <Carimbo t={t} de={M.outro - 0.05} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 140, top: 1190}}>VENDA PERDIDA ✕</Carimbo>
            </>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- O caminho: Direct → Solicitações → Solicitações ocultas ----------

const Caminho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.paraVer - 0.15, M.primeira - 0.2);
  if (!st) return null;
  const passos = [
    {de: M.direct - 0.1, texto: '✈️ Direct'},
    {de: M.solicitacoes3 - 0.1, texto: 'Solicitações'},
    {de: M.ocultas2 - 0.3, texto: '🔒 Solicitações ocultas'},
  ];
  const tela = t < M.solicitacoes3 + 0.25 ? 0 : t < M.ocultas2 - 0.1 ? 1 : 2;
  const cel = mola(t, M.abre - 0.1, 12, 200);
  const k = 520 / 600;
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
      <div style={{opacity: cel}}>
        {tela === 0 && <TelaDirect w={520} h={640} titulo="sua.lojinha ⌄" link={<LinkAzul k={k} ativo={prog(t, M.toca - 0.1, 0.3)}>Solicitações (3)</LinkAzul>} conversas={AMIGOS}
          abas={<div style={{display: 'flex', gap: 20, padding: '6px 22px 14px', fontFamily: INTER, fontWeight: 800, fontSize: 26, color: '#F2F4F8'}}><span style={{borderBottom: '3px solid #F2F4F8', paddingBottom: 6}}>Principal</span><span style={{color: '#9AA3B5'}}>Geral</span></div>}
          style={{left: 280, top: 560}} />}
        {tela === 1 && <TelaDirect w={520} h={640} titulo="Solicitações" voltar conversas={[{avatar: '🤖', nome: 'promo.seguidores', texto: 'Ganhe 10 mil seguidores!'}]} style={{left: 280, top: 560}}
          rodape={<div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><LinkAzul k={k} ativo={prog(t, M.solicitacoes4 - 0.2, 0.3)}>🔒 Solicitações ocultas</LinkAzul></div>} />}
        {tela === 2 && <TelaDirect w={520} h={640} titulo="Solicitações ocultas" voltar conversas={CLIENTES.map((c) => ({...c, destaque: COR.verde}))} style={{left: 280, top: 560}} />}
      </div>
      {tela === 0 && <Toque t={t} de={M.toca - 0.4} toque={M.solicitacoes3} x={690} y={620} />}
      {tela === 1 && <Toque t={t} de={M.solicitacoes4 - 0.6} toque={M.solicitacoes4 - 0.1} x={560} y={1120} />}
      {tela === 2 && <Carimbo t={t} de={M.ocultas2 + 0.3} cor={COR.verde} tamanho={48} rot={-5} style={{left: 250, top: 1130}}>OS CLIENTES ESTAVAM AQUI</Carimbo>}
      <Fonte t={t} de={M.direct} ate={M.primeira} top={1250} veiculo="Tecnoblog" titulo="Como ver solicitações de mensagens no Instagram" />
    </AbsoluteFill>
  );
};

// ---------- Dica 1: 1× por semana + aceitar ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.2, M.segunda - 0.15);
  if (!st) return null;
  const semana = mola(t, M.semana - 0.15, 10, 240);
  const card = mola(t, M.quando2 - 0.15, 12, 200);
  const aceito = t >= M.aceita + 0.1;
  const sobe = prog(t, M.conversa - 0.1, 0.6, suave);
  const principal = mola(t, M.principal2 - 0.1, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      {semana > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', opacity: semana * (1 - 0.6 * card), scale: String(interpolate(semana, [0, 1], [1.6, 1]))}}>
          <Pilula cor={COR.amarelo} tamanho={46} fundo="rgba(40,30,5,.92)">📅 1× POR SEMANA</Pilula>
        </div>
      )}
      {card > 0.01 && (
        <div style={{position: 'absolute', left: 140, right: 140, top: 900 - 240 * sobe, padding: 26, borderRadius: 28, ...caixa, border: `3px solid ${aceito ? COR.verde : COR.ciano}66`, opacity: card}}>
          <LinhaConversa c={{avatar: '🙋‍♀️', nome: 'mari.compras', texto: 'Tem no tamanho M?', novo: !aceito}} k={1} />
          {!aceito ? (
            <div style={{display: 'flex', gap: 16, marginTop: 14}}>
              <div style={{flex: 1, padding: '16px 0', borderRadius: 16, background: 'rgba(255,255,255,.1)', textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.branco}}>Excluir</div>
              <div style={{flex: 1, padding: '16px 0', borderRadius: 16, background: COR.azul, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.branco}}>Aceitar</div>
            </div>
          ) : (
            <div style={{marginTop: 14, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.verde}}>✓ Aceita</div>
          )}
        </div>
      )}
      {card > 0.01 && !aceito && <Toque t={t} de={M.aceita - 0.4} toque={M.aceita} x={730} y={1060} />}
      {principal > 0.01 && <Carimbo t={t} de={M.principal2 - 0.1} cor={COR.verde} tamanho={52} rot={-5} style={{left: 230, top: 1080}}>FOI PRA PRINCIPAL ✓</Carimbo>}
    </AbsoluteFill>
  );
};

// ---------- Dica 2: aba Geral ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, T.b - 0.1);
  if (!st) return null;
  const abas = mola(t, M.perfil - 0.1, 12, 200);
  const geral = mola(t, M.geral - 0.15, 9, 260);
  const dias = prog(t, M.dias - 0.2, 0.8);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Titulo t={t} de={M.profissional - 0.1} top={560} tamanho={44}>PERFIL <span style={{color: COR.ciano}}>PROFISSIONAL</span>?</Titulo>
      <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', gap: 22, opacity: abas}}>
        {['Principal', 'Geral', 'Solicitações'].map((a) => {
          const g = a === 'Geral';
          return (
            <div key={a} style={{padding: '18px 28px', borderRadius: 20, background: g ? `rgba(255,214,10,${0.25 * geral})` : 'rgba(8,16,44,.95)', border: `4px solid ${g && geral > 0.5 ? COR.amarelo : 'rgba(255,255,255,.2)'}`, fontFamily: INTER, fontWeight: 800, fontSize: 38, color: COR.branco, scale: String(g ? 1 + 0.15 * geral : 1)}}>{a}</div>
          );
        })}
      </div>
      {geral > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 830, display: 'flex', justifyContent: 'center', opacity: geral}}><Pilula cor={COR.amarelo} tamanho={36} fundo="rgba(40,30,5,.92)">🔕 MENSAGEM PARADA SEM VOCÊ VER</Pilula></div>}
      {dias > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 960, display: 'flex', justifyContent: 'center', gap: 16, opacity: Math.min(1, dias * 2)}}>
          {['SEG', 'TER', 'QUA', 'QUI'].map((d, i) => (
            <div key={d} style={{width: 120, padding: '14px 0', borderRadius: 18, background: 'rgba(255,255,255,.08)', border: `3px solid ${dias > (i + 1) / 4 ? COR.vermelho : 'rgba(255,255,255,.15)'}`, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 30, color: dias > (i + 1) / 4 ? COR.vermelho : COR.cinza}}>{d}</div>
          ))}
        </div>
      )}
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Central de Ajuda do Instagram · Tecnoblog<br />Olhar Digital · guias de 2026</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Telas animadas; perfis e mensagens são exemplos.</div>
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
      <PastaTrancada t={t} />
      <Caixa t={t} />
      <Spam t={t} />
      <Perda t={t} />
      <Caminho t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <CardVoz t={t} />
      <Contador t={t} />
      <CartaoFonte t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'pop', em: 0.05, volume: 0.4},
  {som: 'pop', em: 0.23, volume: 0.4},
  {som: 'pop', em: 0.41, volume: 0.4},
  {som: 'whoosh_out', em: A0 - 0.6, volume: 0.5},
  {som: 'impacto', em: A0 - 0.15, volume: 0.65},
  {som: 'impacto', em: M.escondendo - 0.05, volume: 0.6},
  {som: 'risco', em: M.escondendo, volume: 0.4},
  // Contador
  ...passos(T.meio + 0.3, M.paraVer, Math.max(1, Math.round(M.paraVer - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.12})),
  // Caixa
  {som: 'whoosh_in', em: M.quando - 0.15, volume: 0.4},
  {som: 'ding', em: M.mensagem1 - 0.1, volume: 0.45},
  {som: 'risco', em: M.naoCai - 0.1, volume: 0.45},
  {som: 'swoosh', em: M.vai - 0.1, volume: 0.45},
  {som: 'impacto', em: M.solicitacoes1 - 0.1, volume: 0.5},
  // Spam
  {som: 'whoosh_in', em: M.eSe - 0.15, volume: 0.4},
  {som: 'impacto', em: M.spam - 0.1, volume: 0.5},
  {som: 'whoosh_out', em: M.escondida - 0.3, volume: 0.45},
  {som: 'impacto', em: M.solicitacoes2 - 0.15, volume: 0.6},
  {som: 'impacto', em: M.ocultas1 - 0.1, volume: 0.6},
  // Perda
  {som: 'pop', em: M.notificacao - 0.15, volume: 0.45},
  {som: 'pop', em: M.ignorou - 0.1, volume: 0.4},
  {som: 'swoosh', em: M.compra - 0.2, volume: 0.45},
  {som: 'risco', em: M.outro - 0.05, volume: 0.5},
  // Caminho
  {som: 'tecla', em: M.direct - 0.1, volume: 0.45},
  {som: 'toque', em: M.solicitacoes3, volume: 0.6},
  {som: 'whoosh_in', em: M.solicitacoes3 + 0.25, volume: 0.35},
  {som: 'toque', em: M.solicitacoes4 - 0.1, volume: 0.6},
  {som: 'whoosh_in', em: M.ocultas2 - 0.1, volume: 0.35},
  {som: 'ding', em: M.ocultas2 + 0.3, volume: 0.55},
  // Dica 1
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.semana - 0.15, volume: 0.4},
  {som: 'pop', em: M.quando2 - 0.15, volume: 0.35},
  {som: 'toque', em: M.aceita, volume: 0.6},
  {som: 'swoosh', em: M.conversa - 0.1, volume: 0.4},
  {som: 'ding', em: M.principal2 - 0.1, volume: 0.5},
  // Dica 2
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.perfil - 0.1, volume: 0.35},
  {som: 'ding', em: M.geral - 0.15, volume: 0.5},
  {som: 'tique', em: M.dias - 0.2, volume: 0.35},
  {som: 'tique', em: M.dias, volume: 0.35},
  {som: 'tique', em: M.dias + 0.2, volume: 0.35},
  {som: 'tique', em: M.dias + 0.4, volume: 0.35},
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
    // Até "agora" a abertura (mensagens sugadas para a pasta trancada) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.escondendo, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [M.solicitacoes2 - 0.35, M.essa - 0.15],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {escondendo: COR.vermelho, cliente: COR.verde, spam: COR.vermelho, ocultas: COR.vermelho, geral: COR.amarelo},
  eventos: EVENTOS,
  Cena,
};
