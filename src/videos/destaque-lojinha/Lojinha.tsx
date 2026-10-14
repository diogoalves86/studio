import React from 'react';
import {AbsoluteFill, Img, interpolate} from 'remotion';
import {Check, Seta} from '../reels-avatar/Icones';
import {contar, Palavras, Risco, Selo, Toque} from '../destaques-instagram/Componentes';
import {Cartao, Grafico, Loja} from '../destaques-instagram/Icones';
import {Config, Evento} from './Destaque';
import {em, PALAVRAS, TRECHOS} from './palavras';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// 003 · Destaque para dono de lojinha: a dor (falta de tempo, post que ninguém curte) → o Digo sugere, cria,
// publica depois da aprovação e mostra o resultado → 7 dias grátis. Conversa com digosocial.com/empreendedores.
// Economia de créditos: avatar só na abertura e no CTA; no meio, a foto oficial num card de voz.

const T = TRECHOS;
const M = {
  lojinha: em('lojinha'),
  instagram: em('instagram'),
  sua: em('sua'),
  e: em('e'),
  voce: em('você'),
  precisa: em('precisa', em('você')),
  tempo: em('tempo'),
  voce2: em('você', T.meio - 0.1),
  vende: em('vende'),
  atende: em('atende'),
  responde: em('responde'),
  direct: em('direct'),
  e2: em('e', T.meio),
  ainda: em('ainda'),
  noite: em('noite'),
  canva: em('canva'),
  pra: em('pra'),
  quase: em('quase'),
  ninguem: em('ninguém'),
  curte: em('curte'),
  o: em('o', em('curte')),
  digo: em('digo'),
  sugere: em('sugere'),
  postar: em('postar'),
  quando: em('quando'),
  cria: em('cria'),
  imagem: em('imagem'),
  legenda: em('legenda'),
  publica: em('publica'),
  instagram2: em('instagram', em('publica')),
  facebook: em('facebook'),
  so: em('só'),
  aprovar: em('aprovar'),
  e3: em('e', em('aprovar')),
  mostra: em('mostra'),
  funcionou: em('funcionou'),
  vale: em('vale'),
  repetir: em('repetir'),
  testa: em('testa'),
  sete: em('7'),
  sem: em('sem'),
  cartao: em('cartão'),
  toca: em('toca'),
  link: em('link'),
};

// Saídas da tela cheia na abertura: cobrem os momentos artificiais do clipe A (sincronia.md):
// 0,64–0,78 «no» e 1,75–1,90 «Sua» → motion de 0,55 até 1,95; 4,04–4,68 «E… precisa» → motion de «E» até 4,74.
const SAI_1 = M.lojinha + 0.37;
const VOLTA_1 = M.sua + 0.35;
const SAI_2 = M.e - 0.02;
const VOLTA_2 = M.precisa + 0.2;

// ---------- Abertura ----------

const LojinhaNoInsta: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, SAI_1, VOLTA_1 - 0.05);
  if (!st) return null;
  const perfil = mola(t, M.instagram, 13, 190);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={120} style={{position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center'}}
        pecas={[{texto: 'TEM', s: SAI_1}, {texto: 'LOJINHA', s: SAI_1, cor: COR.ciano, brilho: true}]} />
      <Palavras t={t} tamanho={92} style={{position: 'absolute', top: 480, left: 0, right: 0, textAlign: 'center'}}
        pecas={[{texto: 'NO INSTAGRAM?', s: M.instagram}]} />
      <div style={{position: 'absolute', left: 140, right: 140, top: 700, padding: 40, display: 'flex', alignItems: 'center', gap: 30, ...caixa, opacity: perfil, translate: `0px ${(1 - perfil) * 80}px`}}>
        <div style={{width: 150, height: 150, borderRadius: 99, padding: 6, background: 'linear-gradient(135deg,#C2378A,#F2994A)', flexShrink: 0}}>
          <div style={{width: '100%', height: '100%', borderRadius: 99, background: COR.marinhoClaro, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Loja tamanho={80} cor={COR.branco} />
          </div>
        </div>
        <div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 50, color: COR.branco}}>@sua.lojinha</div>
          <div style={{marginTop: 8, fontFamily: INTER, fontWeight: 600, fontSize: 30, color: COR.cinza}}>moda · delivery · beleza</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const VocePrecisa: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, SAI_2, VOLTA_2 - 0.05);
  if (!st) return null;
  return (
    <AbsoluteFill style={{...st, justifyContent: 'center'}}>
      <Palavras t={t} tamanho={130} style={{textAlign: 'center', marginTop: -200}}
        pecas={[{texto: 'E', s: SAI_2}, {texto: 'VOCÊ', s: M.voce, cor: COR.ciano, brilho: true}]} />
      <Palavras t={t} tamanho={96} style={{textAlign: 'center', marginTop: 20}} pecas={[{texto: 'PRECISA DE…', s: M.precisa}]} />
    </AbsoluteFill>
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

const Correria: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, M.e2 + 0.1);
  if (!st) return null;
  const itens: [string, number, string][] = [
    ['VENDE', M.vende, COR.verde],
    ['ATENDE', M.atende, COR.ciano],
    ['RESPONDE DIRECT', M.responde, COR.amarelo],
  ];
  const badge = contar(t, M.direct, M.e2 + 0.1, 1, 9);
  return (
    <AbsoluteFill style={st}>
      <Palavras t={t} tamanho={120} style={{position: 'absolute', top: 450, left: 0, right: 0, textAlign: 'center'}} pecas={[{texto: 'VOCÊ…', s: M.voce2}]} />
      {itens.map(([txt, s, cor], i) => {
        const e = mola(t, s, 12, 200);
        return (
          <div key={txt} style={{position: 'absolute', left: 90, right: 90, top: 640 + i * 190, height: 150, padding: '0 46px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...caixa, border: `4px solid ${cor}`, opacity: e, translate: `${(1 - e) * (i % 2 ? 160 : -160)}px 0px`, rotate: `${(i - 1) * 1.5}deg`}}>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: txt.length > 10 ? 58 : 70, color: COR.branco, whiteSpace: 'nowrap'}}>{txt}</div>
            {i === 2 && t >= M.direct ? (
              <div style={{minWidth: 84, height: 84, borderRadius: 99, background: COR.vermelho, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco, scale: String(0.6 + 0.4 * mola(t, M.direct, 9, 240))}}>
                {badge}
              </div>
            ) : (
              <Check tamanho={64} cor={cor} />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const NoiteNoCanva: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.e2 + 0.1, M.pra - 0.1);
  if (!st) return null;
  const min = contar(t, M.ainda, M.canva + 0.3, 19 * 60, 23 * 60 + 47);
  const hora = `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}`;
  const barra = interpolate(t, [M.noite, M.pra], [0.08, 0.86], clamp);
  const canva = mola(t, M.canva, 11, 220);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.cinza, letterSpacing: 3}}>🌙 PERDE A NOITE</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 230, lineHeight: 1, color: min > 22 * 60 ? COR.vermelho : COR.branco, fontVariantNumeric: 'tabular-nums', textShadow: '0 10px 50px rgba(0,0,0,.5)'}}>{hora}</div>
      </div>
      <div style={{position: 'absolute', left: 120, right: 120, top: 860, padding: 40, ...caixa}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.cinza}}>montando o post…</div>
        <div style={{marginTop: 24, height: 26, borderRadius: 99, background: 'rgba(255,255,255,.1)'}}>
          <div style={{width: `${barra * 100}%`, height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${COR.azul}, ${COR.ciano})`}} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1110, display: 'flex', justifyContent: 'center', opacity: canva, scale: String(0.6 + 0.4 * canva)}}>
        <Pilula cor={COR.ciano} tamanho={50} fundo="rgba(10,30,70,.92)">NO CANVA</Pilula>
      </div>
    </AbsoluteFill>
  );
};

const PostFlop: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.pra - 0.1, M.o - 0.05);
  if (!st) return null;
  const curtidas = contar(t, M.quase - 0.2, M.ninguem, 0, 3);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 150, right: 150, top: 450, ...caixa, padding: 0, overflow: 'hidden'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '24px 30px'}}>
          <div style={{width: 64, height: 64, borderRadius: 99, background: 'linear-gradient(135deg,#C2378A,#F2994A)'}} />
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 32, color: COR.branco}}>sua.lojinha</div>
        </div>
        <div style={{height: 470, background: 'linear-gradient(135deg, #3A2A5E, #7A3E6E 55%, #C2678A)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Loja tamanho={220} cor="rgba(255,255,255,.55)" />
        </div>
        <div style={{padding: '26px 30px', display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{fontSize: 52}}>🤍</div>
          <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.branco}}>{curtidas} curtidas</div>
        </div>
      </div>
      <Selo t={t} de={M.curte} cor={COR.vermelho} tamanho={56} rot={-7} style={{left: 250, top: 1130}}>QUASE NINGUÉM</Selo>
    </AbsoluteFill>
  );
};

// ---------- Meio: a solução (exemplo da landing de empreendedores) ----------

const Logo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.o - 0.05, M.sugere - 0.2);
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
const Cursor: React.FC<{t: number}> = ({t}) => <span style={{opacity: Math.round(t * 4) % 2 ? 1 : 0}}>▍</span>;

const SUGESTAO = 'Mostre 3 jeitos de usar o produto que mais sai na loja.';

const Sugere: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.sugere - 0.2, M.cria - 0.2);
  if (!st) return null;
  const quando = mola(t, M.quando, 11, 210);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 470, padding: 50, ...caixa}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Img src={ARQ.logo} style={{width: 70, height: 70, borderRadius: 18}} />
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.ciano, letterSpacing: 2}}>O DIGO SUGERE</div>
        </div>
        <div style={{marginTop: 34, minHeight: 260, fontFamily: MONT, fontWeight: 800, fontSize: 64, lineHeight: 1.18, color: COR.branco}}>
          {digitar(t, M.sugere + 0.1, M.quando - 0.15, SUGESTAO)}
          {t < M.quando && <Cursor t={t} />}
        </div>
        <div style={{marginTop: 24, display: 'inline-flex', opacity: quando, scale: String(0.6 + 0.4 * quando), transformOrigin: '0% 50%'}}>
          <Pilula cor={COR.verde} tamanho={44} fundo="rgba(10,40,40,.9)">📅 QUINTA, À TARDE</Pilula>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LEGENDA_POST = 'Do jeito que a sua cliente usa: 3 combinações para o frio. Chama no direct!';

const Rede: React.FC<{t: number; de: number; nome: string; fundo: string}> = ({t, de, nome, fundo}) => {
  const mola = useMola();
  const on = mola(t, de, 11, 220);
  return (
    <div style={{flex: 1, padding: '18px 0', borderRadius: 22, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 36, color: COR.branco, background: on > 0.01 ? fundo : 'rgba(255,255,255,.07)', opacity: 0.35 + 0.65 * on, scale: String(1 + 0.08 * Math.sin(Math.min(1, on) * Math.PI))}}>
      {nome} {on > 0.5 ? '✓' : ''}
    </div>
  );
};

// "Cria a imagem e a legenda e publica no Instagram e no Facebook. Só depois que você aprovar."
const PostPronto: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.cria - 0.2, M.e3 - 0.15);
  if (!st) return null;
  const img = mola(t, M.imagem, 13, 180);
  const redes = mola(t, M.publica, 13, 200);
  const botoes = mola(t, M.so, 12, 200);
  const aprovado = t >= M.aprovar + 0.12;
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
        <div style={{marginTop: 22, minHeight: 130, fontFamily: INTER, fontWeight: 600, fontSize: 38, lineHeight: 1.3, color: COR.branco}}>
          {digitar(t, M.legenda, M.publica - 0.1, LEGENDA_POST)}
          {t >= M.legenda && t < M.publica && <Cursor t={t} />}
        </div>
        <div style={{marginTop: 18, display: 'flex', gap: 20, opacity: redes, translate: `0px ${(1 - redes) * 30}px`}}>
          <Rede t={t} de={M.instagram2} nome="Instagram" fundo="linear-gradient(135deg,#C2378A,#F2994A)" />
          <Rede t={t} de={M.facebook} nome="Facebook" fundo="#1877F2" />
        </div>
        <div style={{marginTop: 22, display: 'flex', gap: 20, opacity: botoes, translate: `0px ${(1 - botoes) * 30}px`}}>
          <div style={{flex: 1, padding: '22px 0', borderRadius: 22, textAlign: 'center', fontFamily: INTER, fontWeight: 700, fontSize: 34, color: COR.cinza, border: '3px solid rgba(255,255,255,.18)'}}>Editar</div>
          <div style={{flex: 1.6, padding: '22px 0', borderRadius: 22, textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: 34, color: aprovado ? COR.marinho : COR.branco, background: aprovado ? COR.verde : COR.azul}}>
            {aprovado ? 'Agendado ✓ quinta, 15h' : 'Aprovar e agendar'}
          </div>
        </div>
      </div>
      <Toque t={t} de={M.so} toque={M.aprovar} x={640} y={1150} />
    </AbsoluteFill>
  );
};

// "E ainda te mostra o que funcionou e vale repetir": curtidas e comentários subindo + balão do Consultor.
const Resultado: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, M.e3 - 0.15, T.b - 0.1);
  if (!st) return null;
  const curtidas = contar(t, M.mostra, M.funcionou + 0.4, 3, 128);
  const coments = contar(t, M.mostra + 0.1, M.funcionou + 0.4, 0, 34);
  const linha = prog(t, M.funcionou - 0.1, 0.7, saida);
  const balao = mola(t, M.vale, 12, 190);
  const certo = mola(t, M.repetir + 0.15, 10, 230);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 450, padding: 44, ...caixa}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Grafico tamanho={52} cor={COR.ciano} />
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: COR.ciano, letterSpacing: 2}}>COMO FOI O POST</div>
        </div>
        <div style={{marginTop: 26, display: 'flex', gap: 60, fontFamily: MONT, fontWeight: 900, fontSize: 84, color: COR.branco, fontVariantNumeric: 'tabular-nums'}}>
          <div>❤️ {curtidas}</div>
          <div>💬 {coments}</div>
        </div>
        <svg width={820} height={170} viewBox="0 0 820 170" style={{marginTop: 16}}>
          <path d="M 10 150 C 120 145, 200 150, 290 120 S 450 90, 560 60 S 720 30, 810 12" pathLength={1} fill="none" stroke={COR.verde} strokeWidth={12} strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={1 - linha} style={{filter: 'drop-shadow(0 0 14px rgba(46,229,157,.7))'}} />
        </svg>
      </div>
      <div style={{position: 'absolute', left: 140, right: 80, top: 1000, padding: '30px 36px', borderRadius: '36px 36px 36px 8px', background: 'rgba(240,244,255,.96)', opacity: balao, translate: `0px ${(1 - balao) * 50}px`, scale: String(0.9 + 0.1 * balao), boxShadow: '0 20px 60px rgba(0,0,0,.45)'}}>
        <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 26, color: COR.azul, letterSpacing: 2}}>CONSULTOR</div>
        <div style={{marginTop: 6, display: 'flex', alignItems: 'center', gap: 18, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: COR.marinho}}>
          Vale repetir o assunto com outro produto.
          <div style={{flexShrink: 0, width: 66, height: 66, borderRadius: 99, background: COR.verde, display: 'flex', alignItems: 'center', justifyContent: 'center', scale: String(certo)}}><Check tamanho={46} cor={COR.marinho} /></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fechamento: avatar em card + oferta, depois tela cheia no "Toca no link" ----------

const Gratis: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const fora = prog(t, M.toca - 0.35, 0.25);
  if (t < M.testa - 0.05 || fora >= 1) return null;
  const e = mola(t, M.testa, 10, 200);
  const dias = mola(t, M.sete, 12, 220);
  const sem = mola(t, M.sem, 12, 210);
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${14 * fora}px)`}}>
      <div style={{position: 'absolute', left: 50, top: 560, width: 520, textAlign: 'center', scale: String(interpolate(e, [0, 1], [1.8, 1])), opacity: e, rotate: `${-5 + (1 - e) * 10}deg`}}>
        <div style={{padding: '40px 20px', borderRadius: 48, background: 'linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)', boxShadow: '0 30px 90px rgba(47,123,255,.5)'}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco}}>TESTA</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 200, lineHeight: 0.9, color: COR.branco, opacity: dias, scale: String(0.5 + 0.5 * dias)}}>7</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: COR.branco, opacity: dias}}>DIAS GRÁTIS</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, top: 1080, display: 'flex', alignItems: 'center', gap: 22, opacity: sem, translate: `${(1 - sem) * -70}px 0px`}}>
        <div style={{position: 'relative'}}>
          <Cartao tamanho={92} cor={COR.branco} />
          <Risco t={t} de={M.cartao} espessura={10} />
        </div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco}}>SEM CARTÃO</div>
      </div>
    </AbsoluteFill>
  );
};

const TocaNoLink: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < M.toca - 0.05 || t > T.fim) return null;
  const e = mola(t, M.toca, 11, 210);
  const pulo = Math.abs(Math.sin((t - M.toca) * 6)) * 26;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, opacity: e, scale: String(0.6 + 0.4 * e)}}>
        <Pilula cor={COR.ciano} tamanho={64} fundo="rgba(10,30,70,.94)">TOCA NO LINK</Pilula>
        <Seta tamanho={110} cor={COR.ciano} style={{rotate: '135deg', translate: `0px ${pulo}px`, filter: `drop-shadow(0 0 20px ${COR.ciano})`}} />
      </div>
    </AbsoluteFill>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <LojinhaNoInsta t={t} />
      <VocePrecisa t={t} />
      <Correria t={t} />
      <NoiteNoCanva t={t} />
      <PostFlop t={t} />
      <Logo t={t} />
      <Sugere t={t} />
      <PostPronto t={t} />
      <Resultado t={t} />
      <CardVoz t={t} />
      <Gratis t={t} />
      <TocaNoLink t={t} />
    </AbsoluteFill>
  );
};

const passos = (de: number, ate: number, n: number) => Array.from({length: n}, (_, i) => de + ((ate - de) * i) / n);

const EVENTOS: Evento[] = [
  {som: 'pop', em: SAI_1, volume: 0.45},
  {som: 'pop', em: M.instagram, volume: 0.45},
  {som: 'pop', em: M.voce, volume: 0.45},
  // Meio: a dor
  {som: 'pop', em: M.voce2, volume: 0.45},
  {som: 'pop', em: M.vende, volume: 0.5},
  {som: 'pop', em: M.atende, volume: 0.5},
  {som: 'pop', em: M.responde, volume: 0.5},
  ...passos(M.direct, M.e2 + 0.1, 6).map((s): Evento => ({som: 'tique', em: s, volume: 0.4})),
  {som: 'whoosh_in', em: M.e2 - 0.2, volume: 0.45},
  ...passos(M.ainda, M.canva + 0.3, 8).map((s): Evento => ({som: 'tique', em: s, volume: 0.45})),
  {som: 'pop', em: M.canva, volume: 0.5},
  {som: 'whoosh_in', em: M.pra - 0.35, volume: 0.45},
  {som: 'impacto', em: M.curte, volume: 0.45},
  // Meio: a solução
  {som: 'whoosh_in', em: M.o - 0.35, volume: 0.45},
  {som: 'impacto', em: M.digo, volume: 0.5},
  {som: 'whoosh_in', em: M.sugere - 0.45, volume: 0.45},
  ...passos(M.sugere + 0.1, M.quando - 0.15, 10).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'ding', em: M.quando, volume: 0.35},
  {som: 'whoosh_in', em: M.cria - 0.45, volume: 0.45},
  {som: 'pop', em: M.imagem, volume: 0.45},
  ...passos(M.legenda, M.publica - 0.1, 7).map((s): Evento => ({som: 'tecla', em: s, volume: 0.6})),
  {som: 'pop', em: M.instagram2, volume: 0.5},
  {som: 'pop', em: M.facebook, volume: 0.5},
  {som: 'toque', em: M.aprovar, volume: 0.7},
  {som: 'ding', em: M.aprovar + 0.12, volume: 0.45},
  {som: 'whoosh_in', em: M.e3 - 0.4, volume: 0.45},
  ...passos(M.mostra, M.funcionou + 0.4, 6).map((s): Evento => ({som: 'tique', em: s, volume: 0.4})),
  {som: 'pop', em: M.vale, volume: 0.5},
  {som: 'ding', em: M.repetir + 0.15, volume: 0.4},
  // Fechamento
  {som: 'impacto', em: M.testa, volume: 0.5},
  {som: 'pop', em: M.sem, volume: 0.5},
  {som: 'risco', em: M.cartao, volume: 0.45},
  {som: 'pop', em: M.toca, volume: 0.5},
];

export const CONFIG: Config = {
  palavras: PALAVRAS,
  trechos: T,
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.04]},
    {de: SAI_1, modo: 'fora'},
    {de: VOLTA_1, modo: 'cheia', escala: [1.06, 1.1]},
    {de: SAI_2, modo: 'fora'},
    {de: VOLTA_2, modo: 'cheia', escala: [1.03, 1.06]},
    {de: M.tempo, modo: 'cheia', escala: [1.08, 1.22], punch: true},
    {de: T.meio, modo: 'fora'},
    // O card já está montado quando o clipe B começa (o wipe cobre a troca e o congelado de «Testa»).
    {de: T.b - 0.45, modo: 'card'},
    {de: M.toca - 0.1, modo: 'cheia', escala: [1.1, 1.2], punch: true},
  ],
  semLegenda: [
    [SAI_1, VOLTA_1],
    [SAI_2, VOLTA_2],
    [T.meio, M.vende],
    [M.testa - 0.05, M.toca - 0.3],
    [M.toca - 0.1, T.fim],
  ],
  corEspecial: {'ninguém': COR.vermelho, 'tempo.': COR.azul},
  eventos: EVENTOS,
  Cena,
};
