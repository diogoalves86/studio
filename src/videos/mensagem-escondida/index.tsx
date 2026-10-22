import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './MensagemEscondida';

// 021. mensagem-escondida: "Tem cliente te mandando mensagem agora, e o Instagram está escondendo de você." Quem não te
// segue cai em Solicitações; o que parece spam vai para Solicitações ocultas, sem notificação. Caminho animado e duas dicas.
export const MensagemEscondida: React.FC = () => <Destaque c={CONFIG} />;
export const MENSAGEM_DURACAO = duracao(CONFIG);
