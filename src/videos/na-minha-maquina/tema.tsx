import {staticFile} from 'remotion';
import {loadFont as loadBungee} from '@remotion/google-fonts/Bungee';

// Galinha Programadora (@galinhaprogramadora): mesmas primitivas do padrão do guia 6, com a identidade da página.
export {clamp, INTER, MONT, prog, saida, suave, useBloco, useMola, useT} from '../destaques-instagram/tema';

// Letreiro grosso, como o da logo.
export const {fontFamily: BUNGEE} = loadBungee('normal', {weights: ['400'], subsets: ['latin', 'latin-ext']});

// Cores tiradas da logo: fundo verde-água, crista rosa, fone azul, letreiro preto com amarelo.
export const GAL = {
  verde: '#5CC9A7',
  verdeEscuro: '#0E3B31',
  verdeNoite: '#072019',
  rosa: '#FF4F9A',
  azul: '#2F6FE0',
  amarelo: '#FFE45C',
  preto: '#111111',
  branco: '#FFFFFF',
  cinza: '#A9C2BA',
  vermelho: '#FF3B3B',
  terminal: '#39FF88',
};

const PASTA = '034. na-minha-maquina';

export const ARQ = {
  narracao: staticFile(`${PASTA}/video/narracao.wav`),
  // Clipes do Seedance 2 Mini já sincronizados com a voz natural (tools/sincronizar_avatar.py).
  clipe: (n: 'A' | 'B' | 'C') => staticFile(`${PASTA}/hf/sync_${n}.mp4`),
  sfx: (som: string) => staticFile(`${PASTA}/sfx/${som}.wav`),
  // Logo da página (enviada pelo Diogo em 28/10/2026) e a imagem oficial da Galinha (033, versão B).
  logo: staticFile(`${PASTA}/prints/logo.jpg`),
  galinha: staticFile(`${PASTA}/prints/galinha.png`),
  // Último quadro do clipe B ("…funciona!"): a reação congelada depois da resposta do chefe.
  reacao: staticFile(`${PASTA}/prints/reacao.png`),
};
