# 005. pare-de-sumir: plano de edição

> Nível 2 (Higgsfield) com montagem no Remotion, no [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md).
> Reels de **dica** para crescer no Instagram, sem vender o Digo Social. O CTA é só para seguir o perfil. Roteiro aprovado em [roteiro.md](roteiro.md) (16/10/2026).

## Decisões

- **Dica pura:** o Digo Social não aparece como solução; a logo entra só no CTA e na tela final.
- **Explicação baseada no que o Instagram já disse** (teste com pouca gente → mais alcance; quem interage vê mais). Fontes no roteiro.
- **Voz de vídeo de dica** (nova receita do guia 6, aprovada pelo Diogo): `speech_rate` −10 + `cortar_pausas.py --pausa 0.18 --pausa-frase 0.32 --velocidade 1.3`.
- **Abertura "Você posta e some, né?"**: com o "?" sozinho, a pergunta saía como afirmação. A legenda mostra "Você posta e some, né?".

## Gerado na Higgsfield (~18 créditos; estimado ~13, +38%, aprovado pelo Diogo)

| Asset | Arquivo | Créditos |
|---|---|---|
| Voz v1 (`speech_rate` 5): rápida demais e engoliu "você" (descartada) | `hf/voz_sumir.mp3` | ~3,4 |
| Voz v2 (`speech_rate` −10) | `hf/voz_sumir_v2.mp3` (44,2 s) | ~4,4 |
| 3 testes da pergunta de abertura | `hf/pergunta/` | ~0,6 |
| Avatar A, abertura (5 s) | `hf/avatar_A.mp4` → `sync_A.mp4` | 5 |
| Avatar B, CTA (4 s) | `hf/avatar_B.mp4` → `sync_B.mp4` | 4 |

- **Voz oficial:** `hf/voz_final_ritmo.wav` (35,7 s) = a pergunta 3 ("…né?") emendada no lugar de "Você posta e some," da v2 (`hf/voz_sumir_v3.wav`), depois corte de pausas a 1,3×.
- Avatar: Seedance 2 Mini 720p 9:16, `start_image` = job `ab4aaba1…`, `audio_references` = recorte da voz final com 0,4 s de silêncio (`hf/cortes_avatar.json`). Jobs `3014a0d0…` (A) e `cdb3bf09…` (B).
- **Sincronia:**
  - **A:** atraso mediano de 8 ms, 6% das janelas acima de 45 ms.
  - **B:** atraso mediano de 2 ms, mas 12% das janelas acima de 45 ms, acima da meta de 5%. O clipe acelera em três pontos (34,0–34,2, 34,6–34,8 e 35,0–35,5 s). Por isso, o B só fica em tela cheia em "Segue o Digo". O resto do CTA vira motion em tela cheia.

## Formato e estilo

1080×1920, 30 fps, **35,7 s de fala + 1,4 s de tela final = 37,1 s**. Paleta, fontes, legenda dinâmica, wipe azul, textura e SFX do padrão. No meio, o card de voz (foto oficial + onda) fica no topo.

## Linha do tempo (cada gatilho é uma palavra falada)

| Palavra (s) | Estado | O que aparece |
|---|---|---|
| início (0,00) | **MOTION** (cobre 0,00–0,47, boca congelada) | celular publicando um post: "Publicado ✓" |
| "posta" (0,78) | avatar CHEIO | "POSTA" em pílula |
| "some" (1,56) | avatar CHEIO | um boneco sai de cena: "SUMIU 👋" |
| "né?" (1,92) | avatar CHEIO, punch-in | — |
| "também" (3,16) | **MOTION** (cobre 3,21–3,47) | "O INSTAGRAM TAMBÉM…" |
| "esquece" (3,50) | avatar CHEIO | "…ESQUECE DE VOCÊ", com o perfil ficando cinza |
| "Funciona assim" (4,62) | wipe azul → MOTION + card de voz | título "COMO O INSTAGRAM DECIDE" |
| "pouca gente" (7,30) | MOTION | o post no centro, com um círculo pequeno de 5 pessoas acendendo |
| "interagem" (8,76) | MOTION | ❤️ 💬 ↗️ saindo das 5 pessoas |
| "mais gente" (10,20) | MOTION | o círculo se abre em ondas: 5 → 50 → 500 |
| "E tem mais" (10,86) | MOTION | selo "E TEM MAIS" |
| "conversa com você" (12,36) | MOTION | VOCÊ ↔ SEGUIDOR com balões indo e voltando; a linha entre os dois engrossa |
| "mostra os seus posts" (14,02) | MOTION | o feed do seguidor com o seu post subindo para o topo |
| "dica 1" (16,60) | MOTION | selo "DICA 1" |
| "Responde todo comentário" (17,76) | MOTION | comentário "Amei! 😍" sem resposta e um relógio parado |
| "pergunta" (20,32) | MOTION | resposta digitada: "Obrigado! Qual você mais gostou?" |
| "vira conversa" (21,86) | MOTION | a thread cresce com 3 respostas e o contador 💬 sobe |
| "volta a te ver no feed" (24,34) | MOTION | o seu post no feed daquela pessoa ✓ |
| "Dica 2" (25,30) | MOTION | selo "DICA 2" |
| "perfis do seu nicho" (26,94) | MOTION | post de outro perfil do mesmo nicho |
| "Comentário de verdade" (28,18) | MOTION | comentário útil de 2 linhas ✓ |
| "coraçãozinho" (29,60) | MOTION | comentário "❤️" riscado em vermelho ✗ |
| "clica no seu perfil" (31,14) | MOTION | o dedo toca o seu @ e o perfil se abre: "+1 seguidor" |
| "Se essa dica te ajudou" (32,10) | MOTION + card de voz | selo "DICA SALVA? 💾" |
| "segue" (33,48) | avatar CHEIO | botão "Seguir" com @digo.social |
| "Social" (34,01) | **MOTION** (cobre 34,0–35,5) | o botão vira "Seguindo ✓" em tela cheia |
| "Toda semana tem mais" (34,64) | MOTION | "TODA SEMANA TEM MAIS" |
| fim (35,70) | tela final | logo oficial + Digo Social + @digo.social |

## Legenda do post (sugestão)

> Você posta e some? O Instagram também esquece de você 👀
>
> Ele mostra seu post primeiro pra pouca gente, e quem conversa com você passa a te ver mais. Então:
> 1️⃣ Responde todo comentário com uma pergunta
> 2️⃣ Comenta de verdade nos perfis do seu nicho
>
> 💾 Salva pra não esquecer
> 👉 Se essa dica te ajudou, segue o @digo.social. Toda semana tem mais.
>
> #instagram #dicasdeinstagram #crescernoinstagram #algoritmodoinstagram #engajamento #marketingdigital #reels #criadordeconteudo #socialmedia #empreendedorismo #digosocial

## Render e validação (16/10/2026)

- Código em `src/videos/pare-de-sumir/` (cópia de `sexta-22h/`), composição `PareDeSumir`. Plano, prancha e preview aprovados pelo Diogo.
- Depois da prancha: comentários das dicas maiores (Inter 40) e toque do dedo em cima do @.
- Final: `edicoes/005. pare-de-sumir/pare-de-sumir_final.mp4`: 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 37,1 s (35,7 + 1,4), **−13,9 LUFS**, pico **−1,9 dBTP**. O limitador padrão deixou −15,2 LUFS (a voz a 1,3× ficou mais baixa); subir +1,3 dB antes do limitador (`volume=1.3dB,alimiter=limit=0.8`) acertou o alvo.
- Prancha do arquivo final em `frames/prancha_final.png`.
