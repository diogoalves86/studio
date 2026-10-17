import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Envio';

// 006. curtida-nao-cresce: Reels de dica (envio > curtida para crescer), CTA duplo: mandar + seguir.
export const CurtidaNaoCresce: React.FC = () => <Destaque c={CONFIG} />;
export const CURTIDA_DURACAO = duracao(CONFIG);
