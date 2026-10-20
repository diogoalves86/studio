import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Carrossel';

// 017. carrossel-segunda-chance: "Esse erro faz o seu carrossel perder a segunda chance." O Instagram pode mostrar o
// carrossel de novo já no slide 2 (Mosseri, 2024); o erro é um slide 2 que só faz sentido depois da capa. Duas dicas e CTA.
export const CarrosselSegundaChance: React.FC = () => <Destaque c={CONFIG} />;
export const CARROSSEL_DURACAO = duracao(CONFIG);
