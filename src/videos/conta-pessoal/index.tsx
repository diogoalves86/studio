import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './ContaPessoal';

// 024. conta-pessoal-shadowban: "Seu perfil pode estar no shadowban, e a sua conta não deixa você ver." O item de
// recomendação do Status da conta só aparece em conta profissional; como mudar (grátis, 2 min, reversível; fica pública).
export const ContaPessoal: React.FC = () => <Destaque c={CONFIG} />;
export const CONTA_PESSOAL_DURACAO = duracao(CONFIG);
