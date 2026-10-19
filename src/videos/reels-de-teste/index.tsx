import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Teste';

// 013. reels-de-teste: medo de postar e flopar? O Reels de teste vai primeiro só pra quem não te segue.
// Tutorial animado de como publicar, o que ver em 24 h e duas dicas. CTA duplo: mandar + seguir.
export const ReelsDeTeste: React.FC = () => <Destaque c={CONFIG} />;
export const TESTE_DURACAO = duracao(CONFIG);
