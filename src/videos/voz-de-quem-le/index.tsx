import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './VozDeQuemLe';

// 033. voz-de-quem-le: "Esse erro faz quem assiste perceber que você está lendo." Texto decorado ou teleprompter;
// duas dicas e a ponte para o site do Digo Social ("acessa o Digo") antes do CTA de seguir.
export const VozDeQuemLe: React.FC = () => <Destaque c={CONFIG} />;
export const LENDO_DURACAO = duracao(CONFIG);
