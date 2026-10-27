import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 030 · Esse erro deixa o vídeo da sua loja com cara de amador.
// Gravar tudo de um ângulo só e da mesma distância deixa o vídeo parado. Abertura (o vídeo da loja que não muda) → o
// porquê: um plano só do começo ao fim, o olho cansa → os três planos (aberto, médio, fechado) → dica 1: grava os três
// de uma vez → dica 2: troca de plano a cada frase → o mesmo vídeo com cara de profissional → CTA. Sem crédito extra:
// a loja é ilustrada e a "câmera" é um enquadramento que se move dentro dela.

const T = TRECHOS;
const M = {
  video: em('vídeo'),
  loja: em('loja'),
  cara: em('cara'),
  amador: em('amador'),
  erro2: em('erro', T.meio),
  gravar: em('gravar'),
  angulo: em('ângulo'),
  distancia: em('distância'),
  comeco: em('começo'),
  fim: em('fim', T.meio),
  olho: em('olho'),
  cansa: em('cansa'),
  parece: em('parece'),
  parado: em('parado'),
  bom: em('bom'),
  aberto: em('aberto'),
  medio: em('médio'),
  produto: em('produto'),
  fechado: em('fechado'),
  detalhe: em('detalhe'),
  primeira: em('primeira'),
  tres: em('três'),
  longe: em('longe'),
  meio: em('meio', em('longe')),
  perto: em('perto'),
  minuto: em('minuto'),
  segunda: em('segunda'),
  troca2: em('troca', em('segunda')),
  frase: em('frase', em('segunda')),
  comecou: em('começou'),
  enquadramento: em('enquadramento'),
  pronto: em('pronto'),
  agora: em('agora', em('pronto')),
  profissional: em('profissional'),
  segue: em('segue', T.b),
  digo: em('digo', T.b),
  toda: em('toda', T.b),
};

// ---------- Peças comuns ----------

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
    <div style={{position: 'absolute', opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.4, 1])), rotate: `${rot + (1 - e) * 14}deg`, zIndex: 5, ...style}}>
      <div style={{padding: `${tamanho * 0.2}px ${tamanho * 0.5}px`, border: `${tamanho * 0.1}px solid ${cor}`, borderRadius: 14, fontFamily: MONT, fontWeight: 900, fontSize: tamanho, color: cor, background: 'rgba(10,10,20,.82)', letterSpacing: 2, whiteSpace: 'nowrap', boxShadow: `0 0 40px ${cor}66`}}>{children}</div>
    </div>
  );
};

const Etiqueta: React.FC<{t: number; de: number; cor: string; children: React.ReactNode; style?: React.CSSProperties}> = ({t, de, cor, children, style}) => {
  const mola = useMola();
  const e = mola(t, de, 10, 240);
  if (e <= 0.01) return null;
  return (
    <div style={{position: 'absolute', opacity: e, scale: String(interpolate(e, [0, 1], [1.6, 1])), zIndex: 4, ...style}}>
      <div style={{padding: '12px 20px', borderRadius: 18, background: 'rgba(8,16,44,.95)', border: `4px solid ${cor}`, fontFamily: MONT, fontWeight: 900, fontSize: 28, color: COR.branco, whiteSpace: 'nowrap', boxShadow: `0 0 30px ${cor}55`}}>{children}</div>
    </div>
  );
};

// ---------- A loja ilustrada (900×1600) e os três planos dentro dela ----------

// 0 = aberto (a loja inteira), 1 = médio (você com o produto), 2 = fechado (o detalhe da peça: etiqueta e costura).
const VISTAS = [
  {x: 0, y: 0, w: 900, h: 1600},
  {x: 230, y: 470, w: 440, h: 782},
  {x: 410, y: 766, w: 190, h: 338},
];
const NOMES = ['ABERTO', 'MÉDIO', 'FECHADO'];

const vista = (p: number) => {
  const i = Math.min(1, Math.floor(Math.max(0, Math.min(2, p))));
  const f = Math.max(0, Math.min(2, p)) - i;
  const a = VISTAS[i], b = VISTAS[Math.min(2, i + 1)];
  // zoom em escala logarítmica: a aproximação parece uma câmera andando, não um salto
  const w = Math.exp(interpolate(f, [0, 1], [Math.log(a.w), Math.log(b.w)]));
  const k = (a.w - w) / Math.max(1e-6, a.w - b.w);
  const cx = interpolate(isFinite(k) ? k : f, [0, 1], [a.x + a.w / 2, b.x + b.w / 2]);
  const cy = interpolate(isFinite(k) ? k : f, [0, 1], [a.y + a.h / 2, b.y + b.h / 2]);
  const h = (w * 16) / 9;
  return `${cx - w / 2} ${cy - h / 2} ${w} ${h}`;
};

const CAMISAS = ['#FF6FA3', '#3EC6FF', '#FFC94D', '#2EE59D', '#8A3FFC'];

const Loja: React.FC<{t: number}> = ({t}) => (
  <>
    {/* parede, chão e toldo */}
    <rect x={0} y={0} width={900} height={1600} fill="#F6E7D7" />
    <rect x={0} y={1300} width={900} height={300} fill="#C9A27E" />
    {Array.from({length: 7}, (_, i) => <line key={i} x1={i * 150} y1={1300} x2={i * 150 - 60} y2={1600} stroke="#B48A66" strokeWidth={4} />)}
    {Array.from({length: 9}, (_, i) => <rect key={i} x={i * 100} y={0} width={100} height={150} fill={i % 2 ? '#FFFFFF' : COR.azul} />)}
    {Array.from({length: 9}, (_, i) => <circle key={i} cx={i * 100 + 50} cy={150} r={50} fill={i % 2 ? '#FFFFFF' : COR.azul} />)}
    <text x={450} y={300} textAnchor="middle" fontFamily={MONT} fontWeight={900} fontSize={70} fill="#18224A">SUA LOJINHA</text>
    {/* luminárias */}
    {[260, 640].map((x) => (
      <g key={x}>
        <line x1={x} y1={200} x2={x} y2={340} stroke="#18224A" strokeWidth={4} />
        <circle cx={x} cy={360} r={60} fill="#FFE9A8" opacity={0.35 + 0.1 * Math.sin(t * 3 + x)} />
        <path d={`M ${x - 34} 362 Q ${x} 318 ${x + 34} 362 Z`} fill="#18224A" />
      </g>
    ))}
    {/* arara com camisetas */}
    <line x1={40} y1={470} x2={310} y2={470} stroke="#8A8FA0" strokeWidth={10} strokeLinecap="round" />
    <line x1={60} y1={470} x2={60} y2={1300} stroke="#8A8FA0" strokeWidth={8} />
    <line x1={290} y1={470} x2={290} y2={1300} stroke="#8A8FA0" strokeWidth={8} />
    {CAMISAS.map((c, i) => {
      const x = 75 + i * 50, bal = 3 * Math.sin(t * 2 + i);
      return (
        <g key={c} transform={`rotate(${bal} ${x} 470)`}>
          <path d={`M ${x} 470 L ${x - 22} 500 L ${x + 22} 500 Z`} fill="none" stroke="#5A6075" strokeWidth={3} />
          <rect x={x - 26} y={498} width={52} height={230} rx={10} fill={c} stroke="rgba(0,0,0,.12)" strokeWidth={2} />
        </g>
      );
    })}
    {/* prateleira com peças dobradas */}
    {[520, 720, 920].map((y, r) => (
      <g key={y}>
        <rect x={630} y={y} width={240} height={14} rx={4} fill="#9A6A44" />
        {[0, 1, 2].map((j) => (
          <g key={j}>
            {[0, 1, 2].map((k) => <rect key={k} x={645 + j * 75} y={y - 30 - k * 30} width={62} height={28} rx={6} fill={CAMISAS[(r + j + k) % 5]} stroke="rgba(0,0,0,.12)" strokeWidth={2} />)}
          </g>
        ))}
      </g>
    ))}
    {/* vaso */}
    <rect x={760} y={1180} width={90} height={120} rx={14} fill="#18224A" />
    <ellipse cx={805} cy={1150} rx={70} ry={60} fill="#2EA86B" />
    {/* você, segurando a peça */}
    <circle cx={450} cy={600} r={98} fill="#1C1210" />
    <circle cx={378} cy={548} r={48} fill="#1C1210" />
    <circle cx={522} cy={548} r={48} fill="#1C1210" />
    <rect x={425} y={680} width={50} height={60} fill="#6B3F26" />
    <path d="M 320 1160 Q 315 770 450 735 Q 585 770 580 1160 Z" fill={COR.azul} />
    <ellipse cx={450} cy={632} rx={62} ry={72} fill="#7A4A2E" />
    <path d="M 410 606 Q 426 598 440 606" stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M 460 606 Q 474 598 490 606" stroke="#1C1210" strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={427} cy={624} rx={11} ry={8} fill="#fff" />
    <ellipse cx={473} cy={624} rx={11} ry={8} fill="#fff" />
    <circle cx={427} cy={624} r={5.5} fill="#1C1210" />
    <circle cx={473} cy={624} r={5.5} fill="#1C1210" />
    <path d="M 447 634 Q 451 648 456 645" stroke="#5A3220" strokeWidth={3} fill="none" strokeLinecap="round" />
    <path d="M 426 664 Q 450 680 474 664" stroke="#3A1E12" strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* a peça: camiseta rosa com estampa, etiqueta e costura */}
    <path d="M 360 830 L 410 810 Q 450 834 490 810 L 540 830 L 578 882 L 546 898 L 535 872 L 535 1012 L 365 1012 L 365 872 L 354 898 L 322 882 Z" fill="#FF6FA3" stroke="#D94E86" strokeWidth={3} />
    {Array.from({length: 40}, (_, i) => <circle key={i} cx={372 + (i % 8) * 22} cy={880 + Math.floor(i / 8) * 26} r={2.2} fill="rgba(255,255,255,.35)" />)}
    <path d="M 450 935 C 430 912 404 930 418 950 L 450 980 L 482 950 C 496 930 470 912 450 935 Z" fill="#FFFFFF" opacity={0.9} />
    <line x1={372} y1={998} x2={528} y2={998} stroke="#FFFFFF" strokeWidth={2.5} strokeDasharray="7 5" />
    <line x1={372} y1={1004} x2={528} y2={1004} stroke="#D94E86" strokeWidth={2} />
    <line x1={520} y1={846} x2={515} y2={886} stroke="#18224A" strokeWidth={2} />
    <g transform={`rotate(${4 + 2 * Math.sin(t * 2.4)} 515 886)`}>
      <rect x={486} y={886} width={62} height={86} rx={8} fill="#FFFFFF" stroke="#18224A" strokeWidth={2} />
      <circle cx={517} cy={898} r={4} fill="#18224A" />
      <text x={517} y={930} textAnchor="middle" fontFamily={MONT} fontWeight={900} fontSize={17} fill="#18224A">R$ 89</text>
      <text x={517} y={954} textAnchor="middle" fontFamily={INTER} fontWeight={700} fontSize={11} fill="#5A6075">algodão</text>
    </g>
    {/* balcão */}
    <rect x={210} y={1040} width={480} height={260} fill="#C98A55" />
    <rect x={200} y={1030} width={500} height={26} rx={6} fill="#E0A46C" />
    <rect x={250} y={1090} width={400} height={6} fill="rgba(0,0,0,.08)" />
  </>
);

// O "vídeo": a loja vista por um enquadramento. `plano` vai de 0 (aberto) a 2 (fechado); `barra` é o progresso do vídeo.
const Quadro: React.FC<{t: number; plano: number; w?: number; barra?: number; cor?: string; rotulo?: boolean; flash?: number; style?: React.CSSProperties}> = ({t, plano, w = 440, barra, cor = '#1B2238', rotulo = false, flash = 0, style}) => {
  const h = (w * 16) / 9, k = w / 440;
  const rec = Math.floor(t * 2) % 2 === 0;
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 40 * k, border: `${10 * k}px solid ${cor}`, background: '#05070C', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      <svg width="100%" height="100%" viewBox={vista(plano)} preserveAspectRatio="xMidYMid slice" style={{position: 'absolute', inset: 0}}>
        <Loja t={t} />
      </svg>
      <div style={{position: 'absolute', left: 14 * k, top: 14 * k, display: 'flex', alignItems: 'center', gap: 8 * k, padding: `${5 * k}px ${12 * k}px`, borderRadius: 99, background: 'rgba(0,0,0,.55)'}}>
        <div style={{width: 14 * k, height: 14 * k, borderRadius: 99, background: rec ? '#FF3B30' : 'rgba(255,59,48,.35)'}} />
        <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 20 * k, color: '#fff'}}>REC</span>
      </div>
      {rotulo && (
        <div style={{position: 'absolute', right: 14 * k, top: 14 * k, padding: `${5 * k}px ${12 * k}px`, borderRadius: 99, background: 'rgba(0,0,0,.55)', fontFamily: MONT, fontWeight: 900, fontSize: 20 * k, color: COR.ciano}}>
          {NOMES[Math.round(Math.max(0, Math.min(2, plano)))]}
        </div>
      )}
      {barra !== undefined && (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8 * k, background: 'rgba(255,255,255,.3)'}}>
          <div style={{width: `${100 * barra}%`, height: '100%', background: '#fff'}} />
        </div>
      )}
      {flash > 0.01 && <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: flash}} />}
    </div>
  );
};

const PALCO = {left: 320, top: 540};
const PALCO_D = {left: 600, top: 560};

// Lista à esquerda, com a linha da vez acesa.
const Lista: React.FC<{t: number; itens: {de: number; titulo: string; sub: string}[]; ativo: number; top?: number}> = ({t, itens, ativo, top = 660}) => {
  const mola = useMola();
  return (
    <div style={{position: 'absolute', left: 40, width: 520, top, display: 'flex', flexDirection: 'column', gap: 26}}>
      {itens.map((it, i) => {
        const e = mola(t, it.de, 11, 230);
        const on = i === ativo;
        return (
          <div key={it.titulo} style={{opacity: e * (on ? 1 : 0.55), translate: `${(1 - e) * -80}px 0px`, scale: String(on ? 1 : 0.92), transformOrigin: 'left center', padding: '18px 26px', borderRadius: 24, background: on ? 'rgba(6,40,70,.96)' : 'rgba(8,16,44,.9)', border: `4px solid ${on ? COR.ciano : 'rgba(255,255,255,.15)'}`, boxShadow: on ? `0 0 40px ${COR.ciano}55` : 'none'}}>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 50, color: on ? COR.ciano : COR.branco, lineHeight: 1}}>{it.titulo}</div>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.branco, marginTop: 8}}>{it.sub}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Abertura: o vídeo da loja que não muda ----------

// O clipe A não tem momento artificial na fala (só a cauda depois de «amador», já coberta): a Luísa entra em «vídeo».
const A0 = M.video - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden'}}>
      <Quadro t={t} plano={0} barra={(t / A0) % 1} style={{...PALCO, top: 620}} />
      <Etiqueta t={t} de={0.3} cor={COR.vermelho} style={{left: 60, top: 1250}}>📷 SEMPRE IGUAL</Etiqueta>
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>🎬</span> UM PLANO SÓ<br />DO <span style={{color: COR.vermelho}}>COMEÇO AO FIM</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Peito: React.FC<{t: number}> = ({t}) => {
  if (t < A0 || t >= T.meio + 0.1) return null;
  const e = 1 - prog(t, T.meio - 0.15, 0.25);
  return (
    <div style={{opacity: e}}>
      <Carimbo t={t} de={M.cara - 0.1} cor={COR.vermelho} tamanho={60} rot={-6} style={{left: 150, top: 1530}}>CARA DE AMADOR ✕</Carimbo>
    </div>
  );
};

// Marcador de retenção: as duas dicas acendem no rodapé.
const Marcador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.pronto + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.pronto + 0.1, 0.3));
  const marcas = [M.primeira, M.segunda];
  const nomes = ['🎬 OS 3 DE UMA VEZ', '✂️ TROCA A CADA FRASE'];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', gap: 14, opacity: e, zIndex: 6}}>
      {nomes.map((n, i) => {
        const on = t >= marcas[i] - 0.1;
        return <div key={n} style={{padding: '10px 16px', borderRadius: 16, background: on ? 'rgba(5,40,20,.95)' : 'rgba(8,16,44,.9)', border: `3px solid ${on ? COR.verde : 'rgba(255,255,255,.2)'}`, fontFamily: MONT, fontWeight: 900, fontSize: 24, color: on ? COR.branco : COR.cinza}}>{on ? n : `DICA ${i + 1}`}</div>;
      })}
    </div>
  );
};

// ---------- O porquê (1): o mesmo plano do começo ao fim ----------

const Porque1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.olho - 0.15);
  if (!st) return null;
  const quadros = [M.gravar, M.angulo, M.distancia];
  const tempos = ['0:01', '0:15', '0:30'];
  const igual = mola(t, M.comeco - 0.1, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.erro2 - 0.1} top={440} tamanho={52}>O ERRO: <span style={{color: COR.vermelho}}>TUDO IGUAL</span></Titulo>
      {quadros.map((de, i) => {
        const e = mola(t, de - 0.1, 12, 220);
        return (
          <div key={i} style={{position: 'absolute', left: 60 + i * 330, top: 640, opacity: e, translate: `0px ${(1 - e) * 80}px`}}>
            <Quadro t={t} plano={0} w={300} barra={[0.04, 0.5, 0.97][i]} cor={igual > 0.5 ? COR.vermelho : '#1B2238'} />
            <div style={{position: 'absolute', top: 548, left: 0, right: 0, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco, opacity: igual}}>{tempos[i]}</div>
          </div>
        );
      })}
      {[0, 1].map((i) => (
        <div key={i} style={{position: 'absolute', left: 340 + i * 330, top: 860, width: 70, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 80, color: COR.vermelho, opacity: igual, scale: String(interpolate(igual, [0, 1], [2, 1]))}}>=</div>
      ))}
      <Etiqueta t={t} de={M.angulo - 0.1} cor={COR.vermelho} style={{left: 60, top: 1250}}>📐 UM ÂNGULO SÓ</Etiqueta>
      <Etiqueta t={t} de={M.distancia - 0.1} cor={COR.vermelho} style={{left: 520, top: 1250}}>📏 MESMA DISTÂNCIA</Etiqueta>
    </AbsoluteFill>
  );
};

// ---------- O porquê (2): o olho cansa e o vídeo parece parado ----------

const Porque2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.olho - 0.15, M.bom - 0.15);
  if (!st) return null;
  const z = mola(t, M.cansa - 0.1, 12, 200);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.olho - 0.1} top={440} tamanho={52}>O OLHO <span style={{color: COR.vermelho}}>CANSA</span></Titulo>
      <Quadro t={t} plano={0} barra={prog(t, M.olho, M.bom - M.olho)} style={PALCO} />
      {z > 0.01 && ['z', 'z', 'Z'].map((l, i) => {
        const f = ((t - M.cansa) * 0.7 + i * 0.33) % 1;
        return <div key={i} style={{position: 'absolute', left: 820 + 40 * f + i * 10, top: 700 - 200 * f, fontFamily: MONT, fontWeight: 900, fontSize: 50 + 24 * i, color: COR.ciano, opacity: z * (1 - f)}}>{l}</div>;
      })}
      <Etiqueta t={t} de={M.cansa - 0.1} cor={COR.amarelo} style={{left: 40, top: 640}}>😴 nada muda</Etiqueta>
      <Carimbo t={t} de={M.parado - 0.15} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 300, top: 860}}>PARADO ⏸</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Os três planos: aberto, médio, fechado ----------

const Planos: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.bom - 0.15, M.primeira - 0.15);
  if (!st) return null;
  const plano = prog(t, M.medio - 0.12, 0.45, suave) + prog(t, M.fechado - 0.12, 0.45, suave);
  const ativo = t >= M.fechado - 0.1 ? 2 : t >= M.medio - 0.1 ? 1 : 0;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.bom - 0.1} top={440} tamanho={50}>VÍDEO BOM <span style={{color: COR.ciano}}>TROCA DE PLANO</span></Titulo>
      <Lista t={t} ativo={ativo} itens={[
        {de: M.aberto - 0.1, titulo: '🏪 ABERTO', sub: 'mostra a loja'},
        {de: M.medio - 0.1, titulo: '🙋🏾‍♀️ MÉDIO', sub: 'você com o produto'},
        {de: M.fechado - 0.1, titulo: '🔍 FECHADO', sub: 'o detalhe da peça'},
      ]} />
      <Quadro t={t} plano={plano} cor={COR.ciano} rotulo style={PALCO_D} />
    </AbsoluteFill>
  );
};

// ---------- Dica 1: grava os três de uma vez ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.primeira - 0.15, M.segunda - 0.15);
  if (!st) return null;
  // corte seco em cada "tomada": de longe, do meio, de perto
  const plano = t >= M.perto - 0.1 ? 2 : t >= M.meio - 0.1 ? 1 : 0;
  const ativo = plano;
  const flash = Math.max(0, 1 - Math.min(Math.abs(t - (M.meio - 0.1)), Math.abs(t - (M.perto - 0.1))) / 0.12) * (t > M.longe ? 0.7 : 0);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.primeira} n={1} />
      <Lista t={t} ativo={t >= M.longe - 0.1 ? ativo : -1} top={620} itens={[
        {de: M.tres - 0.1, titulo: '🎬 1 · LONGE', sub: 'a loja inteira'},
        {de: M.meio - 0.1, titulo: '🎬 2 · MEIO', sub: 'você e a peça'},
        {de: M.perto - 0.1, titulo: '🎬 3 · PERTO', sub: 'o detalhe'},
      ]} />
      <Quadro t={t} plano={plano} cor={COR.ciano} rotulo flash={flash} style={PALCO_D} />
      <Carimbo t={t} de={M.minuto - 0.2} cor={COR.verde} tamanho={52} rot={-5} style={{left: 60, top: 1180}}>⏱ LEVA 1 MINUTO</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: troca de plano a cada frase ----------

const FRASES = [
  {texto: '“Oi, gente!”', plano: 0},
  {texto: '“Chegou essa peça…”', plano: 1},
  {texto: '“Olha o tecido!”', plano: 2},
  {texto: '“Vem pra loja!”', plano: 0},
];

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.segunda - 0.15, M.pronto - 0.15);
  if (!st) return null;
  const marcas = [M.troca2 - 0.1, M.frase - 0.1, M.comecou - 0.1, M.enquadramento - 0.1];
  const atual = marcas.filter((m) => t >= m).length - 1;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.segunda} n={2} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 600, display: 'flex', flexDirection: 'column', gap: 22}}>
        {FRASES.map((f, i) => {
          const e = mola(t, marcas[i], 11, 230);
          const on = i === atual;
          return (
            <div key={f.texto} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '14px 22px', borderRadius: 26, background: on ? 'rgba(6,40,70,.96)' : 'rgba(8,16,44,.9)', border: `4px solid ${on ? COR.ciano : 'rgba(255,255,255,.15)'}`, opacity: e * (on ? 1 : 0.6), translate: `${(1 - e) * 120}px 0px`, boxShadow: on ? `0 0 40px ${COR.ciano}55` : 'none'}}>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.cinza, width: 44}}>{i + 1}</div>
              <div style={{flex: 1, fontFamily: INTER, fontWeight: 800, fontSize: 34, color: COR.branco}}>{f.texto}</div>
              <div style={{position: 'relative', width: 72, height: 128}}>
                <Quadro t={t} plano={f.plano} w={72} cor={on ? COR.ciano : '#1B2238'} />
              </div>
              <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 28, color: on ? COR.ciano : COR.branco, width: 150}}>{NOMES[f.plano]}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fecho: o mesmo vídeo, agora com cara de profissional ----------

const CORTES = [0, 1, 2, 1, 0, 2, 1, 2];

const Fecho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.pronto - 0.15, T.b - 0.1);
  if (!st) return null;
  const passo = 0.42;
  const k = Math.max(0, t - M.pronto);
  const plano = CORTES[Math.floor(k / passo) % CORTES.length];
  const flash = k > passo ? Math.max(0, 1 - (k % passo) / 0.1) * 0.5 : 0;
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.pronto - 0.1} top={440} tamanho={52}>O MESMO VÍDEO</Titulo>
      <Quadro t={t} plano={plano} barra={prog(t, M.pronto, T.b - M.pronto)} cor={COR.verde} rotulo flash={flash} style={PALCO} />
      <Carimbo t={t} de={M.profissional - 0.15} cor={COR.verde} tamanho={50} rot={-6} style={{left: 130, top: 760}}>CARA DE PROFISSIONAL ✓</Carimbo>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: seguir (mesmo CTA e mesmo clipe do 015) ----------

const B1 = M.segue + 0.2;
const B2 = M.toda - 0.2;

const CartaoResumo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, T.b, B1 - 0.02, 0);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 820, padding: '34px 40px', borderRadius: 36, ...caixa, marginTop: -260}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 48, color: COR.ciano, marginBottom: 18}}>🎬 TRÊS PLANOS</div>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.45, color: COR.branco}}>📷 Aberto, médio e fechado de uma vez<br />✂️ Troca de plano a cada frase</div>
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
      <Peito t={t} />
      <Porque1 t={t} />
      <Porque2 t={t} />
      <Planos t={t} />
      <Dica1 t={t} />
      <Dica2 t={t} />
      <Fecho t={t} />
      <CardVoz t={t} />
      <Marcador t={t} />
      <CartaoResumo t={t} />
      <SeguirSobre t={t} />
      <TodaSemana t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  // Abertura
  {som: 'swoosh', em: 0, volume: 0.5},
  {som: 'whoosh_in', em: 0.15, volume: 0.45},
  {som: 'pop', em: 0.3, volume: 0.35},
  {som: 'impacto', em: M.cara - 0.1, volume: 0.65},
  // Porquê
  {som: 'pop', em: M.erro2 - 0.1, volume: 0.4},
  {som: 'tique', em: M.gravar - 0.1, volume: 0.4},
  {som: 'tique', em: M.angulo - 0.1, volume: 0.4},
  {som: 'tique', em: M.distancia - 0.1, volume: 0.4},
  {som: 'risco', em: M.comeco - 0.1, volume: 0.45},
  {som: 'swoosh', em: M.olho - 0.15, volume: 0.4},
  {som: 'pop', em: M.cansa - 0.1, volume: 0.35},
  {som: 'impacto', em: M.parado - 0.15, volume: 0.5},
  // Os três planos
  {som: 'swoosh', em: M.bom - 0.15, volume: 0.4},
  {som: 'pop', em: M.aberto - 0.1, volume: 0.4},
  {som: 'whoosh_in', em: M.medio - 0.12, volume: 0.45},
  {som: 'whoosh_in', em: M.fechado - 0.12, volume: 0.45},
  // Dicas
  {som: 'impacto', em: M.primeira, volume: 0.5},
  {som: 'pop', em: M.tres - 0.1, volume: 0.35},
  {som: 'tecla', em: M.meio - 0.1, volume: 0.5},
  {som: 'tecla', em: M.perto - 0.1, volume: 0.5},
  {som: 'ding', em: M.minuto - 0.2, volume: 0.5},
  {som: 'impacto', em: M.segunda, volume: 0.5},
  {som: 'pop', em: M.troca2 - 0.1, volume: 0.35},
  {som: 'pop', em: M.frase - 0.1, volume: 0.35},
  {som: 'pop', em: M.comecou - 0.1, volume: 0.35},
  {som: 'pop', em: M.enquadramento - 0.1, volume: 0.35},
  // Fecho
  {som: 'swoosh', em: M.pronto - 0.15, volume: 0.4},
  {som: 'ding', em: M.profissional - 0.15, volume: 0.55},
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
    // Até "vídeo" a abertura (o vídeo que não muda) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.cara - 0.3, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio - 0.17, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {'amador.': COR.vermelho, 'cansa': COR.vermelho, 'parado.': COR.vermelho, 'Aberto,': COR.ciano, 'Médio,': COR.ciano, 'fechado,': COR.ciano, 'longe,': COR.ciano, 'meio': COR.ciano, 'perto.': COR.ciano, 'profissional.': COR.verde},
  eventos: EVENTOS,
  Cena,
};
