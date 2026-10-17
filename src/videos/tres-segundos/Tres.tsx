import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check, Dedo} from '../reels-avatar/Icones';
import {contar, Palavras, Risco, Selo, Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 007 · Reels de dica: o seu Reels é decidido nos primeiros segundos. Argumento: ninguém escolheu te ver →
// Adam Mosseri: tempo assistido é um dos sinais que mais pesam → o teste com pouca gente para se o começo falha →
// 2 dicas (frase mais forte primeiro; gancho escrito na tela) → "esse vídeo começou assim". CTA duplo: mandar + seguir.

const T = TRECHOS;
const M = {
  oi: em('oi'),
  ne: em('né'),
  e: em('é'),
  embora: em('embora'),
  pensa: em('pensa'),
  ninguem: em('ninguém'),
  passando: em('passando'),
  proximo: em('próximo'),
  toque: em('toque'),
  e2: em('e', em('distância')),
  chefe: em('chefe'),
  disse: em('disse'),
  tempo: em('tempo'),
  assistido: em('assistido'),
  pesam: em('pesam'),
  quem: em('quem', em('pesam')),
  derruba: em('derruba'),
  lembra: em('lembra'),
  testa: em('testa'),
  pouca: em('pouca'),
  vao: em('vão'),
  segundos: em('segundos'),
  para: em('para'),
  ali: em('ali'),
  comeco2: em('começo', em('ali')),
  decide: em('decide'),
  resto: em('resto'),
  dica1: em('dica'),
  comeca: em('começa', em('dica')),
  forte: em('forte'),
  resultado: em('resultado'),
  dor: em('dor'),
  promessa: em('promessa'),
  oi2: em('oi', em('promessa')),
  sai2: em('sai', em('promessa')),
  dica2: em('dica', em('promessa')),
  escreve: em('escreve'),
  gancho: em('gancho'),
  primeiro2: em('primeiro', em('gancho')),
  muita: em('muita'),
  som: em('som'),
  repara: em('repara'),
  comecou: em('começou'),
  manda: em('manda'),
  oi3: em('oi', em('manda')),
  segue: em('segue'),
  digo: em('digo'),
  toda: em('toda'),
};

// Momentos artificiais (sincronia.md): A 2,12–3,30 «É exatamente aí que a» → motion desde pouco antes de «É»;
// B 41,53–41,86 «segue o Digo» → botão Seguir em tela cheia; 43,80–43,93 (fim) → wipe da tela final.
const SAI_1 = M.e - 0.3;
const SAI_B = M.segue - 0.25;
const VOLTA_B = M.toda - 0.1;

const GANCHO = 'SEU REELS MORRE NOS 3 PRIMEIROS SEGUNDOS';

const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;
const digitar = (t: number, de: number, ate: number, texto: string) => texto.slice(0, Math.round(interpolate(t, [de, ate], [0, texto.length], clamp)));

// Gancho escrito em duas linhas (usado no topo do vídeo e no replay).
const GanchoTexto: React.FC<{escala?: number}> = ({escala = 1}) => (
  <div style={{textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 58 * escala, lineHeight: 1.08, color: COR.branco, textShadow: `0 ${4 * escala}px 0 rgba(0,0,0,.5), 0 ${8 * escala}px ${30 * escala}px rgba(0,0,0,.6)`}}>
    SEU REELS MORRE NOS
    <br />
    <span style={{color: COR.amarelo}}>3 PRIMEIROS SEGUNDOS</span>
  </div>
);

const Balao: React.FC<{texto: string; style?: React.CSSProperties}> = ({texto, style}) => (
  <div style={{display: 'inline-block', padding: '22px 34px', borderRadius: '36px 36px 36px 8px', background: 'rgba(240,244,255,.97)', fontFamily: INTER, fontWeight: 700, fontSize: 44, color: COR.marinho, boxShadow: '0 20px 60px rgba(0,0,0,.45)', whiteSpace: 'nowrap', ...style}}>
    {texto}
  </div>
);

// ---------- Abertura ----------

// O vídeo faz o que ensina: o gancho já está escrito no quadro 1, antes da fala.
const GanchoTopo: React.FC<{t: number}> = ({t}) => {
  // Compacto, para não descer até os olhos.
  if (t >= SAI_1 + 0.1) return null;
  const pulso = 1 + 0.015 * Math.sin(t * 6);
  const sai = prog(t, SAI_1 - 0.15, 0.25);
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: 240, padding: '14px 10px', borderRadius: 30, background: 'rgba(5,10,30,.62)', border: `3px solid ${COR.amarelo}`, scale: String(pulso * (1 - 0.1 * sai)), opacity: 1 - sai}}>
      <GanchoTexto escala={0.86} />
    </div>
  );
};

const OiGente: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.oi - 0.05 || t >= SAI_1 + 0.05) return null;
  const e = mola(t, M.oi, 11, 220);
  return (
    <div style={{position: 'absolute', left: 70, top: 1370, opacity: e, scale: String(0.6 + 0.4 * e), transformOrigin: '0% 100%'}}>
      <Balao texto="Oi, gente, tudo bem? 👋" />
    </div>
  );
};

// "É exatamente aí que a pessoa vai embora": o balão é jogado para cima por um swipe.
const Tchau: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_1, T.meio - 0.05, 0);
  if (!st) return null;
  const voa = prog(t, SAI_1 + 0.15, 0.55, saida);
  const tchau = mola(t, M.e + 0.25, 10, 220);
  const menos = mola(t, M.embora, 9, 240);
  const dedo = interpolate(t, [SAI_1, SAI_1 + 0.6], [1250, 500], {...clamp, easing: saida});
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 150, top: interpolate(voa, [0, 1], [1000, -250]), rotate: `${-12 * voa}deg`, opacity: 1 - voa * 0.7}}>
        <Balao texto="Oi, gente, tudo bem? 👋" />
      </div>
      <Dedo tamanho={170} style={{position: 'absolute', left: 620, top: dedo, opacity: 1 - prog(t, SAI_1 + 0.5, 0.2)}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 170, color: COR.branco, scale: String(interpolate(tchau, [0, 1], [1.8, 1])), opacity: tchau, textShadow: '0 12px 50px rgba(0,0,0,.6)'}}>
        TCHAU <span style={{display: 'inline-block', rotate: `${Math.sin(t * 14) * 18}deg`}}>👋</span>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 960, display: 'flex', justifyContent: 'center', opacity: menos, scale: String(0.6 + 0.4 * menos)}}>
        <Pilula cor={COR.vermelho} tamanho={56} fundo="rgba(60,10,20,.92)">👀 −1 PESSOA</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: fundo de pontos e card de voz ----------

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

// ---------- Meio: do lado de quem assiste ----------

const REELS = ['#7A3E6E', '#2A9D8F', '#E76F51', '#3A86FF', '#C2378A', '#E9C46A', '#264653', '#8338EC'];
const EMOJIS = ['🍰', '🐶', '💪', '✈️', '💄', '🎮', '🏖️', '🎸'];

// Celular com o feed de Reels: rola rápido em «passando o dedo» e o próximo espia embaixo em «próximo».
const Feed: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.e2 - 0.1);
  if (!st) return null;
  const tel = mola(t, T.meio + 0.1, 13, 180);
  const H = 700;
  // Rolagem: parada até «passando»; rápida até «próximo»; depois para com o próximo espiando 18%.
  const rolagem = interpolate(t, [M.passando, M.proximo - 0.1], [0, 5], {...clamp, easing: suave});
  const espia = prog(t, M.proximo, 0.35, saida) * 0.18;
  const pos = rolagem + espia;
  const dedoY = interpolate(t, [M.passando, M.passando + 0.35, M.passando + 0.36, M.passando + 0.7, M.passando + 0.71, M.passando + 1.05], [1150, 700, 1150, 700, 1150, 700], clamp);
  const dedoVis = t >= M.passando - 0.05 && t < M.proximo;
  const proximo = mola(t, M.proximo, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.ninguem} cor={COR.amarelo} tamanho={46} rot={-4} style={{left: 150, top: 440}}>NINGUÉM ESCOLHEU TE VER</Selo>
      <div style={{position: 'absolute', left: 300, top: 540, width: 480, height: H, borderRadius: 54, border: '10px solid #1B2238', background: '#000', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.6)', scale: String(0.85 + 0.15 * tel), opacity: tel}}>
        {REELS.map((c, i) => {
          const y = (i - pos) * H;
          if (y < -H || y > H) return null;
          return (
            <div key={i} style={{position: 'absolute', left: 0, top: y, width: '100%', height: H, background: `linear-gradient(160deg, ${c}, #0A1430)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 170}}>
              {EMOJIS[i]}
              <div style={{position: 'absolute', left: 26, bottom: 40, fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.branco}}>@perfil.{i + 1}</div>
            </div>
          );
        })}
      </div>
      {dedoVis && <Dedo tamanho={150} style={{position: 'absolute', left: 620, top: dedoY}} />}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center', opacity: proximo, scale: String(0.6 + 0.4 * proximo)}}>
        <Pilula cor={COR.ciano} tamanho={44} fundo="rgba(10,30,70,.94)">PRÓXIMO ↓ A 1 TOQUE</Pilula>
      </div>
      <Toque t={t} de={M.toque - 0.3} toque={M.toque} x={600} y={1000} tamanho={130} />
    </AbsoluteFill>
  );
};

// ---------- Meio: evidência ----------

const Mosseri: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.e2 - 0.1, M.tempo - 0.12);
  if (!st) return null;
  const foto = mola(t, M.e2, 11, 160);
  const nome = mola(t, M.chefe, 13, 200);
  const data = mola(t, M.disse, 11, 220);
  const giro = (t * 40) % 360;
  return (
    <AbsoluteFill style={{...st, alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 470, width: 470, height: 470, borderRadius: 999, background: `conic-gradient(from ${giro}deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)`, padding: 14, boxSizing: 'border-box', scale: String(foto), rotate: `${(1 - foto) * -30}deg`, boxShadow: '0 30px 90px rgba(214,41,118,.45)'}}>
        <Img src={ARQ.mosseri} style={{width: '100%', height: '100%', borderRadius: 999, objectFit: 'cover', objectPosition: '50% 22%', border: `10px solid ${COR.marinho}`, boxSizing: 'border-box', rotate: `${(1 - foto) * 30}deg`}} />
      </div>
      <div style={{position: 'absolute', top: 980, textAlign: 'center', opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 88, color: COR.branco}}>Adam Mosseri</div>
        <div style={{marginTop: 4, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.ciano}}>chefe do Instagram</div>
      </div>
      <div style={{position: 'absolute', top: 1180, opacity: data, scale: String(0.6 + 0.4 * data)}}>
        <Pilula cor={COR.amarelo} tamanho={36} fundo="rgba(40,30,5,.9)">🎙️ DISSE EM JAN/2025</Pilula>
      </div>
      <div style={{position: 'absolute', top: 1268, fontFamily: INTER, fontWeight: 500, fontSize: 20, color: 'rgba(255,255,255,.55)', opacity: nome}}>Foto: Anthony Quintano · CC BY 2.0</div>
    </AbsoluteFill>
  );
};

const SeloFonte: React.FC<{t: number; de: number; ate: number}> = ({t, de, ate}) => {
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

// "O tempo assistido é um dos sinais que mais pesam."
const Sinais: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.tempo - 0.12, M.quem - 0.1);
  if (!st) return null;
  const foco = mola(t, M.pesam, 10, 200);
  const sinais = [
    {icone: '⏱️', nome: 'TEMPO ASSISTIDO', cor: COR.amarelo, de: M.tempo, foco: true},
    {icone: '❤️', nome: 'CURTIDAS', cor: COR.vermelho, de: M.tempo + 0.25, foco: false},
    {icone: '↗️', nome: 'ENVIOS', cor: COR.verde, de: M.tempo + 0.5, foco: false},
  ];
  return (
    <AbsoluteFill style={st}>
      <SeloFonte t={t} de={M.tempo} ate={M.quem} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 36, color: COR.cinza, letterSpacing: 3}}>OS 3 SINAIS QUE MAIS PESAM</div>
      {sinais.map((s, i) => {
        const e = mola(t, s.de, 12, 200);
        const destaque = s.foco ? foco : 0;
        return (
          <div key={s.nome} style={{position: 'absolute', left: 110, right: 110, top: 650 + i * 190, height: 160, padding: '0 40px', boxSizing: 'border-box', borderRadius: 34, display: 'flex', alignItems: 'center', gap: 30, background: s.foco ? `rgba(255,210,94,${0.1 + 0.15 * destaque})` : 'rgba(255,255,255,.06)', border: `4px solid ${s.foco ? s.cor : 'rgba(255,255,255,.12)'}`, opacity: e * (s.foco ? 1 : 1 - 0.5 * foco), scale: String((0.85 + 0.15 * e) * (1 + 0.1 * destaque)), boxShadow: s.foco ? `0 0 ${70 * destaque}px rgba(255,210,94,.5)` : undefined}}>
            <div style={{fontSize: 80}}>{s.icone}</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: s.foco ? 56 : 50, color: COR.branco}}>{s.nome}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// "Quem sai no começo derruba esse tempo."
const Derruba: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.quem - 0.1, M.lembra - 0.1);
  if (!st) return null;
  const pct = contar(t, M.derruba, M.derruba + 0.7, 100, 12);
  const k = pct / 100;
  const cor = pct > 50 ? COR.verde : pct > 25 ? COR.amarelo : COR.vermelho;
  const tremor = t > M.derruba && t < M.derruba + 0.8 ? Math.sin(t * 60) * 6 * (1 - (t - M.derruba) / 0.8) : 0;
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={80} style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'QUEM SAI', s: M.quem}, {texto: 'NO COMEÇO', s: M.quem + 0.35, cor: COR.vermelho, brilho: true}]} />
      <div style={{position: 'absolute', left: 110, right: 110, top: 700, padding: 44, ...caixa, translate: `${tremor}px 0px`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.cinza}}>⏱️ TEMPO ASSISTIDO</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 96, color: cor, fontVariantNumeric: 'tabular-nums'}}>{pct}%</div>
        </div>
        <div style={{marginTop: 26, height: 56, borderRadius: 99, background: 'rgba(255,255,255,.1)', overflow: 'hidden'}}>
          <div style={{width: `${k * 100}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${cor}, ${cor}AA)`, boxShadow: `0 0 30px ${cor}`}} />
        </div>
      </div>
      <Selo t={t} de={M.derruba + 0.5} cor={COR.vermelho} tamanho={56} rot={-6} style={{left: 280, top: 1060}}>DERRUBOU</Selo>
    </AbsoluteFill>
  );
};

// "...testa com pouca gente primeiro. Se essas pessoas vão embora nos primeiros segundos, o seu Reels para ali."
const CORES5 = ['#E9C46A', '#E76F51', '#2A9D8F', '#3A86FF', '#C2378A'];
const CX = 540;
const CY = 850;

const Teste: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.lembra - 0.1, M.comeco2 - 0.1);
  if (!st) return null;
  const post = mola(t, M.lembra, 12, 200);
  const relogio = interpolate(t, [M.vao, M.segundos + 0.3], [0, 2], clamp);
  const tenta = prog(t, M.para - 0.1, 0.35, saida);
  const recua = prog(t, M.para + 0.3, 0.3);
  const onda = tenta * (1 - recua);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={60} style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'O TESTE COM', s: M.testa}, {texto: 'POUCA GENTE', s: M.pouca, cor: COR.ciano, brilho: true}]} />
      {onda > 0.01 && <div style={{position: 'absolute', left: CX - 330 * onda, top: CY - 330 * onda, width: 660 * onda, height: 660 * onda, borderRadius: 999, border: `4px dashed ${COR.ciano}`, opacity: 0.8}} />}
      {CORES5.map((c, i) => {
        const e = mola(t, M.pouca + i * 0.07, 12, 220);
        const apaga = prog(t, M.vao + i * 0.22, 0.25);
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const x = CX + Math.cos(ang) * 220;
        const y = CY + Math.sin(ang) * 220;
        return (
          <React.Fragment key={c}>
            <div style={{position: 'absolute', left: x - 46, top: y - 46, width: 92, height: 92, borderRadius: 99, background: c, border: '5px solid rgba(255,255,255,.85)', scale: String(e * (1 - 0.2 * apaga)), opacity: 1 - 0.75 * apaga, filter: `grayscale(${apaga})`, boxShadow: apaga < 0.5 ? `0 0 30px ${c}` : undefined}} />
            {apaga > 0.2 && <div style={{position: 'absolute', left: x - 22 + Math.cos(ang) * 60 * apaga, top: y - 70 - 40 * apaga, fontSize: 44, opacity: 1 - apaga * 0.6}}>👋</div>}
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: CX - 115, top: CY - 115, width: 230, height: 230, borderRadius: 30, background: 'linear-gradient(135deg, #7A3E6E, #C2678A)', border: '5px solid #fff', boxShadow: '0 20px 60px rgba(0,0,0,.5)', scale: String(post), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.branco, textAlign: 'center'}}>
        SEU<br />REELS
      </div>
      {t >= M.vao && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center'}}>
          <Pilula cor={COR.vermelho} tamanho={46} fundo="rgba(60,10,20,.9)">⏱️ 0:0{Math.min(2, Math.floor(relogio) + 1)}</Pilula>
        </div>
      )}
      <Selo t={t} de={M.ali} cor={COR.vermelho} tamanho={70} rot={-8} style={{left: 360, top: 790}}>PAROU</Selo>
    </AbsoluteFill>
  );
};

// "O começo decide se o resto vai ser visto": curva de retenção que despenca nos 3 primeiros segundos.
const Retencao: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.comeco2 - 0.1, M.dica1 - 0.12);
  if (!st) return null;
  const linha = prog(t, M.comeco2 + 0.1, 1.0, saida);
  const faixa = mola(t, M.decide, 12, 200);
  const resto = prog(t, M.resto, 0.4);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={80} style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'O COMEÇO', s: M.comeco2, cor: COR.amarelo, brilho: true}, {texto: 'DECIDE', s: M.decide}]} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 610, padding: '40px 40px 30px', ...caixa}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.cinza}}>quantas pessoas continuam assistindo</div>
        <svg width={760} height={420} viewBox="0 0 760 420" style={{marginTop: 16, overflow: 'visible'}}>
          <rect x={0} y={0} width={150} height={380} rx={14} fill={`rgba(255,210,94,${0.22 * faixa})`} stroke={COR.amarelo} strokeWidth={3} strokeDasharray="10 8" opacity={faixa} />
          <rect x={150} y={0} width={610} height={380} rx={14} fill={`rgba(154,167,199,${0.12 * resto})`} />
          <line x1={0} y1={380} x2={760} y2={380} stroke="rgba(255,255,255,.25)" strokeWidth={3} />
          <path d="M 0 30 C 40 40, 90 230, 150 300 S 400 330, 760 345" pathLength={1} fill="none" stroke={COR.vermelho} strokeWidth={12} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} style={{filter: `drop-shadow(0 0 12px ${COR.vermelho})`}} />
          <text x={75} y={414} textAnchor="middle" fill={COR.amarelo} fontFamily={MONT} fontWeight={900} fontSize={30} opacity={faixa}>0–3 s</text>
          <text x={455} y={414} textAnchor="middle" fill={COR.cinza} fontFamily={INTER} fontWeight={700} fontSize={28} opacity={resto}>o resto do vídeo</text>
        </svg>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1170, display: 'flex', justifyContent: 'center', opacity: resto, scale: String(0.7 + 0.3 * resto)}}>
        <Pilula cor={COR.cinza} tamanho={40}>QUASE NINGUÉM VÊ O RESTO</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 1 ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica1 - 0.12, M.dica2 - 0.12);
  if (!st) return null;
  const ruim = mola(t, M.comeca, 12, 200);
  const bom = mola(t, M.forte, 11, 210);
  const chips = [
    {icone: '🏆', nome: 'RESULTADO', de: M.resultado},
    {icone: '😩', nome: 'DOR', de: M.dor},
    {icone: '🎯', nome: 'PROMESSA', de: M.promessa},
  ];
  // «O "oi, gente" fica pra depois, ou sai»: o cartão ruim encolhe até a lixeira.
  const lixo = prog(t, M.oi2, 0.9, suave);
  const lixeira = mola(t, M.oi2 - 0.1, 12, 200) * (1 - prog(t, M.sai2 + 0.5, 0.2));
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica1} cor={COR.ciano} tamanho={64} rot={-4} style={{left: 90, top: 440}}>DICA 1</Selo>
      <Palavras t={t} tamanho={54} style={{position: 'absolute', top: 580, left: 90, right: 60}} pecas={[{texto: 'COMEÇA PELA', s: M.comeca}, {texto: 'FRASE MAIS FORTE', s: M.comeca + 0.5, cor: COR.amarelo, brilho: true}]} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 730, padding: '26px 30px', borderRadius: 28, background: 'rgba(60,10,20,.75)', border: `4px solid ${COR.vermelho}`, display: 'flex', alignItems: 'center', gap: 20, opacity: ruim * (1 - lixo * 0.9), translate: `${interpolate(lixo, [0, 1], [0, 330])}px ${interpolate(lixo, [0, 1], [0, 430])}px`, scale: String((0.8 + 0.2 * ruim) * (1 - 0.8 * lixo)), transformOrigin: '100% 50%'}}>
        <div style={{fontSize: 52, color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>✗</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 38, color: COR.branco}}>"Oi, gente, hoje eu vou falar sobre…"</div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 900, padding: '26px 30px', borderRadius: 28, background: 'rgba(10,50,40,.8)', border: `4px solid ${COR.verde}`, display: 'flex', alignItems: 'center', gap: 20, opacity: bom, scale: String(0.8 + 0.2 * bom), boxShadow: `0 0 ${50 * bom}px rgba(46,229,157,.35)`}}>
        <Check tamanho={52} cor={COR.verde} />
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: COR.branco}}>"Seu Reels morre em 3 segundos."</div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1090, display: 'flex', gap: 18, justifyContent: 'center'}}>
        {chips.map((c) => {
          const e = mola(t, c.de, 10, 230);
          return (
            <div key={c.nome} style={{opacity: e, scale: String(0.5 + 0.5 * e), translate: `0px ${(1 - e) * 40}px`}}>
              <Pilula cor={COR.ciano} tamanho={34} fundo="rgba(10,30,70,.94)">{c.icone} {c.nome}</Pilula>
            </div>
          );
        })}
      </div>
      {lixeira > 0.01 && <div style={{position: 'absolute', left: 830, top: 1150, fontSize: 110, scale: String(lixeira * (1 + 0.15 * Math.sin(Math.min(1, prog(t, M.sai2, 0.3)) * Math.PI)))}}>🗑️</div>}
    </AbsoluteFill>
  );
};

// ---------- Meio: dica 2 ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.dica2 - 0.12, M.repara - 0.12);
  if (!st) return null;
  const tel = mola(t, M.escreve - 0.2, 12, 190);
  const mudo = mola(t, M.muita, 10, 230);
  const ok = mola(t, M.som, 10, 230);
  const zero = t >= M.primeiro2 && Math.floor((t - M.primeiro2) * 3) % 2 === 0;
  return (
    <AbsoluteFill style={st}>
      <Selo t={t} de={M.dica2} cor={COR.ciano} tamanho={64} rot={-4} style={{left: 90, top: 440}}>DICA 2</Selo>
      <div style={{position: 'absolute', left: 290, top: 570, width: 500, height: 680, borderRadius: 54, border: '10px solid #1B2238', background: 'linear-gradient(170deg, #26375F, #0A1430)', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.6)', opacity: tel, scale: String(0.85 + 0.15 * tel)}}>
        <Img src={ARQ.avatar} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%', opacity: 0.55}} />
        <div style={{position: 'absolute', left: 20, right: 20, top: 60, padding: '14px 8px', borderRadius: 18, background: 'rgba(5,10,30,.7)', border: `3px solid ${COR.amarelo}`, opacity: t >= M.gancho ? 1 : 0}}>
          <div style={{textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 34, lineHeight: 1.1, color: COR.branco}}>
            {digitar(t, M.gancho, M.gancho + 0.6, 'SEU REELS MORRE EM ')}
            <span style={{color: COR.amarelo}}>{digitar(t, M.gancho + 0.6, M.gancho + 0.9, '3 SEGUNDOS')}</span>
          </div>
        </div>
        <div style={{position: 'absolute', left: 20, right: 20, bottom: 24, height: 10, borderRadius: 99, background: 'rgba(255,255,255,.25)'}}>
          <div style={{width: '4%', height: '100%', borderRadius: 99, background: COR.vermelho}} />
        </div>
        {t >= M.primeiro2 && (
          <div style={{position: 'absolute', left: 20, bottom: 48, opacity: zero ? 1 : 0.35}}>
            <Pilula cor={COR.vermelho} tamanho={28} fundo="rgba(60,10,20,.92)">0:00</Pilula>
          </div>
        )}
      </div>
      <div style={{position: 'absolute', left: 80, top: 760, fontSize: 150, opacity: mudo, scale: String(interpolate(mudo, [0, 1], [1.8, 1])), rotate: `${(1 - mudo) * -20}deg`}}>🔇</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1170, display: 'flex', justifyContent: 'center', opacity: ok, scale: String(0.6 + 0.4 * ok)}}>
        <Pilula cor={COR.verde} tamanho={44} fundo="rgba(10,40,40,.92)">✓ ENTENDE SEM SOM</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// "E repara: esse vídeo começou exatamente assim." Miniatura da abertura com setas.
const Replay: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.repara - 0.12, T.b - 0.1);
  if (!st) return null;
  const mini = mola(t, M.repara, 12, 190);
  const seta1 = mola(t, M.comecou, 11, 210);
  const seta2 = mola(t, M.comecou + 0.35, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={80} style={{position: 'absolute', top: 440, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'REPARA', s: M.repara, cor: COR.amarelo, brilho: true}, {texto: '👀', s: M.repara + 0.2}]} />
      <div style={{position: 'absolute', left: 300, top: 560, width: 480, height: 700, borderRadius: 54, border: '10px solid #1B2238', overflow: 'hidden', background: '#0A1430', boxShadow: '0 40px 90px rgba(0,0,0,.6)', opacity: mini, scale: String(0.85 + 0.15 * mini), rotate: `${(1 - mini) * 6}deg`}}>
        <Img src={ARQ.avatar} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}} />
        <div style={{position: 'absolute', left: 14, right: 14, top: 50, padding: '10px 4px', borderRadius: 16, background: 'rgba(5,10,30,.62)', border: `3px solid ${COR.amarelo}`}}>
          <GanchoTexto escala={0.44} />
        </div>
        <div style={{position: 'absolute', left: 20, bottom: 70}}>
          <Balao texto="…né? 👋" style={{fontSize: 30, padding: '14px 22px'}} />
        </div>
        <div style={{position: 'absolute', right: 18, top: 14, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: COR.branco, background: 'rgba(0,0,0,.5)', padding: '4px 12px', borderRadius: 10}}>0:00</div>
      </div>
      <div style={{position: 'absolute', left: 50, top: 660, opacity: seta2, translate: `${(1 - seta2) * -60}px 0px`}}>
        <Pilula cor={COR.amarelo} tamanho={30} fundo="rgba(40,30,5,.92)">TEXTO NA TELA →</Pilula>
      </div>
      <div style={{position: 'absolute', left: 30, top: 1120, opacity: seta1, translate: `${(1 - seta1) * -60}px 0px`}}>
        <Pilula cor={COR.verde} tamanho={30} fundo="rgba(10,40,40,.92)">FRASE FORTE →</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: CTA duplo ----------

const EnviarOi: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.manda - 0.05 || t >= SAI_B + 0.1) return null;
  const e = mola(t, M.manda, 10, 230);
  const balao = mola(t, M.oi3, 11, 220);
  const pulso = 1 + 0.07 * Math.abs(Math.sin((t - M.manda) * 9));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: e, scale: String((0.6 + 0.4 * e) * pulso)}}>
        <Pilula cor={COR.verde} tamanho={66} fundo="rgba(10,40,40,.94)">↗️ ENVIAR</Pilula>
      </div>
      {balao > 0.01 && (
        <div style={{position: 'absolute', left: 300, top: 1300, opacity: balao, scale: String(0.6 + 0.4 * balao)}}>
          <div style={{position: 'relative'}}>
            <Balao texto="oi, gente 👋" style={{fontSize: 38}} />
            <Risco t={t} de={M.oi3 + 0.25} espessura={10} />
          </div>
        </div>
      )}
    </>
  );
};

const BotaoSeguir: React.FC<{seguindo: boolean; pop: number}> = ({seguindo, pop}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '28px 32px', borderRadius: 40, background: 'rgba(8,16,44,.94)', border: '3px solid rgba(62,198,255,.4)', boxShadow: '0 30px 80px rgba(0,0,0,.55)'}}>
    <Img src={ARQ.logo} style={{width: 116, height: 116, borderRadius: 99, flexShrink: 0}} />
    <div style={{flex: 1}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco}}>digo.social</div>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 28, color: COR.cinza}}>dicas pra crescer no Instagram</div>
    </div>
    <div style={{padding: '22px 34px', borderRadius: 22, fontFamily: INTER, fontWeight: 800, fontSize: 40, color: COR.branco, background: seguindo ? 'rgba(255,255,255,.14)' : COR.azul, scale: String(seguindo ? 0.9 + 0.1 * pop : 1), whiteSpace: 'nowrap'}}>
      {seguindo ? 'Seguindo ✓' : 'Seguir'}
    </div>
  </div>
);

const SeguirCheio: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_B, VOLTA_B - 0.02, 0);
  if (!st) return null;
  const botao = mola(t, SAI_B + 0.05, 12, 200);
  const seguindo = t >= M.digo;
  const pop = mola(t, M.digo, 9, 260);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={96} style={{position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'E SEGUE', s: SAI_B + 0.05}, {texto: 'O DIGO', s: M.digo - 0.1, cor: COR.ciano, brilho: true}]} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 800, opacity: botao, translate: `0px ${(1 - botao) * 100}px`, scale: String(0.9 + 0.1 * botao)}}>
        <BotaoSeguir seguindo={seguindo} pop={pop} />
      </div>
      <Toque t={t} de={SAI_B + 0.05} toque={M.digo} x={820} y={880} />
    </AbsoluteFill>
  );
};

const TodaSemana: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.toda - 0.05 || t > T.fim + 0.2) return null;
  const e = mola(t, M.toda, 10, 220);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), rotate: `${-3 + (1 - e) * 8}deg`}}>
      <Pilula cor={COR.ciano} tamanho={66} fundo="linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)">TODA SEMANA TEM MAIS</Pilula>
    </div>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Grade t={t} />
      <GanchoTopo t={t} />
      <OiGente t={t} />
      <Tchau t={t} />
      <Feed t={t} />
      <Mosseri t={t} />
      <Sinais t={t} />
      <Derruba t={t} />
      <Teste t={t} />
      <Retencao t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <Replay t={t} />
      <CardVoz t={t} />
      <EnviarOi t={t} />
      <SeguirCheio t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'impacto', em: 0.02, volume: 0.45},
  {som: 'pop', em: M.oi, volume: 0.5},
  {som: 'swoosh', em: SAI_1 + 0.15, volume: 0.6},
  {som: 'impacto', em: M.e + 0.25, volume: 0.5},
  {som: 'pop', em: M.embora, volume: 0.45},
  // Do lado de quem assiste
  {som: 'impacto', em: M.ninguem, volume: 0.45},
  ...passos(M.passando, M.proximo - 0.1, 6).map((s): Evento => ({som: 'swoosh', em: s, volume: 0.3})),
  {som: 'pop', em: M.proximo, volume: 0.45},
  {som: 'toque', em: M.toque, volume: 0.6},
  // Evidência
  {som: 'whoosh_in', em: M.e2 - 0.3, volume: 0.5},
  {som: 'impacto', em: M.e2 + 0.05, volume: 0.45},
  {som: 'pop', em: M.chefe, volume: 0.45},
  {som: 'ding', em: M.disse, volume: 0.4},
  {som: 'whoosh_in', em: M.tempo - 0.3, volume: 0.45},
  {som: 'pop', em: M.tempo, volume: 0.4},
  {som: 'pop', em: M.tempo + 0.25, volume: 0.4},
  {som: 'pop', em: M.tempo + 0.5, volume: 0.4},
  {som: 'impacto', em: M.pesam, volume: 0.5},
  // Derruba e teste
  {som: 'whoosh_in', em: M.quem - 0.3, volume: 0.45},
  {som: 'risco', em: M.derruba, volume: 0.5},
  {som: 'impacto', em: M.derruba + 0.5, volume: 0.5},
  {som: 'whoosh_in', em: M.lembra - 0.3, volume: 0.45},
  ...passos(M.pouca, M.pouca + 0.35, 5).map((s): Evento => ({som: 'tique', em: s, volume: 0.35})),
  ...passos(M.vao, M.vao + 0.9, 5).map((s): Evento => ({som: 'pop', em: s, volume: 0.3})),
  {som: 'swoosh', em: M.para - 0.1, volume: 0.4},
  {som: 'impacto', em: M.ali, volume: 0.6},
  {som: 'whoosh_in', em: M.comeco2 - 0.3, volume: 0.45},
  {som: 'risco', em: M.comeco2 + 0.1, volume: 0.4},
  {som: 'ding', em: M.decide, volume: 0.4},
  // Dicas
  {som: 'impacto', em: M.dica1, volume: 0.5},
  {som: 'pop', em: M.comeca, volume: 0.45},
  {som: 'ding', em: M.forte, volume: 0.45},
  {som: 'pop', em: M.resultado, volume: 0.45},
  {som: 'pop', em: M.dor, volume: 0.45},
  {som: 'pop', em: M.promessa, volume: 0.45},
  {som: 'swoosh', em: M.oi2, volume: 0.45},
  {som: 'impacto', em: M.sai2, volume: 0.4},
  {som: 'impacto', em: M.dica2, volume: 0.5},
  ...passos(M.gancho, M.gancho + 0.9, 7).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'tique', em: M.primeiro2, volume: 0.4},
  {som: 'pop', em: M.muita, volume: 0.45},
  {som: 'ding', em: M.som, volume: 0.45},
  {som: 'whoosh_in', em: M.repara - 0.3, volume: 0.45},
  {som: 'pop', em: M.comecou, volume: 0.45},
  {som: 'pop', em: M.comecou + 0.35, volume: 0.45},
  // CTA
  {som: 'pop', em: M.manda, volume: 0.5},
  {som: 'risco', em: M.oi3 + 0.25, volume: 0.45},
  {som: 'swoosh', em: SAI_B, volume: 0.45},
  {som: 'toque', em: M.digo, volume: 0.7},
  {som: 'ding', em: M.digo + 0.05, volume: 0.5},
  {som: 'impacto', em: M.toda, volume: 0.5},
];

// Legenda no texto do roteiro: "oi, gente" entre aspas e "dica 1." vira "dica 1:".
const gentes = [em('gente'), em('gente', M.oi2), em('gente', M.oi3)];
const LEGENDA = PALAVRAS.map((p) => {
  if (/^oi,$/i.test(p.w)) return {...p, w: '"oi,'};
  if (gentes.includes(p.s)) return {...p, w: p.w.replace(/^gente/, 'gente"')};
  if (/^\d\.$/.test(p.w)) return {...p, w: p.w.replace('.', ':')};
  return p;
});

export const CONFIG: Config = {
  palavras: LEGENDA,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: M.ne, modo: 'cheia', escala: [1.09, 1.13], punch: true},
    {de: SAI_1, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.05]},
    {de: SAI_B, modo: 'fora'},
    {de: VOLTA_B, modo: 'cheia', escala: [1.1, 1.16], punch: true},
  ],
  semLegenda: [
    [SAI_1, T.meio],
    [M.dica1 - 0.12, M.dica1 + 0.45],
    [M.dica2 - 0.12, M.dica2 + 0.45],
    [M.manda - 0.05, T.fim],
  ],
  corEspecial: {'assistido': COR.amarelo, 'forte.': COR.amarelo, 'som.': COR.verde},
  eventos: EVENTOS,
  Cena,
};
