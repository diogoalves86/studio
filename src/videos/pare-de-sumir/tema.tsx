import {staticFile} from 'remotion';

// Mesmo dialeto visual do 002 ao 004; só os arquivos mudam.
export {caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from '../destaques-instagram/tema';

const PASTA = '005. pare-de-sumir';

export const ARQ = {
  narracao: staticFile(`${PASTA}/video/narracao.wav`),
  // Clipes do Seedance 2 Mini já sincronizados com a voz natural (tools/sincronizar_avatar.py).
  clipe: (lado: 'a' | 'b') => staticFile(`${PASTA}/hf/sync_${lado.toUpperCase()}.mp4`),
  sfx: (som: string) => staticFile(`${PASTA}/sfx/${som}.wav`),
  // Logo oficial (cópia de ~/Documents/DigoSocial Logo Quadrada 1024x1024.png).
  logo: staticFile(`${PASTA}/prints/logo.png`),
  // Foto oficial do avatar: aparece no card de voz enquanto o avatar está fora de cena.
  avatar: staticFile(`${PASTA}/prints/avatar-ref.png`),
};
