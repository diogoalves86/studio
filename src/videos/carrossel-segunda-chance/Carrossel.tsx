import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Palavras, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 017 · Esse erro faz o seu carrossel perder a segunda chance.
// Abertura chamativa (feed que freia + alerta vermelho + carimbo "PERDIDA") → Mosseri: quem não arrasta pode ver o
// carrossel de novo, já no slide 2 → o erro: slide 2 que só faz sentido depois da capa → dica 1: slide 2 como segunda
// capa (exemplo do bolo, ruim × bom) → dica 2: pergunta na capa → CTA (áudio e clipe do 015).

const T = TRECHOS;
const M = {
  erro1: em('erro'),
  faz1: em('faz'),
  perder: em('perder'),
  segunda1: em('segunda'),
  chefe: em('chefe'),
  adam: em('adam'),
  pessoa1: em('pessoa'),
  arrasta1: em('arrasta'),
  passa: em('passa'),
  depois1: em('depois'),
  segundo: em('segundo'),
  capa1: em('capa'),
  essa: em('essa'),
  segunda2: em('segunda', em('essa')),
  erro2: em('erro', em('essa')),
  sentido: em('sentido'),
  primeira: em('primeira'),
  funcionar: em('funcionar'),
  segunda3: em('segunda', em('funcionar')),
  olha: em('olha'),
  tres: em('três'),
  erro3: em('erro', em('pode', em('olha'))),
  forno: em('forno'),
  entende: em('entende'),
  segunda4: em('segunda', em('entende')),
  pergunta: em('pergunta'),
  arrasta2: em('arrasta', em('pergunta') + 1),
  arrastar: em('arrastar'),
  volta: em('volta'),
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

// Slide de carrossel genérico. `n` de `total` acende os pontinhos.
const Slide: React.FC<{w: number; n: number; total?: number; fundo?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({w, n, total = 5, fundo = 'linear-gradient(165deg, #FFB37A, #E0607E 55%, #7A3E9A)', children, style}) => (
  <div style={{width: w, borderRadius: w * 0.05, overflow: 'hidden', background: '#0B1122', border: '4px solid rgba(255,255,255,.15)', boxShadow: '0 30px 80px rgba(0,0,0,.55)', ...style}}>
    <div style={{height: w * 1.25, background: fundo, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: w * 0.07, textAlign: 'center'}}>{children}</div>
    <div style={{display: 'flex', justifyContent: 'center', gap: w * 0.02, padding: w * 0.035}}>
      {Array.from({length: total}, (_, i) => <div key={i} style={{width: w * 0.025, height: w * 0.025, borderRadius: 99, background: i + 1 === n ? COR.ciano : 'rgba(255,255,255,.3)'}} />)}
    </div>
  </div>
);

const TextoSlide: React.FC<{w: number; children: React.ReactNode; cor?: string}> = ({w, children, cor = '#1A1020'}) => (
  <div style={{fontFamily: MONT, fontWeight: 900, fontSize: w * 0.1, lineHeight: 1.1, color: cor}}>{children}</div>
);

// ---------- Abertura: o feed freia, alerta vermelho, carimbo ----------

const A0 = M.faz1 - 0.05;

const Freada: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  // O feed rola rápido e desacelera até parar no carrossel (posição final y=0).
  const p = interpolate(t, [0, A0 - 0.08], [0, 1], {...clamp, easing: saida});
  const y = (1 - p) * -2600;
  const tremor = Math.sin(t * 80) * 10 * prog(t, A0 - 0.12, 0.05) * (1 - prog(t, A0, 0.15));
  const posts = ['🍫', '🧁', '🍩', '🍪', '🎂'];
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{position: 'absolute', left: 190, top: 330 + y, display: 'flex', flexDirection: 'column', gap: 40, filter: `blur(${(1 - p) * 12}px)`}}>
        {posts.map((e) => (
          <div key={e} style={{width: 700, height: 520, borderRadius: 30, background: 'linear-gradient(165deg, #3A2E5C, #1A1430)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 180}}>{e}</div>
        ))}
        <Slide w={700} n={1}>
          <TextoSlide w={700}>3 ERROS QUE DEIXAM SEU BOLO SECO</TextoSlide>
        </Slide>
      </div>
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, A0 - 0.12, 0.06) * (1 - prog(t, A0 - 0.06, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>⚠️</span> ESSE <span style={{color: COR.vermelho}}>ERRO</span> TIRA A<br /><span style={{color: COR.vermelho}}>2ª CHANCE</span> DO SEU CARROSSEL
          </div>
        </div>
      </div>
    </>
  );
};

const CarimboPerdida: React.FC<{t: number}> = ({t}) => {
  if (t < M.segunda1 - 0.4 || t >= T.meio + 0.1) return null;
  return (
    <>
      <Carimbo t={t} de={M.segunda1 - 0.3} cor={COR.ciano} tamanho={60} rot={4} style={{left: 320, top: 1250}}>2ª CHANCE</Carimbo>
      <Carimbo t={t} de={M.segunda1 + 0.15} cor={COR.vermelho} tamanho={70} rot={-10} style={{left: 260, top: 1330}}>PERDIDA ✕</Carimbo>
    </>
  );
};

// Contador de retenção: "o erro aparece em Ns" do começo do meio até a palavra "erro".
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.erro2 + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.erro2 + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.erro2 - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1490, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ o erro aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- Mosseri ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.pessoa1 - 0.15);
  if (!st) return null;
  const card = mola(t, M.chefe - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 560, display: 'flex', alignItems: 'center', gap: 26, padding: 22, borderRadius: 30, ...caixa, opacity: card, translate: `0px ${(1 - card) * 40}px`}}>
        <Img src={ARQ.mosseri} style={{width: 150, height: 150, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', border: `4px solid ${COR.ciano}`}} />
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco}}>Adam Mosseri</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.ciano}}>chefe do Instagram</div>
          <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 500, fontSize: 18, color: COR.cinza}}>Foto: Anthony Quintano · CC BY 2.0</div>
        </div>
      </div>
      <Titulo t={t} de={M.adam} top={820} tamanho={54}>"QUEM NÃO ARRASTA PODE<br />VER <span style={{color: COR.ciano}}>DE NOVO</span>"</Titulo>
    </AbsoluteFill>
  );
};

// ---------- O feed: passa direto (1ª vez) e volta no slide 2 (2ª vez) ----------

const Feed: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.pessoa1 - 0.15, M.erro2 - 0.15);
  if (!st) return null;
  const segundaVez = t >= M.depois1;
  // 1ª vez: o carrossel aparece e sobe para fora em "passa". 2ª vez: volta de baixo, já no slide 2.
  const sobe = prog(t, M.passa - 0.1, 0.6, suave);
  const volta = prog(t, M.depois1 + 0.2, 0.7, saida);
  const y = segundaVez ? (1 - volta) * 900 : -sobe * 1100;
  const selo = mola(t, M.segunda2, 10, 230);
  const semCapa = mola(t, M.capa1 - 0.1, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={segundaVez ? M.depois1 : M.pessoa1} top={440} tamanho={56}>
        {segundaVez ? <><span style={{color: COR.verde}}>2ª VEZ:</span> VOLTA NO SLIDE 2</> : <><span style={{color: COR.cinza}}>1ª VEZ:</span> NÃO ARRASTOU, PASSOU</>}
      </Titulo>
      <div style={{position: 'absolute', left: 280, top: 540, width: 520, height: 650, borderRadius: 46, border: '10px solid #1B2238', background: '#0B1122', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
        <div style={{position: 'absolute', left: 40, top: 40 + y}}>
          {segundaVez ? (
            <Slide w={440} n={2} fundo="linear-gradient(165deg, #FFE0B8, #FFC08A)">
              <TextoSlide w={440}>ERRO 1</TextoSlide>
            </Slide>
          ) : (
            <Slide w={440} n={1}>
              <TextoSlide w={440}>3 ERROS QUE DEIXAM SEU BOLO SECO</TextoSlide>
            </Slide>
          )}
        </div>
      </div>
      {!segundaVez && t >= M.arrasta1 && <div style={{position: 'absolute', left: 720, top: 900 - 260 * prog(t, M.passa - 0.1, 0.6), fontSize: 110, opacity: 1 - prog(t, M.passa + 0.4, 0.2)}}>👆</div>}
      {segundaVez && semCapa > 0.01 && (
        <div style={{position: 'absolute', left: 150, top: 1120, opacity: semCapa}}>
          <Pilula cor={COR.amarelo} tamanho={36} fundo="rgba(40,30,5,.92)">SEM A CAPA</Pilula>
        </div>
      )}
      {selo > 0.01 && <Carimbo t={t} de={M.segunda2} cor={COR.verde} tamanho={54} rot={-6} style={{left: 580, top: 1110}}>2ª CHANCE ✓</Carimbo>}
      <Fonte t={t} de={M.pessoa1} ate={M.erro2} top={1230} veiculo="RouteNote" titulo="Chefe do Instagram: carrossel alcança mais que foto (2024)" />
    </AbsoluteFill>
  );
};

// ---------- O erro ----------

const OErro: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.erro2 - 0.15, M.primeira - 0.25);
  if (!st) return null;
  const slide = mola(t, M.erro2 + 0.2, 12, 200);
  const interroga = mola(t, M.sentido - 0.2, 10, 220);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center'}}>
        <Carimbo t={t} de={M.erro2} cor={COR.vermelho} tamanho={72} rot={-4} style={{position: 'relative'}}>⚠️ O ERRO</Carimbo>
      </div>
      <div style={{position: 'absolute', left: 290, top: 620, opacity: slide, scale: String(0.8 + 0.2 * slide)}}>
        <Slide w={500} n={2} fundo="linear-gradient(165deg, #FFE0B8, #FFC08A)">
          <TextoSlide w={500}>ERRO 1</TextoSlide>
        </Slide>
      </div>
      {interroga > 0.01 && ['?', '?', '?'].map((q, i) => (
        <div key={i} style={{position: 'absolute', left: [200, 820, 760][i], top: [720, 680, 1080][i], fontFamily: MONT, fontWeight: 900, fontSize: 130, color: COR.amarelo, opacity: interroga, rotate: `${[-14, 12, 20][i]}deg`, scale: String(0.6 + 0.4 * interroga)}}>{q}</div>
      ))}
      <Titulo t={t} de={M.sentido} top={1250} tamanho={46}>SÓ FAZ SENTIDO <span style={{color: COR.vermelho}}>DEPOIS DA CAPA</span></Titulo>
    </AbsoluteFill>
  );
};

// ---------- Dica 1: slide 2 = segunda capa ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.primeira - 0.25, M.segunda4 - 0.15);
  if (!st) return null;
  const capa = mola(t, M.tres - 0.2, 12, 200);
  const ruim = mola(t, M.erro3 - 0.1, 11, 210);
  const bom = mola(t, M.forno - 0.1, 11, 210);
  const entende = mola(t, M.entende, 10, 230);
  const mostraExemplo = t >= M.olha - 0.1;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      {!mostraExemplo && (
        <Palavras t={t} tamanho={92} style={{position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'SLIDE 2', s: M.funcionar - 0.3}, {texto: '=', s: M.segunda3 - 0.2, cor: COR.cinza}, {texto: '2ª CAPA', s: M.segunda3, cor: COR.ciano, brilho: true}]} />
      )}
      {mostraExemplo && (
        <>
          <div style={{position: 'absolute', left: 0, right: 0, top: 540, display: 'flex', justifyContent: 'center', opacity: capa}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <Slide w={210} n={1}><TextoSlide w={210}>3 ERROS QUE DEIXAM SEU BOLO SECO</TextoSlide></Slide>
              <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 26, color: COR.amarelo}}>capa<br />(exemplo)</div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 130, top: 800, opacity: ruim, scale: String(0.8 + 0.2 * ruim), textAlign: 'center'}}>
            <Slide w={330} n={2} fundo="linear-gradient(165deg, #FFE0B8, #FFC08A)"><TextoSlide w={330}>ERRO 1</TextoSlide></Slide>
            <div style={{marginTop: -20, fontSize: 80}}>❌</div>
          </div>
          <div style={{position: 'absolute', left: 620, top: 800, opacity: bom, scale: String(0.8 + 0.2 * bom), textAlign: 'center'}}>
            <Slide w={330} n={2} fundo="linear-gradient(165deg, #FFE0B8, #FFC08A)"><TextoSlide w={330}>🔥 FORNO QUENTE DEMAIS SECA SEU BOLO</TextoSlide></Slide>
            <div style={{marginTop: -20, fontSize: 80}}>✅</div>
          </div>
          {entende > 0.01 && <Carimbo t={t} de={M.entende} cor={COR.verde} tamanho={44} rot={-5} style={{left: 540, top: 740}}>ENTENDE SEM A CAPA ✓</Carimbo>}
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Dica 2: pergunta na capa ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda4 - 0.15, T.b - 0.1);
  if (!st) return null;
  const capa = mola(t, M.pergunta - 0.2, 12, 200);
  const seta = 0.5 + 0.5 * Math.abs(Math.sin(t * 6));
  const arrasta = prog(t, M.arrasta2, 0.6, saida);
  const linha1 = mola(t, M.arrasta2 + 0.2, 11, 220);
  const linha2 = mola(t, M.volta - 0.2, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda4} n={2} />
      <div style={{position: 'absolute', left: 290 - 520 * arrasta, top: 560, opacity: capa * (1 - arrasta * 0.6), scale: String(0.85 + 0.15 * capa)}}>
        <Slide w={500} n={1}>
          <TextoSlide w={500}>QUAL DESSES 3 ERROS VOCÊ COMETE?</TextoSlide>
          <div style={{marginTop: 20, fontSize: 90, translate: `${seta * 30}px 0px`}}>👉</div>
        </Slide>
      </div>
      {arrasta > 0.01 && (
        <div style={{position: 'absolute', left: 290 + 520 * (1 - arrasta), top: 560}}>
          <Slide w={500} n={2} fundo="linear-gradient(165deg, #FFE0B8, #FFC08A)"><TextoSlide w={500}>🔥 FORNO QUENTE DEMAIS SECA SEU BOLO</TextoSlide></Slide>
        </div>
      )}
      <Toque t={t} de={M.arrasta2 - 0.4} toque={M.arrasta2} x={680} y={900} />
      <div style={{position: 'absolute', left: 120, right: 120, top: 1260, display: 'flex', flexDirection: 'column', gap: 12}}>
        {linha1 > 0.01 && <div style={{opacity: linha1, fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco}}>1ª VEZ → arrasta pela capa <span style={{color: COR.verde}}>✓</span></div>}
        {linha2 > 0.01 && <div style={{opacity: linha2, fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco}}>2ª VEZ → o slide 2 pega <span style={{color: COR.verde}}>✓</span></div>}
      </div>
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco}}>RouteNote · Adam Mosseri, out/2024</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>O carrossel do bolo é um exemplo.</div>
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
      <CarimboPerdida t={t} />
      <Mosseri t={t} />
      <Feed t={t} />
      <OErro t={t} />
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
  // Abertura: freada, alerta, carimbo
  {som: 'swoosh', em: 0, volume: 0.6},
  {som: 'impacto', em: A0 - 0.1, volume: 0.65},
  {som: 'tique', em: 0.1, volume: 0.35},
  {som: 'impacto', em: M.erro1, volume: 0.45},
  {som: 'pop', em: M.segunda1 - 0.3, volume: 0.45},
  {som: 'impacto', em: M.segunda1 + 0.15, volume: 0.6},
  {som: 'risco', em: M.segunda1 + 0.2, volume: 0.45},
  // Contador
  ...passos(T.meio + 0.3, M.erro2, Math.max(1, Math.round(M.erro2 - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.18})),
  // Mosseri
  {som: 'ding', em: M.chefe, volume: 0.45},
  {som: 'pop', em: M.adam, volume: 0.35},
  // Feed
  {som: 'whoosh_in', em: M.pessoa1 - 0.2, volume: 0.4},
  {som: 'whoosh_out', em: M.passa - 0.1, volume: 0.45},
  {som: 'whoosh_in', em: M.depois1 + 0.1, volume: 0.45},
  {som: 'pop', em: M.capa1 - 0.1, volume: 0.35},
  {som: 'ding', em: M.segunda2, volume: 0.5},
  // O erro
  {som: 'impacto', em: M.erro2, volume: 0.6},
  {som: 'pop', em: M.sentido - 0.2, volume: 0.35},
  // Dica 1
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.funcionar - 0.3, volume: 0.35},
  {som: 'ding', em: M.segunda3, volume: 0.4},
  {som: 'whoosh_in', em: M.olha - 0.2, volume: 0.4},
  {som: 'risco', em: M.erro3, volume: 0.45},
  {som: 'ding', em: M.forno, volume: 0.5},
  {som: 'impacto', em: M.entende, volume: 0.45},
  // Dica 2
  {som: 'impacto', em: M.segunda4, volume: 0.5},
  {som: 'pop', em: M.pergunta - 0.2, volume: 0.4},
  {som: 'toque', em: M.arrasta2, volume: 0.6},
  {som: 'swoosh', em: M.arrasta2 + 0.05, volume: 0.45},
  {som: 'ding', em: M.arrasta2 + 0.2, volume: 0.4},
  {som: 'ding', em: M.volta - 0.2, volume: 0.45},
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
    {de: M.perder, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [M.sentido - 0.1, M.primeira - 0.2],
    [M.arrasta2 + 0.2, T.b],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {erro: COR.vermelho, perder: COR.vermelho, 'erro 1': COR.vermelho},
  eventos: EVENTOS,
  Cena,
};
