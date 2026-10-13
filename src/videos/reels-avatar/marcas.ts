import {em, palavra} from './palavras';

// Gatilhos do Reels, todos tirados das palavras faladas (narração v2).
const voce2 = em('você', em('experimenta'));

export const M = {
  // 1. Gancho
  sabe: em('sabe'),
  por: em('por'),
  muita: em('muita'),
  gente: em('gente'),
  passa: em('passa'),
  direto: em('direto'),
  pelo: em('pelo'),
  demais: em('demais'),
  chegar: em('chegar'),
  porque: em('porque'),
  demora: em('demora'),
  assunto: em('assunto'),
  // 2. Exemplo
  olha: em('olha'),
  esseExemplo: em('esse'),
  emVez: em('em'),
  oi: em('oi'),
  instagram: palavra('instagram'),
  experimenta: em('experimenta'),
  voce: voce2,
  esse: em('esse', voce2),
  erro: em('erro', voce2),
  percebeu: palavra('percebeu'),
  // 3. Diferença
  percebe: em('percebe'),
  diferenca: em('diferença', em('percebe')),
  no: em('no', em('percebe')),
  aPessoa: em('a', em('exemplo', em('segundo'))),
  pessoa: em('pessoa'),
  motivo: em('motivo'),
  continuar: em('continuar'),
  naoPrecisa: em('não'),
  inventar: em('inventar'),
  frase: em('frase'),
  absurda: em('absurda'),
  paraChamar: em('para', em('absurda')),
  naoFinal: em('não', em('atenção')),
  // 4. Segredo + CTA
  segredo: em('segredo'),
  mostrar: em('mostrar'),
  logo: em('logo'),
  problema: em('problema'),
  resolver: em('resolver'),
  quer: em('quer'),
  conteudos: em('conteúdos'),
  crescer: em('crescer'),
  segue: em('segue'),
  digo: em('digo'),
  dicas: em('dicas', em('segue')),
};
