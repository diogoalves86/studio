# 002. destaques-instagram: plano

> Nível 2 (Higgsfield) com montagem no Remotion, seguindo o [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md).
> 4 vídeos independentes para os destaques do @digo.social, 9:16, roteiro em [roteiro.md](roteiro.md).

## Decisões aprovadas (13/10/2026)

- **Sem B-roll de IA.** Os 4 B-rolls do pedido original saíram; todo apoio visual é motion graphics no Remotion.
- **Custo aprovado:** ~45 créditos (4 vozes + 8 clipes do avatar). Preço real medido no histórico: Seedance 2 Mini 720p = 1 crédito/s.
- **Pedido do Diogo:** motion graphics caprichados, **alternar bastante** para ele não ficar em tela cheia o tempo todo (tela cheia ↔ card ↔ motion cheio), vídeo bem dinâmico e efeitos sonoros bacanas.
- **Pausas longas sempre cortadas** (`tools/cortar_pausas.py`), regra que agora vale para todo vídeo (guia 6, regra 3).

## Gerado na Higgsfield

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz 1, O que é | `hf/voz_1_oque.mp3` → `_ritmo.wav` | 26,6 → 23,3 s | ~2,7 |
| Voz 2, Como funciona | `hf/voz_2_como.mp3` → `_ritmo.wav` | 20,5 → 19,8 s | ~2,8 |
| Voz 3, Pra quem | `hf/voz_3_praquem.mp3` → `_ritmo.wav` | 27,7 → 19,0 s | ~1,7 |
| Voz 4, Teste grátis | `hf/voz_4_teste.mp3` → `_ritmo.wav` | 22,6 → 19,5 s | ~1,8 |
| Avatar 1a, 1b, 2a, 2b, 3a, 3b, 4a, 4b | `hf/avatar_<id>.mp4` | 5+5+4+4+4+5+5+6 = 38 s | 38 |

- Voz: Seed Audio clonando a referência do Diogo (`58086f4c…`), `speech_rate` 5, `loudness_rate` 23.
- Avatar: Seedance 2 Mini, 720p, 9:16, `start_image` = imagem oficial (`prints/avatar-ref.png`), `audio_references` = o recorte da voz `_ritmo` de cada fala (`hf/ref_avatar/`, mapa em `hf/cortes_avatar.json`), com 0,4 s de silêncio no começo.

## Narração e sincronia (feito)

- Cada destaque tem a própria narração (`video/narracao_<n>_<nome>.wav`), montada com `tools/narracao.py --config narracao_<n>.json`, e um `palavras_<n>.ts` em `src/videos/destaques-instagram/`.
- Cada narração tem 3 trechos: `<n>a` (abertura com avatar), `<n>meio` (motion) e `<n>b` (fechamento com avatar), cortados no meio da pausa entre as frases.
- A boca foi sincronizada com `tools/sincronizar_avatar.py` (`hf/sync_<id>.mp4`). Atraso mediano de 5 a 8 ms em 6 clipes; 15 ms no 3a. Os momentos acelerados ou congelados do relatório (`transcricao/narracao_<n>/sincronia.md`) estão cobertos abaixo.
- Efeitos sonoros: `sfx/` (`tools/gerar_sfx.py`).

| Destaque | Narração | Com tela final (+1,4 s) |
|---|---|---|
| 1. O que é | 23,3 s | 24,7 s |
| 2. Como funciona | 19,8 s | 21,2 s |
| 3. Pra quem | 19,0 s | 20,4 s |
| 4. Teste grátis | 19,5 s | 20,9 s |

## Linha do tempo (cada gatilho é uma palavra falada)

Legenda: **CHEIA** = avatar em tela cheia · **CARD** = avatar no card da direita com conteúdo ao lado · **MOTION** = animação em tela cheia (avatar fora).
Ritmo: algo novo a cada 1–2 s, o avatar nunca fica mais de ~3 s seguidos em tela cheia, wipe azul em cada troca de trecho.

### 1. O que é (24,7 s)

| Palavra | Estado | O que aparece | Som |
|---|---|---|---|
| "Toda" (0,0) | CHEIA, zoom 1,05 | gancho; título "O QUE EU POSTO AGORA?" palavra por palavra | whoosh_in |
| "a mesma" (0,9) | MOTION curto (cobre o clipe lento em 0,84–0,97) | celular com 3 notificações "e hoje, posta o quê?" chegando | pop ×3 |
| "O que eu posto" (2,0) | CHEIA, punch-in 1,24 em "agora?" | a pergunta em ciano | impacto |
| "concorrente" (3,9) | MOTION | feed rolando rápido + contador do concorrente subindo (+1.240) com gráfico de linha | whoosh_in, tique no contador |
| "Tenta uma IA" (5,2) | MOTION | caixa de chat genérica digitando | tecla |
| "legenda bonita" (7,0) | MOTION | cartão "LEGENDA BONITA ✓" verde × "PAUTA FRACA ✕" vermelho com risco em "fraca" (8,6) | pop, risco |
| "O Digo Social" (9,2) | MOTION | logo oficial entra com brilho; "DIGO SOCIAL" | impacto |
| "consultor" (11,6) | CARD | ao lado: "CONSULTOR DE REDES COM IA" com marca-texto ciano | swoosh, risco |
| "lê seus posts" (13,5) | CARD | 3 chips entram um por vez: POSTS · COMENTÁRIOS · CONCORRENTES | pop ×3 |
| "o que postar" (16,3) | MOTION | celular com o print **Hoje**; zoom e marca-texto em "Leitura do Consultor: O que os sinais pedem agora?" | whoosh_in, risco |
| "porquê" (17,8) | MOTION | selo "E POR QUÊ" | pop |
| "Você revisa" (18,5) | CHEIA (clipe 1b) | 3 checks pequenos no topo: REVISA ✓ APROVA ✓ PUBLICA ✓ | ding ×3 |
| "Testa" (20,6) | CARD | selo grande "7 DIAS GRÁTIS" | impacto |
| "Link na bio" (22,2) | CHEIA, punch-in | etiqueta "LINK NA BIO ↑" | pop |
| fim (23,3) | tela final | logo + Digo Social + @digo.social (cobre o congelado em 23,14) | swoosh, impacto |

### 2. Como funciona (21,2 s)

| Palavra | Estado | O que aparece | Som |
|---|---|---|---|
| "Olha" (0,0) | CARD (o 2a acelera em 0,10–0,28 e 0,90–1,03; o card esconde) | título "COMO FUNCIONA NA PRÁTICA" | whoosh_in, pop |
| "Toda segunda" (1,8) | MOTION | celular entra; etiqueta "1 · SEGUNDA" | swoosh |
| "pulso semanal" (2,6) | MOTION | print **Pulso Semanal**; zoom em "Decisão desta semana" | whoosh_in |
| "funcionou" (3,6) | MOTION | marca-texto em "Melhor aposta" | risco |
| "Durante a semana" (5,8) | MOTION | etiqueta "2 · RADAR"; print **Oportunidades**, card "Recomendação master" | swoosh |
| "antes da pauta esfriar" (7,9) | MOTION | termômetro/ícone de chama caindo; score "92" pulsando | tique |
| "consultor" (9,8) | CARD | ao lado: print **Consultor** com o chat digitando a pergunta | tecla |
| "explica o motivo" (11,2) | CARD | marca-texto em "Por que isso importa" | risco |
| "rascunho" (12,3) | CARD | cartão de rascunho digitando | tecla |
| "calendário" (13,4) | MOTION | etiqueta "3 · CALENDÁRIO"; print **Mesa de Conteúdo** | swoosh |
| "você aprova" (14,0) | MOTION | dedo toca "Aprovar" → vira "Aprovado ✓" | toque, ding |
| "resultado" (15,1) | MOTION | etiqueta "4 · RESULTADOS"; print **Resultados** com o top post | swoosh |
| "aprendizado" (16,1) | MOTION | ciclo de 4 passos se fecha em círculo (Pulso → Radar → Consultor → Calendário → volta) | whoosh_in |
| "E nada" (17,7) | CHEIA (2b), punch-in em "aprovar" | etiqueta "VOCÊ APROVA TUDO" (cobre a aceleração em 18,33) | impacto |
| fim (19,8) | tela final | | swoosh, impacto |

### 3. Pra quem (20,4 s)

| Palavra | Estado | O que aparece | Som |
|---|---|---|---|
| "O Digo" (0,0) | CARD (o 3a acelera em 0,48–1,18) | título "PRA QUEM VENDE CONFIANÇA", "CONFIANÇA" em ciano | whoosh_in, pop |
| "Especialista" (2,4) | MOTION | cartão 1 "ESPECIALISTA" com ícone; profissões entram uma por palavra: advogado, médico, psicólogo, coach, consultor | pop a cada palavra |
| "Negócio local" (7,1) | MOTION | cartão 2 "NEGÓCIO LOCAL": clínica, salão, academia | swoosh, pop ×3 |
| "social media" (10,1) | MOTION | cartão 3 "SOCIAL MEDIA" | swoosh |
| "dado" (12,9) | MOTION | "DADO ✓" em verde | ding |
| "achismo" (13,8) | MOTION | "ACHISMO" leva risco vermelho | risco, impacto |
| "Se a sua venda" (14,5) | CARD (o "Se" congela em 14,47) → CHEIA em "aparecer" | etiquetas "TODA SEMANA" e "AUTORIDADE" | pop ×2 |
| "autoridade" (16,9) | CHEIA, punch-in | | impacto |
| "é pra você" (18,3) | CARD (cobre a aceleração em 18,36) | os 3 cartões voltam pequenos ao lado | whoosh_in |
| fim (19,0) | tela final | | swoosh, impacto |

### 4. Teste grátis (20,9 s)

| Palavra | Estado | O que aparece | Som |
|---|---|---|---|
| "Quer testar" (0,0) | CHEIA, zoom 1,05 | | whoosh_in |
| "sete dias grátis" (1,4) | CARD | selo "7 DIAS GRÁTIS" girando | impacto |
| "sem cartão" (2,9) | CARD | "SEM CARTÃO" com ícone de cartão riscado | risco |
| "Tem plano" (3,8) | MOTION | 3 cartões de plano entram: SOLO R$ 57 · ESSENCIAL R$ 97 · PRO R$ 197 | swoosh, pop ×3 |
| "57" (5,3) | MOTION | zoom no Solo, "1 rede" | tique |
| "O mais indicado" (8,3) | MOTION | Pro cresce e ganha o selo "MAIS INDICADO" | impacto |
| "Pulso" (10,1) | MOTION | 4 chips no Pro, um por palavra: PULSO · RADAR · RESULTADOS · CONSULTOR | pop ×4 |
| "trabalhando juntos" (13,2) | MOTION | os 4 chips se conectam | whoosh_in |
| "E dá pra ver" (14,5) | CHEIA (4b) | | whoosh_out |
| "demonstração" (15,1) | CARD | celular com o site, botão "Ver demonstração sem cadastro" com dedo tocando | toque |
| "Link na bio" (17,1) | CARD (cobre a aceleração em 16,94) | "LINK NA BIO" | pop |
| "digosocial" (18,1) | CHEIA, punch-in (o card cobre o congelado em 18,39 até 18,6) | "digosocial.com" grande em ciano | impacto |
| fim (19,5) | tela final | | swoosh, impacto |

## Assumido (diga se quiser diferente)

- **Legenda dinâmica** em todos, padrão do guia 6 (some quando a frase já está escrita na tela).
- **Prints:** usados como estão (demo pública com dados fictícios), dentro de um celular, com zoom e marca-texto.
- **Preços na tela:** R$ 57 / 97 / 197, conferidos no site em 13/10/2026. Se mudarem, o destaque 4 precisa de re-render.
- **Entregável:** 4 MP4 1080×1920 em `edicoes/002. destaques-instagram/`, um por destaque, + as 4 capas dos destaques (ícone + nome, nas cores da logo).
