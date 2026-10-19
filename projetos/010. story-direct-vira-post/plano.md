# 010. story-direct-vira-post: plano de edição

> **Story** com espaço para a figurinha de link (`digosocial.com/empreendedores`). Roteiro aprovado em [roteiro.md](roteiro.md) (18/10/2026). O Diogo pediu para criar direto ("pode criar"), então o roteiro, com a tabela de cenas, valeu como plano. Este arquivo registra a execução.
> Oferta usada: **7 dias grátis, sem cartão** (landing lida no 003, em 13/10). O Diogo não corrigiu a oferta.

## Gerado na Higgsfield (12,8 créditos; estimado ~11,5)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz (receita de dica) | `hf/voz_story.mp3` → `_ritmo.wav` | 29,9 → 23,6 s | ~2,8 (1ª tentativa falhou e foi reembolsada; a 2ª saiu sem aspas no texto) |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 4 s | 4 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 6 s | 6 |

- **Sincronia:**
  - **A:** atraso mediano de 12 ms. "Abre" (1,23–1,44 s) acelera, e a partir daí entra o motion do direct.
  - **B:** atraso mediano de 5 ms e 5% das janelas acima de 45 ms (dentro da meta). Os pontos lentos (19,24–21,10 s) ficam sob o card "7 DIAS GRÁTIS · SEM CARTÃO" em tela cheia, e o de 21,72–21,92 s fica sob a transição para o "Toca no link".

## Formato

1080×1920, 30 fps. **23,6 s de fala + 3 s parado no último quadro** (o avatar congelado + a moldura do link), para dar tempo de tocar no link. Sem tela final com a logo.

## Espaço da figurinha de link

- A moldura tracejada fica em **y 1380–1620, x 190–890**, com "TOCA AQUI 👇" pulsando logo acima (y ~1290).
- A moldura aparece a partir de "Toca" (22,2 s) e fica até o fim.
- De 21,9 s ao fim, nada passa por cima dela e a legenda fica escondida.

## Linha do tempo

| Tempo | Estado | O que aparece |
|---|---|---|
| 0–1,2 «Não sabe o que postar, né?» | avatar CHEIO | gancho no topo: "NÃO SABE O QUE POSTAR?" |
| 1,2–2,47 «Abre o seu direct» | MOTION | celular com a caixa do direct (padrão do app) e 3 mensagens chegando |
| «Cada pergunta… post pronto» | MOTION + card de voz | "Tem tamanho P?" se destaca e voa para virar post |
| «vira um guia de tamanhos» | MOTION | post "GUIA DE TAMANHOS · P · M · G" se monta |
| «Entrega no meu bairro? Vira…» | MOTION | post "ONDE A GENTE ENTREGA 📍" |
| «passar a noite montando» | MOTION | relógio 23:47 + "montando no Canva…" |
| «o Digo Social sugere… aprova» | MOTION | logo → "O DIGO SUGERE" → "POST PRONTO" → dedo em "Aprovar" → "Agendado ✓" |
| 18,29 «Cria sua conta» | avatar CHEIO | selo "CRIA SUA CONTA" |
| 19,2–21,9 «sete dias grátis, sem cartão» | MOTION | card grande "7 DIAS GRÁTIS · SEM CARTÃO 💳✗" |
| 21,9 → fim «Toca no link aqui embaixo» | avatar CHEIO | "TOCA AQUI 👇" + moldura livre para a figurinha |
| fim + 3 s | avatar parado | moldura e seta continuam |

## Render e validação (18/10/2026)

- Código em `src/videos/story-direct-vira-post/` (cópia de `perfil-tres-segundos/`), composição `StoryDirectViraPost`, `Destaque` com `outro={false}` e 3 s parados no fim (`STORY_SEGURA`). Prancha e preview aprovados.
- Depois da prancha: selo "PERGUNTA = POST PRONTO" no topo (não cobre a legenda); fundo da moldura do link mais escuro e desfocado.
- Final: `edicoes/010. story-direct-vira-post/story-direct-vira-post_final.mp4`: 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 26,6 s (23,6 de fala + 3 s parados), **−13,9 LUFS** (+0,8 dB antes do limitador; os 3 s finais sem fala puxam a média para baixo), pico **−1,9 dBTP**.
- **No Instagram:** cole a figurinha de link dentro da moldura tracejada (terço de baixo, y 1380–1620), apontando para `digosocial.com/empreendedores`.
