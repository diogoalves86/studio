import React from 'react';
import {Config, Destaque, duracao} from './Destaque';
import {CONFIG_1} from './Destaque1';
import {CONFIG_2} from './Destaque2';
import {CONFIG_3} from './Destaque3';
import {CONFIG_4} from './Destaque4';

// 002. destaques-instagram: 4 vídeos independentes para os destaques do @digo.social.
const criar = (id: string, config: Config) => {
  const Componente: React.FC = () => <Destaque c={config} />;
  Componente.displayName = id;
  return {id, Componente, duracao: duracao(config)};
};

export const DESTAQUES = [
  criar('Destaque1OQueE', CONFIG_1),
  criar('Destaque2ComoFunciona', CONFIG_2),
  criar('Destaque3PraQuem', CONFIG_3),
  criar('Destaque4TesteGratis', CONFIG_4),
];
