import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Stories';

// 012. stories-vende: Story não é pra crescer, é pra vender pra quem já te segue. A fila dos Stories
// (ciclo ruim × ciclo bom), dado da Ipsos e duas dicas práticas. CTA duplo: mandar + seguir.
export const StoriesVende: React.FC = () => <Destaque c={CONFIG} />;
export const STORIES_VENDE_DURACAO = duracao(CONFIG);
