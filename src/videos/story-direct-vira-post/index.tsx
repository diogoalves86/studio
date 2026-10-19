import React from 'react';
import {Destaque} from './Destaque';
import {CONFIG} from './Story';

// 010. story-direct-vira-post: Story com espaço para a figurinha de link (digosocial.com/empreendedores).
// Sem tela final: depois da fala, o avatar fica parado 3 s com a moldura do link, para dar tempo de tocar.
export const STORY_SEGURA = 3;
export const StoryDirectViraPost: React.FC = () => <Destaque c={CONFIG} outro={false} />;
export const STORY_DURACAO = CONFIG.trechos.fim + STORY_SEGURA;
