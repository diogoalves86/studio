import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './PrimeiroSegundo';

// 031. primeiro-segundo: "Esse erro faz a pessoa passar antes de você falar a primeira palavra." O primeiro segundo de
// cara parada é o que aparece no feed; duas dicas e a ponte para o Digo Social antes do CTA de seguir.
export const PrimeiroSegundo: React.FC = () => <Destaque c={CONFIG} />;
export const SEGUNDO_DURACAO = duracao(CONFIG);
