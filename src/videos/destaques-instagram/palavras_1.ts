// Gerado por tools/narracao.py a partir de transcricao/narracao/mapa.json. Não editar à mão.
export type Palavra = {w: string; s: number; e: number};

export const PALAVRAS: Palavra[] = [
  {w: "Toda", s: 0.0, e: 0.28},
  {w: "semana,", s: 0.28, e: 0.7},
  {w: "a", s: 0.9, e: 1.04},
  {w: "mesma", s: 1.04, e: 1.28},
  {w: "pergunta.", s: 1.28, e: 1.84},
  {w: "O", s: 2.04, e: 2.28},
  {w: "que", s: 2.28, e: 2.38},
  {w: "eu", s: 2.38, e: 2.5},
  {w: "posto", s: 2.5, e: 2.84},
  {w: "agora?", s: 2.84, e: 3.18},
  {w: "Você", s: 3.36, e: 3.7},
  {w: "vê", s: 3.7, e: 3.9},
  {w: "concorrente", s: 3.9, e: 4.48},
  {w: "crescendo.", s: 4.48, e: 5.04},
  {w: "Tenta", s: 5.24, e: 5.52},
  {w: "uma", s: 5.52, e: 5.68},
  {w: "IA.", s: 5.68, e: 5.92},
  {w: "E", s: 6.12, e: 6.56},
  {w: "recebe", s: 6.56, e: 7.0},
  {w: "legenda", s: 7.0, e: 7.38},
  {w: "bonita", s: 7.38, e: 7.82},
  {w: "para", s: 7.82, e: 8.0},
  {w: "uma", s: 8.0, e: 8.16},
  {w: "pauta", s: 8.16, e: 8.6},
  {w: "fraca.", s: 8.6, e: 9.02},
  {w: "O", s: 9.24, e: 9.42},
  {w: "Digo", s: 9.42, e: 9.58},
  {w: "Social", s: 9.58, e: 9.9},
  {w: "é", s: 9.9, e: 10.08},
  {w: "um", s: 10.08, e: 10.16},
  {w: "aplicativo", s: 10.16, e: 10.7},
  {w: "que", s: 10.7, e: 10.86},
  {w: "funciona", s: 10.86, e: 11.22},
  {w: "como", s: 11.22, e: 11.44},
  {w: "um", s: 11.44, e: 11.56},
  {w: "consultor", s: 11.56, e: 12.02},
  {w: "de", s: 12.02, e: 12.12},
  {w: "redes", s: 12.12, e: 12.3},
  {w: "sociais", s: 12.3, e: 12.68},
  {w: "com", s: 12.68, e: 12.92},
  {w: "IA.", s: 12.92, e: 13.14},
  {w: "Ele", s: 13.32, e: 13.54},
  {w: "lê", s: 13.54, e: 13.74},
  {w: "seus", s: 13.74, e: 13.94},
  {w: "posts,", s: 13.94, e: 14.32},
  {w: "comentários", s: 14.52, e: 14.86},
  {w: "e", s: 14.86, e: 15.18},
  {w: "concorrentes", s: 15.18, e: 15.86},
  {w: "e", s: 15.86, e: 15.98},
  {w: "te", s: 15.98, e: 16.1},
  {w: "diz", s: 16.1, e: 16.3},
  {w: "o", s: 16.3, e: 16.4},
  {w: "que", s: 16.4, e: 16.48},
  {w: "postar", s: 16.48, e: 16.84},
  {w: "essa", s: 16.84, e: 16.94},
  {w: "semana", s: 16.94, e: 17.36},
  {w: "e", s: 17.36, e: 17.8},
  {w: "porquê.", s: 17.8, e: 18.24},
  {w: "Você", s: 18.46, e: 18.68},
  {w: "revisa,", s: 18.68, e: 19.16},
  {w: "aprova", s: 19.36, e: 19.74},
  {w: "e", s: 19.74, e: 19.92},
  {w: "publica.", s: 19.92, e: 20.44},
  {w: "Testa", s: 20.64, e: 21.0},
  {w: "sete", s: 21.0, e: 21.42},
  {w: "dias", s: 21.42, e: 21.6},
  {w: "grátis.", s: 21.6, e: 22.1},
  {w: "Link", s: 22.2, e: 22.4},
  {w: "na", s: 22.4, e: 22.56},
  {w: "bio.", s: 22.56, e: 22.78},
];

// Início de cada trecho na narração (s). Os clipes sincronizados começam exatamente aqui.
export const TRECHOS = {1a: 0.0, 1meio: 3.27, 1b: 18.35, fim: 23.28};

const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/g, '');

// Palavra falada (primeira ocorrência depois de `depois`): todo gatilho sai daqui, nunca de um número solto.
export const palavra = (texto: string, depois = -1): Palavra => {
  const p = PALAVRAS.find((x) => x.s > depois && norm(x.w) === norm(texto));
  if (!p) throw new Error(`palavra não encontrada: ${texto} depois de ${depois}`);
  return p;
};
export const em = (texto: string, depois = -1) => palavra(texto, depois).s;
