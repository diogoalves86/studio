import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './OlhaPraLente';

// 029. olha-pra-lente: "Esse erro faz quem assiste sentir que você não está falando com ele." Quem grava olhando pra tela
// desvia o olhar; duas dicas pra olhar pra lente.
export const OlhaPraLente: React.FC = () => <Destaque c={CONFIG} />;
export const LENTE_DURACAO = duracao(CONFIG);
