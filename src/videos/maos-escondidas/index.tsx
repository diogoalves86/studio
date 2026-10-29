import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './MaosEscondidas';

// 035. maos-escondidas: "Esse erro faz quem assiste achar que você está desconfortável." Mão no bolso, fora do quadro
// ou braço cruzado; duas dicas e a ponte para o site do Digo Social ("acessa o Digo") antes do CTA de seguir.
export const MaosEscondidas: React.FC = () => <Destaque c={CONFIG} />;
export const MAOS_DURACAO = duracao(CONFIG);
