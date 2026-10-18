import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Hashtag';

// 008. hashtag-nao-faz-milagre: Reels de dica (hashtag não dá alcance; ajuda na busca), CTA duplo: mandar + seguir.
export const HashtagNaoFazMilagre: React.FC = () => <Destaque c={CONFIG} />;
export const HASHTAG_DURACAO = duracao(CONFIG);
