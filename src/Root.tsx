import React from 'react';
import {Composition, Folder} from 'remotion';
import {MinimalSuico} from './estilos/MinimalSuico';
import {TerminalTecnico} from './estilos/TerminalTecnico';
import {VerticalDados} from './estilos/VerticalDados';
import {VerticalLegendas} from './estilos/VerticalLegendas';
import {VerticalPrint} from './estilos/VerticalPrint';
import {REELS_DURACAO, ReelsAvatar} from './videos/reels-avatar/ReelsAvatar';
import {DESTAQUES} from './videos/destaques-instagram';
import {Capa} from './videos/destaques-instagram/Capa';
import {FEED_DURACAO, FeedCompleto} from './videos/destaques-instagram/FeedCompleto';

const FPS = 30;
const SEIS_SEGUNDOS = 6 * FPS;

export const RemotionRoot: React.FC = () => (
  <>
    {/* Exemplos que rodam sem nenhum vídeo. Servem de referência de estilo, não de padrão fixo. */}
    <Folder name="Estilos">
      <Composition id="MinimalSuico" component={MinimalSuico} width={1920} height={1080} fps={FPS} durationInFrames={SEIS_SEGUNDOS} />
      <Composition id="TerminalTecnico" component={TerminalTecnico} width={1920} height={1080} fps={FPS} durationInFrames={SEIS_SEGUNDOS} />
      <Composition id="VerticalLegendas" component={VerticalLegendas} width={1080} height={1920} fps={FPS} durationInFrames={SEIS_SEGUNDOS} />
      <Composition id="VerticalPrint" component={VerticalPrint} width={1080} height={1920} fps={FPS} durationInFrames={SEIS_SEGUNDOS} />
      <Composition id="VerticalDados" component={VerticalDados} width={1080} height={1920} fps={FPS} durationInFrames={SEIS_SEGUNDOS} />
    </Folder>

    {/* Seus vídeos entram aqui: um <Folder name="001-slug"> por projeto, com o código em src/videos/<slug>/. */}
    <Folder name="001-reels-avatar">
      <Composition id="ReelsAvatar" component={ReelsAvatar} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(REELS_DURACAO * FPS)} />
    </Folder>
    <Folder name="002-destaques-instagram">
      {DESTAQUES.map(({id, Componente, duracao}) => (
        <Composition key={id} id={id} component={Componente} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(duracao * FPS)} />
      ))}
      <Composition id="FeedCompleto" component={FeedCompleto} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(FEED_DURACAO * FPS)} />
      <Composition id="CapaDestaque" component={Capa} width={1080} height={1920} fps={FPS} durationInFrames={1} defaultProps={{n: 1 as 1 | 2 | 3 | 4}} />
    </Folder>
  </>
);
