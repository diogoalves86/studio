import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Tres';

// 007. tres-segundos: Reels de dica (o Reels é decidido nos primeiros segundos), CTA duplo: mandar + seguir.
export const TresSegundos: React.FC = () => <Destaque c={CONFIG} />;
export const TRES_DURACAO = duracao(CONFIG);
