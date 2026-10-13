// Gerado por tools/narracao.py a partir de transcricao/narracao/mapa.json. Não editar à mão.
export type Palavra = {w: string; s: number; e: number};

export const PALAVRAS: Palavra[] = [
  {w: "Quer", s: 0.0, e: 0.16},
  {w: "testar", s: 0.16, e: 0.54},
  {w: "o", s: 0.54, e: 0.7},
  {w: "Digo?", s: 0.7, e: 0.94},
  {w: "São", s: 1.12, e: 1.4},
  {w: "sete", s: 1.4, e: 1.82},
  {w: "dias", s: 1.82, e: 2.04},
  {w: "grátis,", s: 2.04, e: 2.62},
  {w: "sem", s: 2.88, e: 3.12},
  {w: "cartão.", s: 3.12, e: 3.62},
  {w: "Tem", s: 3.84, e: 3.98},
  {w: "plano", s: 3.98, e: 4.38},
  {w: "a", s: 4.38, e: 4.56},
  {w: "partir", s: 4.56, e: 4.78},
  {w: "de", s: 4.78, e: 4.94},
  {w: "R", s: 4.94, e: 5.08},
  {w: "$", s: 5.08, e: 5.26},
  {w: "57", s: 5.26, e: 5.56},
  {w: ",00", s: 5.56, e: 5.88},
  {w: "por", s: 5.88, e: 6.14},
  {w: "mês", s: 6.14, e: 6.44},
  {w: "para", s: 6.44, e: 6.84},
  {w: "quem", s: 6.84, e: 7.0},
  {w: "cuida", s: 7.0, e: 7.28},
  {w: "de", s: 7.28, e: 7.4},
  {w: "uma", s: 7.4, e: 7.52},
  {w: "rede", s: 7.52, e: 7.76},
  {w: "só.", s: 7.76, e: 8.04},
  {w: "O", s: 8.3, e: 8.6},
  {w: "mais", s: 8.6, e: 8.84},
  {w: "indicado", s: 8.84, e: 9.38},
  {w: "é", s: 9.38, e: 9.48},
  {w: "o", s: 9.48, e: 9.56},
  {w: "Pro.", s: 9.56, e: 9.76},
  {w: "Pulso,", s: 10.14, e: 10.64},
  {w: "Radar,", s: 10.92, e: 11.4},
  {w: "Resultados", s: 11.64, e: 12.32},
  {w: "e", s: 12.32, e: 12.66},
  {w: "Consultor", s: 12.66, e: 13.18},
  {w: "Trabalhando", s: 13.18, e: 13.68},
  {w: "Juntos.", s: 13.68, e: 14.26},
  {w: "E", s: 14.48, e: 14.66},
  {w: "dá", s: 14.66, e: 14.76},
  {w: "para", s: 14.76, e: 14.88},
  {w: "ver", s: 14.88, e: 15.02},
  {w: "a", s: 15.02, e: 15.12},
  {w: "demonstração", s: 15.12, e: 15.76},
  {w: "sem", s: 15.76, e: 16.16},
  {w: "cadastro.", s: 16.16, e: 16.82},
  {w: "Link", s: 17.05, e: 17.42},
  {w: "na", s: 17.42, e: 17.54},
  {w: "bio,", s: 17.54, e: 17.78},
  {w: "digosocial", s: 18.05, e: 18.86},
  {w: ".com", s: 18.88, e: 19.42},
];

// Início de cada trecho na narração (s). Os clipes sincronizados começam exatamente aqui.
export const TRECHOS = {4a: 0.0, 4meio: 3.73, 4b: 14.37, fim: 19.54};

const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/g, '');

// Palavra falada (primeira ocorrência depois de `depois`): todo gatilho sai daqui, nunca de um número solto.
export const palavra = (texto: string, depois = -1): Palavra => {
  const p = PALAVRAS.find((x) => x.s > depois && norm(x.w) === norm(texto));
  if (!p) throw new Error(`palavra não encontrada: ${texto} depois de ${depois}`);
  return p;
};
export const em = (texto: string, depois = -1) => palavra(texto, depois).s;
