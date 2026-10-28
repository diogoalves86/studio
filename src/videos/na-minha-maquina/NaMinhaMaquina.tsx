import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, Sequence, useVideoConfig} from 'remotion';
import {Audio, Video} from '@remotion/media';
import {Toque} from '../destaques-instagram/Componentes';
import {maoLivre, Textura} from '../reels-avatar/Textura';
import {PALAVRAS, TRECHOS} from './palavras';
import {ARQ, BUNGEE, clamp, GAL, INTER, MONT, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 034 · "Na minha máquina funciona": primeiro Reels da @galinhaprogramadora, meme de TI sem ponte para o Digo.
// POV + gancho (Galinha) → sexta, 18h, o código roda lindo → deploy → o sistema inteiro cai (servidor em chamas,
// "tá tudo bem") → "Mas na minha máquina funciona!" (Galinha, óculos pixelados descendo) → pausa muda: grilos,
// o chefe responde no chat, o notebook vai numa caixa pro cliente (trombone triste) → reviravolta: no cliente
// funciona → a Galinha "eu avisei", COMPROVADO → CTA "marca aquele dev" + seguir (Galinha) → tela final.

// ---------- Tempo: a narração ganha uma pausa muda (grilos, chefe, caixa, cliente) antes do CTA ----------

export const PAUSA = 9.6;
const desloca = (s: number) => (s >= TRECHOS.b - 0.001 ? s + PAUSA : s);
const P = PALAVRAS.map((p) => ({...p, s: desloca(p.s), e: desloca(p.e)}));
const T = {a: TRECHOS.a, meio: TRECHOS.meio, frase: TRECHOS.frase, chefe: TRECHOS.b, b: TRECHOS.b + PAUSA, fim: TRECHOS.fim + PAUSA};
const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/g, '');
const em = (texto: string, depois = -1) => {
  const p = P.find((x) => x.s > depois && norm(x.w) === norm(texto));
  if (!p) throw new Error(`palavra não encontrada: ${texto} depois de ${depois}`);
  return p.s;
};
// Palavra seguinte a um tempo (o Whisper às vezes escreve "deve" no lugar de "dev" e "segui" no lugar de "segue").
const proxima = (depois: number) => P.find((x) => x.s > depois)!.s;
const fimDe = (texto: string) => P.find((x) => norm(x.w) === norm(texto))!.e;

const M = {
  frase: em('frase'),
  mais: em('mais'),
  perigosa: em('perigosa'),
  sexta: em('sexta'),
  seis: em('seis'),
  tarde: em('tarde'),
  o: em('o', T.meio),
  codigo: em('código'),
  roda: em('roda'),
  lindo: em('lindo'),
  computador: em('computador'),
  ai: em('aí'),
  manda: em('manda'),
  producao: em('produção'),
  sistema: em('sistema'),
  inteiro: em('inteiro'),
  cai: em('cai'),
  minha: em('minha'),
  maquina: em('máquina'),
  funciona: em('funciona'),
  funcionaFim: fimDe('funciona'),
  marca: em('marca'),
  dev: proxima(em('aquele')),
  isso: em('isso'),
  e: em('e', em('isso')),
  seguir: proxima(em('e', em('isso'))),
  galinha: em('galinha'),
  programadora: em('programadora'),
};

// A pausa muda não tem fala: os tempos saem do início dela (T.chefe), não de números soltos.
const CH = {
  // Óculos pixelados já no rosto e 1,2 s de grilos com a Galinha parada (timing de comédia).
  grilos: T.chefe + 0.1,
  chat: T.chefe + 1.45,
  digita: T.chefe + 1.6,
  // A resposta do chefe fica ~1,9 s inteira na tela para dar tempo de ler.
  msg: T.chefe + 2.05,
  // A caixa anda devagar (pedido do Diogo): o notebook cai, as abas fecham, etiqueta, fita e a caixa sai.
  caixa: T.chefe + 3.95,
  fecha: T.chefe + 4.55,
  rotulo: T.chefe + 4.9,
  fita: T.chefe + 5.05,
  vai: T.chefe + 5.3,
  // Reviravolta: a caixa chega no cliente, abre, e lá funciona.
  cliente: T.chefe + 5.85,
  abre: T.chefe + 6.4,
  sobe: T.chefe + 6.65,
  msgCliente: T.chefe + 7.0,
  vitoria: T.chefe + 8.3,
};

export const OUTRO = 1.4;
export const DURACAO = T.fim + OUTRO;
const ADIANTA_BOCA = 3;

// ---------- Câmera: Galinha em tela cheia ou fora de cena (motion cheio) ----------

type Modo = 'cheia' | 'fora';
type Estado = {de: number; modo: Modo; escala?: [number, number]; punch?: boolean};

// A Galinha volta no meio de "programadora", depois do trecho acelerado do clipe C.
const VOLTA = M.programadora + 0.15;

const ESTADOS: Estado[] = [
  // Até "perigosa" a tipografia cobre o começo congelado do clipe e o «mais» lento.
  {de: 0, modo: 'fora'},
  {de: M.perigosa - 0.06, modo: 'cheia', escala: [1.12, 1.16], punch: true},
  {de: T.meio - 0.17, modo: 'fora'},
  // Corte seco do desastre para a Galinha.
  {de: T.frase, modo: 'cheia', escala: [1.03, 1.07]},
  // «minha máquina» sai acelerado no clipe: coberto pelo letreiro amarelo.
  {de: M.minha + 0.04, modo: 'fora'},
  {de: M.funciona - 0.08, modo: 'cheia', escala: [1.24, 1.28], punch: true},
  // Logo depois de "funciona" a Galinha congela (quadro parado, mesmo enquadramento) para os óculos descerem.
  {de: M.funcionaFim, modo: 'fora'},
  {de: T.b, modo: 'cheia', escala: [1.02, 1.06]},
  {de: M.dev - 0.05, modo: 'cheia', escala: [1.14, 1.18], punch: true},
  // «E segue a galinha pro-» sai lento e depois acelerado no clipe: coberto pelo cartão de perfil.
  {de: M.e - 0.05, modo: 'fora'},
  {de: VOLTA, modo: 'cheia', escala: [1.1, 1.14], punch: true},
  {de: T.fim, modo: 'fora'},
];

const estadoEm = (t: number) => {
  const i = Math.max(0, ESTADOS.filter((e) => t >= e.de).length - 1);
  const e = ESTADOS[i];
  const ant = ESTADOS[i - 1] ?? e;
  const pres = (x: Estado) => (x.modo === 'fora' ? 0 : 1);
  // Cortes secos: a Galinha entra e sai em 0,12 s (é meme, não aula).
  const presenca = interpolate(t, [e.de, e.de + 0.12], [pres(ant), pres(e)], clamp);
  const esc = e.escala ?? [1, 1.04];
  const ate = ESTADOS[i + 1]?.de ?? e.de + 4;
  const escala = e.punch ? interpolate(t, [e.de, e.de + 0.3], esc, {...clamp, easing: saida}) : interpolate(t, [e.de, ate], esc, clamp);
  const tremor = e.punch ? Math.sin((t - e.de) * 70) * 9 * (1 - Math.min(1, Math.max(0, t - e.de) / 0.3)) : 0;
  return {presenca, escala, tremor};
};

const Camera: React.FC<{src: string; t: number}> = ({src, t}) => {
  const {presenca, escala, tremor} = estadoEm(t);
  if (presenca <= 0.001) return null;
  const mao = maoLivre(t);
  return (
    <AbsoluteFill style={{opacity: presenca}}>
      <AbsoluteFill style={{scale: String(escala * 1.02), transformOrigin: '50% 32%', translate: `${tremor + mao.x}px ${-(escala - 1) * 420 + mao.y}px`, rotate: `${mao.r}deg`}}>
        {/* A boca gerada vem ~0,1 s depois do som (guia 6): a imagem adianta 3 quadros. */}
        <Video src={src} muted objectFit="cover" trimBefore={ADIANTA_BOCA} style={{width: '100%', height: '100%'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 55%, rgba(4,20,16,.45) 75%, rgba(4,20,16,.15) 100%)'}} />
    </AbsoluteFill>
  );
};

// ---------- Peças ----------

// Fundo das cenas: verde-noite com os raios da logo girando devagar.
const Fundo: React.FC<{t: number}> = ({t}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, ${GAL.verdeEscuro} 0%, ${GAL.verdeNoite} 75%)`}}>
    <AbsoluteFill style={{opacity: 0.18, rotate: `${t * 3}deg`, scale: '1.9', background: `repeating-conic-gradient(from 0deg at 50% 50%, ${GAL.verde} 0deg 1.4deg, transparent 1.4deg 9deg)`, maskImage: 'radial-gradient(circle at 50% 50%, transparent 12%, black 45%)'}} />
  </AbsoluteFill>
);

const Letreiro: React.FC<{t: number; de: number; tamanho?: number; cor?: string; fundo?: string; rot?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, tamanho = 120, cor = GAL.amarelo, fundo = GAL.preto, rot = -3, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240);
  if (e <= 0.01) return null;
  return (
    <div style={{display: 'flex', justifyContent: 'center', opacity: Math.min(1, e * 1.6), scale: String(interpolate(e, [0, 1], [1.9, 1])), rotate: `${rot + (1 - e) * 10}deg`, ...style}}>
      <div style={{padding: `${tamanho * 0.12}px ${tamanho * 0.3}px`, background: fundo, border: `${tamanho * 0.05}px solid ${GAL.branco}`, borderRadius: 18, fontFamily: BUNGEE, fontSize: tamanho, lineHeight: 1.05, color: cor, whiteSpace: 'nowrap', boxShadow: '0 18px 0 rgba(0,0,0,.35), 0 30px 60px rgba(0,0,0,.4)'}}>{children}</div>
    </div>
  );
};

const Carimbo: React.FC<{t: number; de: number; cor: string; tamanho?: number; rot?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, tamanho = 56, rot = -8, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 9, 260);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.4, 1])), rotate: `${rot + (1 - e) * 14}deg`, zIndex: 5, ...style}}>
      <div style={{padding: `${tamanho * 0.2}px ${tamanho * 0.5}px`, border: `${tamanho * 0.1}px solid ${cor}`, borderRadius: 14, fontFamily: BUNGEE, fontSize: tamanho, color: cor, background: 'rgba(8,8,8,.85)', whiteSpace: 'nowrap', boxShadow: `0 0 40px ${cor}66`}}>{children}</div>
    </div>
  );
};

const Etiqueta: React.FC<{t: number; de: number; cor: string; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), zIndex: 4, ...style}}>
      <div style={{padding: '12px 22px', borderRadius: 18, background: GAL.preto, border: `4px solid ${cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 32, color: GAL.branco, whiteSpace: 'nowrap', boxShadow: `0 0 30px ${cor}55`}}>{children}</div>
    </div>
  );
};

const digitar = (t: number, de: number, ate: number, texto: string) => {
  const L = Array.from(texto);
  return L.slice(0, Math.round(interpolate(t, [de, ate], [0, L.length], clamp))).join('');
};
const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;

const falando = (t: number) => P.some((p) => t >= p.s - 0.03 && t < p.e + 0.04);

// Enquanto a Galinha está fora de cena no meio, ela continua "no ar" num card de voz.
const CardVoz: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const entra = mola(t, T.meio + 0.15, 14, 180);
  const sai = prog(t, T.frase - 0.2, 0.15);
  if (t < T.meio || entra * (1 - sai) <= 0.001) return null;
  const voz = falando(t) ? 1 : 0.15;
  return (
    <div style={{position: 'absolute', left: 64, right: 64, top: 262, height: 130, display: 'flex', alignItems: 'center', gap: 26, opacity: entra * (1 - sai), translate: `0px ${(1 - entra) * -60}px`, zIndex: 6}}>
      <div style={{position: 'relative', width: 124, height: 124, flexShrink: 0}}>
        <div style={{position: 'absolute', inset: -8, borderRadius: 99, border: `5px solid ${GAL.amarelo}`, opacity: 0.35 + 0.65 * voz, scale: String(1 + 0.06 * voz * Math.abs(Math.sin(t * 9)))}} />
        <Img src={ARQ.galinha} style={{width: 124, height: 124, borderRadius: 99, objectFit: 'cover', objectPosition: '50% 22%', background: GAL.verde}} />
      </div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: BUNGEE, fontSize: 40, color: GAL.branco}}>Galinha</div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 28, color: GAL.cinza}}>@galinhaprogramadora</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 9, height: 90}}>
        {Array.from({length: 9}, (_, i) => {
          const a = 0.35 + 0.65 * Math.abs(Math.sin(t * (7 + i * 1.7) + i * 1.3));
          return <div key={i} style={{width: 11, borderRadius: 99, height: 14 + 70 * a * voz, background: i % 2 ? GAL.amarelo : GAL.rosa}} />;
        })}
      </div>
    </div>
  );
};

// ---------- Abertura e alerta ----------

const Abertura: React.FC<{t: number}> = ({t}) => {
  const fim = M.perigosa - 0.06;
  if (t >= fim + 0.15) return null;
  const pulso = 0.55 + 0.45 * Math.abs(Math.sin(t * 7));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #4A0710 0%, #120204 75%)', alignItems: 'center', justifyContent: 'center', opacity: 1 - prog(t, fim, 0.12)}}>
      <div style={{fontSize: 170, scale: String(1 + 0.1 * pulso), marginBottom: 30}}>🚨</div>
      <Letreiro t={t} de={0} tamanho={130} rot={-4}>A FRASE</Letreiro>
      <Letreiro t={t} de={M.mais - 0.05} tamanho={150} cor={GAL.branco} fundo={GAL.vermelho} rot={3} style={{marginTop: 26}}>MAIS</Letreiro>
    </AbsoluteFill>
  );
};

const Alerta: React.FC<{t: number}> = ({t}) => {
  if (t >= T.meio + 0.1) return null;
  const e = 1 - prog(t, T.meio - 0.2, 0.25);
  const pulso = 0.55 + 0.45 * Math.abs(Math.sin(t * 7));
  return (
    <>
      <AbsoluteFill style={{pointerEvents: 'none', boxShadow: `inset 0 0 ${140 * pulso}px rgba(255,30,40,${0.7 * e})`, border: `${10 * e}px solid rgba(255,59,59,${0.85 * pulso * e})`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 410, opacity: e, zIndex: 7, translate: `${Math.sin(t * 40) * 4}px 0px`}}>
        <Letreiro t={t} de={M.perigosa - 0.06} tamanho={70} cor={GAL.branco} fundo={GAL.vermelho} rot={-2}>⚠️ PERIGO</Letreiro>
      </div>
    </>
  );
};

// Formato de meme desde o primeiro quadro: "POV: você é o dev".
const Pov: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio + 0.1) return null;
  const e = mola(t, 0, 11, 220) * (1 - prog(t, T.meio - 0.2, 0.25));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 262, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.8 + 0.2 * e), zIndex: 8}}>
      <div style={{padding: '14px 30px', borderRadius: 22, background: GAL.branco, fontFamily: INTER, fontWeight: 800, fontSize: 50, color: GAL.preto, boxShadow: '0 12px 30px rgba(0,0,0,.4)'}}>
        <b style={{fontFamily: BUNGEE, fontWeight: 400}}>POV:</b> você é o dev 🫠
      </div>
    </div>
  );
};

// ---------- Sexta, 18h ----------

const Relogio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.o - 0.15);
  if (!st) return null;
  const virou = t >= M.tarde;
  const flip = mola(t, M.tarde, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', opacity: mola(t, T.meio + 0.05, 11, 220), rotate: '-3deg'}}>
        <div style={{width: 520, borderRadius: 32, overflow: 'hidden', background: GAL.branco, boxShadow: '0 30px 70px rgba(0,0,0,.5)'}}>
          <div style={{background: GAL.rosa, padding: '18px 0', textAlign: 'center', fontFamily: BUNGEE, fontSize: 52, color: GAL.branco}}>SEXTA-FEIRA</div>
          <div style={{padding: '18px 0 26px', textAlign: 'center', fontSize: 120}}>🍺</div>
        </div>
      </div>
      {t >= M.seis - 0.1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 960, display: 'flex', justifyContent: 'center', opacity: mola(t, M.seis - 0.1, 12, 220)}}>
          <div style={{padding: '24px 50px', borderRadius: 30, background: '#050807', border: `6px solid ${virou ? GAL.amarelo : '#2A3A35'}`, fontFamily: 'monospace', fontWeight: 900, fontSize: 170, color: virou ? GAL.amarelo : GAL.terminal, letterSpacing: 6, scale: String(virou ? 0.85 + 0.15 * flip : 1), boxShadow: virou ? `0 0 60px ${GAL.amarelo}88` : undefined}}>
            {virou ? '18:00' : '17:59'}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- O código roda lindo na sua máquina ----------

const LINHAS: {de: () => number; txt: string; cor: string}[] = [
  {de: () => M.codigo - 0.1, txt: '$ npm run build', cor: GAL.branco},
  {de: () => M.codigo + 0.2, txt: '✓ build ok', cor: GAL.terminal},
  {de: () => M.roda, txt: '$ npm test', cor: GAL.branco},
  {de: () => M.lindo, txt: '✓ 47 testes passando', cor: GAL.terminal},
  {de: () => M.lindo + 0.25, txt: '✓ 0 erros · 0 avisos', cor: GAL.terminal},
];

const Terminal: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.o - 0.15, M.ai - 0.15);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 70, right: 70, top: 470, borderRadius: 28, overflow: 'hidden', background: '#070B0A', border: '3px solid #24332E', boxShadow: '0 40px 90px rgba(0,0,0,.6)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '18px 22px', background: '#141E1B'}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 22, height: 22, borderRadius: 99, background: c}} />)}
          <div style={{marginLeft: 16, fontFamily: INTER, fontWeight: 700, fontSize: 28, color: GAL.cinza}}>💻 sua-maquina — bash</div>
        </div>
        <div style={{padding: '26px 32px 34px', fontFamily: 'Menlo, monospace', fontSize: 42, lineHeight: 1.55, minHeight: 420}}>
          {LINHAS.map((l, i) => {
            const de = l.de();
            if (t < de) return null;
            const txt = l.txt.startsWith('$') ? digitar(t, de, de + 0.3, l.txt) : l.txt;
            return <div key={i} style={{color: l.cor, fontWeight: l.txt.startsWith('✓') ? 800 : 500}}>{txt}</div>;
          })}
          <Cursor t={t} />
        </div>
      </div>
      <Etiqueta t={t} de={M.computador - 0.1} cor={GAL.azul} style={{left: 90, top: 1040}}>💻 NA SUA MÁQUINA</Etiqueta>
      <Carimbo t={t} de={M.computador + 0.1} cor={GAL.terminal} tamanho={60} rot={6} style={{left: 470, top: 1120}}>😎 PERFEITO</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Deploy ----------

const Deploy: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.ai - 0.15, M.sistema - 0.12, 40);
  if (!st) return null;
  const apertou = t >= M.producao;
  const aperta = interpolate(t, [M.producao, M.producao + 0.08, M.producao + 0.2], [1, 0.9, 1], clamp);
  const barra = prog(t, M.producao + 0.05, M.sistema - M.producao - 0.2, suave);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', fontFamily: BUNGEE, fontSize: 56, color: GAL.branco, opacity: mola(t, M.manda - 0.1, 12, 200)}}>
        MANDA PRA <span style={{color: GAL.rosa}}>PRODUÇÃO</span>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}>
        <div style={{width: 520, height: 520, borderRadius: 999, background: `radial-gradient(circle at 40% 35%, #FF8CC0, ${GAL.rosa} 55%, #C2236A)`, border: `14px solid ${GAL.preto}`, boxShadow: apertou ? `0 10px 0 #7A0F3E, 0 0 90px ${GAL.rosa}` : '0 30px 0 #7A0F3E, 0 50px 90px rgba(0,0,0,.5)', translate: `0px ${apertou ? 18 : 0}px`, scale: String(aperta), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontSize: 150}}>🚀</div>
          <div style={{fontFamily: BUNGEE, fontSize: 80, color: GAL.branco, textShadow: '0 6px 0 rgba(0,0,0,.3)'}}>DEPLOY</div>
        </div>
      </div>
      <Toque t={t} de={M.manda} toque={M.producao} x={560} y={900} />
      {apertou && (
        <div style={{position: 'absolute', left: 120, right: 120, top: 1240}}>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: GAL.cinza, marginBottom: 12}}>enviando pra produção… {Math.round(barra * 100)}%</div>
          <div style={{height: 34, borderRadius: 99, background: '#1B2B26', overflow: 'hidden', border: '3px solid #2C4039'}}>
            <div style={{width: `${barra * 100}%`, height: '100%', background: `linear-gradient(90deg, ${GAL.verde}, ${GAL.terminal})`}} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- O sistema inteiro cai ----------

const ERROS = ['ERROR 500', 'Internal Server Error', 'TypeError: undefined is not a function', '💥 banco de dados fora do ar', 'ERRO FATAL'];

const Desastre: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const de = M.sistema - 0.12;
  if (t < de || t >= T.frase + 0.05) return null;
  const k = prog(t, de, 0.15);
  const pisca = 0.55 + 0.45 * Math.abs(Math.sin(t * 16));
  const treme = t >= M.cai ? 1 : 0.4;
  // Depois do "cai", as janelas de erro derretem e entra o servidor pegando fogo.
  const derrete = prog(t, M.cai + 0.15, 0.4, suave);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, rgba(190,10,20,${0.95 * k}) 0%, rgba(60,0,4,${k}) 80%)`, translate: `${Math.sin(t * 61) * 14 * treme}px ${Math.cos(t * 53) * 10 * treme}px`, zIndex: 3}}>
      <AbsoluteFill style={{boxShadow: `inset 0 0 ${180 * pisca}px rgba(255,0,20,.9)`}} />
      <Servidor t={t} de={M.cai + 0.25} />
      {ERROS.map((txt, i) => {
        const em0 = de + 0.1 + i * 0.13;
        const e = mola(t, em0, 9, 260);
        if (e <= 0.01 || derrete >= 1) return null;
        const pinga = derrete * (300 + i * 140);
        return (
          <div key={txt} style={{position: 'absolute', left: 70 + (i % 2) * 90, top: 470 + i * 118 + pinga, width: 820, opacity: e * (1 - derrete), scale: `${interpolate(e, [0, 1], [1.5, 1])} ${interpolate(e, [0, 1], [1.5, 1]) * (1 + 0.8 * derrete)}`, rotate: `${(i % 2 ? 3 : -3) * e + derrete * (i % 2 ? 12 : -12)}deg`, filter: `blur(${4 * derrete}px)`}}>
            <div style={{borderRadius: 14, overflow: 'hidden', background: '#FFF', border: '4px solid #111', boxShadow: '0 16px 40px rgba(0,0,0,.5)'}}>
              <div style={{background: GAL.vermelho, padding: '6px 16px', fontFamily: INTER, fontWeight: 800, fontSize: 24, color: '#fff'}}>✕ Erro</div>
              <div style={{padding: '12px 18px', fontFamily: 'Menlo, monospace', fontWeight: 700, fontSize: 34, color: '#111'}}>{txt}</div>
            </div>
          </div>
        );
      })}
      <div style={{opacity: 1 - derrete}}>
        <Carimbo t={t} de={M.cai - 0.05} cor={GAL.amarelo} tamanho={72} rot={-7} style={{left: 150, top: 1110}}>FORA DO AR ✕</Carimbo>
      </div>
    </AbsoluteFill>
  );
};

// O rack do servidor pegando fogo, com o clássico "tá tudo bem" (desenhado por nós).
const Servidor: React.FC<{t: number; de: number}> = ({t, de}) => {
  const mola = useMola();
  const e = mola(t, de, 12, 200);
  if (e <= 0.01) return null;
  const chama = (i: number) => 0.85 + 0.15 * Math.sin(t * 18 + i * 1.7);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: e, scale: String(0.7 + 0.3 * e)}}>
      <div style={{position: 'relative', width: 420, height: 380}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: -150, display: 'flex', justifyContent: 'center', gap: 6}}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{fontSize: 120, scale: String(chama(i)), translate: `0px ${-10 * chama(i + 2)}px`}}>🔥</div>)}
        </div>
        <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: 'linear-gradient(180deg, #2A2F2E, #141817)', border: '8px solid #0A0C0B', padding: 26, display: 'flex', flexDirection: 'column', gap: 18}}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{height: 62, borderRadius: 10, background: '#1E2423', border: '3px solid #36403E', display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px'}}>
              {[0, 1, 2].map((j) => <div key={j} style={{width: 18, height: 18, borderRadius: 99, background: Math.floor(t * 10 + i + j) % 2 ? GAL.vermelho : '#5A1010'}} />)}
              <div style={{flex: 1, height: 10, borderRadius: 99, background: '#2C3533', marginLeft: 12}} />
            </div>
          ))}
        </div>
      </div>
      <Letreiro t={t} de={de + 0.2} tamanho={74} cor={GAL.preto} fundo={GAL.amarelo} rot={-3} style={{marginTop: 40}}>TÁ TUDO BEM 🙂</Letreiro>
    </div>
  );
};

// Notificações do celular caindo do topo enquanto tudo pega fogo; as chamadas do chefe disparam até 99+.
const Notificacoes: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const de = M.cai + 0.05;
  if (t < de || t >= T.frase + 0.05) return null;
  const chamadas = Math.round(interpolate(t, [de, T.frase - 0.2], [14, 99], {...clamp, easing: suave}));
  const itens = [
    {em: de, icone: '📞', titulo: 'Chefe', txt: chamadas >= 99 ? '99+ chamadas perdidas' : `${chamadas} chamadas perdidas`},
    {em: de + 0.22, icone: '💬', titulo: 'Cliente', txt: 'CADÊ O SITE???'},
  ];
  return (
    <>
      {itens.map((n, i) => {
        const e = mola(t, n.em, 12, 220);
        if (e <= 0.01) return null;
        return (
          <div key={n.titulo} style={{position: 'absolute', left: 60, right: 60, top: 262 + i * 120 - (1 - e) * 200, opacity: e, zIndex: 8, translate: `${Math.sin(t * 50 + i) * 5}px 0px`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '18px 24px', borderRadius: 28, background: 'rgba(250,250,250,.96)', boxShadow: '0 20px 50px rgba(0,0,0,.5)'}}>
              <div style={{fontSize: 52}}>{n.icone}</div>
              <div>
                <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#111'}}>{n.titulo}</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: i ? GAL.vermelho : '#333'}}>{n.txt}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

// ---------- "Na minha máquina": letreiro amarelo cobrindo o trecho acelerado do clipe ----------

const NaMinha: React.FC<{t: number}> = ({t}) => {
  const de = M.minha + 0.04;
  const ate = M.funciona - 0.08;
  if (t < de - 0.02 || t >= ate + 0.12) return null;
  const sai = prog(t, ate, 0.12);
  return (
    <AbsoluteFill style={{background: `repeating-conic-gradient(from 0deg at 50% 50%, ${GAL.amarelo} 0deg 6deg, #FFD22E 6deg 12deg)`, alignItems: 'center', justifyContent: 'center', opacity: 1 - sai, zIndex: 4}}>
      <Letreiro t={t} de={de} tamanho={130} rot={-4}>NA MINHA</Letreiro>
      <Letreiro t={t} de={M.maquina - 0.04} tamanho={150} cor={GAL.branco} fundo={GAL.rosa} rot={3} style={{marginTop: 30}}>MÁQUINA 💻</Letreiro>
    </AbsoluteFill>
  );
};

// ---------- A resposta do chefe (sem fala) ----------

const Chefe: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const bloco = useBloco();
  const st = bloco(t, CH.chat, CH.caixa - 0.1, 40);
  if (!st) return null;
  const digitando = t >= CH.digita && t < CH.msg;
  const msg = mola(t, CH.msg, 12, 220);
  return (
    <AbsoluteFill style={{...st, zIndex: 4}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 300, borderRadius: 36, overflow: 'hidden', background: '#F2F5F4', boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 28px', background: GAL.preto}}>
          <div style={{width: 76, height: 76, borderRadius: 99, background: '#3A4A45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46}}>👔</div>
          <div>
            <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 36, color: GAL.branco}}>Chefe</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 24, color: GAL.terminal}}>{digitando ? 'digitando…' : 'online'}</div>
          </div>
        </div>
        <div style={{padding: '30px 26px 40px', display: 'flex', flexDirection: 'column', gap: 22, minHeight: 520}}>
          <div style={{alignSelf: 'flex-end', maxWidth: '78%', padding: '18px 24px', borderRadius: '28px 28px 6px 28px', background: GAL.verde, fontFamily: INTER, fontWeight: 700, fontSize: 36, color: GAL.preto}}>
            mas na minha máquina funciona 🤷
          </div>
          {digitando && (
            <div style={{alignSelf: 'flex-start', padding: '20px 28px', borderRadius: '28px 28px 28px 6px', background: GAL.branco, display: 'flex', gap: 10}}>
              {[0, 1, 2].map((i) => <div key={i} style={{width: 18, height: 18, borderRadius: 99, background: '#8A9792', translate: `0px ${-8 * Math.max(0, Math.sin(t * 12 - i))}px`}} />)}
            </div>
          )}
          {msg > 0.01 && (
            <div style={{alignSelf: 'flex-start', maxWidth: '86%', padding: '20px 26px', borderRadius: '28px 28px 28px 6px', background: GAL.branco, fontFamily: INTER, fontWeight: 700, fontSize: 44, lineHeight: 1.25, color: GAL.preto, opacity: msg, scale: String(0.85 + 0.15 * msg), transformOrigin: '0% 100%', boxShadow: '0 8px 20px rgba(0,0,0,.08)'}}>
              Ótimo. Então a gente manda a <b style={{color: GAL.rosa}}>sua máquina</b> pro cliente. 📦
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Notebook: React.FC<{w: number}> = ({w}) => (
  <div style={{width: w, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: w * 0.8, height: w * 0.52, borderRadius: 16, background: '#1A1F1D', border: '8px solid #C9D1CE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Menlo, monospace', fontWeight: 800, fontSize: w * 0.07, color: GAL.terminal}}>✓ funciona</div>
    <div style={{width: w, height: w * 0.06, borderRadius: '0 0 18px 18px', background: '#C9D1CE'}} />
  </div>
);

const Caixa: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < CH.caixa - 0.1 || t >= CH.vai + 0.5) return null;
  const entra = mola(t, CH.caixa - 0.1, 13, 200);
  const desce = prog(t, CH.caixa + 0.05, 0.55, saida);
  const fecha = prog(t, CH.fecha, 0.35, suave);
  const vai = prog(t, CH.vai, 0.45, suave);
  const fita = prog(t, CH.fita, 0.25);
  return (
    <AbsoluteFill style={{zIndex: 4}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', opacity: entra, translate: `${vai * 1200}px 0px`, rotate: `${vai * 8}deg`}}>
        <div style={{position: 'relative', width: 640, height: 640}}>
          {/* notebook caindo dentro da caixa */}
          <div style={{position: 'absolute', left: 120, top: interpolate(desce, [0, 1], [-260, 140]), opacity: 1 - fecha}}>
            <Notebook w={400} />
          </div>
          {/* caixa */}
          <div style={{position: 'absolute', left: 40, right: 40, top: 300, bottom: 0, background: 'linear-gradient(180deg, #C98A4B, #A86C34)', border: '6px solid #6E4520', borderRadius: 10}} />
          {/* abas fechando */}
          <div style={{position: 'absolute', left: 40, width: 280, top: 300, height: 120, background: '#B97A3E', border: '6px solid #6E4520', transformOrigin: '0% 0%', rotate: `${interpolate(fecha, [0, 1], [-120, 0])}deg`}} />
          <div style={{position: 'absolute', right: 40, width: 280, top: 300, height: 120, background: '#B97A3E', border: '6px solid #6E4520', transformOrigin: '100% 0%', rotate: `${interpolate(fecha, [0, 1], [120, 0])}deg`}} />
          {/* fita */}
          <div style={{position: 'absolute', left: 320 - 40, top: 290, width: 80, height: 140 * fita, background: 'rgba(230,220,180,.85)'}} />
          {t >= CH.rotulo && (
            <div style={{position: 'absolute', left: 90, right: 90, top: 450, rotate: '-4deg', opacity: mola(t, CH.rotulo, 9, 260), scale: String(interpolate(mola(t, CH.rotulo, 9, 260), [0, 1], [1.8, 1]))}}>
              <div style={{padding: '14px 18px', background: GAL.branco, border: `5px solid ${GAL.vermelho}`, borderRadius: 10, textAlign: 'center'}}>
                <div style={{fontFamily: BUNGEE, fontSize: 44, color: GAL.vermelho}}>FRÁGIL</div>
                <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 28, color: GAL.preto}}>ENVIAR PRO CLIENTE 📦</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Galinha congelada com os óculos pixelados ----------

// Olhos no último quadro do clipe B (prints/reacao.png, 1080×1920): esquerdo (435, 531), direito (696, 549).
const OLHOS = {x: 565, y: 540, largura: 522, giro: 4};

// Óculos escuros de pixel (desenhados aqui: 2 lentes 7×4 com brilho e a ponte), grade de 18 colunas.
// Com 29 px por quadrado, o centro das lentes cai a 261 px um do outro, a distância entre os olhos.
const OculosPixel: React.FC<{largura: number}> = ({largura}) => {
  const px = largura / 18;
  const lente = [
    '1111111',
    '1221111',
    '1211111',
    '0111110',
  ];
  const quadrados: React.ReactNode[] = [];
  const desenha = (x0: number) =>
    lente.forEach((linha, y) =>
      Array.from(linha).forEach((c, x) => {
        if (c === '0') return;
        quadrados.push(<rect key={`${x0}-${x}-${y}`} x={(x0 + x) * px} y={y * px} width={px + 0.5} height={px + 0.5} fill={c === '2' ? '#FFFFFF' : '#000000'} />);
      }),
    );
  desenha(1);
  desenha(10);
  return (
    <svg width={largura} height={px * 4} viewBox={`0 0 ${largura} ${px * 4}`}>
      <rect x={0} y={0} width={largura} height={px} fill="#000" />
      {quadrados}
    </svg>
  );
};

// O mesmo enquadramento do fim do punch-in de "funciona" (escala 1,28), para o corte não pular.
const ESCALA_CONGELADA = 1.28;

const Congelada: React.FC<{oculos: number; zoom?: number}> = ({oculos, zoom = 1}) => {
  const escala = ESCALA_CONGELADA * zoom;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{scale: String(escala * 1.02), transformOrigin: '50% 32%', translate: `0px ${-(escala - 1) * 420}px`}}>
        <Img src={ARQ.reacao} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        {oculos > 0 && (
          <div style={{position: 'absolute', left: OLHOS.x - OLHOS.largura / 2, top: OLHOS.y - (OLHOS.largura / 18) * 2 + (1 - oculos) * -700, rotate: `${OLHOS.giro}deg`}}>
            <OculosPixel largura={OLHOS.largura} />
          </div>
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 55%, rgba(4,20,16,.45) 75%, rgba(4,20,16,.15) 100%)'}} />
    </AbsoluteFill>
  );
};

// Depois de "funciona": os óculos descem, "CONFIA 😎", e 1,2 s de grilos com a Galinha parada.
const Confia: React.FC<{t: number}> = ({t}) => {
  if (t < M.funcionaFim - 0.02 || t >= CH.chat + 0.15) return null;
  const desce = prog(t, M.funcionaFim, 0.5, Easing.linear);
  const sai = prog(t, CH.chat, 0.15);
  const pula = (i: number) => Math.max(0, Math.sin((t - CH.grilos) * 9 + i * 2)) * 30;
  return (
    <AbsoluteFill style={{zIndex: 4, opacity: 1 - sai}}>
      <Congelada oculos={desce} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center'}}>
        <Letreiro t={t} de={M.funcionaFim + 0.5} tamanho={92} rot={-4}>😎 CONFIA</Letreiro>
      </div>
      {t >= CH.grilos && (
        <>
        <div style={{position: 'absolute', left: 90, right: 90, top: 1330, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {[0, 1].map((i) => <div key={i} style={{fontSize: 140, translate: `0px ${-pula(i)}px`, scale: i ? '-1 1' : '1 1'}}>🦗</div>)}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1500, textAlign: 'center', fontFamily: INTER, fontStyle: 'italic', fontWeight: 700, fontSize: 46, color: GAL.branco, opacity: 0.85, textShadow: '0 4px 12px rgba(0,0,0,.6)'}}>cri… cri…</div>
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Reviravolta: a caixa chega no cliente, e lá funciona ----------

const Cliente: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const bloco = useBloco();
  const st = bloco(t, CH.cliente, CH.vitoria - 0.1, 30);
  if (!st) return null;
  const chega = prog(t, CH.cliente + 0.05, 0.45, saida);
  const abre = prog(t, CH.abre, 0.35, suave);
  const sobe = prog(t, CH.sobe, 0.4, saida);
  const brilho = 0.6 + 0.4 * Math.abs(Math.sin(t * 6));
  const msg = mola(t, CH.msgCliente, 12, 220);
  return (
    <AbsoluteFill style={{...st, zIndex: 4}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 270, display: 'flex', justifyContent: 'center'}}>
        <Letreiro t={t} de={CH.cliente} tamanho={58} cor={GAL.branco} fundo={GAL.azul} rot={-2}>📍 NO CLIENTE</Letreiro>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', translate: `0px ${(1 - chega) * -900}px`}}>
        <div style={{position: 'relative', width: 640, height: 640}}>
          {/* notebook saindo da caixa, com a tela verde */}
          <div style={{position: 'absolute', left: 120, top: interpolate(sobe, [0, 1], [300, -40]), opacity: sobe, filter: `drop-shadow(0 0 ${50 * brilho * sobe}px ${GAL.terminal})`}}>
            <Notebook w={400} />
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 300, bottom: 0, background: 'linear-gradient(180deg, #C98A4B, #A86C34)', border: '6px solid #6E4520', borderRadius: 10}} />
          <div style={{position: 'absolute', left: 40, width: 280, top: 300, height: 120, background: '#B97A3E', border: '6px solid #6E4520', transformOrigin: '0% 0%', rotate: `${interpolate(abre, [0, 1], [0, -130])}deg`}} />
          <div style={{position: 'absolute', right: 40, width: 280, top: 300, height: 120, background: '#B97A3E', border: '6px solid #6E4520', transformOrigin: '100% 0%', rotate: `${interpolate(abre, [0, 1], [0, 130])}deg`}} />
        </div>
      </div>
      {msg > 0.01 && (
        <div style={{position: 'absolute', left: 70, right: 70, top: 1150, opacity: msg, scale: String(0.85 + 0.15 * msg), transformOrigin: '0% 100%'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 26px', borderRadius: 30, background: GAL.branco, boxShadow: '0 20px 50px rgba(0,0,0,.45)'}}>
            <div style={{fontSize: 60}}>🧔</div>
            <div>
              <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 30, color: '#556'}}>Cliente</div>
              <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 46, color: GAL.preto}}>Agora funcionou! 👍</div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// A Galinha de óculos, "eu avisei", e o carimbo de comprovado.
const Vitoria: React.FC<{t: number}> = ({t}) => {
  if (t < CH.vitoria - 0.1 || t >= T.b + 0.1) return null;
  const entra = prog(t, CH.vitoria - 0.1, 0.12);
  const zoom = interpolate(t, [CH.vitoria, T.b], [0.92, 0.98], clamp);
  return (
    <AbsoluteFill style={{zIndex: 4, opacity: entra}}>
      <Congelada oculos={1} zoom={zoom} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1010, display: 'flex', justifyContent: 'center'}}>
        <Letreiro t={t} de={CH.vitoria} tamanho={80} rot={-3}>😌 EU AVISEI</Letreiro>
      </div>
      <Carimbo t={t} de={CH.vitoria + 0.3} cor={GAL.terminal} tamanho={44} rot={-6} style={{left: 70, top: 1230}}>
        <div style={{textAlign: 'center', lineHeight: 1.15}}>FUNCIONA NA MINHA MÁQUINA<br />✓ COMPROVADO</div>
      </Carimbo>
    </AbsoluteFill>
  );
};

// ---------- CTA ----------

const Marca: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.marca - 0.1 || t >= M.e - 0.05) return null;
  const e = mola(t, M.marca - 0.05, 11, 220);
  const c = mola(t, M.isso - 0.05, 12, 220);
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 262, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), rotate: '-2deg', zIndex: 6}}>
        <div style={{padding: '14px 28px', borderRadius: 999, background: GAL.preto, border: `4px solid ${GAL.amarelo}`, fontFamily: BUNGEE, fontSize: 50, color: GAL.amarelo}}>👇 MARCA AQUELE DEV</div>
      </div>
      {c > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 380, opacity: c, translate: `0px ${(1 - c) * 40}px`, zIndex: 6}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', borderRadius: 26, background: 'rgba(255,255,255,.96)', boxShadow: '0 16px 40px rgba(0,0,0,.4)'}}>
            <div style={{width: 60, height: 60, borderRadius: 99, background: GAL.azul, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34}}>🧑‍💻</div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: GAL.preto}}><b style={{color: GAL.azul}}>@dev_do_time</b> olha você aqui 😂</div>
          </div>
        </div>
      )}
    </>
  );
};

const BotaoSeguir: React.FC<{seguindo: boolean; pop: number}> = ({seguindo, pop}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '26px 28px', borderRadius: 36, background: GAL.preto, border: `4px solid ${GAL.amarelo}`, boxShadow: '0 30px 80px rgba(0,0,0,.55)'}}>
    <Img src={ARQ.logo} style={{width: 110, height: 110, borderRadius: 99, objectFit: 'cover', flexShrink: 0}} />
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: GAL.branco}}>galinhaprogramadora</div>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: GAL.cinza}}>memes e dicas de programação</div>
    </div>
    <div style={{padding: '20px 26px', borderRadius: 20, fontFamily: INTER, fontWeight: 800, fontSize: 34, color: seguindo ? GAL.branco : GAL.preto, background: seguindo ? 'rgba(255,255,255,.16)' : GAL.amarelo, scale: String(seguindo ? 0.9 + 0.1 * pop : 1), whiteSpace: 'nowrap'}}>
      {seguindo ? 'Seguindo ✓' : 'Seguir'}
    </div>
  </div>
);

const Seguir: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const de = M.e - 0.05;
  const ate = VOLTA;
  if (t < de - 0.05) return null;
  const toque = M.seguir + 0.12;
  const cheio = t < ate + 0.12;
  const e = mola(t, de, 12, 200);
  if (cheio) {
    return (
      <AbsoluteFill style={{zIndex: 4, opacity: 1 - prog(t, ate, 0.12)}}>
        <Fundo t={t} />
        <div style={{position: 'absolute', left: 50, right: 50, top: 760, opacity: e, scale: String(0.85 + 0.15 * e)}}>
          <BotaoSeguir seguindo={t >= toque} pop={mola(t, toque, 9, 260)} />
        </div>
        <Toque t={t} de={de + 0.05} toque={toque} x={800} y={800} />
      </AbsoluteFill>
    );
  }
  // De volta à Galinha: o selo de seguindo fica no topo até o fim.
  if (t >= T.fim) return null;
  const s = mola(t, ate, 11, 220);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 270, display: 'flex', justifyContent: 'center', opacity: s, scale: String(interpolate(s, [0, 1], [1.5, 1])), zIndex: 6}}>
      <div style={{padding: '14px 28px', borderRadius: 999, background: GAL.preto, border: `4px solid ${GAL.terminal}`, fontFamily: BUNGEE, fontSize: 44, color: GAL.terminal}}>✓ SEGUINDO A GALINHA</div>
    </div>
  );
};

const Encerramento: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.fim - 0.1) return null;
  const logo = mola(t, T.fim + 0.08, 11, 170);
  const arroba = mola(t, T.fim + 0.35);
  return (
    <AbsoluteFill style={{zIndex: 9, alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill style={{background: GAL.verde}} />
      <AbsoluteFill style={{opacity: 0.35, rotate: `${t * 6}deg`, scale: '2', background: `repeating-conic-gradient(from 0deg at 50% 50%, #2E8F73 0deg 1.6deg, transparent 1.6deg 9deg)`}} />
      <Img src={ARQ.logo} style={{width: 640, height: 640, borderRadius: 60, boxShadow: '0 30px 90px rgba(0,0,0,.35), 0 0 0 8px #111', scale: String(logo), rotate: `${(1 - logo) * -20}deg`}} />
      <div style={{marginTop: 50, fontFamily: BUNGEE, fontSize: 64, color: GAL.preto, opacity: arroba, translate: `0px ${(1 - arroba) * 30}px`}}>@galinhaprogramadora</div>
    </AbsoluteFill>
  );
};

// ---------- Legenda dinâmica (Montserrat 900, palavra falada em amarelo sobre preto) ----------

// Como a palavra aparece na legenda (o Whisper escreve "para a" onde a voz diz "pra", "seguir" onde diz "segue").
const LEGENDA = (() => {
  const L: {w: string; s: number; e: number}[] = [];
  // "A frase mais" já está escrito no letreiro da abertura.
  for (const p of P.filter((x) => x.s >= M.perigosa)) {
    const w = norm(p.w);
    const ant = L[L.length - 1];
    if (w === 'feira' && ant && norm(ant.w) === 'sexta') {
      ant.w = 'SEXTA-FEIRA,';
      ant.e = p.e;
      continue;
    }
    if (w === 'a' && ant && norm(ant.w) === 'pra') {
      ant.e = p.e;
      continue;
    }
    const troca: Record<string, string> = {para: 'PRA', deve: 'DEV', seguir: 'SEGUE', segui: 'SEGUE', funciona: 'FUNCIONA!'};
    L.push({...p, w: troca[w] ?? p.w});
  }
  return L;
})();

const SEM_LEGENDA: [number, number][] = [
  [0, M.perigosa - 0.06],
  [M.minha + 0.04, M.funciona - 0.08],
  [M.funcionaFim, T.b],
  [M.e - 0.05, VOLTA],
];
const COR_ESPECIAL: Record<string, string> = {'cai.': GAL.vermelho, 'FUNCIONA!': GAL.rosa, perigosa: GAL.vermelho};

const Legenda: React.FC = () => {
  const t = useT();
  const mola = useMola();
  const grupos = React.useMemo(() => {
    const G: typeof LEGENDA[] = [];
    for (const p of LEGENDA) {
      const atual = G[G.length - 1];
      const ultima = atual?.[atual.length - 1];
      const quebra = !atual || atual.length >= 3 || /[.,?!]$/.test(ultima.w) || p.s - ultima.e > 0.25;
      if (quebra) G.push([p]);
      else atual.push(p);
    }
    return G;
  }, []);
  if (t >= T.fim || SEM_LEGENDA.some(([a, b]) => t >= a && t < b)) return null;
  const i = grupos.findIndex((g, k) => t >= g[0].s && t < Math.min(grupos[k + 1]?.[0].s ?? Infinity, g[g.length - 1].e + 0.6));
  if (i < 0) return null;
  const grupo = grupos[i];
  const ativa = [...grupo].reverse().find((p) => t >= p.s);
  const {presenca} = estadoEm(t);
  const topo = presenca > 0.5 ? 1110 : 1360;
  return (
    <AbsoluteFill style={{zIndex: 8}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: topo, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '6px 18px', fontFamily: MONT, fontWeight: 900, fontSize: 76, lineHeight: 1.12, letterSpacing: -0.5}}>
        {grupo
          .filter((p) => t >= p.s)
          .map((p) => {
            const pop = mola(t, p.s, 13, 200);
            const eAtiva = p === ativa;
            const especial = COR_ESPECIAL[p.w];
            return (
              <span
                key={p.s}
                style={{
                  display: 'inline-block', padding: '2px 16px', borderRadius: 16,
                  color: eAtiva ? (especial ? GAL.branco : GAL.amarelo) : GAL.branco,
                  background: eAtiva ? especial ?? GAL.preto : 'transparent',
                  scale: String(0.75 + 0.25 * pop), opacity: pop,
                  textShadow: eAtiva ? 'none' : '0 4px 0 rgba(0,0,0,.5), 0 8px 30px rgba(0,0,0,.6)',
                  WebkitTextStroke: eAtiva ? undefined : '2px rgba(0,0,0,.6)',
                  boxShadow: eAtiva ? '0 8px 0 rgba(0,0,0,.35)' : undefined,
                }}
              >
                {p.w.replace(/[.,]$/, '').toUpperCase()}
              </span>
            );
          })}
      </div>
    </AbsoluteFill>
  );
};

// Wipe rosa → verde nas trocas de bloco (a cor da crista e a do fundo da logo).
const Wipe: React.FC<{t: number; corte: number}> = ({t, corte}) => {
  const p = interpolate(t, [corte - 0.22, corte + 0.22], [0, 1], {...clamp, easing: suave});
  if (p <= 0 || p >= 1) return null;
  return (
    <AbsoluteFill style={{translate: `0px ${(1 - p * 2) * 100}%`, zIndex: 10}}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${GAL.amarelo} 0%, ${GAL.rosa} 14%, ${GAL.rosa} 86%, ${GAL.verde} 100%)`, transform: 'skewY(-6deg) scale(1.2)'}} />
    </AbsoluteFill>
  );
};

// ---------- Sons ----------

type Evento = {som: string; em: number; volume: number};

const sonsDaCamera = (): Evento[] => {
  const ev: Evento[] = [];
  ESTADOS.forEach((e, i) => {
    if (i && e.punch) ev.push({som: 'whoosh_in', em: e.de - 0.27, volume: 0.5}, {som: 'impacto', em: e.de, volume: 0.5});
  });
  return ev;
};

const EVENTOS: Evento[] = [
  ...sonsDaCamera(),
  // Abertura
  {som: 'alarme', em: 0, volume: 0.45},
  {som: 'impacto', em: 0.02, volume: 0.5},
  {som: 'impacto', em: M.mais - 0.05, volume: 0.55},
  {som: 'alarme', em: M.perigosa - 0.06, volume: 0.35},
  // Sexta, 18h
  {som: 'swoosh', em: T.meio - 0.32, volume: 0.6},
  {som: 'pop', em: T.meio + 0.05, volume: 0.45},
  {som: 'tique', em: M.seis - 0.1, volume: 0.5},
  {som: 'tique', em: M.seis + 0.25, volume: 0.5},
  {som: 'ding', em: M.tarde, volume: 0.5},
  // Terminal
  {som: 'swoosh', em: M.o - 0.2, volume: 0.35},
  {som: 'tecla', em: M.codigo - 0.1, volume: 0.45},
  {som: 'tecla', em: M.roda, volume: 0.45},
  {som: 'ding', em: M.lindo, volume: 0.4},
  {som: 'pop', em: M.computador - 0.1, volume: 0.4},
  {som: 'impacto', em: M.computador + 0.1, volume: 0.45},
  // Deploy
  {som: 'swoosh', em: M.ai - 0.2, volume: 0.35},
  {som: 'toque', em: M.producao, volume: 0.7},
  {som: 'whoosh_in', em: M.producao + 0.05, volume: 0.4},
  // Desastre
  {som: 'disco', em: M.sistema - 0.15, volume: 0.6},
  {som: 'impacto', em: M.sistema - 0.12, volume: 0.7},
  {som: 'alarme', em: M.sistema - 0.05, volume: 0.55},
  {som: 'pop', em: M.sistema + 0.1, volume: 0.35},
  {som: 'pop', em: M.sistema + 0.36, volume: 0.35},
  {som: 'impacto', em: M.cai - 0.05, volume: 0.8},
  {som: 'vibra', em: M.cai + 0.05, volume: 0.6},
  {som: 'boom', em: M.cai + 0.25, volume: 0.7},
  {som: 'pop', em: M.cai + 0.45, volume: 0.45},
  // Frase
  {som: 'impacto', em: T.frase, volume: 0.5},
  {som: 'pop', em: M.minha + 0.04, volume: 0.45},
  {som: 'impacto', em: M.maquina - 0.04, volume: 0.5},
  {som: 'boom', em: M.funciona - 0.08, volume: 0.6},
  // Óculos e grilos
  {som: 'whoosh_in', em: M.funcionaFim, volume: 0.4},
  {som: 'impacto', em: M.funcionaFim + 0.5, volume: 0.55},
  {som: 'grilos', em: CH.grilos + 0.05, volume: 0.6},
  // Chefe
  {som: 'swoosh', em: CH.chat - 0.1, volume: 0.4},
  {som: 'tecla', em: CH.digita, volume: 0.35},
  {som: 'pop', em: CH.msg, volume: 0.5},
  {som: 'whoosh_in', em: CH.caixa - 0.1, volume: 0.45},
  {som: 'impacto', em: CH.caixa + 0.55, volume: 0.45},
  {som: 'whoosh_out', em: CH.fecha - 0.1, volume: 0.35},
  {som: 'impacto', em: CH.rotulo, volume: 0.45},
  {som: 'fita', em: CH.fita, volume: 0.6},
  {som: 'whoosh_out', em: CH.vai - 0.05, volume: 0.55},
  {som: 'trombone', em: CH.vai - 0.1, volume: 0.6},
  // Reviravolta
  {som: 'whoosh_in', em: CH.cliente, volume: 0.45},
  {som: 'impacto', em: CH.cliente + 0.45, volume: 0.45},
  {som: 'whoosh_out', em: CH.abre, volume: 0.35},
  {som: 'ding', em: CH.sobe + 0.2, volume: 0.5},
  {som: 'pop', em: CH.msgCliente, volume: 0.5},
  {som: 'plim', em: CH.vitoria, volume: 0.6},
  {som: 'impacto', em: CH.vitoria + 0.3, volume: 0.55},
  // CTA
  {som: 'swoosh', em: T.b - 0.32, volume: 0.6},
  {som: 'pop', em: M.marca - 0.05, volume: 0.45},
  {som: 'pop', em: M.isso - 0.05, volume: 0.4},
  {som: 'whoosh_out', em: M.e - 0.2, volume: 0.45},
  {som: 'toque', em: M.seguir + 0.12, volume: 0.7},
  {som: 'ding', em: M.seguir + 0.14, volume: 0.5},
  {som: 'pop', em: VOLTA, volume: 0.4},
  // Tela final
  {som: 'swoosh', em: T.fim - 0.32, volume: 0.6},
  {som: 'impacto', em: T.fim + 0.08, volume: 0.5},
];

const GERAL = 0.8;

// ---------- Montagem ----------

export const NaMinhaMaquina: React.FC = () => {
  const t = useT();
  const {fps, durationInFrames} = useVideoConfig();
  const q = (s: number) => Math.round(s * fps);
  return (
    <AbsoluteFill style={{background: GAL.verdeNoite}}>
      {/* Narração em duas partes: a pausa muda do chefe entra entre a frase e o CTA. */}
      <Sequence name="Narração · até a frase" durationInFrames={q(T.chefe)} layout="none">
        <Audio src={ARQ.narracao} />
      </Sequence>
      <Sequence name="Narração · CTA" from={q(T.b)} layout="none">
        <Audio src={ARQ.narracao} trimBefore={q(TRECHOS.b)} />
      </Sequence>
      {EVENTOS.map((e, i) => (
        <Sequence key={i} name={`sfx · ${e.som}`} from={Math.max(0, q(e.em))} layout="none">
          <Audio src={ARQ.sfx(e.som)} volume={e.volume * GERAL} />
        </Sequence>
      ))}

      <Sequence name="Fundo" durationInFrames={durationInFrames}>
        <Fundo t={t} />
      </Sequence>
      <Sequence name="A · gancho" from={0} durationInFrames={q(T.meio)} premountFor={fps}>
        <Camera src={ARQ.clipe('A')} t={t} />
      </Sequence>
      <Sequence name="B · frase" from={q(T.frase)} durationInFrames={q(T.chefe) - q(T.frase) + 2} premountFor={fps}>
        <Camera src={ARQ.clipe('B')} t={t} />
      </Sequence>
      <Sequence name="C · CTA" from={q(T.b)} durationInFrames={q(T.fim) - q(T.b) + 3} premountFor={fps}>
        <Camera src={ARQ.clipe('C')} t={t} />
      </Sequence>

      <Abertura t={t} />
      <Alerta t={t} />
      <Pov t={t} />
      <Relogio t={t} />
      <Terminal t={t} />
      <Deploy t={t} />
      <CardVoz t={t} />
      <Desastre t={t} />
      <Notificacoes t={t} />
      <NaMinha t={t} />
      <Chefe t={t} />
      <Confia t={t} />
      <Caixa t={t} />
      <Cliente t={t} />
      <Vitoria t={t} />
      <Marca t={t} />
      <Seguir t={t} />
      <Legenda />
      <Encerramento t={t} />
      <Textura grao={0.06} />
      <Wipe t={t} corte={T.meio} />
      <Wipe t={t} corte={T.b} />
      <Wipe t={t} corte={T.fim} />
    </AbsoluteFill>
  );
};
