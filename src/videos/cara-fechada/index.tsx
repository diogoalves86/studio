import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './CaraFechada';

// 036. cara-fechada: "Esse erro faz quem assiste achar que você está de mau humor." O rosto parado parece sério na câmera;
// duas dicas e a ponte para o site do Digo Social ("acessa o Digo") antes do CTA de seguir.
export const CaraFechada: React.FC = () => <Destaque c={CONFIG} />;
export const CARA_DURACAO = duracao(CONFIG);
