import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Contraluz';

// 038. contraluz: "Esse erro faz quem assiste achar que você está escondendo alguma coisa." Janela atrás deixa o rosto
// escuro; duas dicas e a ponte para o site do Digo Social ("acessa o Digo") antes do CTA de seguir.
export const Contraluz: React.FC = () => <Destaque c={CONFIG} />;
export const CONTRALUZ_DURACAO = duracao(CONFIG);
