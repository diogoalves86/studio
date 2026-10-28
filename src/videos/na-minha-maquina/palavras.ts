// Gerado por tools/narracao.py a partir de transcricao/narracao/mapa.json. Não editar à mão.
export type Palavra = {w: string; s: number; e: number};

export const PALAVRAS: Palavra[] = [
  {w: "A", s: 0.0, e: 0.18},
  {w: "frase", s: 0.18, e: 0.6},
  {w: "mais", s: 0.6, e: 1.02},
  {w: "perigosa", s: 1.02, e: 1.54},
  {w: "da", s: 1.54, e: 1.7},
  {w: "programação.", s: 1.7, e: 2.34},
  {w: "Sexta", s: 2.832, e: 3.352},
  {w: "-feira,", s: 3.352, e: 3.652},
  {w: "seis", s: 3.812, e: 4.032},
  {w: "da", s: 4.032, e: 4.172},
  {w: "tarde.", s: 4.172, e: 4.532},
  {w: "O", s: 4.892, e: 5.352},
  {w: "código", s: 5.352, e: 5.672},
  {w: "roda", s: 5.672, e: 5.992},
  {w: "lindo", s: 5.992, e: 6.212},
  {w: "no", s: 6.212, e: 6.372},
  {w: "seu", s: 6.372, e: 6.492},
  {w: "computador.", s: 6.492, e: 7.052},
  {w: "Aí", s: 7.392, e: 7.732},
  {w: "você", s: 7.732, e: 7.932},
  {w: "manda", s: 7.932, e: 8.212},
  {w: "para", s: 8.212, e: 8.272},
  {w: "a", s: 8.272, e: 8.432},
  {w: "produção", s: 8.432, e: 8.672},
  {w: "e", s: 8.672, e: 9.712},
  {w: "o", s: 9.712, e: 9.792},
  {w: "sistema", s: 9.792, e: 10.092},
  {w: "inteiro", s: 10.092, e: 10.372},
  {w: "cai.", s: 10.372, e: 10.672},
  {w: "Mas", s: 11.83, e: 12.09},
  {w: "na", s: 12.09, e: 12.21},
  {w: "minha", s: 12.21, e: 12.39},
  {w: "máquina,", s: 12.39, e: 12.73},
  {w: "funciona.", s: 12.89, e: 13.11},
  {w: "Marca", s: 13.424, e: 13.844},
  {w: "aquele", s: 13.844, e: 14.144},
  {w: "dev", s: 14.144, e: 14.444},
  {w: "que", s: 14.444, e: 14.684},
  {w: "vive", s: 14.684, e: 14.984},
  {w: "falando", s: 14.984, e: 15.384},
  {w: "isso.", s: 15.384, e: 15.784},
  {w: "E", s: 15.964, e: 16.364},
  {w: "segue", s: 16.364, e: 16.644},
  {w: "a", s: 16.644, e: 16.744},
  {w: "galinha", s: 16.744, e: 16.964},
  {w: "programadora.", s: 16.964, e: 17.584},
];

// Início de cada trecho na narração (s). Os clipes sincronizados começam exatamente aqui.
export const TRECHOS = {a: 0.0, meio: 2.832, frase: 11.83, b: 13.424, fim: 17.794};

const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/g, '');

// Palavra falada (primeira ocorrência depois de `depois`): todo gatilho sai daqui, nunca de um número solto.
export const palavra = (texto: string, depois = -1): Palavra => {
  const p = PALAVRAS.find((x) => x.s > depois && norm(x.w) === norm(texto));
  if (!p) throw new Error(`palavra não encontrada: ${texto} depois de ${depois}`);
  return p;
};
export const em = (texto: string, depois = -1) => palavra(texto, depois).s;
