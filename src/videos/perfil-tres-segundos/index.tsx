import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Perfil';

// 009. perfil-tres-segundos: Reels de dica (o perfil transforma visita em seguidor), CTA duplo: mandar + seguir.
export const PerfilTresSegundos: React.FC = () => <Destaque c={CONFIG} />;
export const PERFIL_DURACAO = duracao(CONFIG);
