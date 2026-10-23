import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './ShadowbanCausas';

// 022. shadowban-causas: "Essas quatro coisas te dão shadowban, e você pode estar fazendo uma agora." Sorteio, isca de
// engajamento, repost demais e link caça-clique (diretrizes de recomendação do Instagram) e o que fazer.
export const ShadowbanCausas: React.FC = () => <Destaque c={CONFIG} />;
export const CAUSAS_DURACAO = duracao(CONFIG);
