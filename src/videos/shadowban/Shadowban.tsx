import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Toque} from '../destaques-instagram/Componentes';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from './tema';

// 020 · O shadowban existe, e o Instagram tem uma tela que mostra se você está nele.
// Abertura (perfil sumindo + SHADOWBAN + "EXISTE") → post contra as regras de recomendação: seguidor vê, quem não segue
// não vê → repetir tira o perfil inteiro (SHADOWBAN escrito grande) → motivos comuns → o caminho com os prints reais do
// app (Configurações e atividade → Status da conta) → Qualificação de recomendação → dica 1: editar ou apagar → dica 2:
// pedir nova análise → CTA.

const T = TRECHOS;
const M = {
  shadowban1: em('shadowban'),
  existe: em('existe'),
  e1: em('e'),
  tela: em('tela'),
  voce1: em('você'),
  regras: em('regras'),
  segue1: em('segue'),
  naoSegue: em('não', em('segue')),
  eSe: em('e', T.meio),
  inteiro: em('inteiro'),
  tempo: em('tempo'),
  chama: em('chama'),
  shadow2: em('shadow'),
  os: em('os', em('shadow')),
  sugestivo: em('sugestivo'),
  violencia: em('violência'),
  cigarro: em('cigarro'),
  para: em('para', em('eletrônico')),
  perfil2: em('perfil', em('eletrônico')),
  menu: em('menu'),
  configuracoes: em('configurações'),
  desce: em('desce'),
  caminho: em('status'),
  olha: em('olha'),
  qualificacao: em('qualificação'),
  verde: em('verde'),
  certo: em('certo'),
  seNao: em('se', em('certo')),
  naoVerde: em('não', em('certo')),
  toca: em('toca', em('certo')),
  mostra2: em('mostra', em('toca', em('certo'))),
  edita: em('edita'),
  apaga: em('apaga'),
  eSe2: em('e', em('post', em('apaga'))),
  engano: em('engano'),
  pede: em('pede'),
  equipe: em('equipe'),
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

// "SHADOWBAN" escrito grande, com tremida de glitch (pedido do Diogo: a palavra aparece sempre que ela fala).
const PalavraShadowban: React.FC<{t: number; de: number; tamanho?: number; style?: React.CSSProperties}> = ({t, de, tamanho = 150, style}) => {
  const mola = useMola();
  const e = mola(t, de, 9, 260);
  if (e <= 0.01) return null;
  const glitch = (1 - prog(t, de + 0.05, 0.35)) * 1;
  const dx = Math.sin(t * 90) * 14 * glitch;
  const base: React.CSSProperties = {position: 'absolute', inset: 0, fontFamily: MONT, fontWeight: 900, fontSize: tamanho, letterSpacing: 4, textAlign: 'center', whiteSpace: 'nowrap'};
  return (
    <div style={{position: 'absolute', left: 0, right: 0, height: tamanho * 1.2, opacity: Math.min(1, e * 1.5), scale: String(interpolate(e, [0, 1], [2.2, 1])), ...style}}>
      <div style={{...base, color: COR.ciano, translate: `${-dx - 6 * glitch}px 0px`, opacity: 0.8 * glitch}}>SHADOWBAN</div>
      <div style={{...base, color: COR.vermelho, translate: `${dx + 6 * glitch}px 0px`, opacity: 0.8 * glitch}}>SHADOWBAN</div>
      <div style={{...base, color: COR.branco, textShadow: `0 0 40px rgba(255,77,94,.7), 0 10px 30px rgba(0,0,0,.6)`}}>SHADOWBAN</div>
    </div>
  );
};

// Celular com um print real do app. `zoom` e o centro (em px do print 924×2000) aproximam um trecho; `marca` é a faixa
// do marca-texto (y inicial e final, em px do print). O print não é editado: tudo entra por cima.
const PRINT_W = 924;
const PRINT_H = 2000;
const CelularPrint: React.FC<{src: string; w: number; h: number; zoom: number; cy: number; marca?: [number, number]; marcaP?: number; circulo?: {x: number; y: number; r: number; e: number; pulso: number}; style?: React.CSSProperties}> = ({src, w, h, zoom, cy, marca, marcaP = 0, circulo, style}) => {
  const k = (w / PRINT_W) * zoom;
  const top = Math.min(0, Math.max(h - PRINT_H * k, h / 2 - cy * k));
  return (
    <div style={{position: 'absolute', width: w, height: h, borderRadius: 46, border: '10px solid #1B2238', background: '#0D1117', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.55)', ...style}}>
      <div style={{position: 'absolute', left: Math.min(0, (w - PRINT_W * k) / 2) * (zoom > 1 ? 0 : 1), top, width: PRINT_W * k, height: PRINT_H * k}}>
        <Img src={src} style={{width: '100%', height: '100%'}} />
        {marca && marcaP > 0.01 && (
          <div style={{position: 'absolute', left: 14 * k, top: marca[0] * k, height: (marca[1] - marca[0]) * k, width: (PRINT_W - 28) * k * marcaP, borderRadius: 10 * k, background: 'rgba(255,214,10,.28)', border: `${4 * k}px solid ${COR.amarelo}`, boxShadow: `0 0 ${30 * k}px rgba(255,214,10,.5)`}} />
        )}
        {circulo && circulo.e > 0.01 && <div style={{position: 'absolute', left: (circulo.x - circulo.r) * k, top: (circulo.y - circulo.r) * k, width: 2 * circulo.r * k, height: 2 * circulo.r * k, borderRadius: 999, border: `${6 * k}px solid ${COR.verde}`, scale: String(circulo.pulso), opacity: circulo.e, boxShadow: `0 0 ${30 * k}px ${COR.verde}`}} />}
      </div>
    </div>
  );
};

// ---------- Abertura: perfil sumindo + SHADOWBAN + "existe" ----------

const A0 = M.e1 - 0.05;

const Abertura: React.FC<{t: number}> = ({t}) => {
  if (t >= A0 + 0.25) return null;
  const sai = prog(t, A0 - 0.05, 0.25);
  const cinza = prog(t, 0.05, 0.6);
  const tremor = Math.sin(t * 80) * 10 * prog(t, M.existe - 0.04, 0.04) * (1 - prog(t, M.existe + 0.02, 0.15));
  const posts = ['🛍️', '👗', '🎀', '👟', '🌸', '💍'];
  return (
    <AbsoluteFill style={{opacity: 1 - sai, background: '#05091A', overflow: 'hidden', translate: `${tremor}px 0px`}}>
      <div style={{position: 'absolute', left: 140, top: 520, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, filter: `grayscale(${cinza}) blur(${cinza * 5}px)`, opacity: 1 - 0.6 * cinza}}>
        {posts.map((e) => <div key={e} style={{width: 255, height: 340, borderRadius: 14, background: 'linear-gradient(165deg, #FFB37A, #E0607E 55%, #7A3E9A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120}}>{e}</div>)}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1280, textAlign: 'center', fontSize: 120, opacity: cinza}}>🙈</div>
      <PalavraShadowban t={t} de={M.shadowban1 - 0.05} tamanho={112} style={{top: 780}} />
      <Carimbo t={t} de={M.existe - 0.05} cor={COR.verde} tamanho={80} rot={-6} style={{left: 330, top: 980}}>EXISTE ✓</Carimbo>
      <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * prog(t, M.existe - 0.05, 0.05) * (1 - prog(t, M.existe, 0.2))})`}} />
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
            <span style={{scale: String(1 + 0.12 * pulso), display: 'inline-block'}}>⚠️</span> O <span style={{color: COR.vermelho}}>SHADOWBAN</span><br />EXISTE
          </div>
        </div>
      </div>
    </>
  );
};

// No peito dela: a tela misteriosa (nome borrado até a revelação) e a pergunta.
const TelaMisterio: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.tela - 0.2 || t >= T.meio + 0.1) return null;
  const e = mola(t, M.tela - 0.15, 12, 210) * (1 - prog(t, T.meio - 0.15, 0.25));
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1340, display: 'flex', justifyContent: 'center', opacity: e, translate: `0px ${(1 - e) * 60}px`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 28px', borderRadius: 26, background: 'rgba(14,22,48,.95)', border: `4px solid ${COR.ciano}`}}>
          <span style={{fontSize: 54}}>📱</span>
          <span style={{fontFamily: INTER, fontWeight: 800, fontSize: 40, color: COR.branco, filter: 'blur(9px)'}}>Status da conta</span>
          <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: COR.amarelo}}>?</span>
        </div>
      </div>
      <Carimbo t={t} de={M.voce1 - 0.05} cor={COR.vermelho} tamanho={60} rot={-7} style={{left: 230, top: 1530}}>VOCÊ ESTÁ NELE?</Carimbo>
    </>
  );
};

// Contador de retenção: "a tela aparece em Ns" até a palavra "status".
const Contador: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < T.meio + 0.3 || t >= M.caminho + 0.4) return null;
  const e = mola(t, T.meio + 0.3, 13, 200) * (1 - prog(t, M.caminho + 0.1, 0.3));
  const resta = Math.max(0, Math.ceil(M.caminho - t));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1580, display: 'flex', justifyContent: 'center', opacity: e, zIndex: 6}}>
      <div style={{padding: '12px 26px', borderRadius: 999, background: 'rgba(40,6,12,.9)', border: `3px solid ${COR.vermelho}`, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco}}>
        ⏳ a tela aparece em <span style={{color: COR.vermelho, fontFamily: MONT, fontWeight: 900}}>{resta}s</span>
      </div>
    </div>
  );
};

// ---------- Seguidor vê, quem não segue não vê ----------

const MiniCelular: React.FC<{titulo: string; cor: string; visivel: boolean; e: number; style?: React.CSSProperties}> = ({titulo, cor, visivel, e, style}) => (
  <div style={{position: 'absolute', width: 380, textAlign: 'center', opacity: e, scale: String(0.8 + 0.2 * e), ...style}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 38, color: cor, marginBottom: 14}}>{titulo}</div>
    <div style={{height: 520, borderRadius: 40, border: '9px solid #1B2238', background: '#0B1122', overflow: 'hidden', position: 'relative'}}>
      <div style={{position: 'absolute', left: 24, right: 24, top: 40, height: 380, borderRadius: 18, background: visivel ? 'linear-gradient(165deg, #FFB37A, #E0607E 55%, #7A3E9A)' : 'rgba(255,255,255,.06)', border: visivel ? 'none' : '3px dashed rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 130}}>{visivel ? '🛍️' : ''}</div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, fontSize: 70}}>{visivel ? '✅' : '❌'}</div>
    </div>
  </div>
);

const Seguidores: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio, M.eSe - 0.15);
  if (!st) return null;
  const regras = mola(t, M.regras - 0.1, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.regras - 0.1} top={440} tamanho={46}>POST CONTRA AS <span style={{color: COR.amarelo}}>REGRAS DE RECOMENDAÇÃO</span></Titulo>
      {regras > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center', fontSize: 90, opacity: regras * (1 - prog(t, M.segue1 - 0.4, 0.3))}}>📄⚠️</div>}
      <MiniCelular titulo="QUEM TE SEGUE" cor={COR.verde} visivel e={mola(t, M.segue1 - 0.2, 12, 200)} style={{left: 110, top: 600}} />
      <MiniCelular titulo="QUEM NÃO SEGUE" cor={COR.vermelho} visivel={false} e={mola(t, M.naoSegue - 0.2, 12, 200)} style={{left: 590, top: 600}} />
    </AbsoluteFill>
  );
};

// ---------- O perfil inteiro sai + SHADOWBAN ----------

const Perfil: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eSe - 0.15, M.os - 0.1);
  if (!st) return null;
  const card = mola(t, M.eSe, 12, 200);
  const cinza = prog(t, M.inteiro - 0.1, 0.5);
  const tempo = mola(t, M.tempo - 0.1, 10, 240);
  const slam = t >= M.shadow2 - 0.15;
  return (
    <AbsoluteFill style={st}>
      <div style={{opacity: 1 - prog(t, M.shadow2 - 0.15, 0.15)}}>
        <Titulo t={t} de={M.eSe} top={440} tamanho={48}>SE SE <span style={{color: COR.vermelho}}>REPETIR</span>…</Titulo>
        <div style={{position: 'absolute', left: 120, right: 120, top: 600, padding: 28, borderRadius: 30, ...caixa, opacity: card}}>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza, marginBottom: 18}}>Sugestões para você</div>
          <div style={{display: 'flex', gap: 20}}>
            {[['🏪', 'sua.lojinha', true], ['🍰', 'doce.da.ana', false], ['👟', 'tenis.club', false]].map(([a, n, voce]) => (
              <div key={n as string} style={{flex: 1, padding: 18, borderRadius: 20, background: 'rgba(255,255,255,.06)', textAlign: 'center', filter: voce ? `grayscale(${cinza})` : undefined, opacity: voce ? 1 - 0.7 * cinza : 1, border: voce ? `3px solid ${cinza > 0.5 ? COR.vermelho : COR.ciano}` : '3px solid transparent'}}>
                <div style={{fontSize: 80}}>{a}</div>
                <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.branco}}>{n}</div>
                <div style={{marginTop: 10, padding: '8px 0', borderRadius: 12, background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 22, color: COR.branco}}>Seguir</div>
              </div>
            ))}
          </div>
        </div>
        {cinza > 0.5 && <Carimbo t={t} de={M.inteiro + 0.3} cor={COR.vermelho} tamanho={48} rot={-6} style={{left: 120, top: 990}}>PERFIL INTEIRO FORA ✕</Carimbo>}
        {tempo > 0.01 && <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: tempo}}><Pilula cor={COR.amarelo} tamanho={36} fundo="rgba(40,30,5,.92)">⏳ POR UM TEMPO</Pilula></div>}
      </div>
      {slam && (
        <>
          <AbsoluteFill style={{background: `rgba(255,40,60,${0.35 * (1 - prog(t, M.shadow2, 0.25))})`}} />
          <Titulo t={t} de={M.chama - 0.1} top={600} tamanho={46} cor={COR.cinza}>TODO MUNDO CHAMA DE:</Titulo>
          <PalavraShadowban t={t} de={M.shadow2 - 0.08} tamanho={112} style={{top: 780}} />
        </>
      )}
    </AbsoluteFill>
  );
};

// ---------- Motivos mais comuns ----------

const Motivos: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.os - 0.1, M.para - 0.15);
  if (!st) return null;
  const itens = [
    {de: M.sugestivo - 0.15, icone: '🔞', nome: 'CONTEÚDO SUGESTIVO'},
    {de: M.violencia - 0.15, icone: '🥊', nome: 'VIOLÊNCIA'},
    {de: M.cigarro - 0.15, icone: '🚬', nome: 'CIGARRO ELETRÔNICO'},
  ];
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.os} top={440} tamanho={52}>OS MOTIVOS <span style={{color: COR.amarelo}}>MAIS COMUNS</span></Titulo>
      <div style={{position: 'absolute', left: 130, right: 130, top: 590, display: 'flex', flexDirection: 'column', gap: 26}}>
        {itens.map((c) => {
          const e = mola(t, c.de, 11, 220);
          return (
            <div key={c.nome} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '22px 30px', borderRadius: 28, ...caixa, border: `3px solid ${COR.vermelho}66`, opacity: e, translate: `${(1 - e) * 140}px 0px`}}>
              <span style={{fontSize: 90}}>{c.icone}</span>
              <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: COR.branco}}>{c.nome}</span>
            </div>
          );
        })}
      </div>
      <Fonte t={t} de={M.sugestivo} ate={M.para} top={1250} veiculo="Central de Ajuda do Instagram" titulo="Diretrizes de recomendação" />
    </AbsoluteFill>
  );
};

// ---------- O caminho: Perfil → ☰ → Configurações e atividade → Status da conta ----------

const Caminho: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.para - 0.15, M.olha - 0.15);
  if (!st) return null;
  const passos = [
    {de: M.perfil2 - 0.1, texto: '👤 Perfil'},
    {de: M.menu - 0.1, texto: '☰ Menu'},
    {de: M.configuracoes - 0.1, texto: '⚙️ Configurações e atividade'},
    {de: M.caminho - 0.1, texto: '📍 Status da conta'},
  ];
  const cel = mola(t, M.configuracoes - 0.1, 12, 200);
  const zoom = interpolate(prog(t, M.desce - 0.2, 0.8, suave), [0, 1], [1, 1.5]);
  const marca = prog(t, M.caminho - 0.05, 0.4, saida);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 440, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
        {passos.map((p, i) => {
          const e = mola(t, p.de, 11, 230);
          const ultimo = i === passos.length - 1;
          return (
            <div key={p.texto} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: e, scale: String(interpolate(e, [0, 1], [1.5, 1]))}}>
              {i > 0 && <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: COR.cinza}}>→</span>}
              <div style={{padding: '10px 18px', borderRadius: 16, background: ultimo ? 'rgba(40,30,5,.95)' : 'rgba(8,16,44,.95)', border: `3px solid ${ultimo ? COR.amarelo : COR.ciano}`, fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.branco, whiteSpace: 'nowrap'}}>{p.texto}</div>
            </div>
          );
        })}
      </div>
      {cel > 0.01 && (
        <div style={{opacity: cel}}>
          <CelularPrint src={ARQ.configuracoes} w={460} h={680} zoom={zoom} cy={975} marca={[925, 1025]} marcaP={marca} style={{left: 310, top: 610}} />
          <Toque t={t} de={M.caminho - 0.5} toque={M.caminho - 0.1} x={640} y={960} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- A tela: Qualificação de recomendação ----------

const TelaStatus: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.olha - 0.15, M.seNao - 0.15);
  if (!st) return null;
  const cel = mola(t, M.olha - 0.1, 12, 200);
  const zoom = 1;
  const marca = prog(t, M.qualificacao - 0.05, 0.4, saida);
  const verde = mola(t, M.verde - 0.1, 9, 260);
  const pulso = 1 + 0.25 * verde * Math.abs(Math.sin((t - M.verde) * 8));
  return (
    <AbsoluteFill style={st}>
      <Titulo t={t} de={M.olha} top={440} tamanho={46}>OLHA: <span style={{color: COR.amarelo}}>QUALIFICAÇÃO DE RECOMENDAÇÃO</span></Titulo>
      <div style={{opacity: cel}}>
        <CelularPrint src={ARQ.status} w={720} h={600} zoom={zoom} cy={interpolate(prog(t, M.qualificacao - 0.3, 0.7, suave), [0, 1], [900, 1246])} marca={[1196, 1296]} marcaP={marca} circulo={{x: 867, y: 1246, r: 46, e: verde, pulso}} style={{left: 180, top: 620}} />
      </div>
      <Carimbo t={t} de={M.certo - 0.1} cor={COR.verde} tamanho={52} rot={-5} style={{left: 290, top: 1130}}>VERDE = TUDO CERTO ✓</Carimbo>
      <Fonte t={t} de={M.olha} ate={M.seNao} top={1240} veiculo="Instagram para criadores" titulo="O que criadores precisam saber sobre recomendações" />
    </AbsoluteFill>
  );
};

// ---------- Dica 1: não está verde → qual post → editar ou apagar ----------

const Dica1: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.seNao - 0.15, M.eSe2 - 0.15);
  if (!st) return null;
  const linha = mola(t, M.naoVerde - 0.1, 11, 220);
  const post = mola(t, M.mostra2 - 0.1, 12, 200);
  const editar = mola(t, M.edita - 0.1, 10, 240);
  const apagar = mola(t, M.apaga - 0.1, 10, 240);
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.seNao} n={1} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 570, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 30px', borderRadius: 24, background: '#0D1117', border: `3px solid ${COR.amarelo}`, opacity: linha, translate: `0px ${(1 - linha) * 40}px`}}>
        <span style={{fontFamily: INTER, fontWeight: 600, fontSize: 38, color: COR.branco}}>Qualificação de recomendação</span>
        <span style={{fontSize: 52}}>⚠️</span>
      </div>
      {linha > 0.01 && <div style={{position: 'absolute', left: 90, top: 690, opacity: linha, fontFamily: INTER, fontWeight: 700, fontSize: 24, color: COR.amarelo}}>exemplo</div>}
      <Toque t={t} de={M.toca - 0.4} toque={M.toca} x={880} y={620} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: post, scale: String(0.85 + 0.15 * post)}}>
        <div style={{width: 520, padding: 22, borderRadius: 28, ...caixa, textAlign: 'center'}}>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 28, color: COR.cinza, marginBottom: 14}}>O post que causou o problema</div>
          <div style={{height: 220, borderRadius: 18, background: 'linear-gradient(165deg, #3A2E5C, #1A1430)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110}}>🚬</div>
          <div style={{display: 'flex', gap: 16, marginTop: 18}}>
            <div style={{flex: 1, padding: '16px 0', borderRadius: 16, background: COR.azul, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco, opacity: 0.3 + 0.7 * editar, scale: String(0.9 + 0.1 * editar)}}>✏️ EDITAR</div>
            <div style={{flex: 1, padding: '16px 0', borderRadius: 16, background: COR.vermelho, fontFamily: INTER, fontWeight: 800, fontSize: 32, color: COR.branco, opacity: 0.3 + 0.7 * apagar, scale: String(0.9 + 0.1 * apagar)}}>🗑️ APAGAR</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Dica 2: foi engano → pedir nova análise ----------

const Dica2: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.eSe2 - 0.15, T.b - 0.1);
  if (!st) return null;
  const engano = mola(t, M.engano - 0.1, 10, 240);
  const botao = mola(t, M.pede - 0.2, 11, 220);
  const apertado = t >= M.pede + 0.15;
  return (
    <AbsoluteFill style={st}>
      <SeloDica t={t} de={M.eSe2} n={2} />
      {engano > 0.01 && <Titulo t={t} de={M.engano - 0.1} top={600} tamanho={64}>FOI <span style={{color: COR.amarelo}}>ENGANO?</span> 🤔</Titulo>}
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', opacity: botao, scale: String((0.85 + 0.15 * botao) * (apertado ? 1 - 0.05 * (1 - prog(t, M.pede + 0.15, 0.2)) : 1))}}>
        <div style={{padding: '26px 46px', borderRadius: 24, background: apertado ? 'rgba(255,255,255,.14)' : COR.azul, border: `3px solid ${COR.ciano}`, fontFamily: INTER, fontWeight: 800, fontSize: 42, color: COR.branco}}>{apertado ? 'Análise pedida ✓' : '🔁 Pedir nova análise'}</div>
      </div>
      <Toque t={t} de={M.pede - 0.5} toque={M.pede + 0.1} x={760} y={850} />
      <Carimbo t={t} de={M.equipe - 0.1} cor={COR.verde} tamanho={56} rot={-5} style={{left: 230, top: 1010}}>A EQUIPE REVISA ✓</Carimbo>
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
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.35, color: COR.branco}}>Instagram para criadores · Central de Ajuda<br />TechCrunch (dez/2022) · prints do app (out/2026)</div>
        <div style={{marginTop: 10, fontFamily: INTER, fontWeight: 600, fontSize: 26, color: COR.cinza}}>O item com ⚠️ é um exemplo.</div>
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
      <TelaMisterio t={t} />
      <Seguidores t={t} />
      <Perfil t={t} />
      <Motivos t={t} />
      <Caminho t={t} />
      <TelaStatus t={t} />
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
  {som: 'swoosh', em: 0, volume: 0.5},
  {som: 'impacto', em: M.shadowban1 - 0.05, volume: 0.65},
  {som: 'risco', em: M.shadowban1, volume: 0.4},
  {som: 'impacto', em: M.existe - 0.05, volume: 0.6},
  {som: 'pop', em: M.tela - 0.15, volume: 0.45},
  {som: 'impacto', em: M.voce1 - 0.05, volume: 0.55},
  // Contador
  ...passos(T.meio + 0.3, M.caminho, Math.max(1, Math.round(M.caminho - T.meio))).map((s): Evento => ({som: 'tique', em: s, volume: 0.12})),
  // Seguidores
  {som: 'pop', em: M.regras - 0.1, volume: 0.4},
  {som: 'ding', em: M.segue1 - 0.2, volume: 0.45},
  {som: 'risco', em: M.naoSegue - 0.2, volume: 0.5},
  // Perfil + SHADOWBAN
  {som: 'whoosh_in', em: M.eSe - 0.15, volume: 0.4},
  {som: 'risco', em: M.inteiro + 0.3, volume: 0.45},
  {som: 'tique', em: M.tempo - 0.1, volume: 0.35},
  {som: 'impacto', em: M.shadow2 - 0.08, volume: 0.7},
  {som: 'swoosh', em: M.shadow2 - 0.05, volume: 0.45},
  // Motivos
  {som: 'pop', em: M.sugestivo - 0.15, volume: 0.4},
  {som: 'pop', em: M.violencia - 0.15, volume: 0.4},
  {som: 'pop', em: M.cigarro - 0.15, volume: 0.4},
  // Caminho
  {som: 'tecla', em: M.perfil2 - 0.1, volume: 0.45},
  {som: 'tecla', em: M.menu - 0.1, volume: 0.45},
  {som: 'tecla', em: M.configuracoes - 0.1, volume: 0.45},
  {som: 'whoosh_in', em: M.desce - 0.2, volume: 0.4},
  {som: 'toque', em: M.caminho - 0.1, volume: 0.6},
  {som: 'ding', em: M.caminho, volume: 0.55},
  // Status
  {som: 'whoosh_in', em: M.olha - 0.15, volume: 0.4},
  {som: 'pop', em: M.qualificacao - 0.05, volume: 0.45},
  {som: 'ding', em: M.verde - 0.1, volume: 0.5},
  {som: 'impacto', em: M.certo - 0.1, volume: 0.45},
  // Dica 1
  {som: 'impacto', em: M.seNao, volume: 0.5},
  {som: 'toque', em: M.toca, volume: 0.6},
  {som: 'pop', em: M.mostra2 - 0.1, volume: 0.4},
  {som: 'pop', em: M.edita - 0.1, volume: 0.4},
  {som: 'pop', em: M.apaga - 0.1, volume: 0.4},
  // Dica 2
  {som: 'impacto', em: M.eSe2, volume: 0.5},
  {som: 'pop', em: M.engano - 0.1, volume: 0.4},
  {som: 'toque', em: M.pede + 0.1, volume: 0.6},
  {som: 'ding', em: M.equipe - 0.1, volume: 0.5},
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
    // Até "e o Instagram" a abertura (SHADOWBAN + EXISTE) cobre a Luísa e o começo congelado do clipe.
    {de: T.a, modo: 'fora'},
    {de: A0, modo: 'cheia', escala: [1.1, 1.14], punch: true},
    {de: M.voce1, modo: 'cheia', escala: [1.2, 1.24], punch: true},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'fora'},
    {de: B1, modo: 'cheia', escala: [1.02, 1.06]},
    {de: B2, modo: 'fora'},
  ],
  semLegenda: [
    [0, A0],
    [M.shadow2 - 0.15, M.os - 0.1],
    [T.b, B2],
    [B2, T.fim],
  ],
  corEspecial: {shadowban: COR.vermelho, shadow: COR.vermelho, ban: COR.vermelho, verde: COR.verde, status: COR.amarelo},
  eventos: EVENTOS,
  Cena,
};
