import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Shadowban';

// 020. shadowban: "O shadowban existe, e o Instagram tem uma tela que mostra se você está nele." Post contra as regras de
// recomendação some para quem não segue; o caminho até o Status da conta com os prints reais do app; editar, apagar ou
// pedir nova análise.
export const Shadowban: React.FC = () => <Destaque c={CONFIG} />;
export const SHADOWBAN_DURACAO = duracao(CONFIG);
