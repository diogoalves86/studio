import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Repost';

// 019. repost-trocado: "Esse erro faz o Instagram trocar o seu post pelo de outra pessoa." Com dois posts iguais, o
// Instagram recomenda só o original (2024; foto e carrossel desde abr/2026). Como a recomendação funciona, o motivo
// (Mosseri) e duas dicas para aproveitar uma ideia sem ser trocado.
export const RepostTrocado: React.FC = () => <Destaque c={CONFIG} />;
export const REPOST_DURACAO = duracao(CONFIG);
