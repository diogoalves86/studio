# 003. destaque-lojinha: plano

> Nível 2 (Higgsfield) com montagem no Remotion, no [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md).
> Destaque do @digo.social para dono de lojinha, 9:16, roteiro em [roteiro.md](roteiro.md). Conversa com https://digosocial.com/empreendedores.

## Decisões (13/10/2026)

- **Economia de créditos (pedido do Diogo):** voz completa no Seed Audio e **só 2 clipes curtos do avatar** (abertura e CTA). No meio, o avatar não aparece: no lugar dele entra um **card de voz** com a foto oficial (`prints/avatar-ref.png`) e uma onda que pulsa só quando ele fala.
- **CTA:** "Toca no link". No Stories, cole a **figurinha de link** apontando para `/empreendedores`, abaixo da seta (área livre em y ≈ 1450–1650).
- **Cadência de vídeo de apresentação** (`--pausa 0.22 --pausa-frase 0.45 --velocidade 0.95`), igual aos destaques do 002.
- Sem B-roll de IA: o fundo das cenas é o próprio clipe A desfocado.

## Gerado na Higgsfield (13,8 créditos; estimado ~12, +15%)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz completa | `hf/voz_lojinha.mp3` → `_ritmo.wav` | 31,1 → 31,7 s | 2,8 |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 6 s | 6 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 5 s | 5 |

- **Abertura regerada (14/10, 0,2 crédito):** "Tem **lójinha** no Instagram?", grafia fonética (regra 9 do guia 6), em `hf/voz_abertura_v2.mp3`; emendada no lugar da frase antiga em `hf/voz_lojinha_v2_ritmo.wav`.
- Voz: Seed Audio com a referência do Diogo (`58086f4c…`), `speech_rate` 5, `loudness_rate` 23.
- Avatar: Seedance 2 Mini 720p 9:16, `start_image` = job `ab4aaba1…`, `audio_references` = recorte da voz `_ritmo` com 0,4 s de silêncio (`hf/ref_avatar/`, `hf/cortes_avatar.json`).
- Sincronia: atraso mediano de 5 ms nos dois clipes (`transcricao/narracao/sincronia.md`).

## Linha do tempo (cada gatilho é uma palavra falada; 31,7 s + 1,4 s de tela final)

| Palavra | Estado | O que aparece |
|---|---|---|
| "Tem" (0,0) | CHEIA | gancho falado |
| "lojinha" +0,37 | MOTION (cobre 0,64–0,78 e 1,75–1,90) | "TEM LOJINHA / NO INSTAGRAM?" + perfil @sua.lojinha |
| "Sua" +0,35 | CHEIA, zoom 1,06 | "sua loja precisa de post" |
| "E" (3,8) | MOTION (cobre 4,04–4,68) | "E VOCÊ / PRECISA DE…" |
| "precisa" +0,2 → "tempo." | CHEIA → punch-in | "TEMPO" em destaque |
| "Você" (5,96) | MOTION + card de voz | VOCÊ… VENDE ✓ ATENDE ✓ RESPONDE DIRECT (contador de mensagens) |
| "ainda" (9,96) | MOTION | relógio 19:00 → 23:47 + "montando o post…" + NO CANVA |
| "Pra um post" (11,7) | MOTION | post com 3 curtidas + selo "QUASE NINGUÉM" |
| "O Digo Social" (14,2) | MOTION | logo oficial |
| "sugere" (15,1) | MOTION | "O DIGO SUGERE: Mostre 3 jeitos de usar o produto que mais sai na loja." + "QUINTA, À TARDE" (exemplo da landing) |
| "Cria" (18,0) | MOTION | cartão POST PRONTO: imagem, legenda digitada, Instagram ✓ e Facebook ✓ |
| "Só depois… aprovar" (22,2) | MOTION | dedo toca "Aprovar e agendar" → "Agendado ✓ quinta, 15h" |
| "mostra… funcionou" (25,2) | MOTION | curtidas e comentários subindo + gráfico + balão do Consultor "Vale repetir o assunto" |
| "Testa" (28,1) | CARD (cobre 27,90–28,09, 29,15–29,30, 29,65–29,88) | selo "TESTA 7 DIAS GRÁTIS" + "SEM CARTÃO" com risco no cartão |
| "Toca no link" (30,5) | CHEIA, punch-in | "TOCA NO LINK" + seta para baixo |
| fim (31,7) | tela final | logo + Digo Social + @digo.social |

Wipe azul nas trocas de trecho (5,76 e 27,90) e na tela final; efeitos sonoros em `Lojinha.tsx` (EVENTOS).

## Código

`src/videos/destaque-lojinha/` (composição `DestaqueLojinha`): `Destaque.tsx` adaptado do 002, `Lojinha.tsx` com as cenas, `palavras.ts` gerado por `tools/narracao.py`.
