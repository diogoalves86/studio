import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Taticas';

// 011. taticas-da-eleicao: o que as campanhas de Lula e Flávio Bolsonaro fazem no Instagram e como um negócio
// pode copiar. Neutro: blocos simétricos, sem comparar quem é melhor. CTA duplo: mandar + seguir.
export const TaticasDaEleicao: React.FC = () => <Destaque c={CONFIG} />;
export const TATICAS_DURACAO = duracao(CONFIG);
