import {staticFile} from 'remotion';

// Mesmo dialeto visual do 002 ao 019; só os arquivos mudam.
export {caixa, clamp, COR, INTER, MONT, Pilula, prog, saida, suave, useBloco, useMola, useT} from '../destaques-instagram/tema';

const PASTA = '020. shadowban';

export const ARQ = {
  narracao: staticFile(`${PASTA}/video/narracao.wav`),
  // Clipes do Seedance 2 Mini já sincronizados com a voz natural (tools/sincronizar_avatar.py).
  clipe: (lado: 'a' | 'b') => staticFile(`${PASTA}/hf/sync_${lado.toUpperCase()}.mp4`),
  sfx: (som: string) => staticFile(`${PASTA}/sfx/${som}.wav`),
  // Logo oficial (cópia de ~/Documents/DigoSocial Logo Quadrada 1024x1024.png).
  logo: staticFile(`${PASTA}/prints/logo.png`),
  // Imagem oficial da Luísa (job 4312127e…): aparece no card de voz enquanto ela está fora de cena.
  luisa: staticFile(`${PASTA}/prints/luisa-ref.png`),
  // Prints reais do app do Diogo (21/10/2026): o caminho e a tela de Status da conta.
  configuracoes: staticFile(`${PASTA}/prints/configuracoes-e-atividade.png`),
  status: staticFile(`${PASTA}/prints/status-da-conta.png`),
};
