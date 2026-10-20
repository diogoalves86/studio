import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './FazConta';

// 016. faz-a-conta: um Reels com 500 visualizações pode ser melhor que um com 2 mil. A Luísa ensina a abrir os
// insights e fazer a conta (curtidas e compartilhamentos ÷ contas alcançadas), com o exemplo da Ana (bolo × brigadeiro).
export const FazConta: React.FC = () => <Destaque c={CONFIG} />;
export const FAZ_CONTA_DURACAO = duracao(CONFIG);
