import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './ReelsAmador';

// 026. reels-amador: "Esses três erros deixam o Reels da sua loja com cara de amador." Luz (contraluz → de frente para
// a janela), som (longe → a um braço / lapela) e começo (oi gente → resultado primeiro), com a Luísa "gravando".
export const ReelsAmador: React.FC = () => <Destaque c={CONFIG} />;
export const AMADOR_DURACAO = duracao(CONFIG);
