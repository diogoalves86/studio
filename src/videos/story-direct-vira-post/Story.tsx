import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Risco, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 010 · Story que gera valor e chama para criar a conta: "não sabe o que postar? abre o seu direct; cada pergunta
// do cliente é um post pronto" → o Digo Social sugere, cria e só publica depois da aprovação → 7 dias grátis, sem
// cartão → "toca no link aqui embaixo", com a moldura livre para a figurinha de link até o último quadro.

const T = TRECHOS;
const M = {
  ne: em('né'),
  abre: em('abre'),
  cada: em('cada'),
  pronto: em('pronto'),
  tem: em('tem'),
  p: em('p'),
  vira: em('vira'),
  guia: em('guia'),
  entrega: em('entrega'),
  bairro: em('bairro'),
  vira2: em('vira', em('bairro')),
  onde: em('onde'),
  e: em('e', em('entrega', em('onde'))),
  noite: em('noite'),
  digo: em('digo'),
  sugere: em('sugere'),
  cria: em('cria'),
  imagem: em('imagem'),
  legenda: em('legenda'),
  publica: em('publica'),
  aprova: em('aprova'),
  cria2: em('cria', em('aprova')),
  sao: em('são'),
  sete: em('sete'),
  sem: em('sem'),
  cartao: em('cartão'),
  toca: em('toca'),
  link: em('link'),
};

// Momentos artificiais (sincronia.md): A 1,23–1,44 «Abre» → motion do direct desde pouco antes;
// B 19,24–21,10 (lento) → card "7 dias grátis" em tela cheia; 21,72–21,92 → transição para o "toca no link".
const SAI_1 = M.abre - 0.14;
const SAI_B = M.sao - 0.4;
const VOLTA_B = M.toca - 0.26;

// Moldura livre para a figurinha de link (coordenadas 1080×1920).
export const LINK = {left: 190, top: 1380, width: 700, height: 240};

const digitar = (t: number, de: number, ate: number, texto: string) => {
  const L = Array.from(texto);
  return L.slice(0, Math.round(interpolate(t, [de, ate], [0, L.length], clamp))).join('');
};
const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;

// ---------- Abertura ----------

const Gancho: React.FC<{t: number}> = ({t}) => {
  if (t >= SAI_1 + 0.1) return null;
  const sai = prog(t, SAI_1 - 0.15, 0.25);
  return (
    <div style={{position: 'absolute', left: 110, right: 110, top: 240, padding: '14px 10px', borderRadius: 26, background: 'rgba(5,10,30,.62)', border: `3px solid ${COR.amarelo}`, scale: String((1 + 0.015 * Math.sin(t * 6)) * (1 - 0.1 * sai)), opacity: 1 - sai, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 52, lineHeight: 1.08, color: COR.branco}}>
      NÃO SABE O QUE <span style={{color: COR.amarelo}}>POSTAR?</span>
    </div>
  );
};

// ---------- Celular com a caixa do direct (padrão do app, sem marca) ----------

const CONVERSAS = [
  {nome: 'ju.martins', msg: 'Tem tamanho P? 👗', cor: '#E76F51', emoji: '👩'},
  {nome: 'carla_s', msg: 'Entrega no meu bairro?', cor: '#2A9D8F', emoji: '👩‍🦱'},
  {nome: 'bia.rocha', msg: 'Quanto tá o kit de 3?', cor: '#3A86FF', emoji: '👱‍♀️'},
  {nome: 'paulo.r', msg: 'Vocês fazem presente?', cor: '#8338EC', emoji: '🧔'},
];

const Direct: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_1, M.tem - 0.12, 0);
  if (!st) return null;
  const tel = mola(t, SAI_1, 12, 180);
  const destaque = prog(t, M.cada, 0.4);
  const pronto = mola(t, M.pronto, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 250, top: 520, width: 580, height: 740, borderRadius: 60, border: '12px solid #1B2238', background: '#000', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.65)', scale: String(0.7 + 0.3 * tel), opacity: tel}}>
        <div style={{position: 'absolute', left: '50%', top: 10, width: 140, height: 30, borderRadius: 99, background: '#000', translate: '-50% 0'}} />
        <div style={{padding: '60px 26px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 32, color: '#fff'}}>‹ docesdaana ˅</div>
          <div style={{fontSize: 30}}>📝</div>
        </div>
        <div style={{margin: '8px 22px 14px', height: 56, borderRadius: 14, background: '#262626', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 12, fontFamily: INTER, fontSize: 26, color: '#8E8E8E'}}>🔍 Pesquisar</div>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 26px 12px', fontFamily: INTER, fontWeight: 700, fontSize: 26, color: '#fff'}}>
          <span>Mensagens</span>
          <span style={{color: '#3797F0'}}>Pedidos (4)</span>
        </div>
        {CONVERSAS.map((c, i) => {
          const e = mola(t, SAI_1 + 0.15 + i * 0.25, 13, 210);
          const luz = destaque * (i < 2 ? 1 : 0.4);
          return (
            <div key={c.nome} style={{display: 'flex', alignItems: 'center', gap: 18, margin: '0 12px', padding: '14px 14px', borderRadius: 18, background: i < 2 ? `rgba(55,151,240,${0.2 * luz})` : 'transparent', opacity: e, translate: `${(1 - e) * 120}px 0px`}}>
              <div style={{width: 84, height: 84, borderRadius: 99, background: c.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, flexShrink: 0}}>{c.emoji}</div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: '#fff'}}>{c.nome}</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 26, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{c.msg}</div>
              </div>
              {pronto > 0.01 && i < 2 ? (
                <div style={{padding: '6px 12px', borderRadius: 10, background: COR.verde, fontFamily: MONT, fontWeight: 900, fontSize: 18, color: COR.marinho, scale: String(pronto), whiteSpace: 'nowrap'}}>= POST</div>
              ) : (
                <div style={{width: 18, height: 18, borderRadius: 99, background: '#3797F0'}} />
              )}
            </div>
          );
        })}
      </div>
      {pronto > 0.01 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 425, display: 'flex', justifyContent: 'center', opacity: pronto, scale: String(0.6 + 0.4 * pronto)}}>
          <Pilula cor={COR.verde} tamanho={44} fundo="rgba(10,40,40,.94)">💬 PERGUNTA = 📸 POST PRONTO</Pilula>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Meio: a pergunta vira post ----------

const Bolha: React.FC<{texto: string; e: number; x: number; y: number}> = ({texto, e, x, y}) => (
  <div style={{position: 'absolute', left: x, top: y, maxWidth: 420, padding: '22px 28px', borderRadius: '32px 32px 32px 8px', background: '#262626', fontFamily: INTER, fontWeight: 600, fontSize: 36, color: '#fff', opacity: e, scale: String(0.7 + 0.3 * e), transformOrigin: '0% 100%', boxShadow: '0 16px 40px rgba(0,0,0,.5)'}}>{texto}</div>
);

const Seta: React.FC<{k: number; x: number; y: number}> = ({k, x, y}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 90 * k, height: 10, borderRadius: 99, background: COR.ciano, boxShadow: `0 0 16px ${COR.ciano}`}}>
    {k > 0.9 && <div style={{position: 'absolute', right: -6, top: -14, width: 0, height: 0, borderTop: '19px solid transparent', borderBottom: '19px solid transparent', borderLeft: `26px solid ${COR.ciano}`}} />}
  </div>
);

const PostCard: React.FC<{e: number; x: number; y: number; cor: string; titulo: string; children: React.ReactNode}> = ({e, x, y, cor, titulo, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 400, height: 340, borderRadius: 26, overflow: 'hidden', background: `linear-gradient(150deg, ${cor}, #0A1430)`, border: '4px solid rgba(255,255,255,.85)', boxShadow: '0 30px 70px rgba(0,0,0,.55)', opacity: e, scale: String(0.6 + 0.4 * e), rotate: `${(1 - e) * 12 + 2}deg`, padding: 24, boxSizing: 'border-box'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 38, lineHeight: 1.05, color: COR.branco}}>{titulo}</div>
    <div style={{marginTop: 18}}>{children}</div>
  </div>
);

const ViraPost: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.tem - 0.12, M.e - 0.1);
  if (!st) return null;
  const b1 = mola(t, M.tem, 12, 220);
  const s1 = prog(t, M.vira, 0.4, saida);
  const p1 = mola(t, M.vira + 0.15, 11, 200);
  const b2 = mola(t, M.entrega, 12, 220);
  const s2 = prog(t, M.vira2, 0.4, saida);
  const p2 = mola(t, M.vira2 + 0.15, 11, 200);
  const tamanhos = ['P', 'M', 'G'];
  const bairros = ['Centro ✓', 'Batel ✓', 'Água Verde ✓'];
  return (
    <AbsoluteFill style={st}>
      <Bolha texto="Tem tamanho P? 👗" e={b1} x={50} y={560} />
      <Seta k={s1} x={470} y={620} />
      <PostCard e={p1} x={600} y={450} cor="#C2378A" titulo="GUIA DE TAMANHOS">
        <div style={{display: 'flex', gap: 14}}>
          {tamanhos.map((tm, i) => {
            const e = mola(t, M.guia + i * 0.12, 11, 230);
            return <div key={tm} style={{flex: 1, height: 70 + i * 40, borderRadius: 14, background: 'rgba(255,255,255,.18)', border: '3px solid #fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#fff', scale: String(e), transformOrigin: '50% 100%'}}>{tm}</div>;
          })}
        </div>
      </PostCard>
      <Bolha texto="Entrega no meu bairro? 📍" e={b2} x={50} y={940} />
      <Seta k={s2} x={470} y={1000} />
      <PostCard e={p2} x={600} y={850} cor="#2A9D8F" titulo="ONDE A GENTE ENTREGA 📍">
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {bairros.map((bb, i) => {
            const e = mola(t, M.onde + i * 0.15, 12, 220);
            return <div key={bb} style={{padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,.16)', fontFamily: INTER, fontWeight: 700, fontSize: 26, color: '#fff', opacity: e, translate: `${(1 - e) * 40}px 0px`}}>{bb}</div>;
          })}
        </div>
      </PostCard>
    </AbsoluteFill>
  );
};

// ---------- Meio: a noite no Canva ----------

const Noite: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.e - 0.1, M.digo - 0.15);
  if (!st) return null;
  const min = Math.round(interpolate(t, [M.e, M.noite + 0.6], [19 * 60, 23 * 60 + 47], clamp));
  const hora = `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}`;
  const barra = interpolate(t, [M.e, M.digo], [0.1, 0.6], clamp);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 540, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.cinza, letterSpacing: 3}}>🌙 MONTANDO O POST…</div>
      <div style={{position: 'absolute', top: 610, fontFamily: MONT, fontWeight: 900, fontSize: 230, lineHeight: 1, color: min > 22 * 60 ? COR.vermelho : COR.branco, fontVariantNumeric: 'tabular-nums'}}>{hora}</div>
      <div style={{position: 'absolute', left: 160, right: 160, top: 900, padding: 30, ...caixa}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza}}>no Canva, pela 3ª vez…</div>
        <div style={{marginTop: 18, height: 24, borderRadius: 99, background: 'rgba(255,255,255,.1)'}}>
          <div style={{width: `${barra * 100}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${COR.azul}, ${COR.ciano})`}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: o Digo Social sugere, cria e só publica depois da aprovação ----------

const SUGESTAO = 'Responda as dúvidas de tamanho num "Guia de tamanhos".';
const LEGENDA_POST = 'Ficou na dúvida do tamanho? Salva esse guia 👇';

const Digo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.digo - 0.15, T.b - 0.1);
  if (!st) return null;
  const logo = mola(t, M.digo - 0.1, 11, 190);
  const sug = mola(t, M.sugere - 0.1, 12, 200);
  const pronto = mola(t, M.cria - 0.1, 12, 200);
  const aprovado = t >= M.aprova + 0.12;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: logo, scale: String(0.6 + 0.4 * logo)}}>
        <Img src={ARQ.logo} style={{width: 90, height: 90, borderRadius: 22}} />
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco}}>Digo Social</div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 570, padding: 30, ...caixa, opacity: sug * (1 - 0.4 * pronto), scale: String((0.9 + 0.1 * sug) * (1 - 0.06 * pronto))}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.ciano, letterSpacing: 2}}>💡 O DIGO SUGERE</div>
        <div style={{marginTop: 12, fontFamily: MONT, fontWeight: 800, fontSize: 40, lineHeight: 1.2, color: COR.branco}}>
          {digitar(t, M.sugere, M.cria - 0.2, SUGESTAO)}
          {t < M.cria - 0.2 && <Cursor t={t} />}
        </div>
      </div>
      {pronto > 0.01 && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 790, padding: 30, ...caixa, border: `4px solid ${COR.verde}`, opacity: pronto, translate: `0px ${(1 - pronto) * 80}px`}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.verde, letterSpacing: 2}}>POST PRONTO</div>
          <div style={{marginTop: 14, display: 'flex', gap: 20, alignItems: 'center'}}>
            <div style={{width: 150, height: 150, borderRadius: 18, background: 'linear-gradient(150deg, #C2378A, #0A1430)', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 26, color: '#fff', textAlign: 'center', opacity: mola(t, M.imagem, 12, 210), flexShrink: 0}}>GUIA DE<br />TAMANHOS</div>
            <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 30, lineHeight: 1.3, color: COR.branco}}>
              {digitar(t, M.legenda, M.publica - 0.1, LEGENDA_POST)}
              {t >= M.legenda && t < M.publica && <Cursor t={t} />}
            </div>
          </div>
          <div style={{marginTop: 20, padding: '20px 0', borderRadius: 20, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 34, color: aprovado ? COR.marinho : COR.branco, background: aprovado ? COR.verde : COR.azul, opacity: mola(t, M.publica, 12, 210)}}>
            {aprovado ? 'Agendado ✓ amanhã, 10h' : 'Aprovar e publicar'}
          </div>
        </div>
      )}
      <Toque t={t} de={M.publica + 0.1} toque={M.aprova} x={640} y={1150} />
    </AbsoluteFill>
  );
};

// ---------- Fechamento: criar a conta + espaço do link ----------

const CriaConta: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.cria2 - 0.05 || t >= SAI_B + 0.1) return null;
  const e = mola(t, M.cria2, 10, 230);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1]))}}>
      <Pilula cor={COR.ciano} tamanho={64} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)">✨ CRIA SUA CONTA</Pilula>
    </div>
  );
};

const Gratis: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_B, VOLTA_B - 0.02, 0);
  if (!st) return null;
  const e = mola(t, M.sete - 0.15, 10, 200);
  const sem = mola(t, M.sem, 12, 210);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 470, width: 640, padding: '50px 30px', borderRadius: 56, textAlign: 'center', background: 'linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)', boxShadow: '0 40px 100px rgba(47,123,255,.5)', scale: String(interpolate(e, [0, 1], [1.6, 1])), opacity: e, rotate: `${-4 + (1 - e) * 10}deg`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 250, lineHeight: 0.9, color: COR.branco}}>7</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 80, color: COR.branco}}>DIAS GRÁTIS</div>
      </div>
      <div style={{position: 'absolute', top: 1030, display: 'flex', alignItems: 'center', gap: 22, opacity: sem, translate: `${(1 - sem) * -70}px 0px`}}>
        <div style={{position: 'relative', fontSize: 90}}>
          💳
          <Risco t={t} de={M.cartao} espessura={12} />
        </div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 76, color: COR.branco}}>SEM CARTÃO</div>
      </div>
    </AbsoluteFill>
  );
};

// Seta "TOCA AQUI" + moldura livre: a figurinha de link é colada dentro dela no Instagram.
const EspacoLink: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < VOLTA_B - 0.05) return null;
  const e = mola(t, VOLTA_B, 12, 200);
  const pulo = Math.abs(Math.sin((t - VOLTA_B) * 5)) * 18;
  const brilho = 0.45 + 0.35 * Math.abs(Math.sin(t * 3));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1250, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.6 + 0.4 * e), translate: `0px ${pulo}px`}}>
        <Pilula cor={COR.amarelo} tamanho={52} fundo="rgba(40,30,5,.94)">TOCA AQUI 👇</Pilula>
      </div>
      <div style={{position: 'absolute', ...LINK, borderRadius: 40, border: `5px dashed rgba(255,210,94,${brilho * e})`, background: `rgba(5,10,30,${0.6 * e})`, backdropFilter: `blur(${8 * e}px)`, boxShadow: `0 0 ${40 * brilho}px rgba(255,210,94,${0.35 * e})`}} />
    </>
  );
};

// ---------- Meio: card de voz ----------

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

const Grade: React.FC<{t: number}> = ({t}) => {
  const o = prog(t, T.meio, 0.4) * (1 - prog(t, T.b - 0.3, 0.3));
  if (o <= 0) return null;
  return <AbsoluteFill style={{opacity: 0.22 * o, backgroundImage: 'radial-gradient(rgba(62,198,255,.9) 2px, transparent 2.5px)', backgroundSize: '54px 54px', backgroundPosition: `${(t * 8) % 54}px ${(t * 14) % 54}px`, maskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 75%)'}} />;
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Grade t={t} />
      <Gancho t={t} />
      <Direct t={t} />
      <ViraPost t={t} />
      <Noite t={t} />
      <Digo t={t} />
      <CardVoz t={t} />
      <CriaConta t={t} />
      <Gratis t={t} />
      <EspacoLink t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'pop', em: 0.05, volume: 0.4},
  {som: 'swoosh', em: SAI_1, volume: 0.5},
  ...[0, 1, 2, 3].map((i): Evento => ({som: 'ding', em: SAI_1 + 0.15 + i * 0.25, volume: 0.3})),
  {som: 'pop', em: M.pronto, volume: 0.5},
  {som: 'whoosh_in', em: M.tem - 0.3, volume: 0.45},
  {som: 'pop', em: M.tem, volume: 0.45},
  {som: 'swoosh', em: M.vira, volume: 0.45},
  {som: 'impacto', em: M.vira + 0.15, volume: 0.45},
  {som: 'pop', em: M.entrega, volume: 0.45},
  {som: 'swoosh', em: M.vira2, volume: 0.45},
  {som: 'impacto', em: M.vira2 + 0.15, volume: 0.45},
  {som: 'whoosh_in', em: M.e - 0.3, volume: 0.45},
  ...passos(M.e, M.noite + 0.6, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  {som: 'whoosh_in', em: M.digo - 0.4, volume: 0.45},
  {som: 'impacto', em: M.digo, volume: 0.45},
  ...passos(M.sugere, M.cria - 0.2, 8).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  {som: 'pop', em: M.cria - 0.1, volume: 0.45},
  ...passos(M.legenda, M.publica - 0.1, 5).map((s): Evento => ({som: 'tecla', em: s, volume: 0.5})),
  {som: 'toque', em: M.aprova, volume: 0.7},
  {som: 'ding', em: M.aprova + 0.12, volume: 0.5},
  {som: 'impacto', em: M.cria2, volume: 0.5},
  {som: 'swoosh', em: SAI_B, volume: 0.45},
  {som: 'impacto', em: M.sete - 0.15, volume: 0.55},
  {som: 'risco', em: M.cartao, volume: 0.45},
  {som: 'pop', em: VOLTA_B, volume: 0.5},
  {som: 'ding', em: M.link, volume: 0.45},
];

// Legenda: "P?" fica "P?" (o Whisper acerta); a legenda some no CTA para não cobrir a moldura do link.
export const CONFIG: Config = {
  palavras: PALAVRAS,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: M.ne, modo: 'cheia', escala: [1.09, 1.13], punch: true},
    {de: SAI_1, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.05]},
    {de: SAI_B, modo: 'fora'},
    {de: VOLTA_B, modo: 'cheia', escala: [1.06, 1.1], punch: true},
  ],
  semLegenda: [
    [SAI_1, T.meio],
    [M.cria2 - 0.05, T.fim],
  ],
  corEspecial: {'pronto.': COR.verde, 'aprova.': COR.verde},
  eventos: EVENTOS,
  Cena,
};
