import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 019 · Esse erro faz o Instagram trocar o seu post pelo de outra pessoa.
// Abertura chamativa (feed que freia no seu post + alerta vermelho + post trocado) → o erro: repostar → como gente nova
// te acha (recomendação em ondas) → dois posts iguais: só o original é recomendado → Mosseri: quem cria do zero merece
// mais crédito → vale para Reels, foto e carrossel (abr/2026) → dica 1: grava a sua versão → dica 2: muda de verdade → CTA.

const T = TRECHOS;
const M = {
  faz: em('faz'),
  trocar: em('trocar'),
  oSeu: em('o', em('trocar')),
  erro2: em('erro', T.meio - 0.1),
  repostar: em('repostar'),
  conteudo: em('conteúdo'),
  quem1: em('quem'),
  explorar: em('explorar'),
  reels1: em('reels'),
  mostra1: em('mostra'),
  pouca: em('pouca'),
  gostar: em('gostar'),
  maisGente: em('mais', em('gostar')),
  soQue: em('só', em('gente', em('mais', em('gostar')))),
  quando: em('quando'),
  dois: em('dois'),
  iguais: em('iguais'),
  recomenda: em('recomenda'),
  original: em('original'),
  alcance: em('alcance'),
  voce: em('você', em('alcance')),
  chefe: em('chefe'),
  motivo: em('motivo'),
  quem3: em('quem', em('motivo')),
  reposta: em('reposta'),
  isso: em('isso'),
  reels2: em('reels', em('isso')),
  abril: em('abril'),
  foto: em('foto'),
  carrossel: em('carrossel'),
  ouSeja: em('ou', em('carrossel')),
  atrair: em('atrair'),
  seu3: em('seu', em('ser')),
  entao3: em('então', em('seu', em('ser')) - 0.01),
  primeira: em('primeira'),
  ideia: em('ideia'),
  grava: em('grava'),
  mesmo: em('mesmo'),
  exemplo: em('exemplo'),
  jeito: em('jeito'),
  segunda: em('segunda'),
  usar: em('usar'),
  muda: em('muda'),
  narracao: em('narração'),
  comentario: em('comentário'),
  marca: em('marca'),
  coisa: em('coisa'),
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

// Card de post no estilo do feed. `conteudo` é o miolo (emoji + texto curto).
const Post: React.FC<{w: number; perfil: string; avatar: string; conteudo: React.ReactNode; fundo?: string; etiqueta?: React.ReactNode; destaque?: string; style?: React.CSSProperties}> = ({w, perfil, avatar, conteudo, fundo = 'linear-gradient(165deg, #FFB37A, #E0607E 55%, #7A3E9A)', etiqueta, destaque, style}) => {
  const k = w / 500;
  return (
    <div style={{width: w, borderRadius: 28 * k, overflow: 'hidden', background: '#0B1122', border: `${4 * k}px solid ${destaque ?? 'rgba(255,255,255,.15)'}`, boxShadow: destaque ? `0 0 50px ${destaque}66` : '0 30px 80px rgba(0,0,0,.55)', ...style}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14 * k, padding: `${16 * k}px ${18 * k}px`}}>
        <div style={{width: 54 * k, height: 54 * k, borderRadius: 99, background: 'linear-gradient(135deg, #FF8A5B, #E0407E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 * k}}>{avatar}</div>
        <div style={{flex: 1, fontFamily: INTER, fontWeight: 700, fontSize: 26 * k, color: COR.branco}}>{perfil}</div>
        {etiqueta}
      </div>
      <div style={{height: w * 1.05, background: fundo, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 30 * k, fontFamily: MONT, fontWeight: 900, fontSize: 46 * k, lineHeight: 1.1, color: '#1A1020'}}>{conteudo}</div>
      <div style={{padding: `${14 * k}px ${18 * k}px`, fontFamily: INTER, fontWeight: 700, fontSize: 26 * k, color: COR.branco}}>♡ 💬 ➤</div>
    </div>
  );
};

const VITRINE = <><div style={{fontSize: 130}}>🛍️</div>3 TRUQUES DE VITRINE</>;

// ---------- Abertura: o feed freia no seu post, alerta vermelho, post trocado ----------

const A0 = M.faz - 0.05;

const Freada: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const p = interpolate(t, [0, A0 - 0.06], [0, 1], {...clamp, easing: saida});
  const y = (1 - p) * -2600;
  const tremor = Math.sin(t * 80) * 10 * prog(t, A0 - 0.1, 0.04) * (1 - prog(t, A0, 0.15));
  const outros = ['🍩', '👟', '🎀', '🌸'];
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{position: 'absolute', left: 240, top: 420 + y, display: 'flex', flexDirection: 'column', gap: 40, filter: `blur(${(1 - p) * 12}px)`}}>
        {outros.map((e) => <Post key={e} w={600} perfil="perfil" avatar={e} conteudo={<div style={{fontSize: 160}}>{e}</div>} fundo="linear-gradient(165deg, #3A2E5C, #1A1430)" />)}
        <Post w={600} perfil="sua.lojinha" avatar="🏪" conteudo={VITRINE} />
      </div>
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, A0 - 0.1, 0.05) * (1 - prog(t, A0 - 0.05, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>⚠️</span> O INSTAGRAM <span style={{color: COR.vermelho}}>TROCA</span><br />O SEU POST PELO DE OUTRO
          </div>
        </div>
      </div>
    </>
  );
};

// Em "trocar" o clipe fica artificial (1,25–1,79 s): o post vira como carta em tela cheia e volta como o do dono.
const I0 = M.trocar - 0.02;
const I1 = M.oSeu;

const TrocaCheia: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < I0 - 0.02 || t >= I1) return null;
  const e = mola(t, I0, 11, 240);
  const giro = prog(t, I0 + 0.05, 0.3, suave);
  const trocado = giro >= 0.5;
  const tremor = Math.sin(t * 70) * 8 * prog(t, I0 + 0.35, 0.04) * (1 - prog(t, I0 + 0.4, 0.15));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2A0A14, #05091A 70%)', justifyContent: 'center', alignItems: 'center', translate: `${tremor}px 0px`}}>
      <div style={{marginTop: -60, opacity: Math.min(1, e * 1.4), transform: `perspective(1400px) rotateY(${giro * 180 + (trocado ? 180 : 0)}deg)`}}>
        <Post w={560} perfil={trocado ? '@criador.original' : 'sua.lojinha'} avatar={trocado ? '🎥' : '🏪'} conteudo={VITRINE} destaque={trocado ? COR.vermelho : undefined} />
      </div>
      <Carimbo t={t} de={I0 + 0.35} cor={COR.vermelho} tamanho={72} rot={-8} style={{left: 290, top: 1200}}>TROCADO ✕</Carimbo>
    </AbsoluteFill>
  );
};

// No peito dela, depois da troca: o post já é o do dono.
const PostTrocado: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < I1 || t >= T.meio + 0.1) return null;
  const e = mola(t, I1, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  const trocado = true;
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1330, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 26px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${trocado ? COR.vermelho : 'rgba(255,255,255,.18)'}`}}>
            <div style={{width: 70, height: 70, borderRadius: 99, background: 'linear-gradient(135deg, #FF8A5B, #E0407E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40}}>{trocado ? '🎥' : '🏪'}</div>
            <div>
              <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco}}>{trocado ? '@criador.original' : 'sua.lojinha'}</div>
              <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 24, color: COR.cinza}}>🛍️ 3 truques de vitrine</div>
            </div>
          </div>
        </div>
      </div>
      <Carimbo t={t} de={I1 + 0.05} cor={COR.vermelho} tamanho={64} rot={-8} style={{left: 290, top: 1520}}>TROCADO ✕</Carimbo>
    </>
  );
};

// Contador de retenção: "o motivo aparece em Ns" do começo do meio até o Mosseri.
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.chefe + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.chefe + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.chefe - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ o motivo aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- O erro: repostar ----------

const OErro: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.quem1 - 0.15);
  if (!st) return null;
  const icone = mola(t, M.repostar - 0.1, 10, 230);
  const giro = (t - M.repostar) * 200;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center'}}>
        <Carimbo t={t} de={M.erro2} cor={COR.vermelho} tamanho={72} rot={-4} style={{position: 'relative'}}>⚠️ O ERRO</Carimbo>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontSize: 260, opacity: icone, scale: String(0.5 + 0.5 * icone), rotate: `${t > M.repostar ? Math.min(giro, 360) : 0}deg`}}>🔁</div>
      <Titulo t={t} de={M.repostar} top={980} tamanho={68}>REPOSTAR</Titulo>
      <Titulo t={t} de={M.conteudo - 0.05} top={1070} tamanho={44} cor={COR.amarelo}>CONTEÚDO DOS OUTROS</Titulo>
    </AbsoluteFill>
  );
};

// ---------- Como gente nova te acha: recomendação em ondas ----------

const Recomendacao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.quem1 - 0.15, M.soQue - 0.15);
  if (!st) return null;
  const ondas = t >= M.mostra1 - 0.2;
  const celular = mola(t, M.quem1, 12, 200);
  const exp = mola(t, M.explorar - 0.1, 10, 240);
  const reels = mola(t, M.reels1 - 0.1, 10, 240);
  const centro = mola(t, M.mostra1 - 0.1, 12, 200);
  const aneis = [
    {de: M.pouca - 0.1, r: 190, n: 5, cor: COR.ciano},
    {de: M.gostar + 0.5, r: 290, n: 9, cor: COR.azul},
    {de: M.maisGente - 0.1, r: 390, n: 13, cor: COR.verde},
  ];
  const coracao = mola(t, M.gostar - 0.1, 9, 260);
  return (
    <AbsoluteFill style={st}>
      {!ondas ? (
        <>
          <Titulo t={t} de={M.quem1} top={440} tamanho={50}>QUEM <span style={{color: COR.amarelo}}>NÃO TE SEGUE</span> TE ACHA AQUI</Titulo>
          <div style={{position: 'absolute', left: 300, top: 560, width: 480, height: 640, borderRadius: 46, border: '10px solid #1B2238', background: '#0B1122', overflow: 'hidden', opacity: celular, scale: String(0.85 + 0.15 * celular), boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: 6}}>
              {['🍰', '🎨', '🐶', '🏖️', '🎸', '🌮', '👗', '🚲', '📚'].map((e) => <div key={e} style={{height: 140, borderRadius: 10, background: 'linear-gradient(165deg, #3A2E5C, #1A1430)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70}}>{e}</div>)}
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, background: '#0E1630', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: 40, color: COR.cinza}}>
              <span>⌂</span>
              <span style={{color: exp > 0.5 ? COR.ciano : COR.cinza, scale: String(1 + 0.4 * exp * (1 - prog(t, M.explorar + 0.5, 0.3)))}}>🔍</span>
              <span style={{color: reels > 0.5 ? COR.ciano : COR.cinza, scale: String(1 + 0.4 * reels * (1 - prog(t, M.reels1 + 0.5, 0.3)))}}>🎬</span>
              <span>👤</span>
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 1225, display: 'flex', justifyContent: 'center', gap: 20}}>
            {exp > 0.01 && <div style={{opacity: exp, scale: String(interpolate(exp, [0, 1], [1.6, 1]))}}><Pilula cor={COR.ciano} tamanho={36}>🔍 EXPLORAR</Pilula></div>}
            {reels > 0.01 && <div style={{opacity: reels, scale: String(interpolate(reels, [0, 1], [1.6, 1]))}}><Pilula cor={COR.ciano} tamanho={36}>🎬 REELS</Pilula></div>}
          </div>
        </>
      ) : (
        <>
          <Titulo t={t} de={M.mostra1 - 0.2} top={440} tamanho={50}>PRIMEIRO POUCA GENTE…<br /><span style={{color: COR.verde}}>SE GOSTAR, MAIS GENTE</span></Titulo>
          <div style={{position: 'absolute', left: 540, top: 890}}>
            {aneis.map((a, i) => {
              const e = mola(t, a.de, 11, 200);
              if (e <= 0.01) return null;
              return (
                <div key={i}>
                  <div style={{position: 'absolute', left: -a.r * e, top: -a.r * e * 0.75, width: 2 * a.r * e, height: 1.5 * a.r * e, borderRadius: 999, border: `4px dashed ${a.cor}`, opacity: 0.8}} />
                  {Array.from({length: a.n}, (_, j) => {
                    const ang = (j / a.n) * Math.PI * 2 + i * 0.4;
                    return <div key={j} style={{position: 'absolute', left: Math.cos(ang) * a.r * e - 26, top: Math.sin(ang) * a.r * e * 0.75 - 26, width: 52, height: 52, borderRadius: 99, background: 'rgba(30,42,80,.95)', border: `3px solid ${a.cor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, opacity: e}}>🙂</div>;
                  })}
                </div>
              );
            })}
            <div style={{position: 'absolute', left: -110, top: -130, opacity: centro, scale: String(0.6 + 0.4 * centro)}}>
              <Post w={220} perfil="você" avatar="🏪" conteudo={<div style={{fontSize: 90}}>🛍️</div>} />
            </div>
            {coracao > 0.01 && <div style={{position: 'absolute', left: 120, top: -230, fontSize: 110, opacity: coracao * (1 - prog(t, M.gostar + 0.9, 0.3)), scale: String(interpolate(coracao, [0, 1], [2, 1]))}}>❤️</div>}
          </div>
        </>
      )}
      <Fonte t={t} de={M.mostra1} ate={M.soQue} top={1250} veiculo="Instagram para criadores" titulo="Ajudando criadores de todos os tamanhos" />
    </AbsoluteFill>
  );
};

// ---------- Dois posts iguais: só o original é recomendado ----------

const Iguais: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.soQue - 0.15, M.chefe - 0.15);
  if (!st) return null;
  const dois = mola(t, M.dois - 0.1, 12, 200);
  const igual = mola(t, M.iguais - 0.1, 10, 240);
  const orig = mola(t, M.original - 0.1, 10, 240);
  const some = prog(t, M.original + 0.2, 0.5);
  const alcance = mola(t, M.alcance - 0.1, 11, 200);
  const voce = mola(t, M.voce - 0.1, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.quando - 0.1} top={440} tamanho={52}>DOIS POSTS <span style={{color: COR.amarelo}}>IGUAIS</span></Titulo>
      {alcance > 0.01 && [1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 280 - 150 * i * alcance, top: 840 - 150 * i * alcance, width: 2 * 150 * i * alcance, height: 2 * 150 * i * alcance, borderRadius: 999, border: `4px dashed ${COR.verde}`, opacity: 0.7 * alcance}} />
      ))}
      <div style={{position: 'absolute', left: 100, top: 590, opacity: dois, translate: `${(1 - dois) * -100}px 0px`}}>
        <Post w={360} perfil="@criador.original" avatar="🎥" conteudo={VITRINE} destaque={orig > 0.5 ? COR.verde : undefined} />
        {orig > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: -50, display: 'flex', justifyContent: 'center', opacity: orig, scale: String(interpolate(orig, [0, 1], [1.8, 1]))}}><Pilula cor={COR.verde} tamanho={34} fundo="rgba(5,40,20,.92)">ORIGINAL ✓</Pilula></div>}
      </div>
      <div style={{position: 'absolute', left: 620, top: 590, opacity: dois * (1 - 0.6 * some), translate: `${(1 - dois) * 100}px 0px`, filter: `grayscale(${some})`}}>
        <Post w={360} perfil="sua.lojinha" avatar="🏪" conteudo={VITRINE} etiqueta={<span style={{fontSize: 26}}>🔁</span>} />
        {voce > 0.01 && <div style={{position: 'absolute', left: 120, top: 180, fontSize: 140, opacity: voce, scale: String(interpolate(voce, [0, 1], [2.2, 1]))}}>❌</div>}
      </div>
      {igual > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 120, color: COR.amarelo, opacity: igual * (1 - orig), scale: String(0.5 + 0.5 * igual)}}>=</div>}
      {alcance > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1160, display: 'flex', justifyContent: 'center', opacity: alcance}}><Pilula cor={COR.verde} tamanho={34} fundo="rgba(5,40,20,.92)">O ALCANCE NOVO VAI PRO DONO</Pilula></div>}
      <Fonte t={t} de={M.recomenda} ate={M.chefe} top={1250} veiculo="Social Media Today" titulo="Instagram prioriza criadores originais (2024)" />
    </AbsoluteFill>
  );
};

// ---------- Mosseri: quem cria do zero merece mais crédito ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.chefe - 0.15, M.isso - 0.15);
  if (!st) return null;
  const card = mola(t, M.chefe - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 470, display: 'flex', alignItems: 'center', gap: 26, padding: 22, borderRadius: 30, ...caixa, opacity: card, translate: `0px ${(1 - card) * 40}px`}}>
        <Img src={ARQ.mosseri} style={{width: 150, height: 150, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', border: `4px solid ${COR.ciano}`}} />
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>Adam Mosseri</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.ciano}}>chefe do Instagram</div>
          <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 500, fontSize: 18, color: COR.cinza}}>Foto: Anthony Quintano · CC BY 2.0</div>
        </div>
      </div>
      <Titulo t={t} de={M.motivo - 0.1} top={730} tamanho={44} cor={COR.amarelo}>O MOTIVO:</Titulo>
      <Titulo t={t} de={M.quem3 - 0.1} top={810} tamanho={60}>"QUEM CRIA <span style={{color: COR.verde}}>DO ZERO</span><br />MERECE <span style={{color: COR.verde}}>MAIS CRÉDITO</span>"</Titulo>
      <Titulo t={t} de={M.reposta - 0.1} top={1010} tamanho={42} cor={COR.cinza}>do que quem só reposta</Titulo>
      <Fonte t={t} de={M.quem3} ate={M.isso} top={1250} veiculo="Tubefilter" titulo="Mosseri: originalidade conta no ranking (2022)" />
    </AbsoluteFill>
  );
};

// ---------- Agora vale para tudo: Reels, foto e carrossel ----------

const Formatos: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.isso - 0.15, M.entao3 - 0.2);
  if (!st) return null;
  const itens = [
    {de: M.reels2 - 0.1, icone: '🎬', nome: 'REELS', cor: COR.cinza},
    {de: M.foto - 0.1, icone: '🖼️', nome: 'FOTO', cor: COR.ciano},
    {de: M.carrossel - 0.1, icone: '🗂️', nome: 'CARROSSEL', cor: COR.ciano},
  ];
  const abril = mola(t, M.abril - 0.1, 10, 240);
  const final = t >= M.ouSeja - 0.15;
  return (
    <AbsoluteFill style={st}>
      {!final ? (
        <>
          <Titulo t={t} de={M.isso} top={440} tamanho={52}>A TROCA VALE PARA:</Titulo>
          <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center', gap: 34}}>
            {itens.map((c) => {
              const e = mola(t, c.de, 11, 230);
              return (
                <div key={c.nome} style={{width: 270, padding: '30px 0', borderRadius: 30, ...caixa, border: `4px solid ${c.cor}88`, textAlign: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.5, 1]))}}>
                  <div style={{fontSize: 110}}>{c.icone}</div>
                  <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: COR.branco, marginTop: 10}}>{c.nome}</div>
                  <div style={{fontSize: 56, marginTop: 6}}>✅</div>
                </div>
              );
            })}
          </div>
          {abril > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1030, display: 'flex', justifyContent: 'center', opacity: abril, scale: String(interpolate(abril, [0, 1], [1.8, 1])), rotate: '-3deg'}}><Pilula cor={COR.amarelo} tamanho={34} fundo="rgba(40,30,5,.92)">🆕 FOTO E CARROSSEL DESDE ABRIL/2026</Pilula></div>}
          <Fonte t={t} de={M.abril} ate={M.ouSeja} top={1250} veiculo="TechCrunch" titulo="Instagram limita alcance de contas que repostam (2026)" />
        </>
      ) : (
        <>
          <Titulo t={t} de={M.atrair - 0.1} top={560} tamanho={56}>PRA ATRAIR <span style={{color: COR.verde}}>GENTE NOVA</span></Titulo>
          <div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center'}}>
            <Carimbo t={t} de={M.seu3 - 0.15} cor={COR.verde} tamanho={78} rot={-5} style={{position: 'relative'}}>O POST TEM QUE SER SEU ✓</Carimbo>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Dica 1: grava a sua versão ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.entao3 - 0.2, M.segunda - 0.15);
  if (!st) return null;
  const dele = mola(t, M.ideia - 0.15, 12, 200);
  const sua = mola(t, M.grava - 0.1, 11, 210);
  const linhas = [
    {de: M.mesmo - 0.1, texto: 'mesmo assunto'},
    {de: M.exemplo - 0.1, texto: 'o SEU exemplo'},
    {de: M.jeito - 0.1, texto: 'o SEU jeito de falar'},
  ];
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <div style={{position: 'absolute', left: 90, top: 570, opacity: dele, textAlign: 'center'}}>
        <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.cinza, marginBottom: 10}}>IDEIA DELE</div>
        <Post w={330} perfil="@criador" avatar="🎥" conteudo={VITRINE} />
      </div>
      {sua > 0.01 && <div style={{position: 'absolute', left: 470, top: 790, fontSize: 90, opacity: sua}}>➡️</div>}
      <div style={{position: 'absolute', left: 650, top: 570, opacity: sua, scale: String(0.8 + 0.2 * sua), textAlign: 'center'}}>
        <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: COR.verde, marginBottom: 10}}>SUA VERSÃO ✓</div>
        <Post w={330} perfil="sua.lojinha" avatar="🏪" conteudo={<><div style={{fontSize: 90}}>🎙️</div>MINHA VITRINE: 3 TRUQUES</>} fundo="linear-gradient(165deg, #9FE8C8, #3EC6FF)" destaque={COR.verde} />
      </div>
      <div style={{position: 'absolute', left: 150, top: 1100, display: 'flex', flexDirection: 'column', gap: 6}}>
        {linhas.map((l) => {
          const e = mola(t, l.de, 11, 220);
          return <div key={l.texto} style={{opacity: e, translate: `${(1 - e) * -80}px 0px`, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco}}><span style={{color: COR.verde}}>✓</span> {l.texto}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: usar o vídeo de alguém, mudando de verdade ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, T.b - 0.1);
  if (!st) return null;
  const video = mola(t, M.usar - 0.15, 12, 200);
  const camadas = [
    {de: M.narracao - 0.1, texto: '🎙️ sua narração', cor: COR.ciano, y: 110},
    {de: M.comentario - 0.1, texto: '💬 seu comentário', cor: COR.amarelo, y: 270},
    {de: M.marca - 0.1, texto: '🏷️ créditos: @criador', cor: COR.verde, y: 430},
  ];
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}>
        <Carimbo t={t} de={M.muda - 0.1} cor={COR.amarelo} tamanho={52} rot={-4} style={{position: 'relative'}}>MUDA DE VERDADE</Carimbo>
      </div>
      <div style={{position: 'absolute', left: 340, top: 670, width: 400, opacity: video, scale: String(0.85 + 0.15 * video)}}>
        <Post w={400} perfil="vídeo de @criador" avatar="🎥" conteudo={VITRINE} />
        {camadas.map((c) => {
          const e = mola(t, c.de, 10, 240);
          if (e <= 0.01) return null;
          return (
            <div key={c.texto} style={{position: 'absolute', left: -60, right: -60, top: c.y, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.7, 1])), rotate: `${c.y % 3 - 1 * 2}deg`}}>
              <div style={{padding: '14px 24px', borderRadius: 18, background: 'rgba(8,16,44,.95)', border: `4px solid ${c.cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco, whiteSpace: 'nowrap', boxShadow: `0 0 30px ${c.cor}66`}}>{c.texto}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const FimDica2: React.FC<{t: number}> = ({t}) => {
  if (t < M.coisa - 0.2 || t >= T.b - 0.1) return null;
  return <Carimbo t={t} de={M.coisa - 0.1} cor={COR.verde} tamanho={50} rot={-5} style={{left: 250, top: 1240}}>TEM COISA NOVA ✓</Carimbo>;
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Instagram para criadores · Social Media Today (2024)<br />Tubefilter (2022) · TechCrunch (abr/2026)</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>Perfis e posts são exemplos.</div>
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
      <TrocaCheia t={t} />
      <Alerta t={t} />
      <PostTrocado t={t} />
      <OErro t={t} />
      <Recomendacao t={t} />
      <Iguais t={t} />
      <Mosseri t={t} />
      <Formatos t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <FimDica2 t={t} />
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
  // Abertura: freada, alerta, post trocado
  {som: 'swoosh', em: 0, volume: 0.6},
  {som: 'impacto', em: A0 - 0.1, volume: 0.65},
  {som: 'tique', em: 0.1, volume: 0.35},
  {som: 'whoosh_out', em: I0 - 0.03, volume: 0.5},
  {som: 'impacto', em: I0 + 0.35, volume: 0.6},
  {som: 'risco', em: I0 + 0.4, volume: 0.45},
  {som: 'pop', em: I1, volume: 0.4},
  // Contador
  ...passos(T.meio + 0.3, M.chefe, Math.max(1, Math.round(M.chefe - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.14})),
  // O erro
  {som: 'impacto', em: M.erro2, volume: 0.55},
  {som: 'swoosh', em: M.repostar, volume: 0.4},
  // Recomendação
  {som: 'whoosh_in', em: M.quem1 - 0.15, volume: 0.4},
  {som: 'ding', em: M.explorar, volume: 0.4},
  {som: 'ding', em: M.reels1, volume: 0.4},
  {som: 'whoosh_in', em: M.mostra1 - 0.2, volume: 0.4},
  {som: 'pop', em: M.pouca - 0.1, volume: 0.35},
  {som: 'pop', em: M.gostar - 0.1, volume: 0.45},
  {som: 'pop', em: M.gostar + 0.5, volume: 0.35},
  {som: 'ding', em: M.maisGente - 0.1, volume: 0.45},
  // Iguais
  {som: 'whoosh_in', em: M.soQue - 0.15, volume: 0.4},
  {som: 'pop', em: M.dois - 0.1, volume: 0.35},
  {som: 'impacto', em: M.iguais - 0.1, volume: 0.45},
  {som: 'ding', em: M.original - 0.1, volume: 0.5},
  {som: 'swoosh', em: M.alcance - 0.1, volume: 0.4},
  {som: 'risco', em: M.voce - 0.1, volume: 0.5},
  // Mosseri
  {som: 'ding', em: M.chefe, volume: 0.45},
  {som: 'pop', em: M.motivo - 0.1, volume: 0.35},
  {som: 'impacto', em: M.quem3 - 0.1, volume: 0.5},
  // Formatos
  {som: 'pop', em: M.reels2 - 0.1, volume: 0.35},
  {som: 'impacto', em: M.abril - 0.1, volume: 0.5},
  {som: 'pop', em: M.foto - 0.1, volume: 0.4},
  {som: 'pop', em: M.carrossel - 0.1, volume: 0.4},
  {som: 'impacto', em: M.seu3 - 0.15, volume: 0.55},
  // Dica 1
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.ideia - 0.15, volume: 0.35},
  {som: 'whoosh_in', em: M.grava - 0.1, volume: 0.45},
  {som: 'pop', em: M.mesmo - 0.1, volume: 0.3},
  {som: 'pop', em: M.exemplo - 0.1, volume: 0.3},
  {som: 'ding', em: M.jeito - 0.1, volume: 0.4},
  // Dica 2
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.usar - 0.15, volume: 0.35},
  {som: 'impacto', em: M.muda - 0.1, volume: 0.45},
  {som: 'pop', em: M.narracao - 0.1, volume: 0.4},
  {som: 'pop', em: M.comentario - 0.1, volume: 0.4},
  {som: 'pop', em: M.marca - 0.1, volume: 0.4},
  {som: 'ding', em: M.coisa - 0.1, volume: 0.5},
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
    // O clipe costuma congelar no começo: até "faz" o feed freando cobre a Luísa.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: I0, modo: 'fora'},
    {de: I1, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {trocar: COR.vermelho, erro: COR.vermelho, repostar: COR.vermelho, original: COR.verde, seu: COR.verde},
  eventos: EVENTOS,
  Cena,
};
