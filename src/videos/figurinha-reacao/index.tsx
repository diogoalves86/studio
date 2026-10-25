import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './FigurinhaReacao';

// 027. figurinha-de-reacao: "Tem uma figurinha nos Stories que te entrega a lista de quem quer comprar." Nossa versão
// honesta de um vídeo de referência: figurinha de reação às claras, "Reações de figurinhas" vira lista de clientes.
export const FigurinhaReacao: React.FC = () => <Destaque c={CONFIG} />;
export const FIGURINHA_DURACAO = duracao(CONFIG);
