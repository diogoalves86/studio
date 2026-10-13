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
| Voz 1, O que é | `hf/voz_1_oque.mp3` → `_ritmo.wav` | 26,6 → 23,7 s | ~2,7 |
| Voz 2, Como funciona | `hf/voz_2_como.mp3` → `_ritmo.wav` | 20,5 → 20,1 s | ~2,8 |
| Voz 3, Pra quem | `hf/voz_3_praquem.mp3` → `_ritmo.wav` | 27,7 → 19,1 s | ~1,7 |
| Voz 4, Teste grátis | `hf/voz_4_teste.mp3` → `_ritmo.wav` | 22,6 → 20,7 s | ~1,8 |
| Avatar 1a, 1b, 2a, 2b, 3a, 3b, 4a, 4b | `hf/avatar_<id>.mp4` | 5+5+4+4+4+5+5+6 = 38 s | 38 |

- Voz: Seed Audio clonando a referência do Diogo (`58086f4c…`), `speech_rate` 5, `loudness_rate` 23.
- Avatar: Seedance 2 Mini, 720p, 9:16, `start_image` = imagem oficial (`prints/avatar-ref.png`), `audio_references` = o recorte da voz `_ritmo` de cada fala (`hf/ref_avatar/`, mapa em `hf/cortes_avatar.json`), com 0,4 s de silêncio no começo.

## Direção da montagem (a detalhar por palavra depois da sincronia)

Em cada destaque, o avatar aparece na abertura e no fechamento; o miolo é motion cheio, com o avatar voltando em **card** nos pontos de ênfase, e trocas a cada 1–2 s.

1. **O que é:** avatar (gancho) → celular com notificações e a pergunta piscando → feed rolando com contador do concorrente subindo → caixa de IA genérica com "legenda bonita ✕ pauta fraca" → logo + "consultor de redes com IA" → print do painel "Hoje" no celular com marca-texto na "Leitura do Digo" → avatar no CTA com selo "7 dias grátis".
2. **Como funciona:** avatar → celular com o painel; cada módulo entra quando é dito (Pulso → Oportunidades → Consultor → calendário → Resultados), zoom e marca-texto; avatar em card nos intervalos → ciclo de 4 passos se montando → avatar "nada é publicado sem você aprovar".
3. **Pra quem:** avatar → três cartões entrando um por vez (ícones + profissões) → "achismo" com risco vermelho e "dado" em verde → avatar no fechamento.
4. **Teste grátis:** avatar → selo "7 DIAS GRÁTIS · SEM CARTÃO" → três cartões de plano (Solo R$ 57 · Essencial R$ 97 · Pro R$ 197, Pro em destaque) → demo no celular → avatar no CTA → tela final com logo e @digo.social.

Próximos pontos de aprovação: este plano com a timeline por palavra, e depois os stills de revisão antes do render final.
