import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Lojinha';

// 003. destaque-lojinha: destaque do @digo.social para dono de lojinha.
export const DestaqueLojinha: React.FC = () => <Destaque c={CONFIG} />;
export const LOJINHA_DURACAO = duracao(CONFIG);
