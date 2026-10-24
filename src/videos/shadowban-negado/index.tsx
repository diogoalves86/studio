import React from 'react';
import {Destaque, duracao} from './Destaque';
import {CONFIG} from './ShadowbanNegado';

// 025. shadowban-negado: "O Instagram negou o shadowban por anos. Depois criou uma tela que mostra ele." Mosseri 2020
// ("not a thing") → blog oficial 2021 (admitiu e prometeu avisar) → Status da conta 2022. Quem está certo: os dois.
export const ShadowbanNegado: React.FC = () => <Destaque c={CONFIG} />;
export const NEGADO_DURACAO = duracao(CONFIG);
