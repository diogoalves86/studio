// Gerado por tools/narracao.py a partir de transcricao/narracao/mapa.json. Não editar à mão.
export type Palavra = {w: string; s: number; e: number};

export const PALAVRAS: Palavra[] = [
  {w: "Olha", s: 0.0, e: 0.18},
  {w: "como", s: 0.18, e: 0.36},
  {w: "o", s: 0.36, e: 0.54},
  {w: "Digo", s: 0.54, e: 0.64},
  {w: "funciona", s: 0.64, e: 1.0},
  {w: "na", s: 1.0, e: 1.14},
  {w: "prática.", s: 1.14, e: 1.56},
  {w: "Toda", s: 1.84, e: 2.1},
  {w: "segunda,", s: 2.1, e: 2.38},
  {w: "o", s: 2.48, e: 2.64},
  {w: "pulso", s: 2.64, e: 2.84},
  {w: "semanal", s: 2.84, e: 3.2},
  {w: "mostra", s: 3.2, e: 3.46},
  {w: "o", s: 3.46, e: 3.54},
  {w: "que", s: 3.54, e: 3.62},
  {w: "funcionou", s: 3.62, e: 4.12},
  {w: "e", s: 4.12, e: 4.36},
  {w: "onde", s: 4.36, e: 4.56},
  {w: "concentrar", s: 4.56, e: 5.0},
  {w: "a", s: 5.0, e: 5.12},
  {w: "energia.", s: 5.12, e: 5.4},
  {w: "Durante", s: 5.82, e: 6.06},
  {w: "a", s: 6.06, e: 6.16},
  {w: "semana,", s: 6.16, e: 6.42},
  {w: "o", s: 6.52, e: 6.58},
  {w: "radar", s: 6.58, e: 6.78},
  {w: "avisa", s: 6.78, e: 7.06},
  {w: "as", s: 7.06, e: 7.18},
  {w: "oportunidades", s: 7.18, e: 7.86},
  {w: "antes", s: 7.86, e: 8.08},
  {w: "da", s: 8.08, e: 8.22},
  {w: "pauta", s: 8.22, e: 8.5},
  {w: "esfriar.", s: 8.5, e: 8.86},
  {w: "Aí", s: 9.12, e: 9.24},
  {w: "você", s: 9.24, e: 9.38},
  {w: "pergunta", s: 9.38, e: 9.68},
  {w: "para", s: 9.68, e: 9.78},
  {w: "o", s: 9.78, e: 9.84},
  {w: "consultor,", s: 9.84, e: 10.26},
  {w: "ele", s: 10.32, e: 10.38},
  {w: "recomenda", s: 10.38, e: 10.72},
  {w: "a", s: 10.72, e: 10.88},
  {w: "pauta,", s: 10.88, e: 11.12},
  {w: "explica", s: 11.16, e: 11.4},
  {w: "o", s: 11.4, e: 11.48},
  {w: "motivo", s: 11.48, e: 11.8},
  {w: "e", s: 11.8, e: 11.92},
  {w: "já", s: 11.92, e: 12.0},
  {w: "monta", s: 12.0, e: 12.24},
  {w: "o", s: 12.24, e: 12.28},
  {w: "rascunho.", s: 12.28, e: 12.72},
  {w: "Vai", s: 13.0, e: 13.2},
  {w: "para", s: 13.2, e: 13.3},
  {w: "o", s: 13.3, e: 13.38},
  {w: "calendário,", s: 13.38, e: 13.82},
  {w: "você", s: 13.98, e: 14.24},
  {w: "aprova", s: 14.24, e: 14.7},
  {w: "e", s: 14.7, e: 14.98},
  {w: "o", s: 14.98, e: 15.06},
  {w: "resultado", s: 15.06, e: 15.36},
  {w: "do", s: 15.36, e: 15.54},
  {w: "post", s: 15.54, e: 15.74},
  {w: "volta", s: 15.74, e: 16.0},
  {w: "como", s: 16.0, e: 16.14},
  {w: "aprendizado", s: 16.14, e: 16.64},
  {w: "para", s: 16.64, e: 16.8},
  {w: "a", s: 16.8, e: 16.88},
  {w: "próxima", s: 16.88, e: 17.1},
  {w: "semana.", s: 17.1, e: 17.52},
  {w: "E", s: 17.68, e: 17.76},
  {w: "nada", s: 17.76, e: 17.94},
  {w: "é", s: 17.94, e: 18.02},
  {w: "publicado", s: 18.02, e: 18.52},
  {w: "sem", s: 18.52, e: 18.7},
  {w: "você", s: 18.7, e: 18.9},
  {w: "aprovar.", s: 18.9, e: 19.3},
];

// Início de cada trecho na narração (s). Os clipes sincronizados começam exatamente aqui.
export const TRECHOS = {"2a": 0.0, "2meio": 1.7, "2b": 17.6, fim: 19.834};

const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/g, '');

// Palavra falada (primeira ocorrência depois de `depois`): todo gatilho sai daqui, nunca de um número solto.
export const palavra = (texto: string, depois = -1): Palavra => {
  const p = PALAVRAS.find((x) => x.s > depois && norm(x.w) === norm(texto));
  if (!p) throw new Error(`palavra não encontrada: ${texto} depois de ${depois}`);
  return p;
};
export const em = (texto: string, depois = -1) => palavra(texto, depois).s;
