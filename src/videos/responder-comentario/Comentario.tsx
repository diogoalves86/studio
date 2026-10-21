import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 018 · Para de responder comentário assim. Você está perdendo o seu melhor vídeo.
// Abertura chamativa (comentários que freiam numa resposta em texto + alerta vermelho + carimbo "VÍDEO PERDIDO") →
// a dúvida de um é a de muitos → a resposta em texto fica escondida → o botão de responder com Reels (TechCrunch, 2021)
// → dica 1: qual comentário escolher → dica 2: resposta logo no começo → CTA (áudio e clipe do 015).

const T = TRECHOS;
const M = {
  responder1: em('responder'),
  assim1: em('assim'),
  perdendo: em('perdendo'),
  melhor: em('melhor'),
  quando: em('quando'),
  gente1: em('gente'),
  duvida: em('dúvida'),
  perguntou: em('perguntou'),
  resposta1: em('resposta'),
  texto: em('texto'),
  escondida: em('escondida'),
  abre: em('abre'),
  instagram: em('instagram'),
  botao: em('botão'),
  reels: em('reels'),
  aparece: em('aparece'),
  colado: em('colado'),
  entende: em('entende'),
  primeira: em('primeira'),
  escolhe: em('escolhe'),
  vale: em('vale'),
  pergunta2: em('pergunta', em('vale')),
  entregam: em('entregam'),
  discordou: em('discordou'),
  respeito: em('respeito'),
  segunda: em('segunda'),
  responde: em('responde', em('segunda')),
  comeco: em('começo'),
  mostra: em('mostra'),
  frase: em('frase'),
  explica: em('explica'),
  recebe: em('recebe'),
  resto: em('resto'),
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

// Linha de comentário no estilo do app. `resposta` recua e marca como resposta da loja.
const Comentario: React.FC<{nome: string; texto: React.ReactNode; avatar: string; w?: number; resposta?: boolean; destaque?: string; style?: React.CSSProperties; rodape?: React.ReactNode}> = ({nome, texto, avatar, w = 860, resposta = false, destaque, style, rodape}) => {
  const k = w / 860;
  return (
    <div style={{width: w, display: 'flex', gap: 20 * k, padding: `${22 * k}px ${26 * k}px`, borderRadius: 26 * k, background: 'rgba(14,22,48,.94)', border: `${3 * k}px solid ${destaque ?? 'rgba(255,255,255,.12)'}`, boxShadow: destaque ? `0 0 40px ${destaque}55` : '0 20px 50px rgba(0,0,0,.45)', marginLeft: resposta ? 70 * k : 0, ...style}}>
      <div style={{width: 76 * k, height: 76 * k, borderRadius: 99, flexShrink: 0, background: resposta ? 'linear-gradient(135deg, #FF8A5B, #E0407E)' : 'linear-gradient(135deg, #3A4A7A, #22305A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 * k}}>{avatar}</div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 26 * k, color: COR.cinza}}>{nome}</div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 36 * k, lineHeight: 1.2, color: COR.branco, marginTop: 4 * k}}>{texto}</div>
        <div style={{display: 'flex', gap: 28 * k, marginTop: 10 * k, fontFamily: INTER, fontWeight: 700, fontSize: 24 * k, color: COR.cinza}}>{rodape ?? <><span>2 h</span><span>Responder</span></>}</div>
      </div>
      <div style={{fontSize: 30 * k, color: COR.cinza, alignSelf: 'center'}}>♡</div>
    </div>
  );
};

const PERGUNTA = 'Vocês entregam em outra cidade?';

// ---------- Abertura: os comentários freiam, alerta vermelho, carimbo ----------

const A0 = M.responder1 - 0.05;

const Freada: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const p = interpolate(t, [0, A0 - 0.06], [0, 1], {...clamp, easing: saida});
  const y = (1 - p) * -2200;
  const tremor = Math.sin(t * 80) * 10 * prog(t, A0 - 0.1, 0.04) * (1 - prog(t, A0, 0.15));
  const outros = [['🧁', 'Que lindo!! 😍'], ['👟', 'Tem no 38?'], ['🎀', 'Amei a cor'], ['🛍️', 'Qual o valor?'], ['🌸', 'Perfeito ❤️']];
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{position: 'absolute', left: 110, top: 520 + y, display: 'flex', flexDirection: 'column', gap: 26, filter: `blur(${(1 - p) * 12}px)`}}>
        {outros.map(([a, txt]) => <Comentario key={txt} nome="cliente" avatar={a} texto={txt} />)}
        <Comentario nome="mari.compras" avatar="🙋‍♀️" texto={PERGUNTA} />
        <Comentario nome="sua.lojinha" avatar="🏪" texto="Entregamos sim! 😊" resposta w={790} />
      </div>
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, A0 - 0.1, 0.05) * (1 - prog(t, A0 - 0.05, 0.2))})`}} />
    </AbsoluteFill>
  );
};

// Alerta vermelho em volta da tela enquanto ela fala o gancho.
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>⛔</span> <span style={{color: COR.vermelho}}>PARA</span> DE RESPONDER<br />COMENTÁRIO <span style={{color: COR.vermelho}}>ASSIM</span>
          </div>
        </div>
      </div>
    </>
  );
};

// No "assim", a resposta em texto aparece no peito dela com um ✕; em "perdendo", o carimbo.
const RespostaErrada: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.assim1 - 0.2 || t >= T.meio + 0.1) return null;
  const e = mola(t, M.assim1 - 0.15, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  const x = mola(t, M.assim1 + 0.1, 9, 260);
  return (
    <>
      <div style={{position: 'absolute', left: 150, top: 1250, opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{position: 'relative'}}>
          <Comentario nome="sua.lojinha" avatar="🏪" texto="Entregamos sim! 😊" w={640} destaque={COR.vermelho} rodape={<span>só texto</span>} />
          {x > 0.01 && <div style={{position: 'absolute', right: -40, top: -50, fontSize: 130, opacity: x, scale: String(interpolate(x, [0, 1], [2.2, 1]))}}>❌</div>}
        </div>
      </div>
      <Carimbo t={t} de={M.perdendo} cor={COR.vermelho} tamanho={64} rot={-8} style={{left: 200, top: 1450}}>VÍDEO PERDIDO ✕</Carimbo>
    </>
  );
};

// Contador de retenção: "a solução aparece em Ns" do começo do meio até "botão".
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.botao + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.botao + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.botao - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1490, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ a solução aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- A dúvida de um é a de muitos ----------

const Duvida: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.resposta1 - 0.15);
  if (!st) return null;
  const um = mola(t, M.quando, 12, 200);
  const rostos = ['🙂', '😐', '🤔', '🙂', '😶', '🤔', '😐', '🙂', '😶', '🤔', '🙂', '😐'];
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 110, top: 470, opacity: um, scale: String(0.85 + 0.15 * um)}}>
        <Comentario nome="mari.compras · perguntou" avatar="🙋‍♀️" texto={PERGUNTA} destaque={COR.ciano} />
      </div>
      <div style={{position: 'absolute', left: 130, right: 130, top: 740, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, justifyItems: 'center'}}>
        {rostos.map((r, i) => {
          const e = mola(t, M.gente1 - 0.1 + i * 0.07, 11, 230);
          const q = mola(t, M.duvida - 0.1 + (i % 4) * 0.05, 10, 240);
          return (
            <div key={i} style={{position: 'relative', width: 150, height: 150, borderRadius: 99, background: 'rgba(30,42,80,.9)', border: '3px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 84, opacity: e, scale: String(0.5 + 0.5 * e)}}>
              {r}
              {q > 0.01 && <div style={{position: 'absolute', right: -6, top: -14, fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.amarelo, opacity: q, scale: String(0.5 + 0.5 * q)}}>?</div>}
            </div>
          );
        })}
      </div>
      <Titulo t={t} de={M.perguntou - 0.1} top={1250} tamanho={44}>1 PERGUNTOU · <span style={{color: COR.amarelo}}>MUITOS FICARAM COM A DÚVIDA</span></Titulo>
    </AbsoluteFill>
  );
};

// ---------- A resposta em texto fica escondida ----------

const Escondida: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.resposta1 - 0.15, M.instagram - 0.15);
  if (!st) return null;
  const fecha = prog(t, M.escondida - 0.05, 0.5, suave);
  const ver = mola(t, M.escondida + 0.3, 11, 220);
  const so = mola(t, M.abre - 0.2, 12, 210);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.resposta1} top={440} tamanho={56}>RESPOSTA EM <span style={{color: COR.amarelo}}>TEXTO</span></Titulo>
      <div style={{position: 'absolute', left: 260, top: 540, width: 560, height: 660, borderRadius: 46, border: '10px solid #1B2238', background: '#0B1122', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
        <div style={{height: 330, background: 'linear-gradient(165deg, #FFB37A, #E0607E 55%, #7A3E9A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 150}}>🛍️</div>
        <div style={{padding: 22, fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.branco}}>♡ 💬 ➤ <span style={{float: 'right'}}>⌑</span></div>
        <div style={{position: 'relative', height: 260, overflow: 'hidden'}}>
          <div style={{opacity: 1 - fecha, translate: `0px ${fecha * 80}px`, display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px'}}>
            <Comentario nome="mari.compras" avatar="🙋‍♀️" texto={PERGUNTA} w={510} />
            <Comentario nome="sua.lojinha" avatar="🏪" texto="Entregamos sim! 😊" w={460} resposta />
          </div>
          {ver > 0.01 && <div style={{position: 'absolute', left: 26, top: 20, opacity: ver, fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza}}>Ver todos os 48 comentários</div>}
        </div>
      </div>
      {ver > 0.01 && <Carimbo t={t} de={M.escondida + 0.3} cor={COR.amarelo} tamanho={50} rot={-6} style={{left: 540, top: 1080}}>ESCONDIDA 🙈</Carimbo>}
      {so > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1230, display: 'flex', justifyContent: 'center', opacity: so}}><Pilula cor={COR.amarelo} tamanho={34} fundo="rgba(40,30,5,.92)">SÓ VÊ QUEM ABRE OS COMENTÁRIOS</Pilula></div>}
    </AbsoluteFill>
  );
};

// ---------- O botão: responder com Reels ----------

const Botao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.instagram - 0.15, M.primeira - 0.25);
  if (!st) return null;
  const linha = mola(t, M.instagram, 12, 200);
  const cam = mola(t, M.reels - 0.25, 9, 260);
  const brilho = 0.5 + 0.5 * Math.abs(Math.sin(t * 6));
  const reels = mola(t, M.aparece - 0.2, 12, 200);
  const sticker = mola(t, M.colado - 0.05, 9, 250);
  const mostraReels = t >= M.aparece - 0.25;
  return (
    <AbsoluteFill style={st}>
      {!mostraReels ? (
        <>
          <Titulo t={t} de={M.botao - 0.1} top={440} tamanho={56}>RESPONDER COM <span style={{color: COR.ciano}}>REELS</span></Titulo>
          <div style={{position: 'absolute', left: 110, top: 640, opacity: linha}}>
            <Comentario nome="mari.compras" avatar="🙋‍♀️" texto={PERGUNTA} rodape={<><span>2 h</span><span style={{color: cam > 0.01 ? COR.ciano : COR.cinza}}>Responder</span></>} />
          </div>
          {cam > 0.01 && (
            <div style={{position: 'absolute', left: 0, right: 0, top: 900, display: 'flex', justifyContent: 'center', opacity: cam, scale: String(interpolate(cam, [0, 1], [1.8, 1]))}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '22px 36px', borderRadius: 30, background: 'rgba(8,16,44,.95)', border: `4px solid ${COR.ciano}`, boxShadow: `0 0 ${50 * brilho}px rgba(62,198,255,.7)`}}>
                <span style={{fontSize: 80}}>🎥</span>
                <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>Responder com Reels</span>
              </div>
            </div>
          )}
          <Toque t={t} de={M.reels - 0.6} toque={M.reels - 0.25} x={860} y={990} />
        </>
      ) : (
        <>
          <Titulo t={t} de={M.aparece - 0.2} top={450} tamanho={42}>O COMENTÁRIO VAI <span style={{color: COR.ciano}}>COLADO NO VÍDEO</span></Titulo>
          <div style={{position: 'absolute', left: 330, top: 540, width: 420, height: 680, borderRadius: 40, overflow: 'hidden', border: '8px solid #1B2238', background: 'linear-gradient(170deg, #2F7BFF, #7A3E9A 60%, #E0607E)', opacity: reels, scale: String(0.85 + 0.15 * reels), boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', fontSize: 170}}>📦</div>
            <div style={{position: 'absolute', right: 18, bottom: 40, display: 'flex', flexDirection: 'column', gap: 18, fontSize: 40}}>♡<span>💬</span><span>➤</span></div>
            {sticker > 0.01 && (
              <div style={{position: 'absolute', left: 24, right: 24, top: 70, padding: '16px 18px', borderRadius: 20, background: '#FFFFFF', boxShadow: '0 10px 30px rgba(0,0,0,.35)', opacity: Math.min(1, sticker * 1.5), scale: String(interpolate(sticker, [0, 1], [1.8, 1])), rotate: `${-3 + (1 - sticker) * 8}deg`}}>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 18, color: '#6A7290'}}>Respondendo a mari.compras</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, lineHeight: 1.15, color: '#111'}}>{PERGUNTA}</div>
              </div>
            )}
          </div>
          {sticker > 0.01 && <Carimbo t={t} de={M.entende - 0.1} cor={COR.verde} tamanho={44} rot={-5} style={{left: 560, top: 1110}}>JÁ ENTENDE ✓</Carimbo>}
        </>
      )}
      <Fonte t={t} de={M.botao} ate={M.primeira} top={1240} veiculo="TechCrunch" titulo="Instagram agora deixa responder comentários com Reels (2021)" />
    </AbsoluteFill>
  );
};

// ---------- Dica 1: qual comentário escolher ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.25, M.segunda - 0.15);
  if (!st) return null;
  const itens: {de: number; nome: string; avatar: string; texto: string; ok: boolean}[] = [
    {de: M.vale - 0.1, nome: 'cliente', avatar: '🌸', texto: 'Lindo! ❤️', ok: false},
    {de: M.pergunta2 - 0.1, nome: 'mari.compras', avatar: '🙋‍♀️', texto: PERGUNTA, ok: true},
    {de: M.discordou - 0.1, nome: 'ju.empreende', avatar: '🧐', texto: 'Discordo: preço baixo não vende sozinho.', ok: true},
  ];
  const exemplo = mola(t, M.vale - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <Titulo t={t} de={M.escolhe - 0.1} top={570} tamanho={40}>ESCOLHE O COMENTÁRIO <span style={{color: COR.ciano}}>QUE VALE UM VÍDEO</span></Titulo>
      <div style={{position: 'absolute', left: 90, top: 700, display: 'flex', flexDirection: 'column', gap: 22}}>
        {itens.map((c) => {
          const e = mola(t, c.de, 12, 210);
          const marca = mola(t, c.de + 0.35, 9, 260);
          return (
            <div key={c.texto} style={{position: 'relative', opacity: e * (c.ok ? 1 : 1 - 0.45 * marca), translate: `${(1 - e) * 120}px 0px`}}>
              <Comentario nome={c.nome} avatar={c.avatar} texto={c.texto} w={800} destaque={marca > 0.5 ? (c.ok ? COR.verde : COR.vermelho) : undefined} />
              {marca > 0.01 && <div style={{position: 'absolute', right: -40, top: 18, fontSize: 80, opacity: marca, scale: String(interpolate(marca, [0, 1], [2, 1]))}}>{c.ok ? '✅' : '❌'}</div>}
            </div>
          );
        })}
      </div>
      {exemplo > 0.01 && <div style={{position: 'absolute', left: 90, top: 1250, opacity: exemplo, fontFamily: INTER, fontWeight: 700, fontSize: 26, color: COR.amarelo}}>comentários de exemplo</div>}
    </AbsoluteFill>
  );
};

// ---------- Dica 2: a resposta logo no começo ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, T.b - 0.1);
  if (!st) return null;
  const passos = [
    {de: M.mostra - 0.1, icone: '💬', titulo: 'O COMENTÁRIO', tempo: '0 s', cor: COR.ciano},
    {de: M.frase - 0.2, icone: '⚡', titulo: 'A RESPOSTA EM 1 FRASE', tempo: '1 s', cor: COR.verde},
    {de: M.explica - 0.2, icone: '📖', titulo: 'DEPOIS, A EXPLICAÇÃO', tempo: '3 s', cor: COR.branco},
  ];
  const fim = mola(t, M.recebe - 0.1, 9, 250);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <Titulo t={t} de={M.responde} top={560} tamanho={50}>RESPONDE <span style={{color: COR.verde}}>LOGO NO COMEÇO</span></Titulo>
      <div style={{position: 'absolute', left: 150, top: 700, display: 'flex', flexDirection: 'column', gap: 26}}>
        {passos.map((p, i) => {
          const e = mola(t, p.de, 12, 210);
          return (
            <div key={p.titulo} style={{display: 'flex', alignItems: 'center', gap: 24, opacity: e, translate: `${(1 - e) * -120}px 0px`}}>
              <div style={{width: 92, fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.cinza, textAlign: 'right'}}>{p.tempo}</div>
              <div style={{width: 18, height: 18, borderRadius: 99, background: p.cor, boxShadow: `0 0 20px ${p.cor}`}} />
              <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 26px', borderRadius: 24, ...caixa, border: `3px solid ${p.cor}66`}}>
                <span style={{fontSize: 56}}>{p.icone}</span>
                <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 38, color: i === 1 ? COR.verde : COR.branco}}>{p.titulo}</span>
              </div>
            </div>
          );
        })}
      </div>
      {fim > 0.01 && <Carimbo t={t} de={M.recebe - 0.1} cor={COR.verde} tamanho={48} rot={-5} style={{left: 240, top: 1120}}>RESPOSTA NA HORA ✓</Carimbo>}
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco}}>TechCrunch · Instagram, dez/2021</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Os comentários são exemplos.</div>
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
      <Freada t={t} />
      <Alerta t={t} />
      <RespostaErrada t={t} />
      <Duvida t={t} />
      <Escondida t={t} />
      <Botao t={t} />
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
  // Abertura: freada, alerta, resposta errada, carimbo
  {som: 'swoosh', em: 0, volume: 0.6},
  {som: 'impacto', em: A0 - 0.1, volume: 0.65},
  {som: 'tique', em: 0.1, volume: 0.35},
  {som: 'pop', em: M.assim1 - 0.15, volume: 0.45},
  {som: 'risco', em: M.assim1 + 0.1, volume: 0.5},
  {som: 'impacto', em: M.perdendo, volume: 0.6},
  // Contador
  ...passos(T.meio + 0.3, M.botao, Math.max(1, Math.round(M.botao - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.18})),
  // A dúvida
  {som: 'whoosh_in', em: M.quando - 0.15, volume: 0.4},
  {som: 'pop', em: M.gente1 - 0.1, volume: 0.35},
  {som: 'ding', em: M.duvida - 0.1, volume: 0.4},
  // Escondida
  {som: 'whoosh_in', em: M.resposta1 - 0.15, volume: 0.4},
  {som: 'whoosh_out', em: M.escondida - 0.05, volume: 0.45},
  {som: 'impacto', em: M.escondida + 0.3, volume: 0.45},
  {som: 'pop', em: M.abre - 0.2, volume: 0.35},
  // O botão
  {som: 'impacto', em: M.botao - 0.1, volume: 0.55},
  {som: 'toque', em: M.reels - 0.25, volume: 0.6},
  {som: 'ding', em: M.reels - 0.2, volume: 0.5},
  {som: 'whoosh_in', em: M.aparece - 0.2, volume: 0.45},
  {som: 'pop', em: M.colado - 0.05, volume: 0.5},
  {som: 'ding', em: M.entende - 0.1, volume: 0.45},
  // Dica 1
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.vale - 0.1, volume: 0.35},
  {som: 'risco', em: M.vale + 0.25, volume: 0.4},
  {som: 'pop', em: M.pergunta2 - 0.1, volume: 0.35},
  {som: 'ding', em: M.pergunta2 + 0.25, volume: 0.45},
  {som: 'pop', em: M.discordou - 0.1, volume: 0.35},
  {som: 'ding', em: M.discordou + 0.25, volume: 0.45},
  // Dica 2
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.mostra - 0.1, volume: 0.35},
  {som: 'pop', em: M.frase - 0.2, volume: 0.4},
  {som: 'pop', em: M.explica - 0.2, volume: 0.35},
  {som: 'ding', em: M.recebe - 0.1, volume: 0.5},
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
    // O clipe costuma congelar no começo: até "responder" os comentários freando cobrem a Luísa.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.perdendo, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    // O fim do clipe A (depois de "vídeo") fica artificial: sai um pouco antes do meio.
    {de: T.meio - 0.2, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {para: COR.vermelho, assim: COR.vermelho, perdendo: COR.vermelho, reels: COR.ciano},
  eventos: EVENTOS,
  Cena,
};
