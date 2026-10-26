import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './TextoEscondido';

// 028. texto-escondido: "Esse erro faz o Instagram esconder o texto mais importante do seu vídeo." A interface do Reels
// cobre a borda de baixo e o lado direito; três ajustes de enquadramento.
export const TextoEscondido: React.FC = () => <Destaque c={CONFIG} />;
export const TEXTO_DURACAO = duracao(CONFIG);
