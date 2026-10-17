import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Dica';

// 005. pare-de-sumir: Reels de dica (crescer no Instagram), CTA só para seguir o perfil.
export const PareDeSumir: React.FC = () => <Destaque c={CONFIG} />;
export const SUMIR_DURACAO = duracao(CONFIG);
