import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Sexta';

// 004. sexta-22h: Reels do feed do @digo.social, sexta à noite, CTA para seguir o perfil.
export const Sexta22h: React.FC = () => <Destaque c={CONFIG} />;
export const SEXTA_DURACAO = duracao(CONFIG);
