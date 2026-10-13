import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Celular, Onda, Selo, Toque} from './Componentes';
import {Config, Evento, Palavra} from './Destaque';
import {Cartao} from './Icones';
import {em, PALAVRAS, TRECHOS} from './palavras_4';
import {ARQ, caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, useBloco, useMola, useT} from './tema';

// Destaque 4 · Teste grátis: 7 dias sem cartão → planos (Pro em destaque) → demonstração → link na bio.

const T = {a: TRECHOS['4a'], meio: TRECHOS['4meio'], b: TRECHOS['4b'], fim: TRECHOS.fim};
const M = {
  sete: em('sete'),
  gratis: em('grátis,'),
  sem: em('sem'),
  cartao: em('cartão.'),
  plano: em('plano'),
  r57: em('57'),
  rede: em('rede'),
  mais: em('mais'),
  indicado: em('indicado'),
  pro: em('pro.'),
  pulso: em('pulso,'),
  radar: em('radar,'),
  resultados: em('resultados'),
  consultor: em('consultor'),
  trabalhando: em('trabalhando'),
  da: em('dá'),
  demonstracao: em('demonstração'),
  cadastro: em('cadastro.'),
  link: em('link'),
  digosocial: em('digosocial'),
};
// O clipe congela de 18,39 a 18,59 s (sincronia.md), dentro de "digosocial": o card segura até o fim do congelado.
const VOLTA_CHEIA = M.digosocial + 0.57;

// Legenda: "R $ 57 ,00" vira uma palavra só.
const juntaPreco = (ps: Palavra[]): Palavra[] => {
  const out: Palavra[] = [];
  for (let i = 0; i < ps.length; i++) {
    if (ps[i].w === 'R' && ps[i + 1]?.w === '$') {
      out.push({w: 'R$ 57', s: ps[i].s, e: ps[i + 3]?.e ?? ps[i + 2].e});
      i += 3;
    } else out.push(ps[i]);
  }
  return out;
};

// Abertura em card: "7 DIAS GRÁTIS" e "SEM CARTÃO".
const Gratis: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  const fora = prog(t, T.meio - 0.25, 0.25);
  if (t < M.sete + 0.2 || fora >= 1) return null;
  const e = mola(t, M.sete + 0.2, 10, 200);
  const sc = mola(t, M.sem, 12, 220);
  const risco = prog(t, M.cartao, 0.3, saida);
  return (
    <AbsoluteFill style={{opacity: 1 - fora, filter: `blur(${14 * fora}px)`}}>
      <div style={{position: 'absolute', left: 50, top: 330, width: 540, textAlign: 'center', scale: String(interpolate(e, [0, 1], [1.8, 1])), opacity: e, rotate: `${-5 + (1 - e) * 10}deg`}}>
        <div style={{padding: '40px 20px', borderRadius: 48, background: 'linear-gradient(135deg, #2F7BFF, #1FB5E8 60%, #2EE59D)', boxShadow: '0 30px 90px rgba(47,123,255,.5)'}}>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 210, lineHeight: 0.9, color: COR.branco}}>7</div>
          <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 66, color: COR.branco}}>DIAS GRÁTIS</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, top: 830, display: 'flex', alignItems: 'center', gap: 24, opacity: sc, translate: `${(1 - sc) * -60}px 0px`}}>
        <div style={{position: 'relative', width: 110, height: 110, borderRadius: 30, background: `${COR.vermelho}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Cartao tamanho={74} cor={COR.branco} />
          <div style={{position: 'absolute', left: 10, top: 52, height: 8, width: 90 * risco, borderRadius: 9, background: COR.vermelho, rotate: '-35deg', transformOrigin: 'left center', translate: '6px 26px'}} />
        </div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, color: COR.branco}}>SEM CARTÃO</div>
      </div>
    </AbsoluteFill>
  );
};

const PLANOS = [
  {nome: 'SOLO', preco: '57', obs: '1 rede', cor: COR.ciano},
  {nome: 'ESSENCIAL', preco: '97', obs: 'rotina leve', cor: COR.azul},
  {nome: 'PRO', preco: '197', obs: 'ciclo completo', cor: COR.verde},
];
const CHIPS: [string, number][] = [['PULSO', M.pulso], ['RADAR', M.radar], ['RESULTADOS', M.resultados], ['CONSULTOR', M.consultor]];

// "Tem plano a partir de 57… O mais indicado é o Pro": três cartões; o Pro cresce e recebe os 4 módulos.
const Planos: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const mola = useMola();
  const st = bloco(t, T.meio + 0.05, T.b - 0.2, 120);
  if (!st) return null;
  const solo = mola(t, M.r57 - 0.05, 12, 200);
  const pro = interpolate(t, [M.indicado - 0.1, M.indicado + 0.45], [0, 1], {...clamp, easing: saida});
  const junto = prog(t, M.trabalhando, 0.5, saida);
  return (
    <AbsoluteFill style={st}>
      <div style={{position: 'absolute', top: 270, left: 0, right: 0, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 70, color: COR.branco, opacity: 1 - pro}}>
        PLANOS <span style={{color: COR.cinza, fontSize: 46}}>por mês</span>
      </div>
      {PLANOS.map((p, i) => {
        const e = mola(t, M.plano + i * 0.14, 13, 190);
        const ehPro = p.nome === 'PRO';
        const ehSolo = p.nome === 'SOLO';
        // Antes do "indicado": três colunas. Depois: o Pro vai para o centro e cresce; os outros somem.
        const x0 = 60 + i * 330;
        const x = ehPro ? interpolate(pro, [0, 1], [x0, 140]) : x0;
        const w = ehPro ? interpolate(pro, [0, 1], [300, 800]) : 300;
        const op = ehPro ? e : e * (1 - pro);
        const destaque = ehSolo ? solo * (1 - prog(t, M.mais - 0.2, 0.3)) : 0;
        return (
          <div key={p.nome} style={{position: 'absolute', left: x, top: ehPro ? interpolate(pro, [0, 1], [420, 380]) : 420, width: w, height: ehPro ? interpolate(pro, [0, 1], [520, 900]) : 520, boxSizing: 'border-box', padding: ehPro ? interpolate(pro, [0, 1], [30, 56]) : 30, ...caixa, border: `4px solid ${p.cor}`, opacity: op, translate: `0px ${(1 - e) * 200}px`, scale: String(1 + 0.08 * destaque), boxShadow: `0 40px 90px rgba(0,0,0,.55), 0 0 ${60 * (destaque + pro * (ehPro ? 1 : 0))}px ${p.cor}`}}>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: ehPro ? interpolate(pro, [0, 1], [44, 78]) : 44, color: p.cor}}>{p.nome}</div>
            <div style={{marginTop: 18, fontFamily: INTER, fontWeight: 700, fontSize: ehPro ? interpolate(pro, [0, 1], [30, 44]) : 30, color: COR.cinza}}>R$</div>
            <div style={{fontFamily: MONT, fontWeight: 900, fontSize: ehPro ? interpolate(pro, [0, 1], [110, 170]) : 110, lineHeight: 1, color: COR.branco}}>{p.preco}</div>
            <div style={{marginTop: 16, fontFamily: INTER, fontWeight: 700, fontSize: 30, color: COR.cinza, opacity: ehPro ? 1 - pro : 1}}>{p.obs}</div>
            {ehPro && (
              <div style={{position: 'absolute', left: 56, right: 56, top: 400, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, opacity: pro}}>
                {CHIPS.map(([txt, s], k) => {
                  const c = mola(t, s - 0.05, 12, 220);
                  return (
                    <div key={txt} style={{padding: '26px 10px', borderRadius: 26, textAlign: 'center', background: `rgba(46,229,157,${0.1 + 0.18 * junto})`, border: `3px solid ${COR.verde}`, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: COR.branco, opacity: c, scale: String((0.6 + 0.4 * c) * (1 + 0.05 * Math.sin(junto * Math.PI + k))), boxShadow: `0 0 ${40 * junto}px rgba(46,229,157,.6)`}}>
                      {txt}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {t >= M.rede && t < M.mais - 0.1 && (
        <div style={{position: 'absolute', left: 60, top: 990, opacity: mola(t, M.rede, 12, 220)}}>
          <Pilula cor={COR.ciano} tamanho={42} fundo="rgba(8,20,52,.95)">SOLO = 1 REDE</Pilula>
        </div>
      )}
      <Selo t={t} de={M.mais} cor={COR.amarelo} tamanho={46} rot={-4} style={{left: 420, top: 330}}>MAIS INDICADO</Selo>
    </AbsoluteFill>
  );
};

// Fechamento em card: celular com o site e o botão "Ver demonstração sem cadastro".
const Demo: React.FC<{t: number}> = ({t}) => {
  const bloco = useBloco();
  const st = bloco(t, M.demonstracao + 0.3, M.digosocial - 0.25, 120);
  if (!st) return null;
  return (
    <AbsoluteFill style={st}>
      <Celular t={t} src={ARQ.print('site-planos')} y={120} largura={440} style={{left: 90, top: 300}}
        marcas={[{x: 160, y: 340, w: 850, h: 130, de: M.demonstracao + 0.45, cor: COR.verde}]}>
        <Onda t={t} de={M.cadastro} cor={COR.verde} tamanho={500} />
      </Celular>
      {/* Ponta do dedo sobre o botão "Ver demonstração sem cadastro" do print. */}
      <Toque t={t} de={M.cadastro - 0.45} toque={M.cadastro} x={252} y={404} tamanho={120} />
      <div style={{position: 'absolute', left: 90, top: 1240, width: 440, opacity: prog(t, M.link - 0.1, 0.3)}}>
        <Pilula cor={COR.verde} tamanho={40} fundo="rgba(8,40,30,.95)">LINK NA BIO ↑</Pilula>
      </div>
    </AbsoluteFill>
  );
};

// "digosocial ponto com": endereço grande abaixo do rosto.
const Endereco: React.FC<{t: number}> = ({t}) => {
  const mola = useMola();
  if (t < VOLTA_CHEIA || t > T.fim) return null;
  const e = mola(t, VOLTA_CHEIA, 11, 210);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', justifyContent: 'center', opacity: e, scale: String(0.6 + 0.4 * e)}}>
      <div style={{padding: '22px 46px', borderRadius: 30, background: 'rgba(8,18,48,.92)', border: `4px solid ${COR.ciano}`, fontFamily: MONT, fontWeight: 900, fontSize: 84, color: COR.branco, boxShadow: '0 20px 60px rgba(0,0,0,.5), 0 0 50px rgba(62,198,255,.35)'}}>
        digosocial<span style={{color: COR.ciano}}>.com</span>
      </div>
    </div>
  );
};

const Cena: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Gratis t={t} />
      <Planos t={t} />
      <Demo t={t} />
      <Endereco t={t} />
    </AbsoluteFill>
  );
};

const EVENTOS: Evento[] = [
  {som: 'impacto', em: M.sete + 0.2, volume: 0.5},
  {som: 'pop', em: M.sem, volume: 0.45},
  {som: 'risco', em: M.cartao, volume: 0.45},
  ...[0, 1, 2].map((i): Evento => ({som: 'pop', em: M.plano + i * 0.14, volume: 0.45})),
  {som: 'tique', em: M.r57 - 0.05, volume: 0.6},
  {som: 'pop', em: M.rede, volume: 0.45},
  {som: 'impacto', em: M.mais, volume: 0.5},
  {som: 'whoosh_in', em: M.indicado - 0.3, volume: 0.45},
  ...CHIPS.map(([, s]): Evento => ({som: 'pop', em: s - 0.05, volume: 0.45})),
  {som: 'whoosh_in', em: M.trabalhando - 0.15, volume: 0.4},
  {som: 'ding', em: M.trabalhando + 0.3, volume: 0.35},
  {som: 'risco', em: M.demonstracao + 0.1, volume: 0.4},
  {som: 'toque', em: M.cadastro, volume: 0.7},
  {som: 'ding', em: M.cadastro + 0.08, volume: 0.4},
  {som: 'pop', em: M.link - 0.1, volume: 0.45},
];

export const CONFIG_4: Config = {
  n: 4,
  palavras: juntaPreco(PALAVRAS),
  trechos: T,
  // 4b acelera em 16,94 ("Link") e congela em 18,39 ("digosocial"): card de 15,0 até 18,6; depois tela cheia com punch.
  estados: [
    {de: T.a, modo: 'cheia', escala: [1, 1.05]},
    {de: M.sete - 0.25, modo: 'card'},
    {de: T.meio, modo: 'fora'},
    {de: T.b, modo: 'cheia', escala: [1.02, 1.06]},
    {de: M.demonstracao - 0.15, modo: 'card'},
    {de: VOLTA_CHEIA, modo: 'cheia', escala: [1.08, 1.18], punch: true},
  ],
  semLegenda: [
    [M.sete - 0.25, T.meio],
    [M.mais - 0.2, T.b],
    [VOLTA_CHEIA, T.fim],
  ],
  eventos: EVENTOS,
  Cena,
};
