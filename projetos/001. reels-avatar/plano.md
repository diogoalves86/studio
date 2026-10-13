# 001. reels-avatar: plano de edição

> Nível 2 com montagem no Remotion. **0 crédito**: nenhum asset novo é gerado; tudo é montado com o que já existe na conta.
> Regra da conta: vídeo do avatar no **Seedance 2 Mini** e áudio gerado separado (economia de créditos).

## Fonte

Material da Higgsfield em `hf/`, gerado em 13/10/2026 (originais intocados):

| trecho | vídeo | áudio usado | por quê |
|---|---|---|---|
| 1. Gancho | `mini_…e306cc39` (7,1 s · 720×1280 · 24 fps) | **som do próprio clipe** | a boca só bate com o som do clipe; o ritmo do áudio separado é outro |
| 2. Exemplo | — (não existe clipe) | `audio_…e5a98719`, **corrigido** | entre 9,5 e 13,5 s a voz embaralhava ("o Aquad vê esse neitinho, noizizim, fala Gacian…"); o trecho foi cortado com fade de 80 ms |
| 3. A diferença | `mini_…92a246a1` (12,1 s) | **som do próprio clipe** | idem trecho 1 |
| 4. Segredo + CTA | — (não existe clipe) | `audio_…71440ccc` | silêncio inicial de 1,45 s removido |

Os quatro pedaços foram igualados em volume (−14 LUFS, padrão do Reels) e unidos em `video/narracao.wav`: **49,39 s**. Os tempos abaixo são dessa trilha (`transcricao/narracao/palavras.json`).

Clipes só de apoio: `mini_…b494083f` e `mini_…577b9617` (8 s, sem som) viram **fundo desfocado** nos trechos 2 e 4 e a **foto do perfil** no CTA.

## Leitura e orientações

Reels de dica para criadores: **"quem demora para chegar no assunto perde o espectador"**. Estrutura: gancho → exemplo ruim × bom → a diferença → o segredo → CTA para seguir o @digo.social.

**Orientações:** reaproveitar o último vídeo, corrigir o que estava ruim e fazer animações de acordo com a fala, em formato Reels. Direção escolhida: **animações nos trechos sem vídeo (0 crédito)**.

## Estilo

- **Dialeto:** "Digo Social": azul-elétrico do cenário e da logo. Fundo azul-marinho `#0A1430`, azul `#2F7BFF`, ciano `#3EC6FF`, branco, vermelho `#FF4D5E` para o "errado" e verde `#2EE59D` para o "certo".
- **Tipografia:** Montserrat ExtraBold/Black (títulos e legenda) e Inter (rótulos), via Google Fonts.
- **Intensidade:** equilibrada a dominante (Reels pede ritmo). Câmera limpa nunca fica parada por mais de ~4 s sem um movimento.
- **Formato:** 1080×1920, 30 fps, 49,4 s. Áreas livres para a interface do app: 250 px no topo e 420 px embaixo.

## Zona do rosto (quadros reais, escala 1080×1920)

Rosto em **x 260–840, y 170–1050** nos dois clipes. A logo da camiseta fica em y 1340–1600.
**A legenda fica em y 1110–1330**, entre o queixo e a logo. Elementos sobre a câmera ficam fora da caixa do rosto.

## Legenda

Legenda dinâmica em **todos os trechos**: grupos de 2–4 palavras, em caixa alta, com a palavra falada destacada em azul. Nos trechos 2 e 4, ela desce para a faixa de baixo do conteúdo. Nas falas que aparecem escritas nos cartões ("oi pessoal…", "você está cometendo…"), a legenda **some** para não repetir o texto.

## Timeline

| # | início–fim | cena | entrada | gatilho (palavra @ s) | visual |
|---|---|---|---|---|---|
| 1 | 0,00–3,55 | CÂMERA + ênfase | — | "Sabe" @ 0,00 · "passa direto" @ 1,50 | clipe 1 com push-in de 1,00 a 1,04. Em "passa direto", três miniaturas de vídeo **passam deslizando para cima** pela lateral esquerda (gesto de rolar o feed), fora do rosto |
| 2 | 3,55–7,10 | CÂMERA + ênfase | punch-in | "demora" @ 4,42 · "assunto" @ 6,44 | punch-in de 1,04 a 1,10 em "demora"; chip com relógio e um contador **0:01 → 0:07** correndo; "assunto" fica em vermelho na legenda |
| 3 | 7,10–9,40 | CENA | wipe azul | "Olha só" @ 7,24 · "exemplo" @ 8,50 | fundo: clipe de apoio desfocado e escurecido. Título "EXEMPLO" entra palavra por palavra |
| 4 | 9,40–15,70 | CENA | mola | "Em vez de" @ 9,48 · "oi pessoal" @ 11,68 · "três dicas" @ 13,64 | cartão de celular "❌ JEITO COMUM": o texto "Oi pessoal, tudo bem? Hoje eu vim trazer três dicas sobre Instagram…" é **digitado enquanto é falado**; uma barra de "retenção" cai de 100% a 23% e um polegar arrasta o cartão para cima (**pulou**) |
| 5 | 15,70–21,10 | CENA | corte seco | "Experimenta" @ 15,88 · "Você" @ 17,44 · "erro" @ 18,74 · "percebeu" @ 20,16 | segundo cartão "✅ JEITO CERTO": "Você está cometendo esse erro no Instagram e nem percebeu." entra palavra por palavra, com marca-texto em "esse erro"; a barra de retenção sobe e trava em 87%, com o ícone de olho aceso |
| 6 | 21,10–24,60 | CÂMERA + ênfase | transformação | "Percebe" @ 21,22 · "diferença" @ 21,96 | o cartão encolhe e sai; entra o clipe 3 com punch-in de 1,10 a 1,04. Os dois cartões em miniatura (❌ e ✅) ficam lado a lado no alto, fora do rosto, por 2 s |
| 7 | 24,60–28,40 | CÂMERA + motion | mola | "motivo" @ 26,08 · "continuar assistindo" @ 27,18 | chip verde "✅ motivo pra continuar assistindo" à esquerda, acima da legenda |
| 8 | 28,40–33,40 | CÂMERA + motion | mola | "inventar" @ 29,50 · "absurda" @ 30,76 · "não" @ 32,82 | chip "frase absurda 🤯" que leva um **risco vermelho** em "não"; push-in lento |
| 9 | 33,40–38,90 | CENA | wipe azul | "segredo" @ 34,08 · "logo de cara" @ 35,48 · "problema" @ 36,46 · "resolver" @ 37,94 | tipografia grande: "O SEGREDO" e "mostre o **PROBLEMA**" com a palavra em ciano; uma linha do tempo do vídeo de 0 a 30 s com os **primeiros 3 s** acendendo (é ali que mora o problema) |
| 10 | 38,90–43,40 | CENA | corte seco | "conteúdos melhores" @ 40,56 · "crescer" @ 42,06 | gráfico de crescimento: a linha sobe em "crescer", com o número de seguidores contando |
| 11 | 43,40–49,39 | CENA (CTA) | transformação | "segue" @ 44,10 · "Digo Social" @ 44,58 · "dicas práticas" @ 46,74 · "perfil" @ 48,54 | cartão de perfil do Instagram recriado: foto (quadro do clipe de apoio sorrindo), "Digo Social · @digo.social", botão **Seguir** que um dedo toca em "segue" e vira **Seguindo ✓**; em "dicas práticas", três chips sobem: "ganchos", "roteiro", "crescimento". Fica parado até o fim |

**Curva de energia:** gancho rápido (2 movimentos em 7 s) → exemplo longo e didático (cartões) → respiro na câmera com chips → pico tipográfico no segredo → CTA limpo.

## Fica de fora

- Clipe de 11/10 (`mini_…46fa4216`) e os áudios de 11/10: são de outro roteiro ("os 3 erros").
- Tela dividida: no vertical, o rosto ocuparia metade da tela e a fala dos trechos 2 e 4 não tem vídeo.
- Logo da Digo Social recriada: uso só o texto. Se quiser a logo oficial, salve um PNG em `prints/logo.png` que eu aplico.

## Riscos para conferir no preview

- **Voz:** os trechos 1 e 3 usam a voz gerada junto com o vídeo, e os trechos 2 e 4 usam o áudio separado. Se o timbre mudar demais entre eles, dá para usar o áudio separado em tudo e mostrar o clipe sem som (aí a boca deixa de bater).
- **Resolução:** os clipes do Mini são 720p e foram ampliados para 1080p. Ficam um pouco mais macios que as animações.

## Versão 2 (pedido após o primeiro preview)

Pedido: a voz do avatar soava robotizada, deixar o Reels mais dinâmico, transições suaves e usar a logo oficial. **Continua 0 crédito.**

- **Voz natural em tudo:** a narração agora usa só os 4 áudios separados (`video/narracao_v2.wav`). Saiu a voz gerada junto com os clipes, que era a robotizada.
- **Pausas encurtadas:** cada pausa ficou com ~0,2 s. A narração caiu de 49,4 s para **42,1 s**, e o trecho embaralhado continua cortado.
- **Boca sincronizada sem gerar nada:** os clipes 1 e 3 foram reajustados no tempo de frase em frase, com velocidade entre 0,7× e 1,6×, para a boca acompanhar a voz natural (`hf/sync_gancho.mp4`, `hf/sync_diferenca.mp4`). Os originais continuam intactos.
- **Versão 3, sincronia quadro a quadro:** o início e o fim de cada palavra em comum viram âncoras, e a curva é suavizada com σ de 70 ms. O desvio médio entre boca e voz é de 11 ms no gancho e 20 ms na diferença, com máximo de 85 ms.
- **Versão 4, sincronia acústica:** a fala original do clipe (que bate com a boca) é casada com a voz natural por DTW em espectrograma log-mel, numa faixa de ±0,25 s em volta do mapa por palavras. No teste independente (atraso de energia em janelas de 0,5 s), a mediana caiu para 5 ms. Janelas com mais de 45 ms: de 30% para 0% no gancho e de 14% para 6% na diferença.
- **Efeitos sonoros** (`sfx/`, sintetizados localmente, 0 crédito): whoosh de entrada e de saída em cada zoom da câmera, impacto nos punch-ins, swoosh nos wipes, pop nas etiquetas, tique no cronômetro, cliques de digitação nos cartões, risco no marca-texto e na "frase absurda", toque e ding no "Seguindo". Ficam abaixo da voz (volume geral 0,8).
- **Versão 5, disfarce da IA:** medi onde o reajuste de tempo congela a boca (menos de 0,65×) ou acelera demais (mais de 1,6×). Nesses trechos o avatar sai de cena ou encolhe:
  - **Gancho:** abre em motion ("SABE POR QUE MUITA GENTE" e um celular com o feed rolando e o selo "PASSA DIRETO"). O avatar fica em tela cheia de "pelo seu vídeo" até "demora". Depois vira card (canto inferior direito, 420×560) ao lado de um cronômetro grande e do texto "DEMORA DEMAIS pra chegar no ASSUNTO".
  - **Diferença:** abre em motion ("PERCEBE A DIFERENÇA?" e os dois exemplos lado a lado). O avatar fica em tela cheia em "No segundo exemplo" e vira card de "a pessoa já tem um motivo…" até "frase absurda", com "UM MOTIVO PRA CONTINUAR", a retenção indo a 87%, "NÃO PRECISA INVENTAR" e "FRASE ABSURDA ?!". Volta à tela cheia em "para chamar a atenção, não", com punch-in.
  - **Textura de câmera real:** grão de filme animado, vinheta, cor um pouco menos saturada e oscilação sutil de câmera na mão.
- **Gatilhos pela palavra:** todos saem de `marcas.ts`, que lê as palavras da nova narração.
- **Mais dinâmico:** a câmera troca de zoom a cada frase (1,00 / 1,14 / 1,26), com punch-in e tremor curto em "demora" e "absurda". O enquadramento sobe com o zoom para a legenda não cobrir o queixo. O fundo das cenas animadas tem um zoom contínuo e a legenda quebra em grupos menores.
- **Transições:** zooms deslizando em 0,3 s, wipe azul nas 4 trocas de cena (inclusive na volta para a câmera e no final) e zoom com desfoque entre as partes do segredo.
- **Logo oficial** (`prints/logo.png`, cópia de `~/Documents/DigoSocial Logo Quadrada 1024x1024.png`) como foto do perfil e na **tela final** de 1,4 s (logo, "Digo Social", "@digo.social"). Duração total: **43,46 s**.
- **Sincronia real com Seedance 2 Mini + `audio_references` (pago):** não foi possível pelo conector desta sessão, que só lê. Fica como opção para gerar pelo site da Higgsfield se o ajuste de tempo não bastar.

## Saída

`edicoes/001. reels-avatar/reels-avatar_final.mp4` (1080×1920, 30 fps, h264 + aac, 49,4 s).
