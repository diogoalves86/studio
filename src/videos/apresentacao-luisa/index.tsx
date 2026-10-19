import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Luisa';

// 015. apresentacao-luisa: a Luísa se apresenta como a nova cara do Digo Social e explica por que o Reels
// repostado com marca d'água de outro aplicativo quase não chega a quem não te segue. Duas dicas e CTA para seguir.
export const ApresentacaoLuisa: React.FC = () => <Destaque c={CONFIG} />;
export const LUISA_DURACAO = duracao(CONFIG);
