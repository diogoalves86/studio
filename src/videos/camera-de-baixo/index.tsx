import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './CameraDeBaixo';

// 032. camera-de-baixo: "Esse erro faz você olhar quem assiste de cima pra baixo." Celular na altura do peito filma de
// baixo pra cima; duas dicas e a ponte para o Digo Social (agora com "baixa o Digo") antes do CTA de seguir.
export const CameraDeBaixo: React.FC = () => <Destaque c={CONFIG} />;
export const BAIXO_DURACAO = duracao(CONFIG);
