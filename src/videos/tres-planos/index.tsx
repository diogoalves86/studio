import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './TresPlanos';

// 030. tres-planos: "Esse erro deixa o vídeo da sua loja com cara de amador." Gravar tudo de um ângulo só deixa o vídeo
// parado; vídeo bom alterna aberto, médio e fechado. Duas dicas pra trocar de plano.
export const TresPlanos: React.FC = () => <Destaque c={CONFIG} />;
export const PLANOS_DURACAO = duracao(CONFIG);
