import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check} from '../reels-avatar/Icones';
import {contar, Palavras, Selo, Toque} from '../destaques-instagram/Componentes';
import {Loja} from '../destaques-instagram/Icones';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 004 · Reels do feed, sexta à noite: sexta 22h montando post no Canva → 3 curtidas → o Digo deixa o fim de
// semana agendado → "Segue o Digo Social" (CTA para seguir o perfil, nunca link).
// Economia de créditos: avatar só na abertura e no CTA; no meio, a foto oficial num card de voz.

const T = TRECHOS;
const M = {
  e: em('e'),
  voce: em('você'),
  montando: em('montando'),
  lojinha: em('lojinha'),
  abriu: em('abriu'),
  // O Whisper ouviu "canvas set" em "Canva às sete".
  canva: em('canvas'),
  trocou: em('trocou'),
  fonte: em('fonte'),
  trocou2: em('trocou', em('fonte')),
  cor: em('cor'),
  refez: em('refez'),
  tres: em('três'),
  quando: em('quando'),
  meia: em('meia'),
  oPost: em('e', em('meia')),
  tres2: em('três', em('meia')),
  curtidas: em('curtidas'),
  agora: em('agora'),
  fechar: em('fechar'),
  loja: em('loja'),
  fim: em('fim'),
  postado: em('postado'),
  o: em('o', em('postado')),
  digo: em('digo'),
  sugere: em('sugere'),
  cria: em('cria'),
  imagem: em('imagem'),
  legenda: em('legenda', em('cria')),
  agenda: em('agenda'),
  instagram: em('instagram'),
  facebook: em('facebook'),
  voce2: em('você', em('facebook')),
  aprova: em('aprova'),
  segue: em('segue'),
  social: em('social', em('segue')),
  e2: em('e', em('segue')),
  curtir: em('curtir'),
};

// Momentos artificiais (sincronia.md): 1,32–1,59 «e você» → motion cheio; 2,18–2,33 «montando post» → card;
// 22,27–22,46 «e vai» → motion cheio; 23,43–23,56 «sexta.» → wipe da tela final.
const SAI_1 = M.e - 0.1;
const CARD_1 = M.montando - 0.04;
const SAI_2 = M.e2 - 0.04;

// ---------- Abertura ----------

const RelogioTopo: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t >= T.meio) return null;
  const e = mola(t, 0.05, 12, 200);
  const pisca = Math.floor(t * 2) % 2 ? 0.25 : 1;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 268, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.7 + 0.3 * e)}}>
      <div style={{padding: '18px 40px', borderRadius: 26, background: 'rgba(5,10,30,.82)', border: `3px solid ${COR.ciano}`, fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco, fontVariantNumeric: 'tabular-nums', boxShadow: '0 16px 50px rgba(0,0,0,.5)'}}>
        <span style={{color: COR.ciano}}>SEX</span> · 22<span style={{opacity: pisca}}>:</span>00
      </div>
    </div>
  );
};

const EVoceAi: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, SAI_1, CARD_1 - 0.05);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={150} style={{textAlign: 'center', marginTop: -120}}
        pecas={[{texto: 'E', s: SAI_1}, {texto: 'VOCÊ', s: M.voce, cor: COR.ciano, brilho: true}]} />
      <Palavras t={t} tamanho={150} style={{textAlign: 'center'}} pecas={[{texto: 'AÍ…', s: M.voce + 0.2}]} />
    </AbsoluteFill>
  );
};

const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;

// Avatar em card à direita; à esquerda, o que ele está fazendo.
const MontandoPost: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, CARD_1, M.lojinha - 0.05, 40);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 60, top: 820, width: 520, fontFamily: MONT, fontWeight: 900, fontSize: 92, lineHeight: 1.05, color: COR.branco, textShadow: '0 8px 30px rgba(0,0,0,.6)'}}>
        MONTANDO<br />
        <span style={{color: COR.ciano}}>POST</span>
        <Cursor t={t} />
      </div>
    </AbsoluteFill>
  );
};

const PraLojinha: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.lojinha - 0.05 || t >= T.meio) return null;
  const e = mola(t, M.lojinha, 11, 220);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.6 + 0.4 * e)}}>
      <Pilula cor={COR.ciano} tamanho={78} fundo="rgba(10,30,70,.94)">PRA LOJINHA?</Pilula>
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

// ---------- Meio: a dor ----------

const FONTES = [MONT, 'Georgia, serif', '"Courier New", monospace', '"Brush Script MT", cursive', INTER];
const FUNDOS = ['#7A3E6E', '#2A9D8F', '#E76F51', '#3A86FF', '#C2378A'];
const LEGENDA_RASCUNHO = 'Promo de sexta! Corre!';

// Troca rápida (a cada 0,13 s) entre `de` e `ate`; depois fica na última opção.
const ciclo = (t: number, de: number, ate: number, n: number) => (t < de ? 0 : Math.floor((Math.min(t, ate) - de) / 0.13) % n);

// "Abriu o Canva às sete. Trocou a fonte, trocou a cor, refez a legenda três vezes."
const Canva: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.quando - 0.05);
  if (!st) return null;
  const fonte = FONTES[t >= M.trocou2 ? FONTES.length - 1 : t < M.trocou ? 0 : ciclo(t, M.trocou, M.trocou2 - 0.1, FONTES.length)];
  const fundo = FUNDOS[t < M.trocou2 ? 0 : t >= M.refez ? FUNDOS.length - 1 : ciclo(t, M.trocou2, M.refez - 0.1, FUNDOS.length)];
  // Legenda: 3 ciclos de digitar e apagar entre «refez» e o fim de «vezes».
  const dur = (M.quando - 0.2 - M.refez) / 3;
  const k = Math.min(2, Math.floor(Math.max(0, t - M.refez) / dur));
  const f = Math.max(0, t - M.refez - k * dur) / dur;
  const vis = t < M.refez ? 0 : k === 2 && f > 0.65 ? 1 : f < 0.65 ? f / 0.65 : 1 - (f - 0.65) / 0.35;
  const legenda = LEGENDA_RASCUNHO.slice(0, Math.round(vis * LEGENDA_RASCUNHO.length));
  const vezes = t >= M.tres ? Math.min(3, k + 1) : 0;
  const canva = mola(t, M.canva, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 440, ...caixa, padding: 30}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{opacity: canva, scale: String(0.6 + 0.4 * canva), transformOrigin: '0% 50%'}}>
            <Pilula cor={COR.ciano} tamanho={38} fundo="rgba(10,30,70,.92)">NO CANVA</Pilula>
          </div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>🕖 19:00</div>
        </div>
        <div style={{marginTop: 26, height: 420, borderRadius: 26, background: fundo, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <div style={{fontFamily: fonte, fontWeight: 900, fontSize: 104, color: COR.branco, textShadow: '0 6px 20px rgba(0,0,0,.3)'}}>PROMO</div>
          <Loja tamanho={110} cor="rgba(255,255,255,.7)" />
        </div>
        <div style={{marginTop: 22, minHeight: 56, fontFamily: INTER, fontWeight: 600, fontSize: 40, color: COR.branco}}>
          {legenda}
          {t >= M.refez && <Cursor t={t} />}
        </div>
      </div>
      {vezes > 0 && (
        <div style={{position: 'absolute', right: 70, top: 1010, fontFamily: MONT, fontWeight: 900, fontSize: 120, color: COR.vermelho, rotate: '-8deg', scale: String(0.7 + 0.3 * mola(t, M.tres + (vezes - 1) * 0.15, 9, 240)), textShadow: '0 10px 30px rgba(0,0,0,.5)'}}>
          ×{vezes}
        </div>
      )}
    </AbsoluteFill>
  );
};

// "Quando viu, era quase meia-noite."
const QuaseMeiaNoite: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.quando - 0.05, M.oPost - 0.1);
  if (!st) return null;
  const min = contar(t, M.quando, M.meia + 0.4, 19 * 60, 23 * 60 + 47);
  const hora = `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}`;
  const tarde = min > 22 * 60;
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 560, fontFamily: INTER, fontWeight: 700, fontSize: 44, color: COR.cinza, letterSpacing: 3}}>🌙 SEXTA-FEIRA</div>
      <div style={{position: 'absolute', top: 630, fontFamily: MONT, fontWeight: 900, fontSize: 260, lineHeight: 1, color: tarde ? COR.vermelho : COR.branco, fontVariantNumeric: 'tabular-nums', textShadow: '0 10px 50px rgba(0,0,0,.5)'}}>{hora}</div>
    </AbsoluteFill>
  );
};

// "E o post? Três curtidas."
const PostFlop: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.oPost - 0.1, M.agora - 0.3);
  if (!st) return null;
  const curtidas = contar(t, M.tres2 - 0.15, M.curtidas, 0, 3);
  const tres = mola(t, M.tres2, 9, 240);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 150, right: 150, top: 440, ...caixa, padding: 0, overflow: 'hidden'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '24px 30px'}}>
          <div style={{width: 64, height: 64, borderRadius: 99, background: 'linear-gradient(135deg,#C2378A,#F2994A)'}} />
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco}}>sua.lojinha</div>
        </div>
        <div style={{height: 420, background: FUNDOS[FUNDOS.length - 1], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <div style={{fontFamily: INTER, fontWeight: 900, fontSize: 96, color: COR.branco}}>PROMO</div>
          <Loja tamanho={100} cor="rgba(255,255,255,.7)" />
        </div>
        <div style={{padding: '26px 30px', display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{fontSize: 52}}>🤍</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.branco}}>
            <span style={{color: t >= M.tres2 ? COR.vermelho : COR.branco, fontWeight: 900, display: 'inline-block', scale: String(1 + 0.5 * tres * (1 - prog(t, M.tres2 + 0.3, 0.4)))}}>{curtidas}</span> curtidas
          </div>
        </div>
      </div>
      <Selo t={t} de={M.curtidas + 0.1} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 230, top: 1130}}>SÓ 3 ♥</Selo>
    </AbsoluteFill>
  );
};

// ---------- Meio: a virada ----------

// "Agora imagina fechar a loja na sexta": placa da porta vira de ABERTO para FECHADO.
const Fechado: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.agora - 0.05, M.fim - 0.1);
  if (!st) return null;
  const vira = prog(t, M.loja - 0.1, 0.4, saida);
  const lado = vira < 0.5;
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <Palavras t={t} tamanho={96} style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center'}}
        pecas={[{texto: 'AGORA', s: M.agora}, {texto: 'IMAGINA…', s: M.agora + 0.25, cor: COR.ciano, brilho: true}]} />
      <div style={{position: 'absolute', top: 640, width: 6, height: 90, background: COR.cinza}} />
      <div
        style={{
          position: 'absolute', top: 720, width: 640, height: 300, borderRadius: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: lado ? COR.verde : COR.vermelho, transform: `perspective(1200px) rotateY(${vira * 180 + (lado ? 0 : 180)}deg)`,
          boxShadow: '0 30px 80px rgba(0,0,0,.5)', fontFamily: MONT, fontWeight: 900, fontSize: 110, color: lado ? COR.marinho : COR.branco,
        }}
      >
        {lado ? 'ABERTO' : 'FECHADO'}
      </div>
    </AbsoluteFill>
  );
};

// "...com o fim de semana inteiro já postado": calendário SÁB / DOM se enchendo de posts agendados.
const FimDeSemana: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.fim - 0.1, M.o - 0.1);
  if (!st) return null;
  const dias: [string, [string, string][]][] = [
    ['SÁB', [['10h', '#E9C46A'], ['18h', '#2A9D8F']]],
    ['DOM', [['11h', '#E76F51'], ['19h', '#3A86FF']]],
  ];
  const tudo = mola(t, M.postado, 10, 220);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={84} style={{position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'FIM DE SEMANA', s: M.fim}]} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 570, display: 'flex', gap: 30}}>
        {dias.map(([dia, posts], d) => (
          <div key={dia} style={{flex: 1, padding: 26, ...caixa}}>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 56, color: COR.ciano, textAlign: 'center'}}>{dia}</div>
            {posts.map(([hora, cor], i) => {
              const e = mola(t, M.fim + 0.12 + (d * 2 + i) * 0.2, 12, 220);
              return (
                <div key={hora} style={{marginTop: 22, padding: 16, borderRadius: 22, background: 'rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 16, opacity: e, translate: `0px ${(1 - e) * -90}px`}}>
                  <div style={{width: 84, height: 84, borderRadius: 16, background: cor, flexShrink: 0}} />
                  <div>
                    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco}}>{hora}</div>
                    <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.verde}}>Agendado ✓</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1080, display: 'flex', justifyContent: 'center', opacity: tudo, scale: String(0.6 + 0.4 * tudo)}}>
        <Pilula cor={COR.verde} tamanho={56} fundo="rgba(10,40,40,.92)">JÁ POSTADO ✓</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: a solução ----------

const Logo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.o - 0.1, M.sugere - 0.15);
  if (!st) return null;
  const l = mola(t, M.o - 0.05, 11, 170);
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 470, width: 520, height: 520, borderRadius: 999, background: 'radial-gradient(circle, rgba(46,229,157,.35), rgba(47,123,255,.15) 50%, transparent 70%)', scale: String(0.6 + 0.6 * l)}} />
      <Img src={ARQ.logo} style={{position: 'absolute', top: 530, width: 400, height: 400, borderRadius: 90, scale: String(l), rotate: `${(1 - l) * -25}deg`, boxShadow: '0 30px 90px rgba(46,229,157,.3), 0 0 0 3px rgba(62,198,255,.4)'}} />
      <div style={{position: 'absolute', top: 990, fontFamily: MONT, fontWeight: 900, fontSize: 120, color: COR.branco, opacity: l}}>Digo Social</div>
    </AbsoluteFill>
  );
};

const digitar = (t: number, de: number, ate: number, texto: string) => texto.slice(0, Math.round(interpolate(t, [de, ate], [0, texto.length], clamp)));

const SUGESTAO = 'Mostre 3 jeitos de usar o produto que mais sai.';

const Sugere: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.sugere - 0.15, M.cria - 0.1);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 470, padding: 50, ...caixa}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Img src={ARQ.logo} style={{width: 70, height: 70, borderRadius: 18}} />
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.ciano, letterSpacing: 2}}>O DIGO SUGERE</div>
        </div>
        <div style={{marginTop: 34, minHeight: 240, fontFamily: MONT, fontWeight: 800, fontSize: 64, lineHeight: 1.18, color: COR.branco}}>
          {digitar(t, M.sugere + 0.05, M.cria - 0.2, SUGESTAO)}
          <Cursor t={t} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LEGENDA_POST = '3 jeitos de usar o queridinho da loja. Qual é o seu? 👇';

const Rede: React.FC<{t: number; de: number; nome: string; fundo: string}> = ({t, de, nome, fundo}) => {
  const mola = useMola();
  const on = mola(t, de, 11, 220);
  return (
    <div style={{flex: 1, padding: '18px 0', borderRadius: 22, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco, background: on > 0.01 ? fundo : 'rgba(255,255,255,.07)', opacity: 0.35 + 0.65 * on, scale: String(1 + 0.08 * Math.sin(Math.min(1, on) * Math.PI))}}>
      {nome} {on > 0.5 ? '✓' : ''}
    </div>
  );
};

// "Cria a imagem e a legenda e agenda no Instagram e no Facebook. Você só aprova."
const PostPronto: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.cria - 0.1, T.b - 0.15);
  if (!st) return null;
  const img = mola(t, M.imagem, 13, 180);
  const redes = mola(t, M.agenda, 13, 200);
  const botoes = mola(t, M.voce2 - 0.1, 12, 200);
  const aprovado = t >= M.aprova + 0.12;
  const looks = ['#E9C46A', '#E76F51', '#2A9D8F'];
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 440, padding: 36, ...caixa}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.verde, letterSpacing: 2}}>POST PRONTO</div>
        <div style={{marginTop: 20, height: 250, borderRadius: 26, overflow: 'hidden', background: 'linear-gradient(135deg, #1D2B5C, #36508F)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 34, paddingBottom: 26, boxSizing: 'border-box', opacity: img, scale: String(0.9 + 0.1 * img)}}>
          {looks.map((c, i) => {
            const e = mola(t, M.imagem + 0.12 * i, 12, 220);
            return <div key={c} style={{width: 140, height: 180 + (i === 1 ? 20 : 0), borderRadius: '70px 70px 24px 24px', background: c, translate: `0px ${(1 - e) * 120}px`, boxShadow: '0 16px 40px rgba(0,0,0,.35)'}} />;
          })}
        </div>
        <div style={{marginTop: 22, minHeight: 100, fontFamily: INTER, fontWeight: 600, fontSize: 38, lineHeight: 1.3, color: COR.branco}}>
          {digitar(t, M.legenda, M.agenda - 0.05, LEGENDA_POST)}
          {t >= M.legenda && t < M.agenda && <Cursor t={t} />}
        </div>
        <div style={{marginTop: 18, display: 'flex', gap: 20, opacity: redes, translate: `0px ${(1 - redes) * 30}px`}}>
          <Rede t={t} de={M.instagram} nome="Instagram" fundo="linear-gradient(135deg,#C2378A,#F2994A)" />
          <Rede t={t} de={M.facebook} nome="Facebook" fundo="#1877F2" />
        </div>
        <div style={{marginTop: 22, display: 'flex', gap: 20, opacity: botoes, translate: `0px ${(1 - botoes) * 30}px`}}>
          <div style={{flex: 1, padding: '22px 0', borderRadius: 22, textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.cinza, border: '3px solid rgba(255,255,255,.18)'}}>Editar</div>
          <div style={{flex: 1.6, padding: '22px 0', borderRadius: 22, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 34, color: aprovado ? COR.marinho : COR.branco, background: aprovado ? COR.verde : COR.azul}}>
            {aprovado ? 'Agendado ✓ sábado, 10h' : 'Aprovar'}
          </div>
        </div>
      </div>
      <Toque t={t} de={M.voce2 - 0.1} toque={M.aprova} x={640} y={1080} />
    </AbsoluteFill>
  );
};

// ---------- Fechamento: avatar em tela cheia, botão Seguir e "Boa sexta" ----------

const Seguir: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const fora = prog(t, SAI_2 - 0.1, 0.2);
  if (t < M.segue - 0.05 || fora >= 1) return null;
  const e = mola(t, M.segue, 12, 200);
  const seguindo = t >= M.social + 0.1;
  const pop = mola(t, M.social + 0.1, 9, 260);
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${12 * fora}px)`}}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1110, padding: '26px 30px', borderRadius: 36, display: 'flex', alignItems: 'center', gap: 22, background: 'rgba(8,16,44,.92)', border: '3px solid rgba(62,198,255,.4)', boxShadow: '0 30px 80px rgba(0,0,0,.55)', opacity: e, translate: `0px ${(1 - e) * 80}px`}}>
        <Img src={ARQ.logo} style={{width: 104, height: 104, borderRadius: 99, flexShrink: 0}} />
        <div style={{flex: 1}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: COR.branco}}>digo.social</div>
          <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>dicas pra sua lojinha</div>
        </div>
        <div style={{padding: '20px 30px', borderRadius: 20, fontFamily: INTER, fontWeight: 800, fontSize: 36, color: COR.branco, background: seguindo ? 'rgba(255,255,255,.14)' : COR.azul, scale: String(seguindo ? 0.9 + 0.1 * pop : 1), whiteSpace: 'nowrap'}}>
          {seguindo ? 'Seguindo ✓' : 'Seguir'}
        </div>
      </div>
      <Toque t={t} de={M.segue + 0.1} toque={M.social + 0.05} x={840} y={1190} />
    </AbsoluteFill>
  );
};

// Flash em tela cheia sobre «e vai» (momento artificial) e selo que fica em cima do avatar até o fim.
const BoaSexta: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_2, M.curtir - 0.05);
  const selo = mola(t, M.curtir, 10, 220);
  return (
    <>
      {st && (
        <AbsoluteFill style={{...st, justifyContent: 'center'}}>
          <Palavras t={t} tamanho={170} style={{textAlign: 'center', marginTop: -100}}
            pecas={[{texto: 'BOA', s: SAI_2}, {texto: 'SEXTA!', s: SAI_2 + 0.08, cor: COR.ciano, brilho: true}]} />
        </AbsoluteFill>
      )}
      {t >= M.curtir - 0.05 && t < T.fim + 0.2 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: selo, scale: String(interpolate(selo, [0, 1], [1.6, 1])), rotate: `${-4 + (1 - selo) * 8}deg`}}>
          <Pilula cor={COR.ciano} tamanho={84} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)">BOA SEXTA! 🎉</Pilula>
        </div>
      )}
    </>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <RelogioTopo t={t} />
      <EVoceAi t={t} />
      <MontandoPost t={t} />
      <PraLojinha t={t} />
      <Canva t={t} />
      <QuaseMeiaNoite t={t} />
      <PostFlop t={t} />
      <Fechado t={t} />
      <FimDeSemana t={t} />
      <Logo t={t} />
      <Sugere t={t} />
      <PostPronto t={t} />
      <CardVoz t={t} />
      <Seguir t={t} />
      <BoaSexta t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'tique', em: 0.05, volume: 0.5},
  {som: 'pop', em: M.voce, volume: 0.45},
  {som: 'pop', em: M.lojinha, volume: 0.5},
  // Meio: a dor
  {som: 'pop', em: M.canva, volume: 0.5},
  ...passos(M.trocou, M.trocou2 - 0.1, 4).map((s): Evento => ({som: 'toque', em: s, volume: 0.45})),
  ...passos(M.trocou2, M.refez - 0.1, 4).map((s): Evento => ({som: 'toque', em: s, volume: 0.45})),
  ...passos(M.refez, M.quando - 0.2, 9).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'impacto', em: M.tres, volume: 0.4},
  {som: 'whoosh_in', em: M.quando - 0.3, volume: 0.45},
  ...passos(M.quando, M.meia + 0.4, 10).map((s): Evento => ({som: 'tique', em: s, volume: 0.45})),
  {som: 'whoosh_in', em: M.oPost - 0.35, volume: 0.45},
  {som: 'impacto', em: M.tres2, volume: 0.5},
  {som: 'risco', em: M.curtidas + 0.1, volume: 0.45},
  // Meio: a virada e a solução
  {som: 'whoosh_in', em: M.agora - 0.3, volume: 0.5},
  {som: 'swoosh', em: M.loja - 0.1, volume: 0.5},
  ...passos(M.fim + 0.12, M.fim + 0.92, 4).map((s): Evento => ({som: 'pop', em: s, volume: 0.45})),
  {som: 'ding', em: M.postado, volume: 0.45},
  {som: 'whoosh_in', em: M.o - 0.35, volume: 0.45},
  {som: 'impacto', em: M.digo, volume: 0.5},
  ...passos(M.sugere + 0.05, M.cria - 0.2, 8).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'whoosh_in', em: M.cria - 0.35, volume: 0.45},
  {som: 'pop', em: M.imagem, volume: 0.45},
  ...passos(M.legenda, M.agenda - 0.05, 5).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'pop', em: M.instagram, volume: 0.5},
  {som: 'pop', em: M.facebook, volume: 0.5},
  {som: 'toque', em: M.aprova, volume: 0.7},
  {som: 'ding', em: M.aprova + 0.12, volume: 0.45},
  // Fechamento
  {som: 'pop', em: M.segue, volume: 0.5},
  {som: 'toque', em: M.social + 0.05, volume: 0.7},
  {som: 'ding', em: M.social + 0.1, volume: 0.5},
  {som: 'impacto', em: M.curtir, volume: 0.5},
];

// Legenda no português do roteiro: o Whisper ouviu "canvas set", "dicas sim" e um "a" a mais em "e a agenda",
// e separou "Sexta-feira" e "meia-noite" em duas palavras.
const CORRIGE: Record<string, string> = {'lojinha.': 'lojinha?', canvas: 'Canva', 'set,': 'às sete,', dicas: 'dica', sim: 'assim', 'sexta.': 'sexta!'};
const aMais = em('a', M.legenda + 0.1);
const LEGENDA = PALAVRAS.filter((p) => p.s !== aMais || p.w !== 'a').reduce<typeof PALAVRAS>((L, p) => {
  const w = p.s === em('post', M.oPost) ? 'post?' : CORRIGE[p.w] ?? p.w;
  const ant = L[L.length - 1];
  if (w.startsWith('-') && ant) L[L.length - 1] = {...ant, w: ant.w + w, e: p.e};
  else L.push({...p, w});
  return L;
}, []);

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.04]},
    {de: SAI_1, modo: 'fora'},
    {de: CARD_1, modo: 'card'},
    {de: M.lojinha, modo: 'cheia', escala: [1.08, 1.14], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.06]},
    {de: SAI_2, modo: 'fora'},
    {de: M.curtir, modo: 'cheia', escala: [1.1, 1.16], punch: true},
  ],
  semLegenda: [
    [SAI_1, T.meio],
    [M.o - 0.1, M.sugere - 0.05],
    [M.segue - 0.05, T.fim],
  ],
  corEspecial: {'curtidas.': COR.vermelho},
  eventos: EVENTOS,
  Cena,
};
