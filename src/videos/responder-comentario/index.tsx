import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './Comentario';

// 018. responder-comentario: "Para de responder comentário assim. Você está perdendo o seu melhor vídeo." A dúvida de um
// é a de muitos e a resposta em texto fica escondida; o Instagram deixa responder comentário com Reels (TechCrunch, 2021).
// Duas dicas e CTA.
export const ResponderComentario: React.FC = () => <Destaque c={CONFIG} />;
export const RESPONDER_DURACAO = duracao(CONFIG);
