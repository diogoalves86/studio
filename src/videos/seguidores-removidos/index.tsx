import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './SeguidoresRemovidos';

// 023. seguidores-removidos: "O Instagram está removendo seguidores de alguns perfis. Veja se o seu é um deles." Regra
// 13+ das Contas de Adolescente; perfis com conteúdo impróprio somem para menores de 18 e perdem esses seguidores
// (Meta, 29/04/2026); onde ver no Status da conta e o que fazer.
export const SeguidoresRemovidos: React.FC = () => <Destaque c={CONFIG} />;
export const SEGUIDORES_DURACAO = duracao(CONFIG);
