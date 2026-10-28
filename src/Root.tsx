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
import {CapaUnica} from './videos/destaques-instagram/CapaUnica';
import {FEED_DURACAO, FeedCompleto} from './videos/destaques-instagram/FeedCompleto';
import {DestaqueLojinha, LOJINHA_DURACAO} from './videos/destaque-lojinha';
import {Sexta22h, SEXTA_DURACAO} from './videos/sexta-22h';
import {PareDeSumir, SUMIR_DURACAO} from './videos/pare-de-sumir';
import {CurtidaNaoCresce, CURTIDA_DURACAO} from './videos/curtida-nao-cresce';
import {TresSegundos, TRES_DURACAO} from './videos/tres-segundos';
import {HashtagNaoFazMilagre, HASHTAG_DURACAO} from './videos/hashtag-nao-faz-milagre';
import {PerfilTresSegundos, PERFIL_DURACAO} from './videos/perfil-tres-segundos';
import {StoryDirectViraPost, STORY_DURACAO} from './videos/story-direct-vira-post';
import {TaticasDaEleicao, TATICAS_DURACAO} from './videos/taticas-da-eleicao';
import {StoriesVende, STORIES_VENDE_DURACAO} from './videos/stories-vende';
import {ReelsDeTeste, TESTE_DURACAO} from './videos/reels-de-teste';
import {ApresentacaoLuisa, LUISA_DURACAO} from './videos/apresentacao-luisa';
import {FazConta, FAZ_CONTA_DURACAO} from './videos/faz-a-conta';
import {CarrosselSegundaChance, CARROSSEL_DURACAO} from './videos/carrossel-segunda-chance';
import {ResponderComentario, RESPONDER_DURACAO} from './videos/responder-comentario';
import {RepostTrocado, REPOST_DURACAO} from './videos/repost-trocado';
import {Shadowban, SHADOWBAN_DURACAO} from './videos/shadowban';
import {MensagemEscondida, MENSAGEM_DURACAO} from './videos/mensagem-escondida';
import {ShadowbanCausas, CAUSAS_DURACAO} from './videos/shadowban-causas';
import {SeguidoresRemovidos, SEGUIDORES_DURACAO} from './videos/seguidores-removidos';
import {ContaPessoal, CONTA_PESSOAL_DURACAO} from './videos/conta-pessoal';
import {ShadowbanNegado, NEGADO_DURACAO} from './videos/shadowban-negado';
import {ReelsAmador, AMADOR_DURACAO} from './videos/reels-amador';
import {FigurinhaReacao, FIGURINHA_DURACAO} from './videos/figurinha-reacao';
import {TextoEscondido, TEXTO_DURACAO} from './videos/texto-escondido';
import {OlhaPraLente, LENTE_DURACAO} from './videos/olha-pra-lente';
import {TresPlanos, PLANOS_DURACAO} from './videos/tres-planos';
import {PrimeiroSegundo, SEGUNDO_DURACAO} from './videos/primeiro-segundo';

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
      <Composition id="CapaDestaqueUnico" component={CapaUnica} width={1080} height={1920} fps={FPS} durationInFrames={1} defaultProps={{v: 'logo' as 'logo' | 'rosto' | 'icone'}} />
      <Composition id="CapaDestaque" component={Capa} width={1080} height={1920} fps={FPS} durationInFrames={1} defaultProps={{n: 1 as 1 | 2 | 3 | 4}} />
    </Folder>
    <Folder name="003-destaque-lojinha">
      <Composition id="DestaqueLojinha" component={DestaqueLojinha} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(LOJINHA_DURACAO * FPS)} />
    </Folder>
    <Folder name="004-sexta-22h">
      <Composition id="Sexta22h" component={Sexta22h} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(SEXTA_DURACAO * FPS)} />
    </Folder>
    <Folder name="005-pare-de-sumir">
      <Composition id="PareDeSumir" component={PareDeSumir} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(SUMIR_DURACAO * FPS)} />
    </Folder>
    <Folder name="006-curtida-nao-cresce">
      <Composition id="CurtidaNaoCresce" component={CurtidaNaoCresce} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(CURTIDA_DURACAO * FPS)} />
    </Folder>
    <Folder name="007-tres-segundos">
      <Composition id="TresSegundos" component={TresSegundos} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(TRES_DURACAO * FPS)} />
    </Folder>
    <Folder name="008-hashtag-nao-faz-milagre">
      <Composition id="HashtagNaoFazMilagre" component={HashtagNaoFazMilagre} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(HASHTAG_DURACAO * FPS)} />
    </Folder>
    <Folder name="009-perfil-tres-segundos">
      <Composition id="PerfilTresSegundos" component={PerfilTresSegundos} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(PERFIL_DURACAO * FPS)} />
    </Folder>
    <Folder name="010-story-direct-vira-post">
      <Composition id="StoryDirectViraPost" component={StoryDirectViraPost} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(STORY_DURACAO * FPS)} />
    </Folder>
    <Folder name="011-taticas-da-eleicao">
      <Composition id="TaticasDaEleicao" component={TaticasDaEleicao} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(TATICAS_DURACAO * FPS)} />
    </Folder>
    <Folder name="012-stories-vende">
      <Composition id="StoriesVende" component={StoriesVende} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(STORIES_VENDE_DURACAO * FPS)} />
    </Folder>
    <Folder name="013-reels-de-teste">
      <Composition id="ReelsDeTeste" component={ReelsDeTeste} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(TESTE_DURACAO * FPS)} />
    </Folder>
    <Folder name="015-apresentacao-luisa">
      <Composition id="ApresentacaoLuisa" component={ApresentacaoLuisa} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(LUISA_DURACAO * FPS)} />
    </Folder>
    <Folder name="016-faz-a-conta">
      <Composition id="FazConta" component={FazConta} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(FAZ_CONTA_DURACAO * FPS)} />
    </Folder>
    <Folder name="017-carrossel-segunda-chance">
      <Composition id="CarrosselSegundaChance" component={CarrosselSegundaChance} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(CARROSSEL_DURACAO * FPS)} />
    </Folder>
    <Folder name="018-responder-comentario">
      <Composition id="ResponderComentario" component={ResponderComentario} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(RESPONDER_DURACAO * FPS)} />
    </Folder>
    <Folder name="019-repost-trocado">
      <Composition id="RepostTrocado" component={RepostTrocado} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(REPOST_DURACAO * FPS)} />
    </Folder>
    <Folder name="020-shadowban">
      <Composition id="Shadowban" component={Shadowban} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(SHADOWBAN_DURACAO * FPS)} />
    </Folder>
    <Folder name="021-mensagem-escondida">
      <Composition id="MensagemEscondida" component={MensagemEscondida} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(MENSAGEM_DURACAO * FPS)} />
    </Folder>
    <Folder name="022-shadowban-causas">
      <Composition id="ShadowbanCausas" component={ShadowbanCausas} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(CAUSAS_DURACAO * FPS)} />
    </Folder>
    <Folder name="023-seguidores-removidos">
      <Composition id="SeguidoresRemovidos" component={SeguidoresRemovidos} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(SEGUIDORES_DURACAO * FPS)} />
    </Folder>
    <Folder name="024-conta-pessoal-shadowban">
      <Composition id="ContaPessoal" component={ContaPessoal} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(CONTA_PESSOAL_DURACAO * FPS)} />
    </Folder>
    <Folder name="025-shadowban-negado">
      <Composition id="ShadowbanNegado" component={ShadowbanNegado} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(NEGADO_DURACAO * FPS)} />
    </Folder>
    <Folder name="026-reels-amador">
      <Composition id="ReelsAmador" component={ReelsAmador} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(AMADOR_DURACAO * FPS)} />
    </Folder>
    <Folder name="027-figurinha-de-reacao">
      <Composition id="FigurinhaReacao" component={FigurinhaReacao} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(FIGURINHA_DURACAO * FPS)} />
    </Folder>
    <Folder name="028-texto-escondido">
      <Composition id="TextoEscondido" component={TextoEscondido} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(TEXTO_DURACAO * FPS)} />
    </Folder>
    <Folder name="029-olha-pra-lente">
      <Composition id="OlhaPraLente" component={OlhaPraLente} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(LENTE_DURACAO * FPS)} />
    </Folder>
    <Folder name="030-tres-planos">
      <Composition id="TresPlanos" component={TresPlanos} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(PLANOS_DURACAO * FPS)} />
    </Folder>
    <Folder name="031-primeiro-segundo">
      <Composition id="PrimeiroSegundo" component={PrimeiroSegundo} width={1080} height={1920} fps={FPS} durationInFrames={Math.ceil(SEGUNDO_DURACAO * FPS)} />
    </Folder>
  </>
);
